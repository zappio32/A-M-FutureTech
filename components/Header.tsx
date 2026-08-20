'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/Logo';
import { siteConfig } from '@/lib/site-data';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/55">
      <div className="container flex items-center justify-between py-3.5">
        <Link href="/" aria-label="A&M FutureTech home" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-200 lg:flex">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-1 py-1.5 text-slate-200 transition duration-200 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gradient-to-r after:from-blue-400 after:to-cyan-300 after:transition-all after:duration-200 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a href="/#quote" className="secondary-btn !px-5 !py-3 !text-sm">
            Get a Quote
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((state) => !state)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-lg shadow-slate-950/30 transition hover:border-blue-400/40 hover:bg-slate-900/90 lg:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-white/10 bg-slate-950/90 transition-all duration-300 ease-out lg:hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <nav className="container flex flex-col gap-2 py-4 text-sm text-slate-100">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-xl px-3 py-3 transition hover:bg-white/5 hover:text-blue-200"
            >
              {item.label}
            </a>
          ))}
          <a href="/#quote" onClick={() => setMobileOpen(false)} className="primary-btn mt-2 !w-full">
            Get a Quote
          </a>
        </nav>
      </div>
    </header>
  );
}
