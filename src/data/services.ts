export interface Service {
    id: string;
    name: string;
    category: "Facial" | "Corporal";
    description: string;
    duration: string; // e.g., "60 min"
    price: number;
}

export const services: Service[] = [
    // Facial
    {
        id: "f1",
        name: "Limpeza de Pele Profunda",
        category: "Facial",
        description: "Remoção de impurezas e células mortas, promovendo renovação celular e luminosidade.",
        duration: "90 min",
        price: 60
    },
    {
        id: "f2",
        name: "Microagulhamento",
        category: "Facial",
        description: "Estimulação de colágeno para tratamento de cicatrizes, manchas e rejuvenescimento.",
        duration: "60 min",
        price: 85
    },
    {
        id: "f3",
        name: "Hidratação Profunda",
        category: "Facial",
        description: "Reposição de água e nutrientes essenciais para uma pele viçosa e saudável.",
        duration: "60 min",
        price: 50
    },
    {
        id: "f4",
        name: "Rejuvenescimento High-Tech",
        category: "Facial",
        description: "Tecnologia avançada para lifting não cirúrgico e melhora da firmeza da pele.",
        duration: "75 min",
        price: 120
    },
    // Corporal
    {
        id: "c1",
        name: "Drenagem Linfática - Método Exclusivo",
        category: "Corporal",
        description: "Técnica manual suave para redução de edema e eliminação de toxinas do organismo.",
        duration: "60 min",
        price: 55
    },
    {
        id: "c2",
        name: "Massagem Modeladora",
        category: "Corporal",
        description: "Movimentos vigorosos para remodelar o contorno corporal e ativar a circulação.",
        duration: "50 min",
        price: 60
    },
    {
        id: "c3",
        name: "Massagem Relaxante",
        category: "Corporal",
        description: "Toques profundos e rítmicos para alívio de tensão muscular e relaxamento mental.",
        duration: "60 min",
        price: 50
    }
];
