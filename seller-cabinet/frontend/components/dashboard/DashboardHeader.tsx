"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ProductsMegaMenu } from "@/components/dashboard/ProductsMegaMenu";
import { ReviewsMegaMenu } from "@/components/dashboard/ReviewsMegaMenu";
import { ShowcaseMegaMenu } from "@/components/dashboard/ShowcaseMegaMenu";

type MegaKey = "products" | "reviews" | "showcase";

export function DashboardHeader() {
  const pathname = usePathname();
  const isProductsSection = pathname?.startsWith("/dashboard/products") ?? false;
  const [brandOpen, setBrandOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<MegaKey | null>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const megaGroupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Node;
      if (brandRef.current && !brandRef.current.contains(target)) setBrandOpen(false);
      if (profileRef.current && !profileRef.current.contains(target)) setProfileOpen(false);
      if (megaGroupRef.current && !megaGroupRef.current.contains(target)) {
        setMegaMenu(null);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header className="card dashboardHeader">
      <div className="headerTop">
        <div className="headerBrand">SELLER PANEL</div>
        <div className="headerRight">
          <div
            className="dropdownWrap"
            ref={brandRef}
            onMouseEnter={() => setBrandOpen(true)}
            onMouseLeave={() => setBrandOpen(false)}
          >
            <button type="button" className="brandToggle">
              Brand Name <span>{brandOpen ? "▲" : "▼"}</span>
            </button>
            <div className={`dropdown card ${brandOpen ? "open" : ""}`}>
              <button type="button">Добавить компанию</button>
            </div>
          </div>

          <button className="iconBtn" data-tip="Чаты с покупателями" type="button">
            💬
          </button>
          <button className="iconBtn" data-tip="Поддержка" type="button">
            ❔
          </button>
          <button className="iconBtn" data-tip="Уведомления" type="button">
            🔔
            <span className="badge">66</span>
          </button>

          <div
            className="dropdownWrap profileMenuWrap"
            ref={profileRef}
            onMouseEnter={() => setProfileOpen(true)}
            onMouseLeave={() => setProfileOpen(false)}
          >
            <button
              type="button"
              className="iconBtn profileIconBtn"
              data-tip="Профиль"
              aria-expanded={profileOpen}
              aria-haspopup="true"
              onClick={() => setProfileOpen((v) => !v)}
            >
              <svg
                className="profileIconSvg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M12 12.75c2.9 0 5.25-2.35 5.25-5.25S14.9 2.25 12 2.25 6.75 4.6 6.75 7.5 9.1 12.75 12 12.75z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M4.5 21.75c.6-4.2 3.97-7.5 7.5-7.5s6.9 3.3 7.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className={`dropdown card profileDropdown ${profileOpen ? "open" : ""}`}>
              <div className="profileTop">
                <strong>Иван Иванов</strong>
                <span>example@mail.com</span>
              </div>
              <hr />
              <button type="button">⚙ Настройки</button>
              <button type="button">↪ Выйти</button>
            </div>
          </div>
        </div>
      </div>

      <div className="headerNav">
        <Link
          href="/dashboard"
          className={`navTab ${pathname === "/dashboard" ? "active" : ""}`}
        >
          Главная
        </Link>
        <div ref={megaGroupRef} className="headerNavMegaCluster">
          <div
            className="productsMenuWrap"
            onMouseEnter={() => setMegaMenu("products")}
            onMouseLeave={() => setMegaMenu(null)}
          >
            <Link
              href="/dashboard/products"
              className={`navTab ${isProductsSection ? "active" : ""}`}
            >
              Товары
            </Link>
            <ProductsMegaMenu isOpen={megaMenu === "products"} />
          </div>
          <div
            className="productsMenuWrap"
            onMouseEnter={() => setMegaMenu("reviews")}
            onMouseLeave={() => setMegaMenu(null)}
          >
            <button
              type="button"
              className={`navTab ${megaMenu === "reviews" ? "active" : ""}`}
            >
              Отзывы
            </button>
            <ReviewsMegaMenu isOpen={megaMenu === "reviews"} />
          </div>
          <div
            className="productsMenuWrap"
            onMouseEnter={() => setMegaMenu("showcase")}
            onMouseLeave={() => setMegaMenu(null)}
          >
            <button
              type="button"
              className={`navTab ${megaMenu === "showcase" ? "active" : ""}`}
            >
              Витрина
            </button>
            <ShowcaseMegaMenu isOpen={megaMenu === "showcase"} />
          </div>
        </div>
        <button type="button" className="navTab">
          Цены
        </button>
        <button type="button" className="navTab">
          Финансы
        </button>
        <button type="button" className="navTab">
          Аналитика
        </button>
      </div>
    </header>
  );
}
