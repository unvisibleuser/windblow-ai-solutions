import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Windblow AI Automation Agency" },
      {
        name: "description",
        content:
          "Explore Windblow's full catalogue of AI automation, technology, marketing, and business solutions designed to scale your operations.",
      },
      { property: "og:title", content: "Services — Windblow" },
      {
        property: "og:description",
        content:
          "30+ specialised services across AI & automation, websites & technology, marketing & growth, and business solutions.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-widest text-brand mb-3">Our Services</div>
            <h1 className="text-4xl md:text-6xl font-semibold mb-5">
              Solutions to <span className="text-gradient">automate, optimize, and grow</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore specialised services designed to give your business time back — across AI,
              technology, marketing, and operations.
            </p>
          </div>

          {SERVICE_CATEGORIES.map((cat, ci) => (
            <section key={cat.key} className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-brand/20 border border-brand/30 flex items-center justify-center">
                  <cat.icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold">{cat.label}</h2>
                  <p className="text-sm text-muted-foreground">{cat.blurb}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.services.map((s, i) => (
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: (i % 3) * 0.05 + ci * 0.02 }}
                  >
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group relative flex flex-col h-full glass rounded-2xl p-6 hover:border-brand/40 transition-colors overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-[0.05] rounded-2xl transition-opacity" />
                      <div className="flex items-start justify-between mb-4 relative">
                        <div className="w-11 h-11 rounded-xl bg-gradient-brand/20 border border-brand/30 flex items-center justify-center">
                          <s.icon className="w-5 h-5 text-brand" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-brand transition" />
                      </div>
                      <h3 className="text-base font-semibold mb-1.5 relative">{s.title}</h3>
                      <p className="text-sm text-muted-foreground relative">{s.short}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
