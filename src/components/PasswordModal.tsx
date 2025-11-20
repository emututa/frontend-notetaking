// import { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { Lock, Eye, EyeOff } from 'lucide-react';
// import { useNotes } from '@/contexts/NotesContext';

// interface PasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { secretsPassword, setIsSecretsUnlocked } = useNotes();

//   const handleSubmit = async (e?: React.FormEvent) => {
//     e?.preventDefault();

//     if (!password) {
//       toast.error('Please enter a password');
//       return;
//     }

//     setLoading(true);

//     // Simulate password verification
//     setTimeout(() => {
//       if (password === secretsPassword) {
//         toast.success('Password correct! Access granted.');
//         setPassword('');
//         setIsSecretsUnlocked(true);
//         onSuccess();
//         onClose();
//       } else {
//         toast.error('Invalid password. Try again.');
//       }
//       setLoading(false);
//     }, 500);
//   };

//   const handleClose = () => {
//     setPassword('');
//     setIsSecretsUnlocked(false);
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <div className="flex items-center gap-2 justify-center">
//             <div className="p-2 rounded-lg bg-gradient-secrets">
//               <Lock className="h-5 w-5 text-white" />
//             </div>
//           </div>
//           <DialogTitle className="text-center">Enter Secrets Password</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <Input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Enter password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="pr-10"
//               autoFocus
//             />
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-4 w-4 text-muted-foreground" />
//               ) : (
//                 <Eye className="h-4 w-4 text-muted-foreground" />
//               )}
//             </Button>
//           </div>
//           <div className="text-xs text-muted-foreground text-center">
//             Hint: The default password is "password123"
//           </div>
//         </form>
//         <DialogFooter>
//           <Button variant="outline" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={loading} className="bg-gradient-secrets border-0">
//             {loading ? 'Checking...' : 'Unlock Secrets'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }







// import { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';
// import { Lock, Eye, EyeOff } from 'lucide-react';
// import { useSecrets } from '@/contexts/secretsContext';

// interface PasswordModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// export function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const { unlock } = useSecrets();

//   const handleSubmit = async (e?: React.FormEvent) => {
//     e?.preventDefault();

//     if (!password) {
//       toast.error('Please enter a password');
//       return;
//     }

//     setLoading(true);

//     try {
//       const success = await unlock(password);
//       if (success) {
//         toast.success('Password correct! Access granted.');
//         setPassword('');
//         onSuccess();
//         onClose();
//       } else {
//         toast.error('Invalid password. Try again.');
//       }
//     } catch (error) {
//       toast.error('Failed to verify password. Please try again.');
//       console.error('Password verification error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setPassword('');
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={handleClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <div className="flex items-center gap-2 justify-center">
//             <div className="p-2 rounded-lg bg-gradient-secrets">
//               <Lock className="h-5 w-5 text-white" />
//             </div>
//           </div>
//           <DialogTitle className="text-center">Enter Secrets Password</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative">
//             <Input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Enter password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="pr-10"
//               autoFocus
//             />
//             <Button
//               type="button"
//               variant="ghost"
//               size="sm"
//               className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <EyeOff className="h-4 w-4 text-muted-foreground" />
//               ) : (
//                 <Eye className="h-4 w-4 text-muted-foreground" />
//               )}
//             </Button>
//           </div>
//         </form>
//         <DialogFooter>
//           <Button variant="outline" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} disabled={loading} className="bg-gradient-secrets border-0">
//             {loading ? 'Checking...' : 'Unlock Secrets'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

















import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useNotes } from '@/contexts/NotesContext'; // <-- use the merged NotesContext

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PasswordModal({ isOpen, onClose, onSuccess }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { unlockSecrets } = useNotes(); // <-- use unlockSecrets from NotesContext

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!password) {
      toast.error('Please enter a password');
      return;
    }

    setLoading(true);

    try {
      const success = await unlockSecrets(password); // <-- call unlockSecrets
      if (success) {
        toast.success('Password correct! Access granted.');
        setPassword('');
        onSuccess();
        onClose();
      } else {
        toast.error('Invalid password. Try again.');
      }
    } catch (error) {
      toast.error('Failed to verify password. Please try again.');
      console.error('Password verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPassword('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 justify-center">
            <div className="p-2 rounded-lg bg-gradient-secrets">
              <Lock className="h-5 w-5 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center">Enter Secrets Password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-10"
              autoFocus
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="bg-gradient-secrets border-0">
            {loading ? 'Checking...' : 'Unlock Secrets'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
