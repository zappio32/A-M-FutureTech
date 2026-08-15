import { Header } from '@/components/Header';
import { siteConfig } from '@/lib/site-data';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container max-w-5xl">
          <span className="badge">About us</span>
          <h1 className="section-title mt-6">Building the Future Through Technology</h1>
          <p className="section-subtitle mt-4">
            A&M FutureTech Solution Pvt Ltd is an IT company focused on delivering reliable, scalable,
            innovative, and customized digital solutions for businesses that want to operate with confidence and grow faster.
          </p>
          <p className="section-subtitle mt-4">
            We support organizations with strategy, design, engineering, cloud deployment, and ongoing support to turn ideas into secure, measurable digital outcomes.
          </p>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            'Experienced Development Team',
            'Custom-Built Solutions',
            'Modern Technologies',
            'Scalable Architecture',
            'Quality & Security',
            'Client-Focused Approach',
          ].map((point) => (
            <div key={point} className="card-panel p-6">
              <CheckCircle2 className="mb-4 text-cyan-400" size={24} />
              <h3 className="text-xl font-bold text-white">{point}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="container grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.stats.map((stat, index) => (
            <div key={stat.label} className="card-panel p-6">
              <div className="text-4xl font-black text-white">
                {stat.value}
                <span className="text-xl text-cyan-300">{stat.suffix}</span>
              </div>
              <p className="mt-3 text-slate-300">{stat.label}</p>
              <div className="mt-5 h-1.5 rounded-full bg-slate-800">
                <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" style={{ width: `${60 + index * 8}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
