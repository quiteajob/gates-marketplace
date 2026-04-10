type StubPageProps = {
  title: string;
  description?: string;
};

export function StubPage({ title, description }: StubPageProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900 mb-4">{title}</h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        {description ??
          "Этот раздел скоро будет заполнен контентом. Сейчас это заглушка."}
      </p>
    </div>
  );
}
