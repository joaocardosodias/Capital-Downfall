class finalDia2 extends Phaser.Scene {
  constructor() {
    super("finalDia2");
    this.falido = false;
    this.semCrescimento = false;
    this.Crescimento = false;
    this.botaoContinuar;
    this.botaoGameOver;
    this.somAcerto;
    this.somErro;
  }
  preload() {
    this.load.image(
      "jornalCrescimento",
      "src/assets/telas_pontuacao/jornalCrescimento.png"
    );
    this.load.image(
      "jornalFalido",
      "src/assets/telas_pontuacao/jornalFalido.png"
    );
    this.load.image(
      "jornalSemCrescimento",
      "src/assets/telas_pontuacao/jornalSemCrescimento.png"
    );
    this.load.image("continuar", "src/assets/telas_pontuacao/continuar.png");
    this.load.image("gameOver", "src/assets/telas_pontuacao/gameOver.png");

    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");

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
    musicaHub2.stop();
    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });

    // O código a seguir verifica a pontuação do jogador durante o dia 1, e define um final de acordo com sua performance
    // Futuramente, essa seção também redirecionará para o gameOver, além do dia 2
    if (pontuacao < 200) {
      this.somErro.play();
      this.add.image(400, 300, "jornalFalido");
      this.falido = true;
      this.botaoGameOver = this.add.image(100, 75, "gameOver").setInteractive();
      this.botaoGameOver.on("pointerdown", () => {
        this.scene.stop("finalDia2");
        window.location.reload();
      });
    }

    if (400 > pontuacao && pontuacao >= 200) {
      this.somAcerto.play();
      this.add.image(400, 300, "jornalSemCrescimento");
      this.semCrescimento = true;
      this.botaoContinuar = this.add
        .image(100, 75, "continuar")
        .setInteractive();
      this.botaoContinuar.on("pointerdown", () => {
        this.scene.stop("finalDia2");
        this.scene.start("salaDeGuerra");
      });
    }

    if (pontuacao >= 400) {
      this.somAcerto.play();
      this.add.image(400, 300, "jornalCrescimento");
      this.Crescimento = true;
      this.botaoContinuar = this.add
        .image(100, 75, "continuar")
        .setInteractive();
      this.botaoContinuar.on("pointerdown", () => {
        this.scene.stop("finalDia2");
        this.scene.start("movimento");
      });
    }
  }
}
