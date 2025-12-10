import diseasesData from '@/data/diseases.json';

export interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  severity: string;
  seekHelp: string;
}

export interface PredictionResult {
  disease: Disease;
  probability: number;
  matchedSymptoms: string[];
}

export interface AnalysisResult {
  predictions: PredictionResult[];
  summary: string;
  recommendations: string[];
}

// Normalize text for matching
const normalizeText = (text: string): string => {
  return text.toLowerCase().trim();
};

// Extract symptoms from user input
export const extractSymptoms = (input: string): string[] => {
  const normalizedInput = normalizeText(input);
  const allSymptoms = Object.keys(diseasesData.symptomWeights);
  
  const foundSymptoms: string[] = [];
  
  for (const symptom of allSymptoms) {
    // Check if symptom or its variations are in the input
    const symptomWords = symptom.split(' ');
    const isMatch = symptomWords.every(word => normalizedInput.includes(word)) ||
      normalizedInput.includes(symptom);
    
    if (isMatch) {
      foundSymptoms.push(symptom);
    }
  }
  
  // Also check for disease-specific symptoms
  for (const disease of diseasesData.diseases) {
    for (const symptom of disease.symptoms) {
      const normalizedSymptom = normalizeText(symptom);
      if (normalizedInput.includes(normalizedSymptom) && !foundSymptoms.includes(symptom)) {
        foundSymptoms.push(symptom);
      }
    }
  }
  
  return [...new Set(foundSymptoms)];
};

// Calculate disease probabilities based on symptoms
export const calculateProbabilities = (symptoms: string[]): PredictionResult[] => {
  const diseases = diseasesData.diseases as Disease[];
  const weights = diseasesData.symptomWeights as Record<string, Record<string, number>>;
  
  const results: PredictionResult[] = [];
  
  for (const disease of diseases) {
    let score = 0;
    const matchedSymptoms: string[] = [];
    
    for (const symptom of symptoms) {
      const normalizedSymptom = normalizeText(symptom);
      
      // Check in symptom weights
      if (weights[normalizedSymptom] && weights[normalizedSymptom][disease.id]) {
        score += weights[normalizedSymptom][disease.id];
        matchedSymptoms.push(symptom);
      }
      
      // Check if symptom matches disease symptoms
      const diseaseSymptomMatch = disease.symptoms.find(
        ds => normalizeText(ds).includes(normalizedSymptom) || normalizedSymptom.includes(normalizeText(ds))
      );
      
      if (diseaseSymptomMatch && !matchedSymptoms.includes(symptom)) {
        score += 0.5;
        matchedSymptoms.push(symptom);
      }
    }
    
    // Normalize probability (0-100%)
    const maxPossibleScore = symptoms.length * 0.9;
    const probability = maxPossibleScore > 0 ? Math.min((score / maxPossibleScore) * 100, 95) : 0;
    
    if (probability > 0) {
      results.push({
        disease,
        probability: Math.round(probability),
        matchedSymptoms: [...new Set(matchedSymptoms)]
      });
    }
  }
  
  // Sort by probability and return top results
  return results.sort((a, b) => b.probability - a.probability).slice(0, 5);
};

// Generate recommendations based on predictions
export const generateRecommendations = (predictions: PredictionResult[]): string[] => {
  const recommendations: string[] = [];
  
  if (predictions.length === 0) {
    return [
      "No specific respiratory condition detected based on your symptoms.",
      "If symptoms persist, please consult a healthcare professional.",
      "Stay hydrated and get adequate rest."
    ];
  }
  
  const topPrediction = predictions[0];
  
  // Add prevention tips from top prediction
  recommendations.push(...topPrediction.disease.prevention.slice(0, 3));
  
  // Add severity-based recommendation
  if (topPrediction.disease.severity === 'severe') {
    recommendations.unshift("⚠️ Based on your symptoms, we recommend seeking medical attention promptly.");
  } else if (topPrediction.disease.severity === 'moderate') {
    recommendations.unshift("Consider consulting a healthcare provider if symptoms persist or worsen.");
  }
  
  // Add general health advice
  recommendations.push("Stay hydrated and get plenty of rest.");
  recommendations.push("Monitor your symptoms and note any changes.");
  
  return [...new Set(recommendations)].slice(0, 6);
};

// Main analysis function
export const analyzeSymptoms = (input: string): AnalysisResult => {
  const symptoms = extractSymptoms(input);
  const predictions = calculateProbabilities(symptoms);
  const recommendations = generateRecommendations(predictions);
  
  let summary = "";
  
  if (predictions.length === 0) {
    summary = "Based on your input, we couldn't identify specific respiratory symptoms. Please provide more details about your condition.";
  } else if (predictions[0].probability > 70) {
    summary = `Your symptoms strongly suggest ${predictions[0].disease.name}. ${predictions[0].disease.description}`;
  } else if (predictions[0].probability > 40) {
    summary = `Your symptoms may indicate ${predictions[0].disease.name}, though other conditions are also possible. ${predictions[0].disease.description}`;
  } else {
    summary = `Based on your symptoms, you may have a mild respiratory condition. The most likely is ${predictions[0].disease.name}.`;
  }
  
  return {
    predictions,
    summary,
    recommendations
  };
};
