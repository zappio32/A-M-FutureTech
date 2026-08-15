import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronRight, Cloud, Code2, Cpu, Database, Globe, Headphones, LayoutDashboard, MonitorSmartphone, ShieldCheck, Sparkles, Users } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Header } from '@/components/Header';
import { siteConfig } from '@/lib/site-data';
import { ContactForm } from '@/components/ContactForm';
import { QuoteForm } from '@/components/QuoteForm';
import { CareerForm } from '@/components/CareerForm';

const serviceIcons = [Code2, Globe, MonitorSmartphone, LayoutDashboard, Sparkles, Cloud, Database, ShieldCheck, Users, Headphones];

export default function HomePage() {
  return (
    <main>
      <Header />

      <section id="home" className="hero-shell relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-hero-grid bg-[size:22px_22px] opacity-20" />
        <div className="container relative grid min-h-[740px] items-center gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <span className="badge">Digital transformation partner</span>
            <h1 className="mt-8 max-w-xl text-5xl font-black leading-[1.02] tracking-[-0.07em] text-white md:text-6xl">
              Transforming Ideas Into <span className="gradient-text">Powerful Digital Solutions</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A&M FutureTech Solution Pvt Ltd helps businesses grow through innovative software,
              high-performance websites, mobile applications, cloud solutions, and complete IT services.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#contact" className="primary-btn">
                Start Your Project <ArrowRight size={18} />
              </a>
              <a href="#services" className="secondary-btn">
                Explore Our Services
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <div className="hero-stat"><CheckCircle2 className="text-cyan-400" size={16} /> Trusted delivery</div>
              <div className="hero-stat"><CheckCircle2 className="text-cyan-400" size={16} /> Custom solutions</div>
              <div className="hero-stat"><CheckCircle2 className="text-cyan-400" size={16} /> 24/7 support</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -right-8 bottom-6 h-36 w-36 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="premium-surface relative overflow-hidden rounded-[1.6rem] p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_28%)]" />
              <div className="relative space-y-5">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-slate-400">Platform</p>
                    <h3 className="mt-2 text-2xl font-bold text-white">Digital Growth</h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30">
                    <Cpu size={20} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="metric-card rounded-2xl p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-slate-300">Cloud Architecture</span>
                      <Cloud size={18} className="text-cyan-400" />
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400" />
                    </div>
                    <p className="mt-4 text-3xl font-black text-white">82%</p>
                  </div>
                  <div className="metric-card rounded-2xl p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="text-sm text-slate-300">Automation</span>
                      <Database size={18} className="text-violet-400" />
                    </div>
                    <div className="h-2 rounded-full bg-slate-800">
                      <div className="h-2 w-[94%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                    </div>
                    <p className="mt-4 text-3xl font-black text-white">94%</p>
                  </div>
                </div>

                <div className="metric-card rounded-2xl p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-slate-300">Project pipeline</span>
                    <span className="text-[0.65rem] uppercase tracking-[0.2em] text-cyan-300">Live</span>
                  </div>
                  <div className="space-y-3">
                    {['Software Development', 'UI/UX Design', 'Cloud Migration', 'Enterprise Integration'].map((item, index) => (
                      <div key={item} className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/70 p-3 text-sm text-slate-200">
                        <span>{item}</span>
                        <span className="rounded-full bg-blue-500/15 px-2 py-1 text-[0.65rem] font-semibold text-blue-200">{index + 1}/4</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell">
        <div className="container">
          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-5">
              <span className="badge">About us</span>
              <h2 className="section-title">Building the Future Through Technology</h2>
              <p className="section-subtitle">
                A&M FutureTech Solution Pvt Ltd is an IT company focused on delivering reliable, scalable,
                innovative, and customized digital solutions for businesses that want to operate with confidence and grow faster.
              </p>
              <p className="section-subtitle">
                From strategy and UX to development, cloud deployment, and ongoing support, we help clients turn ideas into secure products and digital experiences users trust.
              </p>
              <div className="grid gap-5 pt-3 sm:grid-cols-2">
                {[
                  'Experienced Development Team',
                  'Custom-Built Solutions',
                  'Modern Technologies',
                  'Scalable Architecture',
                  'Quality & Security',
                  'Client-Focused Approach',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-900/40 p-4">
                    <CheckCircle2 className="mt-0.5 text-cyan-400" size={18} />
                    <span className="text-slate-200">{point}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="services" className="section-shell bg-slate-950/40">
        <div className="container">
          <div className="text-center">
            <span className="badge">Our services</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">End-to-end technology services built for growth.</h2>
            <p className="section-subtitle mx-auto mt-4">
              We help businesses modernize operations, improve customer experiences, and unlock digital advantage through carefully designed technology solutions.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {siteConfig.serviceCards.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <article key={service.title} className="group card-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/50">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-violet-500/20 text-blue-300 ring-1 ring-white/10">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                  <p className="mt-4 min-h-[96px] text-slate-300">{service.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-200">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <ChevronRight className="text-blue-300" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-7 inline-flex items-center gap-2 font-semibold text-cyan-300 transition hover:text-white">
                    Learn More <ArrowRight size={16} />
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <div className="text-center">
            <span className="badge">Why choose us</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">Why Choose A&M FutureTech?</h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Innovative Solutions', 'Modern technology tailored to business needs'],
              ['Custom Development', 'Solutions designed specifically for each client'],
              ['Quality First', 'Clean, reliable, tested, and maintainable systems'],
              ['Scalable Technology', 'Applications ready to grow with your business'],
              ['Dedicated Support', 'Reliable technical assistance and maintenance'],
              ['On-Time Delivery', 'Efficient project planning and execution'],
              ['Secure Development', 'Security-focused development practices'],
              ['Transparent Communication', 'Clear updates throughout the project'],
            ].map(([title, desc]) => (
              <div key={title} className="card-panel p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 text-cyan-300">
                  <CheckCircle2 size={22} />
                </div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container">
          <div className="text-center">
            <span className="badge">Process</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">Our Development Process</h2>
          </div>

          <div className="mt-12 space-y-5">
            {[
              'Discover',
              'Plan',
              'Design',
              'Develop',
              'Test',
              'Deploy',
              'Support & Grow',
            ].map((step, index) => (
              <div key={step} className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900/60 p-5 md:grid-cols-[120px_1fr] md:items-center">
                <div className="flex items-center gap-3 text-white">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-black text-white">0{index + 1}</span>
                  <span className="font-semibold">{step}</span>
                </div>
                <p className="text-slate-300">
                  {[
                    'Understand client requirements and business goals.',
                    'Define project scope, technology, architecture, and roadmap.',
                    'Create modern UI/UX, wireframes, and prototypes.',
                    'Build the application using scalable and secure technologies.',
                    'Perform functional, responsive, performance, and security testing.',
                    'Launch the solution into the production environment.',
                    'Provide ongoing maintenance, updates, and enhancements.',
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technologies" className="section-shell">
        <div className="container">
          <div className="text-center">
            <span className="badge">Technologies</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">Modern stacks for modern business needs.</h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 xl:grid-cols-5">
            {[
              ['Frontend', siteConfig.technologies.frontend],
              ['Backend', siteConfig.technologies.backend],
              ['Mobile', siteConfig.technologies.mobile],
              ['Database', siteConfig.technologies.database],
              ['Cloud & DevOps', siteConfig.technologies.cloud],
            ].map(([label, items]) => (
              <div key={label as string} className="card-panel p-6">
                <h3 className="mb-5 text-xl font-bold text-white">{label as string}</h3>
                <div className="flex flex-wrap gap-2">
                  {(items as string[]).map((tech) => (
                    <span key={tech} className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-200">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="solutions" className="section-shell bg-slate-950/40">
        <div className="container">
          <div className="text-center">
            <span className="badge">Business solutions</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">Solutions designed for smarter business operations.</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {siteConfig.solutions.map((solution) => (
              <div key={solution.name} className="card-panel flex h-full flex-col p-6">
                <h3 className="text-2xl font-bold text-white">{solution.name}</h3>
                <p className="mt-4 text-slate-300">{solution.overview}</p>
                <div className="mt-6 space-y-3 text-sm text-slate-200">
                  <div><span className="font-semibold text-white">Features:</span> {solution.features.join(', ')}</div>
                  <div><span className="font-semibold text-white">Benefits:</span> {solution.benefits.join(', ')}</div>
                  <div><span className="font-semibold text-white">Industries:</span> {solution.industries.join(', ')}</div>
                </div>
                <a href="#contact" className="mt-6 inline-flex items-center gap-2 font-semibold text-cyan-300">
                  Request a Demo <ArrowRight size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="section-shell">
        <div className="container">
          <div className="text-center">
            <span className="badge">Industries</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">Industries We Serve</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {siteConfig.industries.map((industry) => (
              <div key={industry} className="card-panel p-6 text-center text-slate-200">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 text-cyan-300">
                  <CheckCircle2 size={22} />
                </div>
                <p className="text-lg font-semibold text-white">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-shell bg-slate-950/40">
        <div className="container">
          <div className="text-center">
            <span className="badge">Portfolio</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">Our Work</h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['Software Development', 'Web Development', 'Mobile Applications', 'ERP Solutions', 'E-Commerce'].map((filter) => (
              <button key={filter} className="rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200 transition hover:border-blue-500 hover:text-blue-200">
                {filter}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {siteConfig.portfolio.map((project) => (
              <article key={project.title} className="card-panel overflow-hidden">
                <div className="h-56 w-full bg-gradient-to-br from-blue-500/50 via-slate-900 to-violet-500/40" />
                <div className="p-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-300">{project.category}</span>
                  <h3 className="mt-3 text-2xl font-bold text-white">{project.title}</h3>
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
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="container">
          <div className="mb-12 text-center">
            <span className="badge">Contact</span>
            <h2 className="section-title mx-auto mt-6 max-w-3xl">Let’s build your next digital success story.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="card-panel p-8">
              <h3 className="text-2xl font-bold text-white">A&M FutureTech Solution Pvt Ltd</h3>
              <p className="mt-5 text-slate-300">
                Email: <a href="mailto:info@amfuturetech.com" className="text-cyan-300">info@amfuturetech.com</a>
              </p>
              <div className="mt-8 space-y-4 text-slate-300">
                <div><span className="font-semibold text-white">Company:</span> A&M FutureTech Solution Pvt Ltd</div>
                <div><span className="font-semibold text-white">Email:</span> <a href="mailto:info@amfuturetech.com" className="text-cyan-300">info@amfuturetech.com</a></div>
                <div><span className="font-semibold text-white">Focus:</span> Software Development, Web, Mobile, Cloud & IT Services</div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      <section className="section-shell bg-slate-950/40">
        <div className="container">
          <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-600/10 via-slate-900/80 to-violet-500/10 p-8 md:p-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="badge">Consultation</span>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.06em] text-white md:text-5xl">Have an Idea? Let’s Build It Together.</h2>
                <p className="mt-4 max-w-2xl text-lg text-slate-300">
                  Tell us about your project, and our technology experts will help transform your idea into a powerful digital solution.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="primary-btn">Get Free Consultation</a>
                <a href="#contact" className="secondary-btn">Request a Quote</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quote" className="section-shell bg-slate-950/20">
        <div className="container grid gap-8 lg:grid-cols-2">
          <div>
            <span className="badge">Quote request</span>
            <h3 className="mt-6 text-3xl font-bold text-white">Tell us what you need</h3>
            <p className="mt-4 text-slate-300">Share a few details about your project and we will help you identify the best approach.</p>
            <QuoteForm />
          </div>
          <div>
            <span className="badge">Careers</span>
            <h3 className="mt-6 text-3xl font-bold text-white">Apply for a role</h3>
            <p className="mt-4 text-slate-300">We are looking for talented people who want to shape the future of digital experiences.</p>
            <CareerForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="container py-16">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <Logo />
              <p className="mt-5 max-w-md text-slate-300">
                We build secure, scalable, high-performance digital products for businesses ready to grow with modern technology.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Company</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li><a href="/about">About Us</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/portfolio">Portfolio</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Services</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>Software Development</li>
                <li>Web Development</li>
                <li>Mobile App Development</li>
                <li>UI/UX Design</li>
                <li>Cloud Solutions</li>
                <li>IT Consulting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Contact</h3>
              <ul className="mt-4 space-y-3 text-slate-300">
                <li>A&M FutureTech Solution Pvt Ltd</li>
                <li><a href="mailto:info@amfuturetech.com" className="text-cyan-300">info@amfuturetech.com</a></li>
              </ul>
              <div className="mt-5 flex gap-3 text-white">
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
                  { label: 'Facebook', href: 'https://www.facebook.com' },
                  { label: 'Instagram', href: 'https://www.instagram.com' },
                  { label: 'X', href: 'https://x.com' },
                  { label: 'YouTube', href: 'https://www.youtube.com' },
                ].map((platform) => (
                  <a key={platform.label} href={platform.href} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-xs font-bold">{platform.label[0]}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-4">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms">Terms & Conditions</a>
              <a href="/cookie-policy">Cookie Policy</a>
            </div>
            <div>© 2026 A&M FutureTech Solution Pvt Ltd. All Rights Reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
