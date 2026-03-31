import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('celestis-theme');
    if (saved) return saved;
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'github-dark';
    }
    return 'github-light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('github-light', 'github-dark', 'celestis');
    root.classList.add(theme);
    localStorage.setItem('celestis-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'github-light') return 'github-dark';
      if (prev === 'github-dark') return 'celestis';
      return 'github-light';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
