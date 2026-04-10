import { notFound } from "next/navigation";
import { StubPage } from "@/components/StubPage";

const SERVICES: Record<string, string> = {
  remont: "Ремонт",
  montazh: "Установка и монтаж",
  calculator: "Калькулятор расчёта стоимости",
  prices: "Цены",
  reviews: "Отзывы",
  promo: "Акции",
};

export function generateStaticParams() {
  return Object.keys(SERVICES).map((slug) => ({ slug }));
}

export default async function ServiceStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = SERVICES[slug];
  if (!title) notFound();
  return <StubPage title={title} />;
}
