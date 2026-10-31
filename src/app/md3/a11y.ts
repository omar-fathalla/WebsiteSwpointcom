import type { KeyboardEvent } from "react";

/**
 * Roving keyboard support for role=tablist / role=radiogroup:
 * Arrow keys move + activate, Home/End jump. Pair with tabIndex={selected ? 0 : -1}.
 */
export function onRovingKeyDown(e: KeyboardEvent<HTMLElement>) {
  const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
  if (!keys.includes(e.key)) return;
  const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('[role="tab"],[role="radio"]'));
  const i = items.indexOf(document.activeElement as HTMLElement);
  if (i < 0) return;
  e.preventDefault();
  const n = items.length;
  const rtl = getComputedStyle(e.currentTarget).direction === "rtl";
  let j = i;
  if (e.key === "Home") j = 0;
  else if (e.key === "End") j = n - 1;
  else if (e.key === "ArrowDown" || e.key === (rtl ? "ArrowLeft" : "ArrowRight")) j = (i + 1) % n;
  else j = (i - 1 + n) % n;
  items[j].focus();
  items[j].click();
}
