class apoioMinigame5 extends Phaser.Scene {
  constructor() {
    super("apoioMinigame5");
  }

  preload() {
    //Preload dos assets

    this.load.image(
      "tutorialCtrlMinigame5",
      "src/assets/dia2/apoioMinigame5/tutorialControlesMinigame5.png"
    );

    this.load.image(
      "apoioMinigame5",
      "src/assets/dia2/apoioMinigame5/apoioMinigame5.png"
    );

    this.load.image(
      "botaoSeguirAdiante",
      "src/assets/botoes/botaoSeguirAdiante.png"
    );
  }

  create() {
    //Carrega as telas e os botões utilizados

    let tutorialCtrlMinigame5 = this.add.image(
      400,
      300,
      "tutorialCtrlMinigame5"
    );

    let apoioMinigame5 = this.add
      .image(400, 300, "apoioMinigame5")
      .setVisible(false);

    let botaoTutorialMinigame1 = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setInteractive()
      .setScale(0.5);

    let botaoTutorialMinigame2 = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setScale(0.5)
      .setVisible(false);

    //Verifica se o primeiro botão foi pressionado

    botaoTutorialMinigame1.on("pointerdown", function (pointer) {
      tutorialCtrlMinigame5.setVisible(false);

      apoioMinigame5.setVisible(true);

      botaoTutorialMinigame2.setInteractive().setVisible(true);

      botaoTutorialMinigame1.setVisible(false);
    });

    //Verifica se o segundo botão foi pressionado

    botaoTutorialMinigame2.on("pointerdown", function (pointer) {
      game.scene.start("miniGame5");

      game.scene.stop("apoioMinigame5");
    });
  }
}
