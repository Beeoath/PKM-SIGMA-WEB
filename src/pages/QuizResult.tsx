import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Award, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { MODULES } from "../lib/sigmaData";
import { useAuth } from "../lib/auth";

export default function QuizResult() {
  const { id } = useParams();
  const { updateProfile, profile } = useAuth();
  const moduleData = MODULES.find((m) => m.id === id) || MODULES[0];

  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(`quiz_result_${moduleData.id}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        setResult(parsed);

        // Award XP if passed
        if (parsed.score >= 60 && profile) {
          updateProfile({
            xp: (profile.xp || 2840) + moduleData.xpReward,
            completed_modules: Array.from(
              new Set([...(profile.completed_modules || []), moduleData.id])
            ),
          });
        }
      }
    } catch {
      // ignore
    }
  }, [moduleData.id]);

  const score = result?.score ?? 100;
  const isPassed = score >= 60;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="rounded-3xl border border-white/15 bg-[#0d1430]/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-5">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/40 text-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.3)]">
          <Award size={40} />
        </div>

        <div>
          <span className="font-mono text-xs uppercase font-bold text-slate-400">
            Hasil Uji Pemahaman
          </span>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl font-black text-white">
            {isPassed ? "Distrik Berhasil Dikuasai!" : "Perlu Belajar Lagi"}
          </h1>
        </div>

        <div className="py-2">
          <div className="font-display text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-400">
            {score}
          </div>
          <p className="font-mono text-xs text-slate-400 mt-2">
            Nilai Akhir • {isPassed ? "LULUS KKM (Tuntas)" : "Belum Mencapai KKM"}
          </p>
        </div>

        {isPassed && (
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 font-mono text-xs font-bold text-amber-300">
            <Sparkles size={14} /> +{moduleData.xpReward} XP Ditambahkan ke Akun!
          </div>
        )}

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Link to={`/app/kuis/${moduleData.id}`} className="btn-ghost border border-white/15">
            <RotateCcw size={15} /> Coba Lagi
          </Link>
          <Link to="/app" className="btn-sigma">
            Kembali ke Hub <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Question Explanations */}
      <div className="space-y-4">
        <h3 className="font-display text-base font-bold text-white">Pembahasan Soal Kuis</h3>
        {moduleData.quiz.map((q, idx) => {
          const userAns = result?.selectedAnswers?.[idx];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="rounded-2xl border border-white/10 bg-[#0a0f24]/70 p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs font-bold text-slate-400">Soal #{idx + 1}</span>
                {isCorrect ? (
                  <span className="flex items-center gap-1 font-mono text-xs text-emerald-400 font-bold">
                    <CheckCircle2 size={14} /> Benar
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-mono text-xs text-rose-400 font-bold">
                    <XCircle size={14} /> Salah
                  </span>
                )}
              </div>
              <p className="text-sm text-white font-medium">{q.question}</p>
              <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-3 text-xs text-slate-300 space-y-1">
                <strong className="text-cyan-400 block font-mono">Penjelasan Jawaban:</strong>
                <p>{q.explanation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
