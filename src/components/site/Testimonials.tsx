import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Windblow helped us automate our customer inquiries and saved us countless hours every week.",
    name: "Business Owner",
    role: "Retail Brand, Ahmedabad",
  },
  {
    quote: "The team understood our business and built exactly what we needed.",
    name: "Startup Founder",
    role: "SaaS Startup",
  },
  {
    quote: "Our reporting process went from hours to minutes.",
    name: "Operations Manager",
    role: "Service Business",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((p) => (p + 1) % testimonials.length);
  const prev = () => setI((p) => (p - 1 + testimonials.length) % testimonials.length);
  const t = testimonials[i];

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div className="text-xs uppercase tracking-widest text-brand mb-3">Testimonials</div>
        <h2 className="text-3xl md:text-5xl font-semibold mb-12">
          What <span className="text-gradient">Clients Say</span>
        </h2>

        <div className="relative glass rounded-2xl p-10 md:p-14">
          <Quote className="w-10 h-10 text-brand/30 mx-auto mb-6" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xl md:text-2xl font-display leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="text-sm font-medium">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-brand/40"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === i ? "w-6 bg-gradient-brand" : "w-1.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-brand/40"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
