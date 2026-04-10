"use client";

import { useRouter } from "next/navigation";

export function LoginFormCard() {
  const router = useRouter();

  return (
    <section className="loginFormWrap">
      <div className="card loginFormCard">
        <div className="loginPanelMark">SELLER ID</div>
        <h2>Введите номер телефона</h2>
        <p className="loginHint">Введите номер, чтобы получить код и войти в Seller Panel.</p>

        <input type="tel" placeholder="+7 (__) --" aria-label="Введите номер телефона" />

        <button type="button" onClick={() => router.push("/dashboard")}>
          Войти
        </button>

        <div className="loginLinks">
          <a href="#">Войти по почте</a>
          <a href="#">Не могу войти</a>
        </div>
      </div>
    </section>
  );
}
