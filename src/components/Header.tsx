import { Stethoscope, History, LogIn, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{t('appName')}</h1>
            <p className="text-xs text-muted-foreground">{t('tagline')}</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-2 sm:gap-4">
          <LanguageSelector />
          
          {user ? (
            <>
              <Button variant="ghost" size="sm" className="gap-2" onClick={() => navigate('/history')}>
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">{t('history')}</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">{t('logout')}</span>
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate('/auth')}>
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{t('login')}</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
