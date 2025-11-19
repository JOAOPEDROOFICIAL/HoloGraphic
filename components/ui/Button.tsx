import React from "react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "holo";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-white text-black hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.1)]",
      secondary: "bg-zinc-800 text-white hover:bg-zinc-800/80",
      ghost: "hover:bg-zinc-800 hover:text-white",
      holo: "relative bg-black border border-zinc-800 text-white overflow-hidden group hover:border-holo-cyan/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300"
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2",
      lg: "h-12 px-8 text-lg"
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {variant === 'holo' && (
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };