import assert from "node:assert/strict";
import { test } from "node:test";
import { snapToPinnedSection, type PinnedRange } from "../src/lib/pinnedSnap.ts";

const ranges: PinnedRange[] = [
  { start: 0, end: 0.2, center: 0.1 },
  { start: 0.74, end: 0.94, center: 0.84 },
];

test("scroll progress past the last pin stays put so contact remains reachable", () => {
  // 0.95 is only 0.01 past the pin end. The old threshold required
  // lastPinnedEnd + 0.02, so this landing spot snapped back to 0.84.
  assert.equal(snapToPinnedSection(0.95, ranges), 0.95);
  assert.equal(snapToPinnedSection(0.945, ranges), 0.945);
  assert.equal(snapToPinnedSection(0.94, ranges), 0.94);
});

test("progress inside a pinned section still snaps to that section center", () => {
  assert.equal(snapToPinnedSection(0.9, ranges), 0.84);
  assert.equal(snapToPinnedSection(0.12, ranges), 0.1);
});

test("progress outside every pinned range is left alone", () => {
  assert.equal(snapToPinnedSection(0.5, ranges), 0.5);
});
