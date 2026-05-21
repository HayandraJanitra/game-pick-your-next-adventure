import { Gamepad2, Star, Trophy, Search, User, Layers } from "lucide-react";

type MockupKind = "home" | "recommended" | "detail" | "goty" | "platforms" | "profile";

const games = [
  { name: "Neon Drift", genre: "Racing", rating: 4.9, hue: 200 },
  { name: "Shadow Realm", genre: "RPG", rating: 4.8, hue: 280 },
  { name: "Pixel Quest", genre: "Adventure", rating: 4.7, hue: 260 },
  { name: "Cyber Strike", genre: "FPS", rating: 4.8, hue: 220 },
];

function Tile({ hue, label }: { hue: number; label?: string }) {
  return (
    <div
      className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10"
      style={{
        background: `linear-gradient(135deg, oklch(0.45 0.22 ${hue}), oklch(0.3 0.18 ${hue + 40}))`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0_/_0.25),transparent_60%)]" />
      {label && (
        <div className="absolute bottom-2 left-2 right-2 text-[10px] font-medium text-white/90 truncate">
          {label}
        </div>
      )}
    </div>
  );
}

export function Mockup({ kind, title }: { kind: MockupKind; title: string }) {
  return (
    <div className="glass-strong rounded-2xl p-4 shadow-2xl card-hover h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <div className="ml-auto text-[10px] text-muted-foreground font-mono">gamepick.app</div>
      </div>

      {kind === "home" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
            <Search className="w-3.5 h-3.5 text-cyan" />
            <div className="text-[10px] text-muted-foreground">Cari game atau platform...</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {games.slice(0, 3).map((g) => <Tile key={g.name} hue={g.hue} label={g.name} />)}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {games.slice(0, 2).map((g) => <Tile key={g.name} hue={g.hue + 30} label={g.genre} />)}
          </div>
        </div>
      )}

      {kind === "recommended" && (
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-cyan">Untukmu hari ini</div>
          {games.map((g) => (
            <div key={g.name} className="flex items-center gap-3 glass rounded-lg p-2">
              <div className="w-10 h-10 rounded-md" style={{ background: `linear-gradient(135deg, oklch(0.5 0.22 ${g.hue}), oklch(0.35 0.2 ${g.hue + 40}))` }} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium truncate">{g.name}</div>
                <div className="text-[9px] text-muted-foreground">{g.genre}</div>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <Star className="w-2.5 h-2.5 fill-cyan text-cyan" />{g.rating}
              </div>
            </div>
          ))}
        </div>
      )}

      {kind === "detail" && (
        <div className="space-y-3">
          <Tile hue={270} />
          <div>
            <div className="text-sm font-semibold">Shadow Realm</div>
            <div className="text-[10px] text-muted-foreground">RPG • Open World</div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-[9px]">
            {["PC", "PS5", "Xbox"].map((p) => (
              <div key={p} className="glass rounded-md py-1.5 text-center">{p}</div>
            ))}
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-primary" />
          </div>
        </div>
      )}

      {kind === "goty" && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <div className="text-[11px] font-semibold">Hall of Fame</div>
          </div>
          {[2024, 2023, 2022].map((y, i) => (
            <div key={y} className="flex items-center gap-3 glass rounded-lg p-2">
              <div className="text-[10px] font-mono text-cyan">{y}</div>
              <Tile hue={260 + i * 20} />
              <div className="flex-1 text-[10px] font-medium">GOTY {y}</div>
            </div>
          ))}
        </div>
      )}

      {kind === "platforms" && (
        <div className="grid grid-cols-2 gap-2">
          {["PC", "PlayStation", "Xbox", "Switch", "Android", "iOS"].map((p, i) => (
            <div key={p} className="glass rounded-lg p-2.5 flex items-center gap-2">
              <Gamepad2 className="w-3.5 h-3.5 text-cyan" style={{ color: `oklch(0.75 0.2 ${200 + i * 20})` }} />
              <div className="text-[10px] font-medium">{p}</div>
            </div>
          ))}
        </div>
      )}

      {kind === "profile" && (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-violet flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[12px] font-semibold">Player_01</div>
              <div className="text-[9px] text-muted-foreground">Level 42 • Pro Gamer</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[["128", "Games"], ["32", "GOTY"], ["7", "Devices"]].map(([v, l]) => (
              <div key={l} className="glass rounded-lg p-2">
                <div className="text-sm font-bold text-cyan">{v}</div>
                <div className="text-[9px] text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <div className="glass rounded-lg p-2 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-violet" />
            <div className="text-[10px]">Koleksi: 24 wishlist</div>
          </div>
        </div>
      )}

      <div className="mt-3 text-[10px] text-center text-muted-foreground">{title}</div>
    </div>
  );
}
