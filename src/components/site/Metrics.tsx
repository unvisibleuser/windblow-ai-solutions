import { motion } from "motion/react";

const metrics = [
  { value: "100+", label: "Hours Saved" },
  { value: "20+", label: "Automation Workflows Built" },
  { value: "10+", label: "Business Systems Optimized" },
  { value: "∞", label: "Growing Businesses Supported" },
];

export function Metrics() {
  return (
    <section className="py-16 border-y border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="text-4xl md:text-5xl font-semibold font-display text-gradient mb-2">
              {m.value}
            </div>
            <div className="text-xs md:text-sm text-muted-foreground">{m.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
