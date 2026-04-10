"use client";

import { useState } from "react";

export function RegionSwitcher() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="text-[11px] text-slate-500 hover:text-slate-800"
      >
        Москва ▾
      </button>
      {open && (
        <div className="absolute right-0 mt-1 w-64 rounded-2xl border border-slate-200 bg-white shadow-md p-3 text-[11px] text-slate-700 z-50">
          Пока сервис работает только на территории Москвы и Московской области.
        </div>
      )}
    </div>
  );
}

