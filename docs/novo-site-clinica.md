# **Product Requirements Document (PRD)**

**Projeto:** Site Institucional One-Page \- Estética Micaela Sampaio

## **1\. Visão Geral do Projeto**

* **Objetivo:** Desenvolver o site principal da clínica num formato **One-Page dinâmico, completo e altamente comercial**. A página funcionará como uma "passadeira vermelha" digital, conduzindo a cliente desde o primeiro impacto visual até ao agendamento no WhatsApp, sem interrupções.  
* **Público-Alvo:** Mulheres (30 a 55+ anos) que procuram tratamentos premium, resultados reais e uma experiência de luxo (*smart aging*).  
* **Proposta de Valor:** Apresentar a clínica como uma grife de estética avançada. A navegação fluida em página única deve refletir a facilidade e o conforto que a cliente encontrará no espaço físico.

## **2\. Diretrizes de Design e UX (Foco One-Page e Sofisticação)**

* **Jornada de Rolagem (Scroll Storytelling):** A página deve contar uma história lógica. Quem somos \-\> O que fazemos \-\> Prova de que funciona \-\> Como agendar.  
* **Navegação Fixa (Sticky Header):** Um menu superior elegante e fixo. Ao clicar num item (ex: "Tratamentos"), a página desliza suavemente (Smooth Scroll) até à secção correspondente.  
* **Microinterações:** Uso intensivo (mas elegante) de animações atreladas ao scroll. Os elementos devem surgir com efeitos de *fade-up* e imagens com *parallax* subtil à medida que a cliente desce a página.  
* **Paleta e Tipografia:** Fundo Off-white/Bege suave, textos em Cinza Chumbo/Preto Acetinado, e a cor Cobre/Rosé Gold nos botões de conversão. Tipografia mista (Serifada para elegância, Sans-serif para legibilidade comercial).

## **3\. Estrutura One-Page (Sitemap de Rolagem Contínua)**

A página será dividida nas seguintes secções (âncoras), organizadas de forma estratégica:

### **📍 Secção 1: Área Hero (A Vitrine de Alto Impacto)**

* **Visual:** Vídeo de fundo em *slow-motion* de alta qualidade (ambiente da clínica ou atendimento) com uma sobreposição escura subtil para leitura.  
* **Copy:** *"A sua beleza tratada com a exclusividade e a ciência que você merece."*  
* **Call to Action (CTA):** Botão principal pulsante: **"Agendar a minha Avaliação"** (direciona para o WhatsApp).

### **📍 Secção 2: A Clínica e a Especialista (Construção de Autoridade)**

* **Layout:** Imagem da Micaela Sampaio ao lado de um texto forte sobre a sua filosofia de atendimento, certificações e foco na personalização dos protocolos.  
* **O Espaço:** Um carrossel interativo e luxuoso com 3 a 4 fotos do ambiente da clínica, destacando o conforto, a tecnologia e o requinte.

### **📍 Secção 3: O Nosso Menu de Tratamentos (O Catálogo Interativo)**

Como é uma One-Page, não podemos ter uma lista interminável de texto.

* **Sistema de Abas (Tabs):** O utilizador clica em "Faciais" ou "Corporais" e o conteúdo altera-se sem sair do lugar.  
* **Cards Dinâmicos:** Os tratamentos aparecem em cards visuais. Ao passar o rato (hover) ou tocar no telemóvel, o card vira ou expande levemente, revelando os benefícios e o botão "Quero este tratamento".

### **📍 Secção 4: Banner Destaque \- Club \+Estética**

* Uma quebra visual impactante. Fundo em tom escuro (Cinza Chumbo/Preto) com detalhes em Cobre para chamar a atenção.  
* **Copy:** *"Descubra o cuidado contínuo. Conheça o Club \+Estética."*  
* **Ação:** Um botão que leva a utilizadora **para fora da One-Page**, aterrando na Landing Page do Clube que planeámos anteriormente.

### **📍 Secção 5: Prova Social Irrefutável (Resultados e Depoimentos)**

* **Antes e Depois Elegante:** Um *slider* interativo de comparação de imagens (arrastar para a esquerda/direita) de peles tratadas ou resultados corporais. Iluminação perfeita, sem aspeto clínico amador.  
* **Depoimentos:** Frases curtas de clientes reais focadas na experiência VIP da clínica.

### **📍 Secção 6: Localização e Contacto (Fecho)**

* Bloco limpo com o endereço completo, horários de funcionamento e mapa do Google integrado com um design minimalista (tons de cinza/bege).  
* **CTA Final:** Último convite para o agendamento via WhatsApp.

## **4\. Requisitos Técnicos e Arquitetura (Sem CMS, VPS)**

### **4.1. Frontend Dinâmico e Leve**

* **Framework:** **Next.js** (App Router) com **TypeScript**. A exportação pode ser configurada como estática (SSG) para a página carregar instantaneamente.  
* **Estilização e Animações:** **Tailwind CSS** para estruturar. O **Framer Motion** será vital aqui para gerir as animações de *Smooth Scroll* e fazer os elementos aparecerem com elegância apenas quando entrarem na área visível da tela (*Intersection Observer*).

### **4.2. Gestão de Conteúdo (Code-Driven)**

* **Sem CMS:** Todo o conteúdo (textos, tratamentos, links) será codificado de forma limpa usando ficheiros de configuração (ex: um `data.ts`). Isto torna a página "inquebrável" e imune a falhas de bases de dados externas, além de ser extremamente veloz.

### **4.3. Infraestrutura (VPS Hostinger \+ Dokploy)**

* **Alojamento:** Servidor **VPS na Hostinger**.  
* **Gestão e Deploy:** Utilização do **Dokploy** via Docker para gerir a aplicação. Esta infraestrutura garante alta disponibilidade, controlo absoluto dos recursos e geração automática de certificados SSL.

### **4.4. Integrações Comerciais**

* Instalação direta do **Pixel da Meta** e **Google Analytics 4**.  
* Widget de **WhatsApp Flutuante**, presente no canto inferior do ecrã durante toda a rolagem da utilizadora.

