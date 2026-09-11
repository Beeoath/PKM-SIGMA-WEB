import React, { useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle, ChevronLeft, ChevronRight, HelpCircle, Play } from "lucide-react";
import { MODULES } from "../lib/sigmaData";
import { ProgressBar } from "../components/Primitives";

export default function Material() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const initialSlide = parseInt(searchParams.get("slide") || "0", 10);
  
  const moduleData = MODULES.find((m) => m.id === id) || MODULES[0];
  const [currentSlideIdx, setCurrentSlideIdx] = useState(
    initialSlide >= 0 && initialSlide < moduleData.slides.length ? initialSlide : 0
  );
  const [showSolution, setShowSolution] = useState(false);

  const slide = moduleData.slides[currentSlideIdx];
  const progress = ((currentSlideIdx + 1) / moduleData.slides.length) * 100;
  const isLast = currentSlideIdx === moduleData.slides.length - 1;

  const nextSlide = () => {
    if (!isLast) {
      setCurrentSlideIdx((prev) => prev + 1);
      setShowSolution(false);
    }
  };

  const prevSlide = () => {
    if (currentSlideIdx > 0) {
      setCurrentSlideIdx((prev) => prev - 1);
      setShowSolution(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5 py-4 sm:py-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/app/dashboard"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft size={16} /> Keluar Materi
        </Link>
        <span className="font-mono text-xs text-slate-400 font-bold">
          Slide {currentSlideIdx + 1} dari {moduleData.slides.length}
        </span>
      </div>

      {/* Progress Bar - Matching Image 2 */}
      <div className="w-full h-1.5 bg-[#14192b] rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-cyan-400 rounded-full shadow-[0_0_12px_#00f0ff] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slide Card - Matching Image 2 */}
      <div className="rounded-3xl border border-cyan-500/20 bg-[#0c1226]/90 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl space-y-6">
        <div>
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            {moduleData.title.split(":")[0]}
          </span>
          <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-black text-white">
            {slide.title}
          </h2>
        </div>

        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
          {slide.content}
        </p>

        {/* Formula Box if available */}
        {slide.formula && (
          <div className="rounded-2xl border border-cyan-500/30 bg-[#091326] p-5 text-center shadow-inner">
            <span className="font-mono text-[11px] text-cyan-400 uppercase font-bold tracking-wider block mb-2">
              RUMUS KUNCI
            </span>
            <div className="font-mono text-base sm:text-lg font-bold text-white tracking-wide">
              {slide.formula}
            </div>
          </div>
        )}

        {/* Example Problem if available */}
        {slide.exampleProblem && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
              <HelpCircle size={14} /> Contoh Soal Pemahaman:
            </div>
            <p className="text-sm text-slate-200 font-medium">
              {slide.exampleProblem}
            </p>

            {showSolution ? (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-200 space-y-1">
                <span className="font-bold block text-emerald-400">Penyelesaian:</span>
                <p>{slide.solution}</p>
              </div>
            ) : (
              <button
                onClick={() => setShowSolution(true)}
                className="text-xs font-bold text-cyan-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Lihat Pembahasan Lengkap
              </button>
            )}
          </div>
        )}

        {/* Key Takeaways */}
        {slide.keyTakeaways && (
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <span className="font-mono text-xs font-bold text-slate-400 uppercase">
              POIN PENTING:
            </span>
            <ul className="space-y-2">
              {slide.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom Slide Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <button
            onClick={prevSlide}
            disabled={currentSlideIdx === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} /> Sebelumnya
          </button>

          {isLast ? (
            <Link
              to={`/app/kuis/${moduleData.id}`}
              className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all cursor-pointer"
            >
              Uji Pemahaman (Kuis) <Play size={15} fill="currentColor" />
            </Link>
          ) : (
            <button
              onClick={nextSlide}
              className="inline-flex items-center gap-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-6 py-2.5 rounded-2xl shadow-[0_0_25px_rgba(0,240,255,0.45)] transition-all cursor-pointer"
            >
              Lanjut <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
