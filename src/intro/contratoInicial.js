class contratoInicial extends Phaser.Scene {
  constructor() {
    super("contratoInicial");
    this.somAdiante;
    // Armazena a página atual do tutorial
    this.paginaAtiva = 0;
    // Arrays com os tutoriais de cada minigame
    this.texto = [
      `Seja muito bem-vindo(a)! Na crise atual do mundo financeiro, precisamos de sua ajuda para garantir o crescimento da empresa. 
            
Ao redor do nosso escritório estão 3 tarefas para você realizar. Elas estão demarcadas por pontos de exclamação.

Movimente-se com as setinhas do teclado ou WASD e interaja com essas tarefas utilizando a barra de espaço ou clicando E! 

Confiamos em você...`,
    ];
  }

  preload() {
    // Carrega os assets necessários
    this.load.image("imailFundo", "src/assets/materiais_apoio/Slick.png");
    this.load.image(
      "botaoProximo",
      "src/assets/materiais_apoio/botaoProximo.png"
    );
    this.load.image(
      "botaoAnterior",
      "src/assets/materiais_apoio/botaoAnterior.png"
    );
    this.load.image(
      "botaoComecar",
      "src/assets/materiais_apoio/botaoComecar.png"
    );
    this.load.image("selecao", "src/assets/materiais_apoio/selecao.png");
    this.load.image(
      "selecaoDesistir",
      "src/assets/materiais_apoio/selecaoDesistir.png"
    );

    // Carrega o som de clique
    this.load.audio("clique", "src/assets/dia2/miniGame4/sons/clique.mp3");
    this.load.audio("somAdiante", "src/assets/sounds/clique.mp3");

    //  Cria as variáveis da tela de loading
    let barraProgresso = this.add.graphics();
    let caixaProgresso = this.add.graphics();
    caixaProgresso.fillStyle(0x222222, 0.8);
    caixaProgresso.fillRect(240, 270, 320, 50);

    //  Atualiza ao vivo a barra de progresso
    this.load.on("progress", function (value) {
      barraProgresso.clear();
      barraProgresso.fillStyle(0xffffff, 1);
      barraProgresso.fillRect(250, 280, 300 * value, 30);
    });

    //  Quando o jogo termina de carregar, a barra é destruída
    this.load.on("complete", function () {
      barraProgresso.destroy();
      caixaProgresso.destroy();
    });
  }

  create() {
    // Configura o som de troca de cenas
    this.somAdiante = this.sound.add("somAdiante");

    // Configura o fundo
    this.imailFundo = this.add.image(400, 300, "imailFundo");

    // Adiciona o texto do tutorial
    this.textoTutorial = this.add
      .text(185, 95, this.texto[this.paginaAtiva], {
        fontFamily: "pixelArt",
        color: "#324891",
      })
      .setWordWrapWidth(600);

    // Configura os botões
    this.botaoProximo = this.add
      .image(
        660,
        555,
        this.paginaAtiva === this.texto.length - 1
          ? "botaoComecar"
          : "botaoProximo"
      )
      .setInteractive();
    this.botaoAnterior = this.add
      .image(300, 555, "botaoAnterior")
      .setVisible(false)
      .setInteractive();

    // Variável para controlar cliques repetidos
    this.atrasoClick = false;

    // Evento do botão "próximo"
    this.botaoProximo.on("pointerdown", (pointer) => {
      if (!this.atrasoClick) {
        this.atrasoClick = true;
        this.fadeOut(() => {
          this.paginaAtiva++;
          this.updateTutorialText();
          this.fadeIn();
        });
      }
    });

    // Evento do botão "anterior"
    this.botaoAnterior.on("pointerdown", (pointer) => {
      if (!this.atrasoClick && this.paginaAtiva > 0) {
        this.atrasoClick = true;
        this.fadeOut(() => {
          this.paginaAtiva--;
          this.updateTutorialText();
          this.fadeIn();
        });
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
  }

  // Atualiza o texto do tutorial e os botões
  updateTutorialText() {
    this.textoTutorial.setText(this.texto[this.paginaAtiva]);

    // Mostra ou esconde o botão "anterior"
    if (this.paginaAtiva > 0) {
      this.botaoAnterior.setVisible(true).setInteractive(true);
    } else {
      this.botaoAnterior.setVisible(false).setInteractive(false);
    }

    // Altera o botão "próximo" para "começar" na última página
    if (this.paginaAtiva === this.texto.length - 1) {
      this.botaoProximo.setTexture("botaoComecar");
    } else {
      this.botaoProximo.setTexture("botaoProximo");
    }

    // Inicia o minigame ao clicar em "começar"
    if (this.paginaAtiva === this.texto.length) {
      this.paginaAtiva = 0;
      this.textoTutorial.setText(this.texto[0]);
      this.somAdiante.play();
      musicaIntro.stop();
      game.scene.start("selecaoPersonagens");
      game.scene.stop("contratoInicial");
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
