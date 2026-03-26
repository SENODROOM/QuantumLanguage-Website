import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export const FAQ = () => {
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
