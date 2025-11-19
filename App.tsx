import React, { useState } from 'react';
import { 
  Layers, 
  Zap, 
  Layout, 
  Box, 
  ArrowRight, 
  Github, 
  Code2,
  Cpu,
  ShieldCheck,
  Terminal,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/Button';
import { CodeBlock } from './components/CodeBlock';
import { HolographicBackground } from './components/HolographicBackground';
import { cn } from './lib/utils';

// --- Mock Data for Components ---

interface ComponentItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  code: string;
}

const componentsData: ComponentItem[] = [
  {
    id: "holo-button",
    title: "Holographic Button",
    description: "A button with an internal shimmer effect and glowing borders on hover.",
    icon: <Box size={18} />,
    preview: (
      <Button variant="holo" size="lg" className="min-w-[160px]">
        Initiate Protocol
        <ArrowRight size={16} className="ml-2" />
      </Button>
    ),
    code: `import { cn } from "@/lib/utils";

export const HoloButton = ({ className, children, ...props }) => (
  <button
    className={cn(
      "relative overflow-hidden rounded-md border border-zinc-800 bg-black/50 px-6 py-3 text-white transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] group backdrop-blur-sm",
      className
    )}
    {...props}
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
    <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">{children}</span>
  </button>
);`
  },
  {
    id: "glass-panel",
    title: "Glass Panel",
    description: "High-performance frosted glass card with noise texture.",
    icon: <Layout size={18} />,
    preview: (
      <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl max-w-sm w-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-holo-cyan to-holo-blue flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Cpu size={20} className="text-white" />
            </div>
            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-mono border border-green-500/20">Active</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">System Status</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          All nodes are operational. Neural bridge connection is stable at 99.9% efficiency.
        </p>
        <div className="w-full bg-zinc-800/50 rounded-full h-1.5 overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-holo-cyan to-holo-purple rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </div>
      </div>
    ),
    code: `export const GlassPanel = ({ children, className }) => (
  <div className={cn(
    "p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl relative overflow-hidden",
    className
  )}>
    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
    {children}
  </div>
);`
  },
  {
    id: "neon-input",
    title: "Neon Input",
    description: "Input field with a focused gradient border glow.",
    icon: <Terminal size={18} />,
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <div className="relative group">
          <label className="text-xs text-zinc-500 ml-1 mb-1.5 block uppercase tracking-wider font-mono">Access Key</label>
          <div className="relative">
            <input 
                type="text" 
                placeholder="XXXX-XXXX-XXXX" 
                className="w-full bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-transparent focus:ring-0 transition-all peer relative z-10"
            />
            {/* Border Glow Container */}
            <div className="absolute inset-0 rounded-lg p-[1px] -z-0 bg-gradient-to-r from-transparent via-zinc-700 to-transparent peer-focus:from-holo-cyan peer-focus:via-holo-purple peer-focus:to-holo-blue transition-all duration-500 opacity-50 peer-focus:opacity-100">
                <div className="h-full w-full bg-zinc-950 rounded-lg" />
            </div>
            {/* Ambient Glow */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-holo-cyan to-holo-purple opacity-0 peer-focus:opacity-20 blur-xl -z-10 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    ),
    code: `export const NeonInput = (props) => (
  <div className="relative group">
    <div className="relative">
      <input 
        {...props}
        className="w-full bg-zinc-950 border-none rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 peer relative z-10"
      />
      <div className="absolute inset-0 rounded-lg p-[1px] -z-0 bg-zinc-800 peer-focus:bg-gradient-to-r peer-focus:from-cyan-500 peer-focus:via-purple-500 peer-focus:to-blue-500 transition-all duration-500">
        <div className="h-full w-full bg-zinc-950 rounded-lg" />
      </div>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 peer-focus:opacity-20 blur-xl -z-10 transition-opacity" />
    </div>
  </div>
);`
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(componentsData[0].id);
  const activeComponent = componentsData.find(c => c.id === activeTab) || componentsData[0];

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-holo-cyan/30 selection:text-white relative font-sans">
      <HolographicBackground />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/20 backdrop-blur-lg">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-8 h-8 bg-zinc-900 rounded-lg border border-white/10 shadow-lg shadow-cyan-500/10">
               <div className="absolute inset-0 bg-gradient-to-tr from-holo-cyan/20 to-holo-purple/20 rounded-lg animate-pulse" />
               <Layers className="text-white w-5 h-5 relative z-10" />
            </div>
            <span className="text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">HoloGraphic</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Features</a>
            <a href="#components" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Components</a>
          </nav>

          <div className="flex items-center gap-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              <Github size={20} />
            </a>
            <Button variant="primary" size="sm" className="hidden sm:flex font-semibold">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-6 overflow-hidden">
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-holo-cyan mb-8 hover:bg-white/10 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                Production Ready v2.0
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-white">
                UI for the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-holo-cyan via-white to-holo-purple animate-shimmer bg-[length:200%_auto]">Next Generation</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                A meticulously crafted collection of copy-paste UI components designed for modern web apps. 
                Zero dependencies. Pure TypeScript.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="holo" size="lg" className="w-full sm:w-auto">
                  Browse Components
                  <Layers className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="ghost" size="lg" className="text-zinc-400 hover:text-white w-full sm:w-auto">
                  Read Documentation
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <Zap className="text-yellow-400" />,
                  title: "Lightning Fast",
                  desc: "Zero runtime overhead. Components are just code you own."
                },
                {
                  icon: <ShieldCheck className="text-green-400" />,
                  title: "Type Safe",
                  desc: "Written in TypeScript with full type inference and intellisense."
                },
                {
                  icon: <Layout className="text-holo-cyan" />,
                  title: "Modern Aesthetics",
                  desc: "Glassmorphism, glowing gradients, and smooth animations out of the box."
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-2xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/40 transition-colors hover:border-white/10"
                >
                  <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-6 border border-white/5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Component Showcase */}
        <section id="components" className="py-32 px-6 relative">
           {/* Glow Effect behind showcase */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-holo-purple/5 rounded-full blur-[100px] -z-10" />
           
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 md:text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Library</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Select a component to view its interactive preview and grab the source code.
                No npm install required—just copy and paste.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Sidebar */}
              <div className="lg:col-span-3 flex flex-col gap-2 sticky top-24">
                {componentsData.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveTab(c.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-all text-left border group",
                      activeTab === c.id
                        ? "bg-white/5 border-holo-cyan/30 text-white shadow-[0_0_20px_rgba(6,182,212,0.05)]"
                        : "border-transparent text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                    )}
                  >
                    <span className={cn(
                        "p-2 rounded-md transition-colors",
                        activeTab === c.id ? "bg-holo-cyan/10 text-holo-cyan" : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-400"
                    )}>
                        {c.icon}
                    </span>
                    {c.title}
                  </button>
                ))}
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeComponent.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Visual Preview Card */}
                    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl">
                       <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-white/[0.02]">
                          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Preview</span>
                          <div className="flex gap-1.5">
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                          </div>
                       </div>
                       <div className="relative min-h-[400px] flex items-center justify-center p-12 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),transparent)]">
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
                          {activeComponent.preview}
                       </div>
                    </div>

                    {/* Component Info & Code */}
                    <div className="grid gap-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-white">{activeComponent.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{activeComponent.description}</p>
                        </div>

                        <CodeBlock 
                            code={activeComponent.code} 
                            title={`${activeComponent.title.replace(/\s+/g, '')}.tsx`} 
                        />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-holo-cyan/5 to-transparent pointer-events-none" />
          <div className="container mx-auto max-w-3xl text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Stop reinventing the wheel.
            </h2>
            <p className="text-xl text-zinc-400 mb-12">
              Join thousands of developers building better interfaces, faster.
            </p>
            <div className="flex justify-center gap-6">
               <Button variant="primary" size="lg" className="px-12">
                  Start Building
               </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-white">H</span>
             </div>
             <span className="text-zinc-500 text-sm">© 2024 Holographic UI. MIT License.</span>
          </div>
          <div className="flex items-center gap-8 text-zinc-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}