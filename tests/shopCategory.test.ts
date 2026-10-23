import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveShopCategory } from "../src/lib/shopCategory.ts";

test("known category query values select that category", () => {
  assert.equal(resolveShopCategory("necklaces"), "necklaces");
  assert.equal(resolveShopCategory("earrings"), "earrings");
  assert.equal(resolveShopCategory("rings"), "rings");
  assert.equal(resolveShopCategory("bracelets"), "bracelets");
});

test("missing or unknown category query values show the full catalog", () => {
  assert.equal(resolveShopCategory(null), "all");
  assert.equal(resolveShopCategory(undefined), "all");
  assert.equal(resolveShopCategory(""), "all");
  assert.equal(resolveShopCategory("watches"), "all");
});
