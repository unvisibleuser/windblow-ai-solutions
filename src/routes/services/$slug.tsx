import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { ALL_SERVICES, getService } from "@/lib/services-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — Windblow" }] };
    return {
      meta: [
        { title: `${s.title} — Windblow` },
        { name: "description", content: s.short },
        { property: "og:title", content: `${s.title} — Windblow` },
        { property: "og:description", content: s.short },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-2">Service not found</h1>
        <Link to="/services" className="text-brand">
          Back to all services
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
        <p className="text-sm text-muted-foreground mb-4">{error.message}</p>
        <button onClick={reset} className="text-brand">
          Try again
        </button>
      </div>
    </div>
  ),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = ALL_SERVICES.filter(
    (s) => s.category === service.category && s.slug !== service.slug,
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-60 pointer-events-none" />
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6">
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link to="/services" className="hover:text-foreground">
                Services
              </Link>
              <span>/</span>
              <span className="text-foreground">{service.title}</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-start gap-5"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-brand/20 border border-brand/30 flex items-center justify-center shrink-0">
                <service.icon className="w-8 h-8 text-brand" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-brand mb-2">
                  {service.category}
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold mb-4">{service.title}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">{service.description}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="text-xs uppercase tracking-widest text-brand mb-3">What you get</div>
              <h2 className="text-2xl font-semibold mb-3">Outcomes built for impact</h2>
              <p className="text-sm text-muted-foreground">
                Every engagement is scoped around measurable business outcomes — not deliverables.
              </p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
              {service.benefits.map((b: string) => (
                <div key={b} className="glass rounded-xl p-5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand/15 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-brand" />
                  </div>
                  <div className="text-sm text-foreground/90">{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 border-t border-border">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="text-xs uppercase tracking-widest text-brand mb-3">How we work</div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-10">A proven 4-step process</h2>
            <div className="grid md:grid-cols-4 gap-5">
              {[
                { n: "01", t: "Discovery", d: "Understand goals, systems, and constraints." },
                { n: "02", t: "Design", d: "Architect the solution and success metrics." },
                { n: "03", t: "Build", d: "Implement, test, and integrate into your stack." },
                { n: "04", t: "Scale", d: "Monitor, optimise, and expand over time." },
              ].map((step) => (
                <div key={step.n} className="glass rounded-xl p-5">
                  <div className="text-xs text-brand font-mono mb-2">{step.n}</div>
                  <div className="font-semibold mb-1">{step.t}</div>
                  <div className="text-sm text-muted-foreground">{step.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="py-16 border-t border-border">
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand mb-2">
                    Related services
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold">More in {service.category}</h2>
                </div>
                <Link
                  to="/services"
                  className="text-sm text-brand hover:gap-2 inline-flex items-center gap-1 transition-all"
                >
                  All services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/services/$slug"
                    params={{ slug: r.slug }}
                    className="group glass rounded-2xl p-6 hover:border-brand/40 transition-colors flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-brand/20 border border-brand/30 flex items-center justify-center">
                        <r.icon className="w-5 h-5 text-brand" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-brand transition" />
                    </div>
                    <h3 className="font-semibold mb-1">{r.title}</h3>
                    <p className="text-sm text-muted-foreground">{r.short}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
