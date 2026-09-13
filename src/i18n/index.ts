import { pt, type Dictionary } from "./dictionaries/pt";
import { en } from "./dictionaries/en";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
export { locales, defaultLocale, isLocale, localePath, type Locale } from "./config";

/** Simple {token} interpolation */
export function t(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}
