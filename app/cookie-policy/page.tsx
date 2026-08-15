import { Header } from '@/components/Header';

export default function CookiePolicyPage() {
  return (
    <main>
      <Header />
      <section className="section-shell">
        <div className="container max-w-4xl">
          <span className="badge">Cookie policy</span>
          <h1 className="section-title mt-6">Cookie Policy</h1>
          <div className="mt-8 space-y-5 text-slate-300">
            <p>This website may use cookies and similar tracking technologies to understand website usage, improve performance, and support a better user experience.</p>
            <p>Cookies help us remember preferences, analyze traffic patterns, and optimize content delivery. Users may configure their browsers to manage or block cookies according to their preference.</p>
            <p>By continuing to use our website, you consent to the use of cookies as described in this policy.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
