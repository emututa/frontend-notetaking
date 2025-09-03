



import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Heart,
  Briefcase,
  Lock,
  Star,
  Edit,
  Trash2,
  Calendar,
  Save,
  X,
} from "lucide-react";
import { PasswordModal } from "@/components/PasswordModal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categoryConfig = {
  personal: {
    name: "Personal",
    icon: Heart,
    gradient: "bg-gradient-personal",
  },
  work: {
    name: "Work",
    icon: Briefcase,
    gradient: "bg-gradient-work",
  },
  secrets: {
    name: "Secrets",
    icon: Lock,
    gradient: "bg-gradient-secrets",
  },
  favourite: {
    name: "Favourites",
    icon: Star,
    gradient: "bg-gradient-favourite",
  },
} as const;

type Note = {
  _id: string;
  title: string;
  content: string;
  category: keyof typeof categoryConfig;
  color?: { hex: string };
  createdAt: string;
  updatedAt: string;
};

export default function NotePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isSecretsUnlocked, setIsSecretsUnlocked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/notes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch note");
        const data = await res.json();
        setNote(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchNote();
  }, [id]);

  // Update note
  const handleSaveEdit = async () => {
    if (!note) return;
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...note,
          title: editTitle,
          content: editContent,
          updatedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Failed to update note");
      const updated = await res.json();
      setNote(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete note
  const handleDelete = async () => {
    if (!note) return;
    if (!confirm("Are you sure you want to delete this note?")) return;
    try {
      await fetch(`http://localhost:5000/api/notes/${note._id}`, {
        method: "DELETE",
      });
      navigate(`/notes`);
    } catch (err) {
      console.error(err);
    }
  };

  // Preload values when editing
  const handleStartEdit = () => {
    if (!note) return;
    setIsEditing(true);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle("");
    setEditContent("");
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Note not found</h2>
          <p className="text-muted-foreground mb-4">
            The requested note does not exist.
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

  // Handle secret notes
  if (note.category === "secrets" && !isSecretsUnlocked) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Card className="max-w-md mx-auto shadow-card">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 rounded-xl bg-gradient-secrets w-fit mb-4">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <CardTitle>Protected Note</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                This note is protected. Please enter the password to view its
                contents.
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Unlock Note
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to={`/category/${note.category}`}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Category
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => setIsSecretsUnlocked(true)}
        />
      </>
    );
  }

  const categoryInfo = categoryConfig[note.category];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to={`/category/${note.category}`}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Badge variant="secondary" className="text-sm">
              <categoryInfo.icon className="mr-1 h-4 w-4" />
              {categoryInfo.name}
              {note.category === "secrets" && <Lock className="ml-1 h-4 w-4" />}
            </Badge>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSaveEdit}>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleStartEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Note Content */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div
                className="h-4 w-4 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: note.color?.hex || "#999" }}
              />
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-2xl mb-2 font-bold"
                  />
                ) : (
                  <CardTitle className="text-2xl mb-2 break-words">
                    {note.title}
                  </CardTitle>
                )}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Created {new Date(note.createdAt).toLocaleDateString()}
                  </div>
                  {note.updatedAt !== note.createdAt && (
                    <div>
                      Updated {new Date(note.updatedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {isEditing ? (
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={10}
              />
            ) : (
              <div className="prose prose-gray max-w-none">
                <p className="text-base leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {!isEditing && (
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild>
              <Link to={`/category/${note.category}`}>
                View More {categoryInfo.name} Notes
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/notes">All Notes</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}


