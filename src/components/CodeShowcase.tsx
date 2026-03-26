import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

export const CodeShowcase = () => {
  const { theme } = useTheme();
  const examples = [
    {
      title: "Hello World",
      code: `// Simple printing
print("Hello, Quantum!");

// C-style printing
printf("Version: %s\\n", "2.0");`
    },
    {
      title: "Functions & Logic",
      code: `function calculate(int x, int y) {
    if (x > y) {
        return x * y;
    }
    return x + y;
}

int result = calculate(10, 5);
print(result);`
    },
    {
      title: "Cryptography",
      code: `string data = "secret_message";
string hashed = hash("sha256", data);

print("SHA256: " + hashed);`
    },
    {
      title: "Classes",
      code: `class SecurityTool {
    function init(string name) {
        this.name = name;
    }
    
    function scan() {
        print("Scanning with " + this.name);
    }
}

var tool = SecurityTool("QuantumScanner");
tool.scan();`
    }
  ];

  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <section id="code" className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-black dark:text-white tracking-tight mb-6 uppercase">ELEGANT SYNTAX, <br />INFINITE POSSIBILITIES</h2>
            <p className="text-black/60 dark:text-white/60 text-lg mb-8">
              Quantum's syntax is designed to be intuitive for developers coming from Python, JavaScript, or C++. 
              It combines the best of all worlds into a cohesive, powerful scripting environment.
            </p>
            <div className="space-y-4">
              {examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={cn(
                    "w-full text-left p-4 rounded-xl border transition-all",
                    activeTab === i 
                      ? "bg-cyan-500/10 border-cyan-500 text-cyan-600 dark:text-white" 
                      : "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/10"
                  )}
                >
                  <span className="font-bold">{ex.title}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-cyan-500/20 blur-2xl rounded-3xl -z-10" />
            <div className="bg-white dark:bg-black rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl transition-colors duration-300">
              <div className="flex items-center justify-between px-4 py-2 bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-[10px] font-mono text-black/30 dark:text-white/30 uppercase tracking-widest">example.sa</span>
              </div>
              <div className="p-4">
                <SyntaxHighlighter
                  language="javascript"
                  style={theme === 'dark' ? atomDark : undefined}
                  customStyle={{ background: 'transparent', padding: 0, fontSize: '14px' }}
                >
                  {examples[activeTab].code}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
