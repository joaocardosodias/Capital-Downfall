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

  create() {
    musicaHub2.stop();
    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });

    // O código a seguir verifica a pontuação do jogador durante o dia 1, e define um final de acordo com sua performance
    // Futuramente, essa seção também redirecionará para o gameOver, além do dia 2
    if (pontuacao < 1050) {
      this.somErro.play();
      this.add.image(400, 300, "jornalFalido");
      this.falido = true;
      this.botaoGameOver = this.add.image(100, 75, "gameOver").setInteractive();
      this.botaoGameOver.on("pointerdown", () => {
        this.scene.stop("finalDia2");
        window.location.reload();
      });
    }

    if (pontuacao >= 1050) {
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
