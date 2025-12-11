import { Heart, Stethoscope } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer id="about" className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/50 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Stethoscope className="w-5 h-5" />
              </div>
              <span className="font-bold text-foreground">{t('appName')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footerText')}
            </p>
          </div>

          {/* Conditions Screened */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Conditions Screened</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Asthma</li>
              <li>• Influenza (Flu)</li>
              <li>• Bronchitis</li>
              <li>• Pneumonia</li>
              <li>• Common Cold</li>
              <li>• COVID-19</li>
              <li>• Allergic Rhinitis</li>
              <li>• COPD</li>
            </ul>
          </div>

          {/* How It Works */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">How It Works</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>1. Enter your symptoms</li>
              <li>2. Optionally add audio</li>
              <li>3. AI analyzes your input</li>
              <li>4. View probability results</li>
              <li>5. Get medicine suggestions</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {t('appName')}. For informational purposes only.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-destructive" /> for better health awareness
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
