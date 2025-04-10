class apoioSalaDeGuerra extends baseCena {
    constructor() {
      super("apoioSalaDeGuerra");
      // Armazena a página atual do tutorial
      this.paginaAtiva = 0;
      // Arrays com os tutoriais de cada minigame
      this.texto = [
        `Bem-vindo ao caos!
        
A crise atingiu seu ponto máximo e todos dependem de você. Agora, é hora de mostrar tudo o que aprendeu até aqui. Você enfrentará um grande desafio: responder 12 perguntas que abrangem todo o seu treinamento, sendo 2 perguntas de cada minigame. Para garantir a vitória, você precisa alcançar uma taxa de acerto de pelo menos 75% - ou seja, acertar no mínimo 9 perguntas. A pressão é real, e você terá apenas 10 minutos.

 Boa sorte! Toda a empresa está contando com você.
`,
      ];
    }
  
    create() {
      this.cameras.main.setBounds(0, 0, 800, 600);
      // Configura o fundo
      this.imailFundo = this.add.image(400, 300, "imailFundo");
  
      // Configura o som de fundo
      this.somFundo = this.sound.add("somFundo", { loop: true });
      this.somFundo.play();
  
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
        if (!this.atrasoClick && this.paginaAtiva > 0) {
          this.atrasoClick = true;
          this.sound.play("clique"); // Toca o som de clique
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
        this.somFundo.stop();
        this.textoTutorial.setText(this.texto[0]);
        this.transicao('hubFinal', false, false, false, 200,);
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