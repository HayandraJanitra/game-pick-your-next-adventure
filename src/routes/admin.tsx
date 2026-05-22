import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Gamepad2,
  LayoutDashboard,
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Home,
  Star,
  Layers,
  Percent,
  Gamepad,
  X,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

interface Game {
  id: number;
  title: string;
  description: string;
  genre: string;
  platform: string;
  rating: number;
  release_year: number;
  image_url: string;
}

interface Stats {
  totalGames: number;
  avgRating: string;
  totalGenres: number;
  activeUsers: number;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  // Stats State
  const [stats, setStats] = useState<Stats>({
    totalGames: 0,
    avgRating: "0.0",
    totalGenres: 0,
    activeUsers: 1,
  });

  // Games List State
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form / Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    genre: "",
    platforms: [] as string[],
    rating: 0.0,
    release_year: new Date().getFullYear(),
    image_url: "",
  });

  const availablePlatforms = [
    "PC",
    "PlayStation",
    "Xbox",
    "Switch",
    "Android",
    "iOS",
    "Steam Deck",
    "Cloud Gaming"
  ];

  const availableGenres = [
    "RPG",
    "FPS",
    "Action",
    "Racing",
    "Adventure",
    "Strategy",
    "Sports",
    "Indie",
    "Simulation"
  ];

  // Auth Protection Check
  useEffect(() => {
    const storedToken = localStorage.getItem("gamepick_token");
    const storedUserStr = localStorage.getItem("gamepick_user");

    if (!storedToken || !storedUserStr) {
      toast.error("Silakan masuk terlebih dahulu!");
      navigate({ to: "/login" });
      return;
    }

    try {
      const storedUser = JSON.parse(storedUserStr);
      if (storedUser.role !== "admin") {
        toast.error("Akses ditolak! Anda bukan admin.");
        navigate({ to: "/" });
        return;
      }
      setUser(storedUser);
      setToken(storedToken);
      setIsAuthorized(true);
    } catch (e) {
      toast.error("Sesi tidak valid, silakan masuk kembali.");
      navigate({ to: "/login" });
    }
  }, [navigate]);

  // Fetch Data
  const fetchData = async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      // 1. Fetch Games list
      const gamesRes = await fetch(`${API_URL}/api/games`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (gamesRes.ok) {
        const gamesData = await gamesRes.json();
        setGames(gamesData);
      }

      // 2. Fetch Stats
      const statsRes = await fetch(`${API_URL}/api/games/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data dari server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized && token) {
      fetchData();
    }
  }, [isAuthorized, token]);

  const handleLogout = () => {
    localStorage.removeItem("gamepick_token");
    localStorage.removeItem("gamepick_user");
    toast.success("Berhasil keluar dashboard admin.");
    navigate({ to: "/" });
  };

  // Open Add Game modal
  const openAddModal = () => {
    setEditingGame(null);
    setFormData({
      title: "",
      description: "",
      genre: "RPG",
      platforms: [],
      rating: 4.5,
      release_year: new Date().getFullYear(),
      image_url: "",
    });
    setIsModalOpen(true);
  };

  // Open Edit Game modal
  const openEditModal = (game: Game) => {
    setEditingGame(game);
    // Parse platforms list
    const platformsArr = game.platform ? game.platform.split(", ").map(p => p.trim()) : [];
    setFormData({
      title: game.title,
      description: game.description || "",
      genre: game.genre || "RPG",
      platforms: platformsArr,
      rating: Number(game.rating) || 0.0,
      release_year: game.release_year || new Date().getFullYear(),
      image_url: game.image_url || "",
    });
    setIsModalOpen(true);
  };

  // Toggle platform checkbox
  const handlePlatformChange = (platformName: string) => {
    if (formData.platforms.includes(platformName)) {
      setFormData({
        ...formData,
        platforms: formData.platforms.filter((p) => p !== platformName),
      });
    } else {
      setFormData({
        ...formData,
        platforms: [...formData.platforms, platformName],
      });
    }
  };

  // Submit Form (Add or Edit)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.genre || formData.platforms.length === 0) {
      toast.error("Title, genre, dan minimal 1 platform wajib diisi!");
      return;
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      genre: formData.genre,
      platform: formData.platforms, // Will join on server
      rating: formData.rating,
      release_year: formData.release_year,
      image_url: formData.image_url,
    };

    try {
      const url = editingGame
        ? `${API_URL}/api/games/${editingGame.id}`
        : `${API_URL}/api/games`;
      const method = editingGame ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menyimpan game");
      }

      toast.success(editingGame ? "Game berhasil diperbarui!" : "Game baru berhasil ditambahkan!");
      setIsModalOpen(false);
      fetchData(); // Reload stats and table
    } catch (error: any) {
      toast.error(error.message || "Gagal memproses data");
    }
  };

  // Delete Game
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus game ini?")) return;

    try {
      const res = await fetch(`${API_URL}/api/games/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal menghapus game");
      }

      toast.success("Game berhasil dihapus!");
      fetchData(); // Reload stats and table
    } catch (error: any) {
      toast.error(error.message || "Gagal menghapus data");
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <span className="w-10 h-10 border-4 border-cyan/30 border-t-cyan rounded-full animate-spin inline-block mb-4" />
          <p className="text-sm font-semibold tracking-wide text-muted-foreground">
            Memeriksa Otorisasi Admin...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* SIDEBAR */}
      <aside className="w-64 glass-strong border-r border-white/5 flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-white/5 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center glow shrink-0">
            <Gamepad2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">Game Pick</span>
        </div>

        {/* Profile Card */}
        <div className="p-5 border-b border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-violet flex items-center justify-center font-bold text-sm text-foreground">
            A
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold truncate text-foreground">{user?.name}</div>
            <div className="text-[10px] text-cyan font-mono tracking-wider font-semibold uppercase">
              {user?.role} Mode
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider px-3 mb-2">
            Main Menu
          </div>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow-sm transition"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm">Dashboard CRUD</span>
          </a>
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Lihat Website</span>
          </Link>
        </nav>

        {/* Footer Logout */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Sistem</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto px-8 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kelola daftar rekomendasi game lintas platform.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold glow hover:opacity-90 hover:scale-[1.01] transition cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5" /> Tambah Game Baru
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1 */}
          <div className="glass rounded-2xl p-6 flex items-center justify-between border border-white/5">
            <div>
              <div className="text-sm text-muted-foreground font-medium">Total Game</div>
              <div className="text-3xl font-display font-bold mt-1 text-gradient">
                {stats.totalGames}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center">
              <Gamepad className="w-6 h-6 text-cyan" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass rounded-2xl p-6 flex items-center justify-between border border-white/5">
            <div>
              <div className="text-sm text-muted-foreground font-medium">Rating Rata-rata</div>
              <div className="text-3xl font-display font-bold mt-1 text-gradient">
                {stats.avgRating} <span className="text-xs text-muted-foreground font-sans">/ 5.0</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-400/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass rounded-2xl p-6 flex items-center justify-between border border-white/5">
            <div>
              <div className="text-sm text-muted-foreground font-medium">Total Genre</div>
              <div className="text-3xl font-display font-bold mt-1 text-gradient">
                {stats.totalGenres}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-violet/10 flex items-center justify-center">
              <Layers className="w-6 h-6 text-violet" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="glass rounded-2xl p-6 flex items-center justify-between border border-white/5">
            <div>
              <div className="text-sm text-muted-foreground font-medium">Pengguna Aktif</div>
              <div className="text-3xl font-display font-bold mt-1 text-gradient">
                {stats.activeUsers} <span className="text-xs text-muted-foreground font-sans">Online</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Percent className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* GAMES TABLE */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden shadow-xl">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan" /> Semua Koleksi Game ({games.length})
            </h3>
            <span className="text-xs font-mono text-muted-foreground">Admin Mode</span>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">
              <span className="w-8 h-8 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin inline-block mb-2" />
              <p className="text-sm">Memuat data game...</p>
            </div>
          ) : games.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Gamepad className="w-12 h-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-sm">Belum ada game yang ditambahkan.</p>
              <button
                onClick={openAddModal}
                className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-foreground transition"
              >
                Tambah Game Pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-black/10 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <th className="px-6 py-4">Cover & Judul</th>
                    <th className="px-6 py-4">Genre</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {games.map((game) => (
                    <tr key={game.id} className="hover:bg-white/[0.01] transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-16 rounded-lg bg-neutral-800 shrink-0 overflow-hidden border border-white/10 flex items-center justify-center">
                            {game.image_url ? (
                              <img
                                src={game.image_url}
                                alt={game.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Gamepad className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-foreground truncate max-w-xs">
                              {game.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              Tahun Rilis: {game.release_year}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet/10 text-violet border border-violet/20">
                          {game.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {game.platform.split(", ").map((p) => (
                            <span
                              key={p}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyan/10 text-cyan border border-cyan/20"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 font-semibold text-yellow-400">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 shrink-0" />
                          <span>{Number(game.rating).toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditModal(game)}
                            title="Edit Game"
                            className="p-2 rounded-lg bg-cyan/10 hover:bg-cyan/20 text-cyan transition cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(game.id)}
                            title="Hapus Game"
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* POPUP MODAL (Add / Edit Form) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="w-full max-w-lg glass-strong border border-white/10 rounded-3xl p-6 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <h3 className="text-xl font-display font-bold">
                {editingGame ? "Edit Game Detail" : "Tambah Game Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Judul Game
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Cyberpunk 2077"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-black/40 border border-white/5 focus:border-cyan/40 rounded-xl py-2.5 px-4 text-sm text-foreground outline-none transition"
                  required
                />
              </div>

              {/* Genre & Rating */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Genre
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 focus:border-cyan/40 rounded-xl py-2.5 px-3 text-sm text-foreground outline-none transition"
                  >
                    {availableGenres.map((g) => (
                      <option key={g} value={g} className="bg-background">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Rating (0 - 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="Contoh: 4.8"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-black/40 border border-white/5 focus:border-cyan/40 rounded-xl py-2.5 px-4 text-sm text-foreground outline-none transition"
                    required
                  />
                </div>
              </div>

              {/* Release Year & Image URL */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Tahun Rilis
                  </label>
                  <input
                    type="number"
                    placeholder="2024"
                    value={formData.release_year}
                    onChange={(e) => setFormData({ ...formData, release_year: parseInt(e.target.value) || new Date().getFullYear() })}
                    className="w-full bg-black/40 border border-white/5 focus:border-cyan/40 rounded-xl py-2.5 px-4 text-sm text-foreground outline-none transition"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    Image URL Cover
                  </label>
                  <input
                    type="text"
                    placeholder="http://..."
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 focus:border-cyan/40 rounded-xl py-2.5 px-4 text-sm text-foreground outline-none transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Deskripsi Singkat
                </label>
                <textarea
                  placeholder="Tulis deskripsi game di sini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full h-20 bg-black/40 border border-white/5 focus:border-cyan/40 rounded-xl py-2.5 px-4 text-sm text-foreground outline-none transition resize-none"
                />
              </div>

              {/* Platforms Multiselect Checkbox */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Platform Lintas Perangkat (Pilih minimal satu)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {availablePlatforms.map((p) => {
                    const isChecked = formData.platforms.includes(p);
                    return (
                      <button
                        type="button"
                        key={p}
                        onClick={() => handlePlatformChange(p)}
                        className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition cursor-pointer ${
                          isChecked
                            ? "bg-cyan/15 border-cyan text-cyan"
                            : "bg-white/5 border-white/5 text-muted-foreground hover:border-white/10"
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-white/5 bg-transparent hover:bg-white/5 text-foreground transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-primary text-primary-foreground glow hover:opacity-90 transition cursor-pointer"
                >
                  {editingGame ? "Simpan Perubahan" : "Tambahkan Game"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
