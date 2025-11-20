



import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Copy, RotateCcw, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface TextSimplifierProps {
  originalText: string;
  onSimplifiedTextAccept: (simplifiedText: string) => void;
  onCancel: () => void;
}

export default function TextSimplifier({
  originalText,
  onSimplifiedTextAccept,
  onCancel
}: TextSimplifierProps) {
  const [simplifiedText, setSimplifiedText] = useState('');
  const [isSimplifying, setIsSimplifying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const simplifyText = async () => {
    if (!originalText.trim()) return;

    setIsSimplifying(true);
    setError('');

    try {
      const res = await fetch('https://backendnote-app3.onrender.com/api/notes/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteText: originalText }),
      });

      if (!res.ok) {
        throw new Error('Failed to simplify text');
      }

      const data = await res.json();
      setSimplifiedText(data.summary);
      toast.success('Text simplified successfully!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong');
      toast.error('Failed to simplify text. Please try again.');
    } finally {
      setIsSimplifying(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(simplifiedText);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const handleAccept = () => {
    onSimplifiedTextAccept(simplifiedText);
    toast.success('Simplified text accepted!');
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Text Simplification
            </CardTitle>
            <Badge variant="secondary">AI Powered</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Original Text */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Original Text:</label>
            <div className="p-4 bg-muted rounded-lg border">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {originalText || 'No text provided'}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              {originalText.split(' ').length} words • {originalText.length} characters
            </p>
          </div>

          {/* Simplify Button */}
          {!simplifiedText && (
            <Button
              onClick={simplifyText}
              disabled={isSimplifying || !originalText.trim()}
              className="w-full bg-gradient-primary border-0"
            >
              {isSimplifying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              {isSimplifying ? 'Simplifying...' : 'Simplify Text'}
            </Button>
          )}

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Simplified Text */}
          {simplifiedText && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Simplified Text:</label>
                <Textarea
                  value={simplifiedText}
                  onChange={(e) => setSimplifiedText(e.target.value)}
                  rows={6}
                  className="resize-none"
                  placeholder="Simplified text will appear here..."
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {simplifiedText.split(' ').length} words • {simplifiedText.length} characters
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={copyToClipboard}
                      variant="outline"
                      size="sm"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-3 w-3" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-gradient-primary border-0"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Use Simplified Text
                </Button>
                
                <Button
                  onClick={() => setSimplifiedText('')}
                  variant="outline"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                
                <Button
                  onClick={onCancel}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-xs text-muted-foreground text-center">
              <Sparkles className="inline h-3 w-3 mr-1" />
              AI will simplify complex sentences, remove jargon, and make your text clearer
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
