import {
  SellerMegaMenu,
  type MegaMenuColumn,
} from "@/components/dashboard/SellerMegaMenu";

const SHOWCASE_COLUMNS: MegaMenuColumn[] = [
  {
    title: "Витрина",
    items: [
      { label: "Оформление магазина" },
      { label: "Подборки товаров" },
    ],
  },
];

export function ShowcaseMegaMenu({ isOpen }: { isOpen: boolean }) {
  return <SellerMegaMenu isOpen={isOpen} columns={SHOWCASE_COLUMNS} />;
}
