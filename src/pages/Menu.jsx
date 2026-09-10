import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fallbackMenuItems, fallbackCategories } from '../data/fallbackData';
import { ProductCard } from '../components/ui/ProductCard';
import { OutletPicker } from '../components/ui/OutletPicker';

export function Menu() {
  const [params, setParams] = useSearchParams();
  const [dietFilter, setDietFilter] = useState('all');
  const [pickerOpen, setPickerOpen] = useState(false);
  const requested = params.get('category');
  const activeCategory = fallbackCategories.some(cat => cat.id === requested) ? requested : fallbackCategories[0].id;
  const categoryStrip = useRef(null);
  useEffect(() => {
    const selected = categoryStrip.current?.querySelector('[aria-pressed="true"]');
    selected?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [activeCategory]);
  const category = fallbackCategories.find(cat => cat.id === activeCategory);
  const items = fallbackMenuItems
    .filter(item => item.categoryId === activeCategory && (dietFilter === 'all' || (dietFilter === 'veg' ? item.tags.includes('veg') : !item.tags.includes('veg'))))
    .sort((a, b) => {
      if (activeCategory === 'cat-burgers') {
        const vegDifference = Number(!a.tags.includes('veg')) - Number(!b.tags.includes('veg'));
        if (vegDifference !== 0) return vegDifference;
      }

      const photoDifference = Number(!a.imageUrl) - Number(!b.imageUrl);
      if (photoDifference !== 0) return photoDifference;

      return a.sortOrder - b.sortOrder;
    });
  return (
    <main className="min-w-0 flex-1 bg-brand-white pb-16">
      <header className="bg-brand-violet px-5 py-10 text-white md:px-8 md:py-14"><div className="mx-auto max-w-[1400px]"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-yellow">Burgers · wraps · crispy favourites</p><h1 className="mt-2 text-5xl font-semibold md:text-7xl">Our menu</h1><p className="mt-3 max-w-xl text-lg text-white/75">Pick a favourite, choose your nearest outlet and order on Zomato.</p></div></header>
      <div className="mx-auto max-w-[1400px] min-w-0 px-4 md:px-8">
        <div className="sticky top-[72px] z-40 -mx-4 mb-7 border-b border-brand-dark/10 bg-brand-white/95 px-4 py-3 backdrop-blur-md md:top-20 md:mx-0 md:px-0">
          <nav ref={categoryStrip} aria-label="Menu categories" className="flex max-w-full gap-2 overflow-x-auto pb-1">{fallbackCategories.map(cat => <button key={cat.id} type="button" aria-pressed={cat.id === activeCategory} onClick={() => setParams({ category: cat.id })} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${cat.id === activeCategory ? 'bg-brand-yellow text-brand-dark' : 'border border-brand-dark/10 bg-white hover:border-brand-violet'}`}>{cat.name}</button>)}</nav>
        </div>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-3xl font-semibold">{category.name}</h2><p aria-live="polite" className="mt-1 text-sm text-gray-500">{items.length} items · indicative prices</p></div><div role="group" aria-label="Diet preference" className="flex gap-2">{[['all','All'],['veg','Veg'],['non-veg','Non-veg']].map(([value,label]) => <button key={value} type="button" aria-pressed={dietFilter === value} onClick={() => setDietFilter(value)} className={`rounded-full px-4 py-2 text-sm font-semibold ${dietFilter === value ? 'bg-brand-violet text-white' : 'border border-brand-dark/15 bg-white'}`}>{label}</button>)}</div></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map(item => <ProductCard key={item.id} item={item}/>)}</div>
        {items.length === 0 && <div className="py-16 text-center"><h3 className="text-2xl font-semibold">No matching items</h3><button type="button" onClick={() => setDietFilter('all')} className="mt-4 font-bold text-brand-violet underline">Show all options</button></div>}
        <section className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-3xl bg-brand-yellow p-6 md:p-8"><div><h2 className="text-2xl font-semibold">Ready to order?</h2><p className="mt-1 text-brand-dark/70">Choose the outlet nearest to you.</p></div><button type="button" onClick={() => setPickerOpen(true)} className="rounded-full bg-brand-violet px-6 py-3 font-bold text-white">Choose outlet</button></section>
      </div>
      <OutletPicker open={pickerOpen} onClose={() => setPickerOpen(false)}/>
    </main>
  );
}

