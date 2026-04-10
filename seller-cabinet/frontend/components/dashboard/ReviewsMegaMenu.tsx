import {
  SellerMegaMenu,
  type MegaMenuColumn,
} from "@/components/dashboard/SellerMegaMenu";

const REVIEWS_COLUMNS: MegaMenuColumn[] = [
  {
    title: "Отзывы",
    items: [
      { label: "Отзывы покупателей" },
      { label: "Аналитика отзывов" },
      { label: "Закрепление отзыва" },
      { label: "Ускоренный сбор отзывов" },
      { label: "Жалобы" },
      { label: "Вопросы и ответы" },
    ],
  },
];

export function ReviewsMegaMenu({ isOpen }: { isOpen: boolean }) {
  return <SellerMegaMenu isOpen={isOpen} columns={REVIEWS_COLUMNS} />;
}
