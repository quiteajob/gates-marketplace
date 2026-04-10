import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllBrandSlugsForStatic,
  getBrandPageData,
} from "@/lib/brands";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBrandSlugsForStatic();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const brand = getBrandPageData(slug);
  if (!brand) return { title: "Бренд не найден" };
  return {
    title: `${brand.displayName} — ворота и автоматика — AvtoVorota`,
    description: `Товары и предложения бренда ${brand.displayName} на маркетплейсе автоматических ворот.`,
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = getBrandPageData(slug);
  if (!brand) notFound();

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
        <span className="text-slate-900">{brand.displayName}</span>
      </nav>

      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
          {brand.displayName}
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Официальные и совместимые решения {brand.displayName}: секционные и откатные
          ворота, автоматика и комплектующие. Выберите предложение в каталоге.
        </p>
        <Link
          href={`/catalog?category=${brand.catalogCategory}`}
          className="inline-flex rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500 transition-colors"
        >
          Товары бренда в каталоге
        </Link>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
        <p>
          Здесь позже появится расширенная информация о бренде: линейки, сертификаты,
          популярные серии ворот для Москвы и Московской области.
        </p>
      </section>
    </div>
  );
}
