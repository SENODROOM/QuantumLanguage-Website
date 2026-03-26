import React from 'react';
import { Sparkles } from 'lucide-react';

export const Vision = () => {
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
              <h4 className="font-bold text-black dark:text-white">SENODROOM</h4>
              <p className="text-xs text-black/40 dark:text-white/40">Lead Developer & Creator</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
