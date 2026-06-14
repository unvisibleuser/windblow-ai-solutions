import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HOMEPAGE_SERVICE_SLUGS, getService } from "@/lib/services-data";

export function Services() {
  const featured = HOMEPAGE_SERVICE_SLUGS.map(getService).filter(
    (s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s),
  );

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-widest text-brand mb-3">Our Services</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Specialised solutions to <span className="text-gradient">automate, optimize, and grow</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore specialized solutions designed to automate, optimize, and grow your business —
            across AI, technology, marketing, and operations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (i % 3) * 0.06, duration: 0.45 }}
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent hover:from-brand/40 hover:via-brand/10 transition-colors"
            >
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="relative flex flex-col h-full glass rounded-2xl p-6 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-[0.06] transition-opacity rounded-2xl" />
                <div className="flex items-start justify-between mb-5 relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand/20 border border-brand/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <s.icon className="w-6 h-6 text-brand" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-lg font-semibold mb-2 relative">{s.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 relative flex-1">{s.short}</p>
                <div className="inline-flex items-center gap-1.5 text-sm font-medium text-brand relative">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-xl glass border border-border hover:border-brand/40 text-sm font-medium transition-colors"
          >
            View all services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
