class apoioMiniboss1 extends Phaser.Scene {
  constructor() {
    super("apoioMiniboss1");
  }

  create() {
    // Carrega as telas e botões utilizados
    let tutorialMiniboss1 = this.add.image(400, 300, "tutorialMiniboss1");
    let botaoSeguirAdiante = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setInteractive()
      .setScale(0.5);

    // Cria o som de clique
    this.cliqueSom = this.sound.add("clique");

    // Verifica se o botão foi pressionado
    botaoSeguirAdiante.on("pointerdown", () => {
      this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão
      this.scene.stop("apoioMiniboss1");
      this.scene.start("miniBossDia1");
    });
  }
}
