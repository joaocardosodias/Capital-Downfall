class apoioMinigame4 extends Phaser.Scene {
  constructor() {
    super("apoioMinigame4");
  }

  preload() {
    //Preload dos assets

    this.load.image(
      "tutorialCtrlMinigame4",
      "src/assets/dia2/apoioMinigame4/tutorialControlesMinigame4.png"
    );

    this.load.image(
      "apoioMinigame4",
      "src/assets/dia2/apoioMinigame4/apoioMinigame4.png"
    );

    this.load.image(
      "botaoSeguirAdiante",
      "src/assets/botoes/botaoSeguirAdiante.png"
    );
  }

  create() {
    //Carrega as telas e os botões utilizados

    let tutorialCtrlMinigame4 = this.add.image(
      400,
      300,
      "tutorialCtrlMinigame4"
    );

    let apoioMinigame4 = this.add
      .image(400, 300, "apoioMinigame4")
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
      tutorialCtrlMinigame4.setVisible(false);

      apoioMinigame4.setVisible(true);

      botaoTutorialMinigame2.setInteractive().setVisible(true);

      botaoTutorialMinigame1.setVisible(false);
    });

    //Verifica se o segundo botão foi pressionado

    botaoTutorialMinigame2.on("pointerdown", function (pointer) {
      game.scene.start("miniGame4");

      game.scene.stop("apoioMinigame4");
    });
  }
}
