class miniGame5 extends baseCena {
  constructor() {
    super("miniGame5");
    this.pontuacaoM5 = 0;
    // Arrays para armazenar elementos do jogo
    this.cards = []; // Cartões com siglas (lado esquerdo)
    this.definitions = []; // Definições (lado direito)
    this.lines = []; // Linhas de conexão entre cartões e definições

    // Variáveis de estado do jogo
    this.draggingLine = null; // Linha sendo arrastada no momento
    this.draggingStart = null; // Cartão de origem do arrasto
    this.scoreText = null; // Elemento de texto da pontuação
    this.arrow = null; // Seta para avançar ao completar

    // Contadores e flags
    this.connectionsMade = 0; // Número de conexões feitas
    this.connectedDefinitions = new Set(); // Definições já conectadas
    this.animationInProgress = true; // Flag para animações iniciais
    this.animationCompleteCount = 0; // Contador de animações completas
    this.connectionAnimationInProgress = false; // Flag para animação de conexão

    // Elementos de áudio
    this.somFundo = null; // Música de fundo
    this.somAcerto = null; // Som de acerto
    this.somErro = null; // Som de erro
  }

  // Cria a cena e configura os elementos iniciais
  create() {
    // Configura o background (centralizado e redimensionado)
    this.add.image(400, 300, "background").setOrigin(0.5, 0.5).setScale(8);

    // Inicializa e toca a música de fundo
    this.somFundo = this.sound.add("somFundo", { loop: true });
    this.somFundo.play();

    // Configura os efeitos sonoros
    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });

    // Adiciona o enunciado no topo da tela
    this.enunciadoImage = this.add
      .image(400, 50, "enunciado")
      .setOrigin(0.5, 0)
      .setScale(0.8);

    // Cria o texto de pontuação
    this.scoreText = this.add
      .text(80, 1, `Pontuação: ${this.pontuacaoM5}`, {
        fontFamily: "pixelArt",

        fill: "#ffffff",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5, 0);

    // Configura som de clique para interações
    this.clickSound = this.sound.add("click");

    // Dados dos pares cartão-definição
    // Cada objeto contém:
    // - imgSigla: imagem do cartão
    // - imgDef: imagem da definição
    // - sigla: identificador único para correspondência
    let data = [
      { imgSigla: "acoesCard", imgDef: "acoesDefinition", sigla: "acoes" },
      {
        imgSigla: "imobiliarioCard",
        imgDef: "imobiliarioDefinition",
        sigla: "imobiliario",
      },
      {
        imgSigla: "multimercadoCard",
        imgDef: "multimercadoDefinition",
        sigla: "multimercado",
      },
      {
        imgSigla: "rendafixaCard",
        imgDef: "rendafixaDefinition",
        sigla: "rendafixa",
      },
      {
        imgSigla: "privatyequityCard",
        imgDef: "privatyequityDefinition",
        sigla: "privatyequity",
      },
    ];

    // Embaralha os cartões e definições para variar a cada jogo
    this.shuffleArray(data);
    let shuffledDefinitions = [...data];
    this.shuffleArray(shuffledDefinitions);

    // Posições Y para os elementos (5 cartões + 5 definições)
    let yPositions = [150, 250, 350, 450, 550];

    // Cria os cartões com animação de entrada
    data.forEach((item, index) => {
      // Cria o cartão começando acima da tela (y = -100)
      let card = this.add.image(100, -100, item.imgSigla);
      card.setScale(1);

      // Armazena dados importantes no objeto do cartão
      card.setData("sigla", item.sigla); // Sigla para correspondência
      card.setData("connected", false); // Status de conexão

      // Inicialmente desativa interação durante animação
      card.disableInteractive();

      // Configura interatividade do cartão
      card.setInteractive({ useHandCursor: true });

      // Evento quando clica no cartão (inicia arrasto)
      card.on("pointerdown", () => {
        // Só permite interação se não houver animação em andamento
        if (!this.animationInProgress && !this.connectionAnimationInProgress) {
          this.clickSound.play(); // Toca som de clique
          this.startDragging(card, this); // Inicia arrasto
        }
      });

      // Efeito visual quando mouse passa sobre o cartão
      card.on("pointerover", () => {
        // Só aplica efeito se o cartão não estiver conectado
        if (
          !card.getData("connected") &&
          !this.animationInProgress &&
          !this.connectionAnimationInProgress
        ) {
          this.tweens.add({
            targets: card,
            scaleX: 0.8, // Aumenta ligeiramente
            scaleY: 0.8,
            duration: 100,
            ease: "Power2",
          });
        }
      });

      // Efeito quando mouse sai do cartão
      card.on("pointerout", () => {
        if (
          !card.getData("connected") &&
          !this.animationInProgress &&
          !this.connectionAnimationInProgress
        ) {
          this.tweens.add({
            targets: card,
            scaleX: 1, // Volta ao tamanho normal
            scaleY: 1,
            duration: 100,
            ease: "Power2",
          });
        }
      });

      // Animação de entrada - cartão "cai" para sua posição final
      this.tweens.add({
        targets: card,
        y: yPositions[index], // Posição Y final
        duration: 1500, // Duração da animação (1.5s)
        ease: "Sine.out", // Tipo de easing (suavização)
        onComplete: () => {
          this.animationCompleteCount++;
          // Quando todas animações terminam, ativa interações
          if (
            this.animationCompleteCount ===
            data.length + shuffledDefinitions.length
          ) {
            this.enableInteractions();
          }
        },
      });
      this.cards.push(card); // Adiciona ao array de cartões
    });

    // Cria as definições com animação de entrada
    shuffledDefinitions.forEach((item, index) => {
      // Cria definição começando acima da tela (y = -100)
      let definition = this.add.image(600, -100, item.imgDef);
      definition.setScale(1);
      definition.setData("sigla", item.sigla); // Armazena sigla para correspondência

      // Animação de entrada - definição "cai" para posição final
      this.tweens.add({
        targets: definition,
        y: yPositions[index], // Posição Y final
        duration: 1500, // Duração da animação (1.5s)
        ease: "Sine.out", // Tipo de easing
        onComplete: () => {
          this.animationCompleteCount++;
          // Quando todas animações terminam, ativa interações
          if (
            this.animationCompleteCount ===
            data.length + shuffledDefinitions.length
          ) {
            this.enableInteractions();
          }
        },
      });
      this.definitions.push(definition); // Adiciona ao array de definições
    });
  }

  // Ativa as interações após as animações iniciais terminarem
  enableInteractions() {
    this.animationInProgress = false; // Marca animações como concluídas

    // Ativa interação para todos os cartões
    this.cards.forEach((card) => card.setInteractive());
  }

  // Função para embaralhar arrays (algoritmo Fisher-Yates)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca elementos
    }
  }

  // Inicia o arrasto de uma linha a partir de um cartão
  startDragging(card, scene) {
    // Verifica se pode iniciar arrasto
    if (
      card.getData("connected") ||
      this.animationInProgress ||
      this.connectionAnimationInProgress
    ) {
      return;
    }

    this.draggingStart = card; // Armazena cartão de origem

    // Calcula ponto de início (borda direita do cartão)
    const startX = card.x + card.displayWidth / 2;
    const startY = card.y;

    // Cria a linha que será arrastada
    this.draggingLine = scene.add.line(
      startX,
      startY, // Posição inicial
      0,
      0, // Ponto inicial (relativo)
      0,
      0, // Ponto final (será atualizado)
      0xffffff // Cor branca
    );
    this.draggingLine.setLineWidth(8); // Espessura da linha
    this.draggingLine.setAlpha(1); // Opacidade

    // Configura listeners para movimento e soltura do mouse
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
    // Verifica se pode processar o fim do arrasto
    if (
      !this.draggingStart ||
      this.animationInProgress ||
      this.connectionAnimationInProgress
    ) {
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
      if (
        this.connectedDefinitions.has(matchedDefinition) ||
        this.draggingStart.getData("connected")
      ) {
        if (this.draggingLine) this.draggingLine.destroy();
        this.draggingStart = null;
        this.draggingLine = null;
        return;
      }

      // Marca que está em animação de conexão
      this.connectionAnimationInProgress = true;

      // Verifica se a correspondência está correta
      const isCorrect =
        matchedDefinition.getData("sigla") ===
        this.draggingStart.getData("sigla");

      // Atualiza pontuação conforme acerto/erro
      if (isCorrect) {
        this.pontuacaoM5 += 100; // Acerto: +100 pontos
        this.somAcerto.play(); // Toca som de acerto
        this.scoreText.setText(`Pontuação: ${this.pontuacaoM5}`); // Atualiza texto
        this.showScoreAnimation(scene, "+100", 0x00ff00); // Feedback verde
      } else {
        this.pontuacaoM5 -= 50; // Erro: -50 pontos
        this.somErro.play(); // Toca som de erro
        this.scoreText.setText(`Pontuação: ${this.pontuacaoM5}`);

        this.showScoreAnimation(scene, "-50", 0xff0000); // Feedback vermelho
      }

      // Marca elementos como conectados
      this.draggingStart.setData("connected", true);
      this.connectedDefinitions.add(matchedDefinition);
      this.connectionsMade++;

      // Calcula posições finais da linha
      const startX =
        this.draggingStart.x + this.draggingStart.displayWidth / 2.5;
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
      this.animateConnection(
        scene,
        this.draggingStart,
        matchedDefinition,
        () => {
          this.connectionAnimationInProgress = false;
          this.updateLineAfterAnimation(
            scene,
            this.draggingStart,
            matchedDefinition
          );
        }
      );
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
      scaleX: 0.85, // Aumenta um pouco
      scaleY: 0.85,
      duration: 450, // Duração da animação
      ease: "Power2", // Tipo de easing
      onComplete: () => {
        // Animação de volta ao tamanho normal
        scene.tweens.add({
          targets: [card, definition],
          scaleX: 0.8,
          scaleY: 0.8,
          alpha: 1,
          duration: 400,
          ease: "Power2",
          onComplete: onComplete, // Chama callback ao terminar
        });
      },
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
    // Cria texto com estilo destacado
    let scoreAnimation = scene.add
      .text(400, 300, text, {
        fontFamily: "pixelArt",
        fill: color,
        stroke: "#FFFFFF",
        strokeThickness: 4,
      })
      .setOrigin(0.5, 0.5);

    // Animação de texto subindo e desaparecendo
    scene.tweens.add({
      targets: scoreAnimation,
      y: 250, // Move para cima
      alpha: 0, // Desaparece gradualmente
      duration: 1000, // 1 segundo de duração
      onComplete: () => scoreAnimation.destroy(), // Remove ao terminar
    });
  }

  // Mostra seta para avançar quando completa todas conexões
  showArrow(scene) {
    this.arrow = scene.add.image(400, 300, "arrow").setInteractive();
    this.arrow.setScale(0.3);

    // Configura clique na seta
    this.arrow.on("pointerdown", () => {
      this.somFundo.stop();
      this.clickSound.play();
      this.scene.start("fimMinigame5", {
        pontuacaoM5: this.pontuacaoM5,
        pontuacao: pontuacao,
      });
    });

    // Animação de pulsação da seta
    scene.tweens.add({
      targets: this.arrow,
      scaleX: 0.35, // Aumenta um pouco
      scaleY: 0.35,
      duration: 500, // 0.5 segundos
      yoyo: true, // Volta ao tamanho original
      repeat: -1, // Repete infinitamente
    });
  }

  // Método update vazio (não usado neste jogo)
  update() { }
}

// Cena que mostra a pontuação final
class fimMinigame5 extends baseCena {
  constructor() {
    super("fimMinigame5");
    this.clickSound = null; // Som de clique
    this.somCorrect; // Som de conclusão
  }

  init(data) {
    this.pontuacaoM5 = data.pontuacaoM5; // Recebe a pontuação da cena anterior
  }

  // Pré-carrega assets necessários
  preload() {
    this.load.audio("click", "src/assets/dia2/miniGame5/click.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet(
      "voltarAoMapa",
      "src/assets/telas_pontuacao/voltarAoMapa.png",
      { frameWidth: 400, frameHeight: 110 }
    );

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

    this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(30).setAlpha(1);
    miniGame5.fim = this.add.image(400, 300, "fim").setDepth(31);

    pontuacao += this.pontuacaoM5;

    // Criação da tela de pontuação
    this.add
      .text(402, 311, this.pontuacaoM5, {
        fontFamily: "pixelArtNumeros",
        fill: "#ffffff",
        fontSize: "32px",
      })
      .setOrigin(0.5)
      .setDepth(32);

    this.add
      .text(402, 409, pontuacao, {
        fontFamily: "pixelArtNumeros",
        fill: "#ffffff",
        fontSize: "48px",
      })
      .setOrigin(0.5)
      .setDepth(32);

    this.anims.create({
      key: "voltarAoMapaM5",
      frames: this.anims.generateFrameNumbers("voltarAoMapa", {
        start: 0,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.voltarAoMapaM5 = this.add
      .sprite(695, 530, "voltarAoMapa")
      .setInteractive()
      .setDepth(32);

    this.voltarAoMapaM5.anims.play("voltarAoMapaM5", true);

    this.voltarAoMapaM5.on("pointerdown", () => {
      if (!transicionando) {
        this.musicaFundo.stop();
        this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
        minigame5Jogado = true;
        this.transicao('hub2', false, false, true, 200,);
        musicaHub2.resume();
      }
    });
  }
}
