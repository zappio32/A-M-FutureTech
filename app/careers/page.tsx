import { Header } from '@/components/Header';
import { siteConfig } from '@/lib/site-data';
import { CheckCircle2 } from 'lucide-react';
import { CareerForm } from '@/components/CareerForm';

export default function CareersPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Careers</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Join our growing team.</h1>
          <p className="section-subtitle mx-auto mt-4 max-w-3xl">
            We are building a team of problem solvers, designers, engineers, and strategists who want to create meaningful digital experiences.
          </p>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container grid gap-6">
          {siteConfig.careers.map((job) => (
            <div key={job.title} className="card-panel p-6">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{job.title}</h2>
                  <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
                    <span>{job.department}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    <span>•</span>
                    <span>{job.experience}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <a href="#apply" className="primary-btn">Apply Now</a>
              </div>
              <p className="mt-5 text-slate-300">{job.description}</p>
              <ul className="mt-5 space-y-2 text-slate-300">
                {job.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-cyan-400" /> {req}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="apply" className="section-shell">
        <div className="container max-w-4xl">
          <h2 className="section-title">Apply now</h2>
          <CareerForm />
        </div>
      </section>
    </main>
  );
}
