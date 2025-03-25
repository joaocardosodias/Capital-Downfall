class finalDia2 extends Phaser.Scene {
    constructor() {
      super("finalDia2");
      this.falido = false;
      this.semCrescimento = false;
      this.Crescimento = false;
      this.botaoContinuar;
      this.botaoGameOver;
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
    }
    create() {
      // O código a seguir verifica a pontuação do jogador durante o dia 1, e define um final de acordo com sua performance
      // Futuramente, essa seção também redirecionará para o gameOver, além do dia 2
      if (pontuacao < 200) {
        this.add.image(400, 300, "jornalFalido");
        this.falido = true;
        this.botaoGameOver = this.add.image(100, 75, "gameOver").setInteractive();
        this.botaoGameOver.on("pointerdown", () => {
          this.scene.stop("finalDia2");
          window.location.reload();
        });
      }
  
      if (400 > pontuacao && pontuacao >= 200) {
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
        this.add.image(400, 300, "jornalCrescimento");
        this.Crescimento = true;
        this.botaoContinuar = this.add
          .image(100, 75, "continuar")
          .setInteractive();
        this.botaoContinuar.on("pointerdown", () => {
          this.scene.stop("finalDia2");
          this.scene.start("hubFinal");
        });
      }
    }
  }
  