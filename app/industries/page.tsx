import { Header } from '@/components/Header';
import { siteConfig } from '@/lib/site-data';
import { CheckCircle2 } from 'lucide-react';

export default function IndustriesPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Industries</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Industries We Serve</h1>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {siteConfig.industries.map((industry) => (
            <div key={industry} className="card-panel p-6 text-center text-slate-200">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-cyan-300">
                <CheckCircle2 size={22} />
              </div>
              <p className="text-lg font-semibold text-white">{industry}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
