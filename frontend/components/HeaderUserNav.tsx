"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { LoginModal } from "@/components/LoginModal";

type NavItemProps = {
  href: string;
  label: string;
  children: ReactNode;
};

function NavItem({ href, label, children }: NavItemProps) {
  const pathname = usePathname();
  const active =
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={
        active
          ? "flex flex-col items-center gap-0.5 min-w-[52px] text-slate-900"
          : "flex flex-col items-center gap-0.5 min-w-[52px] text-slate-500 hover:text-sky-500"
      }
    >
      <span className={active ? "text-slate-900" : ""}>{children}</span>
      <span className="text-[11px] font-medium leading-none">{label}</span>
    </Link>
  );
}

export function HeaderUserNav() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <div className="flex items-start gap-4 text-sm pt-0.5">
        <NavItem href="/orders" label="Заказы">
          <ClipboardDocumentListIcon className="w-5 h-5" aria-hidden />
        </NavItem>
        <NavItem href="/cart" label="Корзина">
          <ShoppingCartIcon className="w-5 h-5" aria-hidden />
        </NavItem>
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className={
            loginOpen
              ? "flex flex-col items-center gap-0.5 min-w-[52px] text-slate-900"
              : "flex flex-col items-center gap-0.5 min-w-[52px] text-slate-500 hover:text-sky-500"
          }
        >
          <UserIcon className="w-5 h-5" aria-hidden />
          <span className="text-[11px] font-medium leading-none">Войти</span>
        </button>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
