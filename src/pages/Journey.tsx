import React from "react";
import { Link } from "react-router-dom";
import { Compass, CheckCircle2, Lock, ArrowRight, Star, Shield } from "lucide-react";
import { DISTRICTS, MODULES } from "../lib/sigmaData";
import { Badge } from "../components/Primitives";

export default function Journey() {
  return (
    <div className="space-y-8">
      <div>
        <Badge variant="cyan">
          <Compass size={12} /> PETA PERJALANAN SIGMA
        </Badge>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl font-black text-white">
          Roadmap Matematika Kelas 11
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Selesaikan modul di setiap distrik secara berurutan untuk mempersiapkan diri menghadapi Tes Kemampuan Akademik (TKA).
        </p>
      </div>

      {/* Interactive Path Flow */}
      <div className="space-y-6 relative">
        {/* Connecting line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 hidden sm:block opacity-30" />

        {DISTRICTS.map((dist, idx) => {
          const isUnlocked = idx <= 2;
          const isCompleted = idx === 0;
          const districtModules = MODULES.filter((m) => m.districtId === dist.id);

          return (
            <div
              key={dist.id}
              className={`relative rounded-2xl border p-5 sm:p-6 transition-all ${
                isUnlocked
                  ? "border-white/15 bg-[#0d1430]/80 shadow-xl"
                  : "border-white/5 bg-[#0a0d1d]/40 opacity-60"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-mono text-lg font-black shadow-lg"
                    style={{
                      backgroundColor: isUnlocked ? `${dist.accent}25` : "rgba(255,255,255,0.05)",
                      color: isUnlocked ? dist.accent : "#64748b",
                      border: `1px solid ${isUnlocked ? `${dist.accent}50` : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={22} className="text-emerald-400" /> : dist.symbol}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        DISTRIK 0{dist.id}
                      </span>
                      {isCompleted && (
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 font-mono">
                          SELESAI
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-400 font-mono flex items-center gap-1">
                          <Lock size={10} /> TERKUNCI
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mt-0.5">
                      {dist.name}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-xl mt-1">
                      {dist.tagline} • Guardian: <strong className="text-slate-200">{dist.guardian}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {districtModules.length > 0 && isUnlocked ? (
                    <Link
                      to={`/app/modul/${districtModules[0].id}`}
                      className="btn-sigma !py-2 !px-4 !text-xs"
                    >
                      Buka Distrik <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button disabled className="btn-ghost !text-xs !cursor-not-allowed opacity-50">
                      {isUnlocked ? "Materi Dalam Penyusunan" : "Kunci Terbuka Nanti"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
