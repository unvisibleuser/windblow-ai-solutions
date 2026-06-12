import { motion } from "motion/react";
import { MessageCircle, FileBarChart, UserPlus } from "lucide-react";

const projects = [
  {
    icon: UserPlus,
    tag: "Sales Automation",
    title: "Lead Generation Automation",
    desc: "Automated lead capture, qualification, and CRM entry.",
    result: "Reduced manual work by 80%",
    visual: (
      <div className="space-y-2">
        {["New lead → Qualified", "Synced to CRM", "Slack alert sent"].map((t, i) => (
          <div key={t} className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 rounded-full bg-brand animate-pulse-glow" />
            <span className="text-muted-foreground">{t}</span>
            <span className="ml-auto text-[10px] text-brand">{i * 3 + 1}s</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: MessageCircle,
    tag: "Customer Support",
    title: "WhatsApp Customer Assistant",
    desc: "Automated responses and customer support.",
    result: "24/7 customer engagement",
    visual: (
      <div className="space-y-2">
        <div className="rounded-lg bg-brand/10 border border-brand/20 px-3 py-2 text-xs max-w-[80%]">
          Hi! What's your store timing?
        </div>
        <div className="rounded-lg bg-white/5 border border-border px-3 py-2 text-xs max-w-[85%] ml-auto">
          We're open 10AM–9PM daily. Want directions?
        </div>
      </div>
    ),
  },
  {
    icon: FileBarChart,
    tag: "Reporting",
    title: "Automated Business Reports",
    desc: "Generated weekly performance reports automatically.",
    result: "Saved hours every week",
    visual: (
      <div className="grid grid-cols-7 gap-1 items-end h-16">
        {[40, 65, 50, 80, 55, 90, 75].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="bg-gradient-brand rounded-sm opacity-80"
          />
        ))}
      </div>
    ),
  },
];

export function Work() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-widest text-brand mb-3">Our Work</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Real Solutions. <span className="text-gradient">Real Results.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:border-brand/40 transition"
            >
              <div className="rounded-xl bg-background/50 border border-border p-4 mb-5 h-32 flex flex-col justify-center">
                {p.visual}
              </div>
              <div className="flex items-center gap-2 mb-3">
                <p.icon className="w-4 h-4 text-brand" />
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
              </div>
              <h3 className="font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
              <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand">
                {p.result}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
