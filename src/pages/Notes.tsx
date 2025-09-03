import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Heart, Briefcase, Lock, Star, FileText } from 'lucide-react';
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

export default function Notes() {
  const { notes, getNotesByCategory } = useNotes();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 rounded-xl  shadow-lg">
              <img src="public/imgs/logo.png " width={80} height={80} alt="logo" />
            </div>
            <h1 className="text-4xl font-bold  text-black ">
              My Notes
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read your thoughts.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(categoryConfig).map(([key, config]) => {
            const count = getNotesByCategory(key).length;
            return (
              <Link key={key} to={`/category/${key}`}>
                <Card className="h-full hover:shadow-hover transition-all cursor-pointer group shadow-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-3 rounded-xl ${config.gradient} group-hover:scale-110 transition-transform`}>
                        <config.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {count} notes
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{config.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {config.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-black group-hover:text-primary-foreground transition-colors">
                      View Notes
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Notes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Recent Notes</h2>
            <Button asChild>
              <Link to="/notes/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Note
              </Link>
            </Button>
          </div>
          
          {notes.length === 0 ? (
            <Card className="text-center py-12 shadow-card">
              <CardContent>
                <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No notes yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by creating your first note in any category
                </p>
                <Button asChild>
                  <Link to="/notes/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Note
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {notes.slice(0, 6).map((note) => {
                const category = categoryConfig[note.category];
                return (
                  <Link key={note.id} to={`/note/${note.id}`}>
                    <Card className="hover:shadow-hover transition-shadow cursor-pointer shadow-card">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div 
                            className="h-3 w-3 rounded-full mt-1"
                            style={{ backgroundColor: note.color?.hex || '#999' }}
                          />
                          <Badge variant="secondary" className="text-xs">
                            <category.icon className="mr-1 h-3 w-3" />
                            {category.name}
                            {note.category === 'secrets' && <Lock className="ml-1 h-3 w-3" />}
                          </Badge>
                        </div>
                        <CardTitle className="text-base line-clamp-2">{note.title}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {note.category === 'secrets' ? '••••••••••••••••••••' : note.content}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}