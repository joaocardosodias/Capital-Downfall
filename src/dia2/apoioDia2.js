let minigameAtual2;
let musicaMinigame4;

class apoioDia2 extends baseCena {
  constructor() {
    super("apoioDia2");
    // Armazena a página atual do tutorial
    this.paginaAtiva = 0;
    // Arrays com os tutoriais de cada minigame
    this.tutoriaisMinigame4 = [
      `Nessa tarefa, você aprenderá sobre os impostos de renda que incidem sobre os fundos de investimento.

Seu objetivo é simples: preste atenção nas instruções e entenda a porcentagem de cada imposto sobre o valor total do investimento. Com base nisso, analise as situações apresentadas e ---> calcule quanto o investidor deverá pagar em impostos. <--- Logo após, clique na resposta correspondente ao valor calculado.

Você pode usar o quadro branco para rascunho de seus cálculos!

Segue em anexo os materiais necessários para a tarefa.

Boa sorte!
`,
      `Os impostos em fundos de investimento são tributos cobrados sobre os rendimentos obtidos pelos investidores, variando conforme o tipo de fundo. Os principais são:
- Imposto de Renda (IR)     aplicado sobre o lucro no momento do resgate ou venda de cotas
- Come-Cotas     uma antecipação semestral do IR em fundos de renda fixa e multimercado
- IOF     aplicado apenas em resgates realizados em menos de 30 dias, com uma alíquota regressiva, começando em 96% no primeiro dia e reduzindo gradualmente até 0% no 30º dia.
            `,
      `É interessante saber que:
- IR em fundos de ações têm alíquota fixa de 15% sobre o lucro,
- IR em fundos imobiliários (FIIs) cobram 20% sobre o ganho de capital na venda de cotas.
- O Come-Cotas é cobrado com alíquota de 20% para fundos de curto prazo e 15% para fundos de longo prazo, convertendo o imposto em cotas do próprio fundo.
- IOF e Come-Cotas não estão presentes em fundos de ação e em fundos imobiliários, apenas em fundos de rendas fixas e de multimercado.
            `,
      `Fórmulas para utilizar:

Imposto = Rendimento × Alíquota de IR

Rendimento = Valor Final - Valor Investido

Valor Final = Valor Investido × (1 + r × t) => para juros simples.

Valor Final = Valor Investido × (1 + r)¥ => para juros compostos.
            `,
    ];
    this.tutoriaisMinigame5 = [
      `Nessa tarefa você precisará aprender sobre diferentes tipos de fundos.

Seu objetivo é simples: relacionar o fundo com a sua respectiva definição.

Para isso, basta clicar em um card que contenha um tipo de fundo e arrastar o mouse até a sua definição para ligar esses conceitos.

Segue em anexo os materiais necessários para a tarefa.
`,
      `Existem diversos tipos de fundos de investimento, cada um com suas características e objetivos.

Esses fundos são uma forma prática de investir em diferentes mercados sem precisar de conhecimento aprofundado sobre cada um deles.

Em cada fundo, o gestor aplica os recursos dos investidores em diferentes ativos, como ações, imóveis, ou títulos de renda fixa, com o objetivo de gerar retornos. 

A seguir estão alguns dos principais tipos de fundos, com uma breve descrição de como funcionam:`,
      `Ações:

- Fundos de ações investem principalmente em ações de empresas listadas na bolsa de valores. São mais voláteis e arriscados, mas oferecem um potencial de retorno maior no longo prazo. - Eles são ideais para investidores que buscam crescimento de capital e estão dispostos a lidar com as flutuações do mercado.
`,
      `Imobiliário:

- Os fundos imobiliários (FII) aplicam recursos em imóveis ou em títulos ligados ao mercado imobiliário, como os CRIs (Certificados de Recebíveis Imobiliários). 
- Esse tipo de fundo permite ao investidor ganhar com a valorização dos imóveis ou com a renda gerada por aluguéis. 
- São considerados investimentos de médio a longo prazo e tendem a ser mais estáveis.
`,
      `Multimercado:

- Os fundos multimercado têm flexibilidade para investir em diferentes ativos, como ações, títulos de renda fixa, moedas e até commodities. 
- Eles buscam estratégias diversificadas para proteger o capital e gerar rentabilidade, oferecendo um equilíbrio entre risco e retorno.
- Esses fundos são ideais para quem busca uma carteira diversificada.
`,
      `Renda Fixa:

- Fundos de renda fixa são aqueles que investem em ativos com rentabilidade previsível, como títulos públicos, CDBs e debêntures. 
- Eles são mais conservadores e seguros, proporcionando um retorno mais estável e baixo risco em relação aos fundos de ações. 
- São ideais para quem busca segurança e estabilidade no retorno.
`,
      `Private Equity:

- Os fundos de private equity investem em empresas privadas com potencial de crescimento. 
- O objetivo é aumentar o valor das empresas ao longo do tempo para, eventualmente, vendê-las com lucro. 
- Esses fundos geralmente exigem uma maior tolerância ao risco, pois envolvem empresas com maior potencial de crescimento, mas também mais instabilidade.
`,
    ];
    this.tutoriaisMinigame6 = [
      `Nessa tarefa, você precisará aprender um pouco sobre os valores de nossa empresa.

Seu objetivo é simples: descobrir qual candidato deve ou não ser aprovado na nossa empresa.

Para isso, basta analisar os candidatos e marcar a alternativa de aprovar ou não aprovar eles

Segue em anexo os materiais necessários para a tarefa.

Boa sorte!
            `,
      `O alinhamento dos funcionários com os valores da empresa fortalece a cultura organizacional, aumenta o engajamento e melhora a colaboração, impactando diretamente o sucesso do negócio. Por isso, é essencial que cada colaborador esteja alinhado à nossa cultura, que valoriza:

- Empreendedorismo e inovação: busca por soluções ágeis e novos aprendizados;
- Liderança: possui uma boa tomada de decisões e motiva a equipe;
- Trabalho em equipe: compartilha conhecimento e respeita as diferenças;
- Proatividade: trabalha com responsabilidade, dedicação e comprometimento.
            `,
    ];
  }

  init(data) {
    // Define o minigame atual com base nos dados recebidos
    if (data.minigameAtual) {
      this.minigameAtual2 = data.minigameAtual;
    }
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);
    //  Configura o som do minigame 4
    musicaMinigame4 = this.sound.add("somFundo", { volume: 1 });
    musicaMinigame4.setLoop(true);

    // Configura o fundo

    this.imailFundo = this.add.image(400, 300, "imailFundo");

    // Adiciona o texto do tutorial
    this.textoTutorial = this.add
      .text(
        185,
        95,
        this["tutoriaisMinigame" + this.minigameAtual2][this.paginaAtiva],
        {
          fontFamily: "pixelArt",
          color: "#324891",
        }
      )
      .setWordWrapWidth(600);

    // Configura os botões
    this.botaoProximo = this.add
      .image(
        660,
        555,
        this.paginaAtiva ===
          this["tutoriaisMinigame" + this.minigameAtual2].length - 1
          ? "botaoComecar"
          : "botaoProximo"
      )
      .setInteractive();
    this.botaoAnterior = this.add
      .image(300, 555, "botaoAnterior")
      .setVisible(false)
      .setInteractive();
    this.botaoDesistir = this.add
      .image(750, 40, "botaoDesistir")
      .setInteractive();

    // Variável para controlar cliques repetidos
    this.atrasoClick = false;

    // Evento do botão "próximo"
    this.botaoProximo.on("pointerdown", (pointer) => {
      if (!this.atrasoClick && !transicionando) {
        this.atrasoClick = true;
        this.sound.play("clique"); // Toca o som de clique
        this.fadeOut(() => {
          this.paginaAtiva++;
          this.updateTutorialText();
          this.fadeIn();
        });
      }
    });

    // Evento do botão "anterior"
    this.botaoAnterior.on("pointerdown", (pointer) => {
      if (!this.atrasoClick && this.paginaAtiva > 0 && !transicionando) {
        this.atrasoClick = true;
        this.sound.play("clique"); // Toca o som de clique
        this.fadeOut(() => {
          this.paginaAtiva--;
          this.updateTutorialText();
          this.fadeIn();
        });
      }
    });

    // Evento do botão "desistir"
    this.botaoDesistir.on("pointerdown", (pointer) => {
      if (!transicionando) {
        this.sound.play("clique"); // Toca o som de clique
        this.paginaAtiva = 0;
        this.textoTutorial.setText(
          this["tutoriaisMinigame" + this.minigameAtual2][0]
        );
        this.transicao('hub2', false, false, true, 200,);
      }
    });

    // Adição do efeito de pointer over nos botões
    this.selecao = this.add
      .image(0, 0, "selecao")
      .setVisible(false)
      .setDepth(100);
    this.selecaoDesistir = this.add
      .image(0, 0, "selecaoDesistir")
      .setVisible(false)
      .setDepth(100);

    this.botaoProximo.on("pointerover", () => {
      this.selecao.setPosition(660, 555).setVisible(true);
    });
    this.botaoProximo.on("pointerout", () => {
      this.selecao.setPosition(0, 0).setVisible(false);
    });

    this.botaoAnterior.on("pointerover", () => {
      this.selecao.setPosition(300, 555).setVisible(true);
    });
    this.botaoAnterior.on("pointerout", () => {
      this.selecao.setPosition(0, 0).setVisible(false);
    });

    this.botaoDesistir.on("pointerover", () => {
      this.selecaoDesistir.setPosition(750, 40).setVisible(true);
    });
    this.botaoDesistir.on("pointerout", () => {
      this.selecaoDesistir.setPosition(0, 0).setVisible(false);
    });
  }

  // Atualiza o texto do tutorial e os botões
  updateTutorialText() {
    this.textoTutorial.setText(
      this["tutoriaisMinigame" + this.minigameAtual2][this.paginaAtiva]
    );

    // Mostra ou esconde o botão "anterior"
    if (this.paginaAtiva > 0) {
      this.botaoAnterior.setVisible(true).setInteractive(true);
    } else {
      this.botaoAnterior.setVisible(false).setInteractive(false);
    }

    // Altera o botão "próximo" para "começar" na última página
    if (
      this.paginaAtiva ===
      this["tutoriaisMinigame" + this.minigameAtual2].length - 1
    ) {
      this.botaoProximo.setTexture("botaoComecar");
    } else {
      this.botaoProximo.setTexture("botaoProximo");
    }

    // Inicia o minigame ao clicar em "começar"
    if (
      this.paginaAtiva ===
      this["tutoriaisMinigame" + this.minigameAtual2].length
    ) {
      this.paginaAtiva = 0;
      this.textoTutorial.setText(
        this["tutoriaisMinigame" + this.minigameAtual2][0]
      );

      musicaHub2.pause();
      if (this.minigameAtual2 === 4) {
        musicaMinigame4.play();
      }
      game.scene.start("miniGame" + this.minigameAtual2);

      game.scene.stop("apoioDia2");
    }
  }

  // Animação de fade-out
  fadeOut(callback) {
    this.tweens.add({
      targets: [
        this.textoTutorial,
        this.botaoProximo,
        this.botaoAnterior,
        this.selecao,
        this.selecaoDesistir,
      ],
      alpha: 0,
      duration: 500,
      onComplete: callback,
    });
  }

  // Animação de fade-in
  fadeIn() {
    this.tweens.add({
      targets: [
        this.textoTutorial,
        this.botaoProximo,
        this.botaoAnterior,
        this.selecao,
        this.selecaoDesistir,
      ],
      alpha: 1,
      duration: 500,
      onComplete: () => {
        this.atrasoClick = false;
      },
    });
  }
}
