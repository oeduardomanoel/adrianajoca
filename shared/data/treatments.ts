export interface Treatment {
  slug: string
  name: string
  category: 'Facial' | 'Corporal'
  /** Frase curta usada na lista da home */
  line: string
  image: string
  imageAlt: string
  seoTitle: string
  seoDescription: string
  /** Parágrafos de abertura da página */
  intro: string[]
  forWho: string[]
  session: { title: string; text: string }[]
  after: string[]
  faq: { q: string; a: string }[]
  /** Mensagem pronta para o WhatsApp */
  message: string
}

export const treatments: Treatment[] = [
  {
    slug: 'limpeza-de-pele',
    name: 'Limpeza de pele',
    category: 'Facial',
    line: 'Cravos fora, poros respirando e a pele com aquele aspecto de descansada.',
    image: '/img/limpeza-de-pele.webp',
    imageAlt: 'Paciente deitada recebendo limpeza de pele com algodão no nariz',
    seoTitle: 'Limpeza de pele profunda em Joinville',
    seoDescription: 'Limpeza de pele com biomédica esteta no Glória, em Joinville. Extração cuidadosa de cravos, controle de oleosidade e pele com mais viço. Agende sua avaliação.',
    intro: [
      'É o tratamento que quase todo mundo já fez, e justamente por isso vale a pena fazer bem feito. Uma limpeza mal conduzida deixa marca, irrita e faz a pele produzir mais óleo do que antes.',
      'Aqui a extração é feita com calma, poro por poro, depois de preparar a pele para que os cravos saiam sem agredir. No final entra uma etapa calmante escolhida para o seu tipo de pele.',
    ],
    forWho: [
      'Cravos no nariz, no queixo ou na testa que voltam sempre',
      'Pele oleosa ou mista que fica brilhando no meio da tarde',
      'Poros que parecem maiores do que são por estarem obstruídos',
      'Quem sente a pele opaca, sem vida, mesmo com skincare em dia',
      'Preparo da pele antes de outros tratamentos, como o microagulhamento',
    ],
    session: [
      { title: 'Higienização e leitura da pele', text: 'Primeiro a pele é limpa e avaliada de perto, com lupa. É aí que se decide o que vai ser usado em cada etapa.' },
      { title: 'Esfoliação e emoliência', text: 'Uma esfoliação leve tira as células mortas e um produto emoliente amolece o conteúdo dos poros para a extração ficar mais tranquila.' },
      { title: 'Extração', text: 'Feita manualmente, com técnica e material descartável. É a parte mais demorada, e não tem pressa.' },
      { title: 'Calmante e proteção', text: 'Máscara ou ativo calmante para desinchar e acalmar, e protetor solar antes de você ir embora.' },
    ],
    after: [
      'Uma vermelhidão leve é normal e costuma passar em algumas horas.',
      'O ideal é evitar maquiagem e academia no mesmo dia.',
      'Protetor solar todos os dias, mesmo em dia nublado.',
      'Não espremer nada em casa nos dias seguintes. Se surgir alguma espinha, fale com a Adriana.',
    ],
    faq: [
      { q: 'De quanto em quanto tempo devo fazer limpeza de pele?', a: 'Em geral fica entre 30 e 60 dias, mas depende muito da sua oleosidade e da rotina de cuidados em casa. Na avaliação a Adriana indica o intervalo para o seu caso.' },
      { q: 'Limpeza de pele dói?', a: 'A extração incomoda um pouco em algumas áreas, como nariz e queixo. A preparação da pele antes ajuda bastante, e você pode pedir pausa quando quiser.' },
      { q: 'Quem tem acne pode fazer?', a: 'Pode, desde que a pele não esteja muito inflamada. Em acne ativa forte, às vezes o melhor é começar por outro protocolo. Isso é avaliado antes.' },
    ],
    message: 'Oi, Adriana! Vim pelo site e queria agendar uma limpeza de pele.',
  },
  {
    slug: 'microagulhamento',
    name: 'Microagulhamento',
    category: 'Facial',
    line: 'Para marcas de acne, textura irregular e poros que incomodam.',
    image: '/img/microagulhamento.webp',
    imageAlt: 'Adriana Joca realizando microagulhamento facial com caneta dermapen',
    seoTitle: 'Microagulhamento em Joinville para cicatriz de acne e textura',
    seoDescription: 'Microagulhamento com biomédica esteta em Joinville. Indicado para cicatrizes de acne, poros dilatados, linhas finas e textura irregular. Protocolo definido após avaliação.',
    intro: [
      'O microagulhamento cria microlesões controladas na pele com uma caneta de agulhas finíssimas. A pele entende aquilo como um sinal para se reparar e produz colágeno novo no processo.',
      'É um dos tratamentos com melhor resposta para cicatriz de acne e textura irregular. O resultado não aparece no dia seguinte: ele vem com as semanas e com as sessões, e é por isso que o protocolo é montado sob medida.',
    ],
    forWho: [
      'Cicatrizes e marquinhas que a acne deixou',
      'Poros dilatados e pele com aspecto de casca de laranja',
      'Linhas finas e perda de firmeza no início',
      'Manchas, quando associado aos ativos certos',
      'Quem quer melhorar a qualidade da pele como um todo',
    ],
    session: [
      { title: 'Avaliação e fotos', text: 'Antes da primeira sessão a pele é avaliada e fotografada para acompanhar a evolução com critério, e não só no olho.' },
      { title: 'Anestésico tópico', text: 'Um creme anestésico é aplicado e fica agindo por alguns minutos. Isso deixa o procedimento bem mais confortável.' },
      { title: 'Aplicação com a caneta', text: 'A profundidade das agulhas muda conforme a região do rosto e o objetivo. Os ativos escolhidos entram junto, aproveitando os microcanais abertos.' },
      { title: 'Finalização', text: 'Produtos calmantes e regeneradores, e orientações por escrito para os próximos dias.' },
    ],
    after: [
      'A pele fica vermelha, parecida com uma queimadura de sol leve, por um a três dias.',
      'Nada de maquiagem nas primeiras 24 horas.',
      'Sol, piscina, sauna e ácidos ficam de fora por alguns dias. A Adriana passa o tempo exato.',
      'Hidratação e protetor solar são parte do tratamento, não opcionais.',
    ],
    faq: [
      { q: 'Quantas sessões de microagulhamento são necessárias?', a: 'Depende do que se quer tratar. Cicatriz de acne costuma pedir mais sessões do que melhora de viço. O número é definido na avaliação, e as sessões normalmente ficam espaçadas em cerca de um mês.' },
      { q: 'Microagulhamento dói?', a: 'Com o anestésico tópico a maioria das pessoas sente apenas um incômodo, mais forte em regiões com osso perto, como testa e maçã do rosto.' },
      { q: 'Posso fazer microagulhamento no verão?', a: 'Pode, com cuidado redobrado com o sol nos dias seguintes. Se você tem viagem de praia marcada, vale combinar a data da sessão antes.' },
    ],
    message: 'Oi, Adriana! Vim pelo site e queria saber mais sobre o microagulhamento.',
  },
  {
    slug: 'jato-de-plasma',
    name: 'Jato de plasma',
    category: 'Facial',
    line: 'Pálpebra caída e ruguinhas finas tratadas sem bisturi.',
    image: '/img/procedimento-facial.webp',
    imageAlt: 'Procedimento facial sendo realizado com a paciente deitada e touca descartável',
    seoTitle: 'Jato de plasma em Joinville para pálpebras e rugas finas',
    seoDescription: 'Jato de plasma com biomédica esteta em Joinville. Tratamento sem cortes para excesso de pele nas pálpebras, rugas finas e linhas ao redor da boca e dos olhos.',
    intro: [
      'O jato de plasma é um aparelho que gera um pequeno arco elétrico, sem encostar na pele. Esse arco faz pontos de microssublimação que contraem o tecido e estimulam a renovação ali.',
      'Ele ficou conhecido como alternativa sem cortes para o excesso de pele na pálpebra, mas também funciona bem em rugas finas ao redor dos olhos e da boca. Nem toda pálpebra é caso de jato de plasma, e isso a avaliação deixa claro logo de cara.',
    ],
    forWho: [
      'Excesso leve a moderado de pele nas pálpebras',
      'Rugas finas ao redor dos olhos, os famosos pés de galinha',
      'Linhas acima do lábio superior, o código de barras',
      'Algumas cicatrizes e irregularidades pontuais da pele',
    ],
    session: [
      { title: 'Avaliação da área', text: 'Nem toda flacidez responde bem ao plasma. Aqui se confere se o seu caso é indicado e qual resultado é realista.' },
      { title: 'Anestesia tópica', text: 'A região recebe anestésico e espera o tempo certo para agir.' },
      { title: 'Aplicação', text: 'Os pontos são feitos um a um, com distância calculada entre eles. A sessão é rápida.' },
      { title: 'Cuidados imediatos', text: 'Você sai com as orientações de higiene e proteção dos pontinhos para os próximos dias.' },
    ],
    after: [
      'Formam-se crostinhas pequenas, que caem sozinhas em cerca de uma semana.',
      'Não arrancar as crostas de jeito nenhum, mesmo coçando.',
      'Inchaço é comum nos primeiros dias, principalmente nas pálpebras.',
      'Proteção solar rigorosa na área tratada.',
    ],
    faq: [
      { q: 'Jato de plasma substitui a cirurgia de pálpebra?', a: 'Em excesso de pele leve a moderado ele pode ser uma alternativa. Em casos mais acentuados a cirurgia segue sendo o caminho, e a Adriana vai te dizer isso com sinceridade.' },
      { q: 'Quanto tempo leva a recuperação?', a: 'As crostinhas costumam cair em torno de uma semana. Nesse período a área fica visível, então vale planejar a sessão longe de eventos importantes.' },
    ],
    message: 'Oi, Adriana! Vim pelo site e queria saber se o jato de plasma é indicado para mim.',
  },
  {
    slug: 'labios',
    name: 'Lábios',
    category: 'Facial',
    line: 'Hidratação e viço para lábios ressecados ou sem cor.',
    image: '/img/dermapen.webp',
    imageAlt: 'Mãos com luvas segurando caneta de microagulhamento rosé',
    seoTitle: 'Tratamento para lábios em Joinville: hidratação e revitalização',
    seoDescription: 'Cuidado para lábios ressecados, sem viço ou com contorno apagado, com biomédica esteta em Joinville. Protocolo indicado após avaliação.',
    intro: [
      'Lábio ressecado, que descasca, perdeu cor ou ficou com o contorno apagado com o tempo, pede mais do que um hidratante de bolsa.',
      'Os protocolos para lábios trabalham hidratação profunda e revitalização da pele dessa região, que é muito mais fina que o resto do rosto. Se o seu objetivo for volume ou mudança de formato, isso é conversado na avaliação, com calma e com o seu rosto como referência.',
    ],
    forWho: [
      'Lábios que vivem ressecados e descascando',
      'Perda de cor e de viço com o passar dos anos',
      'Linhas verticais finas na boca',
      'Quem quer um resultado natural, sem cara de procedimento',
    ],
    session: [
      { title: 'Conversa e avaliação', text: 'O que te incomoda, o que você espera e o que faz sentido para o seu rosto.' },
      { title: 'Preparo', text: 'Higienização da região e anestésico tópico quando o protocolo pede.' },
      { title: 'Aplicação do protocolo', text: 'Ativos hidratantes e revitalizantes conduzidos de acordo com o objetivo combinado.' },
      { title: 'Orientações', text: 'Você sai sabendo exatamente como cuidar dos lábios nos dias seguintes.' },
    ],
    after: [
      'Um leve inchaço pode aparecer e some em pouco tempo.',
      'Manter os lábios hidratados é parte do resultado.',
      'Evitar alimentos muito quentes ou ácidos logo após a sessão.',
    ],
    faq: [
      { q: 'O resultado fica artificial?', a: 'O objetivo é o contrário: lábio com cara de bem cuidado, não de procedimento. Tudo é combinado antes, olhando para o seu rosto.' },
      { q: 'Quantas sessões preciso?', a: 'Depende do estado dos lábios e do protocolo escolhido. A indicação sai da avaliação.' },
    ],
    message: 'Oi, Adriana! Vim pelo site e queria saber sobre os tratamentos para lábios.',
  },
  {
    slug: 'drenagem-linfatica',
    name: 'Drenagem linfática',
    category: 'Corporal',
    line: 'Menos inchaço, menos peso nas pernas e uma hora só sua.',
    image: '/img/adriana-acenando.webp',
    imageAlt: 'Adriana Joca em sala de atendimento com luz natural',
    seoTitle: 'Drenagem linfática em Joinville',
    seoDescription: 'Drenagem linfática manual com biomédica esteta no Glória, em Joinville. Ajuda a reduzir inchaço e retenção de líquido, com sensação de leveza. Agende.',
    intro: [
      'A drenagem linfática é uma massagem com movimentos lentos, leves e ritmados que acompanham o caminho do sistema linfático. Ela ajuda o corpo a eliminar o líquido que fica parado e causa aquele inchaço do fim do dia.',
      'Não é massagem forte e não precisa doer para funcionar. A pressão certa é suave, e a sensação de leveza costuma aparecer já na primeira sessão.',
    ],
    forWho: [
      'Inchaço nas pernas e nos pés, principalmente no fim do dia',
      'Retenção de líquido na TPM',
      'Quem passa muitas horas sentada ou em pé',
      'Complemento de tratamentos corporais',
    ],
    session: [
      { title: 'Conversa rápida', text: 'Como você está se sentindo, onde incha mais e se há alguma condição de saúde que mude a conduta.' },
      { title: 'Massagem', text: 'Movimentos manuais suaves, na direção certa e no ritmo certo, por todo o corpo ou nas áreas combinadas.' },
      { title: 'Fechamento', text: 'Orientações simples para manter o efeito: água, movimento e pausas para as pernas.' },
    ],
    after: [
      'É normal sentir vontade de ir ao banheiro logo depois.',
      'Beber bastante água ajuda a manter o efeito.',
      'Uma caminhada leve no mesmo dia é bem-vinda.',
    ],
    faq: [
      { q: 'Drenagem linfática emagrece?', a: 'Não. Ela reduz o líquido retido, o que diminui medidas e inchaço, mas não elimina gordura. Para gordura localizada existem outros protocolos.' },
      { q: 'Com que frequência posso fazer?', a: 'Pode ser semanal ou até mais frequente em períodos específicos. A frequência é combinada conforme o seu objetivo.' },
    ],
    message: 'Oi, Adriana! Vim pelo site e queria agendar uma drenagem linfática.',
  },
  {
    slug: 'ventosaterapia',
    name: 'Ventosaterapia',
    category: 'Corporal',
    line: 'Circulação ativada e apoio no tratamento de celulite e gordura localizada.',
    image: '/img/ventosas.webp',
    imageAlt: 'Copos de ventosaterapia organizados sobre a maca',
    seoTitle: 'Ventosaterapia estética em Joinville',
    seoDescription: 'Ventosaterapia estética com biomédica esteta em Joinville. Estimula a circulação e auxilia no tratamento de celulite e gordura localizada. Agende sua avaliação.',
    intro: [
      'A ventosaterapia usa copos que criam uma sucção sobre a pele. Essa pressão negativa puxa o tecido, ativa a circulação da região e ajuda a soltar áreas mais endurecidas.',
      'Na estética corporal ela entra como aliada no tratamento de celulite e gordura localizada, quase sempre combinada com outras técnicas dentro de um protocolo.',
    ],
    forWho: [
      'Celulite em coxas, glúteos e quadril',
      'Gordura localizada, como parte de um protocolo',
      'Sensação de corpo pesado e circulação lenta',
    ],
    session: [
      { title: 'Avaliação corporal', text: 'Definição das áreas e do objetivo, e checagem de qualquer contraindicação.' },
      { title: 'Aplicação das ventosas', text: 'Os copos são posicionados e movimentados com a intensidade adequada para cada região.' },
      { title: 'Finalização', text: 'Orientações de cuidados e de como combinar com as próximas sessões.' },
    ],
    after: [
      'Marcas arroxeadas podem aparecer e somem sozinhas em alguns dias.',
      'Hidratar bem a pele e beber água.',
      'Evitar sol direto nas áreas marcadas.',
    ],
    faq: [
      { q: 'As marcas da ventosa sempre aparecem?', a: 'Nem sempre. Dependem da intensidade e da pele de cada pessoa. Quando aparecem, são temporárias.' },
      { q: 'Ventosaterapia sozinha resolve a celulite?', a: 'Ela ajuda, mas celulite responde melhor a um protocolo combinado e a hábitos em casa. A Adriana monta esse plano com você.' },
    ],
    message: 'Oi, Adriana! Vim pelo site e queria saber mais sobre a ventosaterapia.',
  },
]

export function getTreatment(slug: string) {
  return treatments.find(t => t.slug === slug)
}
