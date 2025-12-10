import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import SymptomInput from '@/components/SymptomInput';
import ResultsSection from '@/components/ResultsSection';
import Footer from '@/components/Footer';
import { analyzeSymptoms, AnalysisResult } from '@/lib/symptomAnalyzer';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (symptoms: string, audioFile?: File) => {
    setIsLoading(true);
    setResults(null);

    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));

      // If audio file provided, add a note about it
      let inputText = symptoms;
      if (audioFile) {
        // In a real app, you'd process the audio here
        // For now, we acknowledge it but use text analysis
        inputText = symptoms || "cough breathing difficulty respiratory symptoms";
        toast({
          title: "Audio received",
          description: "Audio analysis is simulated. Using text-based screening."
        });
      }

      // Perform analysis
      const analysisResult = analyzeSymptoms(inputText);
      setResults(analysisResult);

      if (analysisResult.predictions.length === 0) {
        toast({
          title: "No conditions detected",
          description: "Please provide more specific symptoms for better analysis."
        });
      } else {
        toast({
          title: "Analysis complete",
          description: `Found ${analysisResult.predictions.length} possible condition(s).`
        });
      }

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
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
