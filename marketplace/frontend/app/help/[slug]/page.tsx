import { notFound } from "next/navigation";
import { StubPage } from "@/components/StubPage";

const HELP: Record<string, string> = {
  faq: "Вопросы и ответы",
  order: "Как сделать заказ",
  delivery: "Доставка",
  payment: "Оплата",
};

export function generateStaticParams() {
  return Object.keys(HELP).map((slug) => ({ slug }));
}

export default async function HelpStubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = HELP[slug];
  if (!title) notFound();
  return <StubPage title={title} />;
}
