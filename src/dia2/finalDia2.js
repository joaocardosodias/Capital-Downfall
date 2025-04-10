class finalDia2 extends baseCena {
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
    this.cameras.main.setBounds(0, 0, 800, 600);

    // Adição da transição
    this.telaPreta = this.add
      .rectangle(400, 300, 800, 600, 0x000000)
      .setAlpha(1)
      .setDepth(1000);

    transicionando = true;
    this.tweens.add({
      targets: this.telaPreta,
      alpha: 0,
      duration: 2000,
      onComplete: () => {
        this.telaPreta.destroy()
        transicionando = false;
      },
    });

    // Para a música da hub, e cria os sons utilizados
    musicaHub2.stop();
    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });

    // O código a seguir verifica a pontuação do jogador durante o dia 2, e define um final de acordo com sua performance

    if (pontuacao < 700) {
      this.somErro.play();
      this.add.image(400, 300, "jornalFalido");
      this.falido = true;

      this.botaoGameOver = this.add.sprite(610, 535, "gameOver").setInteractive().setScale(2);
      this.botaoGameOver.anims.play("gameOver", true)
      this.botaoGameOver.on("pointerdown", () => {
        if (!transicionando) {
          this.scene.stop("finalDia2");
          window.location.reload();
        }
      });
    }

    if (pontuacao >= 700) {
      this.somAcerto.play();
      this.add.image(400, 300, "jornalCrescimento");
      this.Crescimento = true;

      this.botaoContinuar = this.add.sprite(150, 535, "continuar").setInteractive().setScale(2);
      this.botaoContinuar.anims.play("continuar", true)
      this.botaoContinuar.on("pointerdown", () => {
        if (!transicionando) {
          this.scene.stop("finalDia2");
          //Reinicia a pontuação antes de começar a Sala de Guerra
          pontuacao = 0;
          this.scene.start("movimento");
        }
      });
    }
  }
}
