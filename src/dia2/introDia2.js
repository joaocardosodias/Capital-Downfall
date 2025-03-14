class introDia2 extends Phaser.Scene {
  constructor() {
    super("introDia2");
  }

  preload() {
    //Preload dos assets
    this.load.image("apoioDia2", "src/assets/intro/tutorialDia2.png");

    this.load.image(
      "botaoSeguirAdiante",
      "src/assets/botoes/botaoSeguirAdiante.png"
    );
  }

  create() {
    //Carrega as imagens

    let apoioDia2 = this.add.image(400, 300, "apoioDia2");

    let botaoSeguirAdiante = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setInteractive()
      .setScale(0.5);

    //Verifica se o botão foi pressionado

    botaoSeguirAdiante.on("pointerdown", function (pointer) {
      game.scene.start("hub2");
      game.scene.stop("introDia2");
    });
  }
}
