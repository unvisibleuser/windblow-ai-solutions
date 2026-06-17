import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { FinalCTA } from "@/components/site/FinalCTA";
import { BLOG_POSTS } from "@/lib/blog-data";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — Windblow Blog` },
          { name: "description", content: loaderData.post.excerpt },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.excerpt },
        ]
      : [{ title: "Article — Windblow Blog" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-semibold mb-3">Article not found</h1>
          <Link to="/blog" className="text-brand inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        {/* Hero */}
        <section
          className={`pt-32 pb-16 relative bg-gradient-to-b ${post.gradient}`}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-brand mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to blog
            </Link>
            <div className="text-xs uppercase tracking-widest text-brand mb-3">
              {post.category}
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">{post.excerpt}</p>
            <div className="flex items-center justify-center gap-5 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 prose-content">
            {post.content.map((para: string, i: number) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-foreground/90 mb-6"
              >
                {para}
              </p>
            ))}
          </div>
        </article>

        {/* Related */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold">Continue reading</h2>
              <Link
                to="/blog"
                className="text-sm text-brand inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                All articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group glass rounded-2xl overflow-hidden hover:border-brand/40 transition"
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
                  >
                    <div className="text-xs uppercase tracking-widest text-foreground/70 font-semibold">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold mb-2 group-hover:text-brand transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      {p.date} · {p.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
