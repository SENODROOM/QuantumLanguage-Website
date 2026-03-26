import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Terminal } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => (
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
          An evolving project by <span className="text-cyan-500 font-bold">SENODROOM</span>, built for speed, flexibility, and future-proof systems.
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
