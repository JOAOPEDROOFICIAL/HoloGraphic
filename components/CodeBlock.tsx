import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { cn, copyToClipboard } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "tsx", title }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm my-4">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Terminal size={14} />
            <span className="uppercase font-mono">{title || language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-zinc-400 hover:text-white transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Check size={16} className="text-green-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Copy size={16} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-sm text-zinc-300 leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};