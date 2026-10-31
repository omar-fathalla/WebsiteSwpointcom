/** M3 motion tokens (material-web v0_192) mapped for the `motion` library. */
export const md = {
  ease: {
    standard: [0.2, 0, 0, 1], standardDecel: [0, 0, 0, 1], standardAccel: [0.3, 0, 1, 1],
    emphasized: [0.2, 0, 0, 1], emphasizedDecel: [0.05, 0.7, 0.1, 1], emphasizedAccel: [0.3, 0, 0.8, 0.15],
  },
  dur: {
    short1: 0.05, short2: 0.1, short3: 0.15, short4: 0.2,
    medium1: 0.25, medium2: 0.3, medium3: 0.35, medium4: 0.4,
    long1: 0.45, long2: 0.5, long3: 0.55, long4: 0.6,
  },
} as const;

type Ease = [number, number, number, number];
const e = (x: readonly number[]) => x as unknown as Ease;

/** Section/element enter: emphasized-decelerate, long2. Opacity only when reduced motion is on. */
export function enter(reduced: boolean | null, delay = 0) {
  return reduced
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: md.dur.short4, delay } }
    : {
        initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-48px" },
        transition: { duration: md.dur.long2, ease: e(md.ease.emphasizedDecel), delay },
      };
}

export const tEnter = { duration: md.dur.medium4, ease: e(md.ease.emphasizedDecel) };
export const tExit = { duration: md.dur.short4, ease: e(md.ease.emphasizedAccel) };
export const tSmall = { duration: md.dur.short4, ease: e(md.ease.standard) };
