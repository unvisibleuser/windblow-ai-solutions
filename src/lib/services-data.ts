import {
  Bot,
  MessageSquare,
  PhoneCall,
  Workflow,
  Share2,
  Mail,
  Filter,
  BarChart3,
  Globe,
  ShoppingCart,
  LayoutTemplate,
  Users,
  Plug,
  LineChart,
  Gauge,
  Network,
  Search,
  MapPin,
  Megaphone,
  Sparkles,
  Palette,
  UserCheck,
  Newspaper,
  PenTool,
  Cog,
  Lightbulb,
  Heart,
  Target,
  TrendingUp,
  Brain,
  Layers,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  category: string;
  benefits: string[];
};

export type ServiceCategory = {
  key: string;
  label: string;
  icon: LucideIcon;
  blurb: string;
  services: Service[];
};

const aiAutomation: Service[] = [
  {
    slug: "ai-workflow-automation",
    title: "AI Workflow Automation",
    short: "Build intelligent workflows that eliminate repetitive tasks.",
    description:
      "End-to-end automations that connect your tools and let AI handle the manual steps — from data entry and approvals to multi-step business processes.",
    icon: Workflow,
    category: "AI & Automation",
    benefits: [
      "Eliminate 10–40 hours of manual work per week",
      "Connect 100+ apps with smart triggers",
      "Built-in error handling & monitoring",
      "Custom logic powered by GPT, Claude, and Gemini",
    ],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    short: "Provide instant responses and customer support 24/7.",
    description:
      "Custom-trained chatbots for your website, app, or WhatsApp — trained on your knowledge base to answer questions, qualify leads, and book meetings.",
    icon: Bot,
    category: "AI & Automation",
    benefits: [
      "Trained on your documents & website",
      "Multi-language support",
      "Lead capture + CRM sync",
      "Human handoff when needed",
    ],
  },
  {
    slug: "ai-receptionists",
    title: "AI Receptionists",
    short: "Never miss a customer inquiry again.",
    description:
      "Voice AI that answers calls 24/7, books appointments, qualifies leads, and routes urgent calls to your team — natural conversations indistinguishable from a human.",
    icon: PhoneCall,
    category: "AI & Automation",
    benefits: [
      "24/7 inbound call handling",
      "Calendar booking & SMS confirmations",
      "Multi-language voice",
      "Full call transcripts & analytics",
    ],
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    short: "Automate customer conversations, lead nurturing, and notifications.",
    description:
      "Official WhatsApp Business API automations for order updates, broadcasts, AI replies, and full conversational sales funnels.",
    icon: MessageSquare,
    category: "AI & Automation",
    benefits: [
      "Verified WhatsApp Business API setup",
      "AI-driven conversations",
      "Broadcast campaigns & flows",
      "CRM and ecommerce integration",
    ],
  },
  {
    slug: "social-media-automation",
    title: "Social Media Automation",
    short: "Plan, generate, and publish content across every platform.",
    description:
      "AI-generated posts, scheduled publishing, automatic responses, and analytics across Instagram, LinkedIn, Twitter, and Facebook.",
    icon: Share2,
    category: "AI & Automation",
    benefits: [
      "AI content generation",
      "Multi-platform scheduling",
      "Auto-replies & DM workflows",
      "Performance dashboards",
    ],
  },
  {
    slug: "email-gmail-automation",
    title: "Email & Gmail Automation",
    short: "Smart inbox triage, drafting, and follow-ups on autopilot.",
    description:
      "AI-powered email systems that draft replies, label conversations, route requests, and run multi-step outreach sequences from your inbox.",
    icon: Mail,
    category: "AI & Automation",
    benefits: [
      "Auto-drafted replies in your tone",
      "Smart labels & routing",
      "Outbound sequence automation",
      "Inbox zero, sustainably",
    ],
  },
  {
    slug: "lead-qualification-systems",
    title: "Lead Qualification Systems",
    short: "Score, route, and follow up with every lead automatically.",
    description:
      "AI scoring engines that qualify leads in real time, enrich data, and route hot opportunities to the right rep with instant follow-up.",
    icon: Filter,
    category: "AI & Automation",
    benefits: [
      "Real-time lead scoring",
      "Data enrichment from 50+ sources",
      "Instant routing & follow-up",
      "Pipeline reporting",
    ],
  },
  {
    slug: "automated-reporting-systems",
    title: "Automated Reporting Systems",
    short: "Daily, weekly, and monthly reports generated automatically.",
    description:
      "Pull data from every tool you use and deliver branded reports, dashboards, and AI insights to your inbox or Slack.",
    icon: BarChart3,
    category: "AI & Automation",
    benefits: [
      "Multi-source data pipelines",
      "AI-written insights",
      "Slack / email delivery",
      "White-labelled client reports",
    ],
  },
];

const technology: Service[] = [
  {
    slug: "website-development",
    title: "Website Design & Development",
    short: "Modern high-converting websites built for growth.",
    description:
      "Custom websites engineered for performance, SEO, and conversion — designed to look premium and load instantly.",
    icon: Globe,
    category: "Websites & Technology",
    benefits: [
      "Premium design systems",
      "90+ PageSpeed scores",
      "SEO-ready architecture",
      "Built on modern stacks",
    ],
  },
  {
    slug: "ecommerce-development",
    title: "Ecommerce Development",
    short: "Shopify, WooCommerce & custom stores that sell.",
    description:
      "Complete ecommerce builds with conversion-focused UX, payment integrations, inventory automation, and growth analytics.",
    icon: ShoppingCart,
    category: "Websites & Technology",
    benefits: [
      "Shopify & custom stacks",
      "Payment & shipping integrations",
      "Inventory automation",
      "Conversion-optimized UX",
    ],
  },
  {
    slug: "landing-pages",
    title: "Landing Pages",
    short: "High-conversion pages for campaigns and launches.",
    description:
      "Purpose-built landing pages tied to your ad campaigns — built in days, A/B tested, and tuned for the highest possible conversion rate.",
    icon: LayoutTemplate,
    category: "Websites & Technology",
    benefits: [
      "Designed for one goal",
      "A/B testing built in",
      "Form & CRM integration",
      "Heatmap & analytics ready",
    ],
  },
  {
    slug: "crm-automation",
    title: "CRM Setup & Pipelines",
    short: "HubSpot, Zoho, GoHighLevel — set up and automated.",
    description:
      "Get a fully configured CRM with custom pipelines, automated follow-ups, deal tracking, and team workflows that fit how you actually sell.",
    icon: Users,
    category: "Websites & Technology",
    benefits: [
      "Pipeline design & setup",
      "Automated follow-ups",
      "Team workflows & roles",
      "Reporting dashboards",
    ],
  },
  {
    slug: "api-integrations",
    title: "API Integrations",
    short: "Connect every tool in your business.",
    description:
      "Custom API integrations between your CRM, ERP, ecommerce, marketing, and finance tools — so data flows automatically without copy-paste.",
    icon: Plug,
    category: "Websites & Technology",
    benefits: [
      "Two-way data sync",
      "Custom REST / GraphQL APIs",
      "Webhook automation",
      "Reliability monitoring",
    ],
  },
  {
    slug: "analytics-tracking",
    title: "Analytics & Tracking Setup",
    short: "GA4, GTM, server-side tracking done right.",
    description:
      "Accurate tracking across web, ads, and CRM with server-side GTM, conversion modelling, and clean attribution.",
    icon: LineChart,
    category: "Websites & Technology",
    benefits: [
      "GA4 + GTM setup",
      "Server-side tracking",
      "Ad pixel & conversion APIs",
      "Privacy-compliant",
    ],
  },
  {
    slug: "business-dashboards",
    title: "Business Dashboards",
    short: "Real-time business insights and automated reporting.",
    description:
      "Custom dashboards built on Looker Studio, Metabase, or Power BI — pulling live data from every source for instant visibility.",
    icon: Gauge,
    category: "Websites & Technology",
    benefits: [
      "Live KPIs from every tool",
      "Role-based access",
      "Mobile-friendly views",
      "Automated alerts",
    ],
  },
  {
    slug: "system-integrations",
    title: "System Integrations",
    short: "Make your stack work as one unified system.",
    description:
      "End-to-end integrations between CRM, ERP, accounting, support, and operations — eliminating data silos across the business.",
    icon: Network,
    category: "Websites & Technology",
    benefits: [
      "Unified single source of truth",
      "Reduce manual handoffs",
      "Scalable middleware",
      "Long-term support",
    ],
  },
];

const marketing: Service[] = [
  {
    slug: "seo",
    title: "SEO",
    short: "Generate sustainable traffic and qualified leads.",
    description:
      "Technical SEO, content strategy, and link building that compounds — built to rank for the keywords that actually drive revenue.",
    icon: Search,
    category: "Marketing & Growth",
    benefits: [
      "Technical SEO audits",
      "Keyword & content strategy",
      "Authority link building",
      "Monthly reporting",
    ],
  },
  {
    slug: "local-seo",
    title: "Local SEO",
    short: "Dominate Google Maps in your city.",
    description:
      "Optimise your Google Business Profile, local citations, and reviews to win the map pack for high-intent local searches.",
    icon: MapPin,
    category: "Marketing & Growth",
    benefits: [
      "GBP optimisation",
      "Local citations",
      "Review generation",
      "Geo-grid rank tracking",
    ],
  },
  {
    slug: "paid-advertising",
    title: "Paid Advertising",
    short: "Profitable Meta, Google, and LinkedIn ads.",
    description:
      "Full-funnel paid campaigns — creative, targeting, landing pages, and tracking — managed by performance specialists.",
    icon: Megaphone,
    category: "Marketing & Growth",
    benefits: [
      "Meta, Google, LinkedIn, YouTube",
      "Creative production",
      "Conversion tracking",
      "Weekly optimisation",
    ],
  },
  {
    slug: "branding",
    title: "Branding",
    short: "Identity systems that signal premium.",
    description:
      "Logo, visual identity, voice, and brand guidelines that make your business look like a category leader.",
    icon: Sparkles,
    category: "Marketing & Growth",
    benefits: [
      "Logo & identity systems",
      "Brand voice & messaging",
      "Brand guidelines",
      "Launch assets",
    ],
  },
  {
    slug: "creative-design",
    title: "Creative Design",
    short: "Ad creatives, social posts, and brand assets.",
    description:
      "On-demand creative production for ads, social, decks, and websites — designed to perform, not just look pretty.",
    icon: Palette,
    category: "Marketing & Growth",
    benefits: [
      "Performance-driven creatives",
      "Static + motion design",
      "Brand-consistent",
      "Fast turnarounds",
    ],
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    short: "Vetted creators that drive real business results.",
    description:
      "Influencer campaigns from sourcing and negotiation to content briefs, contracts, and ROI tracking.",
    icon: UserCheck,
    category: "Marketing & Growth",
    benefits: [
      "Vetted creator network",
      "Negotiation & contracts",
      "Content briefs",
      "ROI tracking",
    ],
  },
  {
    slug: "public-relations",
    title: "Public Relations",
    short: "Get featured in the publications your customers read.",
    description:
      "Press releases, media outreach, and thought leadership to build credibility and drive earned media at scale.",
    icon: Newspaper,
    category: "Marketing & Growth",
    benefits: [
      "Media list outreach",
      "Press release distribution",
      "Founder thought leadership",
      "Crisis comms",
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    short: "AI-assisted content engines that compound.",
    description:
      "Editorial-grade content strategies powered by AI workflows — from research to publishing to repurposing.",
    icon: PenTool,
    category: "Marketing & Growth",
    benefits: [
      "Editorial calendars",
      "AI-assisted production",
      "Repurposing pipelines",
      "Distribution playbooks",
    ],
  },
];

const business: Service[] = [
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    short: "Automate the workflows that run your business.",
    description:
      "Map, redesign, and automate operational processes across departments — from onboarding to invoicing — using AI and low-code tools.",
    icon: Cog,
    category: "Business Solutions",
    benefits: [
      "Process mapping & redesign",
      "AI + low-code automation",
      "Change management",
      "Measurable ROI",
    ],
  },
  {
    slug: "workflow-consulting",
    title: "Workflow Consulting",
    short: "Expert audits and roadmaps for automation.",
    description:
      "Strategic consulting to identify the highest-ROI automation opportunities in your business and build a phased rollout plan.",
    icon: Lightbulb,
    category: "Business Solutions",
    benefits: [
      "Operations audit",
      "Opportunity mapping",
      "Phased rollout plan",
      "Vendor selection",
    ],
  },
  {
    slug: "customer-experience-systems",
    title: "Customer Experience Systems",
    short: "Unified CX across every touchpoint.",
    description:
      "Design and implement CX systems that combine support, success, feedback, and automation into one seamless customer journey.",
    icon: Heart,
    category: "Business Solutions",
    benefits: [
      "Omnichannel support setup",
      "NPS & feedback loops",
      "Knowledge bases",
      "AI support agents",
    ],
  },
  {
    slug: "sales-automation",
    title: "Sales Automation",
    short: "Automate lead tracking, follow-ups, and sales pipelines.",
    description:
      "Automate outbound, follow-ups, proposals, and pipeline management so your team only spends time on conversations that close.",
    icon: Target,
    category: "Business Solutions",
    benefits: [
      "Outbound sequences",
      "Follow-up automation",
      "Proposal generation",
      "Pipeline hygiene",
    ],
  },
  {
    slug: "operations-optimization",
    title: "Operations Optimization",
    short: "Streamline operations and cut costs.",
    description:
      "Reduce friction, eliminate waste, and increase throughput by re-engineering operational workflows with data and automation.",
    icon: TrendingUp,
    category: "Business Solutions",
    benefits: [
      "Bottleneck analysis",
      "Cost reduction roadmap",
      "Throughput improvements",
      "KPI dashboards",
    ],
  },
  {
    slug: "custom-ai-solutions",
    title: "Custom AI Solutions",
    short: "Tailored systems designed around your business needs.",
    description:
      "From custom GPTs and internal copilots to RAG systems and AI agents — built specifically for your data, team, and workflows.",
    icon: Brain,
    category: "Business Solutions",
    benefits: [
      "Custom GPTs & copilots",
      "RAG over your data",
      "Multi-agent systems",
      "Secure deployment",
    ],
  },
];

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    key: "ai",
    label: "AI & Automation",
    icon: Brain,
    blurb: "Intelligent systems that work around the clock.",
    services: aiAutomation,
  },
  {
    key: "tech",
    label: "Websites & Technology",
    icon: Layers,
    blurb: "Digital foundations built for scale.",
    services: technology,
  },
  {
    key: "marketing",
    label: "Marketing & Growth",
    icon: Megaphone,
    blurb: "Awareness, leads, and revenue.",
    services: marketing,
  },
  {
    key: "business",
    label: "Business Solutions",
    icon: Briefcase,
    blurb: "Operations re-engineered around AI.",
    services: business,
  },
];

export const ALL_SERVICES: Service[] = SERVICE_CATEGORIES.flatMap((c) => c.services);

export const HOMEPAGE_SERVICE_SLUGS = [
  "ai-workflow-automation",
  "ai-chatbots",
  "whatsapp-automation",
  "ai-receptionists",
  "website-development",
  "crm-automation",
  "business-dashboards",
  "seo",
  "custom-ai-solutions",
];

export function getService(slug: string): Service | undefined {
  return ALL_SERVICES.find((s) => s.slug === slug);
}
