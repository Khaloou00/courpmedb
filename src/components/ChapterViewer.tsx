import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  CheckCircle, 
  X, 
  LightbulbIcon,
  FileText,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chapter, Section } from "@/data/courseData";
import { QuizSection } from "./QuizSection";
import { FigureDisplay } from "./FigureDisplay";

interface ChapterViewerProps {
  chapter: Chapter;
  onClose: () => void;
  onComplete: (chapterId: number) => void;
}

export function ChapterViewer({ chapter, onClose, onComplete }: ChapterViewerProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);

  const currentSection = chapter.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === chapter.sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;
  const hasQuiz = currentSection.quiz && currentSection.quiz.length > 0;

  const handleNextSection = () => {
    if (!completedSections.includes(currentSection.id)) {
      setCompletedSections([...completedSections, currentSection.id]);
    }

    if (isLastSection) {
      onComplete(chapter.id);
    } else {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setShowQuiz(false);
    }
  };

  const handlePreviousSection = () => {
    if (!isFirstSection) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      setShowQuiz(false);
    }
  };

  const progress = ((currentSectionIndex + 1) / chapter.sections.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col overflow-hidden"
    >
      {/* Header with Banner */}
      <header className="flex-shrink-0 z-10 relative overflow-hidden">
        {/* Banner */}
        <div 
          className="absolute top-0 left-0 right-0 h-32"
          style={{ 
            background: chapter.banner || "linear-gradient(135deg, hsl(220 70% 35%) 0%, hsl(220 60% 25%) 100%)"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-transparent" />
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20.5V18H0v-2h20v-4H0v-2h20v-4H0v-2h20v-4H0V0h22v20.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors backdrop-blur-sm bg-white/10 border border-white/20"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div>
                <p className="text-sm text-white/80">Chapitre {chapter.id}</p>
                <h1 className="font-serif font-bold text-lg text-white">{chapter.title}</h1>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-white/80">
              <BookOpen className="w-4 h-4" />
              <span>Section {currentSectionIndex + 1} / {chapter.sections.length}</span>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="progress-indicator bg-white/20 backdrop-blur-sm">
            <motion.div 
              className="progress-indicator-fill bg-white/40"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Bottom border transition */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto min-h-0">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key={currentSection.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Section title */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold">
                    {currentSection.title}
                  </h2>
                </div>

                {/* Content paragraphs */}
                <div className="space-y-6 mb-8">
                  {currentSection.content.map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-lg leading-relaxed text-foreground/90"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                {/* Key points */}
                {currentSection.keyPoints && currentSection.keyPoints.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <LightbulbIcon className="w-5 h-5 text-secondary" />
                      <h3 className="font-semibold text-lg">Points Clés à Retenir</h3>
                    </div>
                    <ul className="space-y-3">
                      {currentSection.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-foreground/80">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Figures */}
                {currentSection.figures && currentSection.figures.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {currentSection.figures.map((figure) => (
                      <FigureDisplay key={figure.id} figure={figure} />
                    ))}
                  </div>
                )}

                {/* Quiz prompt */}
                {hasQuiz && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-accent/10 border border-accent/30 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-6 h-6 text-accent" />
                        <div>
                          <h3 className="font-semibold">Testez vos connaissances</h3>
                          <p className="text-sm text-muted-foreground">
                            Un quiz est disponible pour cette section
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="accent" 
                        onClick={() => setShowQuiz(true)}
                      >
                        Faire le Quiz
                      </Button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <QuizSection 
                questions={currentSection.quiz!}
                onComplete={() => setShowQuiz(false)}
              />
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Navigation footer */}
      <footer className="flex-shrink-0 bg-card border-t border-border">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousSection}
              disabled={isFirstSection}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Précédent</span>
            </Button>

            {/* Section dots */}
            <div className="flex items-center gap-2">
              {chapter.sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setCurrentSectionIndex(index);
                    setShowQuiz(false);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentSectionIndex
                      ? "bg-primary w-6"
                      : completedSections.includes(section.id)
                      ? "bg-success"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNextSection}
              className="gap-2"
            >
              <span className="hidden sm:inline">
                {isLastSection ? "Terminer" : "Suivant"}
              </span>
              {isLastSection ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
