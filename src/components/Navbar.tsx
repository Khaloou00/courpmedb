import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Moon, 
  Sun, 
  BarChart3, 
  X,
  CheckCircle,
  Circle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { chapters } from "@/data/courseData";
import logoDB from "@/assets/LogoDB.png";

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  completedChapters: number[];
  totalChapters: number;
  onLogout: () => void;
}

export function Navbar({ 
  isDark, 
  onToggleTheme, 
  completedChapters, 
  totalChapters,
  onLogout 
}: NavbarProps) {
  const [showProgress, setShowProgress] = useState(false);
  const progressPercentage = Math.round((completedChapters.length / totalChapters) * 100);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-transparent">
                <img 
                  src={logoDB} 
                  alt="Decide and Build" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-serif font-bold text-lg">PMP Prep</span>
                <span className="text-xs text-muted-foreground block -mt-1">Formation PMP</span>
              </div>
            </a>

            {/* Progress indicator */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Progress button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProgress(true)}
                className="gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Progression</span>
                <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                  {progressPercentage}%
                </span>
              </Button>

              {/* Theme toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleTheme}
                className="w-10 h-10"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isDark ? 'dark' : 'light'}
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? (
                      <Sun className="w-5 h-5 text-secondary" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Button>

              {/* Logout button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="w-10 h-10 text-muted-foreground hover:text-destructive"
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress modal */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowProgress(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card rounded-2xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-xl font-serif font-bold">Votre Progression</h2>
                  <p className="text-sm text-muted-foreground">
                    {completedChapters.length} sur {totalChapters} chapitres complétés
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowProgress(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progression globale</span>
                  <span className="text-2xl font-bold text-primary">{progressPercentage}%</span>
                </div>
                <div className="progress-indicator h-3">
                  <motion.div
                    className="progress-indicator-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Chapter list */}
              <div className="p-4 overflow-y-auto max-h-[40vh]">
                <div className="space-y-2">
                  {chapters.map((chapter) => {
                    const isCompleted = completedChapters.includes(chapter.id);
                    return (
                      <div
                        key={chapter.id}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          isCompleted ? 'bg-success/10' : 'bg-muted/50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${
                            isCompleted ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {chapter.id}. {chapter.title}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {chapter.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border bg-muted/30">
                <Button 
                  onClick={() => setShowProgress(false)} 
                  className="w-full"
                >
                  Continuer la Formation
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
