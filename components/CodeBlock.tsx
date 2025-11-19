import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn, copyToClipboard } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export type SupportedLanguage = 'react' | 'vue' | 'html';

interface CodeBlockProps {
  codes: Record<SupportedLanguage, string>;
  title?: string;
}

const languageLabels: Record<SupportedLanguage, string> = {
  react: 'React / TSX',
  vue: 'Vue.js 3',
  html: 'HTML / Tailwind'
};

// Using official SVG logos via CDN for high-level professional look
const languageIcons: Record<SupportedLanguage, React.ReactNode> = {
  react: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="w-4 h-4 object-contain" />,
  vue: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" alt="Vue" className="w-4 h-4 object-contain" />,
  html: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" className="w-4 h-4 object-contain" />
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ codes, title }) => {
  const [activeLang, setActiveLang] = useState<SupportedLanguage>('react');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(codes[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm my-4 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/5 border-b border-white/5">
        {/* Language Tabs */}
        <div className="flex items-center w-full sm:w-auto overflow-x-auto no-scrollbar">
          {(Object.keys(codes) as SupportedLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wide transition-colors border-r border-white/5 min-w-fit",
                activeLang === lang 
                  ? "bg-white/10 text-white font-bold" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              )}
            >
              <span className={cn("transition-transform duration-300", activeLang === lang ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" : "grayscale opacity-70")}>
                {languageIcons[lang]}
              </span>
              {languageLabels[lang]}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end w-full sm:w-auto px-4 py-2 gap-3">
          <span className="text-xs text-zinc-600 hidden sm:inline-block font-mono">{title || 'SOURCE_CODE'}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-md hover:bg-white/10 border border-white/5 hover:border-white/20"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2 text-green-400"
                >
                  <Check size={14} />
                  <span className="font-bold">COPIADO</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Copy size={14} />
                  <span>COPIAR</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-holo-cyan via-holo-purple to-holo-blue opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="p-4 overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar bg-[#09090b]">
          <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
            <code>{codes[activeLang]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};