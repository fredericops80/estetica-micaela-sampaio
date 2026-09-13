# Estética Micaela Sampaio — site

Site institucional (one-page), landing page do **Club +Estética** e página de **agendamento online**.
Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 4 · Framer Motion · Lenis · GSAP.

## Correr

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Rotas

| Rota | O que é |
|------|---------|
| `/` · `/en` | Home (pt-PT por defeito, inglês em `/en`) |
| `/club` · `/en/club` | Landing page do Club +Estética (tema escuro) |
| `/agendar` · `/en/agendar` | Wizard de marcação (tratamento → dia/hora → dados → confirmação) |
| `/api/bookr/*` | Route handlers que falam com o Bookr (ver abaixo) |

O idioma é resolvido em [src/proxy.ts](src/proxy.ts): `/qualquer-coisa` é reescrito internamente para `/pt/...`; `/pt/...` redireciona para a raiz; visitantes com browser em inglês são enviados uma vez para `/en`.

## Onde vive o conteúdo (sem CMS)

- [src/data/clinic.ts](src/data/clinic.ts) — morada, telefone, horários, Instagram, promo do mês.
- [src/data/services.ts](src/data/services.ts) — os 22 tratamentos (nomes, durações e preços iguais ao Bookr). Cada um tem `source: "bookr"` (texto da clínica) ou `"draft"` (texto redigido para o site, a validar).
- [src/data/club.ts](src/data/club.ts) — planos, menu e FAQ do Club. **Sem preços** (não são públicos).
- [src/data/testimonials.ts](src/data/testimonials.ts) — depoimentos reais e casos antes/depois.
- [src/i18n/dictionaries/](src/i18n/dictionaries/) — todos os textos da interface em `pt.ts` e `en.ts`.

## Imagens a substituir

| Ficheiro | Estado |
|----------|--------|
| `public/assets/micaela/portrait-1.jpg` (3:4) | **placeholder** — colocar a foto de estúdio da Micaela |
| `public/assets/micaela/portrait-2.jpg` (3:4) | **placeholder** — colocar a segunda foto |
| `public/assets/before-after/*.jpg` | imagens geradas por IA, a trocar por casos reais com consentimento |
| `public/assets/skin/000..079.webp` | sequência do hero (gerada a partir de `docs/animacao-pele`, recortada para remover a marca de água) |
| `public/assets/brand/` | logótipo (normal e claro) e monograma, com transparência |

## Integração com o Bookr

A página de agendamento usa um adaptador em [src/lib/bookr/](src/lib/bookr/):

- Sem credenciais → `mock.ts` (horários gerados dentro do horário de abertura; a marcação não é enviada). A página mostra um aviso de demonstração.
- Com `BOOKR_API_URL` e `BOOKR_API_KEY` → `http.ts`. O Bookr não publica a API, por isso os caminhos e o mapeamento de campos estão concentrados nesse ficheiro para ajustar quando houver documentação.

Os `bookrId` de cada serviço e o `BOOKR_PROVIDER_ID` da Micaela já estão preenchidos com os IDs reais da agenda.

## Variáveis de ambiente

Copiar `.env.example` para `.env` e preencher `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` (analytics só carregam se existirem) e as credenciais do Bookr.

## Deploy (VPS Hostinger + Dokploy)

`next.config.ts` usa `output: "standalone"` e o [Dockerfile](Dockerfile) produz uma imagem mínima. No Dokploy: aplicação Docker apontada para este repositório, porta `3000`, variáveis de ambiente acima (as `NEXT_PUBLIC_*` também como build args).
