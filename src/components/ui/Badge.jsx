import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: "bg-brand-violet text-brand-white",
    yellow: "bg-brand-yellow text-brand-dark",
    red: "bg-red-600 text-white",
    green: "bg-green-600 text-white",
  };

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-brand font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
