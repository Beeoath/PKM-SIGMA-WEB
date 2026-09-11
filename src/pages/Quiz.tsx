import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, HelpCircle, Send } from "lucide-react";
import { MODULES } from "../lib/sigmaData";
import { ProgressBar } from "../components/Primitives";

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moduleData = MODULES.find((m) => m.id === id) || MODULES[0];
  const questions = moduleData.quiz;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const q = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;
  const isLast = currentIdx === questions.length - 1;

  const handleSelect = (optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleSubmit = () => {
    // Calculate final score
    let correctCount = 0;
    questions.forEach((question, idx) => {
      if (selectedAnswers[idx] === question.correctAnswer) {
        correctCount += 1;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    sessionStorage.setItem(
      `quiz_result_${moduleData.id}`,
      JSON.stringify({
        score,
        correctCount,
        total: questions.length,
        selectedAnswers,
        completedAt: new Date().toISOString(),
      })
    );

    navigate(`/app/hasil-kuis/${moduleData.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to={`/app/modul/${moduleData.id}`} className="btn-ghost !px-0">
          <ArrowLeft size={16} /> Batal Kuis
        </Link>
        <span className="font-mono text-xs text-slate-400 font-bold">
          Soal {currentIdx + 1} dari {questions.length}
        </span>
      </div>

      <ProgressBar progress={progress} color="#00F0FF" />

      <div className="rounded-3xl border border-white/15 bg-[#0d1430]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        <div>
          <span className="font-mono text-[11px] text-cyan-400 uppercase font-bold tracking-wider">
            {moduleData.title}
          </span>
          <h2 className="mt-2 text-base sm:text-lg font-bold text-white leading-relaxed">
            {q.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentIdx] === optIdx;
            const letters = ["A", "B", "C", "D", "E"];

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelect(optIdx)}
                className={`w-full text-left flex items-center gap-3.5 p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "border-cyan-400 bg-cyan-400/15 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold ${
                    isSelected
                      ? "bg-cyan-400 text-slate-950 font-black"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  {letters[optIdx]}
                </span>
                <span className="text-sm font-medium">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Sebelumnya
          </button>

          {isLast ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={selectedAnswers[currentIdx] === undefined}
              className="btn-sigma disabled:opacity-40"
            >
              <Send size={15} /> Selesaikan Kuis
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentIdx((prev) => prev + 1)}
              disabled={selectedAnswers[currentIdx] === undefined}
              className="btn-sigma disabled:opacity-40"
            >
              Soal Selanjutnya
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
