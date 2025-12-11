import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Disease knowledge base for AI context
const diseaseKnowledge = `
You are a medical AI assistant specialized in respiratory disease screening. You analyze symptoms and provide probability-based predictions for common respiratory conditions.

DISEASES DATABASE:
1. Asthma - Chronic respiratory condition causing airway inflammation
   Key symptoms: wheezing, shortness of breath, chest tightness, coughing, difficulty breathing
   Severity: chronic

2. Influenza (Flu) - Contagious respiratory illness by influenza viruses
   Key symptoms: fever, chills, muscle aches, body aches, fatigue, headache, dry cough, sore throat
   Severity: moderate

3. Bronchitis - Inflammation of bronchial tubes
   Key symptoms: persistent cough, mucus production, phlegm, chest discomfort, fatigue, low fever
   Severity: moderate

4. Pneumonia - Infection inflaming air sacs in lungs
   Key symptoms: high fever, severe cough, chest pain, difficulty breathing, rapid breathing, confusion
   Severity: severe

5. Common Cold - Viral infection of upper respiratory tract
   Key symptoms: runny nose, stuffy nose, sneezing, sore throat, mild cough, mild headache
   Severity: mild

6. COVID-19 - Respiratory illness caused by SARS-CoV-2 virus
   Key symptoms: fever, dry cough, fatigue, loss of taste/smell, body aches, headache, sore throat
   Severity: varies (mild to severe)

7. Allergic Rhinitis - Inflammation of nasal passages due to allergens
   Key symptoms: sneezing, runny nose, itchy eyes, nasal congestion, postnasal drip
   Severity: mild

8. COPD - Chronic obstructive pulmonary disease
   Key symptoms: chronic cough, shortness of breath, wheezing, chest tightness, frequent respiratory infections
   Severity: chronic/severe

RULES:
- Return EXACTLY 3 diseases ranked by probability (0-100%)
- Total probabilities don't need to sum to 100%
- Be conservative - don't over-diagnose
- Always recommend consulting a healthcare professional
- Include matched symptoms for each prediction
`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { symptoms } = await req.json();
    
    if (!symptoms || typeof symptoms !== 'string') {
      return new Response(
        JSON.stringify({ error: "Symptoms text is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing symptoms:", symptoms);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: diseaseKnowledge },
          { 
            role: "user", 
            content: `Analyze these symptoms and return a JSON response with disease predictions.

Patient symptoms: "${symptoms}"

Respond with ONLY valid JSON in this exact format:
{
  "predictions": [
    {
      "diseaseId": "disease_id",
      "diseaseName": "Disease Name",
      "probability": 75,
      "matchedSymptoms": ["symptom1", "symptom2"],
      "description": "Brief description of the condition"
    }
  ],
  "summary": "A brief 1-2 sentence summary of the analysis",
  "recommendations": ["recommendation1", "recommendation2", "recommendation3"],
  "severity": "mild|moderate|severe",
  "urgency": "A brief note about when to seek medical care"
}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response from the AI
    let analysisResult;
    try {
      // Extract JSON from potential markdown code blocks
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, content];
      const jsonStr = jsonMatch[1] || content;
      analysisResult = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse AI analysis");
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("analyze-symptoms error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Analysis failed",
        fallback: true 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
