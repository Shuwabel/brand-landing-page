import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function scrollToY(y: number) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instance) instance.scrollTo(y, { duration: 1.1 });
  else window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
}

export function jumpTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  scrollToY(el.getBoundingClientRect().top + window.scrollY);
}
