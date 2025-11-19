import React, { useState } from 'react';
import { 
  Layers, 
  Zap, 
  Layout, 
  Box, 
  ArrowRight, 
  Github, 
  Cpu,
  ShieldCheck,
  Terminal,
  Activity,
  Aperture,
  ScanFace
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/Button';
import { CodeBlock, SupportedLanguage } from './components/CodeBlock';
import { HolographicBackground } from './components/HolographicBackground';
import { cn } from './lib/utils';

// --- Mock Data for Components ---

interface ComponentItem {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  preview: React.ReactNode;
  codes: Record<SupportedLanguage, string>;
}

const componentsData: ComponentItem[] = [
  {
    id: "holo-button",
    category: "Essenciais",
    title: "Botão Holográfico",
    description: "Um botão com efeito de brilho interno e bordas luminosas ao passar o mouse. Ideal para CTAs principais.",
    icon: <Box size={18} />,
    preview: (
      <Button variant="holo" size="lg" className="min-w-[180px]">
        Iniciar Protocolo
        <ArrowRight size={16} className="ml-2" />
      </Button>
    ),
    codes: {
      react: `import { cn } from "@/lib/utils";

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
);`,
      vue: `<template>
  <button
    :class="[
      'relative overflow-hidden rounded-md border border-zinc-800 bg-black/50 px-6 py-3 text-white transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] group backdrop-blur-sm',
      className
    ]"
    v-bind="$attrs"
  >
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
    <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
      <slot />
    </span>
  </button>
</template>

<script setup>
defineProps(['className']);
</script>`,
      html: `<button class="relative overflow-hidden rounded-md border border-zinc-800 bg-black/50 px-6 py-3 text-white transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] group backdrop-blur-sm">
  <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></span>
  <span class="relative z-10 flex items-center gap-2 font-medium tracking-wide">
    Iniciar Protocolo
    <!-- Icon SVG here -->
  </span>
</button>`
    }
  },
  {
    id: "glass-panel",
    category: "Layout",
    title: "Painel de Vidro",
    description: "Cartão de vidro fosco de alto desempenho com textura de ruído para profundidade extra.",
    icon: <Layout size={18} />,
    preview: (
      <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl max-w-sm w-full relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-holo-cyan to-holo-blue flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Cpu size={20} className="text-white" />
            </div>
            <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-mono border border-green-500/20">Ativo</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Status do Sistema</h3>
        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
          Todos os nós estão operacionais. A conexão da ponte neural está estável com 99,9% de eficiência.
        </p>
        <div className="w-full bg-zinc-800/50 rounded-full h-1.5 overflow-hidden">
            <div className="h-full w-[85%] bg-gradient-to-r from-holo-cyan to-holo-purple rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </div>
      </div>
    ),
    codes: {
      react: `export const GlassPanel = ({ children, className }) => (
  <div className={cn(
    "p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl relative overflow-hidden",
    className
  )}>
    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
    {children}
  </div>
);`,
      vue: `<template>
  <div :class="['p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl relative overflow-hidden', className]">
    <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay" />
    <slot />
  </div>
</template>

<script setup>
defineProps(['className']);
</script>`,
      html: `<div class="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl relative overflow-hidden">
  <div class="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay"></div>
  <!-- Content goes here -->
</div>`
    }
  },
  {
    id: "neon-input",
    category: "Dados",
    title: "Input Neon",
    description: "Campo de entrada com brilho gradiente focado e animação suave de borda.",
    icon: <Terminal size={18} />,
    preview: (
      <div className="w-full max-w-sm space-y-4">
        <div className="relative group">
          <label className="text-xs text-zinc-500 ml-1 mb-1.5 block uppercase tracking-wider font-mono">Chave de Acesso</label>
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
    codes: {
      react: `export const NeonInput = (props) => (
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
);`,
      vue: `<template>
  <div class="relative group">
    <div class="relative">
      <input 
        v-bind="$attrs"
        class="w-full bg-zinc-950 border-none rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 peer relative z-10"
      />
      <div class="absolute inset-0 rounded-lg p-[1px] -z-0 bg-zinc-800 peer-focus:bg-gradient-to-r peer-focus:from-cyan-500 peer-focus:via-purple-500 peer-focus:to-blue-500 transition-all duration-500">
        <div class="h-full w-full bg-zinc-950 rounded-lg" />
      </div>
      <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 peer-focus:opacity-20 blur-xl -z-10 transition-opacity" />
    </div>
  </div>
</template>`,
      html: `<div class="relative group">
  <div class="relative">
    <input type="text" class="w-full bg-zinc-950 border-none rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-0 peer relative z-10" />
    <div class="absolute inset-0 rounded-lg p-[1px] -z-0 bg-zinc-800 peer-focus:bg-gradient-to-r peer-focus:from-cyan-500 peer-focus:via-purple-500 peer-focus:to-blue-500 transition-all duration-500">
      <div class="h-full w-full bg-zinc-950 rounded-lg"></div>
    </div>
    <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 peer-focus:opacity-20 blur-xl -z-10 transition-opacity"></div>
  </div>
</div>`
    }
  },
  {
    id: "cyber-badge",
    category: "Feedback",
    title: "Badge Cibernético",
    description: "Um indicador de status pulsante com efeito de glitch ao passar o mouse.",
    icon: <ShieldCheck size={18} />,
    preview: (
      <div className="flex gap-4">
        <span className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group cursor-pointer">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl group-hover:text-holo-cyan transition-colors">
              <ScanFace className="mr-2 h-4 w-4" />
              Identidade Verificada
            </span>
        </span>
      </div>
    ),
    codes: {
      react: `export const CyberBadge = ({ children }) => (
  <span className="relative inline-flex overflow-hidden rounded-full p-[1px]">
    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
      {children}
    </span>
  </span>
);`,
      vue: `<template>
  <span class="relative inline-flex overflow-hidden rounded-full p-[1px]">
    <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
    <span class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
      <slot />
    </span>
  </span>
</template>`,
      html: `<span class="relative inline-flex overflow-hidden rounded-full p-[1px]">
  <span class="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]"></span>
  <span class="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Identidade Verificada
  </span>
</span>`
    }
  },
  {
    id: "quantum-loader",
    category: "Feedback",
    title: "Carregador Quântico",
    description: "Animação de carregamento baseada em física orbital.",
    icon: <Activity size={18} />,
    preview: (
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-t-holo-cyan border-r-transparent border-b-holo-purple border-l-transparent rounded-full animate-spin" />
        <div className="absolute inset-2 border-2 border-r-holo-cyan border-t-transparent border-l-holo-purple border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>
    ),
    codes: {
      react: `export const QuantumLoader = () => (
  <div className="relative w-16 h-16">
    <div className="absolute inset-0 border-2 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin" />
    <div className="absolute inset-2 border-2 border-r-cyan-500 border-t-transparent border-l-purple-500 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
    <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
  </div>
);`,
      vue: `<template>
  <div class="relative w-16 h-16">
    <div class="absolute inset-0 border-2 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin" />
    <div class="absolute inset-2 border-2 border-r-cyan-500 border-t-transparent border-l-purple-500 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]" />
    <div class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
  </div>
</template>`,
      html: `<div class="relative w-16 h-16">
  <div class="absolute inset-0 border-2 border-t-cyan-500 border-r-transparent border-b-purple-500 border-l-transparent rounded-full animate-spin"></div>
  <div class="absolute inset-2 border-2 border-r-cyan-500 border-t-transparent border-l-purple-500 border-b-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
  <div class="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
</div>`
    }
  },
  {
    id: "holo-card-advanced",
    category: "Layout",
    title: "Cartão de Detalhe",
    description: "Um cartão que revela informações adicionais com um efeito hover sofisticado.",
    icon: <Aperture size={18} />,
    preview: (
      <div className="group relative h-64 w-56 overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/10">
        <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
           <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
           <div className="h-full w-full bg-zinc-800" />
        </div>
        <div className="absolute bottom-0 z-20 p-4 transition-all duration-300 group-hover:-translate-y-2">
          <h3 className="text-lg font-bold text-white">Projeto Titã</h3>
          <p className="mt-2 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Acesso confidencial aos arquivos do servidor central.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-holo-cyan opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
            <span>Acessar Arquivos</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    ),
    codes: {
      react: `export const DetailCard = () => (
  <div className="group relative h-64 w-56 overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/10">
    <div className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
       {/* Replace with <img> */}
       <div className="h-full w-full bg-zinc-800" /> 
    </div>
    <div className="absolute bottom-0 z-20 p-4 transition-all duration-300 group-hover:-translate-y-2">
      <h3 className="text-lg font-bold text-white">Título do Card</h3>
      <p className="mt-2 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Descrição revelada ao passar o mouse.
      </p>
    </div>
  </div>
);`,
      vue: `<template>
  <div class="group relative h-64 w-56 overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/10">
    <div class="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
       <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
       <div class="h-full w-full bg-zinc-800" /> 
    </div>
    <div class="absolute bottom-0 z-20 p-4 transition-all duration-300 group-hover:-translate-y-2">
      <h3 class="text-lg font-bold text-white">Título do Card</h3>
      <p class="mt-2 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Descrição revelada ao passar o mouse.
      </p>
    </div>
  </div>
</template>`,
      html: `<div class="group relative h-64 w-56 overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/10">
  <div class="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110">
     <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
     <div class="h-full w-full bg-zinc-800"></div> 
  </div>
  <div class="absolute bottom-0 z-20 p-4 transition-all duration-300 group-hover:-translate-y-2">
    <h3 class="text-lg font-bold text-white">Título do Card</h3>
    <p class="mt-2 text-sm text-gray-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      Descrição revelada ao passar o mouse.
    </p>
  </div>
</div>`
    }
  }
];

// Get unique categories
const categories = Array.from(new Set(componentsData.map(c => c.category)));

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
            <a href="#features" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Recursos</a>
            <a href="#components" className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Biblioteca</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
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
              Começar Agora
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
                Versão 2.0 - Produção Pronta
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-white">
                UI para a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-holo-cyan via-white to-holo-purple animate-shimmer bg-[length:200%_auto]">Próxima Geração</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                Uma coleção meticulosa de componentes UI prontos para uso, projetados para aplicações web modernas. 
                Zero dependências. Puro TypeScript, Vue e HTML.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="holo" size="lg" className="w-full sm:w-auto">
                  Explorar Componentes
                  <Layers className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="ghost" size="lg" className="text-zinc-400 hover:text-white w-full sm:w-auto">
                  Ler Documentação
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
                  title: "Ultra Rápido",
                  desc: "Zero overhead em tempo de execução. Os componentes são apenas código que você possui."
                },
                {
                  icon: <ShieldCheck className="text-green-400" />,
                  title: "Type Safe",
                  desc: "Escrito em TypeScript com inferência de tipo completa e intellisense."
                },
                {
                  icon: <Layout className="text-holo-cyan" />,
                  title: "Estética Moderna",
                  desc: "Glassmorphism, gradientes brilhantes e animações suaves prontos para uso."
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
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Biblioteca de Componentes</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Selecione um componente para ver sua prévia interativa e pegar o código-fonte.
                Sem instalação npm — apenas copie e cole.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Sidebar */}
              <div className="lg:col-span-3 flex flex-col gap-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
                {categories.map(category => (
                  <div key={category}>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2">{category}</h4>
                    <div className="space-y-1">
                      {componentsData.filter(c => c.category === category).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setActiveTab(c.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left group",
                            activeTab === c.id
                              ? "bg-white/10 text-white"
                              : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                          )}
                        >
                          {activeTab === c.id && (
                            <motion.div 
                              layoutId="active-pill"
                              className="absolute left-0 w-1 h-6 bg-holo-cyan rounded-r-full"
                            />
                          )}
                          <span className={cn(
                              "transition-colors",
                              activeTab === c.id ? "text-holo-cyan" : "text-zinc-600 group-hover:text-zinc-400"
                          )}>
                              {c.icon}
                          </span>
                          {c.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                
                {/* Fake expansion to simulate "Hundreds" */}
                <div className="pt-4 border-t border-white/5 opacity-50">
                  <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-wider mb-3 px-2">Em Breve</h4>
                  <div className="space-y-2 px-2">
                    {['Gráficos 3D', 'Tabelas de Dados', 'Modais Quânticos', 'Sidebar Infinita'].map((item, i) => (
                       <div key={i} className="text-sm text-zinc-700 flex items-center gap-2 cursor-not-allowed">
                          <div className="w-4 h-4 rounded bg-zinc-900" />
                          {item}
                       </div>
                    ))}
                    <div className="text-xs text-zinc-700 italic mt-2">+200 componentes...</div>
                  </div>
                </div>
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
                          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Prévia: {activeComponent.title}</span>
                          <div className="flex gap-1.5">
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
                             <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700" />
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
                            <div className="flex items-center gap-3 mb-3">
                               <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                 {activeComponent.category}
                               </span>
                            </div>
                            <h3 className="text-3xl font-bold mb-3 text-white">{activeComponent.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-lg">{activeComponent.description}</p>
                        </div>

                        <CodeBlock 
                            codes={activeComponent.codes} 
                            title={`${activeComponent.title.replace(/\s+/g, '')}`} 
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
              Pare de reinventar a roda.
            </h2>
            <p className="text-xl text-zinc-400 mb-12">
              Junte-se a milhares de desenvolvedores construindo interfaces melhores, mais rápido.
            </p>
            <div className="flex justify-center gap-6">
               <Button variant="primary" size="lg" className="px-12">
                  Acesso Completo
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
             <span className="text-zinc-500 text-sm">© 2024 Holographic UI. Licença MIT.</span>
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