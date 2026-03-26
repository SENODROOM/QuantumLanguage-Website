import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const LanguageComparison = () => {
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
          
          <div className="space-y-8 p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-black/5 dark:border-white/10 shadow-2xl">
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
