




// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Plus, 
//   Search, 
//   Heart, 
//   Briefcase, 
//   Lock, 
//   Star,
//   FileText,
//   Home,
// } from 'lucide-react';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch notes from backend
//   useEffect(() => {
//     const fetchAllNotes = async () => {
//       try {
//         const res = await fetch('https://backendnote-app3.onrender.com/api/notes');
//         const data = await res.json();
//         const mapped = data.map((note: any) => ({ ...note, id: note._id }));
//         setNotes(mapped);
//       } catch (err) {
//         console.error('Failed to fetch notes:', err);
//       }
//     };
    
//     fetchAllNotes();
//   }, []);

//   // Helper function to get notes by category
//   const getNotesByCategory = (category: string) => {
//     return notes.filter((note: any) => note.category === category);
//   };

//   const totalNotes = notes.length;
//   const favouriteNotes = getNotesByCategory('favourite').length;

//   const categoryStats = [
//     { 
//       name: 'Personal', 
//       count: getNotesByCategory('personal').length, 
//       icon: Heart, 
//       gradient: 'bg-gradient-personal',
//       route: '/category/personal'
//     },
//     { 
//       name: 'Work', 
//       count: getNotesByCategory('work').length, 
//       icon: Briefcase, 
//       gradient: 'bg-gradient-work',
//       route: '/category/work'
//     },
//     { 
//       name: 'Secrets', 
//       count: getNotesByCategory('secrets').length, 
//       icon: Lock, 
//       gradient: 'bg-gradient-secrets',
//       route: '/category/secrets'
//     },
//     { 
//       name: 'Favourite', 
//       count: getNotesByCategory('favourite').length, 
//       icon: Star, 
//       gradient: 'bg-gradient-favourite',
//       route: '/category/favourite'
//     },
//   ];

//   const recentNotes = notes.slice(0, 3);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Sidebar */}
//       <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 space-y-8 hidden md:block">
//         {/* Logo */}
//         <div className="flex items-center gap-3">
//           <div className="w-16 h-16 rounded-xl flex items-center justify-center">
//             {/* <span className="text-lg font-bold text-white">TK</span> */}
//             <img src="/imgs/logo.png" alt="" />
//           </div>
//           <div>
//             <h2 className="text-lg font-bold text-foreground">Take Note</h2>
//             <p className="text-sm text-black/50">Smart Notes 2025</p>
//           </div>
//         </div>

//         {/* New Note Button */}
//         <Button asChild className="w-full bg-foreground text-background  hover:bg-[#C77D00] ">
//           <Link to="/notes/new">
//             <Plus className="mr-2 h-4 w-4" />
//             New Note
//           </Link>
//         </Button>

//         {/* Navigation Main */}
//         <nav className="space-y-2">
//           <h3 className="text-sm font-medium text-muted-foreground mb-4">Main</h3>
          
//           <Button variant="ghost" asChild className="w-full justify-start">
//             <Link to="/dashboard" className="flex items-center gap-3">
//               <Home className="h-4 w-4" />
//               Home
//             </Link>
//           </Button>
          
//           <Button variant="ghost" asChild className="w-full justify-start">
//             <Link to="/notes" className="flex items-center gap-3">
//               <FileText className="h-4 w-4" />
//               All Notes
//             </Link>
//           </Button>
          
//           <Button variant="ghost" asChild className="w-full justify-start">
//             <Link to="/search" className="flex items-center gap-3">
//               <Search className="h-4 w-4" />
//               Search
//             </Link>
//           </Button>

//           <h3 className="text-sm font-medium text-muted-foreground mt-8 mb-4">Categories</h3>
          
//           {categoryStats.map((category) => (
//             <Button key={category.name} variant="ghost" asChild className="w-full justify-start">
//               <Link to={category.route} className="flex items-center gap-3">
//                 <category.icon className="h-4 w-4" />
//                 {category.name}
//                 {category.count > 0 && (
//                   <Badge variant="secondary" className="ml-auto text-xs">
//                     {category.count}
//                   </Badge>
//                 )}
//               </Link>
//             </Button>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="ml-0 md:ml-64 p-4 md:p-8">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-foreground">Write smart   </h1>
            
//           </div>
//           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
//             <Button variant="outline" asChild className='px-8 md:px-14 w-full md:w-auto'>
//               <Link to="/search">
//                 <Search className="mr-2 h-4 w-4" />
//                 Search
//               </Link>
//             </Button>
//             <Button asChild className="bg-black border-0 w-full md:w-auto">
//               <Link to="/notes/new">
//                 <Plus className="mr-2 h-4 w-4" />
//                 New Note
//               </Link>
//             </Button>
//           </div>
//         </div>

// <div className="dashimg flex flex-col items-center justify-center ">
//   <p className='text-xl md:text-3xl font-bold text-[#C77D00] text-center'>It's time to note it down </p>
//         <img src="/imgs/Notepad.png" alt="notepad" className='w-full max-w-xs md:max-w-md bg-gray-50 rounded-md ' />
// </div>
       
//       </div>
//     </div>
//   );
// }






















// import { useState, useEffect } from 'react';
// import { Plus, Search, Heart, Briefcase, Lock, Star, FileText, Home } from 'lucide-react';

// export default function Dashboard() {
//   const [notes, setNotes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch notes from backend
//   useEffect(() => {
//     const fetchAllNotes = async () => {
//       try {
//         const res = await fetch('https://backendnote-app3.onrender.com/api/notes');
//         const data = await res.json();
//         const mapped = data.map((note) => ({ ...note, id: note._id }));
//         setNotes(mapped);
//       } catch (err) {
//         console.error('Failed to fetch notes:', err);
//       }
//     };
//     fetchAllNotes();
//   }, []);

//   // Helper function to get notes by category
//   const getNotesByCategory = (category) => {
//     return notes.filter((note) => note.category === category);
//   };

//   const totalNotes = notes.length;

//   const categoryStats = [
//     { 
//       name: 'Personal', 
//       count: getNotesByCategory('personal').length, 
//       icon: Heart, 
//       gradient: 'from-pink-500 to-rose-500'
//     },
//     { 
//       name: 'Work', 
//       count: getNotesByCategory('work').length, 
//       icon: Briefcase, 
//       gradient: 'from-blue-500 to-cyan-500'
//     },
//     { 
//       name: 'Secrets', 
//       count: getNotesByCategory('secrets').length, 
//       icon: Lock, 
//       gradient: 'from-purple-500 to-indigo-500'
//     },
//     { 
//       name: 'Favourite', 
//       count: getNotesByCategory('favourite').length, 
//       icon: Star, 
//       gradient: 'from-yellow-500 to-orange-500'
//     },
//   ];

//   const recentNotes = notes.slice(0, 3);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       alert(`Searching for: ${searchQuery}`);
//       // In your real app: navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch(e);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center gap-2 mb-1">
//             <FileText className="w-6 h-6 text-blue-600" />
//             <span className="font-bold text-xl">Take Note</span>
//           </div>
//           <p className="text-xs text-gray-500">Smart Notes 2025</p>
//         </div>

//         {/* New Note Button */}
//         <div className="p-4">
//           <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors">
//             <Plus className="w-5 h-5" />
//             <span className="font-medium">New Note</span>
//           </button>
//         </div>

//         {/* Navigation Main */}
//         <div className="flex-1 overflow-y-auto px-4">
//           <div className="mb-6">
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main</p>
//             <nav className="space-y-1">
//               <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600">
//                 <Home className="w-5 h-5" />
//                 <span className="font-medium">Home</span>
//               </button>
//               <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
//                 <FileText className="w-5 h-5" />
//                 <span className="font-medium">All Notes</span>
//                 <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
//                   {totalNotes}
//                 </span>
//               </button>
//               <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
//                 <Search className="w-5 h-5" />
//                 <span className="font-medium">Search</span>
//               </button>
//             </nav>
//           </div>

//           {/* Categories */}
//           <div>
//             <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</p>
//             <nav className="space-y-1">
//               {categoryStats.map((category) => {
//                 const Icon = category.icon;
//                 return (
//                   <button 
//                     key={category.name}
//                     className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 group"
//                   >
//                     <div className={`w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br ${category.gradient}`}>
//                       <Icon className="w-3 h-3 text-white" />
//                     </div>
//                     <span className="font-medium">{category.name}</span>
//                     {category.count > 0 && (
//                       <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full group-hover:bg-gray-300">
//                         {category.count}
//                       </span>
//                     )}
//                   </button>
//                 );
//               })}
//             </nav>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white border-b border-gray-200 px-8 py-6">
//           <div className="flex items-center justify-between mb-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Write smart</h1>
//               <p className="text-gray-500 mt-1">It's time to note it down</p>
//             </div>
//             <div className="flex items-center gap-3">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search notes..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
//                 />
//               </div>
//               <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 flex items-center gap-2 transition-colors">
//                 <Plus className="w-4 h-4" />
//                 <span className="font-medium">New Note</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Content Area */}
//         <main className="flex-1 overflow-y-auto p-8">
//           {/* Category Overview */}
//           <div className="grid grid-cols-4 gap-6 mb-8">
//             {categoryStats.map((category) => {
//               const Icon = category.icon;
//               return (
//                 <div 
//                   key={category.name}
//                   className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
//                 >
//                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4`}>
//                     <Icon className="w-6 h-6 text-white" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
//                   <p className="text-2xl font-bold text-gray-900">{category.count}</p>
//                   <p className="text-sm text-gray-500 mt-1">notes</p>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Recent Notes */}
//           <div>
//             <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notes</h2>
//             {recentNotes.length > 0 ? (
//               <div className="grid grid-cols-3 gap-6">
//                 {recentNotes.map((note) => (
//                   <div 
//                     key={note.id}
//                     className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
//                   >
//                     <div className="flex items-start justify-between mb-3">
//                       <h3 className="font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
//                       <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-br ${
//                         categoryStats.find(c => c.name.toLowerCase() === note.category)?.gradient || 'from-gray-400 to-gray-500'
//                       } text-white`}>
//                         {note.category}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 text-sm line-clamp-3">{note.content}</p>
//                     <p className="text-xs text-gray-400 mt-4">
//                       {new Date(note.createdAt).toLocaleDateString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
//                 <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes yet</h3>
//                 <p className="text-gray-500 mb-6">Start creating your first note to see it here</p>
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-6 inline-flex items-center gap-2 transition-colors">
//                   <Plus className="w-4 h-4" />
//                   <span className="font-medium">Create Note</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

















import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Heart, Briefcase, Lock, Star, FileText, Home } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch notes from backend
  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await fetch('https://backendnote-app3.onrender.com/api/notes');
        const data = await res.json();
        const mapped = data.map((note) => ({ ...note, id: note._id }));
        setNotes(mapped);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    };
    fetchAllNotes();
  }, []);

  // Helper function to get notes by category
  const getNotesByCategory = (category) => {
    return notes.filter((note) => note.category === category);
  };

  const totalNotes = notes.length;

  const categoryStats = [
    { 
      name: 'Personal', 
      count: getNotesByCategory('personal').length, 
      icon: Heart, 
      gradient: 'from-pink-500 to-rose-500'
    },
    { 
      name: 'Work', 
      count: getNotesByCategory('work').length, 
      icon: Briefcase, 
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      name: 'Secrets', 
      count: getNotesByCategory('secrets').length, 
      icon: Lock, 
      gradient: 'from-purple-500 to-indigo-500'
    },
    { 
      name: 'Favourite', 
      count: getNotesByCategory('favourite').length, 
      icon: Star, 
      gradient: 'from-yellow-500 to-orange-500'
    },
  ];

  const recentNotes = notes.slice(0, 3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-xl">Take Note</span>
          </div>
          <p className="text-xs text-gray-500">Smart Notes 2025</p>
        </div>

        {/* New Note Button */}
        <div className="p-4">
          <Link to="/create">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 px-4 flex items-center justify-center gap-2 transition-colors">
              <Plus className="w-5 h-5" />
              <span className="font-medium">New Note</span>
            </button>
          </Link>
        </div>

        {/* Navigation Main */}
        <div className="flex-1 overflow-y-auto px-4">
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Main</p>
            <nav className="space-y-1">
              <Link to="/" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600">
                <Home className="w-5 h-5" />
                <span className="font-medium">Home</span>
              </Link>
              <Link to="/notes" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                <FileText className="w-5 h-5" />
                <span className="font-medium">All Notes</span>
                <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {totalNotes}
                </span>
              </Link>
              <Link to="/search" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                <Search className="w-5 h-5" />
                <span className="font-medium">Search</span>
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Categories</p>
            <nav className="space-y-1">
              {categoryStats.map((category) => {
                const Icon = category.icon;
                return (
                  <Link 
                    key={category.name}
                    to={`/category/${category.name.toLowerCase()}`}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 group"
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br ${category.gradient}`}>
                      <Icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium">{category.name}</span>
                    {category.count > 0 && (
                      <span className="ml-auto bg-gray-200 text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full group-hover:bg-gray-300">
                        {category.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Write smart</h1>
              <p className="text-gray-500 mt-1">It's time to note it down</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              <Link to="/create">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 flex items-center gap-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">New Note</span>
                </button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Category Overview */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {categoryStats.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.name}
                  to={`/category/${category.name.toLowerCase()}`}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-2xl font-bold text-gray-900">{category.count}</p>
                  <p className="text-sm text-gray-500 mt-1">notes</p>
                </Link>
              );
            })}
          </div>

          {/* Recent Notes */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notes</h2>
            {recentNotes.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {recentNotes.map((note) => (
                  <Link
                    key={note.id}
                    to={`/note/${note.id}`}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{note.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-br ${
                        categoryStats.find(c => c.name.toLowerCase() === note.category)?.gradient || 'from-gray-400 to-gray-500'
                      } text-white`}>
                        {note.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">{note.content}</p>
                    <p className="text-xs text-gray-400 mt-4">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes yet</h3>
                <p className="text-gray-500 mb-6">Start creating your first note to see it here</p>
                <Link to="/create">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-6 inline-flex items-center gap-2 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Create Note</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}