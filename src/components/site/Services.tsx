import { motion } from "motion/react";
import { Brain, Layers, TrendingUp, ArrowRight, Check } from "lucide-react";

const services = [
  {
    icon: Brain,
    title: "AI Automation",
    description:
      "Automate repetitive tasks, improve customer communication, and build intelligent systems that work around the clock.",
    items: [
      "AI Workflow Automations",
      "AI Chatbots",
      "AI Receptionists",
      "WhatsApp Automation",
      "Gmail Automation",
      "AI Content Creation",
      "Social Media Automation",
      "Automated Reporting & Insights",
    ],
  },
  {
    icon: Layers,
    title: "Technology Solutions",
    description:
      "Build strong digital foundations with websites, integrations, and business systems.",
    items: [
      "Website Optimization",
      "Marketing Automation",
      "Ecommerce Development",
      "Systems Integration",
      "API Integration",
      "Analytics Setup",
      "CRM Pipelines",
    ],
  },
  {
    icon: TrendingUp,
    title: "Marketing Growth",
    description:
      "Generate awareness, leads, and revenue using proven marketing strategies.",
    items: [
      "Paid Advertising",
      "SEO",
      "Local SEO",
      "Branding",
      "Creative Design",
      "Influencer Marketing",
      "Public Relations",
    ],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-widest text-brand mb-3">What We Do</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Practical AI built for <span className="text-gradient">real business growth</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Practical AI, technology, and marketing solutions designed to help businesses grow with
            less manual work.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative glass rounded-2xl p-7 flex flex-col hover:border-brand/40 transition-all"
            >
              <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-gradient-brand/20 border border-brand/30 flex items-center justify-center mb-5 relative">
                <s.icon className="w-6 h-6 text-brand" />
              </div>
              <h3 className="text-xl font-semibold mb-2 relative">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 relative">{s.description}</p>
              <ul className="space-y-2 mb-6 relative flex-1">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-brand mt-0.5 shrink-0" />
                    <span className="text-foreground/80">{it}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:gap-3 transition-all relative"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
