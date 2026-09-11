import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, ShieldCheck, CheckCircle2, Pin, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { INITIAL_DISCUSSIONS, DiscussionThread } from "../lib/sigmaData";
import { Badge } from "../components/Primitives";

export default function TeacherModeration() {
  const [threads, setThreads] = useState<DiscussionThread[]>(INITIAL_DISCUSSIONS);

  const togglePin = (id: string) => {
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isPinned: !t.isPinned } : t))
    );
    toast.success("Status pin berhasil diperbarui!");
  };

  const deleteThread = (id: string) => {
    setThreads((prev) => prev.filter((t) => t.id !== id));
    toast.success("Thread diskusi berhasil dihapus.");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <Badge variant="yellow">
          <ShieldCheck size={12} /> MODERASI FORUM GURU
        </Badge>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl font-black text-white">
          Moderasi & Verifikasi Pertanyaan
        </h1>
        <p className="mt-0.5 text-sm text-slate-400">
          Kelola pertanyaan siswa, sematkan pengumuman penting, dan verifikasi jawaban matematika yang tepat.
        </p>
      </div>

      <div className="space-y-3">
        {threads.map((thr) => (
          <div
            key={thr.id}
            className="rounded-2xl border border-white/10 bg-[#0d1430]/80 p-5 space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded bg-cyan-400/20 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                  {thr.category}
                </span>
                <span className="text-xs text-slate-400">
                  oleh {thr.authorName} ({thr.authorClass})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePin(thr.id)}
                  className={`p-1.5 rounded-lg border text-xs transition-colors ${
                    thr.isPinned
                      ? "border-amber-400 bg-amber-400/20 text-amber-300"
                      : "border-white/10 text-slate-400 hover:text-white"
                  }`}
                  title={thr.isPinned ? "Lepas Pin" : "Sematkan"}
                >
                  <Pin size={14} />
                </button>
                <button
                  onClick={() => deleteThread(thr.id)}
                  className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:border-rose-500 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                  title="Hapus"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <h3 className="text-base font-bold text-white">{thr.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{thr.content}</p>

            <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono text-slate-400">
              <span>{thr.repliesCount} Balasan Siswa</span>
              <Link
                to={`/app/diskusi/${thr.id}`}
                className="text-cyan-400 font-bold hover:underline inline-flex items-center gap-1"
              >
                Buka & Beri Jawaban Guru <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
