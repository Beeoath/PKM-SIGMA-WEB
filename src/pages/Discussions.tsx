import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Plus, ThumbsUp, MessageCircle, Pin, Search } from "lucide-react";
import { INITIAL_DISCUSSIONS, DiscussionThread } from "../lib/sigmaData";
import { useAuth } from "../lib/auth";
import { Badge } from "../components/Primitives";

export default function Discussions() {
  const { profile } = useAuth();
  const [threads, setThreads] = useState<DiscussionThread[]>(INITIAL_DISCUSSIONS);
  const [search, setSearch] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Aljabar");

  const filtered = threads.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const thread: DiscussionThread = {
      id: `thr-${Date.now()}`,
      authorName: profile?.full_name || "Siswa MA Darunnajah 9",
      authorRole: profile?.role || "student",
      authorClass: profile?.class_name || "Kelas 11 A",
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      repliesCount: 0,
      upvotes: 1,
      createdAt: "Baru saja",
    };

    setThreads([thread, ...threads]);
    setNewTitle("");
    setNewContent("");
    setIsCreating(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="cyan">
            <MessageSquare size={12} /> FORUM DISKUSI MATEMATIKA
          </Badge>
          <h1 className="mt-2 font-display text-2xl sm:text-3xl font-black text-white">
            Tanya Guru & Diskusi Kelas
          </h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Diskusikan soal TKA yang sulit dan dapatkan bimbingan langsung dari dewan guru.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(!isCreating)}
          className="btn-sigma self-start sm:self-auto"
        >
          <Plus size={16} /> Buat Pertanyaan Baru
        </button>
      </div>

      {/* New Question Form */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-cyan-400/30 bg-[#0d1430]/95 p-6 shadow-2xl space-y-4"
        >
          <h3 className="font-display text-base font-bold text-white">Ajukan Topik / Pertanyaan</h3>
          <div>
            <label className="overline-label mb-1.5 block">Kategori Topik</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="field cursor-pointer"
            >
              <option value="Aljabar">Aljabar & Matriks</option>
              <option value="Fungsi">Fungsi & Kalkulus</option>
              <option value="Geometri">Geometri & Vektor</option>
              <option value="Trigonometri">Trigonometri</option>
              <option value="Statistika">Statistika & Peluang</option>
            </select>
          </div>
          <div>
            <label className="overline-label mb-1.5 block">Judul Pertanyaan</label>
            <input
              required
              className="field"
              placeholder="Misal: Cara cepat mencari invers matriks 3x3..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="overline-label mb-1.5 block">Penjelasan Lengkap</label>
            <textarea
              required
              rows={3}
              className="field"
              placeholder="Tuliskan detail soal atau bagian rumus yang membingungkan..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="btn-ghost"
            >
              Batal
            </button>
            <button type="submit" className="btn-sigma">
              Kirim Diskusi
            </button>
          </div>
        </form>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari topik diskusi atau kata kunci soal..."
          className="field !pl-10"
        />
      </div>

      {/* Thread list */}
      <div className="space-y-3">
        {filtered.map((thr) => (
          <Link
            key={thr.id}
            to={`/app/diskusi/${thr.id}`}
            className="block rounded-2xl border border-white/10 bg-[#0d1430]/70 p-5 hover:border-cyan-400/40 hover:bg-[#111938] transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              {thr.isPinned && (
                <span className="flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-300">
                  <Pin size={10} /> PINNED
                </span>
              )}
              <span className="rounded-md bg-cyan-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-cyan-300">
                {thr.category}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-400">{thr.authorName} ({thr.authorClass})</span>
            </div>

            <h3 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
              {thr.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
              {thr.content}
            </p>

            <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <ThumbsUp size={13} className="text-cyan-400" /> {thr.upvotes} Dukungan
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle size={13} className="text-amber-400" /> {thr.repliesCount} Jawaban
              </span>
              <span className="ml-auto text-[11px] text-slate-500">{thr.createdAt}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
