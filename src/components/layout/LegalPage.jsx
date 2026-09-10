import React from 'react';
import { Link } from 'react-router-dom';

export function LegalPage({ eyebrow, title, updated, children }) {
  return (
    <main className="min-w-0 flex-1 bg-brand-white">
      <header className="bg-[#f2efff] px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-violet">{eyebrow}</p>
          <h1 className="mt-2 text-4xl font-semibold md:text-6xl">{title}</h1>
          <p className="mt-3 text-gray-600">Last updated: {updated}</p>
        </div>
      </header>
      <div className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14">
        <div className="legal-copy">{children}</div>
        <Link to="/" className="mt-10 inline-flex rounded-full bg-brand-violet px-5 py-3 font-bold text-white">Return home</Link>
      </div>
    </main>
  );
}
