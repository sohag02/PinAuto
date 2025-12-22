import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

const handleLogin = async () => {
  if (!email || !password) {
    setError("Please enter both email and password");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const res = await api.auth.login({ email, password });

    localStorage.setItem("token", res.token); // changed from res.data.token
    localStorage.setItem("user", JSON.stringify(res.user));

    navigate("/dashboard");
  } catch (err: any) {
    setError(err.response?.data?.message || err.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  // Handle form submission on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Card className="p-8 rounded-3xl backdrop-blur-xl bg-card/80 border border-border shadow-xl">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">PA</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <Badge variant="gradient" className="mb-3">Welcome Back</Badge>
            <h1 className="text-3xl font-bold text-foreground">Sign in to PinAuto</h1>
            <p className="text-muted-foreground mt-2">Automate your growth in seconds</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-2 mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // onKeyPress={handleKeyPress}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full pl-11 pr-12 py-3 rounded-xl bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // onKeyPress={handleKeyPress}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button type="button" className="text-sm text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
              <ArrowRight className="w-4 h-4" />
            </Button>

            {/* Signup Link */}
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={() => navigate("/register")}
              >
                Create one
              </span>
            </p>

          </form>
        </Card>
      </motion.div>
    </div>
  );
}