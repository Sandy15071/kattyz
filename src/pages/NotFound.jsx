import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

export function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] flex-1 items-center overflow-hidden bg-brand-violet px-5 py-16 text-white md:px-8">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-yellow/15" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full border-[60px] border-white/5" />
      <div className="relative mx-auto grid w-full max-w-[1100px] items-center gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div className="font-brand text-[9rem] font-semibold leading-none text-brand-yellow drop-shadow-[5px_5px_0_rgba(30,27,46,1)] sm:text-[12rem]">404</div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">Wrong turn, right craving</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl">This page has left the menu.</h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">The link may be outdated or the address may have been typed incorrectly. Your next Katty’z favourite is still close by.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-6 py-3.5 font-bold text-brand-dark shadow-hard transition hover:-translate-y-0.5">Browse the menu <ArrowRight size={18}/></Link>
            <Link to="/location" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/20"><MapPin size={18}/> Find an outlet</Link>
            <Link to="/" className="px-4 py-3.5 font-bold text-white underline decoration-white/40 underline-offset-4">Return home</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
