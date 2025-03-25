class apoioMinigame1 extends Phaser.Scene {
  constructor() {
    super("apoioMinigame1");
    this.clickSound = null; // Som de clique
  }

  preload() {
    // Preload dos assets
    this.load.image(
      "tutorialCtrlMinigame1",
      "src/assets/dia1/tutorialControlesMinigame1.png"
    );

    this.load.image(
      "tutorialFundoAberto",
      "src/assets/dia1/tutorialFundoAberto.png"
    );

    this.load.image(
      "tutorialFundoFechado",
      "src/assets/dia1/tutorialFundoFechado.png"
    );

    this.load.image(
      "botaoSeguirAdiante",
      "src/assets/botoes/botaoSeguirAdiante.png"
    );

    // Carrega o som de clique
    this.load.audio("click", ["src/assets/dia2/miniGame4/sons/clique.mp3"]);
  }

  create() {
    // Carrega as telas e botões utilizados
    this.tutorialCtrlMinigame1 = this.add.image(400, 300, "tutorialCtrlMinigame1");

    this.tutorialFundoAberto = this.add
      .image(400, 300, "tutorialFundoAberto")
      .setVisible(false);

    this.tutorialFundoFechado = this.add
      .image(400, 300, "tutorialFundoFechado")
      .setVisible(false);

    this.botaoTutorialMinigame1 = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setInteractive()
      .setScale(0.5);

    this.botaoTutorialMinigame2 = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setScale(0.5)
      .setVisible(false);

    this.botaoTutorialMinigame3 = this.add
      .image(615, 560, "botaoSeguirAdiante")
      .setScale(0.5)
      .setVisible(false);

    // Carrega o som de clique
    this.clickSound = this.sound.add("click");

    // Verifica se o primeiro botão foi pressionado
    this.botaoTutorialMinigame1.on("pointerdown", (pointer) => {
      this.clickSound.play(); // Reproduz o som de clique
      this.transitionToScreen(this.tutorialCtrlMinigame1, this.tutorialFundoAberto); // Troca de tela com animação
      this.botaoTutorialMinigame2.setInteractive().setVisible(true);
      this.botaoTutorialMinigame1.setVisible(false);
    });

    // Verifica se o segundo botão foi pressionado
    this.botaoTutorialMinigame2.on("pointerdown", (pointer) => {
      this.clickSound.play(); // Reproduz o som de clique
      this.transitionToScreen(this.tutorialFundoAberto, this.tutorialFundoFechado); // Troca de tela com animação
      this.botaoTutorialMinigame3.setInteractive().setVisible(true);
      this.botaoTutorialMinigame2.setVisible(false);
    });

    // Verifica se o terceiro botão foi pressionado
    this.botaoTutorialMinigame3.on("pointerdown", (pointer) => {
      this.clickSound.play(); // Reproduz o som de clique
      this.transitionToScene("miniGame1"); // Troca de cena com animação
    });
  }

  // Função para transição entre telas (fade-out e fade-in)
  transitionToScreen(currentScreen, nextScreen) {
    // Fade-out da tela atual
    this.tweens.add({
      targets: currentScreen,
      alpha: 0, // Torna a tela atual transparente
      duration: 500, // Duração de 500ms
      ease: "Linear",
      onComplete: () => {
        currentScreen.setVisible(false); // Oculta a tela atual após o fade-out
      },
    });

    // Fade-in da próxima tela
    nextScreen.setVisible(true).setAlpha(0); // Torna a próxima tela visível, mas transparente
    this.tweens.add({
      targets: nextScreen,
      alpha: 1, // Torna a próxima tela opaca
      duration: 500, // Duração de 500ms
      ease: "Linear",
    });
  }

  // Função para transição entre cenas (fade-out e fade-in)
  transitionToScene(nextScene) {
    // Aplica o fade-out
    this.cameras.main.fadeOut(500, 0, 0, 0); // Fade-out de 500ms

    // Aguarda o fade-out ser concluído
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
      this.scene.start(nextScene); // Inicia a próxima cena
      this.scene.stop(); // Encerra a cena atual
    });
  }
}