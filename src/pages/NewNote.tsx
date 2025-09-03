






import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, Heart, Briefcase, Lock, Star, Mic, Type } from 'lucide-react';
import { useNotes } from '@/contexts/NotesContext';
import AudioRecorder from '@/components/AudioRecorder';
import TextSimplifier from '@/components/TextSimplifier';

const categoryOptions = [
  { value: 'personal', label: 'Personal', icon: Heart, gradient: 'bg-gradient-personal' },
  { value: 'work', label: 'Work', icon: Briefcase, gradient: 'bg-gradient-work' },
  { value: 'secrets', label: 'Secrets', icon: Lock, gradient: 'bg-gradient-secrets' },
  { value: 'favourite', label: 'Favourites', icon: Star, gradient: 'bg-gradient-favourite' },
];

const colorOptions = [
  { name: 'Blue', hex: '#3b82f6' },
  { name: 'Green', hex: '#10b981' },
  { name: 'Red', hex: '#ef4444' },
  { name: 'Yellow', hex: '#f59e0b' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Pink', hex: '#ec4899' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Orange', hex: '#f97316' },
];

export default function NewNote() {
  const navigate = useNavigate();
  const { addNote } = useNotes();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'personal' | 'work' | 'secrets' | 'favourite'>('personal');
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [showSimplifier, setShowSimplifier] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fixed: Save to backend database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    setIsLoading(true);

    try {
      // Send to backend API via proxy
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          category,
          color: selectedColor.hex, // Send just the hex value, not the whole object
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error:', errorData);
        throw new Error(`Failed to save note: ${response.status} ${response.statusText}`);
      }

      const savedNote = await response.json();
      
      // Also update local context if needed
      addNote({
        title: title.trim(),
        content: content.trim(),
        category,
        color: selectedColor,
      });

      navigate(`/category/${category}`);
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ When transcription is done manually (Convert to Text)
  const handleTranscriptionComplete = (text: string) => {
    setTranscribedText(text);
    setContent(text);
  };

  const handleSimplifyRequest = () => {
    if (content.trim()) setShowSimplifier(true);
  };

  const handleSimplifiedTextAccept = (simplifiedText: string) => {
    setContent(simplifiedText);
    setShowSimplifier(false);
  };

  const selectedCategoryInfo = categoryOptions.find(opt => opt.value === category);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" asChild>
            <Link to="/notes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Create New Note</h1>
        </div>

        {/* Show Text Simplifier */}
        {showSimplifier && (
          <TextSimplifier
            originalText={content}
            onSimplifiedTextAccept={handleSimplifiedTextAccept}
            onCancel={() => setShowSimplifier(false)}
          />
        )}

        {/* Form */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              {selectedCategoryInfo && (
                <div className={`p-2 rounded-lg ${selectedCategoryInfo.gradient}`}>
                  <img src="/imgs/logo.png" alt="logo" width={80} height={80}/>
                </div>
              )}
              <CardTitle>Note Details</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="type" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="type" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Type Note
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Voice Note
                </TabsTrigger>
              </TabsList>
              
              {/* Typed Note */}
              <TabsContent value="type">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter note title..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select value={category} onValueChange={(value: any) => setCategory(value)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <opt.icon className="h-4 w-4" />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Color</Label>
                    <div className="grid grid-cols-8 gap-2">
                      {colorOptions.map(color => (
                        <button
                          key={color.name}
                          type="button"
                          className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                            selectedColor.hex === color.hex 
                              ? 'border-primary ring-2 ring-primary ring-offset-2' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(color)}
                          title={color.name}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Selected: {selectedColor.name}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="content">Content</Label>
                      {content.trim() && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleSimplifyRequest}
                        >
                          Simplify Text
                        </Button>
                      )}
                    </div>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your note here..."
                      rows={12}
                      className="resize-none"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-primary bg-black border-0"
                      disabled={isLoading}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? 'Saving...' : 'Save Note'}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link to="/notes">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Voice Note */}
              <TabsContent value="voice" className="space-y-6">
                <AudioRecorder onTranscriptionComplete={handleTranscriptionComplete} />

                {transcribedText && (
                  <div className="space-y-4">
                    <Label>Transcribed Content:</Label>
                    <Textarea
                      value={transcribedText}
                      onChange={(e) => {
                        setTranscribedText(e.target.value);
                        setContent(e.target.value);
                      }}
                      rows={6}
                      className="resize-none"
                    />
                    <Button
                      type="button"
                      onClick={handleSimplifyRequest}
                      variant="outline"
                      className="flex-1"
                    >
                      Simplify This Text
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="voice-title">Title</Label>
                  <Input
                    id="voice-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter note title..."
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button 
                    onClick={handleSubmit} 
                    className="flex-1 bg-gradient-primary border-0"
                    disabled={!title.trim() || !content.trim() || isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? 'Saving...' : 'Save Voice Note'}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/notes">Cancel</Link>
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}