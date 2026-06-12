import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{
            background:
              "radial-gradient(ellipse at top, oklch(0.32 0.18 250 / 0.8), oklch(0.18 0.02 260) 70%)",
          }}
        >
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-brand opacity-30 blur-3xl animate-pulse-glow" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-brand-glow opacity-20 blur-3xl animate-pulse-glow" />

          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-semibold mb-5 leading-tight">
              Ready to Save Time and <br />
              <span className="text-gradient">Scale Faster?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Discover how AI automation can transform your business operations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 h-12 px-7 rounded-lg bg-gradient-brand text-primary-foreground font-medium shadow-glow hover:opacity-90 transition"
              >
                Book a Free Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-lg glass text-foreground font-medium hover:bg-white/5 transition"
              >
                View Services
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
