import React, { useEffect } from 'react';
import { MapPin, X, ExternalLink } from 'lucide-react';
import { outlets } from '../../data/outlets';

export function OutletPicker({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = event => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-brand-dark/70 p-4 backdrop-blur-sm" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="outlet-picker-title" className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div><p className="font-ui text-sm font-bold uppercase tracking-[0.16em] text-brand-violet">Order online</p><h2 id="outlet-picker-title" className="font-brand mt-1 text-3xl font-semibold">Choose your outlet</h2><p className="mt-2 text-gray-600">We’ll take you to the correct Zomato menu.</p></div>
          <button autoFocus type="button" onClick={onClose} className="rounded-full bg-gray-100 p-2 hover:bg-gray-200" aria-label="Close outlet selector"><X size={22}/></button>
        </div>
        <div className="mt-6 grid gap-3">
          {outlets.map(outlet => <a key={outlet.id} href={outlet.zomatoUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-brand-dark/15 p-4 transition hover:border-brand-violet hover:bg-brand-violet/[0.04]">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-yellow"><MapPin size={21}/></span>
            <span className="min-w-0 flex-1"><strong className="block text-lg">{outlet.label}</strong><span className="block truncate text-sm text-gray-600">{outlet.shortAddress}</span></span><ExternalLink className="text-brand-violet transition group-hover:translate-x-0.5" size={19}/>
          </a>)}
        </div>
      </section>
    </div>
  );
}
