import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  Code2, 
  Terminal, 
  BookOpen, 
  Download, 
  Github as GithubIcon,
  Search,
  ArrowRight,
  Sparkles,
  History
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = React.useState('');
  const navigate = useNavigate();

  const actions = [
    { icon: <Zap className="w-4 h-4" />, label: 'Features', target: 'features' },
    { icon: <Code2 className="w-4 h-4" />, label: 'Syntax', target: 'syntax' },
    { icon: <Terminal className="w-4 h-4" />, label: 'IDE', target: 'ide' },
    { icon: <BookOpen className="w-4 h-4" />, label: 'Documentation', target: 'blog' },
    { icon: <Download className="w-4 h-4" />, label: 'Download', target: '/download', type: 'route' },
    { icon: <GithubIcon className="w-4 h-4" />, label: 'GitHub', target: 'https://github.com/SENODROOM/Quantum-Language', type: 'external' }
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10 overflow-hidden relative z-10"
      >
        <div className="p-4 border-b border-black/5 dark:border-white/5 flex items-center gap-3">
          <Search className="w-5 h-5 text-black/40 dark:text-white/40" />
          <input 
            autoFocus
            placeholder="Search Quantum ecosystem... (⌘K)"
            className="flex-1 bg-transparent border-none outline-none text-lg font-medium placeholder:text-black/20 dark:placeholder:text-white/20"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-[10px] font-bold text-black/40 dark:text-white/40">ESC</div>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (action.type === 'route') {
                      navigate(action.target);
                    } else if (action.type === 'external') {
                      window.open(action.target, '_blank');
                    } else {
                      const el = document.getElementById(action.target);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }
                    onClose();
                  }}
                  className="w-full p-3 rounded-xl flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-black/5 dark:bg-white/5 rounded-lg group-hover:bg-cyan-500/10 group-hover:text-cyan-500 transition-colors">
                      {action.icon}
                    </div>
                    <span className="font-bold text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white">{action.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-cyan-500" />
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Sparkles className="w-8 h-8 text-black/10 dark:text-white/10 mx-auto mb-4" />
              <p className="text-black/40 dark:text-white/40 font-medium">No results found for "{query}"</p>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-black/5 dark:bg-white/5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[10px] font-bold text-black/30 dark:text-white/30 uppercase tracking-widest">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><History className="w-3 h-3" /> Recent Searches</span>
          </div>
          <div className="flex gap-4">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
