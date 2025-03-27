class introDia2 extends Phaser.Scene {
  constructor() {
    super("introDia2");
    this.somFundo;
  }

  preload() {
    //Preload dos assets
    this.load.image("apoioDia2", "src/assets/intro/tutorialDia2.png");

    this.load.image(
      "botaoSeguirAdiante",
      "src/assets/botoes/botaoSeguirAdiante.png"
    );
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
    this.load.audio("clique", "src/assets/sounds/clique.mp3");
  }

  create() {
    //Carrega as imagens

    let apoioDia2 = this.add.image(400, 300, "apoioDia2");
    this.somFundo = this.sound.add("somFundo", { loop: true });
    this.somFundo.play();
    let botaoSeguirAdiante = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setInteractive()
      .setScale(0.5);

    //Verifica se o botão foi pressionado

    botaoSeguirAdiante.on("pointerdown", () => {
      this.sound.play("clique");
      this.somFundo.stop();
      game.scene.start("hub2");
      game.scene.stop("introDia2");
    });
  }
}
