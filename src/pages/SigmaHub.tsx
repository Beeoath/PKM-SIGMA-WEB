import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Compass,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  BookOpen,
  ChevronRight,
  Play,
  Shield,
  Target,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { DISTRICTS, MODULES } from "../lib/sigmaData";
import { MASCOTS } from "../lib/brand";
import { Badge, ProgressBar } from "../components/Primitives";

export default function SigmaHub() {
  const { profile } = useAuth();
  const activeModule = MODULES[0];

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-r from-cyan-950/50 via-[#0d1430]/80 to-purple-950/40 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <Badge variant="cyan">
                <Sparkles size={12} /> LEVEL {profile?.level || 1} GUARDIAN
              </Badge>
              <span className="font-mono text-xs text-slate-400">
                {profile?.class_name?.includes("B") || profile?.class_name?.includes("2") ? "Kelas 11 B" : "Kelas 11 A"}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white">
              Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">{profile?.full_name || "Siswa SIGMA"}</span>!
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Jelajahi 5 distrik matematika MA Darunnajah 9, taklukkan soal-soal TKA, dan kumpulkan skor serta lencana pahlawan.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to={`/app/modul/${activeModule.id}`}
                className="btn-sigma"
              >
                <Play size={16} fill="currentColor" />
                Lanjut Belajar: {activeModule.title.split(":")[0]}
              </Link>
              <Link to="/app/peta" className="btn-ghost">
                <Compass size={16} /> Buka Peta Distrik
              </Link>
            </div>
          </div>

          {/* User Progress Stats Card */}
          <div className="w-full md:w-72 rounded-2xl border border-white/10 bg-black/40 p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 font-bold uppercase">Akumulasi XP</span>
              <span className="font-mono text-xs text-cyan-400 font-black">{profile?.xp || 2840} XP</span>
            </div>
            <ProgressBar progress={68} color="#00F0FF" />
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-center">
              <div className="p-2 rounded-xl bg-white/5">
                <div className="font-display text-lg font-black text-white">2 / 5</div>
                <div className="text-[10px] text-slate-400 font-mono">Distrik Selesai</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5">
                <div className="font-display text-lg font-black text-amber-300">85%</div>
                <div className="text-[10px] text-slate-400 font-mono">Akurasi Kuis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Distrik SIGMA Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Target size={20} className="text-cyan-400" /> 5 Distrik Matematika SIGMA
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Setiap distrik dipandu oleh hero guardian dan mencakup modul materi & kuis interaktif.
            </p>
          </div>
          <Link to="/app/peta" className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:underline">
            Lihat Peta Lengkap <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DISTRICTS.map((dist, idx) => {
            const districtModules = MODULES.filter((m) => m.districtId === dist.id);
            const mascot = dist.id <= 2 ? MASCOTS.alpha : dist.id === 3 ? MASCOTS.beta : MASCOTS.gamma;

            return (
              <div
                key={dist.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1326]/70 p-5 shadow-lg transition-all duration-300 hover:border-cyan-400/40 hover:bg-[#111936] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-xl font-mono text-base font-black shadow-md"
                      style={{
                        backgroundColor: `${dist.accent}20`,
                        color: dist.accent,
                        border: `1px solid ${dist.accent}40`,
                      }}
                    >
                      {dist.symbol}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-slate-400">
                      #{idx + 1} DISTRIK
                    </span>
                  </div>

                  <h3 className="font-display text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {dist.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {dist.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-[11px] font-mono text-slate-300">
                    <Shield size={12} style={{ color: dist.accent }} />
                    <span>Guardian: {dist.guardian}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {dist.modulesCount} Modul Tersedia
                  </span>
                  {districtModules.length > 0 ? (
                    <Link
                      to={`/app/modul/${districtModules[0].id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition-all text-slate-200 hover:text-white"
                      style={{ backgroundColor: `${dist.accent}30` }}
                    >
                      Buka <ChevronRight size={14} />
                    </Link>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-mono">Segera Hadir</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
