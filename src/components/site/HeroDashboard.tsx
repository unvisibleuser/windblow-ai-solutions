import { motion } from "motion/react";
import { Bot, MessageSquare, BarChart3, Workflow, Mail, Zap } from "lucide-react";

const nodes = [
  { icon: Bot, label: "AI Agent", x: "10%", y: "20%", delay: 0 },
  { icon: MessageSquare, label: "WhatsApp", x: "75%", y: "12%", delay: 0.2 },
  { icon: Mail, label: "Gmail", x: "78%", y: "62%", delay: 0.4 },
  { icon: Workflow, label: "Workflow", x: "8%", y: "70%", delay: 0.3 },
];

export function HeroDashboard() {
  return (
    <div className="relative aspect-5/4 w-full">
      {/* Glow */}
      <div className="absolute -inset-3 bg-gradient-brand opacity-17 blur-3xl rounded-full" />

      {/* Main dashboard card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute justify-center inset-6 glass rounded-2xl p-6 shadow-glow overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-chart-4/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-brand/70" />
          </div>
          <div className="text-[10px] text-muted-foreground font-mono">windblow.ai/dashboard</div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Tasks Automated", value: "1,284" },
            { label: "Hours Saved", value: "342" },
            { label: "Active Flows", value: "27" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-lg bg-white/5 border border-border p-3"
            >
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                {s.label}
              </div>
              <div className="text-lg font-semibold text-foreground mt-1 font-display">
                {s.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart area */}
        <div className="rounded-lg bg-white/5 border border-border p-4 mb-4 relative h-32 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-muted-foreground">Workflow Performance</div>
            <div className="text-xs text-brand flex items-center gap-1">
              <BarChart3 className="w-3 h-3" /> +24%
            </div>
          </div>
          <svg viewBox="0 0 300 80" className="w-full h-16">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.18 250)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.72 0.18 250)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
              d="M0,60 C40,55 60,30 100,35 C140,40 160,15 200,20 C240,25 260,10 300,8"
              fill="none"
              stroke="oklch(0.72 0.18 250)"
              strokeWidth="2"
            />
            <path
              d="M0,60 C40,55 60,30 100,35 C140,40 160,15 200,20 C240,25 260,10 300,8 L300,80 L0,80 Z"
              fill="url(#g1)"
            />
          </svg>
        </div>

        {/* Workflow row */}
        <div className="rounded-lg bg-white/5 border border-border p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gradient-brand flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div>
              <div className="text-xs font-medium">Lead Qualification Bot</div>
              <div className="text-[10px] text-muted-foreground">Running · 12 leads today</div>
            </div>
          </div>
          <div className="text-[10px] text-brand">Live</div>
        </div>
      </motion.div>

      {/* Floating nodes */}
      {/* {nodes.map((n) => (
        <motion.div
          key={n.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { delay: n.delay + 0.6, duration: 0.4 },
            scale: { delay: n.delay + 0.6, duration: 0.4 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: n.delay },
          }}
          style={{ left: n.x, top: n.y }}
          className="absolute glass rounded-xl px-3 py-2 flex items-center gap-2 shadow-card z-10"
        >
          <n.icon className="w-4 h-4 text-brand" />
          <span className="text-xs font-medium">{n.label}</span>
        </motion.div>
      ))} */}
    </div>
  );
}
