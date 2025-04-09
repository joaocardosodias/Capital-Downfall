<img src="../assets/logointeli.png">

# GDD - Game Design Document - Módulo 1 - Inteli

## Nome do Grupo: Level Zero

#### Nomes dos integrantes do grupo

Ana Cristina Alves Jardim <br>  
Henrique de Lima da Rós <br>
Lucas Garcia Rodrigues Lopes <br>
Lucas Michel Pereira <br>
Nicole Zanin Silva <br>
João Cardoso Dias <br>
Teodoro Borges de Carvalho Neira <br>

## Sumário

[1. Introdução](#c1)

[2. Visão Geral do Jogo](#c2)

[3. Game Design](#c3)

[4. Desenvolvimento do jogo](#c4)

[5. Casos de Teste](#c5)

[6. Conclusões e trabalhos futuros](#c6)

[7. Referências](#c7)

[Anexos](#c8)

<br>

# <a name="c1"></a>1. Introdução (sprints 1 a 4)

## 1.1. Plano Estratégico do Projeto

### 1.1.1. Contexto da indústria (sprint 2)

Os fundos de investimento tiveram aportes líquidos de R$ 40,1 bilhões em abril de 2024, de acordo com a ANBIMA (Associação Brasileira das Entidades dos Mercados Financeiro e de Capitais). O valor representa a segunda maior captação líquida do ano, atrás apenas de janeiro, que fechou com R$ 52,1 bilhões. O acumulado de 2024 é positivo em R$ 150,8 bilhões. O BTG Pactual é um banco de investimentos que fornece uma grande gama de serviços, como mercado de capitais, prestação de serviço de consultoria financeira para empresas e etc. Fornecem serviços de corretagem, compensação e custódia de vários produtos no mercado latino-americano para uma base de clientes diversificada (ANBIMA, 2024).

#### 1.1.1.1. Modelo de 5 Forças de Porter (sprint 2)

O BTG Pactual é considerado um dos líderes no cenário dos investimentos, operando em um mercado caracterizado por uma concorrência acirrada. Logo, para uma análise aprofundada do contexto desse setor, é preciso recorrer a uma ferramenta de análise estratégica reconhecida, como o modelo das 5 Forças de Porter. Conforme apresentado por Magretta (2019), para que uma empresa/organização avalie ou formule uma estratégia de mercado é preciso utilizar a estrutura das cinco forças, essa estrutura foi formulada por Michael Porter e fornece parâmetros para medir o desempenho superior e foca na competição a ser enfrentada. Além disso, essa ferramenta busca entender o que acontece em determinado setor, fornecendo uma visão clara e direta que está relacionada com a lucratividade do mercado. Para obter uma análise completa, as cinco forças de Porter se dividem em ameaça de entrada de novos concorrentes, ameaça de produtos substitutos, poder de negociação dos clientes, poder de negociação dos fornecedores e rivalidade entre os concorrentes (PORTER, 1980). Elas são:

**Ameaça de entrada de novos concorrentes:** consiste nas métricas de entrada no setor. Quanto mais difícil for a entrada, menor é a concorrência e maior a probabilidade de lucros a longo prazo. Segundo Porter (1980), as barreiras que dificultam a entrada de novos concorrentes são: economias de escala, diferenciação de produto, exigências de capital, custo de troca, acesso aos canais de distribuição, desvantagem de custos e políticas governamentais.

**Ameaça de Produtos Substitutos:** refere-se à facilidade com que o comprador pode substituir um tipo de produto ou serviço por outro (PORTER, 1980).

**Poder de Barganha dos Compradores:** refere-se à influência dos clientes em relação ao preço de aquisição do produto. É considerado alto quando os clientes compram em grandes volumes, têm interesse em economias e estão preocupados com a qualidade do produto adquirido (PORTER, 1980).

**Poder de Barganha dos Fornecedores:** é definido pelo poder de negociação em insumos de produção e disponibilidade de materiais. Os fornecedores são considerados poderosos quando não têm que lutar contra outros produtos substitutos, não dependem dos compradores e possuem produtos únicos e insubstituíveis para os compradores(PORTER, 1980).

**Rivalidade entre os Concorrentes Existentes:** define o nível de competição em um setor. É mais intenso quando o número de empresas competindo é grande e quando as empresas sofrem restrições de tempo para venda do produtohttps (PORTER, 1980).

Utilizando os conceitos discutidos, é possível aplicar a estrutura das 5 Forças de Porter ao BTG Pactual para avaliar sua posição competitiva e identificar os principais impulsionadores de lucratividade e os desafios enfrentados pela empresa.

#

<div style="text-align: center;">
    <p>Figura x: 5 Forças de Porter</p>
    <img src="../assets/negocios/5forcasdeporter.png">
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

**Ameaça de produtos substitutos:** o nível de ameaça de produtos substitutos para o BTG Pactual varia conforme seus segmentos de atuação, mas é alto em algumas áreas estratégicas. No mercado de investimentos, fintechs e corretoras independentes oferecem alternativas acessíveis e automatizadas, desafiando os serviços tradicionais de wealth management e asset management. No corporate banking e mercado de crédito, bancos digitais e plataformas de financiamento descentralizado (DeFi) criam novas formas de captação de recursos, reduzindo a dependência de grandes instituições(BERWIG, 2023).

**Poder de negociação dos compradores:** o poder de negociação dos compradores do BTG Pactual pode ser considerado moderado, variando conforme o perfil do cliente. Grandes investidores, clientes institucionais e grandes fundos de investimento exercem uma influência significativa, pois movimentam altos volumes de capital e têm maior poder de barganha. Eles podem negociar taxas mais competitivas, acesso a produtos exclusivos, serviços personalizados e condições diferenciadas para otimizar seus investimentos (BERWIG, 2023).

**Rivalidade entre os concorrentes:** a rivalidade entre os concorrentes do BTG Pactual é alta, especialmente no setor de investimentos e serviços financeiros. O mercado é altamente competitivo, com a presença de grandes bancos tradicionais, corretoras independentes e fintechs inovadoras, todos disputando a preferência de investidores institucionais e clientes de varejo. Os bancos tradicionais, como Itaú, Bradesco e Santander, possuem grande capilaridade e uma base consolidada de clientes, o que os torna concorrentes diretos em diversas frentes. Já as corretoras independentes, como XP Investimentos e Genial, se destacam pela oferta de plataformas digitais ágeis e produtos financeiros personalizados, atraindo investidores que buscam maior autonomia e diversificação (BERWIG, 2023).

**Poder de negociação dos fornecedores:** o poder de barganha dos fornecedores do BTG Pactual varia de moderado a alto, especialmente em setores estratégicos como tecnologia, dados financeiros e consultoria especializada. Fornecedores de soluções tecnológicas, plataformas de análise de mercado e serviços de infraestrutura digital desempenham um papel essencial no suporte às operações do banco, tornando-se parceiros-chave na execução de suas atividades. A dependência de dados precisos e atualizados, bem como de sistemas robustos e seguros, confere a esses fornecedores uma influência significativa. No entanto, o BTG Pactual, por ser uma das maiores instituições financeiras da América Latina, possui um forte poder de negociação. Sua relevância no setor e seu volume de operações permitem que o banco exerça influência sobre os contratos, buscando sempre as melhores condições comerciais, alinhamento estratégico e inovação contínua. Além disso, a diversificação de fornecedores e investimentos em tecnologia própria ajudam a reduzir a dependência excessiva de qualquer parceiro específico, equilibrando essa dinâmica de poder (BERWIG, 2023).

**Ameaça de entrada de novos concorrentes:** a ameaça de entrada de novos concorrentes no mercado financeiro, especialmente no setor de investimentos, varia de moderada a alta. A indústria financeira é caracterizada por barreiras de entrada significativas, como a necessidade de grandes investimentos iniciais, conformidade regulatória rigorosa e a construção de uma infraestrutura robusta para atender a clientes de alta complexidade. No entanto, a transformação digital e o crescimento das fintechs têm diminuído algumas dessas barreiras, permitindo a entrada de novos players com modelos de negócios mais ágeis e custos mais baixos. As fintechs, em particular, têm se mostrado uma ameaça crescente, oferecendo soluções inovadoras, como plataformas de investimentos automatizados (robo-advisors), serviços bancários digitais e investimentos de impacto, que atraem, principalmente, os consumidores mais jovens e aqueles em busca de maior flexibilidade e custos reduzidos. Empresas de tecnologia também estão cada vez mais entrando no setor financeiro, trazendo expertise em dados, inteligência artificial e blockchain, o que pode representar uma disrupção no mercado (BERWIG, 2023).

Um exemplo prático da importância das Cinco Forças de Porter em relação ao BTG Pactual pode ser visto na crescente competição com fintechs e corretoras independentes, especialmente no segmento de investimentos. A ameaça de produtos substitutos tem se intensificado com o surgimento de plataformas digitais que oferecem produtos de investimento de forma simplificada, com baixas taxas e experiência 100% digital. Diante disso, a estratégia do BTG foi fortalecer sua presença digital por meio de iniciativas como a plataforma BTG Pactual digital, que oferece acesso a investimentos com taxas competitivas, interface intuitiva e serviços personalizados. Essa resposta estratégica mostra como a análise das Cinco Forças permitiu ao banco identificar riscos e oportunidades, adaptando-se às mudanças do mercado para manter sua posição competitiva (BERWIG, 2023).

Portanto,após a análise das Cinco Forças de Porter percebe-se que é uma ferramenta extremamente abrangente para avaliar o ambiente competitivo de uma indústria e ajudar as empresas a desenvolver estratégias eficazes para superar dilemas e aproveitar oportunidades. Ao entender tais forças, o BTG Pactual pode posicionar-se de forma mais competitiva e realista em seu mercado-alvo (BERWIG, 2023).

### 1.1.2. Análise SWOT (sprint 2)

A análise SWOT é uma ferramenta utilizada para identificar as forças, oportunidades, fraquezas e ameaças de uma empresa. Dessa forma, serve como uma forma de identificar oportunidades de melhoria frente à concorrência e à própria equipe, promovendo uma visão do atual cenário da empresa. No contexto da análise SWOT, há os fatores internos e externos. Entre os fatores internos, destacam-se as forças, que representam os aspectos positivos da empresa, como recursos, competências e ações estratégicas que proporcionam uma vantagem competitiva. Enquanto as fraquezas são o oposto, são as iniciativas internas que estão abaixo do esperado e indicam o que precisa ser feito para melhorar na empresa. Quanto aos fatores externos há as oportunidades e as ameaças. As oportunidades são as iniciativas externas às empresas, mas que promovem uma melhor posição competitiva. Em relação às ameaças, são os fatores externos que estão fora do controle da empresa e podem impactar negativamente o cenário competitivo. Desse modo, considerando as concepções da Análise SWOT foi possível identificar as forças, fraquezas, oportunidades e ameaças que contemplam o BTG Pactual, conforme consta abaixo(ASANA, 2025).

#

<div style="text-align: center;">
    <p>Figura x: Análise SWOT</p>
    <img src="../assets/negocios/analiseswot.png" alt="Análise SWOT">
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

**Forças:**

- **Liderança no mercado financeiro:** o BTG Pactual é o maior banco de investimentos da América Latina, com alta presença no setor financeiro (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Inovação e tecnologia:** forte investimento em soluções digitais e plataformas tecnológicas, como o BTG Pactual Digital, permitindo o crescimento no varejo financeiro (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Rede de clientes e relacionamento:** possui uma base sólida de clientes institucionais e de alta renda, além de um forte relacionamento com empresas e investidores (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Atuação em diversos segmentos:** mercado de capitais, crédito corporativo e gestão de fortunas, reduzindo riscos de dependência em um único setor (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

**Fraquezas:**

- **Concorrência agressiva no digital:** no segmento de varejo digital, enfrenta concorrentes como Nubank, XP Investimentos e bancos tradicionais,que possuem forte base de clientes (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022)

- **Exposição a riscos de mercado:** como banco de investimentos, está altamente exposto a oscilações macroeconômicas e crises financeiras (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Dependência de grandes clientes e investidores institucionais:** a maior parte das receitas vem de clientes de alta renda e grandes empresas, tornando-o vulnerável a mudanças de comportamento desse público (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

**Ameaças:**

- **Concorrência forte:** disputa acirrada com bancos tradicionais e fintechs, que oferecem serviços mais acessíveis e taxas reduzidas (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Mudanças no perfil dos investidores:** novas gerações de investidores buscam alternativas mais simples e acessíveis, podendo migrar para concorrentes que ofereçam plataformas mais amigáveis (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Regulação rigorosa:** o setor financeiro está sujeito a regulações constantes, o que pode limitar algumas operações do banco (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Cibersegurança e Fraudes:** como banco digital e de investimentos, enfrenta riscos de ataques cibernéticos e vazamento de dados (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

**Oportunidades:**

- **Crescimento no mercado de investimentos digitais:** com a popularização do investimento online, o BTG pode ampliar sua base de clientes via BTG Pactual Digital (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Cenário favorável para ativos alternativos:** o aumento do interesse por ativos como fundos estruturados, private equity e crédito privado pode impulsionar o banco (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Atuação internacional:** o BTG Pactual tem expandido sua atuação internacionalmente, podendo capturar mais oportunidades fora do Brasil (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

- **Expansão para o varejo financeiro:** o banco tem ampliado sua atuação para o público de alta renda e varejo, competindo com fintechs e bancos tradicionais (RIBEIRO; SODRÉ; ALBUQUERQUE JUNIOR, 2022).

### 1.1.3. Missão / Visão / Valores (sprint 2)

O BTG Pactual tem como missão prover soluções financeiras inovadoras e eficientes, combinando expertise e tecnologia para gerar valor sustentável a clientes, investidores e à sociedade. O banco busca transformar o mercado por meio de um atendimento consultivo, focado em resultados, sempre priorizando a excelência e a inovação. Sua visão é consolidar-se como a principal instituição financeira independente da América Latina, sendo reconhecido pela sua capacidade de adaptação, impacto positivo e liderança no setor de investimentos e serviços financeiros. Seus valores são pautados pela meritocracia, parceria e foco no cliente, promovendo um ambiente dinâmico e colaborativo. Além disso, o compromisso com a integridade, a excelência e a visão de longo prazo fortalece sua cultura empreendedora, impulsionando o crescimento sustentável e a criação de soluções diferenciadas para o mercado(BTG PACTUAL, s.d.).

Da mesma forma, nosso projeto visa transformar o onboarding de novos analistas de tecnologia do BTG Pactual, oferecendo uma experiência gamificada, imersiva e alinhada aos desafios reais da empresa. Nossa missão é tornar o aprendizado dinâmico e estratégico, refletindo o dinamismo do mercado financeiro. Assim como o banco se guia por valores como meritocracia, parceria e foco no cliente, nosso projeto também se baseia na excelência e inovação, garantindo uma experiência envolvente e eficiente. Além disso, buscamos incentivar a autonomia e o protagonismo, promovendo um aprendizado ativo e contínuo que vai além do onboarding. Valorizamos o impacto e a responsabilidade, demonstrando como cada decisão afeta os resultados do banco, e promovemos a colaboração e o engajamento, fortalecendo a integração entre os profissionais.

### 1.1.4. Proposta de Valor (sprint 4)

O conceito do _Canvas_ da Proposta de Valor foi criado por Alex Osterwalder, no livro _Value Proposition Design: How to Create Products and Services Customers want_. Na obra, Osterwalder (2014) apresenta um modelo com dois lados: o perfil do consumidor e o mapa de valor.

No perfil do consumidor, destacam-se três elementos principais:

- **Tarefas**: o que o consumidor precisa realizar.
- **Dores**: os obstáculos que dificultam a execução dessas tarefas.
- **Ganhos**: os fatores que tornam a experiência do consumidor mais satisfatória, considerando o contexto das tarefas.

O principal objetivo dessa parte da ferramenta é verificar o conhecimento sobre o consumidor.

Já o mapa de valor contém os seguintes elementos:

- **Analgésicos**: soluções que eliminam ou minimizam as dores do cliente.
- **Criadores de ganho**: tudo o que pode melhorar a experiência do consumidor, agregando mais valor ao produto ou serviço.
- **Produtos e serviços**: produtos ou seviços que sirvam como solução para os problemas apresentados

Dessa forma, o _canvas_ permite uma análise detalhada da solução, verificando se ela se encaixa com aquilo que o consumidor realmente deseja.

Por esse caminho, consideramos que o _Canvas_ da Proposta de Valor é capaz de esclarecer os principais aspectos desejados pelo BTG Pactual em nosso projeto. Além disso, ele permite que alinhemos nossa proposta com os interesses da empresa, mapeando as dores e ganhos do cliente, e como o nosso produto é capaz de suprimir os problemas e alavancar os ganhos. Segundo a linha de raciocínio de Osterwalder (2014), o consumidor tem diversas expectativas para a solução, porém entende que não pode ter todos os seus desejos cumpridos. Logo, corroboramos com esse pensamento, aplicando-o no desenvolvimento do nosso projeto, priorizando os aspectos que terão maior impacto na solução dos desafios apresentados. Sob esse viés, elaboramos o _Canvas_ da Proposta de Valor, visto na imagem à seguir:

#

<div style="text-align: center;">
    <p>Figura x: Canvas: Proposta de Valor</p>
    <img src="../assets/gdd_1.1/canvasPropostaValor.png" />
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

Destacamos alguns aspectos do canvas, principalmente quanto às dores do cliente e os criadores de ganho da solução. O principal desafio apresentado pelo BTG Pactual envolve o atual processo de onboarding, que se mostra pouco dinâmico e atrativo. Dessa forma, os criadores de ganho que definimos buscam proporcionar uma experiência que, aliada aos analgésicos propostos, seja capaz de atender às expectativas do parceiro de projeto e esteja alinhada com a nossa solução.

Como temos 10 semanas de trabalho, a priorização das tarefas, dores e ganhos, conceito apresentado anteriormente, demonstra a sua importância. No caso de nosso projeto, o foco desejado pela empresa parceira está nas informações passadas para novos funcionários. Ou seja, o aspecto principal de nossa solução precisa estar alinhada com a transmissão de conteúdos. Por esse caminho, definimos a seção "Criadores de ganho", visto na figura 3, trazendo a nossa proposta de gamificação do processo de onboarding junto com a validação da performance do jogador, visando garantir que o mesmo compreendeu os conteúdos necessários, principal ponto desejado pelo parceiro.

### 1.1.5. Descrição da Solução Desenvolvida (sprint 4)

O jogo Capital Downfall visa solucionar os problemas expostos pelo cliente em relação à falta de engajamento dos novos funcionários com o onboarding, à burocracia desse processo e à falta de dinamização na aprendizagem. Diante disso, a solução proposta oferece uma experiência gamificada que transforma o onboarding tradicional em um processo mais ágil, interativo e envolvente. Para agregar ainda mais valor à experiência do usuário, o jogo conta com um sistema de pontuação que permite que os jogadores acompanhem seu progresso e se mantenham motivados, materiais de apoio integrados que possibilitam o acesso rápido e fácil a conteúdos essenciais, sem a necessidade de sair da tela do jogo, e minigames interativos que reforçam o aprendizado de forma criativa e envolvente, tornando a assimilação do conteúdo mais eficiente.

### 1.1.6. Matriz de Riscos (sprint 4)

A Matriz de Riscos, também conhecida como Matriz de Probabilidade e Impacto, é uma ferramenta visual amplamente utilizada na gestão de riscos com o objetivo de priorizar os riscos identificados em um projeto. Sua principal função é apoiar a tomada de decisões e a definição de medidas preventivas, além de promover o engajamento da equipe no processo de identificação, análise e controle dos riscos envolvidos.

A estrutura da matriz é baseada em duas dimensões principais. A primeira é a probabilidade, que mede a chance de um risco ocorrer, sendo normalmente classificada em níveis como muito baixo, baixo, moderado, alto e muito alto, podendo também ser expressa por porcentagens. A segunda dimensão é o impacto, que representa as consequências da ocorrência do risco. Assim como a probabilidade, o impacto também é classificado em níveis que variam de muito baixo a muito alto (PROJECT MANAGEMENT INSTITUTE, 2017).

A combinação entre probabilidade e impacto resulta na classificação do risco, que é geralmente representada por cores em uma matriz visual, permitindo identificar facilmente o nível de criticidade de cada risco: alta, média ou baixa. Essa visualização facilita o foco da equipe nos riscos mais relevantes e permite que um plano de ações eficaz seja elaborado.

Em contrapartida, para cada risco existe um plano de ação para ser feito dentro da equipe. O plano de ação na matriz de risco consiste em medidas estratégicas definidas para prevenir, minimizar ou responder aos riscos identificados, com o objetivo de reduzir seus impactos no projeto. Ele orienta as ações da equipe diante de cada risco, promovendo uma gestão mais eficiente e proativa.

Transpondo para a realidade do nosso projeto, a matriz de riscos foi utilizada para avaliar os riscos identificados ao longo do desenvolvimento do jogo, considerando tanto aspectos internos, como as expectativas da equipe, quanto os relacionados à entrega do produto e ao feedback do parceiro.

#

<div style="text-align: center;">
    <p>Figura x: Ameaças - Matriz de Risco</p>
    <img src="../assets/negocios/matrizderisco1.png" />
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

**Descrição:**

1. **Falta de testes com usuários reais.**
   Impacto: Moderado
   Probabilidade: 90%
   Descrição: Impossibilidade de fazer com que os analistas de fundos de investimento joguem e validem o jogo e o conteúdo abordado.
   Plano de Ação: Planejar e executar testes de usabilidade com usuários-alvo antes da implementação no processo de onboarding, além de incorporar os feedbacks nas sprints de desenvolvimento para melhorias contínuas.

2. **Abordar conteúdo insuficiente para o onboarding.**
   Impacto: Alto
   Probabilidade: 30%
   Descrição: O jogo não aborda tudo aquilo que precisa ser passado para que o estagiário complete o aprendizado requisitado no onboarding.
   Plano de Ação: Levantar as informações essenciais junto ao parceiro e criar um roteiro de conteúdo claro, baseado na documentação disponibilizada pelo banco BTG, revisando com base em testes nas sprints de validações.

3. **Expectativas do parceiro desalinhadas com a realidade do produto.**
   Impacto: Muito Alto
   Probabilidade: 30%
   Descrição: O produto final torna-se algo diferente daquilo que será aplicado e as validações não são suficientes para um alinhamento contínuo.
   Plano de Ação: Definir escopo, entregas e critérios de sucesso de forma clara e documentada, além de realizar reuniões periódicas de alinhamento com o parceiro para revisar expectativas.

4. **Falta de experiência técnica.**
   Impacto: Alto
   Probabilidade: 70%
   Descrição: O grupo pode enfrentar dificuldades técnicas ao lidar pela primeira vez com linguagens de programação e tecnologias de desenvolvimento de projeto.
   Plano de Ação: Identificar os níveis de conhecimento e promover treinamentos adicionais por meio de cursos e professores.

5. **Prazos não cumpridos.**
   Impacto: Alto
   Probabilidade: 50%
   Descrição: Dificuldade na organização de tarefas e consequentemente atraso na entrega, uma vez que na equipe, uma tarefa depende diretamente da finalização de outra.
   Plano de Ação: Definir as metas semanais no Trello e seguir a linha de tempo determinada, acompanhando o progresso com métodos ágeis e ajustando o cronograma sempre que necessário.

6. **Falta de comunicação interna na equipe.**
   Impacto: Muito Alto
   Probabilidade: 50%
   Descrição: Desalinhamento entre membros pode afetar o desempenho geral, uma vez que as tarefas e o grupo é dependente entre si para o sucesso do projeto.
   Plano de Ação: Adotar rituais ágeis como o Scrum, realizando constantemente dailys e retrospectivas.

7. **Má distribuição de tarefas.**
   Impacto: Moderado
   Probabilidade: 70%
   Descrição: Manter os alunos que possuem algum conhecimento prévio fixos em determinada área, desequilibrando o bom andamento das atividades, sobrecarregando o grupo como um todo e impossibilitando a troca de saberes.
   Plano de Ação: Reavaliar o planejamento e dividir as tarefas de forma mais equilibrada, realizar reuniões diárias de alinhamento para redistribuir atividades quando necessário e respeitar as atividades definidas no Kanban.

O setor de oportunidades na matriz de riscos representa os riscos positivos, ou seja, eventos incertos que, se ocorrerem, podem trazer benefícios ao projeto. Assim como as ameaças, as oportunidades são avaliadas com base na probabilidade de ocorrência e no impacto, mas com foco em resultados favoráveis. Baseado nisso, o nosso grupo pontuou as principais oportunidades que obtivemos como equipe no decorrer do projeto.

#

<div style="text-align: center;">
    <p>Figura x: Oportunidades - Matriz de Risco</p>
    <img src="../assets/negocios/matrizrisco2.png" />
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

**Descrição:**

1. **Aprendizado constante e proatividade.**
   Impacto: Muito alto
   Probabilidade: 90%
   Descrição: Aprendizados novos todos os dias sobre metodologias ágeis por meio de uma metodologia ágil que garante proatividade, o método PBL.

2. **Compartilhamento de conhecimento na equipe.**
   Impacto: Alto
   Probabilidade: 90%
   Descrição: A equipe durante as 10 semanas de desenvolvimento, troca seus conhecimentos e explora novas áreas de saberes a partir de outros integrantes do grupo.

3. **Validação antecipada de funcionalidades com o parceiro.**
   Impacto: Muito alto
   Probabilidade: 70%
   Descrição: A oportunidade de validar o projeto com o parceiro a cada duas semanas permite o alinhamento contínuo com o cliente.

4. **Desenvolvimento de Hard Skills**
   Impacto: Alto
   Probabilidade: 70%
   Descrição: Aprender novas habilidades técnicas para utilizar no projeto e consequentemente, em outros projetos futuros.

5. **Desenvolvimento de Soft Skills**
   Impacto: Muito alto
   Probabilidade: 50%
   Descrição: O trabalho e o desenvolvimento em grupo, permite a formação de habilidades socioemocionais novas, como a colaboração, a empatia e o trabalho em equipe.

Portanto, baseado na matriz de riscos apresentada, é possível concluir que a análise estruturada dos riscos, considerando tanto ameaças quanto oportunidades, permite uma visão mais clara das prioridades do projeto, contribuindo para o bom desenvolvimento como um todo.

### 1.1.7. Objetivos, Metas e Indicadores (sprint 4)

As metas SMART são uma metodologia eficaz para definir objetivos de forma clara e alcançável, tanto no contexto pessoal quanto profissional. A sigla SMART representa cinco critérios que uma meta bem formulada deve atender. Desse modo, ela deve ser:

- Específica, ou seja, claramente definida e focada em um resultado concreto.
- Mensurável, permitindo avaliar o progresso por meio de indicadores ou resultados observáveis.
- Atingível, ou seja, realista dentro das possibilidades e recursos disponíveis.
- Relevante, estando alinhada com objetivos maiores ou com algo que realmente faça sentido para quem a define.
- Temporal, com um prazo definido para ser cumprida.

Esse conceito foi apresentado por George T. Doran em 1981, em um artigo na revista Management Review, e desde então tem sido amplamente utilizado na gestão de projetos, planejamento estratégico e desenvolvimento pessoal por facilitar o foco, o comprometimento e o acompanhamento dos resultados.

#

<div style="text-align: center;">
    <p>Figura x: Metas SMART</p>
    <img src="../assets/negocios/smart.png" />
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

Ao conhecer as metas SMART, é nítido a importância de planejar objetivos de forma estratégica e estruturada. Essa abordagem não só aumenta as chances de sucesso, mas facilita a organização e a motivação ao longo do projeto.

## 1.2. Requisitos do Projeto (sprints 1 e 2)

Durante a reunião com o parceiro do projeto foi possível definir uma série de requisitos que contemplam desde a estética até a mecânica do jogo.

<div align="center">
<p>Quadro 1: Requisitos do Projeto</p>
</div>

**Quadro de requisitos**
\# | **Requisito**  
--- | ---
1 |O jogo será desenvolvido para Web, acessível através de um PC.
2 |O jogo terá uma câmera oblíqua que seguirá o jogador, garantindo visão ampla do ambiente.
3 |O jogador se movimentará pelo mapa utilizando as setas do teclado.
4 |O jogador poderá interagir com botões e menus na tela utilizando o botão esquerdo do mouse.
5 |A interação com terminais, computadores e outros elementos do cenário será realizada pressionando a tecla "espaço".
6 |As tasks estarão espalhadas por todo o escritório virtual, incentivando a exploração.
7 |O jogador poderá escolher a ordem em que deseja realizar as tasks.
8 |Se o jogador errar uma task, não poderá refazê-la, impactando o desempenho da empresa.
9 |Algumas interações abrirão menus de tarefas ou quizzes na tela, exigindo tomada de decisão ou conhecimento técnico.
10|O progresso do jogador será avaliado em tempo real com base no seu desempenho nas tasks.
11|No fim de cada fase, um jornal exibirá os impactos positivos ou negativos das decisões do jogador no banco.
12|O jogo terá níveis crescentes de dificuldade, exigindo mais atenção e estratégia a cada fase.
13|O jogador receberá moedas virtuais ao completar tarefas corretamente.
14|Conquistas serão desbloqueadas ao atingir certos marcos de progresso.
15|O jogador poderá gastar moedas para personalizar o seu personagem, adquirindo acessórios e itens cosméticos.

## 1.3. Público-alvo do Projeto (sprint 2)

O público-alvo consiste em um grupo de indivíduos com características em comum, tornando-os mais inclinados a consumir determinados produtos ou serviços oferecidos por uma empresa que os tem como foco (SEBRAE, 2023).

Definir um público-alvo de forma estratégica garante uma vantagem competitiva, permitindo uma comunicação e um marketing mais eficazes, além de impulsionar as vendas. No entanto, uma definição muito ampla ou imprecisa pode gerar inconsistências, reforçando a importância de considerar aspectos como gênero, idade, localização, profissão e escolaridade ao traçar esse perfil (SEBRAE, 2023).

Para alinhar o projeto de forma assertiva, foi estabelecido um público-alvo específico. O jogo Capital Downfall é voltado para pessoas de qualquer gênero, raça e etnia, com idade acima de 18 anos, que trabalham como analistas de fundos de investimentos no banco BTG. São indivíduos que buscam compreender melhor os processos internos da empresa, mas que podem enfrentar dificuldades devido à sua complexidade.

Além disso, o jogo se destina a profissionais responsáveis, comprometidos com a diversidade e representatividade no ambiente corporativo, bem como engajados na busca por conchecimento.

Outro fator importante relacionado ao público-alvo é o conceito de **personas**, que representam perfis detalhados e humanizados do público ideal. Essas personas levam em conta não apenas informações objetivas, mas também aspectos subjetivos, como medos, desafios, motivações e aspirações que impulsionam o interesse por um produto ou serviço (SEBRAE, 2023).

Para garantir um jogo mais personalizado e voltado para experiências reais, foi definida uma persona que orientará o desenvolvimento da experiência oferecida.

### Persona do usuário:

- **Nome:** _Tiago Mendes_
- **Idade:** _24_
- **Gênero:** _Masculino_
- **Cargo:** _Analista de Fundos de Investimentos do BTG Pactual_

#### Características:

- Proativo
- Curioso
- Esforçado

#### Biografia:

Tiago Mendes é um analista de fundos de investimento recém-contratado para o BTG Pactual, nascido e criado em São Paulo. Possui graduação em Economia pela Universidade de São Paulo (USP) e pós-graduação em Gestão Financeira pela Fundação Getúlio Vargas (FGV). Destacou-se no gerenciamento de investimentos em diversos e-commerces antes de ser contratado pelo banco BTG, onde atualmente está realizando o processo de onboarding da empresa.

#### Dores:

- Falta de uma abordagem didática e prática para compreender os processos internos sobre fundos de investimento do banco BTG.
- Dificuldade em manter o foco e o engajamento ao longo de treinamentos tradicionais sobre conteúdos extensos e pouco didáticos.

#### Necessidades:

- Mecanismo que simplifique e promova o entendimento didático do processo de onboarding de fundos de investimentos do banco BTG.
- Treinamento mais divertido para manter sua atenção.

# <a name="c2"></a>2. Visão Geral do Jogo (sprint 2)

## 2.1. Objetivos do Jogo (sprint 2)

Para concluir o jogo, o jogador deve avançar por dois dias, cada um representando desafios progressivos dentro do ambiente corporativo do banco. No primeiro dia, ele inicia na hub principal do escritório e pode escolher a ordem das tarefas introdutórias, que abordam conceitos básicos e operações fundamentais do banco. Ao concluir todas as tarefas, um relatório em formato de jornal apresenta o impacto de suas decisões, determinando se pode prosseguir para o dia seguinte.

No segundo dia, as tarefas se tornam mais complexas, exigindo maior atenção aos detalhes e tomada de decisão estratégica. O jogador precisa lidar com desafios mais técnicos e gerenciar riscos operacionais. Ao final, novamente, o jornal avalia seu desempenho, e, caso tenha obtido um resultado satisfatório, ele avança para o próximo dia.

Após a conclusão dos dois dias, o jogador é levado a um ambiente de alta tensão, simulando uma verdadeira "sala de guerra", onde precisa tomar decisões rápidas e coordenar soluções para estabilizar o banco. As tarefas são ainda mais desafiadoras e exigem precisão para evitar o colapso financeiro. No final, o jornal apresenta o desfecho do jogo, que pode variar entre a recuperação total do banco ou a falência definitiva que obriga o jogador a reiniciar o jogo.

## 2.2. Características do Jogo (sprint 2)

### 2.2.1. Gênero do Jogo (sprint 2)

Capital Downfall é um Role Playing Game(RPG) corporativo com elementos de simulação e estratégia. O jogador assume o papel de um analista de tecnologia de um banco e deve cumprir tarefas essenciais para manter o banco funcionando. A progressão ocorre por meio de decisões estratégicas, quizzes, resolução de desafios e mini-games, impactando diretamente o desempenho da empresa. Com um ambiente dinâmico e desafios progressivos, o jogo combina narrativa imersiva e aprendizado interativo, trazendo uma experiência única de gestão e tomada de decisões no mercado financeiro.

### 2.2.2. Plataforma do Jogo (sprint 2)

O jogo está sendo desenvolvido com a premissa de ser executado principalmente em computadores, sendo otimizado para essa plataforma. No entanto, ele também poderá ser acessado por meio de um link, o que possibilita que o jogo seja jogado em qualquer dispositivo com acesso à internet, como smartphones e tablets. Contudo, é importante ressaltar que a experiência foi projetada e ajustada com foco na interface e nas funcionalidades específicas para computadores. Portanto, embora o jogo seja acessível em diversas plataformas, a jogabilidade e a interação foram concebidas para proporcionar o melhor desempenho e usabilidade quando jogado em um computador.

### 2.2.3. Número de jogadores (sprint 2)

O jogo será projetado para ser jogado exclusivamente por um único jogador por vez, sem a implementação de modalidades multiplayer ou cooperativas. Cada sessão de jogo será uma experiência individual, focada no progresso e na conclusão das tarefas atribuídas ao jogador. Dessa forma, a dinâmica de jogo será centrada na imersão de um único participante, com a barra de tarefas servindo como indicador do avanço e da conclusão das fases. A ausência de modo multiplayer visa proporcionar uma experiência mais introspectiva e desafiadora, em que o jogador assume o papel exclusivo de progredir e conquistar vitórias ao completar suas tarefas, dentro de um ambiente visualmente envolvente e estruturado com a estética de pixel art.

### 2.2.4. Títulos semelhantes e inspirações (sprint 2)

Foram selecionados dois jogos como referência. O primeiro é Among Us, do qual será incorporada a mecânica de progressão de tarefas. No Among Us, quando um jogador completa uma "task", a barra de tarefas aumenta. Quando essa barra atinge o máximo, a fase é concluída, resultando na vitória do jogador. A segunda referência é Stardew Valley, porém, não pela mecânica do jogo, mas pela estética em pixel art, que será adotada no design visual. A combinação dessas influências visa criar uma dinâmica onde, por um lado, o progresso das tarefas traz uma sensação de colaboração, enquanto, por outro, a estética em pixel art oferece um ambiente visualmente acolhedor e nostálgico, contribuindo para uma experiência única e imersiva para os jogadores.

### 2.2.5. Tempo estimado de jogo (sprint 5)

O jogo pode ser concluído entre 15 e 30 minutos passando por todas as fases.

# <a name="c3"></a>3. Game Design (sprints 2 e 3)

## 3.1. Enredo do Jogo (sprints 2 e 3)

O enredo do nosso jogo se baseia em um problema financeiro em um banco. Para resolver essa crise, o banco decidiu contratar um analista. No jogo, você pode escolher entre quatro personagens, e aquele que você selecionar será o profissional contratado para enfrentar o desafio. O arco narrativo do jogo será apresentado ao jogador logo no início, será nosso texto inicial que irá introduzir o jogador a uma trama envolvente e cheia de decisões críticas.

“Seja muito bem-vindo! Na crise atual do mundo financeiro, precisamos de sua ajuda para garantir o crescimento da empresa. Ao redor do nosso escritório, estão 3 tarefas para você realizar. Elas estão demarcadas por pontos de exclamação.

Movimente-se com as setinhas do teclado, e interaja com essas tarefas utilizando a barra de espaço.
Contamos com você!”

O objetivo do texto inicial é introduzir o jogador nos módulos que se seguem. O arco de conflito do jogo é representado pelos módulos, que funcionam como mini games projetados para testar as habilidades do jogador, desafiando-o a resolver problemas financeiros. Já o arco de resolução se concentra na "sala de guerra", um ambiente que, embora semelhante aos módulos, eleva a dificuldade e intensifica o clima de tensão, simulando uma situação real e crítica. Se o jogador conseguir superar esse desafio final, ele concluirá o jogo, encerrando o arco de resolução com sucesso.

## 3.2. Personagens (sprints 2 e 3)

### 3.2.1. Controláveis

Todos os personagens do jogo deveriam ser inclusivos para cumprir o objetivo de tornar o jogador mais imerso, pois ele pode se identificar mais com a opção de personagem escolhida.

#

<div align="center">
  <p>Figura x: Mark</p>
  <img src="../assets/personagens/personagemMasculino2.png"><br>
  <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
  
</div>

#

<div align="center">
  <p>Figura x: Margaret</p>
  <img src="../assets/personagens/personagemFeminino2.png"<br>
  <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

<div align="center">
  <p>Figura x: Steve</p>
  <img src="../assets/personagens/personagemMasculino1.png"<br>
  <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

<div align="center">
  <p>Figura x: Mary</p>
  <img src="../assets/personagens/personagemFeminino1.png"<br>
  <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

### 3.2.2. Non-Playable Characters (NPC)

_\<opcional\> Se existirem coadjuvantes ou vilões, aqui é o local para descrevê-los e ilustrá-los. Utilize listas ou tabelas para organizar esta seção. Caso utilize material de terceiros em licença Creative Commons, não deixe de citar os autores/fontes. Caso não existam NPCs, remova esta seção._

### 3.2.3. Diversidade e Representatividade dos Personagens

O primeiro personagem do nosso jogo é o Mark, um analista júnior de 25 anos com experiência prévia em estágios no setor financeiro. Acreditamos que o Mark está totalmente alinhado com o nosso público-alvo, que são os analistas. Além disso, ele representa bem a realidade da sociedade brasileira, já que é um homem negro, jovem e no início de sua carreira.Segundo o IBGE, no Brasil, 20,6 milhões de pessoas se declaram como pretas, compondo uma porcentagem de 10,2% da população total, indicando a significância de representação do grupo. As escolhas feitas para a construção do Mark foram muito bem pensadas e terão um impacto positivo na questão da representatividade.

O segundo personagem é a Margaret, que tem uma carreira consolidada em contabilidade e planejamento financeiro, mas há quatro anos decidiu migrar para a área de fundos de investimento, onde se estabeleceu como uma analista experiente. A Margaret, apesar de sua trajetória inicial em outro setor, se encaixa perfeitamente no nosso público-alvo, já que possui quatro anos de experiência como analista. Em termos de representação da realidade brasileira, a Margaret traz a perspectiva de uma mulher experiente em sua área, mas que busca uma transição de carreira, mantendo-se dentro do nosso foco principal.

O terceiro personagem é o Steve, um jovem que sempre teve uma mente inquieta e apaixonada por números. Cresceu em um bairro simples, onde poucos falavam sobre tecnologia e investimentos, mas ele via neles um caminho para transformar sua vida. Aprendeu programação sozinho e logo percebeu o impacto que a tecnologia poderia ter no mercado financeiro. Mergulhou nos estudos, especializou-se em fundos de investimento e desenvolveu soluções inovadoras para análise de dados. Steve também enfrentou dificuldades no decorrer da vida, por causa de sua orientação sexual, porém encontrou na empresa um local seguro e acolhedor.

O quarto personagem é a Mary, uma cientista de dados com experiência em machine learning e inteligência artificial, que recentemente decidiu migrar para o setor financeiro. A Mary também está alinhada com o impacto que esperamos gerar, pois, ao contrário do Mark, ela não tem uma trajetória prévia no setor financeiro. A Mary, diferente do Mark, já tem uma carreira consolidada, mas isso não diminui sua representatividade. Pelo contrário, como uma mulher negra em uma posição de destaque, ela reforça a importância da representatividade e deve gerar um impacto significativo nesse aspecto.

Esses quatro personagens, com suas diferentes trajetórias e perfis, refletem a diversidade e a complexidade da sociedade brasileira, ao mesmo tempo em que se alinham com o público-alvo do nosso jogo. Essa abordagem trará um impacto positivo tanto em termos de engajamento quanto de representatividade.

## 3.3. Mundo do jogo (sprints 2 e 3)

### 3.3.1. Locações Principais e/ou Mapas (sprints 2 e 3)

O jogo será ambientado no escritório de um grande banco. O mapa consiste em uma sala principal maior no centro, mais três salas menores que simulam o ambiente empresarial bancário. No início do jogo, o jogador poderá se movimentar pelo escritório e encontrará alguns computadores com os quais poderá interagir. Nesses dispositivos, estarão localizados os minigames do jogo.

#

<div align="center">
    <p>Figura x: Mapa do jogo</p>
    <img src="../assets/gdd_3.3/hub.png" width="500"><br>
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

No início do jogo, o jogador poderá se movimentar pelo escritório e encontrará terminais com os quais poderá interagir. Nesses dispositivos, estarão localizados os minigames do jogo. O jogador terá total liberdade para se movimentar e escolher a ordem em que deseja realizar os minigames disponíveis.

#

<div align="center">
    <p>Figura x: Exemplo de objeto interativo, marcado pela exclamação</p>
    <img src="../assets/gdd_3.3/mapa2.png" width="500"><br>
    <p>Autores: Grupo Level Zero, turma 16, Inteli, 2025.</p>
</div>

#

O jogo possuirá duas fases, e cada fase terá três minigames que abordarão algum dos assuntos solicitados pelo BTG Pactual, além de um quiz ao final, que contemplará todo o conteúdo da fase. Também haverá uma fase 3, que simulará o contexto de pressão de uma sala de guerra, em que todos os conteúdos serão abordados de uma só vez e haverá um limite de tempo. A tabela a seguir ilustra e explica os seis minigames implementados no do jogo:

| Imagem do minigame                                      | Resumo                                                                                                                                                                        |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="../assets/gdd_3.3/minigame1.png" width="800"> | O jogador deve analisar um card contendo informações sobre um fundo e arrastá-lo, com o mouse, para a gaveta correta — "Aberto" ou "Fechado" — com base em sua interpretação. |
| <img src="../assets/gdd_3.3/minigame2.png" width="800"> | O jogador deve realizar cálculos financeiros.                                                                                                                                 |
| <img src="../assets/gdd_3.3/minigame3.png" width="800"> | O jogador deve ordenar corretamente as etapas do resgate em um fundo de investimento.                                                                                         |
| <img src="../assets/gdd_3.3/minigame4.png" width="800"> | O jogador deve efetuar operações matemáticas relacionadas a fundos de investimento.                                                                                           |
| <img src="../assets/gdd_3.3/minigame5.png" width="800"> | O jogador deve ligar termos e definições de conceitos financeiros.                                                                                                            |
| <img src="../assets/gdd_3.3/minigame6.png" width="800"> | O jogador deve avaliar perfis de candidatos.                                                                                                                                  |

### 3.3.2. Navegação pelo mundo (Sprints 2 e 3)

A navegação no jogo é simples e intuitiva, permitindo que o jogador explore o ambiente do escritório de um grande banco e interaja com os elementos disponíveis.

#### Movimentação do Personagem

- O jogador pode movimentar o personagem utilizando as setas do teclado (`↑ ↓ → ←`).
- A movimentação é livre, permitindo que o jogador explore todas as áreas do escritório desde o início.

#### Interação com os Objetos

- Ao se aproximar de um objeto interativo, um ícone de exclamação aparecerá sobre ele, indicando que o jogador pode interagir.
- Para acessar os minigames, o jogador deve pressionar a tecla **espaço** (`Space`).
- Ao interagir, o jogador será redirecionado para um dos minigames disponíveis no jogo.

#### Acesso aos Minigames

- Dentro dos minigames, o jogador utilizará o **mouse** para realizar as ações necessárias.

  - **Minigame 1:** O jogador deve arrastar cards para as gavetas corretas.
  - **Minigame 2:** O jogador deve clicar na opção com o valor correto.
  - **Minigame 3:** O jogador deve arrastar os cards e posicioná-los na ordem correta.
  - **Minigame 4:** O jogador deve clicar na opção com o valor correto.
  - **Minigame 5:** O jogador deve clicar e arrastar para ligar os conceitos às suas respectivas definições.
  - **Minigame 6:** O jogador deve clicar na opção aprovar ou reprovar.

Ao concluir cada minigame, o jogador pode retornar ao escritório e escolher um novo desafio.

### 3.3.3. Condições climáticas e temporais (sprints 2 e 3)

O jogo utiliza uma progressão baseada em dias, onde cada fase representa um dia de trabalho no escritório do banco. O jogador pode completar os desafios no seu próprio ritmo dentro de cada fase. Ao concluir todos os 3 minigames o jogador receberá um relatório de desempenho, que destaca seu progresso e acertos.

Durante as duas primeiras fases, não há limite de tempo para a conclusão dos minigames e quizzes. Entretanto, na fase 3, que irá simular uma sala de guerra, todos os conteúdos das fases anteriores serão abordados de forma combinada. Nessa fase final, haverá um limite de tempo, desafiando o jogador a aplicar rapidamente seus conhecimentos sob pressão.

### 3.3.4. Concept Art (sprint 2)

#

<div align="center">
    <p>Figura x: Tela inicial do jogo, apresentando a opção para o jogador iniciar uma nova partida.</p>
    <img src="../assets/conceptArt/telaInicial.png" width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Visão do mapa inicial do jogo, destacando o ambiente do escritório. </p>
  <img src="../assets/conceptArt/mapa1.png" width="500"><br>
  <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Exemplo de material de apoio disponibilizado para o jogador antes de cada fase.</p>
  <img src="../assets/conceptArt/materialDeApoio1.png" width="500"><br>
  <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
    <p>Figura x: Minijogo sobre diferenciação de fundos de investimento.</p>
    <img src="../assets/gdd_3.3/minigame1.png" width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
    <p>Figura x: Minijogo sobre matemática financeira.</p>
    <img src="../assets/gdd_3.3/minigame2.png" width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
    <p>Figura x: Minijogo sobre o processo de resgate em fundos de investimento.</p>
    <img src="../assets/conceptArt/miniGame3.png" width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Tela exibida ao término de um minijogo, mostrando a pontuação obtida pelo jogador naquela tarefa específica, bem como a pontuação geral acumulada.</p>
  <img src="../assets/conceptArt/pontuacao.png" width="500"><br>
  <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

### 3.3.5. Trilha sonora (sprint 4)

| #   | **Título**       | **Ocorrência**                                               | **Autoria** |
| --- | ---------------- | ------------------------------------------------------------ | ----------- |
| 1   | BeepAcerto       | Após o jogador clicar em uma alternativa correta             | PixaBay     |
| 2   | BeepErro         | Após o jogador clicar em uma alternativa errada              | PixaBay     |
| 3   | Carimbo          | Quando o jogador selecionar uma alternativa no minigame 2    | PixaBay     |
| 4   | Clique           | Ao clicar nos "botões" dos minigames                         | PixaBay     |
| 5   | CloseMinigame    | Quando o jogador finalizar o minigame                        | PixaBay     |
| 6   | EscritorioFlow   | Enquanto o jogador estiver realizando um minigame            | PixaBay     |
| 7   | MovePostIt       | Quando o jogador arrastar o "post-it" do minigame 1          | PixaBay     |
| 8   | MusicaHub        | Quando o jogador se deslocar pelo mapa do dia 1              | PixaBay     |
| 9   | MusicaHub2       | Quando o jogador se deslocar pelo mapa do dia 2              | PixBay      |
| 10  | RockMenu         | Enquanto o jogador estiver no menu inicial                   | PixBay      |
| 11  | NewspaperPutDown | Quando o jornal cai sobre a mesa no fim da animação          | Freesound   |
| 12  | PaperLoose       | Durante a queda do jornal na animação                        | Freesound   |
| 13  | Passos           | Quando o personagem se mover                                 | PixaBay     |
| 14  | ScrathPencil     | Enquanto o jogador estiver desenhando na lousa do minigame 4 | PixaBay     |
| 15  | TaskSucess       | Após a finalização da Task                                   | PixaBay     |
| 16  | OpenMinigame     | Quando o jogador iniciar um minigame                         | PixaBay     |

\
Os áudios utilizados no jogo foram extraídos do **PixaBay**, um site gratuito que disponibiliza imagens, vídeos, ilustrações, gráficos vetoriais, músicas e efeitos sonoros. Você pode acessá-lo em: [PixaBay Sound Effects](https://pixabay.com/pt/sound-effects/).

Além disso, alguns sons foram retirados do **Freesound**, uma plataforma colaborativa onde os usuários podem compartilhar e baixar áudios. O site pode ser acessado em: [Freesound](https://freesound.org/).

A seguir, apresentamos como cada som visa impactar na experiência do usuário:

| #   | **Som**              | **Função**                                                                                                                                 |
| --- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | BeepAcerto.mp3       | Fornece um feedback positivo ao usuário, demonstrando que ele acertou o minigame.                                                          |
| 2   | BeepErro.mp3         | Ajuda o jogador a entender que errou alguma parte do minigame movendo o “post-it”.                                                         |
| 3   | Carimbo.mp3          | Simula um som de um objeto do mundo real, ajudando a tornar a experiência mais realista.                                                   |
| 4   | Clique.mp3           | Fornece um feedback imediato ao jogador de que um botão foi pressionado, tornando a navegação pelo menu mais responsiva e intuitiva.       |
| 5   | CloseMinigame.mp3    | Ajuda o jogador a compreender que ele finalizou o minigame.                                                                                |
| 6   | EscritorioFlow.mp3   | Cria uma atmosfera imersiva, simulando um ambiente real de trabalho e evitando que o jogo pareça "vazio" quando não há interações diretas. |
| 7   | MovePostIt.mp3       | Cria a sensação de estar organizando documentos, tornando a experiência mais realista e conectada ao tema fiscal.                          |
| 8   | MusicaHub.mp3        | Cria uma ambientação relaxante e envolvente.                                                                                               |
| 9   | MusicaHub2.mp3       | Cria uma ambientação relaxante e envolvente.                                                                                               |
| 10  | RockMenu.mp3         | Estimula o jogador a querer iniciar o jogo.                                                                                                |
| 11  | NewspaperPutDown.mp3 | Simula o impacto entre dois objetos do mundo real, tornando a experiência mais fiel à realidade.                                           |
| 12  | PaperLoose.mp3       | Simula a queda real de um objeto, tornando a experiência do jogo mais imersiva.                                                            |
| 13  | Passos.mp3           | Dá uma sensação de presença física no ambiente, tornando a movimentação do personagem mais realista e envolvente.                          |
| 14  | ScrathPencil.mp3     | Cria uma imersão interativa ao desenhar na lousa digital do minigame 4.                                                                    |
| 15  | TaskSucess.mp3       | Cria um sentimento de progresso, reforçando a conclusão bem-sucedida de uma atividade.                                                     |
| 16  | OpenMinigame.mp3     | Reforça a transição fluida entre telas, melhorando a experiência do usuário ao abrir menus ou consultar tarefas.                           |

\
O link abaixo leva a um drive do grupo, onde estão disponíveis todos os sons utilizados no jogo, além de um vídeo que demonstra a implementação dos sons e o funcionamento geral do jogo:
[Sons Capital Downfall](https://drive.google.com/drive/u/0/folders/17yBORjCD1kmkHqtc_jtOFSGNY5rt7wF0)

## 3.5. Gameflow (Diagrama de cenas) (sprint 2)

A trajetória do usuário em nosso jogo pode ser representada por meio do diagrama a seguir, dividido em seções. As setas indicam as conexões entre as cenas, enquanto as linhas tracejadas buscam explicar essas conexões. Cada quadro representa uma cena, contendo sua classe, atributos e métodos, além de uma pequena explicação e imagem representativa.

#

<div align="center">
  <p>Figura x: Quadro 1</p>
    <img src="../assets/gdd_3.5/quadro_1.png"width="500"><br>
    <p>Produção autoral</p>
</div>

#

<div align="center">
  <p>Figura x: Quadro 2</p>
    <img src="../assets/gdd_3.5/quadro_2.png"width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Quadro 3</p>
    <img src="../assets/gdd_3.5/quadro_3.png"width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Quadro 4</p>
    <img src="../assets/gdd_3.5/quadro_4.png"width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Quadro 5</p>
    <img src="../assets/gdd_3.5/quadro_5.png"width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Quadro 6</p>
    <img src="../assets/gdd_3.5/quadro_6.png"width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
  <p>Figura x: Quadro 7</p>
    <img src="../assets/gdd_3.5/quadro_7.png"width="500"><br>
    <p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

## 3.6. Regras do jogo (sprint 3)

Após selecionar o personagem, o jogador é conduzido à hub principal do jogo. O objetivo central é guiá-lo através de módulos, cada um composto por três minigames e um miniboss. Durante a jornada, o jogador encontra diversas tarefas espalhadas pelo mapa, podendo selecioná-las para avançar nas fases.

Os minigames possuem uma jogabilidade focada em questionários, sempre acompanhados de um texto introdutório que orienta o jogador e disponibiliza conhecimento sobre o desafio a ser enfrentado. Eles estão estrategicamente distribuídos pelo mapa, contribuindo para a dinâmica do jogo. Caso o jogador consiga superar os três minigames de um módulo, ele ganha acesso ao miniboss, que representa um desafio de revisão para a fixação do conteúdo, antes de avançar para o próximo módulo.

Esse ciclo se repete ao longo dos módulos. É importante destacar que cada tarefa pode ser realizada apenas uma vez. Desse modo, uma vez concluída, não há como refazê-la, garantindo ao jogador apenas uma chance para cada desafio.

## 3.7. Mecânicas do jogo (sprint 3)

**_Controles e Interação_**

O jogo é um 2D interativo, utilizando mouse/touchpad, setas do teclado para movimentação e a barra de espaço para interações.

**_Mecanismos e Funcionamento_**

**Mouse ou Touchpad**

(Minigame 1) Botão esquerdo + arrastar: Define se um fundo é aberto ou fechado ao reorganizar os _cards_.

(Mnigame 2) Botão esquerdo: Seleciona a resposta que indica o saldo resultante.

(Minigame 3) Botão esquerdo + arrastar: Coloca os \_cards\_\_ nos seus respectivos lugares na linha do tempo.

(Minigame 4) Botão esquerdo + arrastar: Seleciona a questão do imposto, rascunha a resposta na lousa e seleciona o resultado da questão.

(Minigame 5) Botão esquerdo + arrastar: Liga os termos e as definições de conteúdos-chave do mundo financeiro

(Minigame 6) Botão esquerdo: Seleciona se um candidato condiz com o perfil desejado.

**Setas do Teclado (Exploração do Mapa)**

Seta para a direita → Move o personagem para a direita no mapa.

Seta para a esquerda ← Move o personagem para a esquerda no mapa.

Seta para cima ↑ Move o personagem para trás no mapa (navegação em profundidade).

Seta para baixo ↓ Move o personagem para frente no mapa.

**Barra de Espaço (Interação)**

A barra de espaço permite que o jogador interaja, na _hub_, com objetos demarcados com um ponto de exclamação azul.

## 3.8. Implementação Matemática de Animação/Movimento (sprint 3)

_Descreva aqui a função que implementa a movimentação/animação de personagens ou elementos gráficos no seu jogo. Sua função deve se basear em alguma formulação matemática (e.g. fórmula de aceleração). A explicação do funcionamento desta função deve conter notação matemática formal de fórmulas/equações. Se necessário, crie subseções para sua descrição._

Antes da fase final do jogo, foi implementada uma animação de movimento em um elemento gráfico: um jornal que 'entra' na tela vindo de fora, gira e cai sobre uma mesa. O movimento ocorre simultaneamente nos eixos x e y, sendo o **eixo x** regido por um **Movimento Uniforme (MU)** e o **eixo y** por um **Movimento Uniformemente Variado (MUV)**, com velocidade inicial nula.

Para garantir uma animação realista e fluida, definimos os seguintes parâmetros:

- Posição inicial do elemento gráfico: (-32 px; 100 px);

- Posição final do elemento gráfico: (500 px; 515 px);

- Tempo total da animação: 1,5 segundos.

A seguir, apresentamos as equações matemáticas utilizadas para descrever o movimento do jornal ao longo do tempo.

---

### 3.8.1. Função matemática que representa o valor da velocidade no eixo x

Conforme Halliday, Resnick e Walker (2023) para se determinar a velocidade em um eixo com **Movimento Uniforme (MU)** em um instante t, usa-se a equação:

$$V_x = \frac{\Delta S}{\Delta t} = \frac{X_f - X_i}{\Delta t}$$

Onde:

- $V_x$ é a velocidade do elemento gráfico no eixo x;
- $\Delta S_x$ representa a variação da posição no eixo x, ou seja, $X_f - X_i$;
- $\Delta t$ corresponde a variação do tempo;
- $X_f$ é a posição final do elemento gráfico no eixo x;
- $X_i$ é a posição inicial do elemento gráfico no eixo x.

Substituindo os valores com base nos parâmetros anteriormente definidos:

$$V_x = \frac{500 - (-32)}{1,5} = \frac{500 + 32}{1,5} = \frac{532}{1,5} \approx 354,67 \text{ px/s}$$

Como no MU a aceleração é nula, a velocidade permanece constante e não depende do tempo t. Assim, a velocidade no eixo x será sempre igual à **354,67 px/s** (pixels por segundo) considerando os valores escolhidos para os parâmetros.

### 3.8.2. Função matemática que representa a coordenada no eixo x

Ainda segundo Halliday, Resnick e Walker (2023), para se definir a posição de uma partícula em um eixo com **Movimento Uniforme (MU)**, usa-se a equação:

$$
x(t) = x_0 + v_x \cdot t
$$

Onde:

- $x(t)$ representa a posição do elemento gráfico no eixo x no instante $t$;
- $x_0$ é a posição inicial do elemento gráfico no eixo x;
- $v_x$ é a velocidade no eixo x (constante no MU);
- $t$ é o tempo decorrido desde o início do movimento.

Substituindo os valores definidos anteriormente:

$$x(t) = (-32) + (354,67) \cdot t$$

Ou seja, a posição do elemento gráfico no eixo x varia linearmente ao longo do tempo, aumentando a uma taxa constante de **354,67 px/s** (pixels por segundo) considerando os valores escolhidos para os parâmetros, conforme esperado para um **Movimento Uniforme (MU)**.

### 3.8.3. Função matemática que representa a aceleração no eixo y

De acordo com Halliday, Resnick e Walker (2023), para determinar a aceleração em um eixo com **Movimento Uniformemente Variado (MUV)**, podemos utilizar a equação:

$$
S = S_0 + V_0 t + \frac{1}{2} a t^2
$$

Onde:

- $S$ é a posição final no eixo y;
- $S_0$ é a posição inicial no eixo y;
- $V_0$ representa a velocidade inicial do elemento gráfico no eixo y;
- $a$ é a aceleração no eixo y;
- $t$ é o tempo decorrido desde o início do movimento.

Nosso objetivo é isolar a aceleração $a$. Como o movimento começa do repouso ($V_0$ = 0), a equação simplifica para:

$$
 S_{} = S_{0} + \frac{1}{2}at^{2}
$$

$$
 a = \frac{2(S - S_{0})}{t^{2}}
$$

Agora, substituímos os valores previamente definidos:

- $S = 515 \text{ px/s}$;
- $S_0 = 100 \text{ px/s}$;
- $t = 1,5 \text{ segundos}$.

$$
a = \frac{2(515 - 100)}{1,5^{2}} \approx 368.89 \text{px/s²}
$$

Assim, a aceleração no eixo y é aproximadamente **368.89 px/s²** (pixels por segundo ao quadrado) considerando os valores escolhidos para os parâmetros.

### 3.8.4. Função matemática que representa a velocidade no eixo y

Ainda segundo Halliday, Resnick e Walker (2023), para se determinar a velocidade em um instante $t$ em um eixo com **Movimento Uniformemente Variado (MUV)**, basta utilizar a equação:

$$V_y = V_0 + a_y \cdot t$$

Onde:

- $V_y$ representa a velocidade do elemento gráfico no eixo y no instante $t$;
- $V_0$ é a velocidade inicial no eixo y;
- $a_y$ é a aceleração no eixo y;
- $t$ é o tempo decorrido desde o início do movimento.

Substituindo os valores previamente definidos:

$$V_y = 0 + (368.89 \cdot t)$$

$$V_y = 368.89 \cdot t$$

Dessa forma, a velocidade do elemento gráfico no eixo y aumenta linearmente ao longo do tempo, conforme esperado para um **Movimento Uniformemente Variado (MUV)**.

### 3.8.5. Função matemática que representa a coordenada no eixo y

Conforme Halliday, Resnick e Walker (2023), para se determinar a coordenada em um eixo com **Movimento Uniformemente Variado (MUV)** em um instante $t$, usa-se a equação:

$$y(t) = y_0 + v_{0y} \cdot t + \frac{1}{2} a_y \cdot t^2$$

Onde:

- $y(t)$ representa a posição do elemento gráfico no eixo y no instante $t$;
- $y_0$ é a posição inicial no eixo y;
- $v_{0y}$ é a velocidade inicial no eixo y (nula neste caso);
- $a_y$ é a aceleração no eixo y;
- $t$ é o tempo decorrido desde o início do movimento.

Substituindo os valores previamente definidos:

$$y(t) = 100 + 0 \cdot t + \frac{1}{2} \cdot 368.89 \cdot t^2$$

$$y(t) = 100 + 184,445 \cdot t^2$$

Dessa forma, a posição do elemento gráfico no eixo y segue uma curva parabólica ao longo do tempo, caracterizando um **Movimento Uniformemente Variado (MUV)**.

No código do jogo, a lógica de movimentação do jornal foi implementada no arquivo animacao.js, utilizando as equações mencionadas anteriormente, com a adaptação necessária para o ambiente de desenvolvimento. Essa adaptação envolveu o tempo da animação, pois o Phaser trabalha com milissegundos. Assim, a variável tempoTotal armazena o valor de 1500 milissegundos, e não de 1,5 segundos. Com base nisso, para imprimir as informações de movimento no console em função dos segundos, foi necessário converter os valores, multiplicando ou dividindo por mil. O código com os devidos comentários segue abaixo:

```javascript
class movimento extends Phaser.Scene {
  constructor() {
    super("movimento"); // Nome da cena
    // Declaração dos parâmetros usados para a animação
    this.tempoTotal = 1500;
    this.posicaoInicialX = -32;
    this.posicaoInicialY = 100;
    this.posicaoFinalX = 500;
    this.posicaoFinalY = 515;
    // Cálculos para o movimento do jornal
    this.deslocamentoX = this.posicaoFinalX - this.posicaoInicialX;
    this.deslocamentoY = this.posicaoFinalY - this.posicaoInicialY;
    this.velocidadeX = this.deslocamentoX / this.tempoTotal;
    this.aceleracaoY = (2 * this.deslocamentoY) / Math.pow(this.tempoTotal, 2);
  }

  preload() {
    // Carrega os arquivos necessários para a cena
    this.load.image("jornal", "src/assets/dia2/animacao/jornal.png");
    this.load.image("mesa", "src/assets/dia2/animacao/mesa.png");
    this.load.image("fundo", "src/assets/dia2/animacao/fundo.png");
    this.load.audio("voando", "src/assets/dia2/animacao/voando.wav");
    this.load.audio("caiu", "src/assets/dia2/animacao/caiu.wav");
  }

  create() {
    // Adiciona o fundo na cena
    this.add.image(400, 300, "fundo");

    // Adiciona a mesa na cena
    this.mesa = this.add.image(500, 540, "mesa").setScale(2.5);

    // Adiciona o jornal na cena, inicialmente na posição X e Y definidas
    this.jornal = this.add
      .image(this.posicaoInicialX, this.posicaoInicialY, "jornal")
      .setScale(0.6);

    // Carrega os efeitos sonoros
    this.somVoando = this.sound.add("voando");
    this.somCaiu = this.sound.add("caiu");

    // Toca o som "voando"
    this.somVoando.play();

    // Criação da animação do movimento do jornal
    this.tweens.add({
      targets: this.jornal,
      x: this.posicaoFinalX, // Posição final em X
      y: this.posicaoFinalY, // Posição final em Y
      duration: this.tempoTotal, // Tempo total da animação
      ease: (t) => 0.5 * this.aceleracaoY * Math.pow(t, 2), // Função de easing para a aceleração
      onUpdate: (tween, target) => {
        let t = tween.progress; // Percentual de progresso da animação

        target.rotation += (17 * Math.PI) / this.tempoTotal; // Rotação do jornal
        target.x =
          this.posicaoInicialX + this.velocidadeX * t * this.tempoTotal; // Atualiza a posição X
        target.y =
          this.posicaoInicialY +
          0.5 * this.aceleracaoY * Math.pow(t * this.tempoTotal, 2); // Atualiza a posição Y

        // Imprime no console as informações solicitadas no artefato 8
        console.log(`Tempo: ${((t * this.tempoTotal) / 1000).toFixed(2)}s`);
        console.log(
          `X -> Posição: ${target.x.toFixed(2)} px, Velocidade: ${(
            this.velocidadeX * 1000
          ).toFixed(2)} px/s`
        );
        console.log(
          `Y -> Posição: ${target.y.toFixed(2)} px, Velocidade: ${(
            this.aceleracaoY *
            t *
            this.tempoTotal *
            1000
          ).toFixed(2)} px/s, Aceleração: ${(
            this.aceleracaoY *
            1000 *
            1000
          ).toFixed(2)} px/s²`
        );
        console.log(
          "------------------------------------------------------------------------------------------------"
        );
      },

      // Quando a animação terminar, executa o seguinte:
      onComplete: () => {
        // Para o som "voando" e toca o som "caiu"
        this.somVoando.stop();
        this.somCaiu.play();

        // A animação da câmera após o jornal cair
        this.cameras.main.zoomTo(4, 1000); // Aumenta o zoom
        this.cameras.main.pan(
          this.jornal.x,
          this.jornal.y,
          1500,
          "Sine.easeInOut"
        ); // Movimenta a câmera até a posição do jornal
      },
    });
  }
}
```

# <a name="c4"></a>4. Desenvolvimento do Jogo

## 4.1. Desenvolvimento preliminar do jogo (sprint 1)

Para o desenvolvimento do nosso projeto, o método _Scrum_ foi utilizado. Nele, o desenvolvimento é divido em _sprints_, cada uma com 2 semanas de duração. Cada _sprint_ é essencial para o progresso do projeto, o primeiro deles sendo o mais significante, já que é o período na qual grupo estipulou o escopo do projeto, além de escolher a direção a ser seguida. Nessa etapa também foi definido que a linguagem de programação utilizada seria o JavaScript, unido ao framework Phaser.

De acordo com as mêcanicas definidas pela equipe, a tela escolhida para ser a primeira a ser desenvolvida foi a da interface do computador. Nela, o jogador recebe o contexto por trás da narrativa apresentada, além de ser o local que precede os minijogos. Ela precisava capturar a essência do projeto, sendo capaz de comunicar para o usuário o estilo de ensino abordado. Na parte do código, uma função de tempo foi utilizada, como forma de evitar que o jogador apenas pule a cena sem ao menos a ter lido. Além disso, um botão foi posicionado no canto inferior direito da tela que, ao ser clickado, mudaria para a cena seguinte.

A criação dessa tela não tem apenas uma importância técnica, mas também temática. Ela é essencial para a validação do progresso do projeto, permitindo que o grupo consiga entender se está seguindo o caminho correto de desenvolvimento, conforme o desejo da empresa parceira. No método _Scrum_, a constante incrementação dos entregáveis é uma de suas características marcantes, e essa cena também seguirá esses passos, sendo melhorada conforme o _feedback_ recebido.

#

<div align="center">
<p>Figura x: Cena da interface do computador</p>
<img src="../assets/conceptArt/materialDeApoio1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p>Figura x: Parte do código referente à cena</p>
<img src="../assets/gdd_4.2/printCodigoDia1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

A outra cena escolhida para ser desenvolvida pelo grupo foi a da hub inicial. Isso se deve ao fato da mesma permitir o teste de algumas das tecnologias que serão utilizadas futuramente no projeto, com destaque para os _Tilesets_ e _Tilemaps_. Um _Tileset_ é um conjunto de imagens do mesmo tamanho, denominadas de _Tiles_, que servem como "blocos de construção" para cenas, permitindo que elas sejam criadas de maneira rápida e eficiente. Um _Tilemap_ é um arquivo que armazena as informações do posicionamento das _Tiles_ em uma cena, trazendo informações como colisões e camadas.

Além disso, a movimentação simples de um personagem foi implementada, se utilizando das "setinhas" para poder se deslocar pelo mapa. Interações simples com objetos também foi adicionada, permitindo que o jogador utilize da tecla "espaço" para realizar uma ação em determinado objeto.

#

<div align="center">
<p>Figura x: Exemplo do _Tileset_ utilizado</p>
<img src="../assets/gdd_4.2/tilesetInicial.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p>Figura x: Parte do código referente à cena</p>
<img src="../assets/gdd_4.2/printCodigoHub.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

De forma geral, a _sprint_ 1 trouxe diversos desafios, porém também trouxe uma maior familiarização com o projeto e com as ferramentas a serem utilizadas. Um obstáculo significativo no decorrer do desenvolvimento foi a utilização do _Tilemap_, que envolve a referência de múltiplos outros arquivos e variáveis. A ideia central do projeto também foi alterada algumas vezes, para melhor condizer com os desejos da empresa parceira.

Para os próximos passos, pretendemos começar a implementação do conteúdo técnico requisitado pelo parceiro, além de iniciar a criação dos minijogos em si.

## 4.2. Desenvolvimento básico do jogo (sprint 2)

Para a _sprint_ 2, avançamos no desenvolvimento das cenas do jogo. Focamos nas cenas que compõe o primeiro dia dentro do jogo, assim permitindo que a nossa entrega capture a ideia geral por traz do nosso planejamento.

Assim, nessa _sprint_, desenvolvemos três _minigames_. Cada um deles apresentam mecânicas diferentes, abordando áreas do conteúdo requisitadas pelo parceiro do projeto.

O primeiro deles é sobre fundos de investimento. Nele, o jogador precisa classificar arquivos em duas categorias: fundos abertos e fundos fechados. Para isso, basta clicar no arquivo com o botão esquerdo do mouse, e arrastá-lo para a classificação correta. No topo da tela, a pontuação vai sendo atualizada em tempo real.

#

<div align="center">
<p>Figura x: <i>Gameplay</i> do <i>minigame 1</i></p>
<img src="../assets/gdd_4.2/gameplay1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

O segundo _minigame_ aborda a validação de transações no mercado. Cabe ao usuário classificar diferentes registros de transações de investidores, levando em conta discrepâncias nos dados. Em cada arquivo, há dois botões, permitindo a classificação do material. Da mesma forma do primeiro _minigame_, a pontuação é atualizada conforme o seu progresso.

#

<div align="center">
<p>Figura x: <i>Gameplay</i> do <i>minigame 2</i></p>
<img src="../assets/gdd_4.2/gameplay2.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

O terceiro _minigame_ retrata os conteúdos por traz do processo de resgate da cotação. O jogador precisa colocar, em uma linha do tempo, a ordem dos acontecimentos em um resgate típico de valores. Isso pode ser feito ao clicar em um _card_ na parte superior da tela, depois clicando na sua posição correspondente na parte inferior. Após todos os _cards_ serem posicionados, basta clicar na seta que aparece na tela, para receber a sua pontuação.

#

<div align="center">
<p>Figura x: <i>Gameplay</i> do <i>minigame 3</i></p>
<img src="../assets/gdd_4.2/gameplay3.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

É importante destacar que cada um desses _minigames_ contém um material de apoio específico, indicando a maneira correta de jogar, além das informações necessárias para compreender o conteúdo por traz do minijogo.

#

<div align="center">
<p>Figura x: Exemplo do material de apoio do <i>minigame</i> 1</p>
<img src="../assets/gdd_4.2/apoioMinigame1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

A escolha desses _minigames_ específicos para a entrega dessa _sprint_ se deve ao fato de eles não serem extremamente complexos, tanto no quesito da programação quanto para a experiência do usuário. Assim, eles servem como uma forma de introdução para o _gameplay loop_ do nosso jogo.

#

<div align="center">
<p>Figura x: Exemplo do código do <i>minigame</i> 2</p>
<img src="../assets/gdd_4.2/codigo2.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Também fizemos algumas atualizações para outras telas diversas do jogo, adicionando novas informações em pontos necessários. Entre essas mudanças, gostaríamos de destacar a _hub_. O seu mapa foi expandido, contando com novas salas e objetos interativos. Cada um desses objetos leva à um _minigame_ diferente, podendo ser interagidos em qualquer ordem. Eles possuem um ponto de exclamação ao seu lado, indicando que as tarefas ainda não foram realizadas. Cada _minigame_ pode ser jogado uma vez.

#

<div align="center">
<p>Figura x: Layout da <i>hub</i></p>
<img src="../assets/gdd_4.2/hubJogo.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p>Figura x: Exemplo de objeto interativo na <i>hub</i></p>
<img src="../assets/gdd_4.2/objeto.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Além disso, implementamos o primeiro personagem jogável do nosso jogo. As suas animações foram feitas com base em uma _spriesheet_, que representa diferentes _frames_ (quadros) da animação do personagem. Optamos por realizar sua inclusão na segunda _sprint_, como forma de tornar a cena da _hub_ mais completa, melhorando a experiência do usuário.

#

<div align="center">
<p>Figura x: <i>Spritesheet</i> do personagem</p>
<img src="../assets/gdd_4.2/markSpritesheet.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Por fim, também atualizamos a tela inicial do jogo, trazendo uma imagem de fundo animada. Ela também apresenta o logo do nosso jogo, trazendo uma maior identificação do jogador com o nosso _game_.

#

<div align="center">
<p>Figura x: Menu Inicial</p>
<img src="../assets/gdd_4.2/menuInicial.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

De forma geral, a _sprint_ 2 ficou marcada pelo desenvolvimento de novas habilidades, além de uma maior clarificação dos objetivos do nosso projeto. Ainda enfrentamos diversos desafios, principalmente em relação ao tempo de desenvolvimento, mas conseguimos cumprir as tarefas necessárias, tanto para o entregável quanto para apresentação ao parceiro.

Para os próximos passos, iremos implementar novas fases (dias) no nosso jogo, trazendo uma maior variedade de conteúdos. Também levaremos em conta o _feedback_ feito pelo parceiro.

## 4.3. Desenvolvimento intermediário do jogo (sprint 3)

No período de desenvolvimento da _sprint_ 3, focamos em correções apontadas pelo parceiro de projeto, além da implementação da segunda fase, com foco nos _minigames_ desse dia.

Entre os problemas levantados, é importante destacar dois deles: a _hub_ do jogo, que era grande demais. Pelo fato de conter diversas salas, e um ambiente considerável para explorar, o nosso jogo não levava em conta a acessibilidade. Algumas pessoas que não estão acostumadas em jogar _videogames_ poderiam acabar se frustrando. Além disso, o foco principal do projeto é o ensinamento dos conteúdos para o _onboarding_.

Como solução, optamos por criar uma versão reduzida da _hub_, porém mantendo os aspectos essenciais. Mantivemos a utilização do _software_ _Tiled_, utilizando de marcações presentes no chão para guiar o jogador ao caminho necessário para a progressão. De forma geral, a _hub_ ainda representa um andar de um escritório, mantendo objetos-chave, como computadores e papéis.

#

<div align="center">
<p>Figura x: Novo <i>layout</i> da <i>hub</i></p>
<img src="../assets/gdd_4.3/hub.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Outro problema apontado foi a implementação do _minigame_ 2. Ele se tratava da análise de transações suspeitas, permitindo com que o usuário avaliasse se os casos apresentados eram verídicos. No entanto, o conteúdo não se alinhava com aquilo que era desejado para o _onboarding_. Por esse motivo, alteramos a ideia por trás desse _minigame_.

O novo _minigame_ 2 aborda temas voltados para a matemática financeira, como o cálculo de juros, por exemplo. Ela apresenta o histórico de transações dos clientes, fornecendo as informações essenciais para que o jogador calcule o saldo final.

#

<div align="center">
<p>Figura x: Novo <i>minigame</i> 2</p>
<img src="../assets/gdd_4.3/minigame2.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Por se tratar de um assunto mais complexo, o material de apoio desse _minigame_ também teve que ser expandido. Para evitar com que o usuário esqueça de pontos importantes, implementamos um botão de voltar atrás no material de apoio, permitindo com que ele leia seções anteriores. O objetivo é implementar esse botão no material de apoio de todos os _minigames_, no entanto, só houve tempo hábil para implementar essa função no _minigame_ 2, durante a segunda _sprint_.

#

<div align="center">
<p>Figura x: Exemplo de parte do material de apoio do <i>minigame</i> 2</p>
<img src="../assets/gdd_4.3/minigame2Apoio.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Com todos os aspectos da _sprint_ 2 de acordo com os desejos do parceiro, voltamos o nosso foco para a implementação de novas partes do projeto. A primeira delas foi o _miniboss_ do dia 1. Ele é um quiz, contendo 3 perguntas, cada uma sobre o conteúdo presente em um _minigame_. As perguntas são selecionadas de um banco de questões, totalizando 9 opções. No entanto, para evitar com que todas as perguntas sejam de apenas um tópico, o código garante que apenas uma pergunta por conteúdo será selecionada.

#

<div align="center">
<p>Figura x: Exemplo de questão do <i>miniboss</i></p>
<img src="../assets/gdd_4.3/miniboss.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Após o usuário escolher uma alternativa, ele será apresentado o _feedback_ de sua performance logo em seguida. Ou seja, caso ele tenha errado a questão, ele receberá uma explicação sobre a maneira correta de responder a pergunta.

#

<div align="center">
<p>Figura x: Exemplo de <i>feedback</i></p>
<img src="../assets/gdd_4.3/minibossFeedback.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Em seguida, optamos por desenvolver os _minigames_ do segundo dia. Focamos em adicionar novas mecânicas de jogo, para trazer uma experiência mais variada. O primeiro deles é sobre impostos existentes no mundo financeiro. O jogador é apresentado quatro impostos diferentes, cada um contendo uma questão para o usuário resolver. Após ele selecionar uma opção, ele é conduzido para uma lousa digital, servindo como rascunho para os seus cálculos.

#

<div align="center">
<p>Figura x: <i>Gameplay</i> do <i>minigame</i> 4</p>
<img src="../assets/gdd_4.3/minigame4.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

O quinto _minigame_ aborda termos comuns do mercado financeiro. O jogador precisa ligar o nome dos conceitos com a sua definição correta. Essa ação é feita utilizando o botão esquerdo do mouse, arrastando uma linha para interligar as opções. Conforme dito anteriormente, todo os conteúdos estão presentes no material de apoio de cada _minigame_.

#

<div align="center">
<p>Figura x: <i>Gameplay</i> do <i>minigame</i> 5</p>
<img src="../assets/gdd_4.3/minigame5.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

O último _minigame_ realizado nessa _sprint_ busca trazer um pouco da cultura empresarial do parceiro de projeto. Com base nos principais valores da empresa, o jogador deve analisar diversos perfis de candidatos, e selecionar aqueles que melhor se encaixam. Tal ação é feita por meio de dois botões presentes na tela, um para aprovar e outro para recusar.

#

<div align="center">
<p>Figura x: <i>Gameplay</i> do <i>minigame</i> 6</p>
<img src="../assets/gdd_4.3/minigame6.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Além disso, também introduzimos a opção do jogador selecionar o personagem jogável, entre quatro opções diferentes. Tomamos essa decisão com base em nossa aula de inclusão e diversidade. Por meio de decisões como essa, é possível aumentar o engajamento do jogador com a experiência. Sobre o código, é importante destacar que a seleção do jogador é guardada em uma variável. Isso ocorre pois os diferentes dias no jogo utilizam de outras cenas da _hub_. Logo, para manter a consistência, todas essas cenas conseguem identificar a escolha do jogador, e assim mostrar o personagem correto.

#

<div align="center">
<p>Figura x: Tela de seleção de personagens</p>
<img src="../assets/gdd_4.3/selecaoPersonagem.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p>Figura x: Exemplo do código da seleção de personagens</p>
<img src="../assets/gdd_4.3/codigoPersonagem.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Por fim, também adicionamos telas de _feedback_ após a realização do _miniboss_. Elas alteram-se de acordo com a sua performance do jogo. Elas possuem função estética quanto mecânica. Por um lado, ajudam a compor a atmosfera da experiência, sendo apresentada como uma edição de jornal. Porém, ela também serve como um alerta de performance para o jogador, indicando se está indo abaixo ou acima do esperado.

#

<div align="center">
<p>Figura x: Exemplo da tela de <i>feedback</i></p>
<img src="../assets/gdd_4.3/telaPontuacao.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025l</p>
</div>

#

Por se tratar de uma _sprint_ mais curta, por causa do feriado, o desenvolvimento acabou sendo mais corrido. Um fator notável foi a rotatividade dos papéis exercidos pelos integrantes, que permitiu com que todos pudessem trabalhar em diferentes áreas do projeto. Sob um olhar geral, o grupo conseguiu cumprir aquilo que tinha proposto. Para os próximos passos, continuaremos ajustando o nosso projeto com base nos _feedbacks_ recebidos, e começaremos o desenvolvimento da fase da Sala de Guerra.

## 4.4. Desenvolvimento final do MVP (sprint 4)

A construção de um MVP (Produto Mínimo Viável) é essencial para validar, de forma rápida e eficiente, uma proposta de valor antes da implementação completa. Com o uso mínimo de recursos, é possível testar a solução, obter feedback, identificar melhorias e entender melhor o cliente, reduzindo riscos e apoiando decisões mais assertivas com base em dados reais.

Por esse motivo, nossa prioridade nesta sprint foi finalizar e viabilizar o jogo em sua totalidade. Considerando que já abordamos conteúdos mais densos nas primeiras duas fases e, alinhando esse fator à limitação de tempo disponível, validamos com o parceiro, ao final da sprint 3, a não necessidade de uma terceira fase com novos conteúdos. Em vez disso, optamos por uma abordagem focada em uma nova fase apenas destinada à revisão e consolidação dos conteúdos já trabalhados.

Portanto, a revisão de conteúdos contribui significativamente para a eficiência do aprendizado, pois reforça conhecimentos previamente adquiridos, corrige possíveis lacunas e promove uma compreensão mais sólida. Esse processo facilita a fixação das informações e prepara melhor os participantes para a aplicação prática dos conceitos. (DUNLOSKY ET AL., 2013)

Com base nesse contexto, o MVP do jogo foi estruturado com duas fases principais, cada uma contendo três Miniboss, e um “Boss Level” como fase revisional, intitulada "Sala de Guerra". O jogo tem início em um mapa que simula o ambiente de um escritório bancário e, logo no início, o jogador é impactado por uma notícia de crise global, recebida por meio de um e-mail exibido na tela.

<div align="center">
<p> Figura x: Tela Inicial do Jogo</p>
<img src="../assets/gdd_4.4/menuinicial55_360.gif">
<p>Grupo Level Zero, turma 16, Inteli, 2025 </p>
</div>

Além disso, houve o aprimoramento do desing da tela de e-mail, garantindo maior imersão e clareza na narrativa. O objetivo da tela de e-mail é abordar e explicar o contexto do nosso jogo, com o objetivo de dinamizar a experiência e trazer as instruções necessárias. Porém, para fazer sentido com o contexto da nossa faculdade, optamos por trocar a plataforma de comunicação para a interface do Slack: aplicativo utilizado por nossa equipe para os contatos profissionais e de projeto. Após essa etapa, o jogador compreenderá que estará inserido em um contexto de crise global, que serve como base para todo o design do nosso MVP. Por isso, realizamos os ajustes necessários no código do jogo.

#

<div align="center">
<p> Figura x: Tela nova de comunicação</p>
<img src="../assets/gdd_4.4/slick1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p> Figura x: Tela antiga de comunicação</p>
<img src="../assets/gdd_4.4/telhavelha.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Ao receber o e-mail, o jogador inicia a primeira fase do jogo, passando pelos minigames que já haviam sido consolidados na Sprint 3.

#

<div align="center">
<p> Figura x: Minigame 1</p>
<img src="../assets/gdd_4.4/jogo1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p> Figura x: Minigame 2</p>
<img src="../assets/gdd_4.4/jogo2.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p> Figura x: Tela Inicial do Jogo</p>
<img src="../assets/gdd_4.4/jogo3.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Ainda consolidando o MVP, optamos por manter o miniboss da fase um, considerando sua relevância dentro da narrativa e seu papel estratégico na progressão do jogo. Sua permanência contribui para a continuidade da experiência do jogador, além de reforçar elementos-chave já validados nas etapas anteriores do desenvolvimento.

<div align="center">
<p> Figura x: Miniboss da Fase 1</p>
<img src="../assets/gdd_4.4/miniboss.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

Ademais, o MVP do jogo contempla métricas de desempenho baseadas no contexto da narrativa, utilizando telas de jornais e respostas com resolução para contribuir com o processo de aprendizado.

#

<div align="center">
<p> Figura x: Feedback das fases</p>
<img src="../assets/gdd_4.4/feedback1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p> Figura x: Feedback do Miniboss</p>
<img src="../assets/gdd_4.4/feedback2.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Entretanto, durante a última sprint, a equipe adicionou as melhorias essenciais de acordo com a validação dos jogos da fase dois, ajustando funcionalidades e refinando a experiência do usuário. Com base nesses resultados, foi possível integrar e consolidar todos os aprimoramentos realizados ao longo do ciclo de desenvolvimento, chegando a versões finais mais estáveis e coerentes com a proposta do parceiro.

#

<div align="center">
<p> Figura x: Minigame 4</p>
<img src="../assets/gdd_4.4/jogo4.jpg">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p> Figura x: Minigame 5</p>
<img src="../assets/gdd_4.4/jogo5.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p> Figura x: Minigame 6</p>
<img src="../assets/gdd_4.4/jogo6.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

Para o MVP, não foi idealizado nenhum sistema revisional de Miniboss, pois a terceira e última fase do jogo, feita para consolidar a experiência do jogador, aborda uma experiência imersiva em uma Sala de Guerra.

Diferentemente do fluxo tradicional de trabalho, a sala de guerra concentra esforços de forma intensiva e coordenada. As decisões são tomadas em tempo real, com comunicação direta entre todos os envolvidos, sem a necessidade de passar por longas cadeias hierárquicas. Isso acelera a identificação de causas, a definição de soluções e a execução de ações. O ambiente da sala de guerra também promove um senso de urgência e colaboração constante, criando condições para que o grupo atue com máxima eficiência. Ademais, a sala de guerra tem um início e um fim bem definidos. Ela é montada com um propósito claro e, ao alcançar seu objetivo, seja corrigir uma falha, lançar um produto ou restabelecer um serviço, é desativada.

Por isso, ao abordar um contexto de crise no jogo, propomos a sala de guerra como conclusão e encerramento, a fim de que todos os conteúdos sejam abordados novamente, porém com um limite de tempo e com uma outra dinâmica, aproximando o jogador do contexto real da empresa e consolidando um processo de onboarding eficaz.

#

<div align="center">
<p> Figura x: Sala de guerra - Hub</p>
<img src="../assets/gdd_4.4/saladg1.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

<div align="center">
<p> Figura x: Sala de guerra - Hub</p>
<img src="../assets/gdd_4.4/saladg2.png">
<p>Grupo Level Zero, turma 16, Inteli, 2025</p>
</div>

#

**Adição de sons**

Para aprimorar o MVP, nessa Sprint adicionamos sons para complementar o jogo. A adição de sons em um jogo é importante porque enriquece a experiência do jogador, tornando-a mais imersiva e envolvente. Sons ajudam a criar atmosfera, guiar a atenção, indicar interações, reforçar emoções e fornecer feedback imediato sobre as ações do jogador. Além disso, contribuem para a narrativa e ajudam na construção da identidade do jogo, tornando-o mais memorável e impactante.

<div align="center">
<p> Figura x: Adiciona música na Sala de Guerra</p>
<img src="../assets/gdd_4.4/code3.png">
<p> Fonte do som: Pixabay </p>
</div>

<div align="center">
<p> Figura x: Carregamento de música</p>
<img src="../assets/gdd_4.4/code4.png">
<p> Fonte do som: Pixabay </p>
</div>

<div align="center">
<p> Figura x: Adição de efeitos sonoros</p>
<img src="../assets/gdd_4.4/code1.png">
<p> Produção autoral</p>
</div>

Conclui-se, portanto, que a progressão do jogador ao longo da experiência foi cuidadosamente estruturada, iniciando pela Fase Um, que introduz os elementos fundamentais do enredo e da mecânica, passando pela Fase Dois, que aprofunda os desafios e amplia a complexidade da narrativa, até alcançar a Fase de Guerra, etapa final e decisiva do jogo. Essa trajetória progressiva assegura uma evolução consistente na jogabilidade e no envolvimento do jogador, proporcionando uma experiência completa, desafiadora e alinhada aos objetivos centrais do projeto.

## 4.5. Revisão do MVP (sprint 5)

_Descreva e ilustre aqui o desenvolvimento dos refinamentos e revisões da versão final do jogo, explicando brevemente o que foi entregue em termos de MVP. Utilize prints de tela para ilustrar._

# <a name="c5"></a>5. Testes

## 5.1. Casos de Teste (sprints 2 a 4)

Os seguintes casos de teste abordam o funcionamento dos _minigames_ e da _hub_ referentes ao dia 1 do jogo, além do funcionamento do menu inicial.

| número | pré-condição                                                                                                                                                                                                                                                                  | descrição do teste                                                                                                        | pós-condição                                                                                                                                                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1      | entrar no _link_ do jogo                                                                                                                                                                                                                                                      | apertar o botão: jogar                                                                                                    | o jogo deve passar para uma cena explicando os controles básicos                                                                                                                                                                                |
| 2      | posicionar o personagem em em frente a um objeto que ainda não foi interagido, demarcado por um ponto de exclamação                                                                                                                                                           | enquanto o personagem estiver colidindo com o objeto, apertar a barra de espaço                                           | a explicação do _minigame_ deverá aparecer                                                                                                                                                                                                      |
| 3      | clicar no botão "começar" do material de apoio do minigame 1, acessado conforme o caso de teste #2                                                                                                                                                                            | arrastar o _card_ que aparecer na parte central da tela para uma das gavetas, localizadas na esquerda e na direita        | o _card_ deverá sair da tela, a pontuação aumentar/diminuir (dependendo da precisão da resposta) e um novo card deverá entrar na tela                                                                                                           |
| 4      | clicar no botão "começar" do material de apoio do minigame 2, acessado conforme o caso de teste #2                                                                                                                                                                            | clicar em uma das quatro opções de resposta, localizadas na parte inferior do _card_ na tela                              | o _card_ deverá sair da tela, a pontuação aumentar/diminuir (dependendo da precisão da resposta) e um dos _cards_ laterais deve ocupar a posição do _card_ antigo                                                                               |
| 5      | clicar no botão "começar" do material de apoio do minigame 3, acessado conforme o caso de teste #2                                                                                                                                                                            | arrastar qualquer um dos _cards_ presentes na parte superior da tela para a linha do tempo, localizada na parte inferior  | o _card_ deverá assumir a posição na linha do tempo, não permitindo que outro _card_ seja arrastado para a mesma posição                                                                                                                        |
| 6      | clicar no botão "começar" do material de apoio do minigame 3, acessado conforme o caso de teste #2                                                                                                                                                                            | arrastar cada um dos _cards_ presentes na parte superior para uma posição na linha do tempo, localizada na parte inferior | o botão "finalizar" deverá aparecer na tela. Ao ser clicado, apresentará a pontuação do jogador na tela                                                                                                                                         |
| 7      | clicar no botão "começar" do material de apoio do minigame 3, acessado conforme o caso de teste #2                                                                                                                                                                            | arrastar um _card_ presente na parte superior da tela para cima de outro _card_ presente na parte superior, sobrepondo-o  | o jogo deverá impedir que os _cards_ se sobreponham, movimentando o _card_ lateralmente                                                                                                                                                         |
| 8      | executar todas as tarefas de um _minigame_, chegando na tela de pontuação. A tela de pontuação apresenta a pontuação do jogador no _minigame_, a pontuação acumulada e um botão de voltar ao mapa                                                                             | clicar no botão: "Voltar ao mapa"                                                                                         | o jogo deverá retornar para a _hub_, mantendo a progressão da música, além do posicionamento anterior do jogador                                                                                                                                |
| 9      | o caso de teste #2 e #8 já foram realizados                                                                                                                                                                                                                                   | quando o jogador chegar no objeto que foi interagido no caso de teste #2, apertar a barra de espaço                       | o jogo deverá impedir que o _minigame_ ocorra novamente, e o pop-up explicando o botão para apertar não deverá aparecer                                                                                                                         |
| 10     | O botão "Novo Jogo" da cena do menu inicial foi clicado, e o botão "Começar" da cena seguinte foi clicado                                                                                                                                                                     | clicar e uma das quatro das opções de personagem jogáveis, e depois apertar o botão "Selecionar"                          | o personagem selecionado deverá aparecer nas cenas da hub do jogo, com as animações correspondentes a seleção do jogador                                                                                                                        |
| 11     | clicar no botão "começar" do material de apoio do minigame 4, acessado conforme o caso de teste #2, e clicar em uma das quatro opções presentes na tela                                                                                                                       | selecionar uma cor do lado esquerdo, e clicar e arrastar com o botão esquerdo na área branca da tela                      | o rastro do mouse deverá aparecer na cor escolhida                                                                                                                                                                                              |
| 12     | clicar no botão "começar" do material de apoio do minigame 5, acessado conforme o caso de teste #2. Depois disso, conectar um _card_ do lado direito com uma definição presente no lado direito. A conexão é realizada ao clicar no _card_ e arrastar a linha até a definição | arrastar a linha de um _card_ vazio para a definição que já foi conectada                                                 | o jogo deverá impedir que a linha se conecte                                                                                                                                                                                                    |
| 13     | clicar no botão "começar" do material de apoio do minigame 6, acessado conforme o caso de teste #2                                                                                                                                                                            | apertar o botão verde ou vermelho, presente na parte inferior da tela                                                     | o jogo deverá atualizar a pontuação no canto superior da tela, conforme a precisão da resposta                                                                                                                                                  |
| 14     | iniciar o material de apoio de algum minigame, conforme o caso de teste #2                                                                                                                                                                                                    | clicar no botão de seguir adiante, e depois clicar no botão de voltar atrás, para todas as páginas do material            | o jogo deverá transicionar as cenas avançando e retornando na explicação dos conceitos                                                                                                                                                          |
| 15     | terminar os três _minigames_ presentes na _hub_ do dia 1, e clicar no botão "Começar" na tela que aparece em seguida                                                                                                                                                          | responder uma questão do _miniboss_, clicando em uma das alternativas apresentadas                                        | o jogo deverá apresentar uma tela de _feedback_ da resposta, conforme a precisão da seleção                                                                                                                                                     |
| 16     | responder todas as perguntas do _miniboss_ do dia 1                                                                                                                                                                                                                           | clicar no botão "Voltar ao mapa"                                                                                          | a capa de um jornal deverá aparecer na tela, conforme a pontuação do jogador. Se ele tiver uma pontuação total inferior a -100 pontos, o botão de Game Over deverá aparecer. Caso tenha uma pontuação maior, o botão de Avançar deverá aparecer |
| 17     | terminar o _miniboss_ com uma pontuação inferior a -100 pontos                                                                                                                                                                                                                | clicar no botão de Game Over na tela do jornal                                                                            | o jogo deverá reiniciar a aba do navegador, trazendo o jogador de volta para o início                                                                                                                                                           |
| 18     | terminar o _miniboss_ com uma pontuação superior a -100 pontos                                                                                                                                                                                                                | clicar no botão de Continuar na tela do jornal, e clicar no botão "começar" na tela de apoio seguinte                     | o jogo deverá transicionar para a _hub_ do dia 2, e a música de fundo deverá ser diferente da _hub_ do dia 1                                                                                                                                    |
| 19     | o jogador estar localizado em uma das hubs do jogo                                                                                                                                                                                                                            | apertar as setinhas do teclado para movimentar o personagem                                                               | sons de passos deverão ser tocados, parando quando o jogador também parar de se movimentar                                                                                                                                                      |
| 20     | o jogador acessar a Sala de Guerra, ao apertar a barra de espaço ao lado do objeto com o ponto de exclamação na hub da Sala de Guerra                                                                                                                                         | responder as perguntas presentes na tela, clicando em uma das respostas na parte inferior                                 | o jogo deverá validar a resposta, atualizando o placar de pontuação. Além disso, o _timer_ também deverá continuar, diminuindo o tempo                                                                                                          |

## 5.2. Testes de jogabilidade (playtests) (sprint 4)

### 5.2.1 Registros de testes
#### 5.2.1.1. Teste 1
Informações  | Resposta
--- | ---
Teste realizado por | Luisa
Dia | 03/04/2025
Já possuía experiência prévia com games? |Não	
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Sim,mas não absorveu o conteúdo do material de apoio
Que nota deu ao jogo?|9
O que gostou no jogo?|
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|Falar que tem mais coisas depois da fase 1, se não parece que o jogo acabou/deixar mais óbvio que a tela de carregamento terminou/falar que pontuação baixa dá game over
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2025)</sup> <br>
#### 5.2.1.2. Teste 2
<sup>Quadro 6 - Playtest</sup>
Informações  | Resposta
--- | ---
Teste realizado por | Renan
Dia | 03/04/2025
Já possuía experiência prévia com games? |Sim
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Não
Que nota deu ao jogo?|9
O que gostou no jogo?|
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|Explicar melhor o propósito da pontuação
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2024)
#### 5.2.1.3. Teste 3
Informações  | Resposta
--- | ---
Teste realizado por | Matheus
Dia | 03/04/2025
Já possuía experiência prévia com games? |Muito pouco	
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Apenas no minigame 1
Que nota deu ao jogo?|9
O que gostou no jogo?|
O jogo pareceu intuitivo?|Sim,mas ficou em dúvida de arrastar e setinhas no a/f
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|deixar claro que a ordem no miniboss é do MG3/deixar botão voltar mais claro
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2025)</sup> <br>
#### 5.2.1.4. Teste 4
<sup>Quadro 6 - Playtest</sup>
Informações  | Resposta
--- | ---
Teste realizado por | Tatiane
Dia | 03/04/2025
Já possuía experiência prévia com games? |Sim	
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Não
Que nota deu ao jogo?|10
O que gostou no jogo?|
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|Explicação do material de apoio sobre fundos não ficou claro que aquilo eram caracteristícas do fundo/As setinhas podem confundir a pessoa porque como quando ela volta de um minigame é difícil entender/Não perder ponto quando errar/Deixar em cinza o caminho para o qual você já foi
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2024)</sup> <br>
#### 5.2.1.5. Teste 5

Informações  | Resposta
--- | ---
Teste realizado por | Luana
Dia | 03/04/2025
Já possuía experiência prévia com games? |Jogos simples
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Não
Que nota deu ao jogo?|9
O que gostou no jogo?|
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|letra mais legivel/falar de todos os tipos de fundos antes de definir um por um/botao + e - mais claros do que fazem/mostrar tempo estimado do dia
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2025)</sup> <br>
#### 5.2.1.6. Teste 6

Informações  | Resposta
--- | ---
Teste realizado por | Ryan
Dia | 03/04/2025
Já possuía experiência prévia com games? |Um pouco	
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Sim,Teve dificuldade com a tela de preloading, parece que é pra colocar o nome.
Que nota deu ao jogo?|10
O que gostou no jogo?|Trilha Sonora
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|Botão de voltar/Tirar as setinhas nos apoios dos minigames
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2025)</sup> <br>
#### 5.2.1.7. Teste 7

Informações  | Resposta
--- | ---
Teste realizado por | Vitor
Dia | 03/04/2025
Já possuía experiência prévia com games? |Sim	
Conseguiu iniciar o jogo?	| Sim,mas não sabia onde estava o botão
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|poucas
Que nota deu ao jogo?|8
O que gostou no jogo?|Interações,sons e setes
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|novo jogo mais obvio/não leu os textos, mas talvez por conta da indicacao no minigame 2/todo mundo erra a linha do tempo
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2025)</sup> <br>
#### 5.2.1.8. Teste 8

Informações  | Resposta
--- | ---
Teste realizado por | Lucas
Dia | 03/04/2025
Já possuía experiência prévia com games? |Sim	
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Não
Que nota deu ao jogo?|10
O que gostou no jogo?|
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?|novo jogo mais nítido/drag and drop MG1
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim

<sup>Fonte: Material produzido pelos autores (2025)</sup> <br>
#### 5.2.1.9. Teste 9
Informações  | Resposta
--- | ---
Teste realizado por | Rafael
Dia | 03/04/2025
Já possuía experiência prévia com games? |Sim,um pouco
Conseguiu iniciar o jogo?	| Sim
Entendeu as regras e mecânicas do jogo?|Sim
Conseguiu progredir no jogo?|Sim
Apresentou dificuldades?|Não
Que nota deu ao jogo?|10
O que gostou no jogo?|dinâmica dos minigames
O jogo pareceu intuitivo?|Sim
Teve algum bug ou problema técnico?|Não
O que poderia melhorar no jogo?
A interface estava clara para utilizar?|Sim
As mecânicas dos minigames eram intuitivas?|Sim
As indicações da hub estavam claras?|Sim
A movimentação do personagem estava fluida?|Sim
A trilha sonora estava boa?|Sim
As animações entre as telas estava fluída?|Sim
Os botões da interface estão claros?|Sim


<sup>Fonte: Material produzido pelos autores (2025)</sup> <br>



### 5.2.2 Melhorias

Com base no feedback dos testadores, implementamos as seguintes melhorias:

##### 1. Clareza da Tela de Carregamento
- Adicionamos indicadores visuais mais explícitos
- Incluímos mensagens textuais explicativas
- Implementamos uma barra de progresso animada
- *Objetivo*: Deixar claro o status do carregamento e evitar a impressão de que o jogo terminou

##### 2. Melhorias no Botão de Iniciar
-Adicionamos uma animação para o botão de iniciar
-Adicionamos outros botões no menu inicial
- *Resultado*: Tornar o início do jogo mais intuitivo

##### 3. Aprimoramentos no Botão de Voltar
- Implementamos um novo design consistente para o botão de voltar
- Aumentamos a área clicável para melhor usabilidade
- *Benefício*: Melhorar a navegação entre telas do material de apoio

**Impacto Geral**:
- Experiência mais fluida para novos jogadores
- Redução de pontos de confusão identificados nos testes
- Interface mais intuitiva e acessível

> "Todas as alterações foram baseadas no feedback direto dos jogadores durante as sessões de teste" - Grupo Level Zero

# <a name="c6"></a>6. Conclusões e trabalhos futuros (sprint 5)

_Escreva de que formas a solução do jogo atingiu os objetivos descritos na seção 1 deste documento. Indique pontos fortes e pontos a melhorar de maneira geral._

_Relacione os pontos de melhorias evidenciados nos testes com plano de ações para serem implementadas no jogo. O grupo não precisa implementá-las, pode deixar registrado aqui o plano para futuros desenvolvimentos._

_Relacione também quaisquer ideias que o grupo tenha para melhorias futuras_

# <a name="c7"></a>7. Referências (sprint 5)

ALIYACH. Portrait Accurate NPC Sprites. Nexus Mods, 2023. Disponível em: https://www.nexusmods.com/stardewvalley/mods/17289. Acesso em: 27 fev. 2025.

ANBIMA. Fundos de investimento registram captação líquida positiva de R$ 40,1 bilhões em abril. ANBIMA, 2024. Disponível em: https://www.anbima.com.br/pt_br/informar/relatorios/fundos-de-investimento/boletim-de-fundos-de-investimentos/fundos-de-investimento-registram-captacao-liquida-positiva-de-r-40-1-bilhoes-em-abril-8A2AB28B8F54B5C5018F59D76D9666C9-00.htm. Acesso em: 28 mar. 2025.

ASANA. Análise SWOT/FOFA: o que é e como usá-la (com exemplos). 24 fev. 2025. Disponível em: https://asana.com/pt/resources/swot-analysis. Acesso em: 29 fev. 2025.

BERWIG, Daniel. Valuation: análise de caso do Banco BTG Pactual S.A. 2023. Disponível em: https://lume.ufrgs.br/handle/10183/273883. Acesso em: 28 mar. 2025.

BTG PACTUAL. Negócio e Histórico, 2025. Disponível em: https://ri.btgpactual.com/sobre-o-banco/negocio-e-historico/#:~:text=O%20Banco%20BTG%20Pactual%20%C3%A9,internacional%20de%20investimentos%20e%20distribui%C3%A7%C3%A3o. Acesso em: 23 fev. 2025.

BTG PACTUAL. Nosso DNA: Valores, [s.d.]. Disponível em: https://www.btgpactual.com/nosso-dna/valores. Acesso em: 28 fev. 2025.

BRASIL. Instituto Brasileiro de Geografia e Estatística (IBGE). Censo Demográfico 2022: Resultados preliminares. Rio de Janeiro, 2022. Disponível em: https://www.ibge.gov.br. Acesso em: 24 mar. 2025.

DEEP-FOLD. PixelSpace. GitHub, 2021. Disponível em: https://github.com/Deep-Fold/PixelSpace. Acesso em: 27 fev. 2025.

BRULLOV. Fire animation - Pixel Art FX Sprites. Itch.io, 2019. Disponível em: https://brullov.itch.io/fire-animation. Acesso em: 8 abr. 2025.

HALLIDAY, David; RESNICK, Robert; WALKER, Jearl. Fundamentos de Física: Mecânica – Volume 1. 12. ed. Rio de Janeiro: LTC, 2023.

MAGRETTA, Joan. Entendendo Michael Porter: o guia essencial da competição e estratégia. Rio de Janeiro: Alta Books, 2019. 1 recurso online. ISBN 9788550805047. Disponível em: https://integrada.minhabiblioteca.com.br/books/9788550805047. Acesso em: 23 fev. 2025.

MOBA, RPG, MMORPG, FPS e mais: entenda significado dos gêneros de games. Disponível em: https://www.techtudo.com.br/noticias/2021/03/moba-rpg-mmorpg-fps-e-mais-entenda-significado-dos-generos-de-games.ghtml. Acesso em: 23 fev. 2025.

OSTERWALDER, Alexander et al. Value proposition design: How to create products and services customers want. John Wiley & Sons, 2015.

POLTERGEISTERS. Slightly Cuter Character Sprites. Nexus Mods, 2017. Disponível em: https://www.nexusmods.com/stardewvalley/mods/1437. Acesso em: 27 fev. 2025.

PORTER, Michael E.; MONTGOMERY, Catherine. A busca da vantagem competitiva\*. Rio de Janeiro: Campus, 1998.

PROJECT MANAGEMENT INSTITUTE. A Guide to the Project Management Body of Knowledge (PMBOK® Guide). 6. ed. Newtown Square, PA: Project Management Institute, 2017.

RIBEIRO, Luis Henrique de Oliveira; SODRÉ, Marina Fernandes; ALBUQUERQUE JUNIOR, Carlos Roberto Falcão de. A ascenção dos bancos digitais na era moderna: uma análise qualitativa através de ferramentas do planejamento estratégico. Brazilian Journal of Development, Curitiba, v. 8, n. 1, p. 4213-4226, jan. 2022.

SEBRAE. Como determinar o público-alvo da sua empresa. Portal Sebrae, 8 maio 2023. Disponível em: https://sebrae.com.br/sites/PortalSebrae/artigos/como-determinar-o-publico-alvo-da-sua-empresa,fa1c7553c86c6810VgnVCM1000001b00320aRCRD. Acesso em: 28 mar. 2025.

# <a name="c8"></a>Anexos

_Inclua aqui quaisquer complementos para seu projeto, como diagramas, imagens, tabelas etc. Organize em sub-tópicos utilizando headings menores (use ## ou ### para isso)_
