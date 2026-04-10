export type ProductSpec = { label: string; value: string };

export type MockProduct = {
  id: string;
  title: string;
  price: string;
  brand: string;
  shortDetails: string[];
  specs: ProductSpec[];
  description: string[];
  inStock: boolean;
};

const baseSpecs: ProductSpec[] = [
  { label: "Тип", value: "Секционные" },
  { label: "Производитель", value: "Alutech" },
  { label: "Ширина проёма", value: "2500 мм" },
  { label: "Высота проёма", value: "2100 мм" },
  { label: "Материал полотна", value: "Сталь, сэндвич-панели" },
  { label: "Утепление", value: "Пенополиуретан" },
  { label: "Цвет", value: "RAL 9016 (белый)" },
  { label: "Привод", value: "В комплекте (Nice)" },
  { label: "Монтаж", value: "Москва и МО" },
];

function buildProduct(id: number): MockProduct {
  const offset = (id % 5) * 1200;
  const priceNum = 87900 + offset;
  return {
    id: String(id),
    title: `Секционные ворота Alutech, 2500×2100 мм · вариант ${id}`,
    price: `от ${priceNum.toLocaleString("ru-RU")} ₽`,
    brand: "Alutech",
    shortDetails: [
      "Тип: секционные",
      "Ширина: 2500 мм",
      "Высота: 2100 мм",
      id % 2 === 0 ? "Монтаж: под ключ" : "Монтаж: Москва и МО",
    ],
    specs: baseSpecs,
    description: [
      "Надёжная секционная конструкция для гаража или склада. Комплект может поставляться с автоматикой и монтажом в Москве и Московской области.",
      "Точная комплектация и сроки уточняются при оформлении заказа у выбранного продавца на площадке AvtoVorota.",
    ],
    inStock: true,
  };
}

const cache = new Map<string, MockProduct>();

/** ID для статической сборки (1–999 совпадает с getProductById). */
export function getAllStaticProductParams(): { productId: string }[] {
  return Array.from({ length: 999 }, (_, i) => ({
    productId: String(i + 1),
  }));
}

export function getProductById(rawId: string): MockProduct | null {
  const id = String(rawId).trim();
  if (!/^\d+$/.test(id)) return null;
  const num = Number(id);
  if (num < 1 || num > 999) return null;
  if (!cache.has(id)) {
    cache.set(id, buildProduct(num));
  }
  return cache.get(id)!;
}
