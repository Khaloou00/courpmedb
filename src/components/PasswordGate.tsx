import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, KeyRound, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoDB from "@/assets/LogoDB.png";

interface PasswordGateProps {
  onAuthenticate: (password: string) => boolean;
}

export function PasswordGate({ onAuthenticate }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuthenticate(password);
    if (!success) {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative z-10 w-full max-w-md ${shake ? 'animate-shake' : ''}`}
      >
        <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl border border-border p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center mb-4 shadow-glow bg-transparent">
              <img 
                src={logoDB} 
                alt="Decide and Build" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-serif font-bold text-foreground">PMP Prep</h1>
            <p className="text-muted-foreground text-sm mt-1">Formation à l'Examen PMP</p>
          </div>

          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>

          <h2 className="text-center text-lg font-semibold mb-2">Accès Protégé</h2>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Veuillez entrer le mot de passe pour accéder à la formation
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={`pl-10 h-12 text-lg ${error ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                autoFocus
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-destructive text-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Mot de passe incorrect</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button type="submit" className="w-full h-12 text-lg" size="lg">
              Accéder à la Formation
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Formation complète basée sur le livre de Rita Mulcahy
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-10px); }
          40%, 80% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
