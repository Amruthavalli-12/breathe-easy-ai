import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Trash2, History as HistoryIcon, Sparkles, Calculator, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface HistoryItem {
  id: string;
  symptoms: string;
  has_audio: boolean;
  analysis_method: string;
  predictions: any;
  urgency: string | null;
  created_at: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { user, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('analysis_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
      toast({ title: 'Error', description: 'Failed to load history', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('analysis_history')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setHistory(history.filter(item => item.id !== id));
      toast({ title: 'Deleted', description: 'History item removed' });
    } catch (error) {
      console.error('Error deleting:', error);
      toast({ title: 'Error', description: 'Failed to delete', variant: 'destructive' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('backToHome')}
          </Button>
        </div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <HistoryIcon className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{t('analysisHistory')}</h1>
        </div>

        {history.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('noHistory')}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {formatDate(item.created_at)}
                      </span>
                      <Badge variant={item.analysis_method === 'ai' ? 'default' : 'secondary'} className="gap-1">
                        {item.analysis_method === 'ai' ? (
                          <>
                            <Sparkles className="h-3 w-3" />
                            {t('aiPowered')}
                          </>
                        ) : (
                          <>
                            <Calculator className="h-3 w-3" />
                            {t('ruleBased')}
                          </>
                        )}
                      </Badge>
                      {item.has_audio && (
                        <Badge variant="outline">🎤 Audio</Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteHistoryItem(item.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">{t('symptoms')}</h4>
                    <p className="text-sm line-clamp-2">{item.symptoms}</p>
                  </div>
                  
                  {item.predictions && Array.isArray(item.predictions) && (
                    <div className="flex flex-wrap gap-2">
                      {item.predictions.slice(0, 3).map((pred: any, idx: number) => (
                        <Badge key={idx} variant="outline" className="gap-1">
                          {pred.diseaseName || pred.name}
                          <span className="text-primary font-semibold">
                            {pred.probability}%
                          </span>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
