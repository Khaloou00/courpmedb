import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HeroSection } from "@/components/HeroSection";
import { ChapterGrid } from "@/components/ChapterGrid";
import { ChapterViewer } from "@/components/ChapterViewer";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PasswordGate } from "@/components/PasswordGate";
import { Chapter, chapters } from "@/data/courseData";
import { useProgress, useAuth } from "@/hooks/useProgress";
import { useTheme } from "@/hooks/useTheme";

const Index = () => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { 
    completedChapters, 
    markChapterComplete 
  } = useProgress();

  const handleStartCourse = () => {
    const element = document.getElementById("chapters");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectChapter = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  const handleCloseChapter = () => {
    setSelectedChapter(null);
  };

  const handleCompleteChapter = (chapterId: number) => {
    markChapterComplete(chapterId);
    setSelectedChapter(null);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <PasswordGate onAuthenticate={login} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isDark={isDark}
        onToggleTheme={toggleTheme}
        completedChapters={completedChapters}
        totalChapters={chapters.length}
        onLogout={logout}
      />
      
      <div className="pt-16">
        <HeroSection onStartCourse={handleStartCourse} />
        
        <div id="chapters">
          <ChapterGrid 
            onSelectChapter={handleSelectChapter}
            completedChapters={completedChapters}
          />
        </div>

        <Footer />
      </div>

      <AnimatePresence>
        {selectedChapter && (
          <ChapterViewer
            chapter={selectedChapter}
            onClose={handleCloseChapter}
            onComplete={handleCompleteChapter}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
