import { supabase } from "@/integrations/supabase/client";
import { analyzeSymptoms as localAnalyze, AnalysisResult, PredictionResult } from "./symptomAnalyzer";
import diseasesData from '@/data/diseases.json';

export interface AIAnalysisResult extends AnalysisResult {
  aiPowered: boolean;
  urgency?: string;
  severity?: string;
}

// Map AI response to local disease data for rich information
const mapAIResponseToLocalData = (aiPredictions: any[]): PredictionResult[] => {
  return aiPredictions.map(pred => {
    // Try to find matching disease in local data
    const localDisease = diseasesData.diseases.find(
      d => d.id === pred.diseaseId || 
           d.name.toLowerCase() === pred.diseaseName?.toLowerCase()
    );

    return {
      disease: localDisease || {
        id: pred.diseaseId || pred.diseaseName?.toLowerCase().replace(/\s+/g, '_') || 'unknown',
        name: pred.diseaseName || 'Unknown Condition',
        description: pred.description || '',
        symptoms: pred.matchedSymptoms || [],
        causes: [],
        prevention: [],
        severity: pred.severity || 'unknown',
        seekHelp: ''
      },
      probability: pred.probability,
      matchedSymptoms: pred.matchedSymptoms || []
    };
  });
};

export const analyzeWithAI = async (symptoms: string): Promise<AIAnalysisResult> => {
  try {
    console.log("Calling AI analysis for:", symptoms);

    const { data, error } = await supabase.functions.invoke('analyze-symptoms', {
      body: { symptoms }
    });

    if (error) {
      console.error("AI analysis error:", error);
      throw error;
    }

    if (data.error || data.fallback) {
      console.warn("AI returned error, using fallback:", data.error);
      throw new Error(data.error || "AI analysis failed");
    }

    console.log("AI analysis result:", data);

    // Map AI predictions to our format
    const predictions = mapAIResponseToLocalData(data.predictions || []);

    return {
      predictions,
      summary: data.summary || "Analysis complete.",
      recommendations: data.recommendations || [],
      aiPowered: true,
      urgency: data.urgency,
      severity: data.severity
    };

  } catch (error) {
    console.error("AI analysis failed, falling back to local:", error);
    
    // Fallback to local analysis
    const localResult = localAnalyze(symptoms);
    return {
      ...localResult,
      aiPowered: false
    };
  }
};
