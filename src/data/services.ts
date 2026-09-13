/**
 * Treatment menu. Names, durations and prices mirror the Bookr agenda
 * (estetica-micaela-sampaio.bookr.pt). Descriptions marked `source: "bookr"`
 * are the clinic's own words; the rest were drafted for this site and should
 * be validated by Micaela.
 */
export type ServiceCategory = "facial" | "corporal" | "signature";

export interface Service {
  id: string;
  bookrId: string;
  name: string;
  category: ServiceCategory;
  durationMin: number;
  price: number;
  source: "bookr" | "draft";
  description: { pt: string; en: string };
  benefits: { pt: string[]; en: string[] };
  /** Index into the skin frame sequence used as the hover preview */
  frame: number;
  featured?: boolean;
}

export const categories: { id: ServiceCategory; label: { pt: string; en: string } }[] = [
  { id: "facial", label: { pt: "Facial", en: "Face" } },
  { id: "corporal", label: { pt: "Corporal", en: "Body" } },
  { id: "signature", label: { pt: "Experiências", en: "Experiences" } },
];

export const services: Service[] = [
  // ---------------------------------------------------------------- facial
  {
    id: "consulta",
    bookrId: "012e2cad-945c-47f6-b401-decdcf57f097",
    name: "Consulta",
    category: "facial",
    durationMin: 45,
    price: 30,
    source: "bookr",
    frame: 4,
    featured: true,
    description: {
      pt: "Antes de escolher um procedimento, precisamos entender a sua pele e as suas necessidades. Uma avaliação personalizada, com o valor totalmente creditado quando realiza dois ou mais procedimentos.",
      en: "Before choosing a procedure we need to understand your skin and your needs. A personalised assessment, fully credited when you go on to book two or more procedures.",
    },
    benefits: {
      pt: ["Diagnóstico de pele", "Plano de tratamento", "Valor creditado"],
      en: ["Skin diagnosis", "Treatment plan", "Fee credited back"],
    },
  },
  {
    id: "limpeza-de-pele-pro",
    bookrId: "b9e65697-204e-4d4f-bc06-ab50547463ce",
    name: "Limpeza de Pele PRO",
    category: "facial",
    durationMin: 105,
    price: 60,
    source: "draft",
    frame: 12,
    featured: true,
    description: {
      pt: "A limpeza profunda de referência da clínica. Higienização, esfoliação, extração cuidada e máscara calmante, num protocolo de quase duas horas que devolve à pele o seu equilíbrio e luminosidade.",
      en: "The clinic's signature deep cleanse. Cleansing, exfoliation, careful extraction and a soothing mask in an almost two-hour protocol that returns balance and glow to the skin.",
    },
    benefits: {
      pt: ["Poros desobstruídos", "Textura uniforme", "Luminosidade imediata"],
      en: ["Unclogged pores", "Even texture", "Instant glow"],
    },
  },
  {
    id: "dermaplaning",
    bookrId: "bc7b0303-1870-4ee1-8ed7-3edd4c12492b",
    name: "Dermaplaning",
    category: "facial",
    durationMin: 45,
    price: 45,
    source: "bookr",
    frame: 20,
    description: {
      pt: "Um peeling físico superficial que promove a renovação da pele através da remoção controlada de células mortas e da penugem facial. A pele fica lisa, luminosa e mais recetiva aos ativos.",
      en: "A superficial physical peel that renews the skin through the controlled removal of dead cells and fine facial hair. Skin is left smooth, luminous and far more receptive to actives.",
    },
    benefits: {
      pt: ["Renovação imediata", "Sem tempo de recuperação", "Maquilhagem perfeita"],
      en: ["Instant renewal", "No downtime", "Flawless makeup"],
    },
  },
  {
    id: "combo-limpeza-dermaplaning",
    bookrId: "4d4744e6-4977-46cc-b3c4-aeebaa6609b3",
    name: "Limpeza de Pele + Dermaplaning",
    category: "facial",
    durationMin: 120,
    price: 75,
    source: "bookr",
    frame: 26,
    featured: true,
    description: {
      pt: "A combinação perfeita para uma pele renovada, lisa e luminosa numa única experiência. A limpeza profunda prepara, o dermaplaning revela.",
      en: "The perfect pairing for renewed, smooth, glowing skin in a single visit. The deep cleanse prepares, the dermaplaning reveals.",
    },
    benefits: {
      pt: ["Dois protocolos, uma sessão", "Pele de veludo", "Melhor valor"],
      en: ["Two protocols, one session", "Velvet skin", "Best value"],
    },
  },
  {
    id: "drenagem-facial",
    bookrId: "24473749-2bda-4dba-bd46-2b5a2e983708",
    name: "Drenagem Facial",
    category: "facial",
    durationMin: 30,
    price: 30,
    source: "bookr",
    frame: 34,
    description: {
      pt: "Um protocolo completo que combina higienização e drenagem facial manual, estimulando a circulação e o sistema linfático. Reduz o inchaço e devolve definição ao rosto.",
      en: "A complete protocol combining cleansing with manual facial drainage to stimulate circulation and the lymphatic system. Reduces puffiness and brings definition back to the face.",
    },
    benefits: {
      pt: ["Desinchaço", "Contorno definido", "Efeito relaxante"],
      en: ["De-puffing", "Defined contour", "Deeply relaxing"],
    },
  },
  {
    id: "spa-facial",
    bookrId: "576be984-3eaa-4215-9634-7fabd09ae84b",
    name: "Spa Facial",
    category: "facial",
    durationMin: 60,
    price: 50,
    source: "draft",
    frame: 40,
    description: {
      pt: "Uma hora de pausa dedicada ao rosto. Limpeza suave, massagem, máscara e hidratação profunda, num ritual sensorial pensado para quem precisa de abrandar.",
      en: "An hour of pause devoted to the face. Gentle cleansing, massage, mask and deep hydration in a sensorial ritual for those who need to slow down.",
    },
    benefits: {
      pt: ["Hidratação profunda", "Relaxamento", "Pele descansada"],
      en: ["Deep hydration", "Relaxation", "Rested skin"],
    },
  },
  {
    id: "peeling-gluconolactona",
    bookrId: "ff44e670-0c4f-47b3-88d9-14f2cf6c4fbb",
    name: "Peeling Gluconolactona",
    category: "facial",
    durationMin: 45,
    price: 50,
    source: "draft",
    frame: 46,
    description: {
      pt: "Um peeling químico de nova geração, à base de polihidroxiácido, que renova sem agredir. Indicado para peles sensíveis, com rosácea ou que procuram luminosidade sem descamação.",
      en: "A new-generation chemical peel based on polyhydroxy acid that renews without aggression. Ideal for sensitive or rosacea-prone skin, or anyone after glow without peeling.",
    },
    benefits: {
      pt: ["Suave para peles sensíveis", "Antioxidante", "Uniformiza o tom"],
      en: ["Gentle on sensitive skin", "Antioxidant", "Evens the tone"],
    },
  },
  {
    id: "peeling-golden-c",
    bookrId: "a2261041-c259-40e1-b12c-22dd83793f4b",
    name: "Peeling Golden C",
    category: "facial",
    durationMin: 75,
    price: 75,
    source: "draft",
    frame: 52,
    description: {
      pt: "Protocolo de vitamina C de alta concentração para peles baças, com manchas ou sinais de fotoenvelhecimento. Ilumina, uniformiza e protege.",
      en: "A high-concentration vitamin C protocol for dull, pigmented or photo-aged skin. Brightens, evens and protects.",
    },
    benefits: {
      pt: ["Luminosidade intensa", "Reduz manchas", "Anti-idade"],
      en: ["Intense radiance", "Fades dark spots", "Anti-ageing"],
    },
  },
  {
    id: "radiofrequencia-face",
    bookrId: "68e10b66-7417-4c6b-ae1e-fc58f96c9be5",
    name: "Radiofrequência Face",
    category: "facial",
    durationMin: 60,
    price: 45,
    source: "draft",
    frame: 58,
    description: {
      pt: "Calor controlado nas camadas profundas da pele para estimular a produção de colagénio. Firmeza e efeito lifting progressivo, sem agulhas e sem recuperação.",
      en: "Controlled heat in the deeper layers of the skin to stimulate collagen production. Progressive firmness and lift, no needles, no downtime.",
    },
    benefits: {
      pt: ["Firmeza", "Efeito lifting", "Estímulo de colagénio"],
      en: ["Firmness", "Lifting effect", "Collagen boost"],
    },
  },
  {
    id: "microagulhamento",
    bookrId: "cd2297bc-cac5-434f-80ae-804c16c647d8",
    name: "Microagulhamento",
    category: "facial",
    durationMin: 60,
    price: 100,
    source: "draft",
    frame: 64,
    featured: true,
    description: {
      pt: "Microperfurações controladas que ativam a regeneração natural da pele e potenciam a absorção de ativos. O tratamento avançado de eleição para cicatrizes, poros, rugas finas e textura.",
      en: "Controlled micro-perforations that trigger the skin's natural regeneration and boost the absorption of actives. The advanced treatment of choice for scars, pores, fine lines and texture.",
    },
    benefits: {
      pt: ["Regeneração profunda", "Cicatrizes e poros", "Resultados duradouros"],
      en: ["Deep regeneration", "Scars and pores", "Lasting results"],
    },
  },
  {
    id: "protocolo-mc",
    bookrId: "76475100-231c-4ea5-b3eb-20666bdad4e8",
    name: "Protocolo MC",
    category: "facial",
    durationMin: 15,
    price: 75,
    source: "draft",
    frame: 68,
    description: {
      pt: "Protocolo exclusivo da clínica, realizado após avaliação. Fale connosco para saber se é indicado para si.",
      en: "An exclusive clinic protocol carried out after assessment. Talk to us to find out whether it is right for you.",
    },
    benefits: {
      pt: ["Exclusivo", "Sob avaliação"],
      en: ["Exclusive", "After assessment"],
    },
  },
  {
    id: "protocolo-cr",
    bookrId: "20fca657-5ca4-4065-ac3c-9bc258a970ad",
    name: "Protocolo CR",
    category: "facial",
    durationMin: 120,
    price: 75,
    source: "draft",
    frame: 72,
    description: {
      pt: "Protocolo intensivo de duas horas que combina várias técnicas num único plano de tratamento. Definido em consulta, de acordo com o objetivo da sua pele.",
      en: "An intensive two-hour protocol combining several techniques in a single treatment plan. Defined in consultation according to your skin goals.",
    },
    benefits: {
      pt: ["Personalizado", "Intensivo", "Multi-técnica"],
      en: ["Personalised", "Intensive", "Multi-technique"],
    },
  },

  // -------------------------------------------------------------- corporal
  {
    id: "drenagem-full-body",
    bookrId: "8e061303-e451-4daa-8642-e7ee05fbc7b8",
    name: "Drenagem Full Body",
    category: "corporal",
    durationMin: 60,
    price: 50,
    source: "bookr",
    frame: 8,
    featured: true,
    description: {
      pt: "Uma técnica autoral de drenagem corporal, realizada em todo o corpo, que descongestiona os tecidos, ativa a circulação e devolve leveza. A mais pedida da clínica.",
      en: "A signature full-body drainage technique that decongests tissue, activates circulation and restores lightness. The clinic's most requested treatment.",
    },
    benefits: {
      pt: ["Reduz retenção", "Leveza imediata", "Técnica autoral"],
      en: ["Reduces water retention", "Immediate lightness", "Signature technique"],
    },
  },
  {
    id: "drenagem-mami-care",
    bookrId: "9d7dfb1a-a0b4-4227-bb17-c7ded2a9f962",
    name: "Drenagem Mami Care",
    category: "corporal",
    durationMin: 60,
    price: 50,
    source: "bookr",
    frame: 16,
    description: {
      pt: "Uma drenagem corporal especialmente adaptada para a gestação, com técnicas suaves e personalizadas para cada fase. Conforto para as pernas, alívio para o corpo.",
      en: "Body drainage specially adapted for pregnancy, with gentle techniques personalised to each stage. Comfort for the legs, relief for the whole body.",
    },
    benefits: {
      pt: ["Seguro na gravidez", "Alívio de pernas pesadas", "Técnica suave"],
      en: ["Pregnancy-safe", "Relief for heavy legs", "Gentle technique"],
    },
  },
  {
    id: "detox-by-micaela",
    bookrId: "0c8b0e59-0c6b-4a5c-baef-af0c4f1ab03e",
    name: "Detox by Micaela Sampaio",
    category: "corporal",
    durationMin: 60,
    price: 60,
    source: "bookr",
    frame: 24,
    featured: true,
    description: {
      pt: "Um protocolo corporal exclusivo, inspirado nos minerais e benefícios do Mar Morto, que alia drenagem a ativos desintoxicantes. Corpo mais leve, pele mais firme.",
      en: "An exclusive body protocol inspired by the minerals and benefits of the Dead Sea, pairing drainage with detoxifying actives. A lighter body, firmer skin.",
    },
    benefits: {
      pt: ["Minerais do Mar Morto", "Desintoxicante", "Assinatura da clínica"],
      en: ["Dead Sea minerals", "Detoxifying", "House signature"],
    },
  },
  {
    id: "detox-ortomolecular",
    bookrId: "b2906771-045a-479d-9f68-ce41aef089e7",
    name: "Detox Ortomolecular Estético",
    category: "corporal",
    durationMin: 120,
    price: 90,
    source: "draft",
    frame: 30,
    description: {
      pt: "Duas horas de tratamento corporal completo que combina drenagem, esfoliação e envolvimento com ativos ortomoleculares. Pensado para quem quer resultados e um verdadeiro momento de pausa.",
      en: "Two hours of complete body treatment combining drainage, exfoliation and a wrap with orthomolecular actives. For those who want results and a true moment of pause.",
    },
    benefits: {
      pt: ["Corpo completo", "Envolvimento", "Duas horas de cuidado"],
      en: ["Full body", "Body wrap", "Two hours of care"],
    },
  },
  {
    id: "dreno-sculpt-detox",
    bookrId: "fbf26ceb-f7af-49c6-860c-5dfbd76b2604",
    name: "Dreno Sculpt Detox",
    category: "corporal",
    durationMin: 135,
    price: 120,
    source: "draft",
    frame: 38,
    featured: true,
    description: {
      pt: "O protocolo corporal mais completo da clínica: drenagem, modelagem manual e detox num único plano de mais de duas horas. Contorno, leveza e firmeza na mesma sessão.",
      en: "The clinic's most complete body protocol: drainage, manual sculpting and detox in a single plan of over two hours. Contour, lightness and firmness in one session.",
    },
    benefits: {
      pt: ["Modelagem", "Drenagem", "Detox"],
      en: ["Sculpting", "Drainage", "Detox"],
    },
  },
  {
    id: "fat-redux",
    bookrId: "0cdaf85c-845a-498a-9aa7-1a3ddf14a4f8",
    name: "Fat Redux",
    category: "corporal",
    durationMin: 60,
    price: 50,
    source: "draft",
    frame: 44,
    description: {
      pt: "Protocolo localizado para redução de gordura e celulite, combinando técnicas manuais e ativos lipolíticos. Indicado para zonas específicas como abdómen, flancos ou coxas.",
      en: "A targeted protocol for fat and cellulite reduction, combining manual techniques with lipolytic actives. Ideal for specific areas such as abdomen, flanks or thighs.",
    },
    benefits: {
      pt: ["Ação localizada", "Anticelulite", "Redução de medidas"],
      en: ["Targeted action", "Anti-cellulite", "Inch loss"],
    },
  },
  {
    id: "eletroestimulacao",
    bookrId: "d0ee6fd9-3ef2-4a7f-8d7a-a422e50e1829",
    name: "Eletroestimulação",
    category: "corporal",
    durationMin: 45,
    price: 30,
    source: "draft",
    frame: 50,
    description: {
      pt: "Estímulo elétrico controlado que provoca contrações musculares profundas. Tonifica, firma e complementa os protocolos de modelagem corporal.",
      en: "Controlled electrical stimulation that triggers deep muscle contractions. Tones, firms and complements body sculpting protocols.",
    },
    benefits: {
      pt: ["Tonificação", "Firmeza", "Complemento ideal"],
      en: ["Toning", "Firmness", "Ideal add-on"],
    },
  },
  {
    id: "doe",
    bookrId: "ad5322b4-b95a-43a9-bf78-119bb656051a",
    name: "D.O.E",
    category: "corporal",
    durationMin: 15,
    price: 90,
    source: "draft",
    frame: 56,
    description: {
      pt: "Protocolo exclusivo da clínica, realizado após avaliação. Fale connosco para saber se é indicado para si.",
      en: "An exclusive clinic protocol carried out after assessment. Talk to us to find out whether it is right for you.",
    },
    benefits: {
      pt: ["Exclusivo", "Sob avaliação"],
      en: ["Exclusive", "After assessment"],
    },
  },

  // ------------------------------------------------------------- signature
  {
    id: "define-day",
    bookrId: "a2339af1-bf5f-4a9b-9e2a-5851537527c9",
    name: "Define Day",
    category: "signature",
    durationMin: 180,
    price: 300,
    source: "draft",
    frame: 62,
    featured: true,
    description: {
      pt: "Três horas só para si. Um dia de transformação que reúne os protocolos faciais e corporais mais eficazes da clínica numa experiência contínua, desenhada à medida.",
      en: "Three hours just for you. A day of transformation bringing together the clinic's most effective face and body protocols in one continuous, tailor-made experience.",
    },
    benefits: {
      pt: ["Rosto e corpo", "3 horas", "Desenhado à medida"],
      en: ["Face and body", "3 hours", "Tailor-made"],
    },
  },
  {
    id: "define-day-360",
    bookrId: "5f3c4510-6469-47bc-aa03-221390a9bf45",
    name: "Define Day 360",
    category: "signature",
    durationMin: 180,
    price: 500,
    source: "draft",
    frame: 76,
    featured: true,
    description: {
      pt: "A experiência mais completa da Estética Micaela Sampaio. O Define Day elevado a 360 graus, com tecnologias avançadas, tratamento completo e acompanhamento exclusivo.",
      en: "The most complete experience at Estética Micaela Sampaio. Define Day taken to 360 degrees, with advanced technologies, full treatment and exclusive follow-up.",
    },
    benefits: {
      pt: ["Experiência absoluta", "Tecnologias avançadas", "Acompanhamento"],
      en: ["The absolute experience", "Advanced technologies", "Follow-up"],
    },
  },
];

export const featuredServices = services.filter((s) => s.featured);

export function formatDuration(min: number, locale: "pt" | "en") {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return locale === "pt" ? `${h}h` : `${h} h`;
  return `${h}h${String(m).padStart(2, "0")}`;
}

export function formatPrice(price: number) {
  return `${price}€`;
}
