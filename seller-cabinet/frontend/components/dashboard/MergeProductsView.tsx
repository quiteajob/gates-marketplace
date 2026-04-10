"use client";

import Link from "next/link";
import { useState } from "react";
import { CreateMergeGroupPanel } from "@/components/dashboard/CreateMergeGroupPanel";
import {
  MOCK_MERGE_MODELS,
  MOCK_MERGE_SIMILAR,
} from "@/lib/mockMergeGroups";

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 20l-4.3-4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6h18M8 6V4h8v2m-9 4v10h10V10M10 10v6M14 10v6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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

const BANNER_MODEL = {
  text:
    "Объединяйте варианты одной модели ворот при совпадении категории и бренда, но разных характеристиках — например, ширины и высоты проёма, цвета полотна, типа заполнения или комплектации приводом. Покупатель увидит все варианты в одной карточке и сможет быстро переключаться между ними.",
  moreLabel: "Подробнее о модели",
};

const BANNER_SIMILAR = {
  text:
    "Можно объединить похожие товары из одной подкатегории второго уровня — например, несколько комплектов автоматики для откатных ворот одной серии или секционные полотна разной ширины из одной линейки. Так карточки будут перекликаться у покупателя в блоке связанных товаров.",
  moreLabel: "Подробнее о похожих товарах",
};

export function MergeProductsView() {
  const [tab, setTab] = useState<"model" | "similar">("model");
  const [bannerDismissed, setBannerDismissed] = useState<{ model: boolean; similar: boolean }>({
    model: false,
    similar: false,
  });
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelAddedCount, setPanelAddedCount] = useState(0);

  const banner = tab === "model" ? BANNER_MODEL : BANNER_SIMILAR;
  const showBanner = tab === "model" ? !bannerDismissed.model : !bannerDismissed.similar;

  function dismissBanner() {
    setBannerDismissed((d) => (tab === "model" ? { ...d, model: true } : { ...d, similar: true }));
  }

  function openPanel() {
    setPanelAddedCount(0);
    setPanelOpen(true);
  }

  return (
    <div className="mergeProductsPage">
      <nav className="productBreadcrumbs" aria-label="Навигация">
        <Link href="/dashboard" className="productCrumbBack" aria-label="Назад">
          ←
        </Link>
        <span className="productCrumbSep">|</span>
        <Link href="/dashboard/products">Товары</Link>
        <span className="productCrumbSep">&gt;</span>
        <span className="productCrumbCurrent">Работа с товарами</span>
      </nav>

      <div className="mergeHead">
        <h1 className="mergeTitle">Объединить товары</h1>
        <button type="button" className="mergeAboutBtn">
          О разделе
        </button>
      </div>

      <div className="mergeTabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "model"}
          className={`mergeTab ${tab === "model" ? "active" : ""}`}
          onClick={() => setTab("model")}
        >
          Модель <span className="mergeTabCount">50</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "similar"}
          className={`mergeTab ${tab === "similar" ? "active" : ""}`}
          onClick={() => setTab("similar")}
        >
          Похожие <span className="mergeTabCount">6</span>
        </button>
      </div>

      {showBanner ? (
        <div className="mergeBanner">
          <p className="mergeBannerText">{banner.text}</p>
          <div className="mergeBannerRow">
            <button type="button" className="mergeBannerMore">
              {banner.moreLabel}
            </button>
          </div>
          <button type="button" className="mergeBannerClose" onClick={dismissBanner} aria-label="Закрыть подсказку">
            ×
          </button>
        </div>
      ) : null}

      <div className="mergeToolbar card">
        <div className="mergeSearchWrap">
          <span className="mergeSearchIcon" aria-hidden>
            <SearchIcon />
          </span>
          <input
            type="search"
            className="mergeSearchInput"
            placeholder={
              tab === "model"
                ? "ID или название группы, SKU, артикул или штрихкод товара"
                : "ID или название группы"
            }
            aria-label="Поиск группы"
          />
        </div>
        <button type="button" className="mergeCreateBtn" onClick={openPanel}>
          Создать группу
        </button>
      </div>

      <div className="mergeTableWrap card">
        <table className="mergeTable">
          <thead>
            <tr>
              <th scope="col">Товары</th>
              <th scope="col">ID группы</th>
              <th scope="col">{tab === "model" ? "Название модели" : "Название группы"}</th>
              <th scope="col">Количество товаров</th>
              <th scope="col" className="mergeThActions" />
            </tr>
          </thead>
          <tbody>
            {tab === "model"
              ? MOCK_MERGE_MODELS.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="mergeThumbs">
                        {row.thumbTints.map((c, i) => (
                          <span key={i} className="mergeThumb" style={{ background: c }} />
                        ))}
                      </div>
                    </td>
                    <td className="mergeMono">{row.groupId}</td>
                    <td>
                      <div className="mergeCellTitle">{row.modelName}</div>
                      <div className="mergeCellSub">{row.category}</div>
                    </td>
                    <td className="mergeMono">{row.count}</td>
                    <td className="mergeActions">
                      <button type="button" className="mergeIconBtn" aria-label="Редактировать">
                        <PencilIcon />
                      </button>
                      <button type="button" className="mergeIconBtn" aria-label="Удалить">
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))
              : MOCK_MERGE_SIMILAR.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="mergeThumbs">
                        {row.thumbTints.map((c, i) => (
                          <span key={i} className="mergeThumb" style={{ background: c }} />
                        ))}
                        {row.moreCount != null ? (
                          <span className="mergeThumbMore">+{row.moreCount}</span>
                        ) : null}
                      </div>
                    </td>
                    <td className="mergeMono">{row.groupId}</td>
                    <td>
                      <div className="mergeCellTitle">{row.groupName}</div>
                      <div className="mergeCellSub">{row.category}</div>
                    </td>
                    <td className="mergeMono">{row.count}</td>
                    <td className="mergeActions">
                      <button type="button" className="mergeIconBtn" aria-label="Редактировать">
                        <PencilIcon />
                      </button>
                      <button type="button" className="mergeIconBtn" aria-label="Удалить">
                        <TrashIcon />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <button type="button" className="mergeFab" aria-label="Поддержка в чате">
        <ChatFabIcon />
      </button>

      <CreateMergeGroupPanel
        open={panelOpen}
        tabMode={tab}
        addedCount={panelAddedCount}
        onClose={() => setPanelOpen(false)}
        onAddProductsMock={() => setPanelAddedCount((n) => Math.min(n + 1, 99))}
      />
    </div>
  );
}
