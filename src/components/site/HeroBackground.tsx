import { useEffect, useRef } from "react";

/**
 * Animated hero background: "Wind of Automation".
 * Canvas-rendered for 60fps performance.
 *  - Background layer: slow constellation network
 *  - Middle layer: workflow nodes + automation pulses traveling along edges
 *  - Foreground layer: wind streams + drifting particles
 * Reacts to cursor: nearby nodes brighten, particles displace.
 */
export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ---------- Layer 1: Background constellation ----------
    type BgNode = { x: number; y: number; vx: number; vy: number; r: number; phase: number };
    const bgCount = Math.min(140, Math.floor((width * height) / 11000));
    const bgNodes: BgNode[] = Array.from({ length: bgCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.04,
      r: Math.random() * 1.1 + 0.3,
      phase: Math.random() * Math.PI * 2,
    }));

    // ---------- Layer 2: Workflow nodes ----------
    type WfNode = { x: number; y: number; bx: number; by: number; r: number; phase: number; core?: boolean };
    const wfNodes: WfNode[] = [];

    // Central core cluster
    const cx = width * 0.5;
    const cy = height * 0.55;
    const coreCount = 22;
    for (let i = 0; i < coreCount; i++) {
      const a = (i / coreCount) * Math.PI * 2 + Math.random() * 0.4;
      const rad = 40 + Math.random() * 110;
      const x = cx + Math.cos(a) * rad;
      const y = cy + Math.sin(a) * rad * 0.55;
      wfNodes.push({ x, y, bx: x, by: y, r: 1.6 + Math.random() * 1.2, phase: Math.random() * 6.28, core: true });
    }
    // Scattered nodes
    const scatterCount = Math.min(70, Math.floor((width * height) / 22000));
    for (let i = 0; i < scatterCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      wfNodes.push({ x, y, bx: x, by: y, r: 1.2 + Math.random() * 1.0, phase: Math.random() * 6.28 });
    }

    // Build edges (k-nearest with distance cap)
    type Edge = { a: number; b: number; len: number };
    const edges: Edge[] = [];
    const maxDist = Math.min(width, height) * 0.22;
    for (let i = 0; i < wfNodes.length; i++) {
      const neighbors: { idx: number; d: number }[] = [];
      for (let j = 0; j < wfNodes.length; j++) {
        if (i === j) continue;
        const dx = wfNodes[i].x - wfNodes[j].x;
        const dy = wfNodes[i].y - wfNodes[j].y;
        const d = Math.hypot(dx, dy);
        if (d < maxDist) neighbors.push({ idx: j, d });
      }
      neighbors.sort((a, b) => a.d - b.d);
      for (const n of neighbors.slice(0, 3)) {
        if (n.idx > i) edges.push({ a: i, b: n.idx, len: n.d });
      }
    }
    // Bonus: streams from edges to core
    const coreIdxs = wfNodes.map((n, i) => (n.core ? i : -1)).filter((i) => i >= 0);
    for (let i = 0; i < wfNodes.length; i++) {
      if (wfNodes[i].core) continue;
      // connect to a random core node if close-ish
      const nearestCore = coreIdxs.reduce(
        (best, ci) => {
          const d = Math.hypot(wfNodes[i].x - wfNodes[ci].x, wfNodes[i].y - wfNodes[ci].y);
          return d < best.d ? { ci, d } : best;
        },
        { ci: -1, d: Infinity },
      );
      if (nearestCore.ci >= 0 && nearestCore.d < width * 0.45 && Math.random() < 0.35) {
        edges.push({ a: i, b: nearestCore.ci, len: nearestCore.d });
      }
    }

    // Automation pulses traveling along edges
    type Pulse = { edge: number; t: number; speed: number; life: number };
    const pulses: Pulse[] = [];
    const spawnPulse = () => {
      if (edges.length === 0) return;
      // Favor edges connecting to core
      let edgeIdx = Math.floor(Math.random() * edges.length);
      for (let tries = 0; tries < 3; tries++) {
        const e = edges[edgeIdx];
        if (wfNodes[e.a].core || wfNodes[e.b].core) break;
        edgeIdx = Math.floor(Math.random() * edges.length);
      }
      pulses.push({ edge: edgeIdx, t: 0, speed: 0.004 + Math.random() * 0.006, life: 1 });
    };

    // ---------- Layer 3: Wind streams ----------
    type Stream = {
      y: number;
      amp: number;
      freq: number;
      speed: number;
      phase: number;
      hue: number;
      alpha: number;
    };
    const streamCount = 24;
    const streams: Stream[] = Array.from({ length: streamCount }, (_, i) => ({
      y: (i / streamCount) * height + Math.random() * 30,
      amp: 18 + Math.random() * 60,
      freq: 0.003 + Math.random() * 0.006,
      speed: 0.3 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2,
      hue: 200 + Math.random() * 40, // cyan→blue
      alpha: 0.05 + Math.random() * 0.12,
    }));

    // Drifting particles
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    const particleCount = Math.min(280, Math.floor((width * height) / 6000));
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0.2 + Math.random() * 0.8,
      vy: (Math.random() - 0.5) * 0.15,
      r: Math.random() * 1.4 + 0.2,
      a: 0.2 + Math.random() * 0.5,
    }));

    // Colors
    const COL = {
      bgLine: "rgba(120, 160, 220, ",
      bgNode: "rgba(180, 210, 255, ",
      wfLine: "rgba(110, 170, 255, ",
      wfNode: "rgba(170, 220, 255, ",
      core: "rgba(140, 200, 255, ",
      pulse: "rgba(180, 230, 255, ",
      stream: "rgba(120, 200, 255, ",
      particle: "rgba(200, 230, 255, ",
      violet: "rgba(170, 140, 255, ",
    };

    let lastPulse = 0;
    let t0 = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(40, now - t0);
      t0 = now;
      const time = now * 0.001;

      // Clear (transparent so section gradient shows through)
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // ===== Layer 1: Background constellation =====
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < bgNodes.length; i++) {
        const n = bgNodes[i];
        n.x += n.vx * dt * 0.05;
        n.y += n.vy * dt * 0.05;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
        const pulse = 0.5 + 0.5 * Math.sin(time * 0.8 + n.phase);
        const a = 0.12 + pulse * 0.18;
        ctx.fillStyle = COL.bgNode + a + ")";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // Thin connections (every-other for perf)
      ctx.lineWidth = 0.4;
      for (let i = 0; i < bgNodes.length; i += 1) {
        for (let j = i + 1; j < bgNodes.length; j += 2) {
          const a = bgNodes[i];
          const b = bgNodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const al = (1 - d2 / 9000) * 0.08;
            ctx.strokeStyle = COL.bgLine + al + ")";
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // ===== Layer 2: Workflow constellation =====
      // Mouse displacement for nodes (gentle spring)
      for (let i = 0; i < wfNodes.length; i++) {
        const n = wfNodes[i];
        const dx = mouse.x - n.bx;
        const dy = mouse.y - n.by;
        const d = Math.hypot(dx, dy);
        const influence = mouse.active && d < 180 ? (1 - d / 180) * 14 : 0;
        const tx = n.bx + (influence ? (dx / d) * influence : 0);
        const ty = n.by + (influence ? (dy / d) * influence : 0);
        n.x += (tx - n.x) * 0.08;
        n.y += (ty - n.y) * 0.08;
      }

      // Edges
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < edges.length; i++) {
        const e = edges[i];
        const a = wfNodes[e.a];
        const b = wfNodes[e.b];
        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const distToMouse = mouse.active ? Math.hypot(mouse.x - mx, mouse.y - my) : Infinity;
        const boost = distToMouse < 200 ? (1 - distToMouse / 200) * 0.25 : 0;
        const al = 0.05 + boost;
        ctx.strokeStyle = COL.wfLine + al + ")";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Pulses
      if (now - lastPulse > 380 && pulses.length < 14) {
        spawnPulse();
        lastPulse = now;
      }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.t += p.speed * (dt / 16);
        if (p.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }
        const e = edges[p.edge];
        if (!e) {
          pulses.splice(i, 1);
          continue;
        }
        const a = wfNodes[e.a];
        const b = wfNodes[e.b];
        // Highlight edge
        ctx.strokeStyle = COL.pulse + 0.35 + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
        ctx.lineWidth = 0.5;
        // Pulse head
        const hx = a.x + (b.x - a.x) * p.t;
        const hy = a.y + (b.y - a.y) * p.t;
        const grad = ctx.createRadialGradient(hx, hy, 0, hx, hy, 14);
        grad.addColorStop(0, "rgba(200, 240, 255, 0.9)");
        grad.addColorStop(0.4, "rgba(140, 200, 255, 0.4)");
        grad.addColorStop(1, "rgba(140, 200, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(hx, hy, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodes
      for (let i = 0; i < wfNodes.length; i++) {
        const n = wfNodes[i];
        const breath = 0.5 + 0.5 * Math.sin(time * 1.2 + n.phase);
        const a = (n.core ? 0.45 : 0.3) + breath * 0.25;
        ctx.fillStyle = (n.core ? COL.core : COL.wfNode) + a + ")";
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + (n.core ? breath * 0.6 : 0), 0, Math.PI * 2);
        ctx.fill();
      }

      // Core glow (breathing)
      const breath = 0.5 + 0.5 * Math.sin(time * 0.6);
      const coreR = 180 + breath * 40;
      const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      cg.addColorStop(0, `rgba(120, 180, 255, ${0.18 + breath * 0.1})`);
      cg.addColorStop(0.5, "rgba(120, 180, 255, 0.05)");
      cg.addColorStop(1, "rgba(120, 180, 255, 0)");
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // Violet accent glow
      const vg = ctx.createRadialGradient(width * 0.8, height * 0.2, 0, width * 0.8, height * 0.2, 260);
      vg.addColorStop(0, "rgba(150, 110, 230, 0.12)");
      vg.addColorStop(1, "rgba(150, 110, 230, 0)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      ctx.restore();

      // ===== Layer 3: Wind streams =====
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let s = 0; s < streams.length; s++) {
        const st = streams[s];
        st.phase += st.speed * 0.01 * (dt / 16);
        ctx.beginPath();
        const step = 14;
        for (let x = -20; x <= width + 20; x += step) {
          const y =
            st.y +
            Math.sin(x * st.freq + st.phase) * st.amp +
            Math.sin(x * st.freq * 2.3 + st.phase * 1.6) * (st.amp * 0.25);
          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, "rgba(120, 200, 255, 0)");
        grad.addColorStop(0.5, `rgba(120, 200, 255, ${st.alpha})`);
        grad.addColorStop(1, "rgba(120, 200, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      // Particles
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // Mouse repel
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 8000 && d2 > 0.1) {
            const f = (1 - d2 / 8000) * 0.6;
            const d = Math.sqrt(d2);
            p.vx += (dx / d) * f * 0.1;
            p.vy += (dy / d) * f * 0.1;
          }
        }
        p.x += p.vx * (dt / 16);
        p.y += p.vy * (dt / 16);
        // Damping back to drift
        p.vx += (0.5 - p.vx) * 0.01;
        p.vy += (0 - p.vy) * 0.02;
        if (p.x > width + 20) p.x = -20;
        if (p.x < -30) p.x = width + 20;
        if (p.y > height + 20) p.y = -20;
        if (p.y < -20) p.y = height + 20;
        ctx.fillStyle = COL.particle + p.a + ")";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      if (!prefersReduced) rafId = requestAnimationFrame(draw);
    };

    if (prefersReduced) {
      draw(performance.now());
    } else {
      rafId = requestAnimationFrame(draw);
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
