import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      className="pointer-events-auto min-w-[300px] bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-xl flex items-start gap-3 relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-holo-cyan/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="text-holo-cyan mt-0.5">
        <CheckCircle2 size={18} />
      </div>
      <div className="flex-1 relative z-10">
        <h4 className="text-sm font-semibold text-white">{toast.title}</h4>
        {toast.description && (
          <p className="text-xs text-zinc-400 mt-1">{toast.description}</p>
        )}
      </div>
    </motion.div>
  );
};

export const Toaster: React.FC<ToastProps> = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};