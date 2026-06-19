import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { ContactSection } from "@/components/site/ContactSection";
import { FAQ } from "@/components/site/FAQ";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Windblow — Book a Free AI Automation Discovery Call" },
      {
        name: "description",
        content:
          "Get in touch with Windblow. Book a free 30-minute discovery call to explore AI automation for your business. Based in Ahmedabad, serving globally.",
      },
      { property: "og:title", content: "Contact Windblow" },
      {
        property: "og:description",
        content:
          "Book a free discovery call with the Windblow team and start automating your business.",
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { icon: Mail, label: "Email", value: "windblow.ai@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 93277 55366" },
  { icon: MapPin, label: "Location", value: "Ahmedabad, Gujarat, India" },
];

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <section className="pt-32 pb-8 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="text-xs uppercase tracking-widest text-brand mb-3">Get in Touch</div>
            <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
              Let's build your <span className="text-gradient">automation engine</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Tell us about your business — we'll map out where AI and automation can save you the
              most time, and where they can drive new revenue.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-12 max-w-3xl mx-auto">
              {channels.map((c) => (
                <div key={c.label} className="glass rounded-xl p-5 text-left">
                  <c.icon className="w-5 h-5 text-brand mb-3" />
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    {c.label}
                  </div>
                  <div className="text-sm font-medium mt-1">{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ContactSection />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
