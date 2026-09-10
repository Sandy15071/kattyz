import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OutletPicker } from '../ui/OutletPicker';
import { outlets } from '../../data/outlets';
import { fallbackRestaurantInfo as info } from '../../data/fallbackData';

export function Footer() {
  const [pickerOpen, setPickerOpen] = useState(false);
  return (
    <>
      <footer className="border-t-4 border-brand-yellow bg-brand-dark px-5 pb-6 pt-12 text-white md:px-8">
        <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_.7fr_.7fr_1.6fr]">
          <div><img src="/brand/kattyz-footer-logo.png?v=1" alt="Katty'z" className="mb-4 h-12 w-auto"/><p className="text-lg text-white/80">Big cravings. Sorted.</p><a href={info.instagramUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block font-semibold text-brand-yellow">Follow us on Instagram ↗</a></div>
          <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3"><h2 className="text-xl font-semibold text-brand-yellow">Explore</h2><Link to="/">Home</Link><Link to="/menu">Menu</Link><Link to="/location">Outlets</Link><button type="button" onClick={() => setPickerOpen(true)} className="text-left">Order online</button></nav>
          <nav aria-label="Legal navigation" className="flex flex-col items-start gap-3"><h2 className="text-xl font-semibold text-brand-yellow">Legal</h2><Link to="/privacy-policy">Privacy Policy</Link><Link to="/terms">Terms &amp; Conditions</Link></nav>
          <div><h2 className="mb-4 text-xl font-semibold text-brand-yellow">Our outlets</h2><div className="grid gap-4 sm:grid-cols-3">{outlets.map(outlet => <div key={outlet.id}><Link to={`/location#${outlet.id}`} className="font-bold">{outlet.label}</Link><p className="mt-1 text-sm text-white/65">{outlet.shortAddress}</p><a href={`tel:${outlet.phoneNumber}`} className="mt-1 inline-block text-sm text-brand-yellow">{outlet.displayPhone}</a></div>)}</div></div>
        </div>
        <div className="mx-auto mt-9 max-w-[1400px] border-t border-white/15 pt-5 text-sm text-white/55"><p>© {new Date().getFullYear()} Katty’z. All rights reserved.</p><p className="mt-1">Katty’z and the Katty’z logo are trademarks of their respective owner. Private website concept; menu details and prices are subject to restaurant confirmation.</p></div>
      </footer>
      <OutletPicker open={pickerOpen} onClose={() => setPickerOpen(false)}/>
    </>
  );
}

