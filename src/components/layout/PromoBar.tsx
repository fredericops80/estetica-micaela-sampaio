"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { clinic } from "@/data/clinic";
import { useDictionary } from "@/components/providers/DictionaryProvider";

export function PromoBar() {
  const { dict, locale } = useDictionary();
  const [closed, setClosed] = useState(false);
  const promo = clinic.promo;
  if (!promo?.until || new Date(promo.until) < new Date()) return null;
  const copy = promo[locale];
  return (
    <AnimatePresence>
    {!closed && (
    <motion.div
      className="fixed bottom-5 left-5 z-40 hidden md:flex md:bottom-8 md:left-8"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ delay: closed ? 0 : 3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
    <a
      href={clinic.whatsappUrl(dict.whatsappMessages.promo)}
      target="_blank"
      rel="noreferrer"
      data-cursor="hover"
      className="flex max-w-xs items-center gap-4 rounded-full border border-ink/10 bg-porcelain/85 py-2 pl-2 pr-12 text-ink shadow-[0_10px_40px_-15px_rgba(43,36,32,0.35)] backdrop-blur-xl"
    >
      <span className="brand-gradient-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[0.65rem] font-semibold text-ink">40€</span>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.6rem] font-medium uppercase tracking-[0.2em] text-mute">{copy.label}</span>
        <span className="text-xs text-ink-soft">{copy.text}</span>
      </span>
    </a>
    <button type="button" onClick={() => setClosed(true)} aria-label="Fechar" data-cursor="hover" className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-mute transition-colors hover:bg-ink/5 hover:text-ink">
      <X className="h-3.5 w-3.5" strokeWidth={1.5} />
    </button>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
