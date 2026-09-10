import React, { useState } from 'react';
import { fallbackCategories } from '../../data/fallbackData';

const categoryMarks = { 'cat-burgers': 'BURGER', 'cat-wraps': 'WRAP', 'cat-corndogs': 'CORN DOG', 'cat-sides': 'SIDES', 'cat-chicken': 'CHICKEN', 'cat-bowls': 'BOWL', 'cat-drinks': 'DRINK' };

export function ProductCard({ item }) {
  const [imageFailed, setImageFailed] = useState(false);
  const category = fallbackCategories.find(cat => cat.id === item.categoryId);
  const isVeg = item.tags.includes('veg');
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-brand-dark/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-brand-violet to-[#2f246e]">
        {item.imageUrl && !imageFailed ? <img src={item.imageUrl} alt={item.name} onError={() => setImageFailed(true)} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" /> : <div className="flex h-full flex-col items-center justify-center px-5 text-center text-white"><span className="font-brand text-4xl font-semibold text-brand-yellow">{categoryMarks[item.categoryId] || 'KATTY’Z'}</span><span className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-white/70">Photo coming soon</span></div>}
        {item.tags.includes('spicy') && <span className="absolute right-3 top-3 rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-dark">Spicy</span>}
      </div>
      <div className="flex flex-grow flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3"><span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${isVeg ? 'text-green-700' : 'text-red-700'}`}><span className={`grid h-4 w-4 place-items-center border ${isVeg ? 'border-green-700' : 'border-red-700'}`}><span className={`h-2 w-2 rounded-full ${isVeg ? 'bg-green-700' : 'bg-red-700'}`}/></span>{isVeg ? 'Veg' : 'Non-veg'}</span><span className="text-xs font-medium text-gray-500">{category?.name}</span></div>
        <h3 className="text-xl font-bold leading-tight">{item.name}</h3>
        {item.description && <p className="mt-2 text-sm text-gray-600">{item.description}</p>}
        <p className="mt-auto pt-5 text-2xl font-bold text-brand-violet">₹{item.price}</p>
      </div>
    </article>
  );
}

