import { Stethoscope } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">RespiCheck</h1>
            <p className="text-xs text-muted-foreground">AI Respiratory Screening</p>
          </div>
        </div>
        
        <nav className="hidden sm:flex items-center gap-6">
          <a href="#screening" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Screening
          </a>
          <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
