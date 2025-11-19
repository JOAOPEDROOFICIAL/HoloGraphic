import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Zap, 
  Layout, 
  Box, 
  ArrowRight, 
  Github, 
  Code2,
  Cpu,
  ShieldCheck
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
    id: "neon-button",
    title: "Holo Button",
    description: "A button with an internal glow and shimmer effect.",
    icon: <Box size={20} />,
    preview: (
      <Button variant="holo" size="lg" className="w-full sm:w-auto">
        Deploy System
        <ArrowRight size={16} className="ml-2" />
      </Button>
    ),
    code: `// components/HoloButton.tsx
import { cn } from "@/lib/utils";

export const HoloButton = ({ className, ...props }) => (
  <button
    className={cn(
      "relative overflow-hidden rounded-md border border-zinc-800 bg-black px-6 py-3 text-white transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group",
      className
    )}
    {...props}
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
    <span className="relative z-10 flex items-center gap-2">{props.children}</span>
  </button>
);`
  },
  {
    id: "glass-card",
    title: "Glass Panel",
    description: "Frosted glass effect using backdrop filters.",
    icon: <Layout size={20} />,
    preview: (
      <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md max-w-sm w-full">
        <h3 className="text-lg font-semibold text-white mb-2">System Status</h3>
        <p className="text-zinc-400 text-sm mb-4">All systems operational. Quantum core stable.</p>
        <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-xs text-green-500">Online</span>
        </div>
      </div>
    ),
    code: `export const GlassCard = ({ children }) => (
  <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
    {children}
  </div>
);`
  },
  {
    id: "cyber-input",
    title: "Cyber Input",
    description: "Focus states that trigger a neon border glow.",
    icon: <Code2 size={20} />,
    preview: (
      <div className="w-full max-w-sm">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Enter Access Code..." 
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-holo-purple focus:ring-1 focus:ring-holo-purple/50 transition-all"
          />
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-holo-cyan to-holo-purple opacity-0 group-hover:opacity-20 blur-lg -z-10 transition-opacity" />
        </div>
      </div>
    ),
    code: `export const CyberInput = (props) => (
  <div className="relative group">
    <input 
      {...props}
      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500/50 transition-all"
    />
    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover:opacity-20 blur-lg -z-10 transition-opacity" />
  </div>
);`
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(componentsData[0].id);
  const activeComponent = componentsData.find(c => c.id === activeTab) || componentsData[0];

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-holo-cyan/30 selection:text-white relative">
      <HolographicBackground />

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-tr from-holo-cyan to-holo-purple rounded-lg">
               <Cpu className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">HoloGraphic</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#components" className="hover:text-white transition-colors">Components</a>
            <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
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
            <Button variant="primary" size="sm" className="hidden sm:flex">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 px-6 overflow-hidden">
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-holo-cyan mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                v2.0.0 is now live
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/50">
                Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-holo-cyan to-holo-purple">Future</span> <br />
                One Component at a Time
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                A meticulously crafted collection of copy-paste UI components designed for the modern web. 
                No installation wizards. No bloat. Just code.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="holo" size="lg">
                  Browse Components
                  <Layers className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="ghost" size="lg" className="text-zinc-400 hover:text-white">
                  Read the docs
                </Button>
              </div>
            </motion.div>

            {/* Abstract Dashboard UI for visual interest */}
            <motion.div 
              initial={{ opacity: 0, rotateX: 20, y: 40 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 relative mx-auto max-w-4xl perspective-1000"
            >
              <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm p-2 shadow-2xl shadow-holo-purple/20">
                 <div className="rounded-lg border border-white/5 bg-zinc-900/50 overflow-hidden h-[300px] md:h-[400px] flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-holo-cyan/10 to-holo-purple/10" />
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-8 w-full">
                       {/* Abstract Skeleton UI */}
                       <div className="col-span-2 h-24 bg-white/5 rounded-lg border border-white/5 animate-pulse" />
                       <div className="h-24 bg-white/5 rounded-lg border border-white/5" />
                       <div className="h-32 bg-white/5 rounded-lg border border-white/5" />
                       <div className="col-span-2 h-32 bg-white/5 rounded-lg border border-white/5 bg-gradient-to-r from-white/5 to-transparent" />
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 border-y border-white/5 bg-black/20">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="text-amber-400" />,
                  title: "Lightning Fast",
                  desc: "Built on Radix UI primitives and Tailwind CSS for zero-runtime overhead."
                },
                {
                  icon: <ShieldCheck className="text-green-400" />,
                  title: "Type Safe",
                  desc: "Written in TypeScript with full type inference and Zod validation support."
                },
                {
                  icon: <Layout className="text-holo-cyan" />,
                  title: "Fully Accessible",
                  desc: "WAI-ARIA compliant components that work for everyone, everywhere."
                }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-zinc-900 flex items-center justify-center mb-4 border border-white/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Component Showcase */}
        <section id="components" className="py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready-to-Use Components</h2>
              <p className="text-zinc-400">Select a component to view its visual preview and source code.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Sidebar List */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                {componentsData.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveTab(c.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left border",
                      activeTab === c.id
                        ? "bg-white/10 border-holo-cyan/30 text-white shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                        : "border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                    )}
                  >
                    {c.icon}
                    {c.title}
                  </button>
                ))}
              </div>

              {/* Preview Area */}
              <div className="lg:col-span-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeComponent.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {/* Visual Preview */}
                    <div className="rounded-xl border border-white/10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-zinc-950/80 backdrop-blur relative overflow-hidden min-h-[300px] flex flex-col items-center justify-center p-8">
                       <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] opacity-20" />
                       {activeComponent.preview}
                       <p className="absolute bottom-4 text-xs text-zinc-500 uppercase tracking-widest">Live Preview</p>
                    </div>

                    {/* Description */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2">{activeComponent.title}</h3>
                        <p className="text-zinc-400 mb-4">{activeComponent.description}</p>
                    </div>

                    {/* Code Viewer */}
                    <CodeBlock 
                        code={activeComponent.code} 
                        title={`${activeComponent.title.replace(/\s+/g, '')}.tsx`} 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-holo-cyan/5 to-transparent pointer-events-none" />
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Stop reinventing the wheel.</h2>
            <p className="text-xl text-zinc-400 mb-10">
              Join thousands of developers building better interfaces, faster.
            </p>
            <div className="flex justify-center gap-4">
               <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Browse Library
               </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-zinc-800 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-white">H</span>
             </div>
             <span className="text-zinc-400 text-sm">© 2024 Holographic UI. MIT License.</span>
          </div>
          <div className="flex items-center gap-6 text-zinc-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
            <a href="#" className="hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}