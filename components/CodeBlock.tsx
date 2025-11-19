import React, { useState } from 'react';
import { Check, Copy, Terminal, Code2, FileJson } from 'lucide-react';
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

const languageIcons: Record<SupportedLanguage, React.ReactNode> = {
  react: <Code2 size={14} />,
  vue: <Terminal size={14} />,
  html: <FileJson size={14} />
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
        <div className="flex items-center w-full sm:w-auto overflow-x-auto">
          {(Object.keys(codes) as SupportedLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wide transition-colors border-r border-white/5",
                activeLang === lang 
                  ? "bg-white/10 text-holo-cyan font-bold" 
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              )}
            >
              {languageIcons[lang]}
              {languageLabels[lang]}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end w-full sm:w-auto px-4 py-2 gap-3">
          <span className="text-xs text-zinc-600 hidden sm:inline-block">{title || 'Component Source'}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-md hover:bg-white/10"
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <Check size={14} className="text-green-400" />
                  <span>Copiado!</span>
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
                  <span>Copiar Código</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-holo-cyan via-holo-purple to-holo-blue opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        <div className="p-4 overflow-x-auto max-h-[400px] overflow-y-auto custom-scrollbar">
          <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
            <code>{codes[activeLang]}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};