

import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, FileText, Heart, Briefcase, Lock, Star } from 'lucide-react';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(true);
  const [filteredNotes, setFilteredNotes] = useState([]);

  const categoryConfig = {
    personal: { icon: Heart, gradient: 'from-pink-500 to-rose-500' },
    work: { icon: Briefcase, gradient: 'from-blue-500 to-cyan-500' },
    secrets: { icon: Lock, gradient: 'from-purple-500 to-indigo-500' },
    favourite: { icon: Star, gradient: 'from-yellow-500 to-orange-500' },
  };

  // Fetch all notes from backend
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://backendnote-app3.onrender.com/api/notes');
        const data = await res.json();
        const mapped = data.map((note) => ({ ...note, id: note._id }));
        setNotes(mapped);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Filter notes based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = notes.filter((note) => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
      );
      setFilteredNotes(filtered);
    } else {
      setFilteredNotes([]);
    }
  }, [searchQuery, notes]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Notes</h1>
              <p className="text-gray-500 text-sm mt-1">Find what you're looking for</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>
      </header>

      {/* Results */}
      <main className="max-w-6xl mx-auto px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-4">Loading notes...</p>
          </div>
        ) : searchQuery.trim() === '' ? (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Start searching</h3>
            <p className="text-gray-500">Type something to search through your notes</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div>
            <div className="mb-6">
              <p className="text-gray-600">
                Found <span className="font-semibold text-gray-900">{filteredNotes.length}</span> {filteredNotes.length === 1 ? 'note' : 'notes'} for "{searchQuery}"
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => {
                const categoryInfo = categoryConfig[note.category] || { icon: FileText, gradient: 'from-gray-400 to-gray-500' };
                const Icon = categoryInfo.icon;
                
                return (
                  <Link
                    key={note.id}
                    to={`/note/${note.id}`}
                    className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{note.title}</h3>
                      <div className={`ml-2 w-8 h-8 rounded-lg bg-gradient-to-br ${categoryInfo.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">{note.content}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="capitalize">{note.category}</span>
                      <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-500 mb-6">Try searching with different keywords</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear search
            </button>
          </div>
        )}
      </main>
    </div>
  );
}