import Link from "next/link";
import { LoginInfoPanel } from "@/components/login/LoginInfoPanel";
import "./styles.css";

export default function LoginPage() {
  return (
    <>
      <header className="loginTopBar">
        <div className="topBarLogo">SELLER PANEL</div>
        <div className="topBarActions">
          <a href="#">Обучение</a>
          <a href="#">Что продавать</a>
          <Link href="/login/access" className="topBarBtn topBarBtnGhost">
            Стать продавцом
          </Link>
          <Link href="/login/access" className="topBarBtn topBarBtnPrimary">
            Войти в кабинет
          </Link>
        </div>
      </header>
      <main className="loginPage">
        <LoginInfoPanel />
      </main>
      <footer className="loginFooter">
        <a href="#">Документация</a>
        <a href="#">Помощь</a>
        <a href="#">Контакты</a>
      </footer>
    </>
  );
}
