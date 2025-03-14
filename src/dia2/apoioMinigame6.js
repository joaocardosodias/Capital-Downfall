class apoioMinigame6 extends Phaser.Scene {
  constructor() {
    super("apoioMinigame6");
  }

  preload() {
    //Preload dos assets

    this.load.image(
      "tutorialCtrlMinigame6",
      "src/assets/dia2/apoioMinigame6/tutorialControlesMinigame6.png"
    );

    this.load.image(
      "apoioMinigame6",
      "src/assets/dia2/apoioMinigame6/apoioMinigame6.png"
    );

    this.load.image(
      "botaoSeguirAdiante",
      "src/assets/botoes/botaoSeguirAdiante.png"
    );
  }

  create() {
    //Carrega as telas e os botões utilizados

    let tutorialCtrlMinigame6 = this.add.image(
      400,
      300,
      "tutorialCtrlMinigame6"
    );

    let apoioMinigame6 = this.add
      .image(400, 300, "apoioMinigame6")
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
      tutorialCtrlMinigame6.setVisible(false);

      apoioMinigame6.setVisible(true);

      botaoTutorialMinigame2.setInteractive().setVisible(true);

      botaoTutorialMinigame1.setVisible(false);
    });

    //Verifica se o segundo botão foi pressionado

    botaoTutorialMinigame2.on("pointerdown", function (pointer) {
      game.scene.start("miniGame6");

      game.scene.stop("apoioMinigame6");
    });
  }
}
