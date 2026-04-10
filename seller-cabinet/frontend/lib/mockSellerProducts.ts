export type SellerProductRow = {
  id: string;
  articleTitle: string;
  sku: string;
  name: string;
  category: string;
  statusLine1: string;
  statusLine2?: string;
  statusCount?: number;
  price: string;
  reviews: number;
  rating: string;
  createdAt: string;
  photoTint: string;
};

export const MOCK_PRODUCT_ROWS: SellerProductRow[] = [
  {
    id: "1",
    articleTitle: "Секционные 2500×2100 белые",
    sku: "Арт. GW-SEC-2509016",
    name: "Секционные гаражные ворота, проём 2500×2100 мм, панель сэндвич, цвет RAL 9016, комплект с автоматикой",
    category: "Гаражные секционные ворота",
    statusLine1: "Не продается",
    statusLine2: "Убран из продажи",
    statusCount: 1,
    price: "—",
    reviews: 0,
    rating: "—",
    createdAt: "12.03.2025",
    photoTint: "#dce3eb",
  },
  {
    id: "2",
    articleTitle: "Откатные 4 м консоль 600",
    sku: "Арт. GW-OTK-4K600",
    name: "Откатные ворота без нижней направляющей, пролёт до 4 м, несущая консоль до 600 кг, оцинковка",
    category: "Откатные ворота",
    statusLine1: "Готов к продаже",
    price: "189 000 ₽",
    reviews: 14,
    rating: "4,8",
    createdAt: "02.04.2025",
    photoTint: "#c8d4e0",
  },
  {
    id: "3",
    articleTitle: "Привод для откатных до 500 кг",
    sku: "Арт. AU-SL500-KIT",
    name: "Электропривод для откатных ворот, до 500 кг, базовый комплект с блоком управления и пультами",
    category: "Автоматика и приводы",
    statusLine1: "На модерации",
    statusCount: 2,
    price: "42 500 ₽",
    reviews: 3,
    rating: "4,2",
    createdAt: "28.03.2025",
    photoTint: "#b8c5d6",
  },
  {
    id: "4",
    articleTitle: "Рельс направляющий 6 м",
    sku: "Арт. GW-RAIL-6M-G",
    name: "Направляющая балка для откатных ворот, оцинкованная, длина 6 м, с крепёжным комплектом",
    category: "Комплектующие и фурнитура",
    statusLine1: "В продаже",
    price: "24 900 ₽",
    reviews: 42,
    rating: "4,9",
    createdAt: "15.01.2025",
    photoTint: "#aebccc",
  },
];

export const PRODUCT_TABS = [
  { id: "all", label: "Все", count: 32 },
  { id: "sale", label: "В продаже", count: 0 },
  { id: "ready", label: "Готовы к продаже", count: 8 },
  { id: "errors", label: "Ошибки", count: 0 },
  { id: "draft", label: "На доработку", count: 0 },
  { id: "withdrawn", label: "Сняты с продажи", count: 24 },
  { id: "archive", label: "Архив", count: 333 },
] as const;
