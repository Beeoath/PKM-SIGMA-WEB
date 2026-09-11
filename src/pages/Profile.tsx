import React, { useState } from "react";
import { User, Award, Shield, Sparkles, Check, Save, LogOut, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../lib/auth";
import { Badge } from "../components/Primitives";
import VisionOSWindow from "../components/VisionOSWindow";

export default function Profile() {
  const { profile, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  
  // Normalize existing class to eliminate any IPA/IPS
  const initialClass = profile?.class_name?.includes("B") || profile?.class_name?.includes("2")
    ? "Kelas 11 B"
    : "Kelas 11 A";
  const [className, setClassName] = useState(profile?.role === "teacher" ? "Pengampu Matematika" : initialClass);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ full_name: fullName, class_name: className });
    toast.success("Profil berhasil disimpan!");
  };

  const handleLogout = () => {
    logout();
    navigate("/masuk");
  };

  const badges = [
    { title: "Cyber Algebraist", desc: "Selesaikan modul matriks 3x3", unlocked: true },
    { title: "Vector Scout", desc: "Kuasai proyeksi ortogonal dimensi 3", unlocked: true },
    { title: "Calculus Dynamo", desc: "Raih akurasi 100% pada kuis limit", unlocked: false },
    { title: "TKA Grandmaster", desc: "Selesaikan seluruh 5 distrik SIGMA", unlocked: false },
  ];

  return (
    <VisionOSWindow
      role={profile?.role || "student"}
      activeDockItem="profile"
      urlPath="sigma.darunnajah9.sch.id/profile"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Top Header Row */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Link
              to={profile?.role === "teacher" ? "/teacher/dashboard" : "/app"}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              title="Kembali ke Dashboard"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Pengaturan Profil Akun
              </h1>
              <p className="text-xs text-slate-400">
                Data identitas resmi siswa/guru di MAS Darunnajah 9
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1.5 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors"
          >
            <LogOut size={13} />
            <span>Keluar Akun</span>
          </button>
        </div>

        {/* Profile Card Form */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7 backdrop-blur-xl shadow-xl">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-5 border-b border-white/10">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 font-black grid place-items-center text-2xl shadow-lg shadow-cyan-500/20">
                {profile?.full_name?.charAt(0) || "U"}
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {profile?.full_name || "Pengguna"}
                </h2>
                <p className="font-mono text-xs text-slate-400">{profile?.email}</p>
                <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-2">
                  <span className="inline-block rounded-full bg-cyan-500/20 border border-cyan-400/30 px-2.5 py-0.5 text-[10px] font-bold font-mono text-cyan-300 uppercase">
                    {profile?.role === "teacher" ? "Guru Pengajar" : "Siswa Kelas 11"}
                  </span>
                  <span className="text-[11px] text-slate-400">MAS Darunnajah 9</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Nama Lengkap
                </label>
                <input
                  required
                  className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400/50 transition-colors"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 block">
                  Rombel / Kelas
                </label>
                {profile?.role === "teacher" ? (
                  <input
                    disabled
                    className="h-10 w-full rounded-xl border border-white/10 bg-black/20 px-3.5 text-xs text-slate-400 cursor-not-allowed"
                    value="Pengampu Matematika (Semua Rombel)"
                  />
                ) : (
                  <select
                    required
                    className="h-10 w-full rounded-xl border border-white/10 bg-black/40 px-3 text-xs text-white outline-none focus:border-cyan-400/50 transition-colors cursor-pointer"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                  >
                    <option value="Kelas 11 A" className="bg-slate-900 text-white">Kelas 11 A</option>
                    <option value="Kelas 11 B" className="bg-slate-900 text-white">Kelas 11 B</option>
                  </select>
                )}
                {profile?.role !== "teacher" && (
                  <p className="mt-1 text-[10px] text-slate-400">
                    Pilih salah satu dari 2 kelas rombel yang tersedia.
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-white text-slate-950 px-5 py-2 text-xs font-bold shadow-lg hover:bg-slate-200 transition-all cursor-pointer"
              >
                <Save size={14} /> Simpan Perubahan
              </button>
            </div>
          </form>
        </div>

        {/* Badges Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white flex items-center gap-2 tracking-wide uppercase">
            <Award size={16} className="text-amber-400" /> Lencana Pencapaian Belajar
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((b, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-3.5 flex items-start gap-3 transition-all ${
                  b.unlocked
                    ? "border-cyan-400/30 bg-white/[0.04] shadow-md"
                    : "border-white/5 bg-white/[0.01] opacity-50"
                }`}
              >
                <div
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl font-mono text-xs ${
                    b.unlocked
                      ? "bg-cyan-400/20 text-cyan-300 border border-cyan-400/40"
                      : "bg-white/5 text-slate-500"
                  }`}
                >
                  <Award size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-white">{b.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{b.desc}</p>
                  <span className="font-mono text-[9px] font-bold mt-1.5 inline-block">
                    {b.unlocked ? (
                      <span className="text-cyan-400">✓ Sudah Terverifikasi</span>
                    ) : (
                      <span className="text-slate-500">Terkunci</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </VisionOSWindow>
  );
}
