



// import { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Plus, Heart, Briefcase, Lock, Star, ArrowLeft, Eye } from 'lucide-react';
// import { PasswordModal } from '@/components/PasswordModal';
// import { toast } from 'sonner';
// import { useNotes } from '@/contexts/NotesContext'; // <-- merged context

// const categoryConfig = {
//   personal: { 
//     name: 'Personal', 
//     icon: Heart, 
//     gradient: 'bg-gradient-personal',
//     description: 'Personal thoughts and ideas'
//   },
//   work: { 
//     name: 'Work', 
//     icon: Briefcase, 
//     gradient: 'bg-gradient-work',
//     description: 'Work related notes and tasks'
//   },
//   secrets: { 
//     name: 'Secrets', 
//     icon: Lock, 
//     gradient: 'bg-gradient-secrets',
//     description: 'Private and confidential notes'
//   },
//   favourite: { 
//     name: 'Favourites', 
//     icon: Star, 
//     gradient: 'bg-gradient-favourite',
//     description: 'Your favorite and important notes'
//   },
// } as const;

// interface Note {
//   id: string;
//   title: string;
//   content: string;
//   category: string;
//   createdAt: string;
//   color?: string;
// }

// export default function CategoryPage() {
//   const { category } = useParams();
//   const navigate = useNavigate();

//   const {
//     notes: allNotes,
//     isSecretsUnlocked,
//     unlockSecrets,
//     lockSecrets,
//     getNotesByCategory
//   } = useNotes(); // <-- useNotes now handles everything

//   const [showPasswordModal, setShowPasswordModal] = useState(false);
//   const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

//   const categoryKey = category as keyof typeof categoryConfig;
//   const categoryInfo = categoryConfig[categoryKey];

//   const notes = getNotesByCategory(categoryKey); // get notes from context

//   if (!categoryInfo) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Category not found</h2>
//           <p className="text-muted-foreground mb-4">
//             The requested category does not exist.
//           </p>
//           <Button asChild>
//             <Link to="/notes">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Notes
//             </Link>
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const handleNoteClick = (noteId: string) => {
//     if (categoryKey === 'secrets') {
//       if (isSecretsUnlocked) {
//         navigate(`/note/${noteId}`);
//       } else {
//         setSelectedNoteId(noteId);
//         setShowPasswordModal(true);
//       }
//     } else {
//       navigate(`/note/${noteId}`);
//     }
//   };

//   const handlePasswordSuccess = () => {
//     if (selectedNoteId) {
//       setShowPasswordModal(false);
//       navigate(`/note/${selectedNoteId}`);
//       setSelectedNoteId(null);
//     }
//   };

//   const handlePasswordClose = () => {
//     setShowPasswordModal(false);
//     setSelectedNoteId(null);
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-background">
//         <div className="container mx-auto px-4 py-8">
//           {/* Header */}
//           <div className="flex items-center gap-4 mb-8">
//             <Button variant="ghost" asChild>
//               <Link to="/notes">
//                 <ArrowLeft className="h-4 w-4" />
//               </Link>
//             </Button>
//             <div className="flex items-center gap-3">
//               <div className={`p-3 rounded-xl ${categoryInfo.gradient} shadow-lg`}>
//                 <categoryInfo.icon className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-3xl font-bold">{categoryInfo.name} Notes</h1>
//                 <p className="text-muted-foreground">{notes.length} notes • {categoryInfo.description}</p>
//               </div>
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="flex flex-wrap gap-4 mb-8">
//             <Button asChild>
//               <Link to="/notes/new">
//                 <Plus className="mr-2 h-4 w-4" />
//                 Create New Note
//               </Link>
//             </Button>
            
//             {categoryKey === 'secrets' && (
//               <Button 
//                 variant={isSecretsUnlocked ? "secondary" : "outline"} 
//                 onClick={() => {
//                   if (isSecretsUnlocked) {
//                     lockSecrets();
//                     toast.success('Secrets locked for security');
//                   } else {
//                     setShowPasswordModal(true);
//                   }
//                 }}
//               >
//                 <Lock className="mr-2 h-4 w-4" />
//                 {isSecretsUnlocked ? 'Lock Secrets' : 'Unlock All Secrets'}
//               </Button>
//             )}
//           </div>

//           {/* Notes Grid */}
//           {notes.length === 0 ? (
//             <Card className="text-center py-16 shadow-card">
//               <CardContent>
//                 <categoryInfo.icon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
//                 <h3 className="text-xl font-semibold mb-2">No {categoryInfo.name.toLowerCase()} notes yet</h3>
//                 <p className="text-muted-foreground mb-4">
//                   Create your first {categoryInfo.name.toLowerCase()} note to get started
//                 </p>
//                 <Button asChild>
//                   <Link to="/notes/new">
//                     <Plus className="mr-2 h-4 w-4" />
//                     Create New Note
//                   </Link>
//                 </Button>
//               </CardContent>
//             </Card>
//           ) : (
//             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//               {notes.map((note) => (
//                 <Card
//                   key={note.id}
//                   className="hover:shadow-hover transition-all cursor-pointer group shadow-card"
//                   onClick={() => handleNoteClick(note.id)}
//                 >
//                   <CardHeader className="pb-3">
//                     <div className="flex items-start justify-between">
//                       <div 
//                         className="h-3 w-3 rounded-full mt-1 group-hover:scale-125 transition-transform"
//                         style={{ backgroundColor: note.color || '#999' }}
//                       />
//                       <Badge variant="secondary" className="text-xs flex items-center gap-1">
//                         <categoryInfo.icon className="h-3 w-3" />
//                         {categoryInfo.name}
//                         {categoryKey === 'secrets' && !isSecretsUnlocked && <Lock className="ml-1 h-3 w-3" />}
//                       </Badge>
//                     </div>
//                     <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
//                       {note.title}
//                     </CardTitle>
//                     <CardDescription className="text-sm">
//                       Created {new Date(note.createdAt).toLocaleDateString()}
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="pt-0">
//                     <p className="text-sm text-muted-foreground line-clamp-4 mb-4">
//                       {categoryKey === 'secrets' && !isSecretsUnlocked 
//                         ? '••••••••••••••••••••••••••••••••••••••••••••••••••'
//                         : note.content
//                       }
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div className="text-xs text-muted-foreground">
//                         {categoryKey === 'secrets' && !isSecretsUnlocked ? 'Protected' : 'Click to view'}
//                       </div>
//                       <Eye className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Password Modal */}
//       <PasswordModal
//         isOpen={showPasswordModal}
//         onClose={handlePasswordClose}
//         onSuccess={handlePasswordSuccess}
//       />
//     </>
//   );
// }
















import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Heart, Briefcase, Lock, Star, Trash2 } from 'lucide-react';

export default function CategoryPage() {
  const { category } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryConfig = {
    personal: { name: 'Personal', icon: Heart, gradient: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', text: 'text-pink-600' },
    work: { name: 'Work', icon: Briefcase, gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', text: 'text-blue-600' },
    secrets: { name: 'Secrets', icon: Lock, gradient: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50', text: 'text-purple-600' },
    favourite: { name: 'Favourite', icon: Star, gradient: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50', text: 'text-yellow-600' }
  };

  const currentCategory = categoryConfig[category] || categoryConfig.personal;
  const Icon = currentCategory.icon;

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching notes for category:', category);
        const res = await fetch('https://backendnote-app3.onrender.com/api/notes');
        const data = await res.json();
        console.log('All notes:', data);
        
        const filtered = data.filter(note => note.category === category);
        console.log(`Filtered ${category} notes:`, filtered);
        
        setNotes(filtered);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [category]);

  const handleDelete = async (noteId) => {
    if (!confirm('Delete this note?')) return;
    try {
      await fetch(`https://backendnote-app3.onrender.com/api/notes/${noteId}`, { method: 'DELETE' });
      setNotes(notes.filter(n => n._id !== noteId));
    } catch (err) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
  {/* Header */}
  <div className={`${currentCategory.bg} border-b border-gray-200`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link to="/" className="p-2 hover:bg-white/50 rounded-lg flex-shrink-0">
            <ArrowLeft className={`w-5 h-5 sm:w-6 sm:h-6 ${currentCategory.text}`} />
          </Link>
          <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${currentCategory.gradient} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
          </div>
          <div>
            <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${currentCategory.text}`}>{currentCategory.name}</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1">{notes.length} notes</p>
          </div>
        </div>
        <Link to="/notes/new" className="w-full sm:w-auto">
          <button className={`bg-gradient-to-r ${currentCategory.gradient} text-white px-4 py-2.5 sm:px-5 sm:py-3 lg:px-6 lg:py-3 rounded-lg hover:opacity-90 w-full sm:w-auto text-sm sm:text-base`}>
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
            New Note
          </button>
        </Link>
      </div>
    </div>
  </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-xl border p-16 text-center">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${currentCategory.gradient} flex items-center justify-center mx-auto mb-6`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2">No {currentCategory.name} notes yet</h3>
            <p className="text-gray-500 mb-6">Create your first {currentCategory.name.toLowerCase()} note</p>
            <Link to="/create">
              <button className={`bg-gradient-to-r ${currentCategory.gradient} text-white px-8 py-3 rounded-lg`}>
                <Plus className="w-5 h-5 inline mr-2" />
                Create Note
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note._id} className="bg-white rounded-xl border p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold flex-1">{note.title}</h3>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: note.color || '#3b82f6' }}></div>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-4">{note.content}</p>
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="text-sm text-gray-400">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Link to={`/note/${note._id}`}>
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <span className="text-sm">View</span>
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(note._id)} className="p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}