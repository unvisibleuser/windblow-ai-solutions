import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Metrics } from "@/components/site/Metrics";
import { Services } from "@/components/site/Services";
import { WhyUs } from "@/components/site/WhyUs";
import { Work } from "@/components/site/Work";
import { Testimonials } from "@/components/site/Testimonials";
import { FAQ } from "@/components/site/FAQ";
import { ContactSection } from "@/components/site/ContactSection";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Windblow — AI Automation Agency in Ahmedabad" },
      {
        name: "description",
        content:
          "Windblow is an AI automation agency in Ahmedabad. We automate repetitive work, generate leads, and scale operations through AI, automation, and smart technology.",
      },
      { property: "og:title", content: "Windblow — AI Automation Agency in Ahmedabad" },
      {
        property: "og:description",
        content:
          "AI automation that gives your business time back. Workflows, chatbots, WhatsApp & Gmail automation, analytics, and integrations.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Metrics />
        <Services />
        <WhyUs />
        <Work />
        <Testimonials />
        <FAQ />
        <ContactSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
