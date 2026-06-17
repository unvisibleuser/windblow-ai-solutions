import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { WhyUs } from "@/components/site/WhyUs";
import { Metrics } from "@/components/site/Metrics";
import { Testimonials } from "@/components/site/Testimonials";
import { FinalCTA } from "@/components/site/FinalCTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Windblow — AI Automation Agency in Ahmedabad" },
      {
        name: "description",
        content:
          "Learn about Windblow, an AI automation agency in Ahmedabad helping businesses save time through intelligent workflows, chatbots, and integrations.",
      },
      { property: "og:title", content: "About Windblow" },
      {
        property: "og:description",
        content:
          "A student-led, business-focused AI automation team building affordable, high-impact solutions for growing companies.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <section className="pt-32 pb-12 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="text-xs uppercase tracking-widest text-brand mb-3">About Windblow</div>
            <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
              Building the <span className="text-gradient">future of automation</span> from Ahmedabad
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Windblow is an AI automation agency helping businesses reclaim their time. We design
              intelligent workflows, chatbots, and integrations that quietly run operations in the
              background — so teams can focus on growth.
            </p>
          </div>
        </section>
        <WhyUs />
        <Metrics />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
