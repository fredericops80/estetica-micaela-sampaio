"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Dictionary, Locale } from "@/i18n";

const Ctx = createContext<{ dict: Dictionary; locale: Locale } | null>(null);

export function DictionaryProvider({ dict, locale, children }: { dict: Dictionary; locale: Locale; children: ReactNode }) {
  return <Ctx.Provider value={{ dict, locale }}>{children}</Ctx.Provider>;
}

export function useDictionary() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDictionary must be used inside DictionaryProvider");
  return v;
}
