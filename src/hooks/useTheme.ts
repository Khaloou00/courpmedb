import { useState, useEffect } from 'react';

const THEME_KEY = 'pmp-theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev;
      localStorage.setItem(THEME_KEY, newValue ? 'dark' : 'light');
      
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newValue;
    });
  };

  return { isDark, toggleTheme };
}
