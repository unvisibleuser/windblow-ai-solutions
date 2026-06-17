import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { BLOG_POSTS } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Windblow | AI Automation Insights & Playbooks" },
      {
        name: "description",
        content:
          "Field notes, playbooks, and case studies from the Windblow team on AI automation, chatbots, WhatsApp, SEO, and modern business operations.",
      },
      { property: "og:title", content: "Windblow Blog" },
      {
        property: "og:description",
        content: "AI automation insights from the Windblow team in Ahmedabad.",
      },
    ],
  }),
  component: BlogIndex,
});

const categories = ["All", "AI Automation", "Marketing", "Technology", "Case Study"];

function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 relative">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
            <div className="text-xs uppercase tracking-widest text-brand mb-3">The Windblow Blog</div>
            <h1 className="text-4xl md:text-6xl font-semibold mb-6 tracking-tight">
              Field notes on <span className="text-gradient">AI & automation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Playbooks, case studies, and honest takes from the team building automation for
              modern businesses.
            </p>
          </div>
        </section>

        {/* Featured */}
        <section className="pb-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Link
              to="/blog/$slug"
              params={{ slug: featured.slug }}
              className="group block glass rounded-3xl overflow-hidden hover:border-brand/40 transition"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div
                  className={`relative h-64 md:h-full min-h-[280px] bg-gradient-to-br ${featured.gradient} flex items-center justify-center`}
                >
                  <div className="absolute inset-0 bg-grid-pattern opacity-30" />
                  <div className="relative font-display text-6xl font-semibold text-foreground/80 px-8 text-center">
                    {featured.title.split(" ").slice(0, 3).join(" ")}
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-brand/10 text-brand font-medium">
                      Featured
                    </span>
                    <span>{featured.category}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mb-3 group-hover:text-brand transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">{featured.excerpt}</p>
                  <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-brand font-medium group-hover:gap-2 transition-all">
                      Read article <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap gap-2">
            {categories.map((c, i) => (
              <button
                key={c}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition ${
                  i === 0
                    ? "bg-gradient-brand border-transparent text-primary-foreground shadow-glow"
                    : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block glass rounded-2xl overflow-hidden h-full hover:border-brand/40 transition"
                >
                  <div
                    className={`h-44 bg-gradient-to-br ${post.gradient} relative flex items-center justify-center`}
                  >
                    <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                    <div className="relative text-xs uppercase tracking-widest text-foreground/70 font-semibold">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-[calc(100%-11rem)]">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-brand transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
