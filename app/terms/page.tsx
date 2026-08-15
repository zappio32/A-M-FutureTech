import { Header } from '@/components/Header';

export default function TermsPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Terms</span>
          <h1 className="section-title mt-6">Terms & Conditions</h1>
          <div className="mt-8 space-y-5 text-slate-300">
            <p>By using this website, you acknowledge that the information published here is for general informational purposes and does not establish a contractual relationship unless explicitly agreed in writing.</p>
            <p>All project proposals, estimates, and statements of work remain subject to mutual agreement, scope confirmation, and commercial terms approved by both parties.</p>
            <p>We reserve the right to update the content, offerings, and policies on this website from time to time without prior notice.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
