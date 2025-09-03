import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, ArrowRight, Heart, Briefcase, Lock, Star } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to notes page after a short delay for a smooth experience
    const timer = setTimeout(() => {
      navigate('/notes');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-8 max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="p-4 rounded-2xl bg-gradient-primary shadow-lg">
            <FileText className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Notes App
          </h1>
        </div>
        
        <p className="text-xl text-muted-foreground leading-relaxed">
          Organize your thoughts with beautiful, secure notes. 
          Keep personal ideas, work tasks, and secrets safely categorized.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
          {[
            { icon: Heart, gradient: 'bg-gradient-personal', name: 'Personal' },
            { icon: Briefcase, gradient: 'bg-gradient-work', name: 'Work' },
            { icon: Lock, gradient: 'bg-gradient-secrets', name: 'Secrets' },
            { icon: Star, gradient: 'bg-gradient-favourite', name: 'Favourites' }
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`p-3 rounded-xl ${item.gradient} shadow-lg animate-bounce`} style={{ animationDelay: `${index * 0.2}s` }}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/notes')} 
            size="lg" 
            className="bg-gradient-primary border-0 hover:scale-105 transition-transform"
          >
            <FileText className="mr-2 h-5 w-5" />
            Enter Notes App
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Redirecting automatically in 2 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
