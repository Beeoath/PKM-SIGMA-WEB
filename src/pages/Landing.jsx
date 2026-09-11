import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  X,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Shield,
  GraduationCap,
  Hexagon,
  Compass,
  Zap,
  Activity,
  Award,
  Layers,
  CheckCircle2
} from "lucide-react";
import { MASCOTS, DISTRICT_ACCENT, CITY_IMG } from "../lib/brand";
import { JusticeLeagueTitle } from "../components/JusticeLeagueTitle";
import { IronManTitle } from "../components/IronManTitle";
import { SigmaBackground } from "../components/SigmaBackground";
import { useLenis } from "../lib/useLenis";

export default function Landing() {
  useLenis();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerTitle, setTrailerTitle] = useState("Official Mission Teaser");
  const [activeMascotKey, setActiveMascotKey] = useState("alpha");

  const currentMascot = MASCOTS[activeMascotKey] || MASCOTS.alpha;

  // Mascot theme colors
  const getThemeColor = () => {
    if (activeMascotKey === "alpha") return { hex: "#00F0FF", rgb: "0, 240, 255" };
    if (activeMascotKey === "beta") return { hex: "#FF007A", rgb: "255, 0, 122" };
    return { hex: "#FFD600", rgb: "255, 214, 0" };
  };
  const theme = getThemeColor();

  const handleOpenTrailer = (title = "Official Mission Teaser") => {
    setTrailerTitle(title);
    setTrailerOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050814] text-slate-100 font-sans selection:bg-[#00f0ff] selection:text-black overflow-x-hidden">
      {/* Dynamic Background Matrix with Original Sigma Colors */}
      <SigmaBackground density={24} glyphs={10} />

      {/* Atmospheric Subtle Ambient Glows (Deep Navy + Cyan + Magenta aura) */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#00f0ff]/10 via-[#241466]/20 to-transparent blur-[120px] rounded-full" />
        <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-[#ff007a]/8 blur-[140px] rounded-full" />
        <div className="absolute top-[70%] -left-40 w-[600px] h-[600px] bg-[#00f0ff]/8 blur-[140px] rounded-full" />
      </div>

      {/* Main Content Layout Container */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-10 space-y-12 sm:space-y-16">

        {/* ========================================================================= */}
        {/* 1. TOP HERO CARD CONTAINER (Exact Layout from Reference Image)           */}
        {/* ========================================================================= */}
        <section
          id="hero-card"
          className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[3rem] border border-white/10 bg-gradient-to-b from-[#0d1630] via-[#090f23] to-[#0d1733] shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
        >
          {/* Subtle Cyber Grid & Light Sheen in Card Background */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(0,240,255,0.12)_0%,transparent_65%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

          {/* --- A. CARD NAVIGATION BAR --- */}
          <nav className="relative z-20 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7">
            {/* Logo / Brand Name */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-display text-lg sm:text-xl font-black uppercase tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                SIGMA
              </span>
            </Link>

            {/* Middle Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-300">
              <a href="#hero-card" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="#posters" className="hover:text-white transition-colors">
                Distrik & Misi
              </a>
              <Link to="/app/hub" className="hover:text-white transition-colors">
                Peta Belajar
              </Link>
              <Link to="/teacher" className="hover:text-amber-400 text-amber-300/90 transition-colors flex items-center gap-1">
                <GraduationCap size={14} /> Portal Guru
              </Link>
            </div>

            {/* Right Action Button (Clean White Pill matching reference) */}
            <Link
              to="/masuk"
              className="inline-flex items-center gap-2.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs px-4 py-2 sm:px-5 sm:py-2.5 shadow-lg shadow-white/10 hover:shadow-white/20 transition-all group"
            >
              <span>Mulai Belajar</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-slate-900 text-white group-hover:bg-[#00f0ff] group-hover:text-black transition-colors">
                <ArrowRight size={12} />
              </span>
            </Link>
          </nav>

          {/* --- B. HERO STAGE (3-Column Layout: Left Headline | Center Hero Character | Right Quote) --- */}
          <div className="relative z-10 px-6 pt-4 pb-10 sm:px-10 sm:pb-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Column: Welcome + Big Title + Numbered Modules */}
              <div className="lg:col-span-5 flex flex-col items-start z-20 order-2 lg:order-1 pr-2">
                <span className="font-mono text-xs font-semibold text-slate-300 tracking-wider">
                  Selamat Datang Di
                </span>

                {/* Main Hero Display Title */}
                <h1 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.4rem] xl:text-[2.75rem] font-black uppercase text-white tracking-tight leading-[1.12] drop-shadow-md">
                  MAS <br />
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 break-words">
                    Darunnajah 9
                  </span>
                </h1>

                {/* 3D Authentic Justice League Title Render Integration */}
                <div className="mt-3.5 w-full max-w-xs sm:max-w-sm origin-left scale-100 sm:scale-105">
                  <JusticeLeagueTitle initialMode="SIGMA" size="md" showControls={false} />
                </div>

                {/* Interactive Mascot Selector Pills */}
                <div className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
                  {Object.entries(MASCOTS).map(([k, m]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setActiveMascotKey(k)}
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition-all ${
                        activeMascotKey === k
                          ? "bg-[#00f0ff] text-slate-950 font-black shadow-md shadow-cyan-400/30"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {m.name.split("-")[0]}
                    </button>
                  ))}
                  <span className="font-mono text-[9px] text-cyan-400/80 pr-1 flex items-center gap-0.5">
                    <Sparkles size={9} /> 3D
                  </span>
                </div>

                {/* Numbered Strip matching #01, #02, #03, #04 from Reference */}
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3.5 border-t border-white/15 pt-4 w-full">
                  <div>
                    <span className="font-mono text-[#00f0ff] font-black text-xs tracking-wider block">#01</span>
                    <span className="font-sans text-white font-semibold text-xs sm:text-[13px] tracking-tight block mt-0.5 drop-shadow-sm">
                      Aljabar Gateway
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[#ffd600] font-black text-xs tracking-wider block">#02</span>
                    <span className="font-sans text-white font-semibold text-xs sm:text-[13px] tracking-tight block mt-0.5 drop-shadow-sm">
                      Menara Fungsi
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[#ff007a] font-black text-xs tracking-wider block">#03</span>
                    <span className="font-sans text-white font-semibold text-xs sm:text-[13px] tracking-tight block mt-0.5 drop-shadow-sm">
                      Dimensi Geometri
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[#c084fc] font-black text-xs tracking-wider block">#04</span>
                    <span className="font-sans text-white font-semibold text-xs sm:text-[13px] tracking-tight block mt-0.5 drop-shadow-sm">
                      Final Kuis TKA
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Column: The Tall Standing Hero Mascot (Standing Tall like Spider-Man) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center relative order-1 lg:order-2">
                {/* Glowing Aura behind Hero */}
                <div
                  className="pointer-events-none absolute w-64 h-80 sm:w-80 sm:h-96 rounded-full blur-3xl opacity-60 transition-colors duration-700"
                  style={{
                    background: `radial-gradient(circle, rgba(${theme.rgb}, 0.55) 0%, transparent 70%)`,
                  }}
                />

                {/* Floating 3D Character Card Frame */}
                <motion.div
                  key={activeMascotKey}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Standing Hero Figure Container */}
                  <div className="relative h-[320px] sm:h-[390px] w-[240px] sm:w-[280px] overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-b from-[#111e42]/80 to-[#070b18]/95 p-2.5 shadow-2xl backdrop-blur-md group">
                    <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[#090e21]">
                      {/* Mascot 3D Image */}
                      <img
                        src={currentMascot.img}
                        alt={currentMascot.name}
                        className="h-full w-full object-cover object-center filter brightness-105 contrast-105 transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Holographic Gradient Overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-white/10 opacity-75" />

                      {/* Top mathematical badge */}
                      <div className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/60 px-2.5 py-0.5 text-[10px] font-mono font-bold text-cyan-300 backdrop-blur-md">
                        {activeMascotKey === "alpha" ? "x² + y² = r²" : activeMascotKey === "beta" ? "△ Vektor 3D" : "P(A) ∩ P(B)"}
                      </div>

                      {/* Bottom Info Banner */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#050814] via-[#050814]/90 to-transparent">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full animate-ping"
                            style={{ backgroundColor: theme.hex }}
                          />
                          <span className="font-display text-xs font-black text-white">
                            {currentMascot.name}
                          </span>
                        </div>
                        <p className="font-mono text-[10px] text-slate-300/90 mt-0.5">
                          {currentMascot.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Motto / Quote (Matching Right Side of Reference) */}
              <div className="lg:col-span-3 flex flex-col items-start lg:items-end text-left lg:text-right z-10 order-3">
                <div className="max-w-xs">
                  <p className="font-display text-sm sm:text-base font-bold text-white leading-snug">
                    &ldquo;Dengan kekuatan logika matematika hadir ketajaman nalar tanpa batas.&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed font-sans">
                    Pahlawan terpilih yang ditakdirkan menuntaskan 5 distrik matematika kelas 11 MA Darunnajah 9 dan membuka gerbang kelulusan TKA.
                  </p>

                  <div className="mt-6 flex flex-col lg:items-end gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold">
                      PROFIL KESIAPAN TKA
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-36 rounded-full bg-slate-800 overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-[#00f0ff] w-[88%]" />
                      </div>
                      <span className="font-mono text-xs font-bold text-cyan-300">88%</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* --- C. DOCKED LOWER FEATURE BAR (Exact Sub-Panel from Reference) --- */}
          <div className="relative z-20 border-t border-white/10 bg-[#091124]/90 px-6 py-4 sm:px-10 sm:py-5 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-300">
              {/* Left text */}
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-[#00f0ff]" />
                <span className="font-display text-xs font-bold tracking-wide text-white uppercase">
                  Featuring Pahlawan Matematika Sigma
                </span>
              </div>

              {/* Badges / Emblems */}
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-[11px]">
                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer" onClick={() => setActiveMascotKey("alpha")}>
                  <Zap size={14} className="text-[#00f0ff]" />
                  <span>Lingkaran Aljabar</span>
                </div>

                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer" onClick={() => setActiveMascotKey("beta")}>
                  <Hexagon size={14} className="text-[#ffd600]" />
                  <span>Hexagon Fungsi</span>
                </div>

                <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer" onClick={() => setActiveMascotKey("gamma")}>
                  <Compass size={14} className="text-[#ff007a]" />
                  <span>Topeng Geometri</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================================= */}
        {/* 2. SECOND SECTION: "THE SIGMA-VERSE" & 3 VERTICAL POSTERS                 */}
        {/* (Exact Replica of Bottom Half of Reference Image)                         */}
        {/* ========================================================================= */}
        <section
          id="posters"
          className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[3rem] border border-white/10 bg-gradient-to-b from-[#0a1226] via-[#070d1d] to-[#0b1428] p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(0,0,0,0.85)]"
        >
          {/* Header Row: Title & Headline on Left | Description & Button on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end border-b border-white/10 pb-8 mb-8">
            {/* Left */}
            <div className="md:col-span-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#00f0ff] block">
                SIGMA
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-white tracking-tight leading-[1.15]">
                Setiap Rumus <br />
                Membuka Gerbang Baru
              </h2>
            </div>

            {/* Right */}
            <div className="md:col-span-6 flex flex-col md:items-end justify-between gap-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed md:text-right max-w-md">
                Petualangan superhero matematika spektakuler yang dipenuhi aksi logika, ketelitian, dan pertempuran konsep kurikulum di seluruh penjuru kota.
              </p>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-slate-400 hidden sm:inline">
                  Tersedia 5 Distrik Pembelajaran
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Trailer Petualangan Distrik Sigma")}
                  className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs px-4 py-2 shadow transition-all group"
                >
                  <span>Watch Trailer</span>
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-slate-900 text-white group-hover:bg-[#00f0ff] group-hover:text-black transition-colors">
                    <Play size={9} fill="white" className="ml-0.5" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 Vertical Movie-Poster Cards (Matching the 3 Spider-Man Posters) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Poster 1: Distrik Aljabar & SPLDV */}
            <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#00f0ff]/50">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=700&auto=format&fit=crop&q=80"
                  alt="Distrik Aljabar"
                  className="h-full w-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/40 to-transparent" />

                {/* Circular Play Button in Center */}
                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Distrik 01: Rahasia Aljabar & Pemfaktoran")}
                  className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/60 border border-white/30 text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-transparent transition-all shadow-xl"
                >
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>

                {/* Top Badge */}
                <span className="absolute top-4 left-4 rounded-full bg-cyan-500/80 px-2.5 py-0.5 font-mono text-[9px] font-black text-black uppercase tracking-wider backdrop-blur-sm">
                  DISTRIK 01 &bull; 15 SOAL
                </span>

                {/* Bottom Content Info */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#00f0ff] font-bold">
                    ALGEBRA GATEWAY
                  </span>
                  <h3 className="font-display text-base font-black uppercase text-white mt-1 group-hover:text-cyan-300 transition-colors">
                    Kebangkitan Sang Pemfaktur
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Kuasai bentuk kuadratik, pemfaktoran aljabar, dan sistem persamaan linear dua variabel.
                  </p>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-400 border-t border-white/10 pt-2">
                    <span>SYARAT: NILAI &ge; 75</span>
                    <Link to="/masuk" className="text-white hover:text-cyan-300 font-bold">
                      BUKA &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster 2: Menara Fungsi & Kota Geometri */}
            <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#ffd600]/50">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=700&auto=format&fit=crop&q=80"
                  alt="Menara Fungsi"
                  className="h-full w-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Distrik 02 & 03: Labirin Fungsi & Geometri")}
                  className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/60 border border-white/30 text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-[#ffd600] group-hover:text-black group-hover:border-transparent transition-all shadow-xl"
                >
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>

                <span className="absolute top-4 left-4 rounded-full bg-amber-400/90 px-2.5 py-0.5 font-mono text-[9px] font-black text-black uppercase tracking-wider backdrop-blur-sm">
                  DISTRIK 02 &bull; FUNCTION TOWER
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#ffd600] font-bold">
                    DOMAIN & INVERS
                  </span>
                  <h3 className="font-display text-base font-black uppercase text-white mt-1 group-hover:text-amber-300 transition-colors">
                    Operasi Komposisi Fungsi
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Petakan domain, range, relasi, dan rumus fungsi invers dalam tantangan bertingkat.
                  </p>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-400 border-t border-white/10 pt-2">
                    <span>SYARAT: DISTRIK 01 LULUS</span>
                    <Link to="/masuk" className="text-white hover:text-amber-300 font-bold">
                      BUKA &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Poster 3: Dimensi Peluang & Analisis Data */}
            <div className="group relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-900 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-[#ff007a]/50">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80"
                  alt="Peluang & Statistika"
                  className="h-full w-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060914] via-[#060914]/40 to-transparent" />

                <button
                  type="button"
                  onClick={() => handleOpenTrailer("Distrik 04 & 05: Takdir Kombinasi & Statistika")}
                  className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-black/60 border border-white/30 text-white backdrop-blur-md group-hover:scale-110 group-hover:bg-[#ff007a] group-hover:text-white group-hover:border-transparent transition-all shadow-xl"
                >
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </button>

                <span className="absolute top-4 left-4 rounded-full bg-pink-500/90 px-2.5 py-0.5 font-mono text-[9px] font-black text-white uppercase tracking-wider backdrop-blur-sm">
                  DISTRIK 04 &bull; MULTIVERSE DATA
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#ff007a] font-bold">
                    PELUANG & STATISTIK
                  </span>
                  <h3 className="font-display text-base font-black uppercase text-white mt-1 group-hover:text-pink-300 transition-colors">
                    Pertarungan Puncak TKA
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                    Permutasi, kombinasi, kaidah pencacahan, serta ukuran pemusatan dan penyebaran data.
                  </p>
                  <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-slate-400 border-t border-white/10 pt-2">
                    <span>KUNCI SERTIFIKAT AKHIR</span>
                    <Link to="/masuk" className="text-white hover:text-pink-300 font-bold">
                      BUKA &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* ========================================================================= */}
        {/* 3. CALL TO ACTION SECTION: "SIAP MASUK?" WITH 3D IRON MAN RENDER         */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden rounded-[2.2rem] sm:rounded-[3rem] border border-white/10 bg-gradient-to-b from-[#0b1530] via-[#080e22] to-[#060a18] p-8 sm:p-14 text-center shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            {/* Preserved 3D Iron Man Render */}
            <div className="w-full flex justify-center mb-6">
              <IronManTitle text="SIAP MASUK?" />
            </div>

            <p className="max-w-xl text-xs sm:text-sm text-slate-300 leading-relaxed">
              Bergabunglah bersama ribuan siswa MA Darunnajah 9. Taklukkan 5 distrik kurikulum matematika,
              raih lencana kejuaraan, dan mantapkan persiapan ujian TKA kelas 11.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-4">
              <Link
                to="/masuk?mode=daftar"
                className="inline-flex items-center gap-2 rounded-full bg-[#00f0ff] hover:bg-cyan-300 text-slate-950 font-black text-xs px-6 py-3 uppercase tracking-wider shadow-lg shadow-cyan-400/30 transition-all"
              >
                DAFTAR SEBAGAI SISWA <ArrowRight size={14} />
              </Link>
              <Link
                to="/masuk?mode=daftar&role=guru"
                className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 font-bold text-xs px-5 py-3 uppercase tracking-wider transition-all"
              >
                <GraduationCap size={15} /> DAFTAR AKUN GURU
              </Link>
              <Link
                to="/masuk"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 hover:bg-black text-white font-bold text-xs px-5 py-3 uppercase tracking-wider transition-all"
              >
                MASUK KE AKUN
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* 4. CONSOLE & STUDIO FOOTER                                               */}
      {/* ========================================================================= */}
      <footer className="relative z-10 border-t border-white/10 bg-[#04060f] px-4 py-10 sm:px-6 text-slate-400 font-mono text-xs">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-display font-black text-sm text-white tracking-tight">
              SIGMA LEAGUE &trade;
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">
              PkM Universitas Pamulang &times; MA Darunnajah 9
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <Link to="/app/hub" className="hover:text-cyan-400 transition-colors">
              Peta Belajar
            </Link>
            <Link to="/app/discussions" className="hover:text-cyan-400 transition-colors">
              Forum
            </Link>
            <Link to="/teacher" className="hover:text-amber-400 text-amber-400 transition-colors font-bold">
              Portal Guru
            </Link>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE MISSION TRAILER MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setTrailerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/20 bg-[#090e21] shadow-2xl"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#060a18] px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-display text-xs font-black uppercase tracking-wider text-white">
                    {trailerTitle}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setTrailerOpen(false)}
                  className="rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video Player Mockup */}
              <div className="relative aspect-video w-full bg-black flex flex-col items-center justify-center p-6 text-center">
                <div className="absolute inset-0 opacity-40">
                  <img
                    src={CITY_IMG}
                    alt="City Teaser"
                    className="h-full w-full object-cover filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090e21] via-black/50 to-transparent" />
                </div>

                <div className="relative z-10 flex flex-col items-center max-w-md">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-[#00f0ff] text-slate-950 shadow-[0_0_30px_rgba(0,240,255,0.7)] animate-pulse">
                    <Play size={24} fill="currentColor" className="ml-1" />
                  </span>
                  <h4 className="mt-4 font-display text-lg font-black uppercase text-white tracking-wide">
                    {trailerTitle}
                  </h4>
                  <p className="mt-2 text-xs text-slate-300">
                    Jelajahi alur modul 5 distrik, selesaikan 15 soal kuis adaptif dalam 20 menit, dan raih nilai di atas 75 untuk membuka gerbang selanjutnya!
                  </p>
                  <Link
                    to="/masuk"
                    onClick={() => setTrailerOpen(false)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-white text-slate-950 font-bold text-xs px-6 py-2.5 shadow hover:bg-slate-200 transition-all"
                  >
                    Mulai Belajar Sekarang &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
