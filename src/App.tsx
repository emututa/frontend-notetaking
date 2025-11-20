import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotesProvider } from "./contexts/NotesContext";
import Landing from "./pages/Landing";
// import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import CategoryPage from "./pages/CategoryPage";
import NotePage from "./pages/NotePage";
import NewNote from "./pages/NewNote";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NotesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/new" element={<NewNote />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/note/:id" element={<NotePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </NotesProvider>
  </QueryClientProvider>
);

export default App;







