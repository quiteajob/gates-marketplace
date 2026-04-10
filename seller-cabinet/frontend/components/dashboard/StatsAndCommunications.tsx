export function StatsAndCommunications() {
  return (
    <section className="card communicationsSection">
      <h3>Коммуникации</h3>
      <div className="dashboardBottom">
        <div className="commColumn">
          <h4>Новые взаимодействия</h4>
          <ul className="commList">
            <li>
              <span>Отзывы</span>
              <strong>63</strong>
            </li>
            <li>
              <span>Вопросы</span>
              <strong>2</strong>
            </li>
          </ul>
        </div>

        <div className="commColumn">
          <h4>Сообщения от покупателей</h4>
          <ul className="commList">
            <li>
              <span>Непрочитанные</span>
              <strong>0</strong>
            </li>
            <li>
              <span>Новые за сегодня</span>
              <strong>0</strong>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
