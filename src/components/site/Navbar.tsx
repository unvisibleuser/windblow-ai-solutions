import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Wind, ChevronDown, ArrowRight } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

const links: Array<{ label: string; href?: string; to?: string; mega?: boolean }> = [
  { label: "Home", to: "/" },
  { label: "Services", mega: true },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || megaOpen ? "glass border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow">
            <Wind className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Windblow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            l.mega ? (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={scheduleClose}
              >
                <button
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                >
                  {l.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ) : l.to ? (
              <Link
                key={l.label}
                to={l.to}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ),
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="/#contact"
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-gradient-brand text-primary-foreground text-sm font-medium shadow-glow hover:opacity-90 transition"
          >
            Book a Call
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Desktop Mega Menu */}
      <AnimatePresence>
        {megaOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onMouseEnter={scheduleClose}
              className="hidden md:block fixed inset-0 top-16 bg-background/70 backdrop-blur-sm -z-10 pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
              className="hidden md:block absolute left-0 right-0 top-16 px-6 lg:px-8"
            >
            <div className="max-w-7xl mx-auto glass border border-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-6 p-8">
                <div className="col-span-9 grid grid-cols-4 gap-6">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <div key={cat.key} className="flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-brand/20 border border-brand/30 flex items-center justify-center">
                          <cat.icon className="w-4 h-4 text-brand" />
                        </div>
                        <div className="text-xs uppercase tracking-widest text-brand font-semibold">
                          {cat.label}
                        </div>
                      </div>
                      <ul className="space-y-1.5">
                        {cat.services.slice(0, 8).map((s) => (
                          <li key={s.slug}>
                            <Link
                              to="/services/$slug"
                              params={{ slug: s.slug }}
                              onClick={() => setMegaOpen(false)}
                              className="group block rounded-md px-2 py-1.5 hover:bg-white/5 transition-colors"
                            >
                              <div className="text-sm text-foreground/90 group-hover:text-foreground font-medium">
                                {s.title}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1">
                                {s.short}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Featured Card */}
                <div className="col-span-3">
                  <div className="relative h-full rounded-xl p-6 bg-gradient-brand text-primary-foreground overflow-hidden shadow-glow">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-3xl" />
                    <div className="relative flex flex-col h-full">
                      <div className="text-xs uppercase tracking-widest opacity-80 mb-2">
                        Featured
                      </div>
                      <h4 className="text-xl font-semibold mb-2">AI Automation Solutions</h4>
                      <p className="text-sm opacity-90 mb-6">
                        Automate repetitive business tasks and save hundreds of hours every month.
                      </p>
                      <div className="mt-auto">
                        <Link
                          to="/services"
                          onClick={() => setMegaOpen(false)}
                          className="inline-flex items-center gap-2 text-sm font-medium bg-white/15 hover:bg-white/25 transition px-4 py-2 rounded-lg backdrop-blur"
                        >
                          Explore Solutions <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-border px-8 py-3 flex items-center justify-between bg-white/[0.02]">
                <div className="text-xs text-muted-foreground">
                  30+ specialised services across AI, technology, marketing, and operations.
                </div>
                <Link
                  to="/services"
                  onClick={() => setMegaOpen(false)}
                  className="text-xs text-brand font-medium inline-flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View all services <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {open && (
        <div className="md:hidden glass border-t border-border px-6 py-4 flex flex-col gap-3 max-h-[80vh] overflow-y-auto">
          <Link to="/" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
            Home
          </Link>
          <div>
            <div className="text-xs uppercase tracking-widest text-brand mb-2">Services</div>
            <div className="grid grid-cols-1 gap-1 pl-2 border-l border-border">
              {SERVICE_CATEGORIES.map((cat) => (
                <div key={cat.key} className="mb-2">
                  <div className="text-xs font-semibold text-foreground/80 mb-1">{cat.label}</div>
                  {cat.services.map((s) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      onClick={() => setOpen(false)}
                      className="block text-sm text-muted-foreground py-1"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to="/services"
                onClick={() => setOpen(false)}
                className="text-sm text-brand font-medium py-1"
              >
                View all →
              </Link>
            </div>
          </div>
          <a href="/#about" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
            About
          </a>
          <a href="/#blog" onClick={() => setOpen(false)} className="text-sm text-muted-foreground">
            Blog
          </a>
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="text-sm text-muted-foreground"
          >
            Contact
          </a>
          <a
            href="/#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center h-10 px-5 rounded-lg bg-gradient-brand text-primary-foreground text-sm font-medium"
          >
            Book a Call
          </a>
        </div>
      )}
    </motion.header>
  );
}
