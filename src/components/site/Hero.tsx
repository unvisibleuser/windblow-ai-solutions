import { motion } from "motion/react";
import { ArrowRight, Sparkles, MapPin, Zap, Wrench, Users } from "lucide-react";
import { HeroDashboard } from "./HeroDashboard";
import heroBg from "@/assets/hero-bg.jpg";

const trust = [
  { icon: MapPin, label: "Based in Ahmedabad" },
  { icon: Zap, label: "Fast Implementation" },
  { icon: Wrench, label: "Custom Solutions" },
  { icon: Users, label: "Human Support" },
];

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground mb-6">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            AI Automation That Gives Your Business Time Back
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] mb-6">
            AI Automation Agency <br />
            <span className="text-gradient">in Ahmedabad</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            We help businesses automate repetitive work, generate more leads, improve customer
            experience, and scale faster through AI, automation, and smart technology systems.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-gradient-brand text-primary-foreground font-medium shadow-glow hover:opacity-90 transition"
            >
              Book a Free Strategy Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-lg glass text-foreground font-medium hover:bg-white/5 transition"
            >
              Explore Services
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {trust.map((t) => (
              <div key={t.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                <t.icon className="w-4 h-4 text-brand" />
                {t.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <HeroDashboard />
        </motion.div>
      </div>
    </section>
  );
}
