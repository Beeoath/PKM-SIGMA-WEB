import React, { useState } from "react";
import { Layers, Plus, Edit, Trash2, BookOpen, Clock, Zap, Check } from "lucide-react";
import { toast } from "sonner";
import { MODULES, DISTRICTS, SigmaModule } from "../lib/sigmaData";
import { Badge } from "../components/Primitives";

export default function TeacherContent() {
  const [modulesList, setModulesList] = useState<SigmaModule[]>(MODULES);
  const [selectedDistrict, setSelectedDistrict] = useState<number>(0);

  const filtered = selectedDistrict === 0
    ? modulesList
    : modulesList.filter((m) => m.districtId === selectedDistrict);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="yellow">
            <Layers size={12} /> BANK MATERI & KURIKULUM
          </Badge>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-black text-white">
            Kelola Modul Pembelajaran SIGMA
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Atur materi slide teori, bank soal kuis, dan bobot XP untuk siswa Kelas 11 MA Darunnajah 9.
          </p>
        </div>

        <button
          onClick={() => toast.info("Fitur penambahan modul dibuka pada semester ganjil mendatang.")}
          className="btn-sigma !bg-amber-400 !text-slate-950 !shadow-[0_0_20px_rgba(251,191,36,0.4)] text-xs self-start sm:self-auto"
        >
          <Plus size={16} /> Buat Modul Baru
        </button>
      </div>

      {/* District Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setSelectedDistrict(0)}
          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
            selectedDistrict === 0
              ? "bg-white/15 text-white"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Semua Distrik ({modulesList.length})
        </button>
        {DISTRICTS.map((d) => (
          <button
            key={d.id}
            onClick={() => setSelectedDistrict(d.id)}
            className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
              selectedDistrict === d.id
                ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {d.name.split("&")[0]}
          </button>
        ))}
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {filtered.map((mod) => (
          <div
            key={mod.id}
            className="rounded-2xl border border-white/10 bg-[#0d1430]/80 p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                {mod.districtName}
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-white">
                {mod.title}
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                {mod.description}
              </p>
              <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {mod.durationMinutes} Menit
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Zap size={12} /> +{mod.xpReward} XP
                </span>
                <span>•</span>
                <span>{mod.slides.length} Slide</span>
                <span>•</span>
                <span>{mod.quiz.length} Soal Kuis</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => toast.success("Materi siap dipublikasikan ke siswa.")}
                className="btn-ghost border border-white/10 text-xs"
              >
                <Edit size={14} /> Edit Materi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
