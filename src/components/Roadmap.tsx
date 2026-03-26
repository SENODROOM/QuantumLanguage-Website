import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const Roadmap = () => {
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
