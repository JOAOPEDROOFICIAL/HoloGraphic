
import React, { useState } from 'react';
import { 
  Layers, 
  Layout, 
  Box, 
  ArrowRight, 
  Cpu,
  ShieldCheck,
  Terminal,
  Activity,
  Aperture,
  ScanFace,
  ToggleRight,
  Sliders,
  Loader2,
  BarChart3,
  Ghost,
  ChevronRight,
  Globe,
  Link as LinkIcon,
  Copy,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './components/ui/Button';
import { CodeBlock, SupportedLanguage } from './components/CodeBlock';
import { HolographicBackground } from './components/HolographicBackground';
import { Toaster, ToastMessage } from './components/ui/Toast';
import { getComponentApiUrl, API_BASE_URL } from './lib/api';
import { cn, copyToClipboard } from './lib/utils';

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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("holo-button");
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, description?: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Wrapper para injetar a ação de toast nos componentes de preview se necessário
  // ou apenas usar a função addToast diretamente nos onClick dos elementos abaixo
  const handleAction = (actionName: string) => {
    addToast("Ação Executada", `Evento disparado: ${actionName}`);
  };

  const componentsData: ComponentItem[] = [
    // --- ESSENCIAIS ---
    {
      id: "holo-button",
      category: "Essenciais",
      title: "Botão Holográfico",
      description: "Um botão com efeito de brilho interno e bordas luminosas ao passar o mouse. Ideal para CTAs principais.",
      icon: <Box size={18} />,
      preview: (
        <Button 
          variant="holo" 
          size="lg" 
          className="min-w-[180px]" 
          onClick={() => handleAction("Click no Botão Holográfico")}
        >
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
  </span>
</button>`
      }
    },
    
    // --- INPUTS & FORMULÁRIOS ---
    {
      id: "neon-input",
      category: "Formulários",
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
                  onFocus={() => handleAction("Input Focado")}
              />
              <div className="absolute inset-0 rounded-lg p-[1px] -z-0 bg-gradient-to-r from-transparent via-zinc-700 to-transparent peer-focus:from-holo-cyan peer-focus:via-holo-purple peer-focus:to-holo-blue transition-all duration-500 opacity-50 peer-focus:opacity-100">
                  <div className="h-full w-full bg-zinc-950 rounded-lg" />
              </div>
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
      id: "plasma-switch",
      category: "Formulários",
      title: "Switch de Plasma",
      description: "Toggle switch com efeito de energia fluida e iluminação ambiente.",
      icon: <ToggleRight size={18} />,
      preview: (
        <label className="relative inline-flex items-center cursor-pointer group">
          <input 
            type="checkbox" 
            className="sr-only peer" 
            defaultChecked 
            onChange={(e) => handleAction(`Switch alterado para: ${e.target.checked ? 'Ligado' : 'Desligado'}`)}
          />
          <div className="w-14 h-7 bg-zinc-900 peer-focus:outline-none border border-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-950 peer-checked:border-holo-cyan/50 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-holo-cyan/20 to-holo-blue/20 opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
          <span className="ml-3 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">Motor de Dobra</span>
          <div className="absolute inset-0 rounded-full bg-holo-cyan/20 blur-md opacity-0 peer-checked:opacity-50 transition-opacity -z-10" />
        </label>
      ),
      codes: {
        react: `export const PlasmaSwitch = ({ label, ...props }) => (
  <label className="relative inline-flex items-center cursor-pointer group">
    <input type="checkbox" className="sr-only peer" {...props} />
    <div className="w-14 h-7 bg-zinc-900 border border-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-950 peer-checked:border-cyan-500/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 peer-checked:opacity-100 transition-opacity" />
    </div>
    {label && <span className="ml-3 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{label}</span>}
    <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md opacity-0 peer-checked:opacity-50 transition-opacity -z-10" />
  </label>
);`,
        vue: `<template>
  <label class="relative inline-flex items-center cursor-pointer group">
    <input type="checkbox" class="sr-only peer" v-bind="$attrs" />
    <div class="w-14 h-7 bg-zinc-900 border border-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-950 peer-checked:border-cyan-500/50 relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 peer-checked:opacity-100 transition-opacity" />
    </div>
    <span v-if="label" class="ml-3 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">{{ label }}</span>
    <div class="absolute inset-0 rounded-full bg-cyan-500/20 blur-md opacity-0 peer-checked:opacity-50 transition-opacity -z-10" />
  </label>
</template>

<script setup>
defineProps(['label']);
</script>`,
        html: `<label class="relative inline-flex items-center cursor-pointer group">
  <input type="checkbox" class="sr-only peer" checked>
  <div class="w-14 h-7 bg-zinc-900 border border-zinc-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:bg-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-zinc-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-zinc-950 peer-checked:border-cyan-500/50 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
  </div>
  <span class="ml-3 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">Label</span>
  <div class="absolute inset-0 rounded-full bg-cyan-500/20 blur-md opacity-0 peer-checked:opacity-50 transition-opacity -z-10"></div>
</label>`
      }
    },
    {
      id: "energy-slider",
      category: "Formulários",
      title: "Slider de Energia",
      description: "Slider de alcance com preenchimento gradiente brilhante.",
      icon: <Sliders size={18} />,
      preview: (
        <div className="w-full max-w-xs space-y-4">
          <div className="flex justify-between text-xs font-mono text-holo-cyan">
             <span>0%</span>
             <span>50%</span>
             <span>100%</span>
          </div>
          <div className="relative w-full h-2 bg-zinc-900 rounded-full border border-zinc-800 group">
             <div className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-holo-cyan to-holo-purple rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]" />
             <div 
                className="absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-purple-500/50 border-2 border-purple-500 cursor-pointer hover:scale-110 transition-transform"
                onMouseDown={() => handleAction("Ajustando Energia")}
             />
          </div>
        </div>
      ),
      codes: {
        react: `export const EnergySlider = ({ value = 65, ...props }) => (
  <div className="relative w-full h-2 bg-zinc-900 rounded-full border border-zinc-800 group">
     <div 
       className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]" 
       style={{ width: \`\${value}%\` }} 
     />
     <div 
       className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-purple-500/50 border-2 border-purple-500 cursor-pointer hover:scale-110 transition-transform"
       style={{ left: \`\${value}%\` }}
     />
     <input type="range" className="absolute inset-0 w-full opacity-0 cursor-pointer" {...props} />
  </div>
);`,
        vue: `<template>
  <div class="relative w-full h-2 bg-zinc-900 rounded-full border border-zinc-800 group">
     <div 
       class="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]" 
       :style="{ width: value + '%' }" 
     />
     <div 
       class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-purple-500/50 border-2 border-purple-500 cursor-pointer hover:scale-110 transition-transform"
       :style="{ left: value + '%' }"
     />
     <input type="range" class="absolute inset-0 w-full opacity-0 cursor-pointer" :value="value" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
defineProps(['value']);
</script>`,
        html: `<div class="relative w-full h-2 bg-zinc-900 rounded-full border border-zinc-800">
   <div class="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"></div>
   <div class="absolute top-1/2 left-[65%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-purple-500/50 border-2 border-purple-500 cursor-pointer"></div>
   <input type="range" class="absolute inset-0 w-full opacity-0 cursor-pointer">
</div>`
      }
    },

    // --- LAYOUT ---
    {
      id: "glass-panel",
      category: "Layout",
      title: "Painel de Vidro",
      description: "Cartão de vidro fosco de alto desempenho com textura de ruído para profundidade extra.",
      icon: <Layout size={18} />,
      preview: (
        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl max-w-sm w-full relative overflow-hidden group hover:border-white/20 transition-all cursor-pointer" onClick={() => handleAction("Painel Expandido")}>
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
      id: "holo-card-advanced",
      category: "Layout",
      title: "Cartão de Detalhe",
      description: "Um cartão que revela informações adicionais com um efeito hover sofisticado.",
      icon: <Aperture size={18} />,
      preview: (
        <div 
          className="group relative h-64 w-56 overflow-hidden rounded-xl bg-neutral-900 cursor-pointer border border-white/10"
          onClick={() => handleAction("Detalhes do Cartão Abertos")}
        >
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
       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
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
    },
    {
      id: "laser-divider",
      category: "Layout",
      title: "Divisor Laser",
      description: "Uma linha divisória animada com um 'brilho' viajante.",
      icon: <Activity size={18} />,
      preview: (
        <div className="w-full px-8 py-12" onClick={() => handleAction("Divisor Interagido")}>
          <div className="relative h-[1px] w-full bg-zinc-800 overflow-hidden hover:bg-zinc-700 transition-colors cursor-crosshair">
             <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-holo-cyan to-transparent animate-[shimmer_2s_infinite]" />
          </div>
        </div>
      ),
      codes: {
        react: `export const LaserDivider = () => (
  <div className="relative h-[1px] w-full bg-zinc-800 overflow-hidden">
     <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[shimmer_2s_infinite]" />
  </div>
);`,
        vue: `<template>
  <div class="relative h-[1px] w-full bg-zinc-800 overflow-hidden">
     <div class="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[shimmer_2s_infinite]" />
  </div>
</template>`,
        html: `<div class="relative h-[1px] w-full bg-zinc-800 overflow-hidden">
  <div class="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[shimmer_2s_infinite]"></div>
</div>`
      }
    },

    // --- FEEDBACK ---
    {
      id: "cyber-badge",
      category: "Feedback",
      title: "Badge Cibernético",
      description: "Um indicador de status pulsante com efeito de glitch ao passar o mouse.",
      icon: <ShieldCheck size={18} />,
      preview: (
        <div className="flex gap-4">
          <span 
            className="relative inline-flex overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 group cursor-pointer"
            onClick={() => handleAction("Verificando Identidade...")}
          >
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
      icon: <Loader2 size={18} />,
      preview: (
        <div className="relative w-16 h-16 cursor-wait" onClick={() => handleAction("Aguarde, processando...")}>
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
      id: "stream-progress",
      category: "Feedback",
      title: "Progresso de Fluxo",
      description: "Barra de progresso com listras animadas indicando transferência de dados.",
      icon: <BarChart3 size={18} />,
      preview: (
        <div className="w-full max-w-sm cursor-pointer" onClick={() => handleAction("Status do Upload: 84%")}>
          <div className="flex justify-between mb-2 text-xs text-zinc-400">
            <span>Enviando...</span>
            <span className="text-holo-cyan">84%</span>
          </div>
          <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
             <div className="h-full w-[84%] bg-holo-cyan relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]" />
             </div>
          </div>
        </div>
      ),
      codes: {
        react: `export const StreamProgress = ({ value = 50 }) => (
  <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
     <div 
       className="h-full bg-cyan-500 relative overflow-hidden transition-all duration-300"
       style={{ width: \`\${value}%\` }}
     >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]" />
     </div>
  </div>
);`,
        vue: `<template>
  <div class="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
     <div 
       class="h-full bg-cyan-500 relative overflow-hidden transition-all duration-300"
       :style="{ width: value + '%' }"
     >
        <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]" />
     </div>
  </div>
</template>
<script setup>
defineProps(['value']);
</script>`,
        html: `<div class="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
   <div style="width: 84%" class="h-full bg-cyan-500 relative overflow-hidden">
      <div class="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[shimmer_1s_linear_infinite]"></div>
   </div>
</div>`
      }
    },

    // --- NAVEGAÇÃO ---
    {
      id: "neon-tabs",
      category: "Navegação",
      title: "Abas Neon",
      description: "Navegação em abas com indicador de fundo brilhante e transição suave.",
      icon: <Layers size={18} />,
      preview: (
        <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex gap-1">
          {['Painel', 'Config', 'Logs'].map((tab, i) => (
            <button 
              key={tab} 
              onClick={() => handleAction(`Navegar para: ${tab}`)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all relative",
                i === 0 ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {i === 0 && (
                <div className="absolute inset-0 bg-zinc-800 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-zinc-700" />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      ),
      codes: {
        react: `export const NeonTabs = ({ tabs, activeTab, onChange }) => (
  <div className="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex gap-1">
    {tabs.map((tab) => (
      <button 
        key={tab} 
        onClick={() => onChange(tab)}
        className={cn(
          "px-4 py-2 rounded-lg text-sm font-medium transition-all relative",
          activeTab === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
        )}
      >
        {activeTab === tab && (
          <div className="absolute inset-0 bg-zinc-800 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-zinc-700" />
        )}
        <span className="relative z-10">{tab}</span>
      </button>
    ))}
  </div>
);`,
        vue: `<template>
  <div class="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex gap-1">
    <button 
      v-for="tab in tabs" 
      :key="tab"
      @click="$emit('update:modelValue', tab)"
      :class="[
        'px-4 py-2 rounded-lg text-sm font-medium transition-all relative',
        modelValue === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
      ]"
    >
      <div v-if="modelValue === tab" class="absolute inset-0 bg-zinc-800 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-zinc-700" />
      <span class="relative z-10">{{ tab }}</span>
    </button>
  </div>
</template>

<script setup>
defineProps(['tabs', 'modelValue']);
</script>`,
        html: `<div class="p-1 rounded-xl bg-zinc-900 border border-zinc-800 flex gap-1">
  <button class="px-4 py-2 rounded-lg text-sm font-medium text-white relative">
    <div class="absolute inset-0 bg-zinc-800 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] border border-zinc-700"></div>
    <span class="relative z-10">Painel</span>
  </button>
  <button class="px-4 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-300 relative">
    <span class="relative z-10">Logs</span>
  </button>
</div>`
      }
    },
    {
      id: "breadcrumb-glitch",
      category: "Navegação",
      title: "Breadcrumb Glitch",
      description: "Caminho de navegação com separadores animados e efeito de foco.",
      icon: <ChevronRight size={18} />,
      preview: (
        <nav className="flex items-center text-sm text-zinc-500">
          <span className="hover:text-holo-cyan transition-colors cursor-pointer" onClick={() => handleAction("Breadcrumb: Home")}>Home</span>
          <ChevronRight size={14} className="mx-2 text-zinc-700" />
          <span className="hover:text-holo-cyan transition-colors cursor-pointer" onClick={() => handleAction("Breadcrumb: Sistemas")}>Sistemas</span>
          <ChevronRight size={14} className="mx-2 text-zinc-700" />
          <span className="text-white px-2 py-0.5 rounded bg-holo-cyan/10 border border-holo-cyan/20 text-shadow-sm shadow-holo-cyan/50 cursor-default">Núcleo</span>
        </nav>
      ),
      codes: {
        react: `export const Breadcrumb = ({ items }) => (
  <nav className="flex items-center text-sm text-zinc-500">
    {items.map((item, i) => (
      <React.Fragment key={i}>
        {i > 0 && <ChevronRight size={14} className="mx-2 text-zinc-700" />}
        <span className={cn(
          "transition-colors cursor-pointer", 
          i === items.length - 1 
            ? "text-white px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20" 
            : "hover:text-cyan-400"
        )}>
          {item}
        </span>
      </React.Fragment>
    ))}
  </nav>
);`,
        vue: `<template>
  <nav class="flex items-center text-sm text-zinc-500">
    <template v-for="(item, i) in items" :key="i">
      <ChevronRight v-if="i > 0" :size="14" class="mx-2 text-zinc-700" />
      <span :class="[
        'transition-colors cursor-pointer', 
        i === items.length - 1 
          ? 'text-white px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20' 
          : 'hover:text-cyan-400'
      ]">
        {{ item }}
      </span>
    </template>
  </nav>
</template>`,
        html: `<nav class="flex items-center text-sm text-zinc-500">
  <span class="hover:text-cyan-400 transition-colors cursor-pointer">Home</span>
  <svg class="mx-2 text-zinc-700 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
  <span class="text-white px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">Núcleo</span>
</nav>`
      }
    },

    // --- DADOS ---
    {
      id: "hex-avatar",
      category: "Dados",
      title: "Avatar Hexagonal",
      description: "Avatar com máscara de polígono e borda ativa.",
      icon: <Ghost size={18} />,
      preview: (
        <div className="relative w-16 h-16 group cursor-pointer" onClick={() => handleAction("Perfil do Usuário")}>
          <div className="absolute inset-0 bg-gradient-to-r from-holo-cyan to-holo-purple [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] animate-[spin_10s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-[2px] bg-zinc-900 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold group-hover:text-white transition-colors">
               IMG
             </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
        </div>
      ),
      codes: {
        react: `export const HexAvatar = ({ src, alt }) => (
  <div className="relative w-16 h-16 group">
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] animate-[spin_10s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity" />
    <div className="absolute inset-[2px] bg-zinc-900 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] flex items-center justify-center overflow-hidden">
       {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-zinc-800" />}
    </div>
  </div>
);`,
        vue: `<template>
  <div class="relative w-16 h-16 group">
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] animate-[spin_10s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity" />
    <div class="absolute inset-[2px] bg-zinc-900 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] flex items-center justify-center overflow-hidden">
       <img v-if="src" :src="src" :alt="alt" class="w-full h-full object-cover" />
       <div v-else class="w-full h-full bg-zinc-800" />
    </div>
  </div>
</template>
<script setup>
defineProps(['src', 'alt']);
</script>`,
        html: `<div class="relative w-16 h-16 group">
  <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] animate-[spin_10s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity"></div>
  <div class="absolute inset-[2px] bg-zinc-900 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] flex items-center justify-center overflow-hidden">
     <div class="w-full h-full bg-zinc-800"></div>
  </div>
</div>`
      }
    },
    {
      id: "stat-ticker",
      category: "Dados",
      title: "Stat Ticker",
      description: "Exibição de estatísticas com rótulo e tendência.",
      icon: <BarChart3 size={18} />,
      preview: (
        <div className="p-4 rounded-lg bg-black/40 border border-white/10 hover:bg-white/5 transition-colors cursor-pointer" onClick={() => handleAction("Detalhes da Métrica")}>
          <div className="text-zinc-500 text-xs uppercase tracking-wider font-mono mb-1">Conexões Ativas</div>
          <div className="text-3xl font-bold text-white tracking-tight">4,291</div>
          <div className="flex items-center gap-1 text-emerald-400 text-xs mt-2">
             <Activity size={12} />
             <span>+12% desde ontem</span>
          </div>
        </div>
      ),
      codes: {
        react: `export const StatTicker = ({ label, value, trend }) => (
  <div className="p-4 rounded-lg bg-black/40 border border-white/10">
    <div className="text-zinc-500 text-xs uppercase tracking-wider font-mono mb-1">{label}</div>
    <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
    {trend && (
      <div className="flex items-center gap-1 text-emerald-400 text-xs mt-2">
         <span>{trend}</span>
      </div>
    )}
  </div>
);`,
        vue: `<template>
  <div class="p-4 rounded-lg bg-black/40 border border-white/10">
    <div class="text-zinc-500 text-xs uppercase tracking-wider font-mono mb-1">{{ label }}</div>
    <div class="text-3xl font-bold text-white tracking-tight">{{ value }}</div>
    <div v-if="trend" class="flex items-center gap-1 text-emerald-400 text-xs mt-2">
       <span>{{ trend }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps(['label', 'value', 'trend']);
</script>`,
        html: `<div class="p-4 rounded-lg bg-black/40 border border-white/10">
  <div class="text-zinc-500 text-xs uppercase tracking-wider font-mono mb-1">Conexões</div>
  <div class="text-3xl font-bold text-white tracking-tight">4,291</div>
  <div class="flex items-center gap-1 text-emerald-400 text-xs mt-2">
     <span>+12%</span>
  </div>
</div>`
      }
    },
    
    // --- TIPOGRAFIA ---
    {
      id: "glitch-text",
      category: "Tipografia",
      title: "Texto Glitch",
      description: "Texto com efeito de falha cromática ao passar o mouse.",
      icon: <Terminal size={18} />,
      preview: (
        <div className="relative group cursor-default" onMouseEnter={() => handleAction("Efeito Glitch Ativado")}>
          <h1 className="text-4xl font-bold text-white group-hover:animate-pulse">SYSTEM FAILURE</h1>
          <h1 className="absolute top-0 left-0 text-4xl font-bold text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-75">SYSTEM FAILURE</h1>
          <h1 className="absolute top-0 left-0 text-4xl font-bold text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-75">SYSTEM FAILURE</h1>
        </div>
      ),
      codes: {
        react: `export const GlitchText = ({ text }) => (
  <div className="relative group cursor-default inline-block">
    <h1 className="text-4xl font-bold text-white relative z-10">{text}</h1>
    <h1 className="absolute top-0 left-0 text-4xl font-bold text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-75 select-none">{text}</h1>
    <h1 className="absolute top-0 left-0 text-4xl font-bold text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-75 select-none">{text}</h1>
  </div>
);`,
        vue: `<template>
  <div class="relative group cursor-default inline-block">
    <h1 class="text-4xl font-bold text-white relative z-10">{{ text }}</h1>
    <h1 class="absolute top-0 left-0 text-4xl font-bold text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-75 select-none">{{ text }}</h1>
    <h1 class="absolute top-0 left-0 text-4xl font-bold text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-75 select-none">{{ text }}</h1>
  </div>
</template>
<script setup>
defineProps(['text']);
</script>`,
        html: `<div class="relative group cursor-default inline-block">
  <h1 class="text-4xl font-bold text-white relative z-10">ERROR</h1>
  <h1 class="absolute top-0 left-0 text-4xl font-bold text-red-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] group-hover:translate-y-[2px] transition-all duration-75 select-none">ERROR</h1>
  <h1 class="absolute top-0 left-0 text-4xl font-bold text-cyan-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-75 select-none">ERROR</h1>
</div>`
      }
    }
  ];

  // Get unique categories
  const categories = Array.from(new Set(componentsData.map(c => c.category)));
  const activeComponent = componentsData.find(c => c.id === activeTab) || componentsData[0];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      addToast("Navegação", `Movendo para seção: ${id}`);
    }
  };

  const handleCopyApi = async () => {
    const url = getComponentApiUrl(activeComponent.id);
    await copyToClipboard(url);
    addToast("Sucesso", "Endpoint da API copiado para a área de transferência");
  };

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-holo-cyan/30 selection:text-white relative font-sans">
      <Toaster toasts={toasts} removeToast={removeToast} />
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
            <button onClick={() => scrollToSection("features")} className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] bg-transparent border-none cursor-pointer">Recursos</button>
            <button onClick={() => scrollToSection("components")} className="hover:text-white transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] bg-transparent border-none cursor-pointer">Biblioteca</button>
            <button onClick={() => scrollToSection("api-docs")} className="hover:text-white transition-colors bg-transparent border-none cursor-pointer">API Docs</button>
          </nav>

          <div className="flex items-center gap-3">
            {/* Buttons removed as requested */}
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-6 overflow-hidden" id="features">
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
                v3.0 - API Disponível
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-white">
                UI para a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-holo-cyan via-white to-holo-purple animate-shimmer bg-[length:200%_auto]">Próxima Geração</span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                A coleção definitiva de componentes UI futuristas. Prontos para copiar. Integre via API. Zero dependências.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="holo" size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection("components")}>
                  Explorar Biblioteca
                  <Layers className="ml-2 w-4 h-4" />
                </Button>
                <Button variant="ghost" size="lg" className="text-zinc-400 hover:text-white w-full sm:w-auto" onClick={() => scrollToSection("api-docs")}>
                  Documentação da API
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Component Showcase */}
        <section id="components" className="py-12 px-6 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-holo-purple/5 rounded-full blur-[100px] -z-10" />
           
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 md:text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Sistema de Design</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Selecione um componente para visualizar seu código e endpoint de API.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-3 flex flex-col gap-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar pr-2">
                {categories.map(category => (
                  <div key={category}>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2 sticky top-0 bg-black/80 backdrop-blur-sm py-2 z-10">{category}</h4>
                    <div className="space-y-1">
                      {componentsData.filter(c => c.category === category).map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setActiveTab(c.id)}
                          className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left group relative",
                            activeTab === c.id
                              ? "bg-white/10 text-white"
                              : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                          )}
                        >
                          {activeTab === c.id && (
                            <motion.div 
                              layoutId="active-pill"
                              className="absolute left-0 top-2 bottom-2 w-1 bg-holo-cyan rounded-r-full"
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
              </div>

              {/* Main Content Area */}
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
                    {/* Component Header */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                           <span className="px-3 py-1 rounded-full bg-holo-cyan/10 border border-holo-cyan/20 text-xs font-bold text-holo-cyan uppercase tracking-wider">
                             {activeComponent.category}
                           </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white">{activeComponent.title}</h3>
                        <p className="text-zinc-400 leading-relaxed text-lg border-l-2 border-zinc-800 pl-4">
                          {activeComponent.description}
                        </p>
                    </div>

                    {/* Interactive Preview */}
                    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden shadow-2xl ring-1 ring-white/5">
                       <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between bg-white/[0.02]">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                          </div>
                          <span className="text-xs font-mono text-zinc-600 uppercase tracking-wider">Canvas de Renderização</span>
                       </div>
                       <div className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center p-8 md:p-12 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),transparent)]">
                          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
                          
                          {/* The Component */}
                          <div className="relative z-10">
                             {activeComponent.preview}
                          </div>
                       </div>
                    </div>
                    
                    {/* API Section */}
                    <div className="rounded-lg overflow-hidden border border-holo-cyan/20 bg-holo-cyan/5 p-4 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex items-center gap-3 text-holo-cyan">
                            <Globe size={18} />
                            <span className="text-sm font-mono font-semibold">Endpoint API</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 w-full md:w-auto bg-black/40 border border-white/10 rounded px-3 py-2">
                            <span className="text-xs text-zinc-400 font-mono break-all">{getComponentApiUrl(activeComponent.id)}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="shrink-0" onClick={handleCopyApi}>
                            <Copy size={14} className="mr-2" />
                            Copiar URL
                        </Button>
                    </div>

                    {/* Code Snippets */}
                    <CodeBlock 
                        codes={activeComponent.codes} 
                        title={`Source: ${activeComponent.title}`} 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* API Documentation Section */}
        <section id="api-docs" className="py-20 px-6 bg-black/30 border-t border-white/5">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Server className="text-holo-cyan" />
                        Documentação da API
                    </h2>
                    <p className="text-zinc-400">Integre o HoloGraphic diretamente em seus fluxos de automação.</p>
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/50">
                        <h3 className="text-xl font-bold text-white mb-4">Uso Básico</h3>
                        <p className="text-zinc-400 mb-4 text-sm">
                            Para obter os dados de um componente programaticamente, faça uma requisição GET para o endpoint abaixo, substituindo <code className="bg-white/10 px-1 rounded text-white">:component-id</code> pelo ID do componente desejado.
                        </p>
                        <div className="bg-black p-4 rounded-lg border border-white/10 font-mono text-sm text-zinc-300 overflow-x-auto">
                            <span className="text-purple-400">GET</span> <span className="text-green-400">{API_BASE_URL}/:component-id</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                         <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/50">
                            <h4 className="font-bold text-white mb-2">Exemplo de Resposta</h4>
                            <pre className="bg-black p-4 rounded-lg border border-white/10 font-mono text-xs text-zinc-400 overflow-x-auto">
{`{
  "id": "holo-button",
  "name": "Botão Holográfico",
  "version": "1.0.2",
  "frameworks": ["react", "vue", "html"],
  "code": { ... }
}`}
                            </pre>
                         </div>
                         <div className="p-6 rounded-xl border border-white/10 bg-zinc-900/50">
                            <h4 className="font-bold text-white mb-2">IDs Disponíveis</h4>
                            <ul className="space-y-2 text-sm text-zinc-400">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-holo-cyan" /> holo-button</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-holo-cyan" /> neon-input</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-holo-cyan" /> glass-panel</li>
                                <li className="text-xs italic opacity-50 mt-2 ml-4">e muitos outros...</li>
                            </ul>
                         </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Footer */}
        <section className="py-12 px-6 border-t border-white/5 bg-black/50">
           <div className="container mx-auto text-center max-w-2xl">
              <p className="text-zinc-500 text-sm">
                © {new Date().getFullYear()} HoloGraphic UI. Todos os direitos reservados.
                <br />
                Construído para o futuro.
              </p>
           </div>
        </section>
      </main>
    </div>
  );
}
