/**
 * Club +Estética — content mirrors what is publicly visible on
 * club.esteticamicaelasampaio.com. Plan prices are not published there,
 * so plans are presented "on request" until the clinic provides them.
 */
export interface ClubPlan {
  id: "essencial" | "premium" | "vip";
  name: string;
  highlight?: boolean;
  sessionsPerMonth: number;
  reschedules: { pt: string; en: string };
  extrasDiscount: number;
  giftVouchers: { pt: string; en: string };
  giftCardDiscount: number;
  perks: { pt: string[]; en: string[] };
}

export const clubPlans: ClubPlan[] = [
  {
    id: "essencial",
    name: "Essencial",
    sessionsPerMonth: 2,
    reschedules: { pt: "1 reagendamento", en: "1 reschedule" },
    extrasDiscount: 30,
    giftVouchers: { pt: "1 voucher mensal", en: "1 monthly voucher" },
    giftCardDiscount: 10,
    perks: {
      pt: ["Prioridade no agendamento", "Consultoria de home care"],
      en: ["Booking priority", "Home care consultation"],
    },
  },
  {
    id: "premium",
    name: "Premium",
    highlight: true,
    sessionsPerMonth: 4,
    reschedules: { pt: "2 reagendamentos", en: "2 reschedules" },
    extrasDiscount: 50,
    giftVouchers: { pt: "2 vouchers mensais", en: "2 monthly vouchers" },
    giftCardDiscount: 20,
    perks: {
      pt: ["Prioridade no agendamento", "Acesso antecipado a novidades", "Consultoria de home care"],
      en: ["Booking priority", "Early access to new treatments", "Home care consultation"],
    },
  },
  {
    id: "vip",
    name: "VIP Absolute",
    sessionsPerMonth: 4,
    reschedules: { pt: "Reagendamentos ilimitados*", en: "Unlimited reschedules*" },
    extrasDiscount: 75,
    giftVouchers: { pt: "Vouchers ilimitados", en: "Unlimited vouchers" },
    giftCardDiscount: 30,
    perks: {
      pt: ["Prioridade absoluta no agendamento", "Kit de boas-vindas premium", "Acesso antecipado a novidades", "Consultoria e kits de home care"],
      en: ["Absolute booking priority", "Premium welcome kit", "Early access to new treatments", "Home care consultation and kits"],
    },
  },
];

export const clubTreatments = {
  facial: [
    "Dermaplaning",
    "Peeling de Vitamina C",
    "Revitalização facial, pescoço e colo",
    "Tratamento antiacne",
    "Spa dos lábios",
    "HidraGloss",
    "Radiofrequência",
    "Lipo LED face",
    "Fios de seda",
    "Limpeza de Pele Pro",
  ],
  advanced: ["Microagulhamento", "Bioestimulador"],
};

export const clubFaq: { q: { pt: string; en: string }; a: { pt: string; en: string } }[] = [
  {
    q: { pt: "O que é o Club +Estética?", en: "What is Club +Estética?" },
    a: {
      pt: "Um programa de assinatura exclusivo, desenhado para mulheres que não abrem mão da excelência em smart aging. Em vez de tratamentos avulsos, tem um plano contínuo com sessões mensais, prioridade na agenda e vantagens em tudo o resto.",
      en: "An exclusive membership programme designed for women who won't compromise on excellence in smart aging. Instead of one-off treatments you have a continuous plan with monthly sessions, booking priority and perks on everything else.",
    },
  },
  {
    q: { pt: "Club +Estética ou pack de tratamento avulso: qual a diferença?", en: "Club +Estética or a one-off treatment pack: what's the difference?" },
    a: {
      pt: "Um pack termina. O Club acompanha-a mês após mês, com protocolos que evoluem com a sua pele, descontos de 30% a 75% em extras e vouchers para oferecer a quem gosta.",
      en: "A pack ends. The Club stays with you month after month, with protocols that evolve with your skin, 30% to 75% off extras and vouchers to gift to the people you love.",
    },
  },
  {
    q: { pt: "Para quem é o Clube?", en: "Who is the Club for?" },
    a: {
      pt: "Para quem entende que a pele se cuida com constância. Se procura resultados reais e uma experiência de cuidado contínuo, e não apenas uma sessão pontual, o Club foi desenhado para si.",
      en: "For those who understand that skin is cared for with consistency. If you're after real results and an ongoing experience of care rather than the occasional session, the Club was designed for you.",
    },
  },
  {
    q: { pt: "Como funcionam os atendimentos?", en: "How do appointments work?" },
    a: {
      pt: "Escolhe o seu plano, agenda os tratamentos do mês com prioridade na agenda e sente-se incrível. Os reagendamentos incluídos dependem do plano e estão sujeitos a disponibilidade e à política de cancelamento.",
      en: "Choose your plan, book the month's treatments with booking priority and feel incredible. Included reschedules depend on your plan and are subject to availability and the cancellation policy.",
    },
  },
  {
    q: { pt: "Sou eu quem escolho os tratamentos de cada mês?", en: "Do I choose the treatments each month?" },
    a: {
      pt: "Sim, dentro do menu do Club: dermaplaning, peeling de vitamina C, revitalização, HidraGloss, radiofrequência, Lipo LED, fios de seda, limpeza de pele Pro e, nos protocolos avançados, microagulhamento e bioestimulador. A Micaela ajuda a orientar a escolha.",
      en: "Yes, from the Club menu: dermaplaning, vitamin C peel, revitalisation, HidraGloss, radiofrequency, Lipo LED, silk threads, Pro deep cleanse and, among the advanced protocols, microneedling and biostimulator. Micaela helps guide the choice.",
    },
  },
  {
    q: { pt: "Em quanto tempo começo a ver resultados?", en: "How soon will I see results?" },
    a: {
      pt: "Cada pele tem o seu ritmo. Alguns protocolos mostram resultado logo na primeira sessão; os de regeneração profunda revelam-se ao longo das semanas. Na consulta inicial definimos expectativas reais para o seu caso.",
      en: "Every skin has its own pace. Some protocols show results from the very first session; deep-regeneration ones reveal themselves over the weeks. We set realistic expectations for your case at the initial consultation.",
    },
  },
  {
    q: { pt: "Quanto tempo dura o programa?", en: "How long does the programme last?" },
    a: {
      pt: "O Club é pensado como cuidado contínuo, com adesão mensal. Fale connosco para conhecer as modalidades disponíveis.",
      en: "The Club is designed as continuous care with a monthly membership. Talk to us to learn about the available options.",
    },
  },
  {
    q: { pt: "Como funciona o pagamento?", en: "How does payment work?" },
    a: {
      pt: "Por assinatura, com o valor de cada plano comunicado na adesão. Entre em contacto pelo WhatsApp e explicamos tudo sem compromisso.",
      en: "By subscription, with each plan's price shared when you join. Get in touch on WhatsApp and we'll explain everything with no obligation.",
    },
  },
  {
    q: { pt: "Existe alguma contraindicação?", en: "Are there any contraindications?" },
    a: {
      pt: "Como em qualquer tratamento estético, sim. Por isso a adesão começa sempre com uma avaliação da sua pele e do seu historial, para escolher apenas os protocolos indicados para si.",
      en: "As with any aesthetic treatment, yes. That's why membership always starts with an assessment of your skin and history, so only the right protocols are chosen for you.",
    },
  },
  {
    q: { pt: "Por que as vagas são tão limitadas?", en: "Why are places so limited?" },
    a: {
      pt: "Porque cada membro tem prioridade na agenda e acompanhamento próximo da Micaela. Para manter esse nível de atenção, o número de vagas é reduzido.",
      en: "Because every member gets booking priority and close follow-up from Micaela. To keep that level of attention, the number of places is kept small.",
    },
  },
  {
    q: { pt: "Como faço para entrar?", en: "How do I join?" },
    a: {
      pt: "Entre no grupo VIP do WhatsApp ou fale diretamente connosco. Confirmamos a disponibilidade de vagas e ajudamos a escolher o plano certo.",
      en: "Join the VIP WhatsApp group or talk to us directly. We confirm availability and help you choose the right plan.",
    },
  },
];
