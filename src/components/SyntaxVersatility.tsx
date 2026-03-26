import React from 'react';

export const SyntaxVersatility = () => {
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
