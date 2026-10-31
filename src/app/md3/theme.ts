import { useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";
const KEY = "sp_theme";

export function initialTheme(): ThemeMode {
  try {
    const s = localStorage.getItem(KEY);
    if (s === "light" || s === "dark") return s;
  } catch { /* ignore */ }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** data-theme on <html>; follows the system until the user picks one. */
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => (document.documentElement.dataset.theme as ThemeMode) || initialTheme());
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--md-sys-color-surface").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", bg || (mode === "dark" ? "#121318" : "#fbf8ff"));
  }, [mode]);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!mq) return;
    const h = (ev: MediaQueryListEvent) => { try { if (!localStorage.getItem(KEY)) setMode(ev.matches ? "dark" : "light"); } catch { /* ignore */ } };
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);
  const toggle = () => setMode((m) => {
    const n = m === "dark" ? "light" : "dark";
    try { localStorage.setItem(KEY, n); } catch { /* ignore */ }
    return n;
  });
  return { mode, toggle };
}
