"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MOCK_CERTIFICATES,
  MOCK_PRODUCTS_WITHOUT_CERT,
  type CertificateRow,
} from "@/lib/mockCertificates";

const STATUS_TABS = [
  { id: "all", label: "Все" },
  { id: "pending", label: "Ожидают проверки" },
  { id: "review", label: "На проверке" },
  { id: "rejected", label: "Отклонены" },
  { id: "approved", label: "Одобрены" },
] as const;

type StatusId = (typeof STATUS_TABS)[number]["id"];

function matchesStatusTab(row: CertificateRow, tab: StatusId): boolean {
  if (tab === "all") return true;
  return row.status === tab;
}

function statusBadge(row: CertificateRow) {
  const map = {
    approved: { className: "cert-badge cert-badge-approved", text: "Одобрен" },
    pending: {
      className: "cert-badge cert-badge-pending",
      text: "Ожидает проверки",
    },
    review: { className: "cert-badge cert-badge-review", text: "На проверке" },
    rejected: { className: "cert-badge cert-badge-rejected", text: "Отклонён" },
  } as const;
  return map[row.status];
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M20 20l-4.3-4.3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4v12m0 0l4-4m-4 4L8 12M5 20h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Drawer =
  | null
  | "without"
  | { kind: "add"; fromWithout: boolean };

export function CertificatesView() {
  const [statusTab, setStatusTab] = useState<StatusId>("all");
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [certFile, setCertFile] = useState<File | null>(null);
  const [indefinite, setIndefinite] = useState(false);

  const rows = useMemo(
    () => MOCK_CERTIFICATES.filter((r) => matchesStatusTab(r, statusTab)),
    [statusTab],
  );

  const addFromWithout = drawer?.kind === "add" && drawer.fromWithout;
  const showFullAddForm = drawer?.kind === "add" && !drawer.fromWithout;

  const openWithout = () => {
    setDrawer("without");
    setCertFile(null);
  };
  const openAddFromMain = () => {
    setDrawer({ kind: "add", fromWithout: false });
    setCertFile(null);
  };
  const openAddFromWithout = () => {
    setDrawer({ kind: "add", fromWithout: true });
    setCertFile(null);
  };
  const closeDrawer = () => {
    setDrawer(null);
    setCertFile(null);
  };

  const onBackFromAddNested = () => {
    setDrawer("without");
    setCertFile(null);
  };

  const canSubmitAdd = Boolean(certFile);

  return (
    <div className="cert-page">
      <nav className="productBreadcrumbs" aria-label="Навигация">
        <Link href="/dashboard" className="productCrumbBack" aria-label="Назад">
          ←
        </Link>
        <span className="productCrumbSep">|</span>
        <Link href="/dashboard/products">Товары</Link>
        <span className="productCrumbSep">&gt;</span>
        <span className="productCrumbCurrent">Работа с товарами</span>
      </nav>

      <div className="cert-top-row">
        <div className="cert-title-block">
          <h1 className="cert-title">Сертификаты качества</h1>
        </div>
        <div className="cert-actions">
          <button type="button" className="cert-link-btn" onClick={openWithout}>
            Товары без сертификатов
          </button>
          <button
            type="button"
            className="productAddBtn"
            onClick={openAddFromMain}
          >
            Добавить сертификат
          </button>
        </div>
      </div>

      <div className="cert-tabs" role="tablist">
        {STATUS_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={statusTab === t.id}
            className={`cert-tab ${statusTab === t.id ? "cert-tab-active" : ""}`}
            onClick={() => setStatusTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="cert-filters-row">
        <select className="cert-filter-select" aria-label="Тип сертификата">
          <option>Тип: Все</option>
        </select>
        <select className="cert-filter-select" aria-label="Поле фильтра">
          <option>Фильтр: Номер сертификата</option>
        </select>
        <div className="cert-search-wrap">
          <span aria-hidden>
            <SearchIcon />
          </span>
          <input
            type="search"
            className="cert-search-input"
            placeholder="Номер сертификата"
          />
        </div>
      </div>

      <div className="cert-table-wrap">
        <table className="cert-table">
          <thead>
            <tr>
              <th>Номер / Название</th>
              <th>Тип сертификата</th>
              <th>Статус</th>
              <th>Выдан</th>
              <th>Истекает</th>
              <th>Добавлено товаров</th>
              <th>Отклонено товаров</th>
              <th aria-label="Действия" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const b = statusBadge(row);
              return (
                <tr key={row.id}>
                  <td>
                    <button type="button" className="cert-cell-primary">
                      {row.number}
                    </button>
                    <div className="cert-cell-sub">{row.name}</div>
                  </td>
                  <td>{row.type}</td>
                  <td>
                    <span className={b.className}>{b.text}</span>
                  </td>
                  <td>{row.issued}</td>
                  <td>{row.expires}</td>
                  <td>{row.productsAdded}</td>
                  <td>
                    {row.productsRejected == null
                      ? "—"
                      : row.productsRejected}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="cert-row-menu"
                      aria-label="Меню строки"
                    >
                      ⋮
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="sellerChatFab"
        aria-label="Поддержка"
        title="Чат поддержки"
      >
        💬
      </button>

      {drawer !== null && (
        <>
          <div
            className="cert-overlay"
            role="presentation"
            onClick={closeDrawer}
          />
          <aside
            className="cert-drawer"
            aria-modal="true"
            role="dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cert-drawer-inner">
              {addFromWithout && (
                <div className="cert-drawer-side-tab">
                  <span>Товары без сертификата</span>
                </div>
              )}
              <div className="cert-drawer-body" style={{ position: "relative" }}>
                <button
                  type="button"
                  className="cert-drawer-close-floating"
                  onClick={closeDrawer}
                  aria-label="Закрыть"
                >
                  ×
                </button>

                {drawer === "without" && (
                  <>
                    <div className="cert-drawer-header">
                      <div className="cert-drawer-title-row">
                        <h2 className="cert-drawer-title">
                          Товары без сертификата
                        </h2>
                        <button
                          type="button"
                          className="cert-download-icon"
                          aria-label="Скачать"
                        >
                          <DownloadIcon />
                        </button>
                      </div>
                      <p className="cert-drawer-desc">
                        На данные товары не загружены сертификаты качества
                      </p>
                    </div>
                    <div className="cert-drawer-scroll">
                      <div className="cert-table-wrap" style={{ minWidth: 0 }}>
                        <table className="cert-table" style={{ minWidth: 640 }}>
                          <thead>
                            <tr>
                              <th>Наименование товара</th>
                              <th>Название категории</th>
                              <th>Артикул</th>
                            </tr>
                          </thead>
                          <tbody>
                            {MOCK_PRODUCTS_WITHOUT_CERT.map((p) => (
                              <tr key={p.id}>
                                <td>{p.title}</td>
                                <td>{p.category}</td>
                                <td>{p.article}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="cert-drawer-footer">
                      <button
                        type="button"
                        className="productAddBtn"
                        onClick={openAddFromWithout}
                      >
                        Добавить сертификат
                      </button>
                    </div>
                  </>
                )}

                {drawer?.kind === "add" && (
                  <>
                    <div className="cert-drawer-header">
                      <div className="cert-drawer-header-row">
                        {addFromWithout && (
                          <button
                            type="button"
                            className="cert-drawer-back"
                            onClick={onBackFromAddNested}
                            aria-label="Назад к списку"
                          >
                            ←
                          </button>
                        )}
                        <h2 className="cert-drawer-title">
                          Добавление сертификата
                        </h2>
                      </div>
                    </div>
                    <div className="cert-drawer-scroll">
                      <section className="cert-form-section">
                        <h3 className="cert-form-section-title">
                          Основные данные
                        </h3>
                        <div className="cert-form-grid">
                          <div className="cert-form-row-2">
                            <div className="cert-field">
                              <label>
                                Тип документа{" "}
                                <span className="cert-req">*</span>
                              </label>
                              <select className="cert-input" required>
                                <option value="">Выберите тип</option>
                                <option>Декларация о соответствии</option>
                                <option>Сертификат соответствия</option>
                              </select>
                            </div>
                            <div className="cert-field">
                              <label>Тип соответствия требованиям</label>
                              <select className="cert-input">
                                <option value="">Не выбрано</option>
                                <option>ТР ТС 004/2011</option>
                                <option>ТР ТС 010/2011</option>
                              </select>
                            </div>
                          </div>
                          <div className="cert-field">
                            <label>Название</label>
                            <input className="cert-input" type="text" />
                          </div>
                          <div className="cert-field">
                            <label>
                              Номер документа{" "}
                              <span className="cert-req">*</span>
                            </label>
                            <input className="cert-input" type="text" required />
                          </div>
                          <div className="cert-date-row">
                            <div className="cert-field">
                              <label>
                                Выдан <span className="cert-req">*</span>
                              </label>
                              <input className="cert-input" type="date" required />
                            </div>
                            <div className="cert-field">
                              <label>Истекает</label>
                              <input
                                className="cert-input"
                                type="date"
                                disabled={indefinite}
                              />
                            </div>
                            <label className="cert-check">
                              <input
                                type="checkbox"
                                checked={indefinite}
                                onChange={(e) => setIndefinite(e.target.checked)}
                              />
                              Бессрочный
                            </label>
                          </div>
                        </div>
                      </section>

                      <section className="cert-form-section">
                        <h3 className="cert-form-section-title">
                          Скан — копия сертификата
                        </h3>
                        <div className="cert-upload-wrap">
                          <label className="cert-upload-zone">
                            <input
                              type="file"
                              className="cert-upload-input-overlay"
                              accept=".pdf,.jpg,.jpeg,.png"
                              onChange={(e) => {
                                const f = e.target.files?.[0] ?? null;
                                setCertFile(f);
                              }}
                            />
                            <span className="cert-upload-zone-content">
                              <span className="cert-upload-zone-icon" aria-hidden>
                                📄
                              </span>
                              <span className="cert-upload-link">
                                Загрузите или перетащите файл
                              </span>
                              {showFullAddForm && (
                                <span className="cert-upload-hint">
                                  Формат — PDF, JPG, JPEG, PNG. Размер — не
                                  больше 10 МБ. Разрешение — от 200 до 7680px по
                                  большей стороне.
                                </span>
                              )}
                            </span>
                          </label>
                        </div>
                        {showFullAddForm && !certFile && (
                          <p className="cert-upload-error">
                            Это поле не может быть пустым
                          </p>
                        )}
                      </section>

                      {showFullAddForm && (
                        <section className="cert-form-section">
                          <h3 className="cert-form-section-title">Товары</h3>
                          <div className="cert-products-head">
                            <span className="cert-products-count">
                              Товаров: 0
                            </span>
                          </div>
                          <button type="button" className="cert-subtab">
                            Все товары
                          </button>
                          <div className="cert-products-links">
                            <button type="button">Добавить из XLS</button>
                            <button type="button">Добавить вручную</button>
                            <button type="button" className="cert-clear">
                              Очистить
                            </button>
                          </div>
                          <table className="cert-mini-table">
                            <thead>
                              <tr>
                                <th>Артикул</th>
                                <th>Название товара</th>
                                <th>Статус</th>
                                <th>Действия</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td colSpan={4}>Нет записей</td>
                              </tr>
                            </tbody>
                          </table>
                        </section>
                      )}
                    </div>
                    <div className="cert-drawer-footer">
                      <button
                        type="button"
                        className="cert-secondary-btn"
                        onClick={closeDrawer}
                      >
                        Отмена
                      </button>
                      <button
                        type="button"
                        className={`productAddBtn ${!canSubmitAdd ? "cert-btn-disabled" : ""}`}
                        disabled={!canSubmitAdd}
                      >
                        Добавить сертификат
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
