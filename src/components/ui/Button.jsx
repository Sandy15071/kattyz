import { motion } from 'motion/react';
import React from 'react';

export function Button({ children, onClick, variant = 'primary', className = '', ...props }) {
  const baseClasses = "relative inline-flex items-center justify-center rounded-full px-8 py-4 font-brand font-bold text-xl transition-colors border-2 border-brand-dark shadow-hard active:shadow-hard-hover active:translate-y-[2px] active:translate-x-[2px]";
  
  const variants = {
    primary: "bg-brand-yellow text-brand-dark hover:bg-yellow-400",
    secondary: "bg-brand-violet text-brand-white hover:bg-indigo-700",
    outline: "bg-transparent border-2 border-brand-dark text-brand-dark hover:bg-gray-100 shadow-none active:translate-y-[0px] active:translate-x-[0px] active:shadow-none",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
