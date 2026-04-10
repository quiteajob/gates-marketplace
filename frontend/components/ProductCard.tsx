import Link from "next/link";

type ProductCardProps = {
  productId: string;
  title: string;
  price: string;
  details?: string[];
  showDetailsLink?: boolean;
};

export function ProductCard({
  productId,
  title,
  price,
  details = [],
  showDetailsLink,
}: ProductCardProps) {
  const href = `/catalog/${productId}`;

  return (
    <div className="relative bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
      <Link
        href={href}
        className="absolute inset-0 z-0"
        aria-label={`Открыть страницу товара: ${title}`}
      />

      <div className="relative z-10 flex flex-1 flex-col md:flex-row gap-4 min-w-0 pointer-events-none">
        <div className="w-full md:w-44 aspect-[4/3] bg-slate-100 rounded-2xl flex-shrink-0" />
        <div className="flex-1 flex flex-col justify-between gap-2">
          <div>
            <div className="font-semibold text-[14px] md:text-[15px] mb-1 text-slate-900 leading-snug">
              {title}
            </div>
            {details.length > 0 && (
              <div className="text-xs text-slate-600 space-y-0.5">
                {details.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            )}
          </div>
          <div className="md:hidden text-lg font-semibold text-emerald-700">
            {price}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-row md:flex-col justify-between md:justify-end gap-3 md:min-w-[148px] md:border-l md:border-slate-100 md:pl-4 pointer-events-none">
        <div className="hidden md:block text-lg md:text-xl font-semibold text-emerald-700">
          {price}
        </div>
        <div className="relative z-20 flex flex-wrap items-center justify-end gap-2 w-full md:w-auto pointer-events-auto">
          <button
            type="button"
            className="px-4 py-2 rounded-2xl bg-emerald-600 text-white text-xs md:text-sm font-medium hover:bg-emerald-500"
          >
            В корзину
          </button>
          {showDetailsLink && (
            <Link
              href={href}
              className="text-xs md:text-sm font-medium text-slate-700 hover:text-slate-900 underline-offset-2 hover:underline"
            >
              Подробнее
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
