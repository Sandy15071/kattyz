import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu as MenuIcon, X } from 'lucide-react';
import { OutletPicker } from '../ui/OutletPicker';

export function Header() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navClass = ({ isActive }) => `rounded-full px-4 py-2 font-semibold transition-colors ${isActive ? 'bg-brand-yellow text-brand-dark' : 'hover:bg-brand-violet/10'}`;
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-brand-dark/10 bg-white/95 backdrop-blur-lg">
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-3 px-4 md:h-20 md:px-8">
          <Link to="/" aria-label="Katty'z home" className="shrink-0"><img src="/brand/kattyz-logo-transparent.png?v=4" alt="Katty'z" className="h-9 w-auto md:h-12" /></Link>
          <nav aria-label="Main navigation" className="hidden gap-2 text-base md:flex"><NavLink to="/" end className={navClass}>Home</NavLink><NavLink to="/menu" className={navClass}>Menu</NavLink><NavLink to="/location" className={navClass}>Outlets</NavLink></nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setPickerOpen(true)} className="rounded-full bg-brand-violet px-4 py-2.5 text-sm font-bold text-white shadow-hard transition hover:-translate-y-0.5 md:px-5 md:text-base">Order now</button>
            <button type="button" onClick={() => setMobileOpen(value => !value)} className="rounded-full border border-brand-dark/15 p-2.5 md:hidden" aria-expanded={mobileOpen} aria-label="Toggle navigation">{mobileOpen ? <X size={21}/> : <MenuIcon size={21}/>}</button>
          </div>
        </div>
        {mobileOpen && <nav aria-label="Mobile navigation" className="grid grid-cols-3 gap-2 border-t border-brand-dark/10 px-3 py-2 text-center text-sm md:hidden"><NavLink onClick={() => setMobileOpen(false)} to="/" end className={navClass}>Home</NavLink><NavLink onClick={() => setMobileOpen(false)} to="/menu" className={navClass}>Menu</NavLink><NavLink onClick={() => setMobileOpen(false)} to="/location" className={navClass}>Outlets</NavLink></nav>}
      </header>
      <OutletPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </>
  );
}

