import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProductById } from "@/lib/mockProducts";

const manufacturers = ["Alutech", "DoorHan", "Hormann", "Nice"];
const types = [
  "Откатные",
  "Распашные",
  "Секционные",
  "Промышленные",
  "Противопожарные",
];
const applications = [
  "Для гаража",
  "Для дома",
  "Для дачи",
  "Для забора",
];
const materials = ["Сталь", "Алюминий", "Панели сэндвич", "Профнастил"];

type ProductCatalogSectionProps = {
  variant: "home" | "catalog";
  page?: number;
  category?: string | null;
};

function isManufacturerChecked(brand: string, selectedCategory?: string | null) {
  const map: Record<string, string> = {
    "brand-alutech": "Alutech",
    "brand-doorhan": "DoorHan",
    "brand-hormann": "Hormann",
    "brand-nice": "Nice",
  };
  if (!selectedCategory) return false;
  return map[selectedCategory] === brand;
}

function isTypeChecked(type: string, selectedCategory?: string | null) {
  switch (selectedCategory) {
    case "sliding":
      return type === "Откатные";
    case "sectional":
      return type === "Секционные";
    case "swing":
      return type === "Распашные";
    case "industrial":
      return type === "Промышленные";
    case "fire":
      return type === "Противопожарные";
    default:
      return false;
  }
}

function isApplicationChecked(appl: string, selectedCategory?: string | null) {
  return selectedCategory === "garage" && appl === "Для гаража";
}

export function ProductCatalogSection({
  variant,
  page = 1,
  category = null,
}: ProductCatalogSectionProps) {
  const isCatalog = variant === "catalog";
  const selectedCategory = category;

  const productIds =
    variant === "catalog"
      ? [1, 2, 3, 4].map((n) => (page - 1) * 4 + n)
      : [1, 2, 3, 4];

  const pages = [1, 2, 3];

  const asideRounded = isCatalog ? "rounded-3xl" : "rounded-2xl";
  const sortRounded = isCatalog ? "rounded-3xl" : "rounded-2xl";
  const checkboxSpacing = isCatalog ? "space-y-2" : "space-y-1";
  const typeSpacing = isCatalog ? "space-y-2" : "space-y-1 text-xs";
  const appSpacing = isCatalog ? "space-y-2" : "space-y-1 text-xs";

  const sectionWrap = isCatalog
    ? "bg-white rounded-3xl border border-slate-200 px-3 py-4"
    : "space-y-4 bg-white rounded-3xl px-3 py-4 border border-slate-200";

  return (
    <section className={sectionWrap}>
      {variant === "home" && (
        <h2 className="text-xl font-semibold px-1 text-slate-900">
          Каталог ворот
        </h2>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <aside
          className={`w-full md:w-64 lg:w-72 bg-slate-50 ${asideRounded} border border-slate-200 p-4 space-y-4 text-sm shrink-0`}
        >
          <div>
            <div className="font-semibold mb-2 text-slate-900">Производитель</div>
            <div className={checkboxSpacing}>
              {manufacturers.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-2 text-xs text-slate-800"
                >
                  {isCatalog ? (
                    <input
                      type="checkbox"
                      className="accent-emerald-600"
                      checked={isManufacturerChecked(brand, selectedCategory)}
                      readOnly
                    />
                  ) : (
                    <input type="checkbox" className="accent-emerald-600" />
                  )}{" "}
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2 text-slate-900">Вид ворот</div>
            <div className={typeSpacing}>
              {types.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 text-slate-800"
                >
                  {isCatalog ? (
                    <input
                      type="checkbox"
                      className="accent-emerald-600"
                      checked={isTypeChecked(type, selectedCategory)}
                      readOnly
                    />
                  ) : (
                    <input type="checkbox" className="accent-emerald-600" />
                  )}{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2 text-slate-900">Применение</div>
            <div className={appSpacing}>
              {applications.map((appl) => (
                <label
                  key={appl}
                  className="flex items-center gap-2 text-slate-800"
                >
                  {isCatalog ? (
                    <input
                      type="checkbox"
                      className="accent-emerald-600"
                      checked={isApplicationChecked(appl, selectedCategory)}
                      readOnly
                    />
                  ) : (
                    <input type="checkbox" className="accent-emerald-600" />
                  )}{" "}
                  {appl}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2 text-slate-900">Материал</div>
            <div className={checkboxSpacing}>
              {materials.map((mat) => (
                <label
                  key={mat}
                  className="flex items-center gap-2 text-xs text-slate-800"
                >
                  <input type="checkbox" className="accent-emerald-600" /> {mat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-2 text-slate-900">Цена, ₽</div>
            <div className="text-xs mb-1 text-slate-700">
              от 30 000 до 300 000
            </div>
            <input type="range" className="w-full accent-emerald-600" />
          </div>
        </aside>

        <div className="flex-1 space-y-3 md:space-y-4">
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50 border border-slate-200 ${sortRounded} p-3`}
          >
            <div className="text-slate-800">Найдено 128 предложений</div>
            <div className="flex items-center gap-2">
              <span className="text-slate-600">Сортировать:</span>
              <select
                className={
                  isCatalog
                    ? "border border-slate-300 rounded-2xl px-3 py-2 text-slate-900 bg-white"
                    : "border border-slate-300 rounded-lg px-2 py-1 text-slate-900 bg-white"
                }
              >
                <option>По популярности</option>
                <option>По цене (сначала дешевле)</option>
                <option>По цене (сначала дороже)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {productIds.map((id) => {
              const p = getProductById(String(id));
              if (!p) return null;
              const details = isCatalog
                ? p.shortDetails
                : p.shortDetails.slice(0, 3);
              return (
                <ProductCard
                  key={id}
                  productId={p.id}
                  title={p.title}
                  price={p.price}
                  details={details}
                  showDetailsLink={isCatalog}
                />
              );
            })}
          </div>

          {isCatalog ? (
            <nav className="flex justify-center gap-2 text-xs pt-2">
              {pages.map((p) => (
                <Link
                  key={p}
                  href={`/catalog?page=${p}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className={
                    p === page
                      ? "px-3 py-1 rounded-full border border-slate-900 bg-slate-900 text-white"
                      : "px-3 py-1 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                  }
                >
                  {p}
                </Link>
              ))}
              {page < 3 && (
                <Link
                  href={`/catalog?page=${page + 1}${selectedCategory ? `&category=${selectedCategory}` : ""}`}
                  className="px-3 py-1 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                >
                  Далее ▸
                </Link>
              )}
            </nav>
          ) : (
            <div className="flex justify-center gap-2 text-xs">
              {[1, 2, 3].map((p) => (
                <Link
                  key={p}
                  href={`/catalog?page=${p}`}
                  className="px-3 py-1 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
                >
                  {p}
                </Link>
              ))}
              <Link
                href="/catalog?page=2"
                className="px-3 py-1 rounded-full border border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              >
                Далее ▸
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
