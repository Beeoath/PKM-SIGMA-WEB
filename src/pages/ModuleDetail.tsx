import React from "react";
import { useParams, Link } from "react-router-dom";
import { BookOpen, Play, CheckCircle, ArrowLeft, Clock, Zap, Shield } from "lucide-react";
import { MODULES } from "../lib/sigmaData";
import { Badge } from "../components/Primitives";

export default function ModuleDetail() {
  const { id } = useParams();
  const moduleData = MODULES.find((m) => m.id === id) || MODULES[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Link to="/app" className="btn-ghost !px-0">
        <ArrowLeft size={16} /> Kembali ke Hub
      </Link>

      <div className="rounded-3xl border border-white/15 bg-[#0d1430]/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
        <Badge variant="cyan">{moduleData.districtName}</Badge>

        <h1 className="mt-3 font-display text-2xl sm:text-4xl font-black text-white leading-tight">
          {moduleData.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300">
          {moduleData.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-y border-white/10 py-3">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-cyan-400" /> {moduleData.durationMinutes} Menit
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Zap size={14} className="text-amber-400" /> +{moduleData.xpReward} XP Reward
          </span>
          <span>•</span>
          <span>{moduleData.slides.length} Slide Teori</span>
          <span>•</span>
          <span>{moduleData.quiz.length} Soal Uji Pemahaman</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to={`/app/materi/${moduleData.id}`}
            className="btn-sigma"
          >
            <Play size={16} fill="currentColor" />
            Mulai Belajar Materi
          </Link>
          <Link
            to={`/app/kuis/${moduleData.id}`}
            className="btn-ghost border border-white/15"
          >
            Langsung Uji Kuis
          </Link>
        </div>
      </div>

      {/* Curriculum breakdown */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-white">Sub-Topik Pembelajaran</h3>
        <div className="space-y-2.5">
          {moduleData.slides.map((s, idx) => (
            <div
              key={s.id}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0f24]/60 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-400/10 font-mono text-xs font-bold text-cyan-300">
                  {idx + 1}
                </span>
                <span className="text-sm font-semibold text-white">{s.title}</span>
              </div>
              <Link
                to={`/app/materi/${moduleData.id}?slide=${idx}`}
                className="text-xs font-mono font-bold text-cyan-400 hover:underline"
              >
                Baca Slide
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
