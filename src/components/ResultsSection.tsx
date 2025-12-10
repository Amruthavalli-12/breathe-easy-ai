import { AnalysisResult } from '@/lib/symptomAnalyzer';
import ResultsChart from './ResultsChart';
import { AlertTriangle, CheckCircle, Info, ChevronDown, ChevronUp, Stethoscope, Shield, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ResultsSectionProps {
  results: AnalysisResult | null;
}

const ResultsSection = ({ results }: ResultsSectionProps) => {
  const [expandedDisease, setExpandedDisease] = useState<string | null>(null);

  if (!results) return null;

  const { predictions, summary, recommendations } = results;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'severe':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'moderate':
        return <Info className="w-5 h-5 text-warning" />;
      default:
        return <CheckCircle className="w-5 h-5 text-accent" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const colors = {
      severe: 'bg-destructive/10 text-destructive border-destructive/20',
      moderate: 'bg-warning/10 text-warning border-warning/20',
      mild: 'bg-accent/10 text-accent border-accent/20',
      chronic: 'bg-primary/10 text-primary border-primary/20'
    };
    return colors[severity as keyof typeof colors] || colors.mild;
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Summary Card */}
        <div className="bg-card rounded-2xl shadow-medium border border-border/50 p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Analysis Results</h2>
              <p className="text-muted-foreground">{summary}</p>
            </div>
          </div>

          {/* Chart */}
          {predictions.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Disease Probability Distribution</h3>
              <ResultsChart predictions={predictions} />
            </div>
          )}
        </div>

        {/* Detailed Results */}
        {predictions.length > 0 && (
          <div className="bg-card rounded-2xl shadow-medium border border-border/50 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-secondary text-secondary-foreground">
                <Info className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Detailed Analysis</h3>
            </div>

            <div className="space-y-4">
              {predictions.map((prediction, idx) => (
                <div
                  key={prediction.disease.id}
                  className="border border-border rounded-xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setExpandedDisease(expandedDisease === prediction.disease.id ? null : prediction.disease.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-primary">#{idx + 1}</span>
                      <div className="text-left">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-foreground">{prediction.disease.name}</h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${getSeverityBadge(prediction.disease.severity)}`}>
                            {prediction.disease.severity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {prediction.probability}% probability • {prediction.matchedSymptoms.length} symptoms matched
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getSeverityIcon(prediction.disease.severity)}
                      {expandedDisease === prediction.disease.id ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  {expandedDisease === prediction.disease.id && (
                    <div className="px-4 pb-4 space-y-4 border-t border-border bg-secondary/20">
                      <div className="pt-4">
                        <p className="text-sm text-muted-foreground">{prediction.disease.description}</p>
                      </div>

                      {/* Matched Symptoms */}
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Matched Symptoms:</h5>
                        <div className="flex flex-wrap gap-2">
                          {prediction.matchedSymptoms.map((symptom, i) => (
                            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                              {symptom}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Causes */}
                      <div>
                        <h5 className="text-sm font-medium text-foreground mb-2">Common Causes:</h5>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {prediction.disease.causes.slice(0, 4).map((cause, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {cause}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* When to Seek Help */}
                      <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                        <p className="text-sm text-warning font-medium">
                          ⚠️ Seek medical help: {prediction.disease.seekHelp}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-card rounded-2xl shadow-medium border border-border/50 p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-accent/10 text-accent">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Recommendations</h3>
          </div>

          <div className="grid gap-3">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{rec}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 p-4 rounded-lg bg-muted border border-border">
            <p className="text-xs text-muted-foreground">
              <strong>Important Disclaimer:</strong> This AI screening tool is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult with a qualified healthcare professional for any health concerns.
            </p>
          </div>

          <Button variant="outline" className="w-full mt-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Start New Screening
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
