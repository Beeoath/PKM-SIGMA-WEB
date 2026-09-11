import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Compass,
  Bookmark,
  BookOpen,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  Lock,
  Share2,
  Plus,
  Copy,
  RotateCw,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../lib/auth";

interface VisionOSWindowProps {
  children: React.ReactNode;
  activeDockItem?: string;
  role?: "student" | "teacher";
  urlPath?: string;
}

export const VisionOSWindow: React.FC<VisionOSWindowProps> = ({
  children,
  activeDockItem = "home",
  role = "student",
  urlPath,
}) => {
  const { profile } = useAuth();
  const location = useLocation();

  const isTeacher = role === "teacher" || profile?.role === "teacher";
  const defaultUrl = isTeacher ? "sigma.darunnajah9.sch.id/teacher" : "sigma.darunnajah9.sch.id/dashboard";
  const displayUrl = urlPath || defaultUrl;

  const dockLinks = isTeacher
    ? [
        { id: "home", label: "Ringkasan", path: "/teacher/dashboard", icon: LayoutDashboard },
        { id: "students", label: "Kelola Siswa", path: "/teacher/dashboard", icon: User },
        { id: "content", label: "Modul & Soal", path: "/teacher/content", icon: BookOpen },
        { id: "moderation", label: "Moderasi Diskusi", path: "/teacher/moderation", icon: MessageSquare },
        { id: "portal", label: "Mode Siswa", path: "/app", icon: Compass },
      ]
    : [
        { id: "home", label: "Dashboard", path: "/app/dashboard", icon: Compass },
        { id: "map", label: "Peta Distrik", path: "/app/journey", icon: Bookmark },
        { id: "modules", label: "Semua Modul", path: "/app/hub", icon: BookOpen },
        { id: "profile", label: "Profil Akun", path: "/app/profile", icon: User },
        { id: "discussions", label: "Diskusi", path: "/app/discussions", icon: MessageSquare },
      ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#070b14] text-slate-100 py-4 sm:py-8 px-2 sm:px-6 lg:px-10 flex flex-col items-center justify-start">
      {/* 1. Ambient Background Room / Soft Lighting matching user reference */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* Soft warm interior blur glow */}
        <div className="absolute -top-32 -left-32 h-[600px] w-[600px] rounded-full bg-slate-700/20 blur-[130px]" />
        <div className="absolute top-1/4 -right-40 h-[700px] w-[700px] rounded-full bg-cyan-900/15 blur-[150px]" />
        <div className="absolute -bottom-40 left-1/3 h-[600px] w-[600px] rounded-full bg-indigo-950/25 blur-[140px]" />
        {/* Subtle interior photo backdrop overlay with high blur */}
        <div
          className="absolute inset-0 opacity-[0.07] bg-cover bg-center mix-blend-overlay filter blur-sm"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/70 via-[#070b14]/90 to-[#070b14]" />
      </div>

      {/* 2. Top Simulated macOS / VisionOS Floating Browser Pill */}
      <div className="relative z-20 w-full max-w-6xl mb-4 sm:mb-6">
        <div className="mx-auto flex h-11 sm:h-12 w-full items-center justify-between gap-2 rounded-full border border-white/20 bg-slate-900/60 px-3 sm:px-5 shadow-2xl backdrop-blur-2xl">
          {/* Left Window & History Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 pr-1 sm:pr-2 border-r border-white/10">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80 inline-block shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80 inline-block shadow-sm" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80 inline-block shadow-sm" />
            </div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="grid h-7 w-7 place-items-center rounded-full text-slate-200 hover:text-white hover:bg-white/20 transition-colors"
              title="Kembali"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => window.history.forward()}
              className="grid h-7 w-7 place-items-center rounded-full text-slate-300 hover:text-white hover:bg-white/20 transition-colors"
              title="Maju"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Center Address Pill */}
          <div className="flex flex-1 max-w-xs sm:max-w-md items-center justify-center gap-2 rounded-full bg-black/50 border border-white/20 px-3.5 py-1 text-xs text-white shadow-inner">
            <Lock size={13} className="text-cyan-300 shrink-0" />
            <span className="truncate font-mono text-xs sm:text-sm font-semibold text-slate-100">
              {displayUrl}
            </span>
          </div>

          {/* Right Browser Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="grid h-7 w-7 place-items-center rounded-full text-slate-200 hover:text-white hover:bg-white/20 transition-colors"
              title="Muat Ulang"
            >
              <RotateCw size={15} />
            </button>
            <Link
              to="/"
              className="grid h-7 w-7 place-items-center rounded-full text-slate-200 hover:text-white hover:bg-white/20 transition-colors"
              title="Halaman Depan"
            >
              <Share2 size={15} />
            </Link>
            <span className="grid h-6 w-6 place-items-center rounded-md bg-white/20 text-xs font-mono font-bold text-white">
              1
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Stage: Floating Left Vertical Dock + Large Frosted Glass Canvas */}
      <div className="relative z-20 w-full max-w-7xl flex flex-col md:flex-row items-start gap-3 sm:gap-5 justify-center">
        {/* Left Floating Vertical Dock (Pill Shape from Reference) */}
        <aside className="shrink-0 flex md:flex-col items-center justify-center gap-2 md:gap-3.5 rounded-full border border-white/20 bg-slate-900/70 p-2 sm:p-2.5 shadow-2xl backdrop-blur-2xl mx-auto md:mx-0 md:sticky md:top-24">
          {dockLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.id === "home" && (location.pathname === "/app/dashboard" || location.pathname === "/teacher/dashboard"));

            return (
              <Link
                key={item.id}
                to={item.path}
                title={item.label}
                className={`group relative grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full transition-all ${
                  isActive
                    ? "bg-white text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/20 hover:scale-105"
                }`}
              >
                <Icon size={19} className="transition-transform group-hover:scale-110" />
                {/* Tooltip on hover */}
                <span className="pointer-events-none absolute left-full ml-3 hidden md:group-hover:block whitespace-nowrap rounded-lg bg-slate-950 border border-white/30 px-3 py-1 text-xs font-bold text-white shadow-2xl z-50">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </aside>

        {/* Main Frosted Glass Slab Container */}
        <main className="flex-1 w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[42px] border border-white/20 bg-slate-900/60 p-4 sm:p-6 lg:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-3xl overflow-hidden relative">
          {/* Subtle Inner Lens Flare & Gloss Highlights */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-black/30" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Children content (Student or Teacher Dashboard Content) */}
          <div className="relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default VisionOSWindow;
