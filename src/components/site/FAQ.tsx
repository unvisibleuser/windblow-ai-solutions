import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What is AI automation?",
    a: "AI automation uses software and artificial intelligence to handle repetitive business tasks automatically.",
  },
  {
    q: "Which businesses can benefit?",
    a: "Almost any business that handles customer communication, leads, reporting, marketing, or operations.",
  },
  {
    q: "Do you provide custom solutions?",
    a: "Yes. Every automation is designed around your business processes and goals.",
  },
  {
    q: "How long does implementation take?",
    a: "Most projects take between one and four weeks depending on complexity.",
  },
  {
    q: "Do you provide ongoing support?",
    a: "Yes. We offer maintenance, improvements, and long-term support.",
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes. We work with CRMs, websites, WhatsApp, Gmail, spreadsheets, APIs, and many other systems.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-brand mb-3">FAQ</div>
          <h2 className="text-3xl md:text-5xl font-semibold">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium">{f.q}</span>
                  <Plus
                    className={`w-5 h-5 text-brand transition-transform shrink-0 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
