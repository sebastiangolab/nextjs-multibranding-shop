"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

enum ThemeMode {
  LIGHT = "light",
  DARK = "dark",
}

export const useThemeMode = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme || ThemeMode.LIGHT;
  const isDark = currentTheme === ThemeMode.DARK;
  const isLight = currentTheme === ThemeMode.LIGHT;

  return {
    theme: currentTheme,
    isDark,
    isLight,
    mounted,
    setTheme,
    toggleTheme: () => setTheme(isDark ? ThemeMode.LIGHT : ThemeMode.DARK),
  };
};
