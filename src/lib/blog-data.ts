import { Calendar, Clock, User } from "lucide-react";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  gradient: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-automation-for-small-business",
    title: "How AI Automation Is Quietly Transforming Small Businesses in 2026",
    excerpt:
      "From lead capture to invoicing, small teams are running like enterprises. Here's the playbook we use at Windblow.",
    category: "AI Automation",
    author: "Windblow Team",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    gradient: "from-blue-500/30 via-cyan-500/20 to-transparent",
    content: [
      "Five years ago, automation meant Zapier zaps and brittle scripts. In 2026, a three-person team can run customer support, sales follow-ups, invoicing, and reporting with the same horsepower as a 30-person ops department.",
      "The shift came from three things converging: cheap LLM inference, agent frameworks that can use tools reliably, and integration platforms that finally speak the same language. The result is that the smallest businesses can punch far above their weight.",
      "At Windblow, our default starter stack for a small business is a lead-capture chatbot, a CRM sync, a WhatsApp follow-up sequence, and a weekly KPI digest. That alone reclaims 15-20 hours a week for most founders we work with.",
      "The biggest mistake we still see: automating a broken process. Map your workflow on paper first, fix the obvious leaks, and only then point automation at it. Otherwise you just break things faster.",
    ],
  },
  {
    slug: "whatsapp-automation-india",
    title: "Why WhatsApp Automation Is the Highest-ROI Channel in India",
    excerpt:
      "98% open rates, near-instant replies, and now AI-native flows. WhatsApp is the new email — only better.",
    category: "Marketing",
    author: "Windblow Team",
    date: "Jun 4, 2026",
    readTime: "5 min read",
    gradient: "from-emerald-500/30 via-teal-500/20 to-transparent",
    content: [
      "Email open rates hover around 20%. WhatsApp Business messages clear 90% routinely, and most are read within five minutes. For Indian businesses, that gap is the single biggest unlock left in marketing.",
      "The newest WhatsApp Cloud API features let you trigger flows from CRM events, run AI-generated replies inside a verified template, and hand off to a human seamlessly. Done right, it feels like a thoughtful assistant — not a spammy broadcast.",
      "We typically build three flows first: an inbound enquiry qualifier, a post-purchase follow-up, and a re-engagement sequence for cold leads. Together they usually lift revenue 12-25% within the first quarter.",
    ],
  },
  {
    slug: "ai-chatbots-that-convert",
    title: "AI Chatbots That Actually Convert (And the Ones That Don't)",
    excerpt:
      "The difference between a chatbot that books meetings and one that frustrates customers comes down to four design choices.",
    category: "AI Automation",
    author: "Windblow Team",
    date: "May 28, 2026",
    readTime: "7 min read",
    gradient: "from-violet-500/30 via-purple-500/20 to-transparent",
    content: [
      "Most chatbots fail for the same reason: they try to do too much. A good chatbot has one job — usually qualifying a lead or answering the top 20 questions — and it does that job extremely well.",
      "The four design choices that matter most: a tight knowledge base, an honest fallback (\"let me get a human\"), proactive timing, and a clear next step on every reply. Skip any of those and conversion drops by half.",
      "We A/B tested over 40 chatbot variants for clients last year. The winners all opened with a question, not a greeting. \"What brings you here today?\" outperformed \"Hi! How can I help?\" every single time.",
    ],
  },
  {
    slug: "no-code-vs-custom-ai",
    title: "No-Code Automation vs Custom AI: When to Choose Which",
    excerpt:
      "n8n, Make, and Zapier can take you surprisingly far. Here's where they stop, and where custom AI starts paying off.",
    category: "Technology",
    author: "Windblow Team",
    date: "May 20, 2026",
    readTime: "8 min read",
    gradient: "from-orange-500/30 via-rose-500/20 to-transparent",
    content: [
      "No-code platforms are the right starting point for 80% of automation projects. They're fast to ship, easy to maintain, and visually debuggable. We use n8n internally for almost everything operational.",
      "Custom AI starts paying off when you need: domain-specific reasoning, tight latency budgets, proprietary data integrations, or workflows that handle thousands of events per minute. Below that scale, the engineering cost rarely beats a well-designed no-code flow.",
      "Our rule of thumb: prototype in no-code, prove the value, then port the hot path to custom code only if the numbers demand it. Premature optimization is just as deadly in automation as it is in software.",
    ],
  },
  {
    slug: "seo-in-the-age-of-ai-search",
    title: "SEO in the Age of AI Search: What Changed, What Didn't",
    excerpt:
      "AI Overviews and chat-first search are reshaping organic traffic. The fundamentals still apply — but the playbook needs an update.",
    category: "Marketing",
    author: "Windblow Team",
    date: "May 11, 2026",
    readTime: "6 min read",
    gradient: "from-pink-500/30 via-fuchsia-500/20 to-transparent",
    content: [
      "AI-generated answers now sit above the organic results for most informational queries. Click-through rates on position 1 have fallen, but the value of being cited in the AI answer has risen sharply.",
      "What still works: deep topical authority, original data, fast pages, and clean structured data. What's new: writing for retrieval — short, declarative sentences that LLMs can lift verbatim with attribution.",
      "Brand searches and bottom-of-funnel queries are mostly unaffected. If you're winning on those, AI search is an opportunity, not a threat.",
    ],
  },
  {
    slug: "building-an-ai-receptionist",
    title: "We Built an AI Receptionist for a Dental Clinic. Here's What Happened.",
    excerpt:
      "Voice AI handled 87% of inbound calls in the first month — booking appointments, answering FAQs, and triaging emergencies.",
    category: "Case Study",
    author: "Windblow Team",
    date: "May 2, 2026",
    readTime: "9 min read",
    gradient: "from-sky-500/30 via-indigo-500/20 to-transparent",
    content: [
      "The clinic was losing 30% of after-hours calls to voicemail. We deployed a voice AI receptionist trained on their FAQ, appointment system, and emergency triage protocol.",
      "Month one results: 87% of inbound calls fully handled by AI, average call time 2 minutes 14 seconds, and zero negative reviews mentioning the bot. Bookings rose 22% because the AI could schedule outside business hours.",
      "The hardest part wasn't the AI — it was the integration with their legacy practice management system. Custom AI projects almost always live or die on the integration work, not the model itself.",
    ],
  },
];

export const BLOG_META = { Calendar, Clock, User };
