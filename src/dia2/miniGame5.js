class miniGame5 extends Phaser.Scene {
  constructor() {
    super("miniGame5");
    this.pontuacaoM5 = 0;
    // Array para armazenar os cartões do jogo
    this.cards = [];
    // Array para armazenar as definições
    this.definitions = [];
    // Array para armazenar as linhas de conexão
    this.lines = [];
    // Referência para a linha que está sendo arrastada
    this.draggingLine = null;
    // Referência para o cartão de onde começa o arrasto
    this.draggingStart = null;
    // Texto que mostra a pontuação
    this.scoreText = null;
    // Seta que aparece quando o jogo termina
    this.arrow = null;
    // Contador de conexões feitas
    this.connectionsMade = 0;
    // Conjunto de definições já conectadas
    this.connectedDefinitions = new Set();
    // Imagem do enunciado do jogo
    this.enunciadoImage = null;
    // Som de clique
    this.clickSound = null;
    // Flag para controlar se animações estão em progresso
    this.animationInProgress = true;
    // Contador para animações completas
    this.animationCompleteCount = 0;
    // Flag para controlar animação de conexão
    this.connectionAnimationInProgress = false;
    this.somFundo;
    this.somAcerto;
    this.somErro;
  }

  // Pré-carrega todos os assets do jogo
  preload() {
    // Carrega imagens dos cartões
    this.load.image("imobiliarioCard", "src/assets/dia2/miniGame5/imobiliariosCard.png");
    this.load.image("multimercadoCard", "src/assets/dia2/miniGame5/multimercadoCard.png");
    this.load.image("privatyequityCard", "src/assets/dia2/miniGame5/privatyequityCard.png");
    this.load.image("rendafixaCard", "src/assets/dia2/miniGame5/rendafixaCard.png");
    this.load.image("acoesCard", "src/assets/dia2/miniGame5/acoesCard.png");

    // Carrega imagens das definições
    this.load.image("imobiliarioDefinition", "src/assets/dia2/miniGame5/imobiliario_def.png");
    this.load.image("multimercadoDefinition", "src/assets/dia2/miniGame5/multimercado_def.png");
    this.load.image("privatyequityDefinition", "src/assets/dia2/miniGame5/privatyequity_def.png");
    this.load.image("rendafixaDefinition", "src/assets/dia2/miniGame5/rendafixa_def.png");
    this.load.image("acoesDefinition", "src/assets/dia2/miniGame5/acoes_def.png");

    // Carrega assets gerais
    this.load.image("background", "src/assets/dia2/miniGame5/background.png");
    this.load.image("arrow", "src/assets/dia2/miniGame5/arrow.png");
    this.load.image("enunciado", "src/assets/dia2/miniGame5/enunciado.png");
    this.load.audio("click", "src/assets/dia2/miniGame5/click.mp3");
    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
  }

  // Cria todos os elementos do jogo
  create() {
    // Adiciona o background centralizado e escalado
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(8);
    this.somFundo = this.sound.add("somFundo", { loop: true });
    this.somFundo.play();

    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });


    // Adiciona o enunciado na parte superior
    this.enunciadoImage = this.add.image(400, 50, "enunciado")
      .setOrigin(0.5, 0)
      .setScale(0.8);

    // Cria o texto de pontuação
    this.scoreText = this.add.text(80, 1, `Pontuação: ${this.pontuacaoM5}`, {
      fontFamily: "pixelArt",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5, 0);

    // Configura o som de clique
    this.clickSound = this.sound.add("click");

    // Dados dos pares cartão-definição
    let data = [
      { imgSigla: "acoesCard", imgDef: "acoesDefinition" },
      { imgSigla: "imobiliarioCard", imgDef: "imobiliarioDefinition" },
      { imgSigla: "multimercadoCard", imgDef: "multimercadoDefinition" },
      { imgSigla: "rendafixaCard", imgDef: "rendafixaDefinition" },
      { imgSigla: "privatyequityCard", imgDef: "privatyequityDefinition" },
    ];

    // Embaralha os cartões
    this.shuffleArray(data);
    let shuffledDefinitions = [...data];
    // Embaralha as definições
    this.shuffleArray(shuffledDefinitions);

    // Posições Y para os elementos
    let yPositions = [160, 260, 360, 460, 560];

    // Cria os cartões com animação de entrada
    data.forEach((item, index) => {
      let card = this.add.image(100, -100, item.imgSigla);
      card.setScale(0.9);
      // Armazena dados no objeto
      card.setData("sigla", item.sigla);
      card.setData("connected", false);
      card.disableInteractive();
      
      // Configura interatividade
      card.setInteractive({ useHandCursor: true });
      // Evento de clique - inicia arrasto
      card.on("pointerdown", () => {
        if (!this.animationInProgress && !this.connectionAnimationInProgress) {
          this.clickSound.play();
          this.startDragging(card, this);
        }
      });
      
      // Efeito hover - aumenta ligeiramente
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
      
      // Efeito quando mouse sai - volta ao normal
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

      // Animação de entrada - cartão desce para posição final
      this.tweens.add({
        targets: card,
        y: yPositions[index],
        duration: 1500,
        ease: "Sine.out",
        onComplete: () => {
          this.animationCompleteCount++;
          // Quando todas animações terminam, ativa interações
          if (this.animationCompleteCount === data.length + shuffledDefinitions.length) {
            this.enableInteractions();
          }
        }
      });
      this.cards.push(card);
    });

    // Cria as definições com animação de entrada
    shuffledDefinitions.forEach((item, index) => {
      let definition = this.add.image(600, -100, item.imgDef);
      definition.setScale(0.9);
      definition.setData("sigla", item.sigla);
      
      // Animação de entrada - definição desce para posição final
      this.tweens.add({
        targets: definition,
        y: yPositions[index],
        duration: 1500,
        ease: "Sine.out",
        onComplete: () => {
          this.animationCompleteCount++;
          // Quando todas animações terminam, ativa interações
          if (this.animationCompleteCount === data.length + shuffledDefinitions.length) {
            this.enableInteractions();
          }
        }
      });
      this.definitions.push(definition);
    });
  }

  // Ativa as interações após as animações iniciais
  enableInteractions() {
    this.animationInProgress = false;
    this.cards.forEach(card => card.setInteractive());
  }

  // Função para embaralhar um array (Fisher-Yates algorithm)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Inicia o arrasto de uma linha a partir de um cartão
  startDragging(card, scene) {
    // Verifica se pode iniciar arrasto
    if (card.getData("connected") || this.animationInProgress || this.connectionAnimationInProgress) {
      return;
    }

    this.draggingStart = card;
    // Calcula ponto de início (borda direita do cartão)
    const startX = card.x + card.displayWidth / 2;
    const startY = card.y;

    // Cria a linha que será arrastada
    this.draggingLine = scene.add.line(startX, startY, 0, 0, 0, 0, 0xffffff);
    this.draggingLine.setLineWidth(8);
    this.draggingLine.setAlpha(1);
    // Configura listeners para movimento do mouse
    this.input.on("pointermove", (pointer) => this.updateLine(pointer, scene));
    this.input.on("pointerup", () => this.endDragging(scene));
  }

  // Atualiza a posição da linha enquanto arrasta
  updateLine(pointer, scene) {
    if (this.draggingLine && this.draggingStart) {
      const startX = this.draggingStart.x + this.draggingStart.displayWidth / 2;
      const startY = this.draggingStart.y;
      // Atualiza o ponto final da linha para seguir o mouse
      this.draggingLine.setTo(0, 0, pointer.x - startX, pointer.y - startY);
    }
  }

  // Finaliza o arrasto quando solta o mouse
  endDragging(scene) {
    // Verifica se pode finalizar arrasto
    if (!this.draggingStart || this.animationInProgress || this.connectionAnimationInProgress) {
      if (this.draggingLine) this.draggingLine.destroy();
      this.draggingStart = null;
      this.draggingLine = null;
      return;
    }

    let pointer = scene.input.activePointer;
    // Verifica se soltou sobre alguma definição
    let matchedDefinition = this.definitions.find((def) =>
      def.getBounds().contains(pointer.x, pointer.y)
    );

    if (matchedDefinition) {
      // Verifica se a definição ou cartão já estão conectados
      if (this.connectedDefinitions.has(matchedDefinition) || this.draggingStart.getData("connected")) {
        if (this.draggingLine) this.draggingLine.destroy();
        this.draggingStart = null;
        this.draggingLine = null;
        return;
      }

      // Marca que está em animação de conexão
      this.connectionAnimationInProgress = true;

      // Lógica de pontuação
      if (matchedDefinition.getData("sigla") === this.draggingStart.getData("sigla")) {
        this.pontuacaoM5 += 100;
        this.somAcerto.play();
        this.scoreText.setText(`Pontuação: ${this.pontuacaoM5}`);
        this.showScoreAnimation(scene, "+100", 0x00ff00); // Feedback verde
      } 
      else {
        this.pontuacaoM5 -= 50;
        this.somErro.play();
        this.scoreText.setText(`Pontuação: ${this.pontuacaoM5}`);
        this.showScoreAnimation(scene, "-50", 0xff0000); // Feedback vermelho
      }

      // Marca como conectado
      this.draggingStart.setData("connected", true);
      this.connectedDefinitions.add(matchedDefinition);
      this.connectionsMade++;

      // Calcula posições finais da linha
      const startX = this.draggingStart.x + this.draggingStart.displayWidth / 2.5;
      const startY = this.draggingStart.y;
      const endX = matchedDefinition.x - matchedDefinition.displayWidth / 2.5;
      const endY = matchedDefinition.y;

      // Atualiza linha para posição final
      if (this.draggingLine) {
        this.draggingLine.setTo(0, 0, endX - startX, endY - startY);
      }

      // Verifica se todas conexões foram feitas
      if (this.connectionsMade === this.cards.length) {
        this.showArrow(scene); // Mostra seta para avançar
      }

      // Executa animação da conexão
      this.animateConnection(scene, this.draggingStart, matchedDefinition, () => {
        this.connectionAnimationInProgress = false;
        this.updateLineAfterAnimation(scene, this.draggingStart, matchedDefinition);
      });
    } else {
      // Se não conectou a nada, destrói a linha
      if (this.draggingLine) this.draggingLine.destroy();
    }

    // Limpa referências e listeners
    this.draggingStart = null;
    this.draggingLine = null;
    scene.input.off("pointermove", this.updateLine, this);
    scene.input.off("pointerup", this.endDragging, this);
  }

  // Animação quando faz uma conexão
  animateConnection(scene, card, definition, onComplete) {
    // Animação de "pulo" quando conecta
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

  // Atualiza a linha após a animação de conexão
  updateLineAfterAnimation(scene, card, definition) {
    if (this.draggingLine) {
      const startX = card.x + card.displayWidth / 2;
      const startY = card.y;
      const endX = definition.x - definition.displayWidth / 2;
      const endY = definition.y;

      // Reposiciona a linha com as posições finais
      this.draggingLine.setTo(0, 0, endX - startX, endY - startY);
      this.draggingLine.setPosition(startX, startY);
    }
  }

  // Mostra animação de feedback de pontuação
  showScoreAnimation(scene, text, color) {
    let scoreAnimation = scene.add.text(400, 300, text, {
      fontFamily: "pixelArt",
      fill: color,
      stroke: "#000000",
      strokeThickness: 4,
    }).setOrigin(0.5, 0.5);

    // Animação de texto subindo e desaparecendo
    scene.tweens.add({
      targets: scoreAnimation,
      y: 250,
      alpha: 0,
      duration: 1000,
      onComplete: () => scoreAnimation.destroy()
    });
  }

  // Mostra seta para avançar quando completa todas conexões
  showArrow(scene) {
    this.arrow = scene.add.image(400, 300, "arrow").setInteractive();
    this.arrow.setScale(0.3);
    // Configura clique na seta para avançar
    this.arrow.on("pointerdown", () => {
      this.somFundo.stop();
      this.clickSound.play();
      this.scene.start('fimMinigame5', {
        pontuacaoM5: this.pontuacaoM5,
        pontuacao: pontuacao
      });
      this.scene.stop('miniGame5');
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

  }
}

// Cena que mostra a pontuação final
class fimMinigame5 extends Phaser.Scene {
  constructor() {
    super("fimMinigame5");
    this.clickSound = null;
    this.somCorrect;
  }

  init(data) {
    this.pontuacaoM5 = data.pontuacaoM5; // Recebe a pontuação da cena anterior
}
  
  // Pré-carrega assets
  preload() {
    this.load.audio("click", "src/assets/dia2/miniGame5/click.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet("voltarAoMapa", "src/assets/telas_pontuacao/voltarAoMapa.png", { frameWidth: 400, frameHeight: 110 });

    this.load.audio("clique", "src/assets/sounds/clique.mp3");
    this.load.audio("musicaFundo", "src/assets/sounds/escritorioFlow.mp3");

  }

  // Cria elementos da cena final
  create() {
    this.sound.play("conclusao");
    this.cliqueSom = this.sound.add("clique");
    this.musicaFundo = this.sound.add("musicaFundo"); // Adiciona o som da música de fundo
    this.musicaFundo.setLoop(true); // Define que a música de fundo deve ser repetida
    this.musicaFundo.play(); // Inicia a música de fundo

    this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(30).setAlpha(0.5);
    miniGame5.fim = this.add.image(400, 300, "fim").setDepth(31);

    pontuacao += this.pontuacaoM5

    // Criação da tela de pontuação
    this.add
      .text(402, 311, this.pontuacaoM5, {
        fontFamily: "pixelArtNumeros",
        fill: "#ffffff",
        fontSize: '32px',
      })
      .setOrigin(0.5)
      .setDepth(32);

    this.add
      .text(402, 409, pontuacao, {
        fontFamily: "pixelArtNumeros",
        fill: "#ffffff",
        fontSize: '48px',
      })
      .setOrigin(0.5)
      .setDepth(32);

    this.anims.create({
      key: "voltarAoMapaM5",
      frames: this.anims.generateFrameNumbers(
        "voltarAoMapa",
        { start: 0, end: 11 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.voltarAoMapaM5 = this.add
      .sprite(695, 530, "voltarAoMapa")
      .setInteractive()
      .setDepth(32);

    this.voltarAoMapaM5.anims.play("voltarAoMapaM5", true)

    this.voltarAoMapaM5.on("pointerdown", () => {
      this.musicaFundo.stop();
      this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
      minigame5Jogado = true;
      this.scene.wake("hub2");
      musicaHub2.resume();
      this.scene.stop("fimMinigame5");
    });
  }
}