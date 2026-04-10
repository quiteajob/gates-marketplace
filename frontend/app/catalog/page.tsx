import { ProductCatalogSection } from "@/components/ProductCatalogSection";

export const dynamic = "force-dynamic";

export default function CatalogPage({
  searchParams,
}: {
  searchParams?: { page?: string; category?: string };
}) {
  const raw = Number(searchParams?.page ?? "1");
  const page = Number.isFinite(raw) && raw > 0 ? Math.min(raw, 3) : 1;
  const category = searchParams?.category ?? null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Каталог ворот
        </h1>
        <p className="text-sm text-slate-600">
          Фильтры слева, товары справа. Нажмите номер страницы внизу — и
          продолжайте выбирать.
        </p>
      </header>

      <ProductCatalogSection variant="catalog" page={page} category={category} />
    </div>
  );
}
