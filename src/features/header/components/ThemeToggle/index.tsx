"use client";

import { Loader2, Moon, Sun } from "lucide-react";
import { useThemeMode } from "@/shared/hooks/useThemeMode";

const ThemeToggle = () => {
  const { isDark, toggleTheme, mounted } = useThemeMode();

  if (!mounted) {
    return <Loader2 className="size-5" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {isDark ? <Moon className="size-5" /> : <Sun className="size-5" />}
    </button>
  );
};

export default ThemeToggle;
