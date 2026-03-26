import React from 'react';
import { Link } from 'react-router-dom';
import { Github as GithubIcon, Globe, Terminal } from 'lucide-react';

export const Footer = () => (
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
              Developed by <span className="text-cyan-500 font-bold">SENODROOM</span>.
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
        <p>© 2026 Quantum Language. Developed by <a href="https://github.com/SENODROOM" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-500 transition-colors">SENODROOM</a>.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
