# Design de Arquitetura - Estética Micaela Sampaio

## 1. Understanding Summary (Resumo de Entendimento)
* **O que:** Site institucional One-Page para a clínica "Estética Micaela Sampaio".
* **Por que:** Atuar como uma "passadeira vermelha" digital, focando em luxo, exclusividade e direcionando leads para o WhatsApp.
* **Para quem:** Mulheres (30 a 55+ anos) procurando tratamentos premium e *smart aging*.
* **Restrições:** Sem CMS (conteúdo gerido por código). Focado em performance e estabilidade (SSG).
* **Não-objetivos:** Múltiplas páginas (exceto link externo para Club +Estética) e painéis de administração.

## 2. Assumptions (Premissas)
* **Performance:** Carregamento ultra-rápido com exportação estática (SSG) no Next.js.
* **Assets:** Placeholders temporários serão usados até que as imagens e vídeos finais sejam providenciados.
* **Escala:** Tráfego moderado e focado, predominantemente mobile.
* **Segurança:** Superfície de ataque mínima por ser estático.
* **Integrações:** Meta Pixel e GA4 serão integrados de forma nativa e assíncrona futuramente.

## 3. Decision Log (Registo de Decisões)
* **Arquitetura de Dados:** Opção 1 (Fonte Única de Dados). Todo o conteúdo viverá num ficheiro `src/data/content.ts` e alimentará componentes visuais "burros".
* **Tipografia:** Combinação A (Playfair Display para títulos + Inter para textos). Transmite a sensação clássica, pesada e luxuosa necessária.
* **Framework:** Next.js (App Router) + Tailwind CSS + Framer Motion.
* **Deploy:** Exportação `standalone` e publicação via Dokploy num VPS Hostinger.

## 4. Final Design (Desenho da Solução)
### 4.1. Componentes e Organização
* `src/app/page.tsx`: Agregador das secções.
* `src/data/content.ts`: Dicionário global de textos, links e tratamentos.
* `src/components/layout/`: `Navbar` (fixa) e `Footer`.
* `src/components/sections/`: `Hero`, `About`, `MenuTabs`, `ClubBanner`, `SocialProof`, `ContactMap`.
* `src/components/ui/`: `Button`, `SectionTitle`, `Card`.

### 4.2. Casos Extremos (Edge Cases)
* **Fallback de Vídeo no Hero:** Implementação de um *poster* em alta resolução para conexões fracas ou modo de poupança de bateria em mobile.
* **Layout Mobile:** As abas de tratamentos (Faciais/Corporais) suportarão deslize suave ou funcionarão como acordeão em ecrãs estreitos para manter a fluidez visual.
* **Smart WhatsApp Links:** Os botões gerarão mensagens dinâmicas ("Olá, quero agendar a Avaliação" vs "Olá, quero agendar o tratamento X").
