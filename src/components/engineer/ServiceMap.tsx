import { useEffect, useRef } from "react";
import {
  careerTrace,
  graphEdges,
  graphNodes,
  type GraphNode,
} from "../../content/engineerGraph";
import type { MotionLevel } from "../../engine/useMotionPreference";

type Props = {
  motion: MotionLevel;
  selected: string | null;
  onSelect: (id: string | null) => void;
  // increment to run the career trace
  traceToken: number;
  onTraceHop: (label: string | null) => void;
};

const PALETTE = {
  bg: "#0c0c0e",
  ink: "#f0ebe1",
  mute: "#8a8490",
  accent: "#e8a020",
  accentSoft: "rgba(232,160,32,0.55)",
  lib: "#8a84a0",
  project: "#6fd3a6",
  edu: "#c8b090",
};

const NODE_COLOR: Record<GraphNode["kind"], string> = {
  org: PALETTE.accent,
  project: PALETTE.project,
  lib: PALETTE.lib,
  edu: PALETTE.edu,
};

type Pulse = {
  edge: number;
  t: number;
  speed: number;
  reverse: boolean;
  trace: boolean;
};

type Cam = { x: number; y: number; tx: number; ty: number };

function makeGlowSprite(color: string, size: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size * 2;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(size, size, 0, size, size, size);
  grad.addColorStop(0, color);
  grad.addColorStop(0.35, color.replace(/[\d.]+\)$/, "0.35)"));
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size * 2, size * 2);
  return c;
}

export default function ServiceMap({ motion, selected, onSelect, traceToken, onTraceHop }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    motion,
    selected,
    hovered: null as string | null,
    pulses: [] as Pulse[],
    bornAt: 0,
    cam: { x: 0, y: 0, tx: 0, ty: 0 } as Cam,
    traceTimers: [] as number[],
    activeTraceEdge: -1,
  });
  stateRef.current.motion = motion;
  stateRef.current.selected = selected;

  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;
  const onTraceHopRef = useRef(onTraceHop);
  onTraceHopRef.current = onTraceHop;

  // Main canvas lifecycle: layout, render loop, pointer handling.
  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const st = stateRef.current;
    st.bornAt = performance.now();

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let staticDirty = true;

    const glowGold = makeGlowSprite("rgba(232,160,32,1)", 48);
    const glowGreen = makeGlowSprite("rgba(111,211,166,1)", 32);
    const glowSlate = makeGlowSprite("rgba(138,132,160,1)", 28);
    const glowSand = makeGlowSprite("rgba(200,176,144,1)", 32);
    const glowFor = (kind: GraphNode["kind"]) =>
      kind === "org" ? glowGold : kind === "project" ? glowGreen : kind === "edu" ? glowSand : glowSlate;

    // On wide screens the hero copy owns the left third; push the graph right.
    const px = (n: { x: number; y: number }) => {
      const padL = w > 900 ? 0.34 : 0.07;
      const padR = w > 900 ? 0.05 : 0.07;
      const padY = 0.09;
      return {
        x: (padL + n.x * (1 - padL - padR)) * w + st.cam.x,
        y: (padY + n.y * (1 - padY * 2)) * h + st.cam.y,
      };
    };

    const nodeById = new Map(graphNodes.map((n) => [n.id, n]));

    const edgeGeom = (i: number) => {
      const e = graphEdges[i];
      const a = px(nodeById.get(e.from)!);
      const b = px(nodeById.get(e.to)!);
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const cx = mx + (-dy / len) * e.bend * Math.min(w, h) * 1.1;
      const cy = my + (dx / len) * e.bend * Math.min(w, h) * 1.1;
      return { a, b, cx, cy };
    };

    const pointOn = (g: ReturnType<typeof edgeGeom>, t: number) => {
      const u = 1 - t;
      return {
        x: u * u * g.a.x + 2 * u * t * g.cx + t * t * g.b.x,
        y: u * u * g.a.y + 2 * u * t * g.cy + t * t * g.b.y,
      };
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      staticDirty = true;
    };

    const appear = (now: number, index: number) => {
      if (st.motion === "none") return 1;
      const t = (now - st.bornAt - index * 90) / 700;
      if (t <= 0) return 0;
      if (t >= 1) return 1;
      return 1 - Math.pow(1 - t, 3);
    };

    const connectedTo = (id: string) =>
      graphEdges.reduce<Set<number>>((acc, e, i) => {
        if (e.from === id || e.to === id) acc.add(i);
        return acc;
      }, new Set());

    const render = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const focus = st.hovered ?? st.selected;
      const focusEdges = focus ? connectedTo(focus) : null;

      // edges
      for (let i = 0; i < graphEdges.length; i++) {
        const e = graphEdges[i];
        const fromIdx = graphNodes.findIndex((n) => n.id === e.from);
        const toIdx = graphNodes.findIndex((n) => n.id === e.to);
        const vis = Math.min(appear(now, fromIdx), appear(now, toIdx));
        if (vis <= 0) continue;
        const g = edgeGeom(i);
        const isFocus = focusEdges?.has(i) ?? false;
        const isTraceActive = st.activeTraceEdge === i;
        const base = e.kind === "route" ? 0.28 : 0.13;
        const alpha = vis * (isTraceActive ? 0.9 : isFocus ? 0.65 : focusEdges ? base * 0.45 : base);
        ctx.strokeStyle =
          e.kind === "route" || isTraceActive
            ? `rgba(232,160,32,${alpha})`
            : `rgba(240,235,225,${alpha})`;
        ctx.lineWidth = e.kind === "route" ? 1.2 : 1;
        ctx.beginPath();
        ctx.moveTo(g.a.x, g.a.y);
        ctx.quadraticCurveTo(g.cx, g.cy, g.b.x, g.b.y);
        ctx.stroke();

        // edge label for focused / active-trace edges
        if ((isFocus || isTraceActive) && w > 700) {
          const m = pointOn(g, 0.5);
          ctx.font = "10px 'JetBrains Mono', monospace";
          ctx.fillStyle = isTraceActive ? PALETTE.accent : `rgba(138,132,144,${Math.min(1, vis)})`;
          ctx.textAlign = "center";
          ctx.fillText(e.label, m.x, m.y - 6);
        }
      }

      // pulses (additive)
      if (st.pulses.length) {
        ctx.globalCompositeOperation = "lighter";
        for (const p of st.pulses) {
          const g = edgeGeom(p.edge);
          const tt = p.reverse ? 1 - p.t : p.t;
          // wake
          for (let k = 0; k < 5; k++) {
            const wt = Math.max(0, tt - k * 0.025);
            const pt = pointOn(g, wt);
            const s = (p.trace ? 26 : 16) * (1 - k * 0.17);
            ctx.globalAlpha = (p.trace ? 0.5 : 0.3) * (1 - k * 0.2);
            ctx.drawImage(glowGold, pt.x - s / 2, pt.y - s / 2, s, s);
          }
          ctx.globalAlpha = 1;
        }
        ctx.globalCompositeOperation = "source-over";
      }

      // nodes
      for (let i = 0; i < graphNodes.length; i++) {
        const n = graphNodes[i];
        const vis = appear(now, i);
        if (vis <= 0) continue;
        const p = px(n);
        const isFocus = focus === n.id;
        const dim = focusEdges && !isFocus && !graphEdges.some((e, ei) => focusEdges.has(ei) && (e.from === n.id || e.to === n.id));
        const color = NODE_COLOR[n.kind];
        const r = n.size * vis * (isFocus ? 1.35 : 1);

        // glow halo
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = vis * (isFocus ? 0.9 : dim ? 0.15 : n.kind === "org" ? 0.55 : 0.35);
        const gs = r * (n.kind === "org" ? 9 : 7);
        ctx.drawImage(glowFor(n.kind), p.x - gs / 2, p.y - gs / 2, gs, gs);
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";

        // core + ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = dim ? "rgba(240,235,225,0.25)" : color;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = dim ? "rgba(240,235,225,0.08)" : `rgba(240,235,225,${0.18 * vis})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // label
        ctx.font = `${n.kind === "org" ? 12 : 10.5}px 'JetBrains Mono', monospace`;
        ctx.textAlign = "left";
        ctx.fillStyle = dim
          ? "rgba(138,132,144,0.35)"
          : isFocus
            ? PALETTE.ink
            : `rgba(240,235,225,${0.78 * vis})`;
        const lx = p.x + r + 9;
        ctx.fillText(n.label, lx, p.y + 3);
        if ((isFocus || n.kind === "org") && !dim) {
          ctx.font = "9.5px 'JetBrains Mono', monospace";
          ctx.fillStyle = `rgba(138,132,144,${0.85 * vis})`;
          ctx.fillText(n.sub, lx, p.y + 16);
        }
      }
    };

    const step = (now: number) => {
      // camera ease
      st.cam.x += (st.cam.tx - st.cam.x) * 0.04;
      st.cam.y += (st.cam.ty - st.cam.y) * 0.04;

      // advance pulses
      for (const p of st.pulses) p.t += p.speed;
      st.pulses = st.pulses.filter((p) => p.t < 1.05);

      // ambient pulses on full motion
      if (st.motion === "full" && Math.random() < 0.012 && st.pulses.length < 6) {
        st.pulses.push({
          edge: Math.floor(Math.random() * graphEdges.length),
          t: 0,
          speed: 0.004 + Math.random() * 0.004,
          reverse: Math.random() < 0.5,
          trace: false,
        });
      }

      render(now);
      if (running) raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || st.motion === "none") return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // static mode: render on demand only
    const renderStatic = () => {
      if (st.motion !== "none") return;
      render(performance.now());
    };

    resize();
    if (st.motion === "none") {
      renderStatic();
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (st.motion === "none") renderStatic();
    });
    ro.observe(wrap);

    // pause loop offscreen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (st.motion === "none") return;
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    // pointer interaction
    const hitTest = (clientX: number, clientY: number): string | null => {
      const rect = canvas.getBoundingClientRect();
      const mx = clientX - rect.left;
      const my = clientY - rect.top;
      let best: string | null = null;
      let bestD = 28;
      for (const n of graphNodes) {
        const p = px(n);
        const d = Math.hypot(p.x - mx, p.y - my);
        if (d < bestD) {
          bestD = d;
          best = n.id;
        }
      }
      return best;
    };

    const onMove = (ev: PointerEvent) => {
      const hit = hitTest(ev.clientX, ev.clientY);
      if (hit !== st.hovered) {
        st.hovered = hit;
        canvas.style.cursor = hit ? "pointer" : "default";
        if (st.motion === "none") renderStatic();
      }
      if (st.motion === "full") {
        const rect = canvas.getBoundingClientRect();
        const nx = (ev.clientX - rect.left) / rect.width - 0.5;
        const ny = (ev.clientY - rect.top) / rect.height - 0.5;
        st.cam.tx = -nx * 14;
        st.cam.ty = -ny * 10;
      }
    };
    const onLeave = () => {
      st.hovered = null;
      st.cam.tx = 0;
      st.cam.ty = 0;
      canvas.style.cursor = "default";
      if (st.motion === "none") renderStatic();
    };
    const onClick = (ev: MouseEvent) => {
      const hit = hitTest(ev.clientX, ev.clientY);
      onSelectRef.current(hit);
      if (st.motion === "none") renderStatic();
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);
    canvas.addEventListener("click", onClick);

    // expose trace runner to the trace effect below via element property
    (canvas as any).__runTrace = () => {
      if (st.motion === "none") return;
      for (const id of st.traceTimers) window.clearTimeout(id);
      st.traceTimers = [];
      const HOP_MS = 1400;
      careerTrace.slice(0, -1).forEach((from, hop) => {
        const to = careerTrace[hop + 1];
        const edgeIdx = graphEdges.findIndex((e) => e.from === from && e.to === to);
        if (edgeIdx < 0) return;
        st.traceTimers.push(
          window.setTimeout(() => {
            st.activeTraceEdge = edgeIdx;
            st.pulses.push({ edge: edgeIdx, t: 0, speed: 1 / (HOP_MS / 16.7), reverse: false, trace: true });
            onTraceHopRef.current(graphEdges[edgeIdx].label);
          }, hop * HOP_MS),
        );
      });
      st.traceTimers.push(
        window.setTimeout(() => {
          st.activeTraceEdge = -1;
          onTraceHopRef.current(null);
        }, (careerTrace.length - 1) * HOP_MS + 600),
      );
    };

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
      for (const id of st.traceTimers) window.clearTimeout(id);
      delete (canvas as any).__runTrace;
    };
    // Recreate the whole scene when the motion level changes; everything else
    // flows through stateRef without re-running this effect.
  }, [motion]);

  // run trace on token change (token 0 = no auto run here; page decides)
  useEffect(() => {
    if (traceToken === 0) return;
    (canvasRef.current as any)?.__runTrace?.();
  }, [traceToken]);

  return (
    <div className="dbg-map" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
