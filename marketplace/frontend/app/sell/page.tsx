export default function SellPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
        Стать продавцом на AvtoVorota
      </h1>
      <p className="text-sm text-slate-600 max-w-2xl">
        Размещайте свои предложения по автоматическим воротам, получайте заявки
        от клиентов и управляйте заказами в едином личном кабинете.
      </p>

      <section className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 text-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Как начать работать с нами
        </h2>
        <ol className="list-decimal list-inside space-y-1 text-slate-700">
          <li>Оставьте заявку на подключение компании.</li>
          <li>Заполните информацию о брендах, типах ворот и услугах.</li>
          <li>Получите доступ к личному кабинету и начните принимать заказы.</li>
        </ol>
      </section>
    </div>
  );
}

