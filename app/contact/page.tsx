import { Header } from '@/components/Header';
import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container text-center">
          <span className="badge">Contact</span>
          <h1 className="section-title mx-auto mt-6 max-w-4xl">Let’s build your next digital success story.</h1>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
          <div className="card-panel p-8">
            <h2 className="text-2xl font-bold text-white">A&M FutureTech Solution Pvt Ltd</h2>
            <p className="mt-5 text-slate-300">Email: <a href="mailto:info@amfuturetech.com" className="text-cyan-300">info@amfuturetech.com</a></p>
            <div className="mt-8 space-y-4 text-slate-300">
              <div><span className="font-semibold text-white">Company:</span> A&M FutureTech Solution Pvt Ltd</div>
              <div><span className="font-semibold text-white">Email:</span> <a href="mailto:info@amfuturetech.com" className="text-cyan-300">info@amfuturetech.com</a></div>
              <div><span className="font-semibold text-white">Focus:</span> Software Development, Web, Mobile, Cloud & IT Services</div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
