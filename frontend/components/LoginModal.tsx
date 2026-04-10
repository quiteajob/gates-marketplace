"use client";

import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { digitsCountRuPhone, formatRuPhone } from "@/lib/formatRuPhone";

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginModal({ open, onClose }: LoginModalProps) {
  const titleId = useId();
  const phoneId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(formatRuPhone(e.target.value));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const n = digitsCountRuPhone(phone);
    if (n < 11) return;
    setSubmitting(true);
    try {
      // Заглушка: здесь будет запрос к API отправки кода
      await new Promise((r) => setTimeout(r, 600));
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setPhone("");
  }, [open]);

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        className="absolute inset-0 bg-slate-900/55 motion-safe:animate-login-overlay-enter"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-xl motion-safe:animate-login-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          aria-label="Закрыть"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        <h2
          id={titleId}
          className="pr-10 text-center text-lg font-semibold text-slate-900 sm:text-left"
        >
          Войти или создать профиль
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor={phoneId} className="sr-only">
              Номер телефона
            </label>
            <input
              ref={inputRef}
              id={phoneId}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 000 000-00-00"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none ring-sky-200 ring-offset-2 placeholder:text-slate-400 focus:border-sky-400 focus:ring-2"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || digitsCountRuPhone(phone) < 11}
            className="w-full rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 py-3.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? "Отправка…" : "Получить код"}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] leading-snug text-slate-600">
          Нажимая на кнопку, я соглашаюсь с{" "}
          <Link
            href="/terms"
            onClick={onClose}
            className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
          >
            правилами пользования торговой площадкой
          </Link>
          .{" "}
          <Link
            href="/privacy"
            onClick={onClose}
            className="text-sky-600 underline underline-offset-2 hover:text-sky-700"
          >
            Политика конфиденциальности
          </Link>
        </p>
      </div>
    </div>
  );
}
