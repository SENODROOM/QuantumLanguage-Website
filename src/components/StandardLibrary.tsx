import React from 'react';

export const StandardLibrary = () => (
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
