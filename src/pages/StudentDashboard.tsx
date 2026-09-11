import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Home,
  Bookmark,
  BookOpen,
  MessageSquare,
  User,
  Settings,
  Search,
  Bell,
  Play,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X,
  Map,
  LogOut,
  Sparkles,
  Award,
  GraduationCap,
  Flame,
  Clock,
  Compass,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  FolderDown,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { DISTRICTS, MODULES } from "../lib/sigmaData";

// User provided math artwork & photography
import mathBrainImg from "../assets/images/chalkboard_math_brain_1789064453101.jpg";
import neonPhysicsImg from "../assets/images/neon_physics_architecture_1789064468041.jpg";
import darkPendantImg from "../assets/images/dark_pendant_papers_1789064485174.jpg";
import ipadCalculusImg from "../assets/images/ipad_calculus_notes_1789064500969.jpg";

// Featured District Hero items with 100% authentic SIGMA TKA Math Content
const SIGMA_HERO_FEATURED = [
  {
    id: "mod-aljabar-1",
    districtId: 1,
    tag: "Distrik Unggulan",
    districtName: "Distrik 1 • Aljabar & Matriks",
    categories: ["Aljabar & Matriks", "Level 1", "+350 XP"],
    title: "Operasi & Determinan Matriks",
    displayTitle: "Aljabar & Matriks",
    subTitle: "Determinan Sarrus, Aturan Cramer & Matriks Invers",
    description:
      "Kuasai perkalian baris kali kolom, perhitungan determinan matriks ordo 2x2 dan 3x3, serta invers adjoin untuk menuntaskan soal TKA berkecepatan tinggi.",
    fullDescription:
      "Modul ini membahas fondasi aljabar linier: operasi matriks nonsingular, determinan ordo 3x3 metode Sarrus & ekspansi kofaktor, aturan Cramer pada SPLTV, dan aplikasi invers matriks pada sistem persamaan simultan.",
    bgImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#081726]/95 via-[#0b1d30]/80 to-[#050d17]/90",
    accentColor: "#00F0FF",
    targetScore: 75,
  },
  {
    id: "mod-fungsi-1",
    districtId: 2,
    tag: "Distrik Unggulan",
    districtName: "Distrik 2 • Fungsi & Kalkulus",
    categories: ["Fungsi & Kalkulus", "Level 2", "+300 XP"],
    title: "Komposisi Fungsi & Invers",
    displayTitle: "Komposisi Fungsi",
    subTitle: "Rantai Pemetaan (f ∘ g)(x), Domain Alami & Invers",
    description:
      "Pelajari sifat komposisi fungsi bertingkat, syarat injektif-surjektif fungsi invers, asimtot pecahan aljabar, dan trik pemetaan nilai variabel TKA.",
    fullDescription:
      "Materi meliputi konsep rantai fungsi f(g(x)), domain dan kodomain fungsi rasional, penentuan invers fungsi kuadratik dan pecahan aljabar, serta pengantar limit asimtot tak hingga.",
    bgImage:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#241a06]/95 via-[#1a1304]/80 to-[#0e0a02]/90",
    accentColor: "#FFD600",
    targetScore: 75,
  },
  {
    id: "mod-vektor-1",
    districtId: 3,
    tag: "Distrik Unggulan",
    districtName: "Distrik 3 • Geometri & Vektor",
    categories: ["Geometri & Vektor", "Level 3", "+400 XP"],
    title: "Dimensi Tiga: Jarak Titik ke Bidang",
    displayTitle: "Dimensi Tiga & Vektor",
    subTitle: "Proyeksi Spasial Kubus, Bidang BDHF & Vektor 3D",
    description:
      "Taklukkan perhitungan jarak titik ke garis dan bidang pada bangun ruang kubus dengan bantuan teorema Pythagoras dan perkalian titik vektor ortogonal.",
    fullDescription:
      "Membahas cara menentukan garis proyeksi tegak lurus pada bidang diagonal kubus ABCD.EFGH, jarak titik sudut ke bidang frontal, besar sudut antara dua garis bersilangan, dan perkalian skalar vektor di R3.",
    bgImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#240615]/95 via-[#19040e]/80 to-[#0f0208]/90",
    accentColor: "#FF007A",
    targetScore: 75,
  },
  {
    id: "mod-aljabar-1",
    districtId: 4,
    tag: "Distrik Unggulan",
    districtName: "Distrik 4 • Trigonometri Analitik",
    categories: ["Trigonometri", "Level 4", "+350 XP"],
    title: "Trigonometri Sudut Ganda & Rangkap",
    displayTitle: "Trigonometri Analitik",
    subTitle: "Identitas Sin-Cos, Sudut Rangkap & Persamaan TKA",
    description:
      "Pecahkan rumus jumlah selisih sinus-cosinus, pengubahan perkalian ke penjumlahan, dan temukan himpunan penyelesaian persamaan trigonometri.",
    fullDescription:
      "Menyajikan identitas sin(α ± β), cos(α ± β), rumus sudut rangkap sin 2α dan cos 2α, manipulasi bentuk a cos x + b sin x = c, serta trik eliminasi pilihan ganda pada soal TKA.",
    bgImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#140b2a]/95 via-[#0e071e]/80 to-[#070310]/90",
    accentColor: "#A78BFA",
    targetScore: 75,
  },
  {
    id: "mod-aljabar-1",
    districtId: 5,
    tag: "Distrik Unggulan",
    districtName: "Distrik 5 • Peluang & Statistika",
    categories: ["Statistika & Peluang", "Level 5", "+300 XP"],
    title: "Kaidah Pencacahan & Peluang Bayes",
    displayTitle: "Peluang & Kombinatorika",
    subTitle: "Permutasi Siklis, Kombinasi nCr & Kejadian Bersyarat",
    description:
      "Kuasai prinsip pengisian tempat (filling slots), kombinasi nCr, permutasi unsur yang sama, serta peluang kejadian majemuk bersyarat.",
    fullDescription:
      "Materi berisi pemahaman mendalam tentang perbedaan permutasi dan kombinasi, penyusunan formasi melingkar, peluang saling lepas vs saling bebas, serta penerapan teorema Bayes pada soal kontekstual TKA.",
    bgImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop",
    gradient: "from-[#051c14]/95 via-[#03130d]/80 to-[#020b07]/90",
    accentColor: "#10B981",
    targetScore: 75,
  },
];

// Top Left: "Materi Terkini" (replacing "New episodes")
const NEW_LEARNING_MODULES = [
  {
    id: "mod-aljabar-1",
    title: "Determinan & Invers Matriks 3x3",
    topic: "Trik Cepat Metode Sarrus & Cramer",
    tag: "Distrik 1",
    duration: "45 Menit",
    xp: "+350 XP",
    img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop",
    color: "#00F0FF",
  },
  {
    id: "mod-fungsi-1",
    title: "Komposisi Fungsi (f ∘ g)(x)",
    topic: "Rantai Pemetaan Nilai & Invers",
    tag: "Distrik 2",
    duration: "40 Menit",
    xp: "+300 XP",
    img: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop",
    color: "#FFD600",
  },
];

// Bottom Left: "Lanjutkan Belajar" (replacing "Continue watching")
const CONTINUE_LEARNING = [
  {
    id: "mod-aljabar-1",
    title: "Sistem Persamaan Tiga Variabel",
    topic: "Eliminasi Gauss & Substitusi SPLTV",
    subtitle: "Sesi 1 • 75% selesai",
    progress: 75,
    img: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "mod-vektor-1",
    title: "Dimensi Tiga: Ruang Kubus",
    topic: "Jarak Titik C ke Bidang BDHF",
    subtitle: "Sesi 2 • 45% selesai",
    progress: 45,
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "mod-fungsi-1",
    title: "Trigonometri Sudut Rangkap",
    topic: "Identitas sin 2α dan cos 2α",
    subtitle: "Sesi 3 • 60% selesai",
    progress: 60,
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop",
  },
];

// Bottom Right: "Rekomendasi Modul TKA" (replacing "You Might Like")
const RECOMMENDATIONS = [
  {
    id: "mod-fungsi-1",
    tag: "Kalkulus",
    district: "Distrik 2",
    title: "Limit & Asimtot Tak Hingga",
    displayTopic: "Fungsi Rasional & Akar Pecahan",
    match: "98% Relevan",
    duration: "45 Menit",
    img: mathBrainImg,
  },
  {
    id: "mod-vektor-1",
    tag: "Geometri",
    district: "Distrik 3",
    title: "Dimensi Tiga: Bidang Diagonal",
    displayTopic: "Pythagoras Ruang & Proyeksi",
    match: "96% Relevan",
    duration: "50 Menit",
    img: neonPhysicsImg,
  },
  {
    id: "mod-aljabar-1",
    tag: "Aljabar",
    district: "Distrik 1",
    title: "Matriks Invers & Cramer",
    displayTopic: "Determinan 3x3 & Adjoin",
    match: "99% Relevan",
    duration: "40 Menit",
    img: darkPendantImg,
  },
  {
    id: "mod-aljabar-1",
    tag: "Peluang",
    district: "Distrik 5",
    title: "Kaidah Pencacahan & nCr",
    displayTopic: "Permutasi Siklis & Peluang Bayes",
    match: "95% Relevan",
    duration: "35 Menit",
    img: ipadCalculusImg,
  },
];

export default function StudentDashboard() {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();

  // Navigation states
  const [activeCategory, setActiveCategory] = useState<
    "Semua Distrik" | "Aljabar & Matriks" | "Fungsi & Kalkulus" | "Geometri & Vektor" | "Trigonometri" | "Peluang & Data"
  >("Semua Distrik");

  const [heroIdx, setHeroIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState<any | null>(null);

  const currentHero = SIGMA_HERO_FEATURED[heroIdx];

  const handleNextHero = () => {
    setHeroIdx((prev) => (prev + 1) % SIGMA_HERO_FEATURED.length);
  };

  const handlePrevHero = () => {
    setHeroIdx((prev) => (prev - 1 + SIGMA_HERO_FEATURED.length) % SIGMA_HERO_FEATURED.length);
  };

  const handleLogout = () => {
    logout();
    navigate("/masuk");
  };

  const displayName = profile?.full_name || "Ahmad Rizky Pratama";
  const displayClass = profile?.class_name || "Kelas 11 IPA 1";
  const displayXp = profile?.xp || 1250;

  // Filter recommendations based on search
  const filteredRecommendations = useMemo(() => {
    let list = RECOMMENDATIONS;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.displayTopic.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full bg-[#0d0e14] text-slate-100 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-x-hidden font-sans select-none">
      {/* ==================================================================== */}
      {/* 1. ROOM INTERIOR BACKGROUND (Apple VisionOS / Spatial Concept)       */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
          alt="Room Ambient Background"
          className="w-full h-full object-cover opacity-20 filter blur-[8px] scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#06080e]/95 via-[#0c0d16]/85 to-[#12131f]/80" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-3xl" />
      </div>

      {/* ==================================================================== */}
      {/* 2. MAIN SPATIAL CONTAINER (Detached Left Dock + Main Glass Window)   */}
      {/* ==================================================================== */}
      <div className="relative z-10 w-full max-w-[1580px] flex items-center gap-3 sm:gap-4 lg:gap-5 min-h-[820px]">
        {/* ================================================================== */}
        {/* A. DETACHED VERTICAL PILL DOCK (Left Floating Pill)                */}
        {/* Home, Peta Distrik, Koleksi Modul, Forum Diskusi, Profil Siswa     */}
        {/* ================================================================== */}
        <aside className="w-13 sm:w-14 lg:w-[62px] rounded-full bg-[#181a24]/80 border border-white/[0.16] shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.18)] backdrop-blur-2xl py-6 sm:py-7 px-2 flex flex-col items-center justify-center gap-6 sm:gap-7 shrink-0 transition-transform">
          {/* 1. Home / Dashboard */}
          <Link
            to="/app/dashboard"
            className="grid h-10 w-10 place-items-center rounded-full text-white bg-white/15 shadow-inner hover:scale-110 transition-all cursor-pointer"
            title="Dashboard Utama SIGMA"
          >
            <Home size={19} className="stroke-[2.2]" />
          </Link>

          {/* 2. Peta Distrik (Journey) */}
          <Link
            to="/app/journey"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all cursor-pointer"
            title="Peta Distrik Pembelajaran"
          >
            <Map size={19} />
          </Link>

          {/* 3. Modul & Materi Pembelajaran */}
          <Link
            to="/app/materi/mod-aljabar-1"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all cursor-pointer"
            title="Materi & Silabus TKA"
          >
            <BookOpen size={19} />
          </Link>

          {/* 4. Forum Diskusi Siswa & Guru */}
          <Link
            to="/app/discussions"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all cursor-pointer"
            title="Forum Diskusi & Tanya Guru"
          >
            <MessageSquare size={19} />
          </Link>

          {/* 5. Profil & Pengaturan */}
          <Link
            to="/app/profile"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            title="Profil Siswa & Statistik XP"
          >
            <User size={19} />
          </Link>
        </aside>

        {/* ================================================================== */}
        {/* B. MAIN CURVED FROSTED GLASS WINDOW                                */}
        {/* Large spatial window with inner border highlights                  */}
        {/* ================================================================== */}
        <main className="flex-1 rounded-[36px] sm:rounded-[42px] bg-[#11131e]/75 border border-white/[0.14] shadow-[0_30px_70px_rgba(0,0,0,0.85),inset_0_1px_2px_rgba(255,255,255,0.22)] backdrop-blur-3xl p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-x-hidden overflow-y-auto max-h-[92vh]">
          <div className="space-y-6 sm:space-y-7">
            {/* -------------------------------------------------------------- */}
            {/* 1. TOP HEADER BAR INSIDE THE WINDOW                            */}
            {/* Left: Search Bar | Center: Math Categories | Right: User Pill  */}
            {/* -------------------------------------------------------------- */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative w-full lg:w-64 xl:w-72">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari materi, rumus, kuis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-full bg-[#1c1f2e]/80 border border-white/10 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-400 outline-none focus:border-cyan-400/50 focus:bg-[#222638] transition-all shadow-inner"
                />
              </div>

              {/* Center Category Pills: Real SIGMA Districts */}
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
                {(
                  [
                    { key: "Semua Distrik", label: "Semua Distrik" },
                    { key: "Aljabar & Matriks", label: "Aljabar & Matriks" },
                    { key: "Fungsi & Kalkulus", label: "Fungsi & Kalkulus" },
                    { key: "Geometri & Vektor", label: "Geometri & Vektor" },
                    { key: "Trigonometri", label: "Trigonometri" },
                    { key: "Peluang & Data", label: "Peluang & Data" },
                  ] as const
                ).map((tab) => {
                  const isActive = activeCategory === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveCategory(tab.key)}
                      className={`rounded-full px-4 sm:px-4.5 py-2 text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "bg-white text-slate-950 font-black shadow-lg shadow-white/20"
                          : "text-slate-300 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Right: Circular Bell + User Profile Pill */}
              <div className="flex items-center gap-3 self-end lg:self-auto">
                {/* Circular Bell Button */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowNotification(!showNotification)}
                    className="grid h-10 w-10 place-items-center rounded-full bg-[#1c1f2e]/80 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer relative shadow-md"
                    title="Pengumuman Guru Pengampu"
                  >
                    <Bell size={16} />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                  </button>

                  {/* Notification Popover */}
                  {showNotification && (
                    <div className="absolute right-0 top-12 z-50 w-72 rounded-3xl border border-white/20 bg-[#161826]/95 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                        <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                          <Bell size={13} /> Pengumuman TKA
                        </span>
                        <button
                          onClick={() => setShowNotification(false)}
                          className="text-slate-400 hover:text-white cursor-pointer"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <GraduationCap size={14} className="text-amber-400" /> Ust. Ahmad Fauzi, S.Pd.
                        </div>
                        <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                          Assalamu'alaikum siswa-siswi MAS Darunnajah 9. Sesi simulasi kuis Distrik 1 &amp; 2 siap dikerjakan. Target kelulusan skor 75+.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Pill: Student Name + Class / XP */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="rounded-full bg-[#1c1f2e]/80 border border-white/10 px-3.5 py-1.5 flex items-center gap-2.5 hover:border-white/30 transition-all cursor-pointer shadow-md"
                  >
                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 grid place-items-center text-slate-950 font-black text-xs shadow">
                      {displayName.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-left pr-0.5">
                      <div className="text-xs font-bold text-white leading-tight">{displayName}</div>
                      <div className="text-[10px] text-cyan-300 font-mono leading-none mt-0.5">
                        {displayClass} • {displayXp} XP
                      </div>
                    </div>

                    <ChevronDown size={14} className="text-slate-400" />
                  </button>

                  {/* Profile Dropdown */}
                  {showUserDropdown && (
                    <div className="absolute right-0 top-12 z-50 w-52 rounded-2xl border border-white/15 bg-[#141624]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95">
                      <Link
                        to="/app/profile"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <User size={14} className="text-cyan-400" /> Profil &amp; Statistik
                      </Link>
                      <Link
                        to="/app/journey"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <Bookmark size={14} className="text-amber-400" /> Peta Capaian Distrik
                      </Link>
                      <Link
                        to="/app/discussions"
                        onClick={() => setShowUserDropdown(false)}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-white"
                      >
                        <MessageSquare size={14} className="text-purple-400" /> Forum Diskusi
                      </Link>
                      <div className="my-1 border-t border-white/10" />
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                      >
                        <LogOut size={14} /> Keluar Akun
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* 2. BODY CONTENT: LEFT COLUMN (Episodes) + RIGHT (Hero & Grid)   */}
            {/* -------------------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
              {/* ============================================================ */}
              {/* LEFT COLUMN: Materi Terkini & Lanjutkan Belajar              */}
              {/* ============================================================ */}
              <div className="lg:col-span-4 xl:col-span-4 space-y-5">
                {/* 1. Materi Terkini (Replacing "New episodes") */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      Materi Terkini
                    </h3>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      Urutkan: <span className="text-slate-200 font-semibold">Terbaru</span>
                      <ChevronDown size={12} />
                    </span>
                  </div>

                  {/* 2 Horizontal Cards matching spatial screenshot */}
                  <div className="space-y-2.5">
                    {NEW_LEARNING_MODULES.map((mod) => (
                      <div
                        key={mod.title}
                        onClick={() => navigate(`/app/materi/${mod.id}`)}
                        className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#161826] p-3 flex items-center justify-between hover:border-cyan-400/40 transition-all cursor-pointer shadow-lg min-h-[95px]"
                      >
                        <img
                          src={mod.img}
                          alt={mod.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-105 group-hover:opacity-45 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f1a]/95 via-[#0d0f1a]/85 to-transparent" />

                        <div className="relative z-10 min-w-0 pr-2">
                          <h4 className="text-xs sm:text-sm font-black text-white group-hover:text-cyan-300 transition-colors">
                            {mod.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 font-medium mt-0.5 line-clamp-1">
                            {mod.topic}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/15 px-2 py-0.5 rounded border border-cyan-400/25">
                              {mod.tag}
                            </span>
                            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-400/25">
                              {mod.xp}
                            </span>
                          </div>
                        </div>

                        {/* Circular Play Button */}
                        <div className="relative z-10 h-9 w-9 rounded-full bg-white text-slate-950 grid place-items-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                          <Play size={14} className="fill-black ml-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Lanjutkan Belajar (Replacing "Continue watching") */}
                <div className="space-y-3 pt-1">
                  <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                    Lanjutkan Belajar
                  </h3>

                  <div className="space-y-2">
                    {CONTINUE_LEARNING.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate(`/app/materi/${item.id}`)}
                        className="group rounded-2xl bg-[#151724]/85 border border-white/10 p-2.5 flex items-center justify-between hover:border-cyan-400/30 hover:bg-[#1a1c2c] transition-all cursor-pointer shadow-sm"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="h-11 w-11 rounded-xl overflow-hidden relative shrink-0 border border-white/10">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate group-hover:text-cyan-300 transition-colors">
                              {item.title}
                            </h4>
                            <div className="text-[11px] text-slate-400 font-medium truncate">
                              {item.topic}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="h-1.5 w-16 sm:w-20 rounded-full bg-white/10 overflow-hidden">
                                <div
                                  className="h-full bg-cyan-400 rounded-full"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Circular Play Button */}
                        <div className="h-8 w-8 rounded-full bg-white/10 border border-white/15 text-white grid place-items-center shrink-0 ml-2 group-hover:bg-white group-hover:text-black transition-all">
                          <Play size={12} className="fill-current ml-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* RIGHT COLUMN: Large Hero Banner + Rekomendasi Modul TKA      */}
              {/* ============================================================ */}
              <div className="lg:col-span-8 xl:col-span-8 space-y-6">
                {/* 1. CINEMATIC HERO BANNER (SIGMA MATH TKA DISTRIK) */}
                <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#171927] min-h-[310px] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                  {/* Background Artwork */}
                  <img
                    src={currentHero.bgImage}
                    alt={currentHero.displayTitle}
                    className="absolute inset-0 w-full h-full object-cover opacity-45"
                    referrerPolicy="no-referrer"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${currentHero.gradient}`} />

                  {/* Top Tags Strip */}
                  <div className="relative z-10 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 text-[11px] font-bold text-white">
                      {currentHero.tag}
                    </span>
                    {currentHero.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1 text-[11px] font-medium text-slate-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  {/* Center Big Title & Description */}
                  <div className="relative z-10 max-w-xl my-4">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
                      {currentHero.displayTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed font-normal">
                      {currentHero.description}
                    </p>
                    <p className="text-[11px] text-cyan-300 font-mono mt-1 font-semibold">
                      {currentHero.subTitle} • Target Lulus: Skor ≥ {currentHero.targetScore}
                    </p>
                  </div>

                  {/* Bottom Action Strip: Watch, Uji Kuis, More, Carousel Controls */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-2">
                    {/* Left Actions */}
                    <div className="flex items-center gap-2.5">
                      {/* Mulai Belajar Button */}
                      <button
                        type="button"
                        onClick={() => navigate(`/app/materi/${currentHero.id}`)}
                        className="rounded-full bg-white text-slate-950 px-6 py-2.5 text-xs sm:text-sm font-black hover:bg-slate-200 transition-all flex items-center gap-2 shadow-xl shadow-white/20 hover:scale-105 cursor-pointer"
                      >
                        <Play size={14} className="fill-black" />
                        <span>Mulai Belajar</span>
                      </button>

                      {/* Uji Kuis Button */}
                      <button
                        type="button"
                        onClick={() => navigate(`/app/kuis/${currentHero.id}`)}
                        className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Award size={14} />
                        <span>Uji Kuis (75+)</span>
                      </button>

                      {/* More / Details Button */}
                      <button
                        type="button"
                        onClick={() => setShowModalDetail(currentHero)}
                        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-slate-200 hover:text-white transition-all cursor-pointer"
                        title="Rincian Silabus"
                      >
                        <MoreHorizontal size={17} />
                      </button>
                    </div>

                    {/* Carousel Navigation Arrows */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevHero}
                        className="grid h-9 w-9 place-items-center rounded-full bg-black/40 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Distrik Sebelumnya"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextHero}
                        className="grid h-9 w-9 place-items-center rounded-full bg-black/40 hover:bg-white/20 border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer"
                        title="Distrik Selanjutnya"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. REKOMENDASI MODUL TKA (Replacing "You Might Like") */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      Rekomendasi Modul TKA
                    </h3>
                    <Link
                      to="/app/journey"
                      className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[11px] font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1"
                    >
                      <span>Lihat Semua Distrik</span>
                      <ChevronRight size={12} />
                    </Link>
                  </div>

                  {/* 4 Poster Cards matching spatial screenshot */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                    {filteredRecommendations.map((card) => (
                      <div
                        key={card.title}
                        onClick={() => setShowModalDetail(card)}
                        className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#161826] aspect-[3/4] p-3 flex flex-col justify-between cursor-pointer hover:border-cyan-400/40 hover:scale-[1.02] transition-all duration-300 shadow-xl"
                      >
                        <img
                          src={card.img}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e101a] via-[#0e101a]/50 to-transparent" />

                        {/* Top Category Tag */}
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="rounded-full bg-black/60 backdrop-blur-md border border-white/15 px-2.5 py-0.5 text-[10px] font-medium text-slate-300">
                            {card.tag}
                          </span>
                          <span className="text-[10px] font-mono text-cyan-300">
                            {card.match}
                          </span>
                        </div>

                        {/* Bottom Title & Play Icon */}
                        <div className="relative z-10 flex items-end justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs sm:text-sm font-black text-white leading-tight group-hover:text-cyan-300 transition-colors truncate">
                              {card.title}
                            </h4>
                            <p className="text-[10px] text-slate-300 truncate mt-0.5">
                              {card.displayTopic}
                            </p>
                          </div>

                          {/* White Round Play Button */}
                          <div className="h-7 w-7 rounded-full bg-white text-slate-950 grid place-items-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            <Play size={11} className="fill-black ml-0.5" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ==================================================================== */}
      {/* 3. MODAL DETAIL POPUP (WHEN CLICKING MORE / POSTER)                  */}
      {/* ==================================================================== */}
      {showModalDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-[#161826] p-6 shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowModalDetail(null)}
              className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 grid place-items-center cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 text-[10px] font-black uppercase">
                {showModalDetail.tag || "Modul TKA"}
              </span>
              <span className="text-xs text-slate-400 font-mono">MAS Darunnajah 9</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {showModalDetail.title || showModalDetail.displayTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
              {showModalDetail.fullDescription ||
                showModalDetail.description ||
                `Pelajari materi pembelajaran dan selesaikan tantangan kuis untuk topik ${showModalDetail.displayTopic || showModalDetail.title}.`}
            </p>

            <div className="mt-6 flex items-center gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  navigate(`/app/materi/${showModalDetail.id || "mod-aljabar-1"}`);
                }}
                className="flex-1 rounded-full bg-white text-slate-950 font-black py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-all cursor-pointer shadow-lg"
              >
                <Play size={14} className="fill-black" />
                <span>Mulai Belajar</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigate(`/app/kuis/${showModalDetail.id || "mod-aljabar-1"}`);
                }}
                className="rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-white font-bold py-2.5 px-5 text-xs sm:text-sm transition-all cursor-pointer"
              >
                Uji Kuis (75+)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
