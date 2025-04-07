class selecaoPersonagens extends baseCena {
  constructor() {
    super("selecaoPersonagens");
    this.personagemSelecionado = { numero: -1 };
    this.personagens = ["Mary", "Mark", "Margaret", "Steve"];
    this.estadosBotoes = ["", "Selecao", "Selecionado", "SelecionadoSelecao"];
    this.musicaFundo;
    this.clique;
    this.somFinalizar;
  }

  create() {
    //Adição da música de fundo, colocando ela em loop
    this.musicaFundo = this.sound.add("musicaFundo", { loop: true });
    this.musicaFundo.play();

    //Adição de outros sons
    this.somFinalizar = this.sound.add("somFinalizar", { volume: 2 });
    this.clique = this.sound.add("clique");

    this.add.image(400, 300, "fundo").setDepth(-1);

    this.texto = this.add.text(100, 90, "confiamos em você, ...uhh", {
      fontFamily: "pixelArt",
      color: "#ffffff",
      fontSize: "24px",
    });

    for (let i = 1; i < 5; i++) {
      this.add.rectangle(160 * i, 300, 140, 300, 0xffffff).setAlpha(0.25);
    }

    //Adiciona os botões de seleção dos personagens
    this.botao0 = this.add
      .image(160, 300, "botaoMary")
      .setInteractive()
      .setDepth(10)
      .setOrigin(0.5, 0.5);
    this.botao1 = this.add
      .image(320, 300, "botaoMark")
      .setInteractive()
      .setDepth(10)
      .setOrigin(0.5, 0.5);
    this.botao2 = this.add
      .image(480, 300, "botaoMargaret")
      .setInteractive()
      .setDepth(10)
      .setOrigin(0.5, 0.5);
    this.botao3 = this.add
      .image(640, 300, "botaoSteve")
      .setInteractive()
      .setDepth(10)
      .setOrigin(0.5, 0.5);

    this.botaoSelecionar = this.add
      .image(400, 520, "botaoSelecionarDesativado")
      .setInteractive()
      .setDepth(11)
      .setOrigin(0.5, 0.5)
      .setAlpha(0.5);

    //Permite a interação com os botões, mudando o visual quando o cursor está em cima e quando é clicado
    for (let i = 0; i < 4; i++) {
      let botao = this[`botao${i}`];

      botao.on("pointerover", () => {
        if (this.personagemSelecionado.numero === i) {
          botao.setTexture(
            "botao" + this.personagens[i] + "SelecionadoSelecao"
          );
        } else {
          botao.setTexture("botao" + this.personagens[i] + "Selecao");
        }
      });
      botao.on("pointerout", () => {
        if (this.personagemSelecionado.numero === i) {
          botao.setTexture("botao" + this.personagens[i] + "Selecionado");
        } else {
          botao.setTexture("botao" + this.personagens[i]);
        }
      });

      botao.on("pointerdown", () => {
        if (!transicionando) {
          this.personagemSelecionado.numero = i;
          this.clique.play();
          this.botao0.setTexture("botao" + this.personagens[0]);
          this.botao1.setTexture("botao" + this.personagens[1]);
          this.botao2.setTexture("botao" + this.personagens[2]);
          this.botao3.setTexture("botao" + this.personagens[3]);

          botao.setTexture("botao" + this.personagens[i] + "SelecionadoSelecao");

          this.botaoSelecionar.setTexture("botaoSelecionarAtivado").setAlpha(1);

          this.texto.setText(
            "confiamos em você, " +
            this.personagens[this.personagemSelecionado.numero] +
            "!"
          );
        }
      });
    }

    //Quando o botão de seleção é pressionado, a cena da hub é iniciada, passando o valor do personagem selecionado
    this.botaoSelecionar.on("pointerdown", () => {
      if (this.personagemSelecionado.numero > -1 && !transicionando) {
        this.musicaFundo.stop();
        this.somFinalizar.play();
        this.transicao('hub', false, false, false, 200);
      }
    });
  }
}
