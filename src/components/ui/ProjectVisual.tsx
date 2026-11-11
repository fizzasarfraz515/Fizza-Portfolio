import { useState } from "react";
import type { VisualKind, VisualTone } from "@/data/projects";

interface Palette {
  bg: string;
  fg: string;
  accent: string;
  muted: string;
}

const tones: Record<VisualTone, Palette> = {
  ink: { bg: "#191A17", fg: "#E9E1D2", accent: "#A5B27F", muted: "#B7AD98" },
  olive: { bg: "#66734B", fg: "#F5F1E8", accent: "#E9E1D2", muted: "#191A17" },
  taupe: { bg: "#B7AD98", fg: "#191A17", accent: "#4E5A38", muted: "#F5F1E8" },
  cream: { bg: "#F5F1E8", fg: "#191A17", accent: "#66734B", muted: "#B7AD98" },
};

const rng = (i: number) => Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;

function Audio({ c }: { c: Palette }) {
  return (
    <g>
      <rect x="58" y="72" width="72" height="104" rx="4" fill="none" stroke={c.fg} strokeWidth="2" />
      {[94, 110, 126, 142, 158].map((y, i) => (
        <line key={y} x1="70" x2={70 + [44, 36, 44, 28, 40][i]} y1={y} y2={y} stroke={c.muted} strokeWidth="3.5" strokeLinecap="round" />
      ))}
      <path d="M142 124 h26 m-8 -9 l9 9 -9 9" fill="none" stroke={c.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {Array.from({ length: 17 }, (_, i) => {
        const h = 18 + Math.abs(Math.sin(i * 0.85 + 1)) * 78;
        return (
          <rect
            key={i}
            className="wave-bar"
            style={{ animationDelay: `${i * 0.07}s` }}
            x={190 + i * 12}
            y={124 - h / 2}
            width="6"
            height={h}
            rx="3"
            fill={i % 3 === 0 ? c.accent : c.fg}
          />
        );
      })}
    </g>
  );
}

function Network({ c }: { c: Palette }) {
  const l1 = [66, 102, 138, 174, 210].map((y) => ({ x: 58, y: y - 24 }));
  const l2 = [84, 130, 176].map((y) => ({ x: 120, y }));
  const hub = { x: 180, y: 130 };
  return (
    <g>
      {l1.flatMap((a, i) =>
        l2.map((b, j) => (
          <line key={`a${i}${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c.muted} strokeOpacity="0.45" />
        )),
      )}
      {l2.map((b, j) => (
        <line key={`b${j}`} x1={b.x} y1={b.y} x2={hub.x} y2={hub.y} stroke={c.muted} strokeOpacity="0.6" />
      ))}
      {l1.map((n, i) => <circle key={`n${i}`} cx={n.x} cy={n.y} r="6" fill={c.fg} />)}
      {l2.map((n, i) => <circle key={`m${i}`} cx={n.x} cy={n.y} r="7" fill={c.fg} />)}
      <circle cx={hub.x} cy={hub.y} r="16" fill={c.accent} />
      <circle cx={hub.x} cy={hub.y} r="24" fill="none" stroke={c.accent} strokeOpacity="0.45" />
      <line x1="206" x2="244" y1="130" y2="130" stroke={c.accent} strokeWidth="2" />
      {[88, 112, 136, 160].map((y, i) => (
        <rect key={y} x="248" y={y - 6} width={[96, 72, 52, 34][i]} height="12" rx="2" fill={i === 0 ? c.accent : c.fg} opacity={i === 0 ? 1 : 0.8} />
      ))}
    </g>
  );
}

function Chat({ c }: { c: Palette }) {
  return (
    <g>
      <rect x="54" y="56" width="176" height="50" rx="14" fill="none" stroke={c.fg} strokeWidth="2" />
      <line x1="70" x2="190" y1="74" y2="74" stroke={c.muted} strokeWidth="4" strokeLinecap="round" />
      <line x1="70" x2="150" y1="90" y2="90" stroke={c.muted} strokeWidth="4" strokeLinecap="round" />
      <rect x="150" y="118" width="196" height="64" rx="14" fill={c.accent} />
      <line x1="168" x2="324" y1="138" y2="138" stroke={c.bg} strokeWidth="4" strokeLinecap="round" />
      <line x1="168" x2="300" y1="154" y2="154" stroke={c.bg} strokeWidth="4" strokeLinecap="round" />
      <line x1="168" x2="262" y1="170" y2="170" stroke={c.bg} strokeWidth="4" strokeLinecap="round" />
      <rect x="54" y="194" width="74" height="32" rx="16" fill={c.fg} opacity="0.9" />
      {[78, 91, 104].map((x, i) => (
        <circle key={x} className="dot-bounce" style={{ animationDelay: `${i * 0.15}s` }} cx={x} cy="210" r="3.5" fill={c.bg} />
      ))}
    </g>
  );
}

function Vision({ c }: { c: Palette }) {
  const corner = (d: string) => <path d={d} fill="none" stroke={c.fg} strokeWidth="3" strokeLinecap="round" />;
  return (
    <g>
      {corner("M70 66 V46 H90")}
      {corner("M330 66 V46 H310")}
      {corner("M70 206 V226 H90")}
      {corner("M330 206 V226 H310")}
      <circle cx="146" cy="146" r="28" fill={c.muted} opacity="0.55" />
      <rect x="226" y="108" width="62" height="86" rx="6" fill={c.muted} opacity="0.55" />
      <rect x="112" y="112" width="68" height="68" fill="none" stroke={c.accent} strokeWidth="3" />
      <rect x="112" y="94" width="44" height="18" fill={c.accent} />
      <rect x="214" y="92" width="86" height="116" fill="none" stroke={c.fg} strokeWidth="3" />
      <rect x="214" y="74" width="40" height="18" fill={c.fg} />
      <line className="scan-line" x1="70" x2="330" y1="46" y2="46" stroke={c.accent} strokeWidth="2.5" />
    </g>
  );
}

function Interview({ c }: { c: Palette }) {
  const label = { fontFamily: '"Manrope Variable", sans-serif', fontWeight: 800 } as const;
  return (
    <g>
      <circle cx="84" cy="86" r="20" fill={c.accent} />
      <text x="84" y="94" textAnchor="middle" fontSize="22" fill={c.bg} style={label}>Q</text>
      <rect x="116" y="64" width="204" height="44" rx="12" fill="none" stroke={c.fg} strokeWidth="2" />
      <line x1="132" x2="290" y1="80" y2="80" stroke={c.muted} strokeWidth="4" strokeLinecap="round" />
      <line x1="132" x2="238" y1="95" y2="95" stroke={c.muted} strokeWidth="4" strokeLinecap="round" />
      <circle cx="316" cy="170" r="20" fill={c.fg} />
      <text x="316" y="178" textAnchor="middle" fontSize="22" fill={c.bg} style={label}>A</text>
      <rect x="80" y="146" width="204" height="48" rx="12" fill={c.fg} />
      <line x1="96" x2="260" y1="162" y2="162" stroke={c.bg} strokeWidth="4" strokeLinecap="round" />
      <line x1="96" x2="214" y1="178" y2="178" stroke={c.bg} strokeWidth="4" strokeLinecap="round" />
    </g>
  );
}

function Flight({ c }: { c: Palette }) {
  return (
    <g>
      <path d="M70 160 Q190 150 330 96" fill="none" stroke={c.muted} strokeOpacity="0.6" strokeWidth="1.5" />
      <path className="dash-flow" d="M70 160 Q200 10 330 96" fill="none" stroke={c.fg} strokeWidth="2.5" strokeDasharray="5 7" strokeLinecap="round" />
      <circle cx="70" cy="160" r="16" fill="none" stroke={c.accent} strokeOpacity="0.5" />
      <circle cx="70" cy="160" r="7" fill={c.accent} />
      <circle cx="330" cy="96" r="16" fill="none" stroke={c.accent} strokeOpacity="0.5" />
      <circle cx="330" cy="96" r="7" fill={c.accent} />
      <path d="M16 0 L-11 -10 L-4 0 L-11 10 Z" transform="translate(200 70) rotate(-14)" fill={c.accent} />
      {Array.from({ length: 14 }, (_, i) => {
        const h = 10 + rng(i + 3) * 34;
        return <rect key={i} x={76 + i * 18} y={236 - h} width="9" height={h} fill={i === 9 ? c.accent : c.muted} opacity={i === 9 ? 1 : 0.7} />;
      })}
    </g>
  );
}

function Forecast({ c }: { c: Palette }) {
  const n = 14;
  const xs = Array.from({ length: n }, (_, i) => 62 + i * 21);
  const hs = Array.from({ length: n }, (_, i) => 36 + i * 4 + Math.sin(i * 0.9) * 14);
  const tops = hs.map((h) => 214 - h);
  const hist = xs.slice(0, 9).map((x, i) => `${x},${tops[i]}`).join(" ");
  const fc = xs.slice(8).map((x, i) => `${x},${tops[i + 8]}`).join(" ");
  const band =
    xs.slice(8).map((x, i) => `${x},${tops[i + 8] - 10 - i * 2}`).join(" ") +
    " " +
    xs.slice(8).map((x, i) => `${x},${tops[i + 8] + 10 + i * 2}`).reverse().join(" ");
  return (
    <g>
      <line x1="48" x2="360" y1="214" y2="214" stroke={c.fg} strokeOpacity="0.5" />
      {xs.map((x, i) => (
        <rect key={x} x={x - 6} y={214 - hs[i]} width="12" height={hs[i]} fill={c.fg} opacity={i < 9 ? 0.28 : 0.14} />
      ))}
      <polygon points={band} fill={c.accent} opacity="0.25" />
      <polyline points={hist} fill="none" stroke={c.fg} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={fc} className="dash-flow" fill="none" stroke={c.accent} strokeWidth="3" strokeDasharray="6 5" strokeLinecap="round" />
      <circle cx={xs[8]} cy={tops[8]} r="5" fill={c.accent} />
    </g>
  );
}

const drawings: Record<VisualKind, (p: { c: Palette }) => JSX.Element> = {
  audio: Audio,
  network: Network,
  chat: Chat,
  vision: Vision,
  interview: Interview,
  flight: Flight,
  forecast: Forecast,
};

interface ProjectVisualProps {
  kind: VisualKind;
  tone: VisualTone;
  image?: string;
  alt?: string;
  className?: string;
}

/** Screenshot when `image` is set, otherwise a custom palette-matched illustration. */
export default function ProjectVisual({ kind, tone, image, alt = "", className = "" }: ProjectVisualProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const c = tones[tone];
  const Drawing = drawings[kind];

  if (image && !imageFailed) {
    return (
      <div className={`overflow-hidden ${className}`} style={{ background: c.bg }}>
        <img
          src={image}
          alt={alt}
          width={800}
          height={520}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: c.bg, color: c.fg }} aria-hidden="true">
      <div className="dot-pattern absolute inset-0 opacity-[0.14]" />
      <svg viewBox="0 0 400 260" className="relative h-full w-full" preserveAspectRatio="xMidYMid meet">
        <Drawing c={c} />
      </svg>
    </div>
  );
}
