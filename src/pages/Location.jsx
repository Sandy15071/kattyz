import React, { useState } from 'react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';
import { outlets } from '../data/outlets';
import { PageMeta } from '../components/ui/PageMeta';

function LocationCard({ outlet }) {
  const [photoFailed, setPhotoFailed] = useState(false);
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${outlet.lat},${outlet.lng}`;
  return (
    <section id={outlet.id} aria-labelledby={`${outlet.id}-title`} className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-brand-dark/10 bg-white shadow-soft">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col p-6 md:p-9">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-violet">Katty’z outlet</p>
          <h2 id={`${outlet.id}-title`} className="mt-2 text-3xl font-semibold md:text-4xl">{outlet.label}</h2>
          <div className="mt-7 grid gap-5">
            <div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-brand-violet" size={20}/><div><p className="text-xs font-bold uppercase tracking-wider text-gray-500">Address</p><p className="mt-1 text-lg">{outlet.address}</p></div></div>
            <div className="flex gap-3"><Phone className="mt-1 shrink-0 text-brand-violet" size={20}/><div><p className="text-xs font-bold uppercase tracking-wider text-gray-500">Call to order</p><a href={`tel:${outlet.phoneNumber}`} className="mt-1 block text-lg font-bold text-brand-violet">{outlet.displayPhone}</a>{outlet.secondaryPhone && <a href={`tel:${outlet.secondaryPhone}`} className="block text-brand-violet">+91 22 2531 6277</a>}</div></div>
          </div>
          <p className="mt-5 text-sm text-gray-500">{outlet.hoursNote}</p>
          <div className="mt-7 flex flex-wrap gap-3"><a href={outlet.zomatoUrl} target="_blank" rel="noreferrer" className="rounded-full bg-brand-violet px-5 py-3 font-bold text-white">Order on Zomato</a><a href={directions} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-5 py-3 font-bold text-brand-dark">Get directions <ExternalLink size={16}/></a></div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-brand-dark/10"><iframe title={`Google Maps: Katty’z ${outlet.label}`} src={outlet.mapEmbedUrl} className="block h-56 w-full border-0 bg-gray-100" loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/></div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden bg-brand-violet lg:min-h-full">
          {photoFailed ? <div className="flex h-full min-h-[420px] items-center justify-center p-8 text-center"><a href={outlet.mapsListingUrl} target="_blank" rel="noreferrer" className="font-bold text-brand-yellow">See outlet photos on Google Maps ↗</a></div> : <a href={outlet.mapsListingUrl} target="_blank" rel="noreferrer" className="absolute inset-0"><img src={outlet.outletPhotoUrl} alt={outlet.photoAlt} className="h-full w-full object-cover object-top" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setPhotoFailed(true)}/></a>}
        </div>
      </div>
    </section>
  );
}

export function Location() {
  return (
    <main className="min-w-0 flex-1 bg-brand-white">
      <PageMeta title="Katty’z Outlets | Thane & Kharghar Directions" description="Find Katty’z outlets in Hiranandani Estate, Vasant Vihar and Kharghar. Get directions, contact details and outlet-specific ordering links." noIndex />
      <header className="bg-[#f2efff] px-5 py-10 md:px-8 md:py-14"><div className="mx-auto max-w-[1400px]"><p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-violet">Thane & Navi Mumbai</p><h1 className="mt-2 text-5xl font-semibold md:text-7xl">Find your Katty’z</h1><p className="mt-3 max-w-xl text-lg text-gray-600">Choose an outlet for directions, contact details and online ordering.</p></div></header>
      <div className="mx-auto max-w-[1400px] space-y-10 px-4 py-10 md:px-8 md:py-16">{outlets.map(outlet => <LocationCard key={outlet.id} outlet={outlet}/>)}</div>
    </main>
  );
}

