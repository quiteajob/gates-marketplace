import Link from "next/link";

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

export function UpdateHistoryView() {
  return (
    <div className="updateHistoryPage">
      <nav className="productBreadcrumbs" aria-label="Навигация">
        <Link href="/dashboard" className="productCrumbBack" aria-label="Назад">
          ←
        </Link>
        <span className="productCrumbSep">|</span>
        <Link href="/dashboard/products">Товары</Link>
        <span className="productCrumbSep">&gt;</span>
        <span className="productCrumbCurrent">Работа с товарами</span>
      </nav>

      <div className="updateHistoryHead">
        <h1 className="updateHistoryTitle">История обновлений</h1>
        <button type="button" className="updateHistoryRefreshBtn">
          Обновить данные
        </button>
      </div>

      <div className="updateHistoryTableWrap card">
        <table className="updateHistoryTable">
          <thead>
            <tr>
              <th scope="col">Дата</th>
              <th scope="col">Название файла</th>
              <th scope="col">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr className="updateHistoryEmptyRow">
              <td colSpan={3}>
                <div className="updateHistoryEmptyShell">
                  <div className="updateHistoryEmpty">
                    <div className="updateHistoryEmptyIcon" aria-hidden>
                      📦
                    </div>
                    <p className="updateHistoryEmptyTitle">Пока нет загруженных шаблонов</p>
                    <p className="updateHistoryEmptySub">
                      Загрузите товары массово с помощью онлайн-таблицы или XLSX файла. Результат загрузки
                      покажем здесь
                    </p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <footer className="updateHistoryFooter">
        <p>© 2026 Seller Panel. Все права защищены.</p>
      </footer>

      <button type="button" className="updateHistoryFab" aria-label="Поддержка в чате">
        <ChatFabIcon />
      </button>
    </div>
  );
}
