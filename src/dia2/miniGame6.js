class miniGame6 extends Phaser.Scene {
  constructor() {
    super("miniGame6");
    this.imagens = [];
    this.imagemAtual = null;
    this.botaoAprovado = null;
    this.botaoReprovado = null;
    this.placarTexto = null;
    this.clickSound = null; // Som de clique
  }

  preload() {
    this.load.image("imagem1", "src/assets/dia2/miniGame6/imagemgame6.png");
    this.load.image("imagem3", "src/assets/dia2/miniGame6/imagem3game6.png");
    this.load.image("botao", "src/assets/dia2/miniGame6/imagem2game6.png");
    this.load.image("pedro", "src/assets/dia2/miniGame6/imagem4game6.png");
    this.load.image("ana", "src/assets/dia2/miniGame6/imagem5game6.png");
    this.load.image(
      "botaoaprovado",
      "src/assets/dia2/miniGame6/imagem7game6.png"
    );
    this.load.image(
      "botaoreprovado",
      "src/assets/dia2/miniGame6/imagem6game6.png"
    );
    this.load.image("vagner", "src/assets/dia2/miniGame6/imagem8game6.png");
    this.load.image("amanda", "src/assets/dia2/miniGame6/imagem9game6.png");
    this.load.image("bruna", "src/assets/dia2/miniGame6/imagem10game6.png");

    // Carrega o som de clique
    this.load.audio("click", ["src/assets/dia2/miniGame4/click.mp3"]); // Substitua pelo caminho do seu som
  }

  create() {
    this.cameras.main.setBackgroundColor("#195A4B");
    this.imagens = [
      { key: "bruna", pontosAprovado: 100, pontosReprovado: -50 },
      { key: "amanda", pontosAprovado: 100, pontosReprovado: -50 },
      { key: "vagner", pontosAprovado: 100, pontosReprovado: -50 },
      { key: "ana", pontosAprovado: -50, pontosReprovado: 100 },
      { key: "pedro", pontosAprovado: -50, pontosReprovado: 100 },
    ];

    this.imagens = Phaser.Utils.Array.Shuffle(this.imagens);

    this.placarTexto = this.add.text(20, 20, `Pontuação: ${pontuacao}`, {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    // Carrega o som de clique
    this.clickSound = this.sound.add("click");

    this.exibirProximaImagem();
  }

  exibirProximaImagem() {
    if (this.imagemAtual) {
      this.imagemAtual.destroy();
    }

    if (this.botaoAprovado) {
      this.botaoAprovado.destroy();
      this.botaoReprovado.destroy();
    }

    if (this.imagens.length > 0) {
      const proximaImagem = this.imagens.pop();

      this.imagemAtual = this.add
        .image(
          this.sys.game.config.width / 2,
          this.sys.game.config.height / 2,
          proximaImagem.key
        )
        .setScale(0.8);

      this.botaoAprovado = this.add
        .image(75, this.sys.game.config.height, "botaoaprovado")
        .setInteractive()
        .setScale(1.5)
        .setOrigin(0, 1)
        .on("pointerdown", () => {
          this.clickSound.play(); // Reproduz o som de clique
          this.avaliarImagem(proximaImagem.pontosAprovado);
        });

      this.botaoReprovado = this.add
        .image(
          this.sys.game.config.width,
          this.sys.game.config.height,
          "botaoreprovado"
        )
        .setInteractive()
        .setScale(1.5)
        .setOrigin(1, 1)
        .on("pointerdown", () => {
          this.clickSound.play(); // Reproduz o som de clique
          this.avaliarImagem(proximaImagem.pontosReprovado);
        });
    } else {
      this.exibirResultadoFinal();
    }
  }

  avaliarImagem(pontos) {
    pontuacao += pontos;

    this.placarTexto.setText(`Pontuação: ${pontuacao}`);

    this.exibirProximaImagem();
  }

  exibirResultadoFinal() {
    this.imagemAtual.destroy();

    this.botaoAprovado.destroy();
    this.botaoReprovado.destroy();

    this.add
      .text(400, 200, "Resultado", { fontSize: "40px", fill: "#fff" })
      .setOrigin(0.5);

    // Exibe a pontuação obtida
    this.add
      .text(400, 350, `Pontuação: ${pontuacao}`, {
        fontSize: "30px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    // Botão para voltar à hub
    let botaoVoltar = this.add
      .text(400, 400, "Voltar", {
        fontSize: "30px",
        fill: "#fff",
        backgroundColor: "#333",
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive();

    botaoVoltar.on("pointerdown", () => {
      this.clickSound.play(); // Reproduz o som de clique
      minigame6Jogado = true;
      this.scene.wake("hub2"); //Se você clicar no botão Voltar, você volta pra hub do jogo
      this.scene.stop("miniGame6");
    });
  }
}