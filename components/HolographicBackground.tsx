import React from 'react';
import { motion } from 'framer-motion';

export const HolographicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black" />
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-holo-cyan/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 60, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-holo-purple/10 rounded-full blur-3xl"
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
    </div>
  );
};