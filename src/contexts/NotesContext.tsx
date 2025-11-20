// import { createContext, useContext, useState, ReactNode } from 'react';
// import { toast } from 'sonner';

// export interface Note {
//   id: string;
//   title: string;
//   content: string;
//   category: 'personal' | 'work' | 'secrets' | 'favourite';
//   color?: { name: string; hex: string };
//   createdAt: string;
//   updatedAt: string;
// }

// interface NotesContextType {
//   notes: Note[];
//   addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
//   updateNote: (id: string, updates: Partial<Note>) => void;
//   deleteNote: (id: string) => void;
//   getNotesByCategory: (category: string) => Note[];
//   getNote: (id: string) => Note | undefined;
//   secretsPassword: string;
//   setSecretsPassword: (password: string) => void;
//   isSecretsUnlocked: boolean;
//   setIsSecretsUnlocked: (unlocked: boolean) => void;
// }

// const NotesContext = createContext<NotesContextType | undefined>(undefined);

// // Sample data
// const sampleNotes: Note[] = [
//   {
//     id: '1',
//     title: 'Meeting Notes',
//     content: 'Discussed project timeline and requirements. Need to follow up on budget approval.',
//     category: 'work',
//     color: { name: 'Green', hex: '#10b981' },
//     createdAt: new Date('2024-01-15').toISOString(),
//     updatedAt: new Date('2024-01-15').toISOString(),
//   },
//   {
//     id: '2',
//     title: 'Grocery List',
//     content: 'Milk, Bread, Eggs, Apples, Chicken, Rice, Vegetables',
//     category: 'personal',
//     color: { name: 'Blue', hex: '#3b82f6' },
//     createdAt: new Date('2024-01-16').toISOString(),
//     updatedAt: new Date('2024-01-16').toISOString(),
//   },
//   {
//     id: '3',
//     title: 'Secret Project',
//     content: 'This is confidential information about the secret project. Access requires password verification.',
//     category: 'secrets',
//     color: { name: 'Red', hex: '#ef4444' },
//     createdAt: new Date('2024-01-17').toISOString(),
//     updatedAt: new Date('2024-01-17').toISOString(),
//   },
//   {
//     id: '4',
//     title: 'Favorite Recipe',
//     content: 'Ingredients: Pasta, tomatoes, garlic, basil. Cook pasta, sauté garlic, add tomatoes and basil.',
//     category: 'favourite',
//     color: { name: 'Yellow', hex: '#f59e0b' },
//     createdAt: new Date('2024-01-18').toISOString(),
//     updatedAt: new Date('2024-01-18').toISOString(),
//   },
// ];

// export function NotesProvider({ children }: { children: ReactNode }) {
//   const [notes, setNotes] = useState<Note[]>(sampleNotes);
//   const [secretsPassword, setSecretsPassword] = useState('password123');
//   const [isSecretsUnlocked, setIsSecretsUnlocked] = useState(false);

//   const addNote = (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
//     const newNote: Note = {
//       ...noteData,
//       id: Date.now().toString(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };
//     setNotes(prev => [newNote, ...prev]);
//     toast.success('Note created successfully!');
//   };

//   const updateNote = (id: string, updates: Partial<Note>) => {
//     setNotes(prev => prev.map(note => 
//       note.id === id 
//         ? { ...note, ...updates, updatedAt: new Date().toISOString() }
//         : note
//     ));
//     toast.success('Note updated successfully!');
//   };

//   const deleteNote = (id: string) => {
//     setNotes(prev => prev.filter(note => note.id !== id));
//     toast.success('Note deleted successfully!');
//   };

//   const getNotesByCategory = (category: string) => {
//     return notes.filter(note => note.category === category);
//   };

//   const getNote = (id: string) => {
//     return notes.find(note => note.id === id);
//   };

//   return (
//     <NotesContext.Provider value={{
//       notes,
//       addNote,
//       updateNote,
//       deleteNote,
//       getNotesByCategory,
//       getNote,
//       secretsPassword,
//       setSecretsPassword,
//       isSecretsUnlocked,
//       setIsSecretsUnlocked,
//     }}>
//       {children}
//     </NotesContext.Provider>
//   );
// }

// export function useNotes() {
//   const context = useContext(NotesContext);
//   if (context === undefined) {
//     throw new Error('useNotes must be used within a NotesProvider');
//   }
//   return context;
// }























import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { checkPassword, setPassword, verifyPassword, changePassword } from '../lib/index';

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

  // Secrets password logic
  secretsPasswordExists: boolean | null;
  isSecretsUnlocked: boolean;
  unlockSecrets: (password: string) => Promise<boolean>;
  setSecretsPassword: (password: string) => Promise<void>;
  changeSecretsPassword: (oldPassword: string, newPassword: string) => Promise<void>;
  lockSecrets: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Sample notes
const sampleNotes: Note[] = [
  { id: '1', title: 'Meeting Notes', content: 'Discussed project timeline.', category: 'work', color: { name: 'Green', hex: '#10b981' }, createdAt: new Date('2024-01-15').toISOString(), updatedAt: new Date('2024-01-15').toISOString() },
  { id: '2', title: 'Grocery List', content: 'Milk, Bread, Eggs', category: 'personal', color: { name: 'Blue', hex: '#3b82f6' }, createdAt: new Date('2024-01-16').toISOString(), updatedAt: new Date('2024-01-16').toISOString() },
  { id: '3', title: 'Secret Project', content: 'Confidential info', category: 'secrets', color: { name: 'Red', hex: '#ef4444' }, createdAt: new Date('2024-01-17').toISOString(), updatedAt: new Date('2024-01-17').toISOString() },
  { id: '4', title: 'Favorite Recipe', content: 'Pasta, tomatoes', category: 'favourite', color: { name: 'Yellow', hex: '#f59e0b' }, createdAt: new Date('2024-01-18').toISOString(), updatedAt: new Date('2024-01-18').toISOString() },
];

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);

  // Secrets password state
  const [secretsPasswordExists, setSecretsPasswordExists] = useState<boolean | null>(null);
  const [isSecretsUnlocked, setIsSecretsUnlocked] = useState(false);

  // Check if secrets password exists on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await checkPassword();
        setSecretsPasswordExists(res.data.hasPassword);
      } catch (err) {
        console.error('Failed to check secrets password', err);
      }
    })();
  }, []);

  // Notes functions
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
    setNotes(prev => prev.map(note => note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note));
    toast.success('Note updated successfully!');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast.success('Note deleted successfully!');
  };

  const getNotesByCategory = (category: string) => notes.filter(note => note.category === category);
  const getNote = (id: string) => notes.find(note => note.id === id);

  // Secrets password functions
  const unlockSecrets = async (password: string) => {
    try {
      const res = await verifyPassword(password);
      if (res.data.success) {
        setIsSecretsUnlocked(true);
        return true;
      }
    } catch (err) {
      console.error('Unlock secrets failed', err);
    }
    return false;
  };

  const setSecretsPasswordHandler = async (password: string) => {
    try {
      await setPassword(password);
      setSecretsPasswordExists(true);
      toast.success('Secrets password set!');
    } catch (err) {
      console.error('Set secrets password failed', err);
    }
  };

  const changeSecretsPasswordHandler = async (oldPassword: string, newPassword: string) => {
    try {
      await changePassword(oldPassword, newPassword);
      toast.success('Secrets password updated!');
    } catch (err) {
      console.error('Change secrets password failed', err);
    }
  };

  const lockSecrets = () => setIsSecretsUnlocked(false);

  return (
    <NotesContext.Provider value={{
      notes,
      addNote,
      updateNote,
      deleteNote,
      getNotesByCategory,
      getNote,
      secretsPasswordExists,
      isSecretsUnlocked,
      unlockSecrets,
      setSecretsPassword: setSecretsPasswordHandler,
      changeSecretsPassword: changeSecretsPasswordHandler,
      lockSecrets,
    }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within NotesProvider');
  return context;
}
