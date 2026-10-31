import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const routes = ["/", "/shop/", "/lookbook/", "/about/", "/contact/"];

function productionAssetBase(): string {
  const source = readFileSync(new URL("../vite.config.ts", import.meta.url), "utf8");
  const match = source.match(/base:\s*(['"])(.*?)\1/);
  assert.ok(match, "vite.config.ts must set a string base");
  return match[2];
}

test("production asset base is root-absolute so trailing-slash routes can boot", () => {
  const base = productionAssetBase();
  assert.equal(
    base.startsWith("/"),
    true,
    `relative base ${JSON.stringify(base)} resolves ./assets under the route path`,
  );

  const src = `${base.endsWith("/") ? base : `${base}/`}assets/index.js`;
  const fromRoot = new URL(src, "http://brinimal.test/").pathname;

  for (const route of routes) {
    const resolved = new URL(src, `http://brinimal.test${route}`).pathname;
    assert.equal(
      resolved,
      fromRoot,
      `${route} loaded ${resolved} instead of ${fromRoot}`,
    );
  }
});
