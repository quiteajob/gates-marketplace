export type CertificateRow = {
  id: string;
  number: string;
  name: string;
  type: string;
  status: "approved" | "pending" | "review" | "rejected";
  issued: string;
  expires: string;
  productsAdded: number;
  productsRejected: number | null;
};

export const MOCK_CERTIFICATES: CertificateRow[] = [
  {
    id: "1",
    number: "ЕАЭС N RU Д-RU.АЯ46.В.12345/25",
    name: "Сертификат ProGate Line",
    type: "Декларация о соответствии",
    status: "approved",
    issued: "14.02.2025",
    expires: "13.02.2028",
    productsAdded: 15,
    productsRejected: null,
  },
  {
    id: "2",
    number: "ЕАЭС N RU Д-RU.РА01.В.88776/24",
    name: "Декларация на приводы StreetDrive",
    type: "Декларация о соответствии",
    status: "approved",
    issued: "03.11.2024",
    expires: "02.11.2027",
    productsAdded: 22,
    productsRejected: null,
  },
  {
    id: "3",
    number: "РОСС RU.ЯЖ23.Н12345",
    name: "Сертификат секционных полотен ThermoPanel",
    type: "Сертификат соответствия",
    status: "approved",
    issued: "21.06.2025",
    expires: "20.06.2028",
    productsAdded: 5,
    productsRejected: 1,
  },
  {
    id: "4",
    number: "ЕАЭС N RU Д-RU.РА99.В.00001/26",
    name: "Новая декларация IndustrialGate",
    type: "Декларация о соответствии",
    status: "pending",
    issued: "01.04.2026",
    expires: "31.03.2029",
    productsAdded: 0,
    productsRejected: null,
  },
  {
    id: "5",
    number: "РОСС RU.АБ12.В99887",
    name: "Промышленные распашные ворота",
    type: "Декларация о соответствии",
    status: "review",
    issued: "15.03.2026",
    expires: "14.03.2029",
    productsAdded: 0,
    productsRejected: null,
  },
];

export type ProductWithoutCert = {
  id: string;
  title: string;
  category: string;
  article: string;
};

export const MOCK_PRODUCTS_WITHOUT_CERT: ProductWithoutCert[] = [
  {
    id: "1",
    title: "Секционные ворота 3000×2250 мм, сэндвич-панель, RAL 7016",
    category: "Строительство и ремонт › Ворота › Гаражные секционные",
    article: "GW-SEC-3007016",
  },
  {
    id: "2",
    title: "Комплект автomatики для откатных ворот, до 800 кг",
    category: "Строительство и ремонт › Автоматика › Приводы откатные",
    article: "AU-OTK-800",
  },
  {
    id: "3",
    title: "Откатные ворота консольные, пролёт 5 м, оцинковка",
    category: "Строительство и ремонт › Ворота › Откатные",
    article: "GW-OTK-5Z",
  },
];
