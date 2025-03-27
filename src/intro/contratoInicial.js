class contratoInicial extends Phaser.Scene {
  constructor() {
    super("contratoInicial");
    this.somAdiante;
  }

  preload() {
    //Preload dos assets
    this.load.image(
      "tutorialControles",
      "src/assets/intro/tutorialControles.png"
    );

    this.load.image(
      "botaoSeguirAdiante",
      "src/assets/botoes/botaoSeguirAdiante.png"
    );

    this.load.audio("somAdiante", "src/assets/sounds/clique.mp3");
  }

  create() {
    this.somAdiante = this.sound.add("somAdiante");

    //Carrega as imagens

    let tutorialControles = this.add.image(400, 300, "tutorialControles");

    let botaoSeguirAdiante = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setInteractive()
      .setScale(0.5);

    //Verifica se o botão foi pressionado

    botaoSeguirAdiante.on("pointerdown", () => {
      this.somAdiante.play();
      musicaIntro.stop();
      game.scene.start("selecaoPersonagens");

      game.scene.stop("contratoInicial");
    });
  }
}
