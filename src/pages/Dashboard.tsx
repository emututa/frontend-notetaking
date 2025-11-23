




import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Heart, 
  Briefcase, 
  Lock, 
  Star,
  FileText,
  Home,
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch notes from backend
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await fetch('/api/notes');
        const data = await res.json();
        const mapped = data.map((note: any) => ({ ...note, id: note._id }));
        setNotes(mapped);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    };
    
    fetchAllNotes();
  }, []);

  // Helper function to get notes by category
  const getNotesByCategory = (category: string) => {
    return notes.filter((note: any) => note.category === category);
  };

  const totalNotes = notes.length;
  const favouriteNotes = getNotesByCategory('favourite').length;

  const categoryStats = [
    { 
      name: 'Personal', 
      count: getNotesByCategory('personal').length, 
      icon: Heart, 
      gradient: 'bg-gradient-personal',
      route: '/category/personal'
    },
    { 
      name: 'Work', 
      count: getNotesByCategory('work').length, 
      icon: Briefcase, 
      gradient: 'bg-gradient-work',
      route: '/category/work'
    },
    { 
      name: 'Secrets', 
      count: getNotesByCategory('secrets').length, 
      icon: Lock, 
      gradient: 'bg-gradient-secrets',
      route: '/category/secrets'
    },
    { 
      name: 'Favourite', 
      count: getNotesByCategory('favourite').length, 
      icon: Star, 
      gradient: 'bg-gradient-favourite',
      route: '/category/favourite'
    },
  ];

  const recentNotes = notes.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 space-y-8 hidden md:block">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center">
            {/* <span className="text-lg font-bold text-white">TK</span> */}
            <img src="public/imgs/logo.png" alt="" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Take Note</h2>
            <p className="text-sm text-black/50">Smart Notes 2025</p>
          </div>
        </div>

        {/* New Note Button */}
        <Button asChild className="w-full bg-foreground text-background  hover:bg-[#C77D00] ">
          <Link to="/notes/new">
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Link>
        </Button>

        {/* Navigation Main */}
        <nav className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Main</h3>
          
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/dashboard" className="flex items-center gap-3">
              <Home className="h-4 w-4" />
              Home
            </Link>
          </Button>
          
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/notes" className="flex items-center gap-3">
              <FileText className="h-4 w-4" />
              All Notes
            </Link>
          </Button>
          
          <Button variant="ghost" asChild className="w-full justify-start">
            <Link to="/search" className="flex items-center gap-3">
              <Search className="h-4 w-4" />
              Search
            </Link>
          </Button>

          <h3 className="text-sm font-medium text-muted-foreground mt-8 mb-4">Categories</h3>
          
          {categoryStats.map((category) => (
            <Button key={category.name} variant="ghost" asChild className="w-full justify-start">
              <Link to={category.route} className="flex items-center gap-3">
                <category.icon className="h-4 w-4" />
                {category.name}
                {category.count > 0 && (
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {category.count}
                  </Badge>
                )}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Write smart   </h1>
            
          </div>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <Button variant="outline" asChild className='px-8 md:px-14 w-full md:w-auto'>
              <Link to="/search">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Link>
            </Button>
            <Button asChild className="bg-black border-0 w-full md:w-auto">
              <Link to="/notes/new">
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Link>
            </Button>
          </div>
        </div>

<div className="dashimg flex flex-col items-center justify-center ">
  <p className='text-xl md:text-3xl font-bold text-[#C77D00] text-center'>It's time to note it down </p>
        <img src="/imgs/Notepad.png" alt="notepad" className='w-full max-w-xs md:max-w-md bg-gray-50 rounded-md ' />
</div>
       
      </div>
    </div>
  );
}