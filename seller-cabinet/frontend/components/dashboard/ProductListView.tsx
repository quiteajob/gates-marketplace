"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MOCK_PRODUCT_ROWS,
  PRODUCT_TABS,
} from "@/lib/mockSellerProducts";

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ProductListView() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="productListPage">
      <nav className="productBreadcrumbs" aria-label="Навигация">
        <Link href="/dashboard" className="productCrumbBack" aria-label="Назад">
          ←
        </Link>
        <span className="productCrumbSep">|</span>
        <Link href="/dashboard/products">Товары</Link>
        <span className="productCrumbSep">&gt;</span>
        <span className="productCrumbCurrent">Работа с товарами</span>
      </nav>

      <div className="productListHead">
        <h1 className="productListTitle">Список товаров</h1>
        <Link href="/dashboard/products/add" className="productAddBtn">
          Добавить товары
        </Link>
      </div>

      <div className="productTabs" role="tablist">
        {PRODUCT_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={activeTab === t.id}
            className={`productTab ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label} <span className="productTabCount">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="productToolbar card">
        <div className="productSearchWrap">
          <span className="productSearchIcon" aria-hidden>
            <SearchIcon />
          </span>
          <input
            type="search"
            className="productSearchInput"
            placeholder="Название, артикул, SKU, штрихкод"
            aria-label="Поиск товаров"
          />
        </div>
        <button type="button" className="productFiltersBtn">
          Фильтры
          <span className="productChevron" />
        </button>
      </div>

      <div className="productTableOuter card">
        <div className="productTableScroll">
          <table className="productTable">
            <thead>
              <tr>
                <th className="sticky-left sticky-chk" scope="col">
                  <input type="checkbox" aria-label="Выбрать все" />
                </th>
                <th className="sticky-left sticky-photo" scope="col">
                  Фото
                </th>
                <th className="sticky-left sticky-article" scope="col">
                  Артикул
                </th>
                <th className="col-scroll" scope="col">
                  Название товара
                </th>
                <th className="col-scroll" scope="col">
                  Статус
                </th>
                <th className="col-scroll" scope="col">
                  Ваша цена
                </th>
                <th className="col-scroll" scope="col">
                  Отзывы
                </th>
                <th className="col-scroll" scope="col">
                  Рейтинг
                </th>
                <th className="col-scroll" scope="col">
                  Дата создания
                </th>
                <th className="sticky-right sticky-actions" scope="col">
                  <button type="button" className="productTableGear" aria-label="Настройки таблицы">
                    <GearIcon />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PRODUCT_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="sticky-left sticky-chk">
                    <input type="checkbox" aria-label={`Выбрать ${row.articleTitle}`} />
                  </td>
                  <td className="sticky-left sticky-photo">
                    <div
                      className="productThumb"
                      style={{ background: row.photoTint }}
                      role="img"
                      aria-hidden
                    />
                  </td>
                  <td className="sticky-left sticky-article">
                    <div className="productArticleTitle">{row.articleTitle}</div>
                    <div className="productSku">{row.sku}</div>
                  </td>
                  <td className="col-scroll">
                    <div className="productName">{row.name}</div>
                    <div className="productCategory">{row.category}</div>
                  </td>
                  <td className="col-scroll">
                    <div className="productStatusLine">
                      <span>{row.statusLine1}</span>
                      {row.statusCount != null ? (
                        <span className="productStatusBadge">{row.statusCount}</span>
                      ) : null}
                    </div>
                    {row.statusLine2 ? (
                      <div className="productStatusSub">{row.statusLine2}</div>
                    ) : null}
                  </td>
                  <td className="col-scroll productMono">{row.price}</td>
                  <td className="col-scroll productMono">{row.reviews}</td>
                  <td className="col-scroll productMono">{row.rating}</td>
                  <td className="col-scroll productMono">{row.createdAt}</td>
                  <td className="sticky-right sticky-actions">
                    <div className="productRowActions">
                      <button type="button" className="productIconAction" aria-label="Редактировать">
                        <PencilIcon />
                      </button>
                      <button type="button" className="productIconAction" aria-label="Ещё">
                        ⋮
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
