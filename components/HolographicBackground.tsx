import React from 'react';
import { motion } from 'framer-motion';

export const HolographicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
      {/* Deep Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      {/* Moving Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -50, 0],
          opacity: [0.15, 0.25, 0.15] 
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-holo-cyan/20 rounded-full blur-[120px]"
      />
      
      <motion.div 
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 60, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 1 }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-holo-purple/20 rounded-full blur-[128px]"
      />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
    </div>
  );
};