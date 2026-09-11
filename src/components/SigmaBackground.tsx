import React, { useMemo } from "react";

interface SigmaBackgroundProps {
  density?: number;
  glyphs?: number;
  className?: string;
}

const MATHEMATICAL_SYMBOLS = ["Σ", "∫", "π", "∞", "√", "Δ", "λ", "θ", "∂", "α", "β", "f(x)"];

export const SigmaBackground: React.FC<SigmaBackgroundProps> = ({
  density = 24,
  glyphs = 10,
  className = "",
}) => {
  const particles = useMemo(() => {
    return Array.from({ length: density }, (_, i) => ({
      id: `p-${i}`,
      x: (i * 100) / density + ((i * 13) % 7) - 3,
      y: ((i * 17 + 5) % 100),
      size: (i % 3) + 1.5,
      opacity: 0.15 + (i % 5) * 0.08,
      duration: 15 + (i % 10) * 2,
    }));
  }, [density]);

  const glyphList = useMemo(() => {
    return Array.from({ length: glyphs }, (_, i) => ({
      id: `g-${i}`,
      symbol: MATHEMATICAL_SYMBOLS[i % MATHEMATICAL_SYMBOLS.length],
      x: (i * 90) / glyphs + 5,
      y: ((i * 23 + 11) % 85) + 5,
      size: 14 + (i % 4) * 6,
      opacity: 0.08 + (i % 3) * 0.05,
      color: i % 2 === 0 ? "rgba(0, 240, 255, " : "rgba(255, 214, 0, ",
    }));
  }, [glyphs]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 overflow-hidden z-0 bg-[#070913] ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Gradient Meshes */}
      <div className="absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-cyan-600/10 blur-[130px]" />
      <div className="absolute top-1/3 -right-20 h-[600px] w-[600px] rounded-full bg-indigo-900/15 blur-[140px]" />
      <div className="absolute -bottom-20 left-1/3 h-[500px] w-[500px] rounded-full bg-fuchsia-900/10 blur-[140px]" />

      {/* Cyber Grid Lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient Math Glyphs */}
      {glyphList.map((g) => (
        <span
          key={g.id}
          className="absolute font-mono font-bold select-none"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            fontSize: `${g.size}px`,
            color: `${g.color}${g.opacity})`,
            textShadow: "0 0 12px rgba(0,240,255,0.2)",
          }}
        >
          {g.symbol}
        </span>
      ))}

      {/* Ambient Star / Energy Dust */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-cyan-300"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            boxShadow: "0 0 6px rgba(0, 240, 255, 0.6)",
          }}
        />
      ))}
    </div>
  );
};
