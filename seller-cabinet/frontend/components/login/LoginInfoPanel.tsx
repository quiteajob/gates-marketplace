"use client";

import { useMemo, useState } from "react";

type StepContent = {
  title: string;
  text: string[];
  cards: { title: string; desc: string }[];
};

export function LoginInfoPanel() {
  const [activeStep, setActiveStep] = useState(1);

  const blocks: Record<number, StepContent> = {
    1: {
      title: "Выберите товары",
      text: [
        "Вам поможет бесплатный сервис «Что продавать в Seller Panel». В нём сможете:",
        "определить прибыльную нишу и товар;",
        "рассчитать примерную прибыль и затраты;",
        "найти проверенных поставщиков.",
      ],
      cards: [
        {
          title: "Сервис бесплатной аналитики",
          desc: "Используйте данные для оценки категории и выбора поставщика.",
        },
        {
          title: "Калькулятор",
          desc: "Рассчитайте свой заработок в Seller Panel.",
        },
      ],
    },
    2: {
      title: "Зарегистрируйтесь",
      text: [
        "Укажите контактные данные, категорию товаров, ИНН",
        "и тип организации: ИП, юрлицо или самозанятость.",
      ],
      cards: [
        {
          title: "Регистрация бизнеса",
          desc: "Зарегистрируйте бесплатно ИП или ООО в Seller Panel.",
        },
        {
          title: "Как зарегистрироваться",
          desc: "Пошаговая инструкция для быстрого старта.",
        },
      ],
    },
    3: {
      title: "Загрузите товары",
      text: [
        "Можете сделать это разными способами:",
        "вручную — если товаров немного;",
        "через онлайн-таблицы — если много позиций;",
        "с помощью API — если есть своя система с большим количеством товаров.",
      ],
      cards: [
        {
          title: "Загрузка в личный кабинет",
          desc: "Импортируйте карточки и остатки в пару кликов.",
        },
      ],
    },
  };

  const current = useMemo(() => blocks[activeStep], [activeStep]);

  return (
    <section className="loginInfoPanel">
      <div className="loginPanelHead">
        <h1>Всего 3 шага, и можно продавать</h1>
      </div>

      <div className="stepsRow card">
        <button type="button" className={`stepPill ${activeStep === 1 ? "active" : ""}`} onClick={() => setActiveStep(1)}>
          1 - Выбор товаров
          <small>5 мин</small>
        </button>
        <button type="button" className={`stepPill ${activeStep === 2 ? "active" : ""}`} onClick={() => setActiveStep(2)}>
          2 - Регистрация
          <small>3 мин</small>
        </button>
        <button type="button" className={`stepPill ${activeStep === 3 ? "active" : ""}`} onClick={() => setActiveStep(3)}>
          3 - Загрузка товаров
          <small>30 мин</small>
        </button>
      </div>

      <div className={`card showcaseCard ${activeStep === 3 ? "singleRight" : ""}`}>
        <article className="showcaseMain">
          <h2>{current.title}</h2>
          <p>
            {current.text[0]} {activeStep === 1 ? <a href="#">Подробнее</a> : null}
          </p>
          <ul>
            {current.text.slice(1).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </article>
        {current.cards.map((card, idx) => (
          <article className="showcaseSide" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <div className={`mockIllustration ${idx % 2 === 1 ? "second" : ""}`} aria-hidden />
          </article>
        ))}
      </div>
    </section>
  );
}
