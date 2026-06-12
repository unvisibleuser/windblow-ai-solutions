import { motion } from "motion/react";
import { GraduationCap, Wallet, Target, Handshake } from "lucide-react";

const cards = [
  {
    icon: GraduationCap,
    title: "Student-Led Innovation",
    description:
      "Built by ambitious college students who stay ahead of the latest AI and automation technologies.",
  },
  {
    icon: Wallet,
    title: "Affordable Execution",
    description: "Enterprise-level automation solutions without enterprise-level costs.",
  },
  {
    icon: Target,
    title: "Business-Focused",
    description:
      "We focus on solving real business problems, not selling unnecessary technology.",
  },
  {
    icon: Handshake,
    title: "Long-Term Partnership",
    description:
      "We continuously improve and support your systems as your business grows.",
  },
];

export function WhyUs() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-brand mb-3">Why Windblow</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            A modern agency built for <span className="text-gradient">practical results</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Why businesses choose us as their long-term automation partner.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 hover:border-brand/40 transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-gradient-brand/20 border border-brand/30 flex items-center justify-center mb-4">
                <c.icon className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
