class finalSalaDeGuerra extends Phaser.Scene {
  constructor() {
    super("finalSalaDeGuerra");

    this.cenaGameOverSalaDeGuerra = false;
    this.cenaGameWinSalaDeGuerra = false;
    this.botaoContinuar;
    this.botaoGameOver;
    this.somAcerto;
    this.somErro;
    this.clique;
  }
  preload() {
    this.load.image(
      "cenaGameOver",
      "src/assets/dia2/salaDeGuerra/cenaGameOver.png"
    );
    this.load.image(
      "cenaGameWin",
      "src/assets/dia2/salaDeGuerra/cenaGameWin.png"
    );

    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("clique", "src/assets/sounds/clique.mp3");
  }
  create() {
    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });
    this.clique = this.sound.add("clique");

    if (pontuacao < 100) {
      this.somErro.play();
      this.add.image(400, 300, "cenaGameOver");
      this.cenaGameOverSalaDeGuerra = true;
      this.botaoGameOver = this.add.image(100, 75, "gameOver").setInteractive();
      this.botaoGameOver.on("pointerdown", () => {
        window.location.reload();
      });
    }

    if (pontuacao >= 100) {
      this.somAcerto.play();
      this.add.image(400, 300, "cenaGameWin");
      this.Crescimento = true;
      this.botaoContinuar = this.add
        .image(100, 75, "continuar")
        .setInteractive();
      this.botaoContinuar.on("pointerdown", () => {
        this.clique.play();
        window.location.reload();
      });
    }
  }
}
