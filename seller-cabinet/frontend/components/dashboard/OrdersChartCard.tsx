"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const PERIOD_OPTIONS = ["Неделя", "7 дней", "14 дней", "28 дней"] as const;
const UNIT_OPTIONS = ["Рубли", "Штуки"] as const;

const LABELS_14 = [
  { d: "28", w: "сб" },
  { d: "29", w: "вс" },
  { d: "30", w: "" },
  { d: "31", w: "" },
  { d: "01", w: "" },
  { d: "02", w: "" },
  { d: "03", w: "" },
  { d: "04", w: "" },
  { d: "05", w: "" },
  { d: "06", w: "" },
  { d: "07", w: "" },
  { d: "08", w: "" },
  { d: "09", w: "" },
  { d: "10", w: "" },
];

const PREV_MONTH = ["15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"];

function periodLength(period: string) {
  if (period === "Неделя" || period === "7 дней") return 7;
  if (period === "28 дней") return 28;
  return 14;
}

function makeSeries(length: number, unit: string) {
  const seedRub = [1200, 1700, 900, 1500, 1100, 1000, 3200, 1300, 980, 1200, 890, 860, 910, 820];
  const seedPc = [4, 6, 3, 5, 4, 3, 8, 4, 3, 4, 3, 3, 3, 2];
  const base = unit === "Рубли" ? seedRub : seedPc;
  if (length <= base.length) return base.slice(0, length);
  return Array.from({ length }, (_, i) => base[i % base.length] + ((i % 5) - 2) * (unit === "Рубли" ? 90 : 1));
}

function points(series: number[], pad = 8) {
  const inner = 100 - 2 * pad;
  const max = Math.max(...series, 1);
  const min = Math.min(...series);
  const range = Math.max(max - min, 1);
  return series
    .map((v, i) => {
      const x = pad + (i / Math.max(series.length - 1, 1)) * inner;
      const y = pad + inner - ((v - min) / range) * (inner - pad);
      return `${x},${y}`;
    })
    .join(" ");
}

function fmtRub(v: number) {
  return `${v.toLocaleString("ru-RU")} ₽`;
}

function fmtPc(v: number) {
  return `${v} шт`;
}

export function OrdersChartCard() {
  const [period, setPeriod] = useState<(typeof PERIOD_OPTIONS)[number]>("14 дней");
  const [unit, setUnit] = useState<(typeof UNIT_OPTIONS)[number]>("Рубли");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const wrapRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const current = useMemo(() => makeSeries(periodLength(period), unit), [period, unit]);
  const prev = useMemo(() => current.map((v) => Math.max(0, Math.round(v * 0.86) - (unit === "Рубли" ? 80 : 0))), [current, unit]);

  const axisLabels = useMemo(() => {
    const len = current.length;
    if (len === 14) return LABELS_14.slice(0, 14);
    if (len === 7) return LABELS_14.slice(7, 14);
    return Array.from({ length: len }, (_, i) => ({ d: String(i + 1).padStart(2, "0"), w: "" }));
  }, [current.length]);

  const triggerLabel =
    unit === "Рубли" ? `В рублях за ${period.toLowerCase()}` : `В штуках за ${period.toLowerCase()}`;

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const onChartMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const ratio = x / rect.width;
      const idx = Math.min(Math.max(Math.round(ratio * (current.length - 1)), 0), current.length - 1);
      setHovered(idx);
      setTooltipPos({
        x: Math.min(Math.max(x, 120), rect.width - 120),
        y: Math.max(16, e.clientY - rect.top - 8),
      });
    },
    [current.length]
  );

  const onChartLeave = useCallback(() => {
    setHovered(null);
  }, []);

  const i = hovered !== null ? hovered : 0;
  const curVal = current[i] ?? 0;
  const prevVal = prev[i] ?? 0;
  const prevIdx = Math.min(i, PREV_MONTH.length - 1);
  const curLabel = axisLabels[i];
  const changePct =
    prevVal > 0
      ? Math.round(((curVal - prevVal) / prevVal) * 1000) / 10
      : prevVal === 0 && curVal > 0
        ? 100
        : curVal === 0 && prevVal > 0
          ? -100
          : 0;
  const curPieces = unit === "Рубли" ? Math.round(curVal / 362) : curVal;
  const prevPieces = unit === "Рубли" ? Math.max(0, Math.round(prevVal / 362)) : prevVal;

  return (
    <section className="chartSection">
      <article className="card chartCard">
        <div className="chartCardHeader">
          <h2>Заказано товаров</h2>
          <div className="chartHeaderSettings" ref={settingsRef}>
            <button
              type="button"
              className="chartSettingsTrigger"
              aria-expanded={settingsOpen}
              onClick={() => setSettingsOpen((o) => !o)}
            >
              {triggerLabel}
              <span className={`chartChevron ${settingsOpen ? "up" : "down"}`} aria-hidden />
            </button>
            {settingsOpen ? (
              <div className="chartSettingsDropdown card">
                <div className="chartSettingsBlock">
                  <div className="chartSettingsTitle">Единица измерения</div>
                  {UNIT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="chartSettingsRow"
                      onClick={() => {
                        setUnit(opt);
                        setSettingsOpen(false);
                      }}
                    >
                      <span>{opt}</span>
                      {unit === opt ? <span className="chartCheck">✓</span> : <span />}
                    </button>
                  ))}
                </div>
                <div className="chartSettingsDivider" />
                <div className="chartSettingsBlock">
                  <div className="chartSettingsTitle chartSettingsTitleRow">
                    Период<span className="chartCrown" aria-hidden title="Premium" />
                  </div>
                  {PERIOD_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="chartSettingsRow"
                      onClick={() => {
                        setPeriod(opt);
                        setSettingsOpen(false);
                      }}
                    >
                      <span>{opt}</span>
                      {period === opt ? <span className="chartCheck">✓</span> : <span />}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div
          ref={wrapRef}
          className="chartWrap"
          onMouseMove={onChartMove}
          onMouseLeave={onChartLeave}
        >
          <div className="chartYAxis">
            {unit === "Рубли" ? (
              <>
                <span>3,9 тыс</span>
                <span>1,9 тыс</span>
                <span>0</span>
              </>
            ) : (
              <>
                <span>10</span>
                <span>5</span>
                <span>0</span>
              </>
            )}
          </div>
          <div className="chartPlot">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" role="img" aria-label="График заказов">
              <polyline points={points(prev)} className="line prevLine" vectorEffect="non-scaling-stroke" />
              <polyline points={points(current)} className="line currentLine" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="chartXAxis">
              {axisLabels.map((lb, idx) => (
                <span key={`${lb.d}-${idx}`} className={idx === i && hovered !== null ? "active" : ""}>
                  {lb.d}
                  {lb.w ? <small>{lb.w}</small> : null}
                </span>
              ))}
            </div>
          </div>

          {hovered !== null ? (
            <div
              className="chartCompareTooltip"
              style={{ left: tooltipPos.x, top: tooltipPos.y, transform: "translate(-50%, -100%)" }}
            >
              <div className="chartCompareHead">
                <span>Период</span>
                <span>{unit === "Рубли" ? "Заказано на сумму" : "Заказано, шт"}</span>
              </div>
              <div className="chartCompareRow">
                <span className="chartDotCell">
                  <i className="dot blue" />
                  {curLabel?.d} апр
                </span>
                <span>
                  {unit === "Рубли" ? (
                    <>
                      {fmtRub(curVal)}
                      {changePct !== 0 ? (
                        <>
                          {" "}
                          <em className={changePct < 0 ? "down" : "up"}>
                            {changePct > 0 ? "+" : ""}
                            {changePct}%
                          </em>
                        </>
                      ) : null}
                      <br />
                      {fmtPc(curPieces)}
                    </>
                  ) : (
                    fmtPc(curVal)
                  )}
                </span>
              </div>
              <div className="chartCompareRow muted">
                <span className="chartDotCell">
                  <i className="dot purple" />
                  {PREV_MONTH[prevIdx]} мар
                </span>
                <span>
                  {unit === "Рубли" ? (
                    <>
                      {fmtRub(prevVal)}
                      <br />
                      {fmtPc(prevPieces)}
                    </>
                  ) : (
                    fmtPc(prevVal)
                  )}
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="chartFooter">
          <button type="button" className="chartRangeSelect">
            Заказано за 28 марта – 10 апр
            <span className="chartChevron down" aria-hidden />
          </button>
          <div className="chartSummary">
            <strong>9 477 ₽</strong>
            <span className="chartDelta">−29,96%</span>
            <em>25 шт</em>
          </div>
        </div>
      </article>
    </section>
  );
}
