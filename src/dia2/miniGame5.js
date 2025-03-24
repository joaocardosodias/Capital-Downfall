class miniGame5 extends Phaser.Scene {
  constructor() {
    super("miniGame5");
    this.cards = [];
    this.definitions = [];
    this.lines = [];
    this.draggingLine = null;
    this.draggingStart = null;
    this.scoreText = null;
    this.arrow = null;
    this.connectionsMade = 0;
    this.connectedDefinitions = new Set();
    this.enunciadoImage = null;
    this.clickSound = null;
    this.animationInProgress = true;
    this.animationCompleteCount = 0;
    this.connectionAnimationInProgress = false;
  }

  preload() {
    this.load.image("imobiliarioCard", "src/assets/dia2/miniGame5/imobiliariosCard.png");
    this.load.image("multimercadoCard", "src/assets/dia2/miniGame5/multimercadoCard.png");
    this.load.image("privatyequityCard", "src/assets/dia2/miniGame5/privatyequityCard.png");
    this.load.image("rendafixaCard", "src/assets/dia2/miniGame5/rendafixaCard.png");
    this.load.image("acoesCard", "src/assets/dia2/miniGame5/acoesCard.png");

    this.load.image("imobiliarioDefinition", "src/assets/dia2/miniGame5/imobiliario_def.png");
    this.load.image("multimercadoDefinition", "src/assets/dia2/miniGame5/multimercado_def.png");
    this.load.image("privatyequityDefinition", "src/assets/dia2/miniGame5/privatyequity_def.png");
    this.load.image("rendafixaDefinition", "src/assets/dia2/miniGame5/rendafixa_def.png");
    this.load.image("acoesDefinition", "src/assets/dia2/miniGame5/acoes_def.png");

    this.load.image("background", "src/assets/dia2/miniGame5/background.png");
    this.load.image("arrow", "src/assets/dia2/miniGame5/arrow.png");
    this.load.image("enunciado", "src/assets/dia2/miniGame5/enunciado.png");
    this.load.audio("click", ["src/assets/dia2/miniGame5/click.mp3"]);
  }

  create() {
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(8);

    this.enunciadoImage = this.add.image(400, 50, "enunciado")
      .setOrigin(0.5, 0)
      .setScale(0.8);

    this.scoreText = this.add.text(80, 1, `Pontuação: ${pontuacao}`, {
      font: "24px Arial",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0);

    this.clickSound = this.sound.add("click");

    let data = [
      { imgSigla: "acoesCard", imgDef: "acoesDefinition" },
      { imgSigla: "imobiliarioCard", imgDef: "imobiliarioDefinition" },
      { imgSigla: "multimercadoCard", imgDef: "multimercadoDefinition" },
      { imgSigla: "rendafixaCard", imgDef: "rendafixaDefinition" },
      { imgSigla: "privatyequityCard", imgDef: "privatyequityDefinition" },
    ];

    this.shuffleArray(data);
    let shuffledDefinitions = [...data];
    this.shuffleArray(shuffledDefinitions);

    let startX = 100;
    let endX = 600;
    let yPositions = [160, 260, 360, 460, 560];

    // Create cards with proper edge alignment
    data.forEach((item, index) => {
      let card = this.add.image(startX, -100, item.imgSigla);
      card.setScale(0.9);
      card.setData("sigla", item.sigla);
      card.setData("connected", false);
      card.disableInteractive();
      
      card.setInteractive({ useHandCursor: true });
      card.on("pointerdown", () => {
        if (!this.animationInProgress && !this.connectionAnimationInProgress) {
          this.clickSound.play();
          this.startDragging(card, this);
        }
      });
      
      card.on("pointerover", () => {
        if (!card.getData("connected") && !this.animationInProgress && !this.connectionAnimationInProgress) {
          this.tweens.add({
            targets: card,
            scaleX: 0.8,
            scaleY: 0.8,
            duration: 100,
            ease: "Power2",
          });
        }
      });
      
      card.on("pointerout", () => {
        if (!card.getData("connected") && !this.animationInProgress && !this.connectionAnimationInProgress) {
          this.tweens.add({
            targets: card,
            scaleX: 0.9,
            scaleY: 0.9,
            duration: 100,
            ease: "Power2",
          });
        }
      });

      this.tweens.add({
        targets: card,
        y: yPositions[index],
        duration: 1500,
        ease: "Sine.out",
        onComplete: () => {
          this.animationCompleteCount++;
          if (this.animationCompleteCount === data.length + shuffledDefinitions.length) {
            this.enableInteractions();
          }
        }
      });
      this.cards.push(card);
    });

    // Create definitions with proper edge alignment
    shuffledDefinitions.forEach((item, index) => {
      let definition = this.add.image(endX, -100, item.imgDef);
      definition.setScale(0.9);
      definition.setData("sigla", item.sigla);
      
      this.tweens.add({
        targets: definition,
        y: yPositions[index],
        duration: 1500,
        ease: "Sine.out",
        onComplete: () => {
          this.animationCompleteCount++;
          if (this.animationCompleteCount === data.length + shuffledDefinitions.length) {
            this.enableInteractions();
          }
        }
      });
      this.definitions.push(definition);
    });
  }

  enableInteractions() {
    this.animationInProgress = false;
    this.cards.forEach(card => card.setInteractive());
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  startDragging(card, scene) {
    if (card.getData("connected") || this.animationInProgress || this.connectionAnimationInProgress) {
      return;
    }

    this.draggingStart = card;
    const startX = card.x + card.displayWidth / 2; // Right edge of card
    const startY = card.y;

    this.draggingLine = scene.add.line(startX, startY, 0, 0, 0, 0, 0xffffff);
    this.draggingLine.setLineWidth(8);
    this.draggingLine.setAlpha(1);
    this.input.on("pointermove", (pointer) => this.updateLine(pointer, scene));
    this.input.on("pointerup", () => this.endDragging(scene));
  }

  updateLine(pointer, scene) {
    if (this.draggingLine && this.draggingStart) {
      const startX = this.draggingStart.x + this.draggingStart.displayWidth / 2;
      const startY = this.draggingStart.y;
      this.draggingLine.setTo(0, 0, pointer.x - startX, pointer.y - startY);
    }
  }

  endDragging(scene) {
    if (!this.draggingStart || this.animationInProgress || this.connectionAnimationInProgress) {
      if (this.draggingLine) this.draggingLine.destroy();
      this.draggingStart = null;
      this.draggingLine = null;
      return;
    }

    let pointer = scene.input.activePointer;
    let matchedDefinition = this.definitions.find((def) =>
      def.getBounds().contains(pointer.x, pointer.y)
    );

    if (matchedDefinition) {
      if (this.connectedDefinitions.has(matchedDefinition) || this.draggingStart.getData("connected")) {
        if (this.draggingLine) this.draggingLine.destroy();
        this.draggingStart = null;
        this.draggingLine = null;
        return;
      }

      // Start connection animation
      this.connectionAnimationInProgress = true;

      // Score handling
      if (matchedDefinition.getData("sigla") === this.draggingStart.getData("sigla")) {
        pontuacao += 100;
        this.scoreText.setText(`Pontuação: ${pontuacao}`);
        this.showScoreAnimation(scene, "+100", 0x00ff00);
      } else {
        pontuacao -= 50;
        this.scoreText.setText(`Pontuação: ${pontuacao}`);
        this.showScoreAnimation(scene, "-50", 0xff0000);
      }

      // Mark as connected
      this.draggingStart.setData("connected", true);
      this.connectedDefinitions.add(matchedDefinition);
      this.connectionsMade++;

      // Calculate final line position (from right edge of card to left edge of definition)
      const startX = this.draggingStart.x + this.draggingStart.displayWidth / 2;
      const startY = this.draggingStart.y;
      const endX = matchedDefinition.x - matchedDefinition.displayWidth / 2;
      const endY = matchedDefinition.y;

      if (this.draggingLine) {
        this.draggingLine.setTo(0, 0, endX - startX, endY - startY);
      }

      // Check if all connections are made
      if (this.connectionsMade === this.cards.length) {
        this.showArrow(scene);
      }

      // Animate the connection
      this.animateConnection(scene, this.draggingStart, matchedDefinition, () => {
        this.connectionAnimationInProgress = false;
        this.updateLineAfterAnimation(scene, this.draggingStart, matchedDefinition);
      });
    } else {
      if (this.draggingLine) this.draggingLine.destroy();
    }

    this.draggingStart = null;
    this.draggingLine = null;
    scene.input.off("pointermove", this.updateLine, this);
    scene.input.off("pointerup", this.endDragging, this);
  }

  animateConnection(scene, card, definition, onComplete) {
    scene.tweens.add({
      targets: [card, definition],
      scaleX: 0.85,
      scaleY: 0.85,
      duration: 450,
      ease: "Power2",
      onComplete: () => {
        scene.tweens.add({
          targets: [card, definition],
          scaleX: 0.8,
          scaleY: 0.8,
          alpha: 1,
          duration: 400,
          ease: "Power2",
          onComplete: onComplete
        });
      }
    });
  }

  updateLineAfterAnimation(scene, card, definition) {
    if (this.draggingLine) {
      const startX = card.x + card.displayWidth / 2;
      const startY = card.y;
      const endX = definition.x - definition.displayWidth / 2;
      const endY = definition.y;

      this.draggingLine.setTo(0, 0, endX - startX, endY - startY);
      this.draggingLine.setPosition(startX, startY);
    }
  }

  showScoreAnimation(scene, text, color) {
    let scoreAnimation = scene.add.text(400, 300, text, {
      font: "32px Arial",
      fill: color,
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.5);

    scene.tweens.add({
      targets: scoreAnimation,
      y: 250,
      alpha: 0,
      duration: 1000,
      onComplete: () => scoreAnimation.destroy()
    });
  }

  showArrow(scene) {
    this.arrow = scene.add.image(400, 300, "arrow").setInteractive();
    this.arrow.setScale(0.3);
    this.arrow.on("pointerdown", () => {
      this.clickSound.play();
      scene.scene.start("fimMinigame5");
    });

    scene.tweens.add({
      targets: this.arrow,
      scaleX: 0.35,
      scaleY: 0.35,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
  }

  update() {}
}

class fimMinigame5 extends Phaser.Scene {
  constructor() {
    super("fimMinigame5");
    this.clickSound = null;
  }
  
  preload() {
    this.load.audio("click", ["src/assets/dia2/miniGame5/click.mp3"]);
  }

  create() {
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(8);
    this.clickSound = this.sound.add("click");

    this.add.text(400, 300, `Pontuação Final: ${pontuacao}`, {
      font: "32px Arial",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0.5);
    
    let botaoVoltar = this.add.text(400, 400, "Voltar", {
      fontSize: "30px",
      fill: "#fff",
      backgroundColor: "#333",
    }).setOrigin(0.5).setPadding(10).setInteractive();

    botaoVoltar.on("pointerdown", () => {
      this.clickSound.play();
      minigame5Jogado = true;
      this.scene.wake("hub2");
      this.scene.stop("fimMinigame5");
    });
  }
}