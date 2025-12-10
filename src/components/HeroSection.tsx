import { Activity, Shield, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Activity className="w-4 h-4" />
            AI-Powered Health Screening
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
            Check Your{' '}
            <span className="text-gradient">Respiratory</span>{' '}
            Health
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Describe your symptoms and get instant AI-powered analysis for common respiratory conditions like asthma, flu, bronchitis, and more.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-5 h-5 text-accent" />
              <span>Privacy-First</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-5 h-5 text-warning" />
              <span>Instant Results</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-5 h-5 text-primary" />
              <span>AI Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
