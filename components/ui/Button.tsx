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
    const baseStyles = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95";
    
    const variants = {
      primary: "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] border border-transparent",
      secondary: "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700",
      ghost: "hover:bg-white/5 hover:text-white text-zinc-400",
      holo: "relative bg-black border border-zinc-800 text-white overflow-hidden group hover:border-holo-cyan/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500"
    };

    const sizes = {
      sm: "h-9 px-3 text-xs",
      md: "h-11 px-6 py-2",
      lg: "h-14 px-8 text-base"
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {variant === 'holo' && (
          <>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 ring-1 ring-inset ring-holo-cyan/30" />
          </>
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button };