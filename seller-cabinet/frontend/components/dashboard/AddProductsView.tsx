"use client";

import Link from "next/link";

function ChevronRight() {
  return (
    <span className="addProductsChevron" aria-hidden>
      <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
        <path
          d="M1 1l6 6-6 6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ChatFabIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AddProductsView() {
  return (
    <div className="addProductsPage">
      <nav className="productBreadcrumbs" aria-label="Навигация">
        <Link href="/dashboard" className="productCrumbBack" aria-label="Назад">
          ←
        </Link>
        <span className="productCrumbSep">|</span>
        <Link href="/dashboard/products">Товары</Link>
        <span className="productCrumbSep">&gt;</span>
        <span className="productCrumbCurrent">Работа с товарами</span>
      </nav>

      <div className="addProductsHead">
        <h1 className="addProductsTitle">Добавить товары</h1>
        <button type="button" className="addProductsDetailBtn">
          Подробнее
        </button>
      </div>

      <div className="addProductsGrid">
        <section className="addProductsCard card">
          <header className="addProductsCardHead">Добавление товаров</header>
          <ul className="addProductsList">
            <li>
              <button type="button" className="addProductsRow">
                <span className="addProductsRowLabel">Вручную</span>
                <span className="addProductsRowMeta">
                  <span className="addProductsBadge">Один товар</span>
                  <ChevronRight />
                </span>
              </button>
            </li>
            <li>
              <button type="button" className="addProductsRow">
                <span className="addProductsRowLabel">Через шаблон</span>
                <span className="addProductsRowMeta">
                  <span className="addProductsBadge">Много товаров</span>
                  <ChevronRight />
                </span>
              </button>
            </li>
          </ul>
        </section>

        <section className="addProductsCard card">
          <header className="addProductsCardHead">Обновление атрибутов</header>
          <ul className="addProductsList">
            <li>
              <button type="button" className="addProductsRow">
                <span className="addProductsRowLabel">Загрузить изображения</span>
                <ChevronRight />
              </button>
            </li>
            <li>
              <button type="button" className="addProductsRow">
                <span className="addProductsRowLabel">Обновить штрихкоды</span>
                <ChevronRight />
              </button>
            </li>
            <li>
              <button type="button" className="addProductsRow">
                <span className="addProductsRowLabel">Обновить артикулы</span>
                <ChevronRight />
              </button>
            </li>
          </ul>
        </section>
      </div>

      <footer className="addProductsFooter">
        <p>© 2026 Seller Panel. Все права защищены.</p>
      </footer>

      <button type="button" className="addProductsFab" aria-label="Поддержка в чате">
        <ChatFabIcon />
      </button>
    </div>
  );
}
