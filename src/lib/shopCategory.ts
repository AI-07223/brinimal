export const SHOP_CATEGORY_VALUES = [
  "all",
  "necklaces",
  "earrings",
  "rings",
  "bracelets",
] as const;

export type ShopCategory = (typeof SHOP_CATEGORY_VALUES)[number];

const SHOP_CATEGORIES: readonly string[] = SHOP_CATEGORY_VALUES;

/** Category shown in the shop grid. Unknown or missing params show every piece. */
export function resolveShopCategory(
  param: string | null | undefined,
): ShopCategory {
  if (param && SHOP_CATEGORIES.includes(param)) {
    return param as ShopCategory;
  }
  return "all";
}
