import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

export const Blog = () => {
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
            <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-4 uppercase">Latest from the Lab</h2>
            <p className="text-black/50 dark:text-white/50 max-w-xl">
              Deep dives into language internals, performance tips, and project updates.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs hover:gap-3 transition-all">
            View All Posts <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video bg-black/5 dark:bg-white/5 rounded-2xl mb-6 overflow-hidden border border-black/5 dark:border-white/5 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white dark:bg-black rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 border border-black/5 dark:border-white/10">
                  {post.category}
                </div>
              </div>
              <div className="text-xs text-black/30 dark:text-white/30 font-bold uppercase tracking-widest mb-3">{post.date}</div>
              <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-cyan-500 transition-colors">{post.title}</h3>
              <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
