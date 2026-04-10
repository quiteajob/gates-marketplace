import { LoginFormCard } from "@/components/login/LoginFormCard";
import "./styles.css";

export default function LoginAccessPage() {
  return (
    <main className="accessPage">
      <header className="accessHeader">SELLER PANEL</header>
      <section className="accessCenter">
        <LoginFormCard />
      </section>
      <footer className="accessFooter">
        <a href="#">Что такое Seller ID?</a>
        <a href="#">Начало работы в Seller Panel</a>
      </footer>
    </main>
  );
}
