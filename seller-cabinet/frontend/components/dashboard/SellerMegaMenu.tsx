import Link from "next/link";

export type MegaMenuItem = {
  label: string;
  href?: string;
};

export type MegaMenuColumn = {
  title: string;
  items: MegaMenuItem[];
};

export function SellerMegaMenu({
  isOpen,
  columns,
}: {
  isOpen: boolean;
  columns: MegaMenuColumn[];
}) {
  return (
    <div className={`megaMenu megaMenuNarrow card ${isOpen ? "open" : ""}`}>
      {columns.map((column) => (
        <section key={column.title}>
          <h4>{column.title}</h4>
          <ul>
            {column.items.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href} className="megaMenuLink">
                    {item.label}
                  </Link>
                ) : (
                  <button type="button">{item.label}</button>
                )}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
