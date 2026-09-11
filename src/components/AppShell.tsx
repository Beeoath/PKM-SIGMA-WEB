import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Compass,
  MapPin,
  LayoutDashboard,
  MessageSquare,
  User,
  LogOut,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  BookOpen,
  Award,
  Layers,
} from "lucide-react";
import { useAuth } from "../lib/auth";
import { SigmaBackground } from "./SigmaBackground";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTeacher = profile?.role === "teacher";

  const studentNavItems = [
    { label: "Sigma Hub", path: "/app/hub", icon: Compass },
    { label: "Peta Distrik", path: "/app/journey", icon: MapPin },
    { label: "Dashboard", path: "/app/dashboard", icon: LayoutDashboard },
    { label: "Forum Diskusi", path: "/app/discussions", icon: MessageSquare },
    { label: "Profil", path: "/app/profile", icon: User },
  ];

  const teacherNavItems = [
    { label: "Ringkasan Kelas", path: "/teacher/dashboard", icon: LayoutDashboard },
    { label: "Moderasi Diskusi", path: "/teacher/moderation", icon: MessageSquare },
    { label: "Kelola Materi", path: "/teacher/content", icon: Layers },
    { label: "Mode Siswa", path: "/app/dashboard", icon: Compass },
  ];

  const currentNav = isTeacher ? teacherNavItems : studentNavItems;

  const handleLogout = () => {
    logout();
    navigate("/masuk");
  };

  const isDashboardView =
    location.pathname === "/app" ||
    location.pathname === "/app/" ||
    location.pathname === "/app/dashboard";

  const isNavActive = (itemPath: string) => {
    if (itemPath === "/app/dashboard") {
      return isDashboardView;
    }
    if (itemPath === "/app/hub") {
      return location.pathname === "/app/hub";
    }
    return location.pathname.startsWith(itemPath);
  };

  const displayName = profile?.full_name || profile?.email?.split("@")[0] || "tumbalion";
  const displayXp = profile?.xp ?? 500;
  const displayLevel = profile?.level ?? 1;

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col relative selection:bg-cyan-400/30 selection:text-cyan-300">
      <SigmaBackground density={18} glyphs={8} />

      {/* Top Navbar - Matches image 2 exactly */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070a14]/90 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link to={isTeacher ? "/teacher" : "/app/dashboard"} className="flex items-center gap-2.5 group">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 font-display text-lg font-black text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform">
                Σ
              </span>
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-black tracking-wider text-white">
                  SIGMA
                </span>
                <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10">
                  MA DARUNNAJAH 9
                </span>
              </div>
            </Link>

            {isTeacher && (
              <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                <ShieldCheck size={11} /> GURU
              </span>
            )}
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-white/10 text-cyan-300 shadow-sm border border-cyan-400/30 font-bold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={14} className={active ? "text-cyan-400" : "text-slate-400"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: User Status & Logout */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/app/profile"
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0f1424] hover:border-cyan-400/40 py-1 px-3 transition-colors cursor-pointer"
              title="Lihat Profil"
            >
              <div className="h-7 w-7 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 font-black grid place-items-center text-xs">
                <User size={14} />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-100 truncate max-w-[130px]">
                  {displayName}
                </div>
                <div className="text-[10px] font-mono text-cyan-400/90 font-semibold">
                  {isTeacher ? "Pengajar" : `${displayXp} XP • Lv.${displayLevel}`}
                </div>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-colors cursor-pointer"
              title="Keluar"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Keluar</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#070a14]/95 px-4 py-3 space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const active = isNavActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold ${
                    active
                      ? "bg-cyan-400/15 text-cyan-300 border border-cyan-400/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} className={active ? "text-cyan-400" : "text-slate-400"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area: Spacious for Dashboard, Centered for others */}
      <main className={`flex-1 relative z-10 w-full ${isDashboardView ? "overflow-x-hidden" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8"}`}>
        {children}
      </main>

      {/* Footer shown on non-dashboard pages */}
      {!isDashboardView && (
        <footer className="relative z-10 border-t border-white/10 bg-[#070913]/60 py-6 text-center text-xs text-slate-500">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>© 2026 SIGMA Matematika · MA Darunnajah 9 Pamulang</p>
            <p className="font-mono text-[11px] text-slate-400">
              Kurikulum Matematika Terintegrasi TKA Kelas 11
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};
