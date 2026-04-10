import Link from "next/link";
import { ProductCatalogSection } from "@/components/ProductCatalogSection";

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">
      {/* Hero */}
      <section className="grid md:grid-cols-[2fr,1fr] gap-6 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-slate-900">
            Маркетплейс автоматических ворот в Москве и МО
          </h1>
          <p className="text-[15px] mb-4 leading-relaxed text-slate-800">
            Сравнивайте предложения компаний, выбирайте лучшие цены и заказывайте монтаж онлайн.
          </p>
          <div className="text-xs text-slate-600">
            Более 120 предложений от проверенных компаний.
          </div>
        </div>
        <div className="hidden md:block bg-slate-200 text-slate-900 rounded-3xl h-48 p-4">
          <div className="text-sm text-slate-700">
            Здесь может быть иллюстрация или промо‑баннер.
          </div>
        </div>
      </section>

      {/* Категории с картинками */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900">Популярные категории</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Гаражные ворота", price: "от 47 478 ₽", slug: "garage" },
            { name: "Откатные ворота", price: "от 52 900 ₽", slug: "sliding" },
            { name: "Секционные ворота", price: "от 65 300 ₽", slug: "sectional" },
            { name: "Alutech", price: "от 70 000 ₽", slug: "brand-alutech" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog?category=${cat.slug}`}
              className="bg-white rounded-3xl text-left border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="h-28 bg-slate-200" />
              <div className="p-3">
                <div className="text-sm font-semibold mb-1 text-slate-900">
                  {cat.name}
                </div>
                <div className="text-xs text-emerald-700">{cat.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO текст в табах */}
      <section className="space-y-3">
        <div className="flex gap-2 text-sm">
          {["SEO текст 1", "SEO текст 2", "SEO текст 3", "Небольшой SEO текст"].map(
            (tab, i) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-full border ${
                  i === 0
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-800 border-slate-300"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 text-[15px] text-slate-800 leading-relaxed">
          Здесь будет SEO‑текст о выборе автоматических ворот в Москве и Московской области.
        </div>
      </section>

      {/* Каталог товаров */}
      <ProductCatalogSection variant="home" />

      {/* Цены от компаний */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Цены от компаний</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-white rounded-2xl border border-slate-200 p-4 text-sm space-y-2"
            >
              <div className="flex justify-between items-center">
                <div className="font-semibold text-slate-900">Компания №{id}</div>
                <div className="text-xs text-amber-500">★★★★☆ 4.{id}</div>
              </div>
              <div className="text-xs text-slate-700">
                Минимальная цена от 79 000 ₽
              </div>
              <button className="mt-2 w-full text-xs py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800">
                Купить
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* График изменения цены */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Изменение цен за год</h2>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 h-56 flex flex-col justify-between text-xs text-slate-800">
          <div className="flex justify-between">
            <span>Минимальная цена</span>
            <span>Средняя цена</span>
          </div>
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Здесь будет интерактивный график (Chart.js)
          </div>
          <div className="flex justify-between text-slate-700">
            <span>Янв</span>
            <span>Июл</span>
            <span>Дек</span>
          </div>
        </div>
      </section>

      {/* Карта + список компаний */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Компании на карте</h2>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          <div className="h-64 bg-slate-200 rounded-xl flex items-center justify-center text-slate-700 text-sm">
            Здесь будет карта (Яндекс-Карты / Google Maps) с компаниями
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-sm">
            {[1, 2, 3, 4].map((id) => (
              <div
                key={id}
                className="border border-slate-200 rounded-2xl p-3 flex flex-col gap-1 bg-white"
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-slate-900">
                    ООО «Ворота №{id}»
                  </div>
                  <div className="text-xs text-amber-500">★★★★☆ 4.{id}</div>
                </div>
                <div className="text-xs text-slate-700">
                  Москва, ул. Примерная, д.{id}
                </div>
                <div className="text-xs text-slate-700">
                  09:00–21:00 • от 79 000 ₽
                </div>
                <button className="mt-1 self-start text-xs px-3 py-1 rounded-full border border-slate-300 bg-slate-900 text-white hover:bg-slate-800">
                  Забронировать
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Производители */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">Производители</h2>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {["Alutech", "DoorHan", "Hormann", "Nice", "Came"].map((brand) => (
              <div
                key={brand}
                className="h-12 px-4 flex items-center justify-center border border-slate-300 rounded-xl text-sm bg-slate-50 text-slate-900"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Дополнительные сервисы */}
      <section className="space-y-3 mb-10">
        <h2 className="text-xl font-semibold text-slate-900">Дополнительные сервисы</h2>
        <div className="grid sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          {[
            { label: "Ремонт", slug: "remont" },
            { label: "Установка/монтаж", slug: "montazh" },
            { label: "Калькулятор", slug: "calculator" },
            { label: "Цены", slug: "prices" },
            { label: "Отзывы", slug: "reviews" },
            { label: "Акции", slug: "promo" },
          ].map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="bg-white rounded-2xl border border-slate-200 px-3 py-2 text-center hover:bg-slate-100 text-slate-900"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}