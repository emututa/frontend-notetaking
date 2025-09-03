import { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'personal' | 'work' | 'secrets' | 'favourite';
  color?: { name: string; hex: string };
  createdAt: string;
  updatedAt: string;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  getNotesByCategory: (category: string) => Note[];
  getNote: (id: string) => Note | undefined;
  secretsPassword: string;
  setSecretsPassword: (password: string) => void;
  isSecretsUnlocked: boolean;
  setIsSecretsUnlocked: (unlocked: boolean) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Sample data
const sampleNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes',
    content: 'Discussed project timeline and requirements. Need to follow up on budget approval.',
    category: 'work',
    color: { name: 'Green', hex: '#10b981' },
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: '2',
    title: 'Grocery List',
    content: 'Milk, Bread, Eggs, Apples, Chicken, Rice, Vegetables',
    category: 'personal',
    color: { name: 'Blue', hex: '#3b82f6' },
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString(),
  },
  {
    id: '3',
    title: 'Secret Project',
    content: 'This is confidential information about the secret project. Access requires password verification.',
    category: 'secrets',
    color: { name: 'Red', hex: '#ef4444' },
    createdAt: new Date('2024-01-17').toISOString(),
    updatedAt: new Date('2024-01-17').toISOString(),
  },
  {
    id: '4',
    title: 'Favorite Recipe',
    content: 'Ingredients: Pasta, tomatoes, garlic, basil. Cook pasta, sauté garlic, add tomatoes and basil.',
    category: 'favourite',
    color: { name: 'Yellow', hex: '#f59e0b' },
    createdAt: new Date('2024-01-18').toISOString(),
    updatedAt: new Date('2024-01-18').toISOString(),
  },
];

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);
  const [secretsPassword, setSecretsPassword] = useState('password123');
  const [isSecretsUnlocked, setIsSecretsUnlocked] = useState(false);

  const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...noteData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    toast.success('Note created successfully!');
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ));
    toast.success('Note updated successfully!');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast.success('Note deleted successfully!');
  };

  const getNotesByCategory = (category: string) => {
    return notes.filter(note => note.category === category);
  };

  const getNote = (id: string) => {
    return notes.find(note => note.id === id);
  };

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      updateNote,
      deleteNote,
      getNotesByCategory,
      getNote,
      secretsPassword,
      setSecretsPassword,
      isSecretsUnlocked,
      setIsSecretsUnlocked,
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
}