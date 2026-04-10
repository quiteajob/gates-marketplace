type OrderCardProps = {
  id: string;
  date: string;
  title: string;
  address: string;
  status?: string;
  price: string;
};

export function OrderCard({
  id,
  date,
  title,
  address,
  status = "в работе",
  price,
}: OrderCardProps) {
  return (
    <div className="border border-slate-200 rounded-2xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-1">
        <div className="text-xs text-slate-500">
          Заказ № {id} · от {date}
        </div>
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="text-xs text-slate-600">Объект: {address}</div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="text-xs text-emerald-600">Статус: {status}</div>
        <div className="text-[15px] font-semibold text-slate-900">{price}</div>
      </div>
    </div>
  );
}

