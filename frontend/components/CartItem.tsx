type CartItemProps = {
  title: string;
  subtitle?: string;
  price: string;
  quantity?: number;
};

export function CartItem({
  title,
  subtitle = "Цвет: белый • Привод: есть",
  price,
  quantity = 1,
}: CartItemProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 flex gap-4 p-4">
      <div className="w-24 h-24 bg-slate-200 rounded-xl" />
      <div className="flex-1 flex flex-col justify-between gap-2 text-sm">
        <div>
          <div className="font-semibold text-slate-900 mb-1">{title}</div>
          <div className="text-xs text-slate-700">{subtitle}</div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <button className="w-7 h-7 rounded-full border border-slate-300 text-slate-700">
              −
            </button>
            <div className="px-3 py-1 rounded-full border border-slate-200 text-slate-900">
              {quantity}
            </div>
            <button className="w-7 h-7 rounded-full border border-slate-300 text-slate-700">
              +
            </button>
          </div>
          <div className="text-right">
            <div className="text-[15px] font-semibold text-slate-900">{price}</div>
            <button className="mt-1 text-xs text-slate-500 hover:text-slate-800">
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

