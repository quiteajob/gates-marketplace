/** Slug в URL → отображаемое имя и query-параметр каталога */
export const BRAND_BY_SLUG: Record<
  string,
  { displayName: string; catalogCategory: string }
> = {
  alutech: { displayName: "Alutech", catalogCategory: "brand-alutech" },
  doorhan: { displayName: "DoorHan", catalogCategory: "brand-doorhan" },
  hormann: { displayName: "Hormann", catalogCategory: "brand-hormann" },
  nice: { displayName: "Nice", catalogCategory: "brand-nice" },
};

export function getBrandSlugFromDisplayName(displayName: string): string {
  const found = Object.entries(BRAND_BY_SLUG).find(
    ([, v]) => v.displayName === displayName
  );
  if (found) return found[0];
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-|-$/g, "") || "brand";
}

export function getBrandPageData(slug: string) {
  return BRAND_BY_SLUG[slug] ?? null;
}

export function getAllBrandSlugsForStatic(): { slug: string }[] {
  return Object.keys(BRAND_BY_SLUG).map((slug) => ({ slug }));
}
