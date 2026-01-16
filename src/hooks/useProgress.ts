import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pmp-course-progress';
const AUTH_KEY = 'pmp-authenticated';

interface ProgressState {
  completedChapters: number[];
  completedSections: { [chapterId: number]: string[] };
  lastVisited?: { chapterId: number; sectionId: string };
}

export function useProgress() {
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [completedSections, setCompletedSections] = useState<{ [chapterId: number]: string[] }>({});
  const [lastVisited, setLastVisited] = useState<{ chapterId: number; sectionId: string } | undefined>();

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: ProgressState = JSON.parse(saved);
        setCompletedChapters(parsed.completedChapters || []);
        setCompletedSections(parsed.completedSections || {});
        setLastVisited(parsed.lastVisited);
      } catch (e) {
        console.error('Failed to parse progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  const saveProgress = (state: ProgressState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  const markChapterComplete = (chapterId: number) => {
    setCompletedChapters((prev) => {
      if (prev.includes(chapterId)) return prev;
      const updated = [...prev, chapterId];
      saveProgress({ completedChapters: updated, completedSections, lastVisited });
      return updated;
    });
  };

  const markSectionComplete = (chapterId: number, sectionId: string) => {
    setCompletedSections((prev) => {
      const chapterSections = prev[chapterId] || [];
      if (chapterSections.includes(sectionId)) return prev;
      const updated = {
        ...prev,
        [chapterId]: [...chapterSections, sectionId],
      };
      saveProgress({ completedChapters, completedSections: updated, lastVisited });
      return updated;
    });
  };

  const updateLastVisited = (chapterId: number, sectionId: string) => {
    const updated = { chapterId, sectionId };
    setLastVisited(updated);
    saveProgress({ completedChapters, completedSections, lastVisited: updated });
  };

  const getTotalProgress = (totalChapters: number) => {
    return Math.round((completedChapters.length / totalChapters) * 100);
  };

  const resetProgress = () => {
    setCompletedChapters([]);
    setCompletedSections({});
    setLastVisited(undefined);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    completedChapters,
    completedSections,
    lastVisited,
    markChapterComplete,
    markSectionComplete,
    updateLastVisited,
    getTotalProgress,
    resetProgress,
  };
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    setIsAuthenticated(auth === 'true');
    setIsLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === '01010101') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
}
