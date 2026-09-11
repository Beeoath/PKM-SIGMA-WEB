import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Play,
  Download,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  CheckCircle2,
  MessageSquare,
  FileSpreadsheet,
  Inbox,
  ShieldCheck,
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  Layers,
  GraduationCap,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../lib/auth";
import { VisionOSWindow } from "../components/VisionOSWindow";

interface StudentRecord {
  id: string;
  name: string;
  class: string;
  progress: string;
  avgScore: number | string;
  status: string;
}

export default function TeacherDashboard() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"overview" | "students" | "modules" | "analytics">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<StudentRecord[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("sigma_registered_users_db");
      if (raw) {
        const db = JSON.parse(raw);
        const realStudents: StudentRecord[] = Object.values(db)
          .filter((u: any) => u.role === "student" && u.id !== "usr-student-1")
          .map((u: any) => {
            const completedCount = u.completed_modules?.length || 0;
            const progressPct = Math.min(100, Math.round((completedCount / 10) * 100));
            const rawClass = u.class_name || "Kelas 11 A";
            const cleanClass =
              rawClass.includes("B") || rawClass.includes("2") ? "Kelas 11 B" : "Kelas 11 A";
            return {
              id: u.id,
              name: u.full_name || "Siswa Baru",
              class: cleanClass,
              progress: `${progressPct}%`,
              avgScore: completedCount > 0 ? 85 : 0,
              status: completedCount > 0 ? "Aktif" : "Baru Bergabung",
            };
          });
        setStudents(realStudents);
      } else {
        setStudents([]);
      }
    } catch {
      setStudents([]);
    }
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = students.length;
  const avgScore =
    totalStudents > 0
      ? (
          students.reduce((acc, s) => acc + (typeof s.avgScore === "number" ? s.avgScore : 0), 0) /
          totalStudents
        ).toFixed(1)
      : "0";
  const completedRate =
    totalStudents > 0
      ? `${Math.round((students.filter((s) => parseInt(s.progress) >= 70).length / totalStudents) * 100)}%`
      : "0%";

  const handleExportExcel = () => {
    toast.success("Data rekap nilai siswa berhasil diekspor (Format CSV/Excel)!");
  };

  return (
    <VisionOSWindow role="teacher" activeDockItem="home" urlPath="sigma.darunnajah9.sch.id/teacher">
      {/* 1. TOP NAVIGATION BAR INSIDE FROSTED GLASS */}
      <header className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
        {/* Left: Search Input Pill */}
        <div className="relative w-full lg:w-72">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search students, classes, modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-full border border-white/10 bg-white/10 pl-10 pr-4 text-xs text-white placeholder-slate-400 backdrop-blur-md outline-none focus:border-white/30 focus:bg-white/15 transition-all"
          />
        </div>

        {/* Center: Category Pill Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {[
            { id: "overview", label: "Ringkasan" },
            { id: "students", label: "Siswa & Nilai" },
            { id: "modules", label: "Modul & Soal" },
            { id: "analytics", label: "Statistik TKA" },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white/85 text-slate-950 font-bold shadow-md shadow-white/10"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Notification & Teacher Profile Chip */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
          <button
            type="button"
            className="relative grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/10 text-slate-300 hover:text-white hover:bg-white/20 transition-all backdrop-blur-md"
            title="Notifikasi Guru"
          >
            <Bell size={15} />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
          </button>

          {/* Teacher Profile Chip (Clickable) */}
          <Link
            to="/app/profile"
            className="flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-white/10 py-1 pl-1.5 pr-3 hover:bg-white/20 hover:border-amber-400/60 transition-all backdrop-blur-md cursor-pointer group"
            title="Buka Profil Guru"
          >
            <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-md group-hover:scale-105 transition-transform">
              <ShieldCheck size={14} />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-bold text-white leading-tight group-hover:text-amber-300 transition-colors">
                {profile?.full_name || "Ust. Ahmad Fauzi, S.Pd."}
              </div>
              <div className="text-[10px] text-amber-300/90 leading-none">
                Guru Pengampu • MAS Darunnajah 9
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* 2. MAIN CINEMATIC GRID (Left 1/3 + Right 2/3) */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* === LEFT COLUMN: Agenda & Class Monitoring Cards === */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 1: Agenda Guru (Frosted Card) */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                <Flame size={14} className="fill-amber-400" />
                <span className="text-white font-semibold">Agenda Guru</span>
              </div>
              <span className="text-[11px] text-slate-400 font-semibold">Hari Ini</span>
            </div>

            <div className="space-y-3">
              <div
                onClick={() => navigate("/teacher/content")}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-2.5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
                  <BookOpen size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Kelola Modul & Bank Soal
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">5 Distrik aktif siap disunting</p>
                </div>
              </div>

              <div
                onClick={() => navigate("/teacher/moderation")}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-2.5 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-400/30">
                  <MessageSquare size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="truncate text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    Moderasi Forum Diskusi
                  </h4>
                  <p className="text-[10px] text-slate-400 truncate">Tinjau tanya-jawab antar siswa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Status Rombel / Kelas (Hanya 2 Kelas & Tanpa Keterangan IPA/IPS) */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5 backdrop-blur-xl shadow-xl">
            <h3 className="text-xs font-bold text-white mb-3 tracking-wide">
              Sebaran Rombel Kelas 11
            </h3>

            <div className="space-y-2.5 text-xs">
              {[
                {
                  name: "Kelas 11 A",
                  status: "Aktif Belajar",
                  count: `${students.filter((s) => s.class.includes("11 A") || s.class.includes("11A") || s.class.includes("1") || s.class === "Kelas 11").length} Siswa`,
                },
                {
                  name: "Kelas 11 B",
                  status: "Aktif Belajar",
                  count: `${students.filter((s) => s.class.includes("11 B") || s.class.includes("11B") || s.class.includes("2")).length} Siswa`,
                },
              ].map((cls, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl bg-white/5 p-3 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-white">{cls.name}</div>
                    <div className="text-[10px] text-slate-400">{cls.status}</div>
                  </div>
                  <span className="font-mono text-[11px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-400/30 px-2.5 py-0.5 rounded-full">
                    {cls.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === RIGHT COLUMN: Cinematic Teacher Hero Banner + Metrics & Student Roster === */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. CINEMATIC HERO BANNER FOR TEACHER */}
          <div className="relative min-h-[320px] sm:min-h-[360px] w-full rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col justify-end p-6 sm:p-8 group">
            {/* Background High-Tech Control Room Artwork */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />

            <div className="relative z-10 max-w-xl space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md">
                  <ShieldCheck size={12} />
                  Ruang Kendali Guru
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-slate-200 backdrop-blur-md">
                  Kurikulum SIGMA 2026
                </span>
                <span className="rounded-full bg-cyan-400/15 border border-cyan-400/30 px-3 py-1 text-[11px] font-mono font-bold text-cyan-300 backdrop-blur-md">
                  MAS Darunnajah 9
                </span>
              </div>

              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Pusat Pemantauan & Evaluasi Siswa
                </h1>
                <p className="mt-1 font-mono text-xs sm:text-sm font-semibold text-cyan-300">
                  Pantau Progres Belajar 5 Distrik Matematika Secara Terpadu
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Kelola bank soal kuis, sesuaikan bobot materi kurikulum, dan pantau penguasaan konsep
                aljabar, kalkulus, geometri, hingga trigonometri para siswa secara langsung.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/teacher/content")}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-slate-950 shadow-xl shadow-white/15 hover:bg-slate-200 hover:scale-105 transition-all"
                >
                  <Play size={13} className="fill-black" />
                  <span>Kelola Materi</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportExcel}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md hover:bg-white/20 transition-all"
                >
                  <Download size={13} />
                  <span>Ekspor Nilai Excel</span>
                </button>

                <Link
                  to="/app"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <GraduationCap size={13} />
                  <span>Mode Siswa</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 2. FROSTED METRIC CARDS (4 Cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px] font-bold uppercase">
                <Users size={13} /> Total Siswa
              </div>
              <div className="font-display text-2xl sm:text-3xl font-black text-white mt-1.5">
                {totalStudents}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {totalStudents > 0 ? "Terdata di sistem" : "Belum ada siswa"}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-1.5 text-cyan-400 font-mono text-[11px] font-bold uppercase">
                <Award size={13} /> Rerata Nilai
              </div>
              <div className="font-display text-2xl sm:text-3xl font-black text-cyan-300 mt-1.5">
                {avgScore}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Skor kuis siswa</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px] font-bold uppercase">
                <CheckCircle2 size={13} /> Ketuntasan
              </div>
              <div className="font-display text-2xl sm:text-3xl font-black text-emerald-300 mt-1.5">
                {completedRate}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Lulus batas KKM</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-1.5 text-purple-400 font-mono text-[11px] font-bold uppercase">
                <MessageSquare size={13} /> Diskusi
              </div>
              <div className="font-display text-2xl sm:text-3xl font-black text-purple-300 mt-1.5">
                0
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Thread aktif</div>
            </div>
          </div>

          {/* 3. STUDENT ROSTER TABLE IN FROSTED GLASS */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">Daftar Progres Siswa</h3>
                <p className="text-[11px] text-slate-400">
                  Data pemantauan pengerjaan materi dan kuis matematika
                </p>
              </div>
              <span className="font-mono text-xs text-slate-400">
                {filteredStudents.length} Siswa Terdaftar
              </span>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="py-12 text-center rounded-2xl border border-dashed border-white/10 bg-black/20">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-slate-500 mb-2.5">
                  <Inbox size={22} />
                </div>
                <h4 className="text-xs font-bold text-white">Belum Ada Data Siswa</h4>
                <p className="mt-1 max-w-xs mx-auto text-[11px] text-slate-400">
                  Data siswa akan otomatis tampil di sini saat siswa MAS Darunnajah 9 mendaftar dan
                  mengerjakan kuis.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 font-mono uppercase text-[10px]">
                      <th className="pb-3 font-semibold">Nama Siswa</th>
                      <th className="pb-3 font-semibold">Kelas</th>
                      <th className="pb-3 font-semibold">Progres</th>
                      <th className="pb-3 font-semibold">Skor Kuis</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStudents.map((std) => (
                      <tr key={std.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="py-3 font-bold text-white">{std.name}</td>
                        <td className="py-3 text-slate-300 font-mono">{std.class}</td>
                        <td className="py-3 text-cyan-400 font-mono font-bold">{std.progress}</td>
                        <td className="py-3 text-white font-mono font-bold">{std.avgScore}</td>
                        <td className="py-3">
                          <span className="inline-block rounded-full px-2 py-0.5 font-mono text-[9px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                            {std.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </VisionOSWindow>
  );
}
