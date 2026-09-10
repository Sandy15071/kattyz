import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';
import { OutletPicker } from '../components/ui/OutletPicker';
import { fallbackMenuItems, fallbackCategories } from '../data/fallbackData';
import { PageMeta } from '../components/ui/PageMeta';

export function Home() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const featured = ['kz-7', 'kz-24', 'kz-39'].map(id => fallbackMenuItems.find(item => item.id === id));
  const hero = featured[0];
  return (
    <main className="min-w-0 flex-1 bg-brand-white">
      <PageMeta title="Katty’z | Burgers, Wraps & Crispy Favourites" description="Explore Katty’z burgers, wraps, Korean corn dogs and crispy favourites. Choose an outlet in Thane or Navi Mumbai and order online." noIndex />
      <section className="overflow-hidden bg-brand-violet text-white">
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-10 md:px-8 md:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative z-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-brand-yellow"><MapPin size={15}/> 3 outlets · Thane & Navi Mumbai</p>
            <h1 className="mt-6 text-[3rem] font-semibold leading-[0.98] tracking-tight text-brand-yellow sm:text-6xl lg:text-[5.3rem]">Big cravings.<br/><span className="text-white">Sorted.</span></h1>
            <p className="mt-5 max-w-lg text-lg text-white/80 md:text-xl">Burgers, loaded wraps and crispy favourites made for serious hunger.</p>
            <div className="mt-8 flex flex-wrap gap-3"><button type="button" onClick={() => setPickerOpen(true)} className="rounded-full bg-brand-yellow px-6 py-3.5 font-bold text-brand-dark shadow-hard transition hover:-translate-y-0.5">Order now</button><Link to="/menu" className="rounded-full border border-white/35 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/20">Explore the menu</Link></div>
          </div>
          <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-brand-dark shadow-2xl md:min-h-[480px]">
            <img src={hero.imageUrl} alt={hero.name} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/5 to-transparent"/>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-yellow">Katty’z favourite</p><h2 className="mt-1 text-3xl font-semibold text-white md:text-4xl">{hero.name}</h2></div><span className="shrink-0 rounded-full bg-white px-4 py-2 text-lg font-bold text-brand-violet">₹{hero.price}</span></div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1400px] px-5 py-14 md:px-8 md:py-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-violet">Fan favourites</p><h2 className="mt-2 text-3xl font-semibold md:text-5xl">Start with something delicious</h2></div><Link to="/menu" className="inline-flex items-center gap-2 font-bold text-brand-violet">See the full menu <ArrowRight size={19}/></Link></div>
        <div className="grid gap-6 md:grid-cols-3">{featured.map(item => <ProductCard key={item.id} item={item}/>)}</div>
        <p className="mt-5 text-sm text-gray-500">Indicative prices. Confirm current prices and availability when ordering.</p>
      </section>
      <section className="bg-[#f2efff] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1400px]"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-violet">Browse the menu</p><h2 className="mt-2 text-3xl font-semibold md:text-5xl">Pick your craving</h2><div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-7">{fallbackCategories.map((category, index) => <Link key={category.id} to={`/menu?category=${category.id}`} className={`group flex min-h-36 flex-col justify-between rounded-3xl p-5 transition hover:-translate-y-1 ${index === 2 ? 'bg-brand-yellow text-brand-dark' : 'bg-white text-brand-dark shadow-soft'}`}><span className="text-lg font-bold leading-tight">{category.name}</span><ArrowRight className="text-brand-violet transition group-hover:translate-x-1" size={22}/></Link>)}</div></div>
      </section>
      <section className="bg-brand-yellow px-5 py-12 md:px-8"><div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6"><div><h2 className="text-3xl font-semibold">Three neighbourhoods. One big craving.</h2><p className="mt-2 text-brand-dark/75">Find Katty’z in Hiranandani Estate, Vasant Vihar and Kharghar.</p></div><div className="flex flex-wrap gap-3"><button type="button" onClick={() => setPickerOpen(true)} className="rounded-full bg-brand-violet px-6 py-3 font-bold text-white">Order now</button><Link to="/location" className="rounded-full bg-white px-6 py-3 font-bold text-brand-dark">View outlets</Link></div></div></section>
      <OutletPicker open={pickerOpen} onClose={() => setPickerOpen(false)}/>
    </main>
  );
}

