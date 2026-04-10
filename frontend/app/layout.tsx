import "./globals.css";
import Link from "next/link";
import { MagnifyingGlassIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { RegionSwitcher } from "@/components/RegionSwitcher";
import { HeaderUserNav } from "@/components/HeaderUserNav";

export const metadata = {
  title: "AvtoVorota – маркетплейс автоматических ворот",
  description: "Маркетплейс автоматических ворот в Москве и МО",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col bg-white text-slate-900">
        {/* Header в стиле Ozon */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4">
            {/* ВЕРХНЯЯ ЛИНИЯ: логотип, Каталог, поиск, справа — заказы/корзина/вход + Москва под ними */}
            <div className="flex items-center gap-4 py-3">
              {/* Логотип крупнее */}
              <Link href="/" className="font-semibold text-2xl tracking-tight text-slate-900">
                AvtoVorota
              </Link>

              {/* Кнопка Каталог */}
              <Link
                href="/catalog"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-sky-600 hover:bg-sky-500 text-sm text-white"
              >
                <span
                  className="grid grid-cols-2 gap-[3px] shrink-0"
                  aria-hidden
                >
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-md bg-white/90"
                    />
                  ))}
                </span>
                <span className="font-medium">Каталог</span>
              </Link>

              {/* Поиск рядом с Каталог */}
              <div className="flex-1">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-sky-200 focus-within:border-sky-300 transition">
                  <MagnifyingGlassIcon className="w-4 h-4 text-slate-400" />
                  <input
                    aria-label="Поиск"
                    className="flex-1 bg-transparent text-sm md:text-base text-slate-900 placeholder:text-slate-400 outline-none"
                    placeholder="Поиск по воротам, производителям, компаниям..."
                  />
                </div>
              </div>

              {/* Справа: Заказы / Корзина / Вход + регион */}
              <div className="flex flex-col items-end gap-1">
                <HeaderUserNav />

                {/* Москва под блоком аккаунта */}
                <RegionSwitcher />
              </div>
            </div>

            {/* НИЖНЯЯ ЛИНИЯ: Для бизнеса + категории */}
            <div className="flex items-center gap-4 pb-3 text-sm">
              {/* Для бизнеса с иконкой чемодана */}
              <Link
                href="/sell"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs text-slate-900"
              >
                <BriefcaseIcon className="w-4 h-4 text-slate-700" />
                <span>Для бизнеса</span>
              </Link>

              {/* Разделитель */}
              <div className="h-4 w-px bg-slate-200" />

              {/* Категории (тихая навигация) */}
              <div className="flex gap-3 overflow-x-auto">
                {[
                  { label: "Гаражные ворота", slug: "garage" },
                  { label: "Откатные", slug: "sliding" },
                  { label: "Секционные", slug: "sectional" },
                  { label: "Распашные", slug: "swing" },
                  { label: "Промышленные", slug: "industrial" },
                  { label: "Противопожарные", slug: "fire" },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/catalog?category=${cat.slug}`}
                    className="whitespace-nowrap text-xs text-slate-700 hover:text-slate-900"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Контент */}
        <main className="flex-1 bg-slate-50">{children}</main>

        {/* Footer */}
        <footer className="mt-8 bg-slate-900 text-slate-100 border-t border-slate-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-4 py-8 text-sm">
            <div>
              <div className="font-semibold mb-2 text-white">Контакты</div>
              <div className="text-slate-200">+7 (495) 000-00-00</div>
              <div className="text-slate-200">info@avtovorta.ru</div>
            </div>
            <div>
              <div className="font-semibold mb-2 text-white">Помощь</div>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/help/faq"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Вопросы и ответы
                </Link>
                <Link
                  href="/help/order"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Как сделать заказ
                </Link>
                <Link
                  href="/help/delivery"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Доставка
                </Link>
                <Link
                  href="/help/payment"
                  className="text-slate-200 hover:text-white transition-colors"
                >
                  Оплата
                </Link>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-2 text-white">Обратная связь</div>
              <Link
                href="/feedback"
                className="text-slate-200 hover:text-white transition-colors"
              >
                Форма обратной связи
              </Link>
            </div>
            <div>
              <div className="font-semibold mb-2 text-white">© 2026 AvtoVorota</div>
              <div className="text-slate-300">
                Маркетплейс автоматических ворот
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}