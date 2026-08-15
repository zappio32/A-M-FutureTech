import { Header } from '@/components/Header';
import { siteConfig } from '@/lib/site-data';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Our services</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Technology solutions built for modern businesses.</h1>
          <p className="section-subtitle mx-auto mt-4 max-w-3xl">
            We provide strategy, software engineering, cloud adoption, and support services that help businesses streamline operations and grow with confidence.
          </p>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {siteConfig.serviceCards.map((service) => (
            <article key={service.title} className="card-panel p-6">
              <h2 className="text-2xl font-bold text-white">{service.title}</h2>
              <p className="mt-4 text-slate-300">{service.description}</p>
              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                {service.features.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-center gap-2"><ChevronRight size={14} className="text-blue-300" /> {feature}</li>
                ))}
              </ul>
              <a href="/#contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                Learn More <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
