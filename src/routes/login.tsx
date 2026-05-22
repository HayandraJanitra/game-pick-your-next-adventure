import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Gamepad2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Silakan isi semua kolom!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Email atau password salah");
      }

      // Save token and user info in localStorage
      localStorage.setItem("gamepick_token", data.token);
      localStorage.setItem("gamepick_user", JSON.stringify(data.user));

      toast.success(`Selamat datang kembali, ${data.user.name}!`);

      // Redirect depending on user role
      if (data.user.role === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/" });
      }
    } catch (error: any) {
      toast.error(error.message || "Gagal masuk. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background px-4 py-12 overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-violet opacity-25 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-gradient-primary opacity-25 blur-3xl rounded-full pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md glass-strong rounded-3xl p-8 relative z-10 border border-white/10 shadow-2xl">
        {/* Header/Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-primary grid place-items-center glow mb-4 animate-float">
            <Gamepad2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-display font-bold text-center tracking-tight">
            SIGN <span className="text-gradient">IN</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Masuk untuk menjelajahi ribuan game impianmu
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground pointer-events-none">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 border border-white/5 focus:border-cyan/40 rounded-xl py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground pointer-events-none">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 hover:bg-black/50 focus:bg-black/60 border border-white/5 focus:border-cyan/40 rounded-xl py-3 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold glow hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-55 disabled:scale-100 disabled:pointer-events-none transition cursor-pointer"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                Masuk Game Pick <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-muted-foreground border-t border-white/5 pt-6">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-cyan font-semibold hover:underline transition"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}
