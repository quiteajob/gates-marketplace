import { CartItem } from "@/components/CartItem";

export default function CartPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-2">
        Корзина
      </h1>
      <p className="text-sm text-slate-600">
        Здесь будут товары, которые вы добавили в корзину. Пока корзина пуста.
      </p>

      <div className="grid md:grid-cols-[2fr,1fr] gap-6 items-start">
        {/* Левая колонка — список товаров */}
        <section className="space-y-3">
          {[1, 2].map((id) => (
            <CartItem
              key={id}
              title="Секционные ворота Alutech, 2500×2100 мм"
              price="87 900 ₽"
              quantity={1}
            />
          ))}
        </section>

        {/* Правая колонка — итог */}
        <aside className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 text-sm">
          <h2 className="text-lg font-semibold text-slate-900">Ваш заказ</h2>
          <div className="flex justify-between text-slate-700 text-xs">
            <span>Товары, 2 шт.</span>
            <span>175 800 ₽</span>
          </div>
          <div className="flex justify-between text-slate-700 text-xs">
            <span>Скидка</span>
            <span className="text-emerald-600">− 5 000 ₽</span>
          </div>
          <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
            <span className="text-xs text-slate-600">Итого</span>
            <span className="text-xl font-semibold text-slate-900">
              170 800 ₽
            </span>
          </div>
          <button className="w-full mt-2 py-2.5 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium">
            Перейти к оформлению
          </button>
          <p className="text-[11px] text-slate-500">
            Нажимая кнопку, вы перейдёте на страницу оформления заказа и сможете
            выбрать условия монтажа и оплаты.
          </p>
        </aside>
      </div>
    </div>
  );
}

