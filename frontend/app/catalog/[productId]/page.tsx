import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBrandPageData,
  getBrandSlugFromDisplayName,
} from "@/lib/brands";
import { getAllStaticProductParams, getProductById } from "@/lib/mockProducts";

type PageProps = {
  params: Promise<{ productId: string }>;
};

export function generateStaticParams() {
  return getAllStaticProductParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { productId } = await params;
  const product = getProductById(productId);
  if (!product) return { title: "Товар не найден" };
  return {
    title: `${product.title} — AvtoVorota`,
    description: product.shortDetails.join(". "),
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params;
  const product = getProductById(productId);
  if (!product) notFound();

  const brandSlug = getBrandSlugFromDisplayName(product.brand);
  const brandPage = getBrandPageData(brandSlug);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <nav className="text-xs text-slate-600">
        <Link href="/" className="hover:text-sky-600">
          Главная
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/catalog" className="hover:text-sky-600">
          Каталог
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-900 line-clamp-1 max-w-[min(420px,55vw)] align-bottom inline-block">
          {product.title}
        </span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Галерея */}
        <div className="space-y-3">
          <div className="aspect-[4/3] w-full rounded-3xl bg-slate-100 border border-slate-200" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-16 w-20 shrink-0 rounded-xl bg-slate-200 border border-slate-200"
              />
            ))}
          </div>
        </div>

        {/* Инфо и действия */}
        <div className="space-y-4">
          <div>
            {brandPage ? (
              <Link
                href={`/brand/${brandSlug}`}
                className="inline-block text-sm md:text-base font-semibold text-sky-600 mb-1.5 hover:text-sky-700 underline-offset-2 hover:underline transition-colors"
              >
                {product.brand}
              </Link>
            ) : (
              <p className="text-sm md:text-base font-semibold text-slate-600 mb-1.5">
                {product.brand}
              </p>
            )}
            <h1 className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug">
              {product.title}
            </h1>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
              {product.inStock ? (
                <span className="rounded-full bg-emerald-50 text-emerald-800 px-2 py-0.5 border border-emerald-100">
                  В наличии у продавцов
                </span>
              ) : (
                <span className="rounded-full bg-amber-50 text-amber-900 px-2 py-0.5 border border-amber-100">
                  Под заказ
                </span>
              )}
              <span>Артикул: AV-{product.id.padStart(4, "0")}</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-4 space-y-4">
            <div className="text-2xl md:text-3xl font-semibold text-emerald-700">
              {product.price}
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="flex-1 min-w-[160px] rounded-2xl bg-emerald-600 text-white text-sm font-semibold py-3 hover:bg-emerald-500"
              >
                В корзину
              </button>
              <button
                type="button"
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Сравнить
              </button>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              Итоговая цена и срок монтажа зависят от выбранного продавца. После
              добавления в корзину вы сможете выбрать компанию и условия.
            </p>
          </div>

          <Link
            href="/catalog"
            className="inline-flex text-sm text-sky-600 hover:text-sky-700 font-medium"
          >
            ← Вернуться в каталог
          </Link>
        </div>
      </div>

      {/* Характеристики */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Характеристики</h2>
        <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
          {product.specs.map((row) => (
            <div
              key={row.label}
              className="flex justify-between gap-4 border-b border-slate-100 pb-2"
            >
              <dt className="text-slate-600">{row.label}</dt>
              <dd className="text-slate-900 font-medium text-right">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Описание */}
      <section className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900">Описание</h2>
        <div className="text-sm text-slate-700 leading-relaxed space-y-3">
          {product.description.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
