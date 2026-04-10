"use client";

import { useEffect } from "react";

type TabMode = "model" | "similar";

type CreateMergeGroupPanelProps = {
  open: boolean;
  tabMode: TabMode;
  addedCount: number;
  onClose: () => void;
  onAddProductsMock: () => void;
};

export function CreateMergeGroupPanel({
  open,
  tabMode,
  addedCount,
  onClose,
  onAddProductsMock,
}: CreateMergeGroupPanelProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const sectionTitle = tabMode === "model" ? "Варианты модели" : "Похожие товары";
  const sectionDesc =
    tabMode === "model"
      ? "Покупатель увидит эти варианты в одной карточке модели и сможет выбрать размер проёма, цвет полотна или комплектацию. "
      : "Связанные позиции будут показываться в карточках друг у друга — например, привод и комплект фурнитуры для тех же ворот. ";
  const canSave = addedCount >= 2;

  return (
    <>
      <button type="button" className="mergePanelBackdrop" aria-label="Закрыть" onClick={onClose} />
      <div
        className="mergePanel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mergePanelTitle"
      >
        <div className="mergePanelInner">
          <div className="mergePanelHeader">
            <h2 id="mergePanelTitle">Создание группы</h2>
            <button type="button" className="mergePanelClose" onClick={onClose} aria-label="Закрыть">
              ×
            </button>
          </div>

          <label className="mergePanelField">
            <span className="mergePanelLabel">Название группы *</span>
            <input
              type="text"
              className="mergePanelInput"
              placeholder={
                tabMode === "model"
                  ? "Например, секционные ворота ProTherm, серия Стандарт"
                  : "Например, комплекты автоматики для откатных 600 кг"
              }
            />
          </label>

          <section className="mergePanelSection">
            <div className="mergePanelSectionHead">
              <h3>{sectionTitle}</h3>
              <button type="button" className="mergePanelAddBtn" onClick={onAddProductsMock}>
                Добавить товары
              </button>
            </div>
            <p className="mergePanelHint">
              {sectionDesc}
              <a href="#">Как это выглядит</a>
            </p>

            <div className="mergePanelEmpty">
              <div className="mergePanelBoxIcon" aria-hidden>
                📦
              </div>
              <p className="mergePanelEmptyTitle">Пока ничего нет</p>
              <p className="mergePanelEmptySub">
                Чтобы создать группу, добавьте хотя бы 2 товара
                {addedCount > 0 ? ` (сейчас в списке: ${addedCount})` : ""}
              </p>
            </div>
          </section>

          <div className="mergePanelFooter">
            <button type="button" className="mergePanelSave" disabled={!canSave}>
              Сохранить
            </button>
            <button type="button" className="mergePanelCancel" onClick={onClose}>
              Отмена
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
