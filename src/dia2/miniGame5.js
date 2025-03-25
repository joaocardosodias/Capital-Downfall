class miniGame5 extends Phaser.Scene {
  constructor() {
    super("miniGame5");
    this.cards = [];
    this.definitions = [];
    this.lines = [];
    this.draggingLine = null;
    this.draggingStart = null;
    this.scoreText = null; // Texto para exibir a pontuação na tela
    this.arrow = null; // Seta que aparece após todas as conexões
    this.connectionsMade = 0; // Contador de conexões feitas
    this.connectedDefinitions = new Set(); // Conjunto para armazenar significados já conectados
    this.enunciadoImage = null; // Variável para armazenar a imagem do enunciado
    this.clickSound = null; // Som de clique
  }

  preload() {
    // Carrega as imagens dos cartões e significados
    this.load.image("swapCard", "src/assets/dia2/miniGame5/swapCard.png");
    this.load.image("fipCard", "src/assets/dia2/miniGame5/fipCard.png");
    this.load.image("tirCard", "src/assets/dia2/miniGame5/tirCard.png");
    this.load.image("ibovCard", "src/assets/dia2/miniGame5/ibovCard.png");
    this.load.image("dxCard", "src/assets/dia2/miniGame5/d+xCard.png");

    this.load.image("swapDefinition", "src/assets/dia2/miniGame5/swap_def.png");
    this.load.image("fipDefinition", "src/assets/dia2/miniGame5/fip_def.png");
    this.load.image("tirDefinition", "src/assets/dia2/miniGame5/tir_def.png");
    this.load.image("ibovDefinition", "src/assets/dia2/miniGame5/ibov_def.png");
    this.load.image("dxDefinition", "src/assets/dia2/miniGame5/d+x_def.png");

    this.load.image("background", "src/assets/dia2/miniGame5/background.png");
    this.load.image("arrow", "src/assets/dia2/miniGame5/arrow.png"); // Carrega a imagem da seta

    // Carrega a imagem do enunciado
    this.load.image("enunciado", "src/assets/dia2/miniGame5/enunciado.png");

    // Carrega o som de clique
    this.load.audio("click", ["src/assets/dia2/miniGame5/click.mp3"]);
  }

  create() {
    // Adiciona o fundo do minigame
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(8);

    // Adiciona a imagem do enunciado no topo da tela
    this.enunciadoImage = this.add
      .image(400, 50, "enunciado")
      .setOrigin(0.5, 0)
      .setScale(0.8); // Ajuste a escala conforme necessário

    // Exibe a pontuação no topo central da tela
    this.scoreText = this.add
      .text(80, 1, `Pontuação: ${pontuacao}`, {
        font: "24px Arial",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5, 0); // Centraliza o texto horizontalmente

    // Carrega o som de clique
    this.clickSound = this.sound.add("click");

    // Lista contendo as siglas e seus respectivos conceitos (apenas 5 cards)
    let data = [
      {
        sigla: "SWAP",
        conceito: "Contrato de Troca de Fluxos de Caixa",
        imgSigla: "swapCard",
        imgDef: "swapDefinition",
      },
      {
        sigla: "FIP",
        conceito: "Fundo de Investimento em Participações",
        imgSigla: "fipCard",
        imgDef: "fipDefinition",
      },
      {
        sigla: "TIR",
        conceito: "Taxa Interna de Retorno",
        imgSigla: "tirCard",
        imgDef: "tirDefinition",
      },
      {
        sigla: "IBOV",
        conceito: "Índice Bovespa",
        imgSigla: "ibovCard",
        imgDef: "ibovDefinition",
      },
      {
        sigla: "D+X",
        conceito: "Data de Liquidação de Operações",
        imgSigla: "dxCard",
        imgDef: "dxDefinition",
      },
    ];

    // Embaralha a ordem dos cartões de siglas
    this.shuffleArray(data);

    // Cria uma cópia dos dados e embaralha a ordem dos significados
    let shuffledDefinitions = [...data];
    this.shuffleArray(shuffledDefinitions);

    let startX = 100; // Posição X dos cartões de siglas (esquerda)
    let endX = 600; // Posição X dos cartões de significados (direita)
    let yPositions = [160, 260, 360, 460, 560]; // Posições Y dos cartões (5 posições)

    // Cria os cartões de siglas com animação de queda suave
    data.forEach((item, index) => {
      let card = this.add.image(startX, -100, item.imgSigla).setInteractive();
      card.setScale(0.8); // Tamanho dos cartões de siglas
      card.setData("sigla", item.sigla);
      card.setData("connected", false); // Inicializa como não conectado
      card.on("pointerdown", () => {
        this.clickSound.play(); // Reproduz o som de clique
        this.startDragging(card, this);
      });
      card.on("pointerover", () => {
        if (!card.getData("connected")) {
          this.tweens.add({
            targets: card,
            scaleX: 0.85,
            scaleY: 0.85,
            duration: 100,
            ease: "Power2",
          });
        }
      });
      card.on("pointerout", () => {
        if (!card.getData("connected")) {
          this.tweens.add({
            targets: card,
            scaleX: 0.8,
            scaleY: 0.8,
            duration: 100,
            ease: "Power2",
          });
        }
      });
      // Animação de queda suave
      this.tweens.add({
        targets: card,
        y: yPositions[index],
        duration: 1500,
        ease: "Sine.out",
      });
      this.cards.push(card);
    });

    // Cria os cartões de definições (embaralhados) com animação de queda suave
    shuffledDefinitions.forEach((item, index) => {
      let definition = this.add.image(endX, -100, item.imgDef);
      definition.setScale(0.7); // Tamanho dos cartões de significados
      definition.setData("sigla", item.sigla);
      // Animação de queda suave
      this.tweens.add({
        targets: definition,
        y: yPositions[index],
        duration: 1500,
        ease: "Sine.out",
      });
      this.definitions.push(definition);
    });
  }

  // Função para embaralhar um array (Fisher-Yates shuffle)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
  }

  startDragging(card, scene) {
    // Verifica se o card de sigla já foi conectado
    if (card.getData("connected")) {
      return; // Impede que o card seja arrastado novamente
    }

    this.draggingStart = card;

    // Calcula a posição da borda direita do cartão de sigla
    const cardWidth = card.displayWidth;
    const startX = card.x + cardWidth / 2; // Borda direita do cartão
    const startY = card.y;

    // Cria a linha a partir da borda direita do cartão
    this.draggingLine = scene.add.line(startX, startY, 0, 0, 0, 0, 0x000000);
    this.draggingLine.setLineWidth(4);
    this.draggingLine.setAlpha(0.5);
    this.input.on("pointermove", (pointer) => this.updateLine(pointer, scene));
    this.input.on("pointerup", () => this.endDragging(scene));
  }

  updateLine(pointer, scene) {
    if (this.draggingLine) {
      // Atualiza a linha para seguir o ponteiro do mouse
      const cardWidth = this.draggingStart.displayWidth;
      const startX = this.draggingStart.x + cardWidth / 2;
      const startY = this.draggingStart.y;
      this.draggingLine.setTo(0, 0, pointer.x - startX, pointer.y - startY);
    }
  }

  endDragging(scene) {
    if (!this.draggingStart) {
      return; // Se draggingStart for null, não faz nada
    }

    let pointer = scene.input.activePointer;
    let matchedDefinition = this.definitions.find((def) =>
      def.getBounds().contains(pointer.x, pointer.y)
    );

    if (matchedDefinition) {
      // Verifica se o significado já foi conectado
      if (this.connectedDefinitions.has(matchedDefinition)) {
        // Significado já conectado, não permite nova conexão
        if (this.draggingLine) {
          this.draggingLine.destroy();
        }
      } else {
        // Verifica se o card de sigla já foi conectado
        if (this.draggingStart.getData("connected")) {
          if (this.draggingLine) {
            this.draggingLine.destroy();
          }
          return;
        }

        if (
          matchedDefinition.getData("sigla") ===
          this.draggingStart.getData("sigla")
        ) {
          // Conexão correta: ganha 100 pontos
          pontuacao += 100;
          this.scoreText.setText(`Pontuação: ${pontuacao}`); // Atualiza o texto da pontuação

          // Exibe a animação de pontuação ganha
          this.showScoreAnimation(scene, "+100", 0x00ff00); // Verde para acerto
        } else {
          // Conexão incorreta: perde 50 pontos
          pontuacao -= 50;
          this.scoreText.setText(`Pontuação: ${pontuacao}`); // Atualiza o texto da pontuação

          // Exibe a animação de pontuação perdida
          this.showScoreAnimation(scene, "-50", 0xff0000); // Vermelho para erro
        }

        // Marca o card de sigla como conectado
        this.draggingStart.setData("connected", true);

        // Adiciona o significado ao conjunto de significados conectados
        this.connectedDefinitions.add(matchedDefinition);

        // Incrementa o contador de conexões feitas
        this.connectionsMade++;

        // Verifica se todas as conexões foram feitas
        if (this.connectionsMade === this.cards.length) {
          this.showArrow(scene); // Mostra a seta
        }

        // Ajusta a linha para ir até a borda do card de significado
        const endX = matchedDefinition.x - matchedDefinition.displayWidth / 2;
        const endY = matchedDefinition.y;
        if (this.draggingLine) {
          this.draggingLine.setTo(
            0,
            0,
            endX - (this.draggingStart.x + this.draggingStart.displayWidth / 2),
            endY - this.draggingStart.y
          );
        }

        // Animação de conexão: aumenta, diminui e fica transparente
        this.animateConnection(scene, this.draggingStart, matchedDefinition);
      }
    } else {
      // Se o jogador não soltar o botão sobre um cartão de significado, remove a linha
      if (this.draggingLine) {
        this.draggingLine.destroy();
      }
    }

    this.draggingStart = null;
    this.draggingLine = null;

    // Remove os eventos de movimento e clique
    scene.input.off("pointermove", this.updateLine, this);
    scene.input.off("pointerup", this.endDragging, this);
  }

  animateConnection(scene, card, definition) {
    // Animação de aumento sutil
    scene.tweens.add({
      targets: [card, definition],
      scaleX: 0.8, // Aumenta um pouco (10%)
      scaleY: 0.8, // Aumenta um pouco (10%)
      duration: 450, // Duração mais longa para suavizar
      ease: "Power2",
      onComplete: () => {
        // Animação de diminuição e transparência
        scene.tweens.add({
          targets: [card, definition],
          scaleX: 0.7,
          scaleY: 0.7,
          alpha: 0.6,
          duration: 400, // Duração mais longa para suavizar
          ease: "Power2",
        });
      },
    });
  }

  showScoreAnimation(scene, text, color) {
    // Cria um texto temporário para exibir a pontuação ganha ou perdida
    let scoreAnimation = scene.add
      .text(400, 300, text, {
        font: "32px Arial",
        fill: color,
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5, 0.5); // Centraliza o texto

    // Animação: o texto sobe e desaparece
    scene.tweens.add({
      targets: scoreAnimation,
      y: 250, // Move o texto para cima
      alpha: 0, // Faz o texto desaparecer
      duration: 1000, // Duração da animação (1 segundo)
      onComplete: () => {
        scoreAnimation.destroy(); // Remove o texto após a animação
      },
    });
  }

  showArrow(scene) {
    // Adiciona a seta no meio da tela
    this.arrow = scene.add.image(400, 300, "arrow").setInteractive();
    this.arrow.setScale(0.3); // Ajusta o tamanho da seta
    this.arrow.on("pointerdown", () => {
      this.clickSound.play(); // Reproduz o som de clique
      // Redireciona para a tela de pontuação final
      scene.scene.start("fimMinigame5");
    });

    // Animação de pulsação da seta
    scene.tweens.add({
      targets: this.arrow,
      scaleX: 0.35,
      scaleY: 0.35,
      duration: 500,
      yoyo: true,
      repeat: -1,
    });
  }

  update() {
    // Função update não utilizada neste minigame
  }
}

class fimMinigame5 extends Phaser.Scene {
  constructor() {
    super("fimMinigame5");
    this.clickSound = null; // Som de clique
  }
  preload() {
    // Carrega o som de clique
    this.load.audio("click", ["src/assets/dia2/miniGame5/click.mp3"]);
  }

  create() {
    // Adiciona o fundo da cena de pontuação final
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(8);

    // Carrega o som de clique
    this.clickSound = this.sound.add("click");

    // Exibe a pontuação final no centro da tela
    this.add
      .text(400, 300, `Pontuação Final: ${pontuacao}`, {
        font: "32px Arial",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5, 0.5); // Centraliza o texto
    let botaoVoltar = this.add
      .text(400, 400, "Voltar", {
        fontSize: "30px",
        fill: "#fff",
        backgroundColor: "#333",
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive();

    botaoVoltar.on("pointerdown", () => {
      this.clickSound.play(); // Reproduz o som de clique
      minigame5Jogado = true;
      this.scene.wake("hub2"); //Se você clicar no botão Voltar, você volta pra hub do jogo
      this.scene.stop("fimMinigame5");
    });
  }
}
