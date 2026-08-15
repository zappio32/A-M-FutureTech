import { Header } from '@/components/Header';
import { siteConfig } from '@/lib/site-data';
import { ArrowRight } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Portfolio</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Selected work that reflects measurable business impact.</h1>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteConfig.portfolio.map((project) => (
            <article key={project.title} className="card-panel overflow-hidden">
              <div className="h-52 w-full bg-gradient-to-br from-blue-500/40 via-slate-900 to-violet-500/30" />
              <div className="p-6">
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">{project.category}</span>
                <h2 className="mt-3 text-2xl font-bold text-white">{project.title}</h2>
                <p className="mt-3 text-slate-300">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-200">{tech}</span>
                  ))}
                </div>
                <button className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
