# Структура проекта (frontend)

Короткий обзор дерева каталогов и назначения файлов **Next.js (App Router)** приложения маркетплейса AvtoVorota.

> Папка `.next/` создаётся при `npm run build` / `npm run dev` и в документ не входит.

```
frontend/
├── app/                          # Маршруты и UI страниц (App Router)
│   ├── layout.tsx                # Корневой layout: шапка, подвал, metadata сайта
│   ├── page.tsx                  # Главная страница
│   ├── globals.css               # Глобальные стили, тема Tailwind, анимации модалки входа
│   ├── account/page.tsx          # Страница личного кабинета (заглушка, без перехода с «Войти»)
│   ├── brand/[slug]/page.tsx     # Страница бренда (Alutech, DoorHan и т.д.)
│   ├── cart/page.tsx             # Корзина
│   ├── catalog/page.tsx          # Каталог товаров (список + фильтры, query page/category)
│   ├── catalog/[productId]/page.tsx  # Карточка товара (детальная страница)
│   ├── feedback/page.tsx         # Обратная связь (заглушка)
│   ├── help/[slug]/page.tsx      # Разделы помощи: faq, order, delivery, payment
│   ├── orders/page.tsx           # Список заказов
│   ├── privacy/page.tsx          # Политика конфиденциальности (ссылка из модалки входа)
│   ├── sell/page.tsx             # «Стать продавцом» (кнопка «Для бизнеса» в шапке)
│   ├── services/[slug]/page.tsx  # Доп. сервисы: remont, montazh, calculator и др.
│   └── terms/page.tsx            # Правила площадки (ссылка из модалки входа)
│
├── components/                   # Переиспользуемые React-компоненты
│   ├── CartItem.tsx              # Строка товара в корзине
│   ├── HeaderUserNav.tsx         # Клиент: иконки Заказы / Корзина / Войти + модалка входа
│   ├── LoginModal.tsx            # Клиент: модальное окно входа по телефону
│   ├── OrderCard.tsx             # Карточка заказа на странице заказов
│   ├── ProductCard.tsx           # Карточка товара в списках, ссылка на /catalog/[id]
│   ├── ProductCatalogSection.tsx # Блок фильтров + сортировка + список товаров + пагинация
│   ├── RegionSwitcher.tsx        # Клиент: выбор региона «Москва» + всплывающая подсказка
│   └── StubPage.tsx              # Унифицированная заглушка текста для простых страниц
│
├── lib/                          # Утилиты и данные без UI
│   ├── brands.ts                 # Справочник брендов: slug, имя, category для каталога
│   ├── formatRuPhone.ts          # Маска и форматирование российского номера для модалки входа
│   └── mockProducts.ts           # Заглушечные товары для списка и страницы товара
│
├── public/                       # Статика по URL из корня (/, без импорта в коде)
│   └── *.svg                     # Примеры ассетов Next.js (при необходимости заменить)
│
├── docs/                         # Документация проекта (этот каталог)
│   └── STRUCTURE.md              # Текущий файл: структура и назначение файлов
│
├── package.json                  # Зависимости и скрипты npm (dev, build, lint)
├── package-lock.json             # Фиксация версий зависимостей
├── tsconfig.json                 # Настройки TypeScript (пути @/* → корень frontend)
├── next.config.ts                # Конфигурация Next.js
├── next-env.d.ts                 # Типы Next.js (автогенерация/референсы)
├── postcss.config.mjs            # PostCSS (Tailwind v4)
└── eslint.config.mjs             # Правила ESLint
```

## Маршруты (кратко)

| URL | Файл |
|-----|------|
| `/` | `app/page.tsx` |
| `/catalog` | `app/catalog/page.tsx` |
| `/catalog/123` | `app/catalog/[productId]/page.tsx` |
| `/brand/alutech` | `app/brand/[slug]/page.tsx` |
| `/cart`, `/orders`, `/account` | соответствующие `app/*/page.tsx` |
| `/help/faq` … | `app/help/[slug]/page.tsx` |
| `/services/remont` … | `app/services/[slug]/page.tsx` |
| `/terms`, `/privacy`, `/feedback`, `/sell` | `app/*/page.tsx` |

## Зависимости от окружения

- **Node.js** и **npm** для установки пакетов и запуска.
- Переменные окружения (`.env`) при подключении backend можно добавить в корень `frontend`; сейчас API не задействованы, кроме заглушек в `LoginModal`.

---

*Документ можно обновлять при добавлении папок и файлов.*
