class finalDia1 extends baseCena {
  constructor() {
    super("finalDia1");
    this.falido = false;
    this.semCrescimento = false;
    this.Crescimento = false;
    this.botaoContinuar;
    this.botaoGameOver;
    this.somAcerto;
    this.somErro;
    this.clique;
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });
    this.clique = this.sound.add("clique");

    this.anims.create({
      key: "gameOver",
      frames: this.anims.generateFrameNumbers("gameOver", {
        start: 0,
        end: 15,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "continuar",
      frames: this.anims.generateFrameNumbers("continuar", {
        start: 0,
        end: 15,
      }),
      frameRate: 6,
      repeat: -1,
    });

    // O código a seguir verifica a pontuação do jogador durante o dia 1, e define um final de acordo com sua performance
    //Para avançar para o dia 2 o jogador deve ter um aproveitamento de pelo menos 75%, ou seja, 1275 pontos

    if (pontuacao < 700) {
      this.somErro.play();
      this.add.image(400, 300, "jornalFalido");
      this.falido = true;

      this.botaoGameOver = this.add.sprite(610, 535, "gameOver").setInteractive().setScale(2);
      this.botaoGameOver.anims.play("gameOver", true)

      this.botaoGameOver.on("pointerdown", () => {
        this.scene.stop("finalDia1");
        window.location.reload();
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
          this.clique.play();
          //Reinicia a pontuação antes de começar o dia 2;
          pontuacao = 0;
          this.transicao('introDia2', true, false, false)
        }
      });
    }
  }
}
