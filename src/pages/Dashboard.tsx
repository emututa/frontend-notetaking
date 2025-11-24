






import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Heart, Briefcase, Lock, Star, FileText, Home, X } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

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

  // Filter notes based on search query
  const filteredNotes = searchQuery.trim()
    ? notes.filter((note) => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes.slice(0, 3);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearching(value.trim().length > 0);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
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
          <Link to="/notes/new">
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
                  onChange={handleSearchChange}
                  className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
                {searchQuery && (
                  <button 
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Link to="/notes/new">
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
          {/* Show categories only when not searching */}
          {!isSearching && (
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
          )}

          {/* Notes Section */}
          <div>
            {isSearching ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Search Results
                  </h2>
                  <p className="text-gray-600">
                    Found <span className="font-semibold">{filteredNotes.length}</span> {filteredNotes.length === 1 ? 'note' : 'notes'}
                  </p>
                </div>
              </>
            ) : (
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Notes</h2>
            )}

            {filteredNotes.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
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
            ) : isSearching ? (
              <div className="bg-white rounded-xl p-12 border border-gray-200 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes found</h3>
                <p className="text-gray-500 mb-6">Try searching with different keywords</p>
                <button 
                  onClick={clearSearch}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear search
                </button>
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