import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Zap, 
  Cpu, 
  Code2, 
  Terminal, 
  Github as GithubIcon, 
  BookOpen, 
  ChevronRight, 
  Layers, 
  Lock, 
  Globe, 
  Activity,
  Search,
  FileCode,
  Play,
  Settings,
  Info,
  Database,
  ShieldAlert,
  Network,
  Plus,
  Trash2,
  Download,
  Save,
  Check,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  Menu,
  X,
  Command,
  ArrowRight,
  History,
  Sparkles
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from './lib/utils';
import { useTheme } from './contexts/ThemeContext';

// --- Components ---

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-black/60 dark:text-white/60 hover:text-cyan-500 dark:hover:text-cyan-400"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
};

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black p-6 text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-4 uppercase tracking-tighter">Something went wrong.</h1>
            <p className="text-black/60 dark:text-white/60 mb-8">We encountered an unexpected error. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-all"
            >
              REFRESH PAGE
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ScrollProgress = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
      <div 
        className="h-full bg-cyan-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
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

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (pathname !== '/') {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <ScrollProgress />
      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/quantum.png" alt="Quantum Logo" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
            <span className="font-mono font-bold text-xl tracking-tighter text-black dark:text-white uppercase">QUANTUM</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60 dark:text-white/60">
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Features</a>
            <a href="#syntax" onClick={(e) => handleNavClick(e, 'syntax')} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Syntax</a>
            <a href="#ide" onClick={(e) => handleNavClick(e, 'ide')} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">IDE</a>
            <a href="#blog" onClick={(e) => handleNavClick(e, 'blog')} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">Blog</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">FAQ</a>
            <a href="https://github.com/SENODROOM/Quantum-Language" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-lg text-black/40 dark:text-white/40 hover:bg-black/10 dark:hover:bg-white/10 transition-all group"
            >
              <Search className="w-4 h-4 group-hover:text-cyan-500 transition-colors" />
              <span className="text-xs font-medium">Search...</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-black/5 dark:bg-white/5 rounded border border-black/5 dark:border-white/10">⌘K</span>
            </button>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="lg:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black/60 dark:text-white/60"
            >
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <Link 
              to="/download"
              className="hidden sm:block bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full text-sm font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors"
            >
              Get Started
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black/60 dark:text-white/60"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-zinc-900 border-b border-black/10 dark:border-white/10 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                <a href="#features" onClick={(e) => handleNavClick(e, 'features')} className="text-lg font-bold hover:text-cyan-500 transition-colors">Features</a>
                <a href="#syntax" onClick={(e) => handleNavClick(e, 'syntax')} className="text-lg font-bold hover:text-cyan-500 transition-colors">Syntax</a>
                <a href="#ide" onClick={(e) => handleNavClick(e, 'ide')} className="text-lg font-bold hover:text-cyan-500 transition-colors">IDE</a>
                <a href="#blog" onClick={(e) => handleNavClick(e, 'blog')} className="text-lg font-bold hover:text-cyan-500 transition-colors">Blog</a>
                <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')} className="text-lg font-bold hover:text-cyan-500 transition-colors">FAQ</a>
                <Link to="/download" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold text-cyan-500">Download</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

const DownloadPage = () => (
  <div className="pt-32 pb-20 min-h-screen bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-black dark:text-white mb-6 uppercase">Get Quantum</h1>
        <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto font-light">
          Deploy the Quantum runtime and compiler to your local environment. 
          High-performance execution starts here.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {[
          { os: "Windows", icon: Globe, version: "v2.0.4", arch: "x64 / ARM64", link: "#", color: "from-blue-500/20" },
          { os: "Linux", icon: Terminal, version: "v2.0.4", arch: "x64 / ARM64 / RISC-V", link: "#", color: "from-orange-500/20" },
          { os: "macOS", icon: Cpu, version: "v2.0.4", arch: "Apple Silicon / Intel", link: "#", color: "from-purple-500/20" }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all group relative overflow-hidden",
              "before:absolute before:inset-0 before:bg-gradient-to-br before:opacity-0 hover:before:opacity-100 before:transition-opacity",
              item.color
            )}
          >
            <div className="relative z-10">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="text-cyan-500 dark:text-cyan-400 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">{item.os}</h3>
              <div className="flex items-center gap-2 text-black/40 dark:text-white/40 text-sm mb-6">
                <span>{item.version}</span>
                <span className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
                <span>{item.arch}</span>
              </div>
              <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-colors flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Download className="w-5 h-5" /> Download Installer
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8 max-w-4xl mx-auto shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6 flex items-center gap-3">
          <Terminal className="text-cyan-500 dark:text-cyan-400 w-6 h-6" /> Build from Source
        </h2>
        <div className="bg-white dark:bg-black rounded-xl p-6 border border-black/10 dark:border-white/10 font-mono text-sm text-black/80 dark:text-white/80 space-y-4 relative group">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => {
                const text = `git clone https://github.com/SENODROOM/Quantum-Language.git\ncd Quantum-Language && mkdir build && cd build\ncmake .. && make -j$(nproc)\nsudo make install`;
                navigator.clipboard.writeText(text);
              }}
              className="text-[10px] bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 px-2 py-1 rounded text-black/60 dark:text-white/60 uppercase font-bold"
            >
              Copy All
            </button>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-500 select-none">$</span>
            <span className="text-white">git clone https://github.com/SENODROOM/Quantum-Language.git</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-500 select-none">$</span>
            <span className="text-white">cd Quantum-Language && mkdir build && cd build</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-500 select-none">$</span>
            <span className="text-white">cmake .. && make -j$(nproc)</span>
          </div>
          <div className="flex gap-4">
            <span className="text-cyan-500 select-none">$</span>
            <span className="text-white">sudo make install</span>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4 text-sm text-white/40 italic">
          <Info className="w-4 h-4" />
          <span>Requires C++17 compatible compiler (GCC 8+, Clang 7+, or MSVC 2019+)</span>
        </div>
      </motion.div>
    </div>
  </div>
);

const Hero = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:opacity-100 opacity-50" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full -z-10" />
    
    {/* Floating Code Snippets */}
    <div className="absolute top-40 left-10 hidden lg:block">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl font-mono text-[10px] text-cyan-400 shadow-2xl"
      >
        <div className="flex gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <p>import crypto;</p>
        <p>var key = entropy(32);</p>
        <p>print(hex(key));</p>
      </motion.div>
    </div>

    <div className="absolute bottom-40 right-10 hidden lg:block">
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="p-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl font-mono text-[10px] text-blue-400 shadow-2xl"
      >
        <div className="flex gap-1.5 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <p>fn secure() &#123;</p>
        <p className="pl-2">return aes.encrypt(data);</p>
        <p>&#125;</p>
      </motion.div>
    </div>

    <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 flex justify-center"
      >
        <img src="/quantum.png" alt="Quantum Large Logo" className="w-32 h-32 md:w-48 md:h-48 object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]" referrerPolicy="no-referrer" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold tracking-widest uppercase rounded-full mb-6">
          v2.0 Now Available
        </span>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-black dark:text-white mb-8 leading-[0.9]">
          A MODERN, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-600">MULTI-SYNTAX</span> <br />
          LANGUAGE
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-black/60 dark:text-white/60 mb-10 font-light">
          Quantum is a dynamically-typed, high-performance scripting language written in C++17. 
          An evolving project by <span className="text-cyan-500 font-bold">senodroom</span>, built for speed, flexibility, and future-proof systems.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate('download')}
            className="w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-cyan-500 dark:hover:bg-cyan-400 transition-all group shadow-xl shadow-black/10 dark:shadow-white/5"
          >
            Get Started <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => {
              document.getElementById('ide')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-5 h-5" /> Try in Browser
          </button>
          <a 
            href="#features"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 px-8 py-4 rounded-xl font-bold text-lg hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center justify-center"
          >
            Documentation
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:border-cyan-500/50 transition-all group">
    <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-cyan-600 dark:text-cyan-400 w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold text-black dark:text-white mb-3">{title}</h3>
    <p className="text-black/50 dark:text-white/50 leading-relaxed">{description}</p>
  </div>
);

const Features = () => {
  const features = [
    {
      title: "Dual Execution",
      desc: "Switch between Python-like interpreted speed and C-like compiled precision.",
      icon: <Zap className="w-6 h-6 text-cyan-500" />,
      size: "md"
    },
    {
      title: "Multi-Syntax",
      desc: "Write code in multiple styles—Python-like, C-like, or JavaScript-like—within the same file.",
      icon: <Shield className="w-6 h-6 text-cyan-500" />,
      size: "lg"
    },
    {
      title: "Zero-Cost Abstractions",
      desc: "High-level syntax that compiles down to efficient machine code via the Quantum VM.",
      icon: <Cpu className="w-6 h-6 text-cyan-500" />,
      size: "sm"
    },
    {
      title: "Unified Tooling",
      desc: "A single tool for all your dependencies, bundling, and execution needs.",
      icon: <Terminal className="w-6 h-6 text-cyan-500" />,
      size: "sm"
    },
    {
      title: "Cross-Platform",
      desc: "Write once, run anywhere with native performance on Windows, Linux, and macOS.",
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      size: "md"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white dark:bg-black transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">Engineered for Power</h2>
          <p className="text-black/50 dark:text-white/50 max-w-2xl mx-auto">
            Quantum combines the best features of modern languages into a single, cohesive ecosystem.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "p-8 rounded-3xl border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all group",
                f.size === "lg" ? "md:col-span-2" : "md:col-span-1"
              )}
            >
              <div className="mb-6 p-3 bg-white dark:bg-zinc-900 rounded-2xl w-fit shadow-lg group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-black dark:text-white uppercase tracking-tight">{f.title}</h3>
              <p className="text-black/50 dark:text-white/50 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LanguageComparison = () => {
  const [selected, setSelected] = React.useState('speed');
  
  const data = {
    speed: {
      quantum: 95,
      python: 20,
      cpp: 100,
      desc: "Quantum reaches near-native performance through its optimized VM and JIT capabilities."
    },
    safety: {
      quantum: 90,
      python: 70,
      cpp: 30,
      desc: "With built-in memory safety and crypto-first primitives, Quantum is designed for secure systems."
    },
    simplicity: {
      quantum: 85,
      python: 100,
      cpp: 15,
      desc: "Quantum's syntax is intuitive and expressive, reducing boilerplate without sacrificing control."
    }
  };

  return (
    <section className="py-24 bg-black/5 dark:bg-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 uppercase tracking-tight">Quantum vs. The World</h2>
            <p className="text-black/50 dark:text-white/50 mb-10 leading-relaxed">
              We didn't just build another language. We built a tool that bridges the gap 
              between developer productivity and system-level performance.
            </p>
            
            <div className="flex gap-4 mb-12">
              {Object.keys(data).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelected(key)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                    selected === key 
                      ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" 
                      : "bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>
            
            <p className="text-black/70 dark:text-white/70 italic font-medium">
              "{data[selected as keyof typeof data].desc}"
            </p>
          </div>
          
          <div className="space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/5 shadow-2xl">
            {['quantum', 'python', 'cpp'].map((lang) => (
              <div key={lang}>
                <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest">
                  <span className={lang === 'quantum' ? 'text-cyan-500' : 'text-black/40 dark:text-white/40'}>
                    {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </span>
                  <span className="text-black/30 dark:text-white/30">{data[selected as keyof typeof data][lang as keyof typeof data.speed]}%</span>
                </div>
                <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${data[selected as keyof typeof data][lang as keyof typeof data.speed]}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={cn(
                      "h-full rounded-full",
                      lang === 'quantum' ? 'bg-cyan-500' : 'bg-black/20 dark:bg-white/20'
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SyntaxVersatility = () => {
  const styles = [
    {
      name: "C-Style",
      desc: "Classic curly-brace syntax for systems engineers.",
      code: `function add(int a, int b) {
    return a + b;
}`
    },
    {
      name: "Pythonic",
      desc: "Clean, indentation-based logic for rapid scripting.",
      code: `def add(int a, int b):
    return a + b`
    },
    {
      name: "Modern Arrow",
      desc: "Concise arrow functions for functional paradigms.",
      code: `var add = (int a, int b) => a + b;`
    },
    {
      name: "Ruby-esque",
      desc: "Keyword-based blocks for readability.",
      code: `function add(int a, int b)
    return a + b
end`
    },
    {
      name: "Mathematical",
      desc: "Direct mapping for algorithm implementation.",
      code: `fn add(int a, int b) -> a + b`
    }
  ];

  return (
    <section id="syntax" className="py-24 bg-white dark:bg-black border-y border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-4 uppercase">Syntax Versatility</h2>
          <p className="text-black/50 dark:text-white/50 max-w-2xl">
            Quantum is the world's first multi-syntax language. 
            Write in the style that matches your project or your team's background.
          </p>
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {styles.map((style, i) => (
            <div key={i} className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:border-cyan-500/30 transition-all group">
              <h3 className="text-cyan-600 dark:text-cyan-400 font-bold mb-2 text-sm uppercase tracking-widest">{style.name}</h3>
              <p className="text-[10px] text-black/40 dark:text-white/40 mb-4 h-8 leading-tight">{style.desc}</p>
              <div className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-lg border border-black/5 dark:border-white/5 font-mono text-[11px] text-black/80 dark:text-white/80">
                <pre className="whitespace-pre-wrap">{style.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const QuantumIDE = () => {
  const { theme } = useTheme();
  const [files, setFiles] = React.useState<{ [key: string]: string }>(() => {
    const saved = localStorage.getItem('quantum_files');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved files', e);
      }
    }
    return {
      'main.sa': `import crypto;
import network;

// Quantum v2.0 - Cybersecurity Example
function main() {
    int port = 443;
    float timeout = 30.5;
    var target = "https://api.secure-node.io";
    
    print("Initializing secure connection to: " + target);
    print("Port: " + port + ", Timeout: " + timeout);
    
    // Generate high-entropy session key
    var sessionKey = entropy(32);
    var encrypted = encrypt("aes256", "payload_data", sessionKey);
    
    print("Payload encrypted with AES-256");
    print("Session Key: " + hex(sessionKey));
}

main();`,
      'utils.sa': `// String distance utility
fn checkSimilarity(string s1, string s2) {
    int distance = levenshtein(s1, s2);
    int maxLength = max(s1.length(), s2.length());
    return (1.0 - (distance / maxLength)) * 100;
}

print("Similarity: " + checkSimilarity("quantum", "quantize") + "%");`,
      'server.sa': `import network;

class SecureServer {
    function init(int port) {
        this.port = port;
        this.socket = socket("tcp");
    }

    function start() {
        this.socket.bind(this.port);
        this.socket.listen(5);
        print("Quantum Server listening on port " + this.port);
    }
}

var srv = SecureServer(8080);
srv.start();`
    };
  });

  const [activeFile, setActiveFile] = React.useState(() => {
    const savedActive = localStorage.getItem('quantum_active_file');
    const savedFiles = localStorage.getItem('quantum_files');
    if (savedActive && savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        if (parsedFiles[savedActive]) return savedActive;
      } catch (e) {}
    }
    return 'main.sa';
  });
  const [output, setOutput] = React.useState<string[]>([]);
  const [isExecuting, setIsExecuting] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [newFileName, setNewFileName] = React.useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const editorRef = React.useRef<HTMLTextAreaElement>(null);
  const preRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    localStorage.setItem('quantum_files', JSON.stringify(files));
  }, [files]);

  React.useEffect(() => {
    localStorage.setItem('quantum_active_file', activeFile);
  }, [activeFile]);

  // Sync scroll between textarea and syntax highlighter
  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (preRef.current) {
      preRef.current.scrollTop = e.currentTarget.scrollTop;
      preRef.current.scrollLeft = e.currentTarget.scrollLeft;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const value = e.currentTarget.value;
      
      const newValue = value.substring(0, start) + "    " + value.substring(end);
      
      setFiles(prev => ({
        ...prev,
        [activeFile]: newValue
      }));
      
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 4;
        }
      }, 0);
    } else if (e.key === 'Enter') {
      // Basic auto-indentation
      const start = e.currentTarget.selectionStart;
      const value = e.currentTarget.value;
      const lines = value.substring(0, start).split('\n');
      const currentLine = lines[lines.length - 1];
      const indent = currentLine.match(/^\s*/)?.[0] || '';
      
      // If the line ends with '{', add extra indent
      const extraIndent = currentLine.trim().endsWith('{') ? '    ' : '';
      
      if (indent || extraIndent) {
        e.preventDefault();
        const newValue = value.substring(0, start) + '\n' + indent + extraIndent + value.substring(start);
        setFiles(prev => ({ ...prev, [activeFile]: newValue }));
        
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.selectionStart = editorRef.current.selectionEnd = start + 1 + indent.length + extraIndent.length;
          }
        }, 0);
      }
    }
  };

  const [isFullScreen, setIsFullScreen] = React.useState(false);

  React.useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setFiles(prev => ({
      ...prev,
      [activeFile]: newContent
    }));
  };

  const saveFiles = () => {
    setIsSaving(true);
    localStorage.setItem('quantum_files', JSON.stringify(files));
    setTimeout(() => setIsSaving(false), 1000);
  };

  const runCode = () => {
    setIsExecuting(true);
    setOutput(['Compiling...', 'Linking standard libraries...', 'Executing VM...']);
    
    const code = files[activeFile] || '';
    
    setTimeout(() => {
      // Basic syntax check simulation
      const openBraces = (code.match(/{/g) || []).length;
      const closeBraces = (code.match(/}/g) || []).length;
      
      if (openBraces !== closeBraces) {
        setOutput(prev => [...prev, 'Error: Unmatched braces detected.', '', 'Build failed.']);
        setIsExecuting(false);
        return;
      }

      // Improved interpretation simulation
      const printMatches = code.matchAll(/print\s*\((.*?)\);?/g);
      const prints = Array.from(printMatches).map(match => {
        let val = match[1].trim();
        // Strip quotes if it's a simple string
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          return val.slice(1, -1);
        }
        // Handle some basic concatenations or variables for simulation
        if (val.includes('checkSimilarity')) return "Similarity: 75%";
        if (val.includes('target')) return "Initializing secure connection to: https://api.secure-node.io";
        if (val.includes('sessionKey')) return "Session Key: 4f2a7b9c1d8e3f5a6b0c9d8e7f6a5b4c";
        if (val.includes('port')) return "Quantum Server listening on port 8080";
        
        // Try to evaluate simple arithmetic if it's just numbers
        if (/^[\d\s\+\-\*\/\(\)]+$/.test(val)) {
          try {
            return eval(val).toString();
          } catch (e) {}
        }

        return val;
      });

      if (prints.length > 0) {
        setOutput(prev => [...prev, ...prints, '', 'Program exited with code 0']);
      } else {
        // Fallback to default simulation if no prints found
        if (activeFile === 'main.sa') {
          setOutput(prev => [...prev, 
            'Initializing secure connection to: https://api.secure-node.io',
            'Payload encrypted with AES-256',
            'Session Key: 4f2a7b9c1d8e3f5a6b0c9d8e7f6a5b4c',
            'Server Response: 200 OK',
            '',
            'Program exited with code 0'
          ]);
        } else if (activeFile === 'utils.sa') {
          setOutput(prev => [...prev, 'Similarity: 75%', '', 'Program exited with code 0']);
        } else if (activeFile === 'server.sa') {
          setOutput(prev => [...prev, 'Quantum Server listening on port 8080', '', 'Program exited with code 0']);
        } else {
          setOutput(prev => [...prev, 'Execution successful.', '', 'Program exited with code 0']);
        }
      }
      setIsExecuting(false);
    }, 1500);
  };

  const createFile = () => {
    if (!newFileName) return;
    const name = newFileName.endsWith('.sa') ? newFileName : `${newFileName}.sa`;
    if (files[name]) {
      alert('File already exists');
      return;
    }
    setFiles(prev => ({ ...prev, [name]: '// New Quantum Script\n' }));
    setActiveFile(name);
    setNewFileName('');
    setIsCreateModalOpen(false);
  };

  const deleteFile = (fileName: string) => {
    if (Object.keys(files).length <= 1) {
      alert('Cannot delete the last file');
      return;
    }
    const newFiles = { ...files };
    delete newFiles[fileName];
    setFiles(newFiles);
    if (activeFile === fileName) {
      setActiveFile(Object.keys(newFiles)[0]);
    }
  };

  const downloadFile = () => {
    const element = document.createElement("a");
    const file = new Blob([files[activeFile]], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = activeFile;
    document.body.appendChild(element);
    element.click();
  };

  const lineCount = files[activeFile].split('\n').length;
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  return (
    <section id="ide" className="py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-4 uppercase">Quantum Interactive IDE</h2>
          <p className="text-black/50 dark:text-white/50 max-w-2xl mx-auto">
            Experience the power of Quantum directly in your browser. 
            Test syntax, explore libraries, and see the compiler in action.
          </p>
        </div>

        <div className={cn(
          "bg-[#f6f8fa] dark:bg-[#0d1117] rounded-xl border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl flex flex-col transition-all duration-500",
          isFullScreen ? "fixed inset-0 z-[100] rounded-none h-screen" : "h-[700px]"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#f6f8fa] dark:bg-[#161b22] border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="h-4 w-px bg-black/10 dark:bg-white/10 mx-2" />
              <div className="flex items-center gap-2 text-xs text-black/40 dark:text-white/40 font-mono">
                <Terminal className="w-3 h-3" />
                quantum-cli v2.0.4
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                aria-label={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
                className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
              >
                {isFullScreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(files[activeFile]);
                  const btn = document.activeElement as HTMLButtonElement;
                  const originalText = btn.innerHTML;
                  btn.innerHTML = 'COPIED';
                  setTimeout(() => btn.innerHTML = originalText, 2000);
                }}
                aria-label="Copy Code"
                className="flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
              >
                COPY
              </button>
              <button 
                onClick={downloadFile}
                className="flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                title="Download File"
              >
                <Download className="w-3 h-3" />
                Download
              </button>
              <button 
                onClick={saveFiles}
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold transition-all",
                  isSaving ? "bg-green-500/20 text-green-600 dark:text-green-400" : "bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 hover:bg-black/10 dark:hover:bg-white/10"
                )}
              >
                {isSaving ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                {isSaving ? 'SAVED' : 'SAVE'}
              </button>
              <button 
                onClick={runCode}
                disabled={isExecuting}
                className={cn(
                  "flex items-center gap-2 px-4 py-1 rounded-md text-xs font-bold transition-all",
                  isExecuting 
                    ? "bg-black/10 dark:bg-white/10 text-black/40 dark:text-white/40 cursor-not-allowed" 
                    : "bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95"
                )}
              >
                <Play className="w-3 h-3 fill-current" />
                {isExecuting ? 'RUNNING...' : 'RUN SCRIPT'}
              </button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className="w-56 bg-[#f6f8fa] dark:bg-[#0d1117] border-r border-black/10 dark:border-white/10 hidden md:flex flex-col">
              <div className="p-3 flex items-center justify-between border-b border-black/5 dark:border-white/5">
                <span className="text-[10px] font-bold text-black/30 dark:text-white/30 uppercase tracking-widest">Explorer</span>
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
                {Object.keys(files).map(file => (
                  <div key={file} className="group flex items-center gap-1">
                    <button
                      onClick={() => setActiveFile(file)}
                      className={cn(
                        "flex-1 flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors text-left",
                        activeFile === file ? "bg-black/10 dark:bg-white/10 text-cyan-600 dark:text-cyan-400" : "text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black/60 dark:hover:text-white/60"
                      )}
                    >
                      <FileCode className="w-3 h-3" />
                      <span className="truncate">{file}</span>
                    </button>
                    <button 
                      onClick={() => deleteFile(file)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 text-black/20 dark:text-white/20 hover:text-red-600 dark:hover:text-red-400 rounded transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Editor & Terminal */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 flex overflow-hidden relative bg-white dark:bg-[#0d1117] transition-colors duration-300">
                  {/* Line Numbers */}
                  <div className="w-12 bg-black/5 dark:bg-white/5 border-r border-black/5 dark:border-white/5 flex flex-col items-end pt-4 pr-2 select-none font-mono text-[10px] text-black/20 dark:text-white/20">
                    {lineNumbers.map(n => <div key={n} className="h-[1.5rem] leading-[1.5rem]">{n}</div>)}
                  </div>
                  
                  {/* Editor Area */}
                  <div className="flex-1 relative overflow-hidden">
                    <textarea
                      ref={editorRef}
                      value={files[activeFile] || ''}
                      onChange={handleCodeChange}
                      onScroll={handleScroll}
                      onKeyDown={handleKeyDown}
                      spellCheck={false}
                      className="absolute inset-0 w-full h-full p-4 pt-4 pl-4 font-mono text-sm bg-transparent text-transparent caret-black dark:caret-white resize-none outline-none z-10 custom-scrollbar whitespace-pre overflow-auto leading-[1.5]"
                    />
                    <div 
                      ref={preRef}
                      className="absolute inset-0 p-4 pt-4 pl-4 font-mono text-sm pointer-events-none overflow-hidden leading-[1.5]"
                    >
                      <SyntaxHighlighter
                        language="javascript"
                        style={theme === 'dark' ? atomDark : undefined}
                        customStyle={{ 
                          background: 'transparent', 
                          padding: 0, 
                          margin: 0,
                          lineHeight: '1.5'
                        }}
                        showLineNumbers={false}
                      >
                        {files[activeFile] || ''}
                      </SyntaxHighlighter>
                    </div>
                  </div>
              </div>
              
              {/* Terminal */}
              <div className="h-48 bg-[#f6f8fa] dark:bg-black border-t border-black/10 dark:border-white/10 flex flex-col transition-colors duration-300">
                <div className="px-4 py-1.5 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-black/30 dark:text-white/30 uppercase tracking-widest">Terminal</span>
                  <button onClick={() => setOutput([])} className="text-[10px] text-black/20 dark:text-white/20 hover:text-black/40 dark:hover:text-white/40 uppercase font-bold">Clear</button>
                </div>
                <div className="flex-1 p-4 font-mono text-xs text-green-600 dark:text-green-400 overflow-auto custom-scrollbar">
                  {output.length === 0 ? (
                    <div className="space-y-1">
                      <div className="text-black/20 dark:text-white/20">Quantum CLI v2.0.4</div>
                      <div className="text-black/20 dark:text-white/20 italic">Type 'run' or click the button to execute...</div>
                    </div>
                  ) : (
                    output.map((line, i) => (
                      <div key={i} className={cn(line.includes('Error') ? 'text-red-600 dark:text-red-400' : '')}>
                        {line.startsWith('Compiling') || line.startsWith('Linking') || line.startsWith('Executing') 
                          ? <span className="text-cyan-600 dark:text-cyan-400">➜ {line}</span>
                          : line}
                      </div>
                    ))
                  )}
                  {isExecuting && <span className="animate-pulse">_</span>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create File Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4">Create New File</h3>
            <input 
              type="text"
              placeholder="filename.sa"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full bg-black/5 dark:bg-black border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-black dark:text-white mb-6 outline-none focus:border-cyan-500 transition-colors"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && createFile()}
            />
            <div className="flex gap-3">
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 text-black dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={createFile}
                className="flex-1 px-4 py-2 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const CodeShowcase = () => {
  const { theme } = useTheme();
  const examples = [
    {
      title: "Hello World",
      code: `// Simple printing
print("Hello, Quantum!");

// C-style printing
printf("Version: %s\\n", "2.0");`
    },
    {
      title: "Functions & Logic",
      code: `function calculate(int x, int y) {
    if (x > y) {
        return x * y;
    }
    return x + y;
}

int result = calculate(10, 5);
print(result);`
    },
    {
      title: "Cryptography",
      code: `import crypto;

string data = "secret_message";
string hashed = hash("sha256", data);

print("SHA256: " + hashed);`
    },
    {
      title: "Classes",
      code: `class SecurityTool {
    function init(string name) {
        this.name = name;
    }
    
    function scan() {
        print("Scanning with " + this.name);
    }
}

var tool = SecurityTool("QuantumScanner");
tool.scan();`
    }
  ];

  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section id="code" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-6 uppercase">ELEGANT SYNTAX, <br />INFINITE POSSIBILITIES</h2>
            <p className="text-black/60 dark:text-white/60 text-lg mb-8">
              Quantum's syntax is designed to be intuitive for developers coming from Python, JavaScript, or C++. 
              It combines the best of all worlds into a cohesive, powerful scripting environment.
            </p>
            <div className="space-y-4">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    activeTab === i 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-white" 
                      : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  <span className="font-bold">{ex.title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-3xl -z-10" />
            <div className="bg-white dark:bg-black rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl transition-colors duration-300">
              <div className="flex items-center justify-between px-4 py-2 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-black/30 dark:text-white/30 uppercase tracking-widest">example.sa</span>
              </div>
              <div className="p-4">
                <SyntaxHighlighter
                  language="javascript"
                  style={theme === 'dark' ? atomDark : undefined}
                  customStyle={{ background: 'transparent', padding: 0, fontSize: '14px' }}
                >
                  {examples[activeTab].code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StandardLibrary = () => (
  <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-4 uppercase">Standard Library</h2>
          <p className="text-black/50 dark:text-white/50 max-w-xl">
            A comprehensive set of built-in modules designed for modern development, 
            from complex math to high-level network operations.
          </p>
        </div>
        <div className="h-1 w-20 bg-cyan-500 hidden md:block" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: "Core", items: ["int, float, string", "5 Function Styles", "Classes & Inheritance"] },
          { name: "Math", items: ["Trigonometry", "Calculus", "Statistics"] },
          { name: "String", items: ["Regex", "Levenshtein Distance", "Formatting"] },
          { name: "File I/O", items: ["Read/Write", "Serializer", "Disassembler"] },
          { name: "Network", items: ["TCP/UDP Sockets", "HTTP", "DNS Helpers"] },
          { name: "Crypto", items: ["SHA256/MD5/SHA1", "AES-256", "RSA Support"] },
          { name: "Encoding", items: ["Base64", "Hex", "URL Encoding"] },
          { name: "System", items: ["CLI Reference", "OS Info", "Process Management"] }
        ].map((lib, i) => (
          <div key={i} className="p-6 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all group relative">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(lib.items.join(', '));
                const btn = document.activeElement as HTMLButtonElement;
                const originalText = btn.innerHTML;
                btn.innerHTML = 'COPIED';
                setTimeout(() => btn.innerHTML = originalText, 2000);
              }}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 p-1.5 hover:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded transition-all text-[10px] font-bold"
            >
              COPY
            </button>
            <h4 className="text-cyan-600 dark:text-cyan-400 font-bold mb-3 uppercase tracking-widest text-xs">{lib.name}</h4>
            <ul className="space-y-1">
              {lib.items.map((item, j) => (
                <li key={j} className="text-sm text-black/40 dark:text-white/40">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Ecosystem = () => (
  <section id="ecosystem" className="py-24 bg-zinc-50 dark:bg-zinc-950 border-t border-black/5 dark:border-white/5 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-4 uppercase">The Quantum Ecosystem</h2>
        <p className="text-black/50 dark:text-white/50 max-w-2xl mx-auto">
          Quantum is more than just a language. It's a suite of tools designed to simplify 
          development, documentation, and deployment.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <BookOpen className="text-blue-600 dark:text-blue-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-black dark:text-white">Code Explanation</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-mono">QuantumLangCodeExplaination</p>
            </div>
          </div>
          <p className="text-black/50 dark:text-white/50 mb-6">
            A deep-dive repository that breaks down the compiler architecture, VM internals, 
            and standard library implementation for contributors and power users.
          </p>
          <a href="https://github.com/SENODROOM/QuantumLangCodeExplaination" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-2 transition-colors">
            Explore Documentation <ChevronRight className="w-4 h-4" />
          </a>
        </div>
        <div className="p-8 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <Activity className="text-purple-600 dark:text-purple-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-black dark:text-white">Docs Syncer</h3>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-mono">QuantumDocsSyncer</p>
            </div>
          </div>
          <p className="text-black/50 dark:text-white/50 mb-6">
            An automated system that watches the core repository, generates AI-powered 
            explanations via HuggingFace, and keeps documentation in sync across the ecosystem.
          </p>
          <a href="https://github.com/SENODROOM/QuantumDocsSyncer" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 flex items-center gap-2 transition-colors">
            View Syncer Tool <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Installation = () => (
  <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-y border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent" />
    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
      <h2 className="text-3xl font-bold text-black dark:text-white mb-4 uppercase tracking-tight">Ready to build?</h2>
      <p className="text-black/50 dark:text-white/50 mb-10">Clone the repository and compile the binaries to start your journey with Quantum.</p>
      
      <div className="bg-white dark:bg-black rounded-xl p-6 border border-black/10 dark:border-white/10 text-left font-mono text-sm relative group shadow-2xl transition-colors duration-300">
        <div className="flex items-center gap-2 mb-4 text-black/30 dark:text-white/30">
          <Terminal className="w-4 h-4" />
          <span>Quick Start Guide</span>
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="text-cyan-500/50">1</span>
            <span className="text-black/40 dark:text-white/40"># Clone the repo</span>
          </div>
          <div className="flex gap-3 pl-6">
            <span className="text-cyan-500">$</span>
            <span className="text-black dark:text-white">git clone https://github.com/SENODROOM/Quantum-Language.git</span>
          </div>
          
          <div className="flex gap-3">
            <span className="text-cyan-500/50">2</span>
            <span className="text-black/40 dark:text-white/40"># Build from source</span>
          </div>
          <div className="flex gap-3 pl-6">
            <span className="text-cyan-500">$</span>
            <span className="text-black dark:text-white">mkdir build && cd build && cmake .. && make</span>
          </div>

          <div className="flex gap-3">
            <span className="text-cyan-500/50">3</span>
            <span className="text-black/40 dark:text-white/40"># Run your first script</span>
          </div>
          <div className="flex gap-3 pl-6">
            <span className="text-cyan-500">$</span>
            <span className="text-black dark:text-white">./quantum hello_world.sa</span>
          </div>
        </div>
      </div>
      
      <div className="mt-12 flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-black dark:text-white">100+</div>
          <div className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-widest">Standard Functions</div>
        </div>
        <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
        <div className="text-center">
          <div className="text-2xl font-bold text-black dark:text-white">C++17</div>
          <div className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-widest">Core Engine</div>
        </div>
        <div className="w-px h-8 bg-black/10 dark:bg-white/10" />
        <div className="text-center">
          <div className="text-2xl font-bold text-black dark:text-white">.SA</div>
          <div className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-widest">File Extension</div>
        </div>
      </div>
    </div>
  </section>
);

const Roadmap = () => {
  const roadmapItems = [
    { phase: "Phase 1", status: "Completed", title: "Core VM & Compiler", desc: "Stable C++17 engine with basic standard library and dual execution paths." },
    { phase: "Phase 2", status: "In Progress", title: "Package Manager", desc: "A unified tool for managing Quantum modules and third-party dependencies." },
    { phase: "Phase 3", status: "Planned", title: "Native JIT", desc: "Just-In-Time compilation for even higher performance on critical paths." },
    { phase: "Phase 4", status: "Planned", title: "LSP Support", desc: "Full Language Server Protocol support for VS Code and other modern IDEs." }
  ];

  return (
    <section id="roadmap" className="py-24 bg-white dark:bg-black relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-4 uppercase">Development Roadmap</h2>
          <p className="text-black/50 dark:text-white/50 max-w-xl">
            The future of Quantum is driven by the community. Here's what we're working on for the next major releases.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-black/5 dark:bg-white/5 hidden md:block -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {roadmapItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl group hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className={cn(
                  "absolute -top-3 left-8 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                  item.status === "Completed" ? "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400" : 
                  item.status === "In Progress" ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-600 dark:text-cyan-400" :
                  "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/30 dark:text-white/30"
                )}>
                  {item.status}
                </div>
                <div className="text-xs font-mono text-black/30 dark:text-white/30 mb-2">{item.phase}</div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">{item.title}</h3>
                <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Community = () => (
  <section className="py-24 bg-zinc-50 dark:bg-zinc-950 border-y border-black/5 dark:border-white/5 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold text-black dark:text-white mb-12 uppercase tracking-tight">Join the Revolution</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {[
          { label: "GitHub Stars", value: "150+" },
          { label: "Contributors", value: "1" },
          { label: "Standard Libs", value: "12+" },
          { label: "Commits", value: "800+" }
        ].map((stat, i) => (
          <div key={i}>
            <div className="text-4xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">{stat.value}</div>
            <div className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-widest font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
        <a href="https://github.com/SENODROOM/Quantum-Language" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          <GithubIcon className="w-5 h-5" />
          <span className="font-bold">Star on GitHub</span>
        </a>
        <div className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full hidden sm:block" />
        <a href="#" className="flex items-center gap-2 text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          <Globe className="w-5 h-5" />
          <span className="font-bold">Join Discord</span>
        </a>
        <div className="w-1 h-1 bg-black/20 dark:bg-white/20 rounded-full hidden sm:block" />
        <a href="#" className="flex items-center gap-2 text-black dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
          <Terminal className="w-5 h-5" />
          <span className="font-bold">Contribute Code</span>
        </a>
      </div>
    </div>
  </section>
);

const LiveFeed = () => {
  const events = [
    { type: 'commit', user: 'senodroom', msg: 'Optimized VM stack allocation', time: '2m ago' },
    { type: 'commit', user: 'senodroom', msg: 'Added new math primitives to stdlib', time: '15m ago' },
    { type: 'commit', user: 'senodroom', msg: 'Fixed closure scope in nested functions', time: '1h ago' },
    { type: 'release', user: 'senodroom', msg: 'v2.0.4-alpha released', time: '3h ago' }
  ];

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <h2 className="text-2xl font-bold uppercase tracking-widest">Live Ecosystem Activity</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between h-40"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">{e.type}</span>
                  <span className="text-[10px] text-black/30 dark:text-white/30">{e.time}</span>
                </div>
                <p className="text-sm font-bold text-black dark:text-white mb-1">@{e.user}</p>
                <p className="text-xs text-black/50 dark:text-white/50 line-clamp-2">{e.msg}</p>
              </div>
              <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-cyan-500/20" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Vision = () => {
  return (
    <section id="vision" className="py-24 bg-black/5 dark:bg-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">Project Vision</h2>
          <p className="text-black/50 dark:text-white/50 max-w-2xl mx-auto">
            Quantum is an evolving project focused on creating a versatile and high-performance language for the next generation of developers.
          </p>
        </div>
        <div className="max-w-4xl mx-auto p-12 rounded-3xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-32 h-32 text-cyan-500" />
          </div>
          <p className="text-2xl text-black/80 dark:text-white/80 italic leading-relaxed mb-8 relative z-10">
            "Quantum was born out of a desire for a language that doesn't force a single paradigm. It's about giving developers the tools to express their logic in the most natural way possible, without sacrificing performance."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-black">S</div>
            <div>
              <h4 className="font-bold text-black dark:text-white">senodroom</h4>
              <p className="text-xs text-black/40 dark:text-white/40">Lead Developer & Creator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: "Quantum v2.1: The Networking Update",
      date: "March 15, 2026",
      excerpt: "Introducing native support for HTTP/3 and improved WebSocket performance for high-concurrency servers.",
      category: "Release"
    },
    {
      title: "Securing the Edge with Quantum",
      date: "March 10, 2026",
      excerpt: "Learn how to use Quantum's built-in entropy functions to generate cryptographically secure session keys.",
      category: "Tutorial"
    },
    {
      title: "Quantum vs. The World: A Benchmark",
      date: "March 05, 2026",
      excerpt: "We put Quantum up against Python, Ruby, and Node.js in a series of real-world performance tests.",
      category: "Performance"
    }
  ];

  return (
    <section id="blog" className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4 uppercase tracking-tight">Latest from the Lab</h2>
            <p className="text-black/50 dark:text-white/50 max-w-2xl">
              Stay up to date with the latest releases, tutorials, and performance benchmarks.
            </p>
          </div>
          <button className="hidden md:block px-6 py-2 rounded-full border border-black/10 dark:border-white/10 font-bold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-all">
            VIEW ALL POSTS
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-2xl bg-black/5 dark:bg-white/5 mb-6 overflow-hidden relative">
                <img 
                  src={`https://picsum.photos/seed/${p.title}/800/450`} 
                  alt={p.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-cyan-500 text-black text-[10px] font-bold rounded-full uppercase">
                  {p.category}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors">{p.title}</h3>
              <p className="text-sm text-black/40 dark:text-white/40 mb-4">{p.date}</p>
              <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed">{p.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const faqs = [
    {
      q: "Is Quantum open source?",
      a: "Yes, Quantum is fully open source under the MIT license. You can find the source code on GitHub."
    },
    {
      q: "How does the performance compare to C++?",
      a: "Quantum is written in C++17 and uses a highly optimized VM. While not as fast as raw C++, it typically reaches 80-90% of native performance for most tasks."
    },
    {
      q: "Can I use Quantum for web development?",
      a: "Absolutely. Quantum has built-in networking libraries and can be used to build high-performance backend services."
    },
    {
      q: "What platforms are supported?",
      a: "Quantum currently supports Windows, macOS (Intel & Apple Silicon), and Linux. We are working on mobile support."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-black/5 dark:bg-white/5 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center uppercase tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 overflow-hidden"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span className="font-bold text-lg text-black dark:text-white">{f.q}</span>
                <ChevronRight className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  activeIndex === i ? "rotate-90 text-cyan-500" : "text-black/20 dark:text-white/20"
                )} />
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-black/60 dark:text-white/60 leading-relaxed border-t border-black/5 dark:border-white/5 pt-4">
                      {f.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <section className="py-24 bg-cyan-500 text-black overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-4 border-black rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-black rounded-full animate-pulse delay-700" />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase tracking-tighter">Join the Quantum Revolution</h2>
        <p className="text-black/70 mb-10 max-w-xl mx-auto font-medium">
          Get the latest updates, security advisories, and early access to new features delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-4 rounded-full bg-black/10 border border-black/20 placeholder:text-black/40 outline-none focus:bg-black/20 transition-all font-bold"
          />
          <button 
            type="submit"
            className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-zinc-800 transition-all active:scale-95 disabled:opacity-50"
            disabled={subscribed}
          >
            {subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
          </button>
        </form>
        {subscribed && (
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm font-bold"
          >
            Welcome to the future of programming.
          </motion.p>
        )}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-24 bg-white dark:bg-black border-t border-black/5 dark:border-white/5 transition-colors duration-300 overflow-hidden relative">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img src="/quantum.png" alt="Quantum Logo" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
              <span className="font-mono font-bold text-xl tracking-tighter text-black dark:text-white uppercase">QUANTUM</span>
            </Link>
            <p className="text-black/50 dark:text-white/50 max-w-xs mb-8 leading-relaxed">
              A modern, multi-syntax scripting language built for performance and flexibility. 
              Developed by <span className="text-cyan-500 font-bold">senodroom</span>.
            </p>
            <div className="flex gap-4">
            {[GithubIcon, Globe, Terminal].map((Icon, i) => (
              <a key={i} href="#" className="p-2 bg-black/5 dark:bg-white/5 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-500 transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Language</h4>
          <ul className="space-y-4 text-sm text-black/40 dark:text-white/40">
            <li><a href="#features" className="hover:text-cyan-500 transition-colors">Features</a></li>
            <li><a href="#syntax" className="hover:text-cyan-500 transition-colors">Syntax</a></li>
            <li><a href="#ide" className="hover:text-cyan-500 transition-colors">IDE</a></li>
            <li><a href="/download" className="hover:text-cyan-500 transition-colors">Download</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Ecosystem</h4>
          <ul className="space-y-4 text-sm text-black/40 dark:text-white/40">
            <li><a href="#blog" className="hover:text-cyan-500 transition-colors">Blog</a></li>
            <li><a href="#roadmap" className="hover:text-cyan-500 transition-colors">Roadmap</a></li>
            <li><a href="#faq" className="hover:text-cyan-500 transition-colors">FAQ</a></li>
            <li><a href="https://github.com/SENODROOM/Quantum-Language" className="hover:text-cyan-500 transition-colors">GitHub</a></li>
          </ul>
        </div>
        
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Status</h4>
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-2xl">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-xs font-bold mb-1">
              <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse" />
              All Systems Operational
            </div>
            <p className="text-[10px] text-black/30 dark:text-white/30">v2.0.4 Stable Release</p>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-black/20 dark:text-white/20 uppercase tracking-[0.2em]">
        <p>© 2026 Quantum Language. Developed by <a href="https://github.com/SENODROOM" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">senodroom</a>.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 w-12 h-12 bg-white dark:bg-zinc-900 text-black dark:text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-black/5 dark:text-white/5"
        />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={2 * Math.PI * 22}
          strokeDashoffset={2 * Math.PI * 22 * (1 - scrollProgress / 100)}
          className="text-cyan-500 transition-all duration-150"
        />
      </svg>
      <ChevronRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
    </button>
  );
};

export default function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ErrorBoundary>
      <div className="noise" />
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-cyan-500 selection:text-black transition-colors duration-300 relative">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes location={pathname} key={pathname}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Hero onNavigate={(page) => {
                    if (page === 'download') {
                      navigate('/download');
                    }
                  }} />
                  <Features />
                  <LanguageComparison />
                  <SyntaxVersatility />
                  <QuantumIDE />
                  <StandardLibrary />
                  <LiveFeed />
                  <Vision />
                  <Blog />
                  <Roadmap />
                  <Ecosystem />
                  <FAQ />
                  <Community />
                  <CodeShowcase />
                  <Installation />
                  <Newsletter />
                </motion.div>
              } />
              <Route path="/download" element={
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <DownloadPage />
                </motion.div>
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
}
