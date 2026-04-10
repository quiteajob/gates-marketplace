import { OrderCard } from "@/components/OrderCard";

export default function OrdersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
        Мои заказы
      </h1>
      <p className="text-sm text-slate-600">
        Здесь вы сможете отслеживать статус заказов на ворота и монтаж, видеть
        историю и повторять заказы.
      </p>

      <section className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-sm">
        {[1, 2, 3].map((id) => (
          <OrderCard
            key={id}
            id={`10${id}`}
            date="12.03.2026"
            title="Секционные ворота Alutech, 2500×2100 мм"
            address={`Москва, ул. Примерная, д.${id}`}
            status="в работе"
            price="87 900 ₽"
          />
        ))}
      </section>
    </div>
  );
}

