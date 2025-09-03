



import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Heart, Briefcase, Lock, Star, ArrowLeft, Eye } from 'lucide-react';
import { PasswordModal } from '@/components/PasswordModal';
import { toast } from 'sonner';
import { useNotes } from '@/contexts/NotesContext';

const categoryConfig = {
  personal: { 
    name: 'Personal', 
    icon: Heart, 
    gradient: 'bg-gradient-personal',
    description: 'Personal thoughts and ideas'
  },
  work: { 
    name: 'Work', 
    icon: Briefcase, 
    gradient: 'bg-gradient-work',
    description: 'Work related notes and tasks'
  },
  secrets: { 
    name: 'Secrets', 
    icon: Lock, 
    gradient: 'bg-gradient-secrets',
    description: 'Private and confidential notes'
  },
  favourite: { 
    name: 'Favourites', 
    icon: Star, 
    gradient: 'bg-gradient-favourite',
    description: 'Your favorite and important notes'
  },
} as const;

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  color?: string;
}

export default function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { isSecretsUnlocked, setIsSecretsUnlocked } = useNotes();

  const [notes, setNotes] = useState<Note[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const categoryKey = category as keyof typeof categoryConfig;
  const categoryInfo = categoryConfig[categoryKey];

  // Fetch notes from backend
  const fetchNotes = async () => {
    try {
      const res = await fetch(`/api/notes?category=${categoryKey}`);
      const data = await res.json();
      const mapped = data.map((note: any) => ({ ...note, id: note._id }));
      setNotes(mapped);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
  };

  useEffect(() => {
    if (categoryKey) fetchNotes();
  }, [categoryKey]);

  if (!categoryInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Category not found</h2>
          <p className="text-muted-foreground mb-4">
            The requested category does not exist.
          </p>
          <Button asChild>
            <Link to="/notes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Notes
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleNoteClick = (noteId: string) => {
    if (categoryKey === 'secrets') {
      if (isSecretsUnlocked) {
        navigate(`/note/${noteId}`);
      } else {
        setSelectedNoteId(noteId);
        setShowPasswordModal(true);
      }
    } else {
      navigate(`/note/${noteId}`);
    }
  };

  const handlePasswordSuccess = () => {
    if (selectedNoteId) {
      setShowPasswordModal(false);
      setIsSecretsUnlocked(true);
      navigate(`/note/${selectedNoteId}`);
      setSelectedNoteId(null);
    }
  };

  const handlePasswordClose = () => {
    setShowPasswordModal(false);
    setSelectedNoteId(null);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" asChild>
              <Link to="/notes">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${categoryInfo.gradient} shadow-lg`}>
                <categoryInfo.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{categoryInfo.name} Notes</h1>
                <p className="text-muted-foreground">{notes.length} notes • {categoryInfo.description}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button asChild>
              <Link to="/notes/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Note
              </Link>
            </Button>
            
            {categoryKey === 'secrets' && (
              <Button 
                variant={isSecretsUnlocked ? "secondary" : "outline"} 
                onClick={() => {
                  if (isSecretsUnlocked) {
                    setIsSecretsUnlocked(false);
                    toast.success('Secrets locked for security');
                  } else {
                    setShowPasswordModal(true);
                  }
                }}
              >
                <Lock className="mr-2 h-4 w-4" />
                {isSecretsUnlocked ? 'Lock Secrets' : 'Unlock All Secrets'}
              </Button>
            )}
          </div>

          {/* Notes Grid */}
          {notes.length === 0 ? (
            <Card className="text-center py-16 shadow-card">
              <CardContent>
                <categoryInfo.icon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No {categoryInfo.name.toLowerCase()} notes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first {categoryInfo.name.toLowerCase()} note to get started
                </p>
                <Button asChild>
                  <Link to="/notes/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Note
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <Card
                  key={note.id}
                  className="hover:shadow-hover transition-all cursor-pointer group shadow-card"
                  onClick={() => handleNoteClick(note.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div 
                        className="h-3 w-3 rounded-full mt-1 group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: note.color || '#999' }}
                      />
                      <Badge variant="secondary" className="text-xs flex items-center gap-1">
                        <categoryInfo.icon className="h-3 w-3" />
                        {categoryInfo.name}
                        {categoryKey === 'secrets' && !isSecretsUnlocked && <Lock className="ml-1 h-3 w-3" />}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Created {new Date(note.createdAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
                      {categoryKey === 'secrets' && !isSecretsUnlocked 
                        ? '••••••••••••••••••••••••••••••••••••••••••••••••••'
                        : note.content
                      }
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {categoryKey === 'secrets' && !isSecretsUnlocked ? 'Protected' : 'Click to view'}
                      </div>
                      <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Password Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handlePasswordClose}
        onSuccess={handlePasswordSuccess}
      />
    </>
  );
}


