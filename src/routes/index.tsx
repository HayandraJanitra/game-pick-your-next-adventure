import { createFileRoute } from "@tanstack/react-router";
import {
  Gamepad2, Sparkles, Layers, Cpu, Flame, Trophy, RefreshCw,
  Smartphone, Apple, Monitor, Download, Star, ChevronRight,
  Instagram, Youtube, ArrowRight, Cloud, Joystick,
} from "lucide-react";
import { Mockup } from "@/components/gamepick/Mockup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Game Pick — Temukan Game Terbaik untuk Perangkatmu" },
      { name: "description", content: "Game Pick adalah aplikasi rekomendasi game lintas platform: Android, iOS, PC, PlayStation, Xbox, Switch, Steam Deck, dan Cloud Gaming." },
      { property: "og:title", content: "Game Pick — Rekomendasi Game Lintas Platform" },
      { property: "og:description", content: "Temukan 100.000+ game terbaik untuk perangkatmu berdasarkan genre, rating, spesifikasi, dan popularitas." },
    ],
  }),
  component: LandingPage,
});

const platforms = [
  { name: "Android", icon: Smartphone },
  { name: "iOS", icon: Apple },
  { name: "PC", icon: Monitor },
  { name: "PlayStation", icon: Gamepad2 },
  { name: "Xbox", icon: Joystick },
  { name: "Switch", icon: Gamepad2 },
  { name: "Steam Deck", icon: Cpu },
  { name: "Cloud Gaming", icon: Cloud },
];

const stats = [
  { v: "100.000+", l: "Game" },
  { v: "15+", l: "Platform" },
  { v: "50.000+", l: "Pengguna" },
  { v: "4.8/5", l: "Rating" },
];

const features = [
  { icon: Sparkles, title: "Rekomendasi Personal", desc: "AI mempelajari selera kamu dan menyarankan game yang benar-benar cocok." },
  { icon: Layers, title: "Semua Platform", desc: "Dari Android sampai PlayStation, semua tersinkron dalam satu app." },
  { icon: Cpu, title: "Cek Spesifikasi", desc: "Pastikan game bisa berjalan mulus di perangkatmu sebelum download." },
  { icon: Flame, title: "Game Populer", desc: "Tren harian dan mingguan dari komunitas gamer global." },
  { icon: Trophy, title: "Game of the Year", desc: "Daftar lengkap pemenang GOTY dari tahun ke tahun." },
  { icon: RefreshCw, title: "Update Terbaru", desc: "Berita rilis, patch, dan event eksklusif setiap hari." },
];

const steps = [
  { n: "01", t: "Pilih Perangkat", d: "Pilih device favoritmu — mobile, console, PC, atau cloud." },
  { n: "02", t: "Pilih Genre", d: "RPG, FPS, racing, indie — pilih yang sesuai mood." },
  { n: "03", t: "Dapatkan Rekomendasi", d: "Daftar game personal langsung muncul dalam hitungan detik." },
  { n: "04", t: "Download & Mainkan", d: "Akses cepat ke store resmi platformmu." },
];

const mockups = [
  { kind: "home", title: "Home Dashboard" },
  { kind: "recommended", title: "Recommended Games" },
  { kind: "detail", title: "Detail Game" },
  { kind: "goty", title: "Hall of Fame GOTY" },
  { kind: "platforms", title: "Platform Explorer" },
  { kind: "profile", title: "User Profile" },
] as const;

const popularByPlatform = [
  { platform: "PC", games: ["Cyberpunk 2077", "Elden Ring", "Baldur's Gate 3"] },
  { platform: "PlayStation", games: ["Spider-Man 2", "God of War Ragnarök", "Final Fantasy XVI"] },
  { platform: "Mobile", games: ["Genshin Impact", "Honkai: Star Rail", "Wuthering Waves"] },
  { platform: "Switch", games: ["Zelda: TOTK", "Mario Wonder", "Metroid Prime"] },
];

const goty = [
  { year: 2024, title: "Astro Bot", hue: 200 },
  { year: 2023, title: "Baldur's Gate 3", hue: 280 },
  { year: 2022, title: "Elden Ring", hue: 40 },
  { year: 2021, title: "It Takes Two", hue: 320 },
  { year: 2020, title: "The Last of Us II", hue: 260 },
];

const faqs = [
  { q: "Apakah Game Pick gratis?", a: "Ya, Game Pick gratis untuk semua pengguna. Tersedia versi Pro opsional dengan fitur tambahan." },
  { q: "Platform apa saja yang didukung?", a: "Android, iOS, PC, PlayStation, Xbox, Nintendo Switch, Steam Deck, dan Cloud Gaming." },
  { q: "Bagaimana sistem rekomendasinya bekerja?", a: "Kami menggabungkan AI personalisasi dengan rating komunitas, popularitas, dan kecocokan spesifikasi perangkatmu." },
  { q: "Apakah saya bisa cek spesifikasi PC saya?", a: "Bisa. Game Pick mendeteksi spesifikasi otomatis dan memberi rekomendasi yang cocok." },
  { q: "Apakah datanya aman?", a: "Sangat aman. Kami tidak menjual data pribadi pengguna ke pihak ketiga." },
];

function LandingPage() {
  return (
    <div className="min-h-screen text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 glass-strong border-b border-white/5">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center glow">
              <Gamepad2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Game Pick</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#fitur" className="hover:text-foreground transition">Fitur</a>
            <a href="#cara-kerja" className="hover:text-foreground transition">Cara Kerja</a>
            <a href="#goty" className="hover:text-foreground transition">GOTY</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </nav>
          <a href="#download" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition">
            <Download className="w-4 h-4" /> Download
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="container mx-auto px-6 pt-20 pb-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse-glow" />
                Rekomendasi game pintar untuk semua platform
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
                Temukan Game <span className="text-gradient">Terbaik</span> untuk Perangkatmu
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Game Pick membantu kamu menemukan game terbaik berdasarkan perangkat, genre,
                rating, spesifikasi, dan popularitas — lintas mobile, console, PC, hingga cloud.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#download" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-semibold glow hover:scale-[1.02] transition">
                  <Download className="w-4 h-4" /> Download Sekarang
                </a>
                <a href="#fitur" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong font-semibold hover:border-white/20 transition">
                  Lihat Rekomendasi <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground">
                {platforms.slice(0, 8).map((p) => (
                  <span key={p.name} className="inline-flex items-center gap-1.5">
                    <p.icon className="w-3.5 h-3.5 text-cyan" /> {p.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-violet opacity-20 blur-3xl rounded-full" />
              <div className="grid grid-cols-2 gap-4 relative">
                <div className="space-y-4 animate-float">
                  <Mockup kind="home" title="Home Dashboard" />
                  <Mockup kind="detail" title="Detail Game" />
                </div>
                <div className="space-y-4 mt-10 animate-float" style={{ animationDelay: "1.5s" }}>
                  <Mockup kind="recommended" title="Recommended" />
                  <Mockup kind="goty" title="GOTY" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container mx-auto px-6 -mt-10 relative z-10">
        <div className="glass-strong rounded-3xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gradient font-display">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="fitur" className="container mx-auto px-6 py-28">
        <div className="max-w-2xl mb-14">
          <div className="text-sm text-cyan font-mono mb-3">// Fitur Utama</div>
          <h2 className="text-4xl md:text-5xl font-bold">Semua yang gamer butuhkan, dalam satu app.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 card-hover">
              <div className="w-12 h-12 rounded-xl bg-gradient-violet grid place-items-center mb-4 glow">
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm text-cyan font-mono mb-3">// Cara Kerja</div>
          <h2 className="text-4xl md:text-5xl font-bold">4 langkah, langsung main.</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative glass rounded-2xl p-6 card-hover">
              <div className="text-5xl font-display font-bold text-gradient opacity-80">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan/60" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mb-14">
          <div className="text-sm text-cyan font-mono mb-3">// Screenshot Aplikasi</div>
          <h2 className="text-4xl md:text-5xl font-bold">Antarmuka yang dibuat untuk gamer.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockups.map((m) => (
            <Mockup key={m.title} kind={m.kind} title={m.title} />
          ))}
        </div>
      </section>

      {/* POPULAR BY PLATFORM */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mb-14">
          <div className="text-sm text-cyan font-mono mb-3">// Game Populer</div>
          <h2 className="text-4xl md:text-5xl font-bold">Tren teratas per platform.</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularByPlatform.map((p, i) => (
            <div key={p.platform} className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-lg grid place-items-center"
                  style={{ background: `linear-gradient(135deg, oklch(0.55 0.22 ${200 + i * 30}), oklch(0.45 0.22 ${260 + i * 20}))` }}>
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div className="font-semibold">{p.platform}</div>
              </div>
              <ul className="space-y-3">
                {p.games.map((g, idx) => (
                  <li key={g} className="flex items-center gap-3 text-sm">
                    <span className="text-xs font-mono text-cyan w-4">{idx + 1}</span>
                    <span className="flex-1">{g}</span>
                    <Star className="w-3.5 h-3.5 fill-cyan text-cyan" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* GOTY */}
      <section id="goty" className="container mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs mb-4">
            <Trophy className="w-3.5 h-3.5 text-yellow-300" /> Hall of Fame
          </div>
          <h2 className="text-4xl md:text-5xl font-bold">Game of the Year</h2>
          <p className="mt-3 text-muted-foreground">Pemenang penghargaan tertinggi dari komunitas dan industri.</p>
        </div>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {goty.map((g) => (
            <div key={g.year} className="glass rounded-2xl overflow-hidden card-hover">
              <div className="aspect-[3/4] relative"
                style={{ background: `linear-gradient(135deg, oklch(0.5 0.22 ${g.hue}), oklch(0.3 0.2 ${g.hue + 40}))` }}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0_/_0.2),transparent_60%)]" />
                <div className="absolute top-3 left-3 glass rounded-full px-3 py-1 text-xs font-mono">{g.year}</div>
                <Trophy className="absolute bottom-3 right-3 w-6 h-6 text-yellow-300/80" />
              </div>
              <div className="p-4">
                <div className="font-semibold">{g.title}</div>
                <div className="text-xs text-muted-foreground mt-1">Winner GOTY {g.year}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-sm text-cyan font-mono mb-3">// FAQ</div>
            <h2 className="text-4xl md:text-5xl font-bold">Pertanyaan yang sering ditanya.</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details key={i} className="group glass rounded-2xl p-5 cursor-pointer card-hover">
                <summary className="flex items-center justify-between list-none">
                  <span className="font-semibold">{f.q}</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90 text-cyan" />
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section id="download" className="container mx-auto px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center">
          <div className="absolute inset-0 opacity-50" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold">
              Siap menemukan <span className="text-gradient">game berikutnya?</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Download Game Pick gratis di perangkat favoritmu hari ini.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { icon: Smartphone, label: "Android", sub: "Google Play" },
                { icon: Apple, label: "iOS", sub: "App Store" },
                { icon: Monitor, label: "PC", sub: "Windows / Mac" },
              ].map((d) => (
                <a key={d.label} href="#" className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl glass-strong hover:border-white/30 transition card-hover">
                  <d.icon className="w-6 h-6 text-cyan" />
                  <div className="text-left">
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{d.sub}</div>
                    <div className="font-semibold text-sm">Download untuk {d.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 mt-10">
        <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary grid place-items-center">
                <Gamepad2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">Game Pick</span>
            </div>
            <p className="text-sm text-muted-foreground">Rekomendasi game pintar untuk semua perangkat.</p>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Perusahaan</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan transition">About</a></li>
              <li><a href="#" className="hover:text-cyan transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Legal</div>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-3 text-muted-foreground">Sosial</div>
            <div className="flex gap-2">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: TikTokIcon, label: "TikTok" },
                { icon: Youtube, label: "YouTube" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-10 h-10 rounded-xl glass grid place-items-center hover:border-cyan/40 transition">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="container mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Game Pick. All rights reserved.</div>
            <div>Made for gamers, by gamers.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.86a8.16 8.16 0 0 0 4.77 1.52V6.93a4.85 4.85 0 0 1-1.84-.24Z" />
    </svg>
  );
}
