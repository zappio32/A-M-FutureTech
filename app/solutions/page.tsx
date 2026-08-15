import { Header } from '@/components/Header';
import { siteConfig } from '@/lib/site-data';
import { ArrowRight } from 'lucide-react';

export default function SolutionsPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Business solutions</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Solutions designed for sharper operations and stronger growth.</h1>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteConfig.solutions.map((solution) => (
            <div key={solution.name} className="card-panel p-6">
              <h2 className="text-2xl font-bold text-white">{solution.name}</h2>
              <p className="mt-4 text-slate-300">{solution.overview}</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div><span className="font-semibold text-white">Features:</span> {solution.features.join(', ')}</div>
                <div><span className="font-semibold text-white">Benefits:</span> {solution.benefits.join(', ')}</div>
              </div>
              <a href="/#contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                Request a Demo <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
