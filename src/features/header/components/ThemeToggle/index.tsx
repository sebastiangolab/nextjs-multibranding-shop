"use client";

import { useThemeMode } from "@/shared/hooks/useThemeMode";
import { Loader2, Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme, mounted } = useThemeMode();

  if (!mounted) {
    return <Loader2 className="size-5" />;
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {theme === "dark" ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
