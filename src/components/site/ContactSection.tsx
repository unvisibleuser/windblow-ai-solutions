import { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";

const services = [
  "AI Automation",
  "Technology Solutions",
  "Marketing Growth",
  "Not sure yet",
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const slots = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-brand mb-3">Contact</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Let's <span className="text-gradient">Automate Your Business</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us about your business and we'll identify opportunities for automation and growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="lg:col-span-3 glass rounded-2xl p-8 space-y-4"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-brand mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Thanks for reaching out!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" name="name" required />
                  <Field label="Company Name" name="company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email" type="email" name="email" required />
                  <Field label="Phone Number" type="tel" name="phone" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    className="w-full h-11 px-3 rounded-lg bg-background/50 border border-border text-sm focus:border-brand outline-none transition"
                  >
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Business Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg bg-background/50 border border-border text-sm focus:border-brand outline-none transition resize-none"
                    placeholder="Tell us about your business and what you'd like to automate..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full h-12 rounded-lg bg-gradient-brand text-primary-foreground font-medium shadow-glow hover:opacity-90 transition"
                >
                  Submit & Book Discovery Call
                </button>
              </>
            )}
          </motion.form>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4 text-brand" />
              <span className="font-medium text-sm">Pick a time</span>
            </div>
            <div className="grid grid-cols-6 gap-2 mb-6">
              {days.map((d, i) => (
                <button
                  key={d}
                  className={`p-2 rounded-lg text-center text-xs border transition ${
                    i === 2
                      ? "bg-gradient-brand border-transparent text-primary-foreground"
                      : "border-border hover:border-brand/40"
                  }`}
                >
                  <div className="text-[10px] opacity-70">{d}</div>
                  <div className="font-medium mt-0.5">{15 + i}</div>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              Available slots (IST)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {slots.map((s, i) => (
                <button
                  key={s}
                  className={`p-2.5 rounded-lg text-xs font-medium border transition ${
                    i === 1
                      ? "border-brand text-brand bg-brand/10"
                      : "border-border hover:border-brand/40"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground">
              30 min free discovery call · Google Meet
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full h-11 px-3 rounded-lg bg-background/50 border border-border text-sm focus:border-brand outline-none transition"
      />
    </div>
  );
}
