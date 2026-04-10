export default function AccountPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
        Личный кабинет
      </h1>
      <p className="text-sm text-slate-600">
        Войдите или зарегистрируйтесь, чтобы отслеживать заказы, сохранять
        адреса и настройки монтажа.
      </p>

      <div className="grid md:grid-cols-[1.2fr,1.8fr] gap-6 items-start">
        {/* Левая колонка — форма входа */}
        <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 text-sm">
          <h2 className="text-lg font-semibold text-slate-900">Вход</h2>
          <div className="space-y-2">
            <label className="block text-xs text-slate-700">
              Телефон или email
              <input
                className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="+7 900 000-00-00"
              />
            </label>
            <label className="block text-xs text-slate-700">
              Пароль
              <input
                type="password"
                className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Ваш пароль"
              />
            </label>
          </div>
          <button className="w-full py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium">
            Войти
          </button>
          <button className="w-full text-xs text-sky-600 hover:text-sky-500">
            Забыли пароль?
          </button>
        </section>

        {/* Правая колонка — преимущества и ссылки */}
        <aside className="space-y-4 text-sm">
          <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              Зарегистрируйтесь
            </h2>
            <p className="text-xs text-slate-700">
              Регистрация займёт не больше минуты. Вы сможете сохранять проекты,
              адреса объектов и быстрее оформлять заказы на монтаж.
            </p>
            <button className="mt-2 px-4 py-2 rounded-full border border-sky-600 text-sky-600 text-xs font-medium hover:bg-sky-50">
              Зарегистрироваться
            </button>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200 p-5 space-y-2 text-xs text-slate-700">
            <h3 className="text-sm font-semibold text-slate-900">
              Что даёт личный кабинет
            </h3>
            <ul className="list-disc list-inside space-y-1">
              <li>История заказов и монтажей</li>
              <li>Сохранённые объекты (гараж, дом, склад)</li>
              <li>Быстрый повторный заказ</li>
              <li>Уведомления о статусах и акциях</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

