export interface PinnedRange {
  start: number;
  end: number;
  center: number;
}

/**
 * Map a ScrollTrigger snap progress (0–1 of the page) onto a pinned section.
 * Returning `value` unchanged tells ScrollTrigger not to move.
 *
 * The flowing contact block begins at the end of the last pin. Snapping any
 * progress past that end — including a small overshoot — pulls the contact
 * form back to the previous section.
 */
export function snapToPinnedSection(
  value: number,
  pinnedRanges: readonly PinnedRange[],
): number {
  const lastPinnedEnd = pinnedRanges[pinnedRanges.length - 1]?.end ?? 1;

  if (value >= lastPinnedEnd) {
    return value;
  }

  const inPinned = pinnedRanges.some(
    (range) => value >= range.start - 0.05 && value <= range.end + 0.05,
  );

  if (!inPinned) return value;

  const target = pinnedRanges.reduce(
    (closest, range) =>
      Math.abs(range.center - value) < Math.abs(closest - value)
        ? range.center
        : closest,
    pinnedRanges[0]?.center ?? 0,
  );

  if (Math.abs(target - value) > 0.15) return value;

  return target;
}
