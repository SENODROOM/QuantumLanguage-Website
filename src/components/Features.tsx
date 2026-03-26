import React from 'react';
import { motion } from 'motion/react';
import { Zap, Shield, Cpu, Terminal, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export const Features = () => {
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
