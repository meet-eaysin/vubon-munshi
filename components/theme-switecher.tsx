"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Theme = "light" | "dark" | "system";

const applyThemeToDOM = (newTheme: Theme) => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  if (newTheme === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.classList.toggle("dark", prefersDark);
  } else {
    root.classList.toggle("dark", newTheme === "dark");
  }
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return "system";
  const savedTheme = localStorage.getItem("theme") as Theme | null;
  return savedTheme || "system";
};

export function ThemeSwitcher() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const initialTheme = getInitialTheme();
    // Apply theme immediately during initialization
    applyThemeToDOM(initialTheme);
    return initialTheme;
  });

  const handleThemeChange = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyThemeToDOM(newTheme);
  };

  const isDark = theme === "dark" || (theme === "system" && typeof document !== 'undefined' && document.documentElement.classList.contains("dark"));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="shrink-0 gap-2">
          {isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className={`cursor-pointer ${theme === "light" ? "bg-accent" : ""}`}
        >
          <Sun className="h-4 w-4 mr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className={`cursor-pointer ${theme === "dark" ? "bg-accent" : ""}`}
        >
          <Moon className="h-4 w-4 mr-2" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className={`cursor-pointer ${theme === "system" ? "bg-accent" : ""}`}
        >
          <Sun className="h-4 w-4 mr-2" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
