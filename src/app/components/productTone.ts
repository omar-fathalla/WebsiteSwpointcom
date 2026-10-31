import type { ProductId } from "./productsData";

/** Products are told apart by M3 color roles (not hand-picked hex accents). */
export const TONE: Record<ProductId, { fg: string; container: string; onContainer: string; on: string }> = {
  tashil: { fg: "var(--md-sys-color-primary)", on: "var(--md-sys-color-on-primary)", container: "var(--md-sys-color-primary-container)", onContainer: "var(--md-sys-color-on-primary-container)" },
  gift: { fg: "var(--md-sys-color-tertiary)", on: "var(--md-sys-color-on-tertiary)", container: "var(--md-sys-color-tertiary-container)", onContainer: "var(--md-sys-color-on-tertiary-container)" },
  data: { fg: "var(--md-sys-color-secondary)", on: "var(--md-sys-color-on-secondary)", container: "var(--md-sys-color-secondary-container)", onContainer: "var(--md-sys-color-on-secondary-container)" },
};
