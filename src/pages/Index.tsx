import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SymptomInput from '@/components/SymptomInput';
import ResultsSection from '@/components/ResultsSection';
import Footer from '@/components/Footer';
import { analyzeWithAI, AIAnalysisResult } from '@/lib/aiAnalyzer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [results, setResults] = useState<AIAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const handleAnalyze = async (symptoms: string, audioFile?: File) => {
    setIsLoading(true);
    setResults(null);

    try {
      let inputText = symptoms;
      const hasAudio = !!audioFile;
      
      if (audioFile) {
        inputText = symptoms || "cough breathing difficulty respiratory symptoms";
        toast({
          title: "Audio received",
          description: "Audio analysis combined with text-based AI screening."
        });
      }

      if (!inputText.trim()) {
        toast({
          title: "No symptoms provided",
          description: "Please describe your symptoms for analysis.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      // Perform AI-powered analysis
      const analysisResult = await analyzeWithAI(inputText, hasAudio);
      setResults(analysisResult);

      // Save to history if user is logged in
      if (user && analysisResult.predictions.length > 0) {
        const { error } = await supabase
          .from('analysis_history')
          .insert({
            user_id: user.id,
            symptoms: inputText,
            has_audio: hasAudio,
            analysis_method: analysisResult.aiPowered ? 'ai' : 'rule-based',
            predictions: analysisResult.predictions.map(p => ({
              diseaseId: p.disease.id,
              diseaseName: p.disease.name,
              probability: p.probability,
              matchedSymptoms: p.matchedSymptoms
            })),
            urgency: analysisResult.urgency || null
          });

        if (error) {
          console.error('Failed to save history:', error);
        }
      }

      if (analysisResult.predictions.length === 0) {
        toast({
          title: "No conditions detected",
          description: "Please provide more specific symptoms for better analysis."
        });
      } else {
        toast({
          title: analysisResult.aiPowered ? "AI Analysis Complete" : "Analysis Complete",
          description: `Found ${analysisResult.predictions.length} possible condition(s).`
        });
      }

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Please try again with different symptoms.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SymptomInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        <div id="results">
          <ResultsSection results={results} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
