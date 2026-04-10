import {
  SellerMegaMenu,
  type MegaMenuColumn,
} from "@/components/dashboard/SellerMegaMenu";

const PRODUCTS_COLUMNS: MegaMenuColumn[] = [
  {
    title: "Работа с товарами",
    items: [
      { label: "Список товаров", href: "/dashboard/products" },
      { label: "Добавить товары", href: "/dashboard/products/add" },
      { label: "Объединить товары", href: "/dashboard/products/merge" },
      { label: "История обновлений", href: "/dashboard/products/history" },
      { label: "Сертификаты качества", href: "/dashboard/products/certificates" },
      { label: "Бренды" },
      { label: "Документы на бренды" },
      { label: "Управление карточками" },
    ],
  },
];

export function ProductsMegaMenu({ isOpen }: { isOpen: boolean }) {
  return <SellerMegaMenu isOpen={isOpen} columns={PRODUCTS_COLUMNS} />;
}
