import { Wind, Linkedin, Instagram, MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const cols = [
    {
      title: "Company",
      links: ["Home", "Services", "About", "Blog", "Contact"],
    },
    {
      title: "Services",
      links: ["AI Automation", "Technology Solutions", "Marketing"],
    },
  ];

  return (
    <footer className="border-t border-border bg-card/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-brand flex items-center justify-center shadow-glow">
                <Wind className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-semibold text-lg">Windblow</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              AI Automation that gives your business time back.
            </p>
            <div className="flex gap-2">
              {[Linkedin, Instagram, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg glass flex items-center justify-center hover:border-brand/40 transition"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-semibold text-sm mb-4">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-brand transition"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-brand shrink-0" />
                Ahmedabad, Gujarat, India
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand shrink-0" />
                hello@windblow.ai
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand shrink-0" />
                +91 00000 00000
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <div>© 2026 Windblow. All Rights Reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
