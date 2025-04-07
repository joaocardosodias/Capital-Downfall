class finalDia1 extends Phaser.Scene {
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
    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });
    this.clique = this.sound.add("clique");

    // O código a seguir verifica a pontuação do jogador durante o dia 1, e define um final de acordo com sua performance
    //Para avançar para o dia 2 o jogador deve ter um aproveitamento de pelo menos 75%, ou seja, 1275 pontos
    if (pontuacao < 700) {
      this.somErro.play();
      this.add.image(400, 300, "jornalFalido");
      this.falido = true;
      this.botaoGameOver = this.add.image(100, 75, "gameOver").setInteractive();
      this.botaoGameOver.on("pointerdown", () => {
        this.scene.stop("finalDia1");
        window.location.reload();
      });
    }

    if (pontuacao >= 700) {
      this.somAcerto.play();
      this.add.image(400, 300, "jornalCrescimento");
      this.Crescimento = true;
      this.botaoContinuar = this.add
        .image(100, 75, "continuar")
        .setInteractive();
      this.botaoContinuar.on("pointerdown", () => {
        this.clique.play();
        this.scene.stop("finalDia1");
        //Reinicia a pontuação antes de começar o dia 2;
        pontuacao = 0;
        this.scene.start("introDia2");
      });
    }
  }
}
