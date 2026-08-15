import { Header } from '@/components/Header';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Privacy policy</span>
          <h1 className="section-title mt-6">Privacy Policy</h1>
          <div className="mt-8 space-y-5 text-slate-300">
            <p>We respect the privacy of every visitor and business contact. Information provided through our website may be used to respond to enquiries, improve our services, and manage communication securely.</p>
            <p>We use reasonable safeguards to protect personal data and only share it when legally required or when necessary to fulfill a business request.</p>
            <p>Users may contact us to request updates, correction of personal information, or removal from marketing communication lists.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
