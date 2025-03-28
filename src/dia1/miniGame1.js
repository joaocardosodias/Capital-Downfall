class miniGame1 extends Phaser.Scene {
  constructor(
    pontuacaoM1,
    botaoVoltar,
    fim,
    gavetas,
    card1,
    cardIndex,
    textoPontuacao,
    textoMudancaPontuacao,
    cardsRestantes,
    cardAtual
  ) {
    super("miniGame1");

    this.pontuacaoM1 = 0;
    this.botaoVoltar = botaoVoltar;
    this.fim = fim;
    this.gavetas = gavetas;
    this.card1 = card1;
    this.cardIndex = cardIndex;
    this.textoPontuacao = textoPontuacao;
    this.textoMudancaPontuacao = textoMudancaPontuacao;
    this.cardsRestantes = cardsRestantes;
    this.cardAtual = cardAtual;
    this.somMovimento;
    this.somAcerto;
    this.somErro;
    this.musicaFundo;
    this.somFimMinigame;
  }

  preload() {
    // Preload das imagens guardadas em assets
    miniGame1.cardIndex = 0;
    miniGame1.cardsRestantes = [];

    this.load.image("botaoIniciar", "src/assets/botao/botaoIniciar.png");
    this.load.image("gavetas", "src/assets/dia1/miniGame1/gavetas.png");

    for (let i = 1; i <= 10; i++) {
      this.load.image(
        "card" + i,
        "src/assets/dia1/miniGame1/card" + i + ".png"
      );
    }

    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet("voltarAoMapa", "src/assets/telas_pontuacao/voltarAoMapa.png", { frameWidth: 400, frameHeight: 110 });

    // Carrega os sons utilizados
    this.load.audio("clique", "src/assets/sounds/clique.mp3");
    this.load.audio("somMovimento", "src/assets/sounds/movePostIt.mp3");
    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
  }

  create() {
    let cards = [
      { nome: "card1", resposta: true },
      { nome: "card2", resposta: true },
      { nome: "card3", resposta: true },
      { nome: "card4", resposta: true },
      { nome: "card5", resposta: true },
      { nome: "card6", resposta: false },
      { nome: "card7", resposta: false },
      { nome: "card8", resposta: false },
      { nome: "card9", resposta: false },
      { nome: "card10", resposta: false },
    ];

    // Embaralha os cards e pega 5 aleatórios
    Phaser.Utils.Array.Shuffle(cards);
    cards = cards.slice(0, 5);

    this.cards = cards;

    // Fundo
    this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(-10);

    // Criação do primeiro card e feedback
    miniGame1.card1 = this.add
      .image(400, -500, cards[miniGame1.cardIndex].nome)
      .setScale(1)
      .setDepth(0);

    // Armazena os cards restantes no array cardsRestantes com um laço for
    for (let i = 1; i < cards.length; i++) {
      let card = this.add
        .image(400, -500, cards[i].nome)
        .setScale(1)
        .setDepth(0);
      miniGame1.cardsRestantes.push(card);
    }

    // Adiciona no canto superior esquerdo um texto com a pontuação atual do jogador
    miniGame1.textoPontuacao = this.add
      .text(20, 40, "Pontuação: " + this.pontuacaoM1, {
        fontFamily: "pixelArt",
        fill: "#ffffff",
      })
      .setDepth(15);

    miniGame1.gavetas = this.add
      .image(400, 300, "gavetas")
      .setDepth(-1)
      .setScale(1);

    let zonaRespostaAberto = this.add
      .zone(100, 300, 200, 800)
      .setRectangleDropZone(200, 800);
    zonaRespostaAberto.name = "zonaAberto";

    let zonaRespostaFechado = this.add
      .zone(700, 300, 200, 800)
      .setRectangleDropZone(200, 800);
    zonaRespostaFechado.name = "zonaFechado";

    this.input.addPointer(10);

    // Cria os sons utilizados
    this.cliqueSom = this.sound.add("clique");
    this.somMovimento = this.sound.add("somMovimento");
    this.somAcerto = this.sound.add("somAcerto", { volume: 2 });
    this.somErro = this.sound.add("somErro", { volume: 2 });
    this.musicaFundo = this.sound.add("somFundo");
    this.musicaFundo.loop = true;
    this.musicaFundo.play();
  

    this.input.on("drop", (pointer, gameObject, dropZone) => {
      if (dropZone.name === "zonaAberto") {
        this.responder(true, cards);
      } else if (dropZone.name === "zonaFechado") {
        this.responder(false, cards);
      }
      miniGame1.card1.setInteractive({ draggable: false });
    });

    this.animaCardDescendo();
  }

  responder(respostaJogador, cards) {
    let respostaCerta = cards[miniGame1.cardIndex].resposta;

    if (respostaJogador === respostaCerta) {
      this.pontuacaoM1 += 100;
      this.somAcerto.play(); //  Reproduz o som de acerto
      miniGame1.textoMudancaPontuacao = this.add
        .text(20, 40, "+100 pontos", {
          fontFamily: "pixelArt",
          fill: "#00cc00",
        })
        .setDepth(10);
    } else {
      this.pontuacaoM1 -= 50;
      this.somErro.play(); // Reproduz o som de erro
      miniGame1.textoMudancaPontuacao = this.add
        .text(20, 40, "-50 pontos", {
          fontFamily: "pixelArt",
          fill: "#cc0000",
        })
        .setDepth(10);
    }

    this.tweens.add({
      targets: miniGame1.textoMudancaPontuacao,
      y: 20,
      alpha: 0,
      duration: 2000,
      ease: "Power2",
      onComplete: () => {
        miniGame1.textoMudancaPontuacao.destroy();
      },
    });

    miniGame1.textoPontuacao.setText("Pontuação: " + this.pontuacaoM1);

    this.animaCardSumindo(cards);
  }

  animaCardSumindo() {
    let cardAtual =
      miniGame1.cardIndex === 0
        ? miniGame1.card1
        : miniGame1.cardsRestantes[miniGame1.cardIndex - 1];

    this.tweens.add({
      targets: cardAtual,
      y: 300,
      alpha: 0,
      duration: 1000,
      ease: "Power2",
      onComplete: () => {
        miniGame1.cardIndex++;
        if (miniGame1.cardIndex < 5) {
          miniGame1.card1.setTexture(this.cards[miniGame1.cardIndex].nome);
          miniGame1.card1.setY(-500).setX(400);
          this.animaCardDescendo();
        } else {
          this.sound.play("conclusao");
          this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(30).setAlpha(1);
          miniGame1.fim = this.add.image(400, 300, "fim").setDepth(31);

          pontuacao += this.pontuacaoM1

          // Criação da tela de pontuação
          this.add
            .text(402, 311, this.pontuacaoM1, {
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
            key: "voltarAoMapaM1",
            frames: this.anims.generateFrameNumbers(
              "voltarAoMapa",
              { start: 0, end: 11 }
            ),
            frameRate: 6,
            repeat: -1,
          });

          this.voltarAoMapaM1 = this.add
            .sprite(695, 530, "voltarAoMapa")
            .setInteractive()
            .setDepth(32);

          this.voltarAoMapaM1.anims.play("voltarAoMapaM1", true)
          
          this.voltarAoMapaM1.on("pointerdown", () => {
            this.musicaFundo.stop();
            this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
            minigame1Jogado = true;
            this.scene.wake("hub");
            musicaHub.resume();
            this.scene.stop("miniGame1");
          });
        }
      },
    });
  }

  animaCardDescendo() {
    this.somMovimento.play(); // Reproduz o som de movimento do card
    let cardAtual =
      miniGame1.cardIndex === 0
        ? miniGame1.card1
        : miniGame1.cardsRestantes[miniGame1.cardIndex - 1];

    if (cardAtual) {
      this.tweens.add({
        targets: cardAtual,
        y: 300,
        duration: 1000,
        ease: "Power2",
        onComplete: () => {
          cardAtual.setInteractive({ useHandCursor: true, draggable: true });

          // Adiciona o evento de clique para reproduzir o som ao arrastar
          cardAtual.on("pointerdown", () => {
            this.somMovimento.play(); // Reproduz o som do movimento dos cards
          });

          cardAtual.on("drag", function (pointer, dragX, dragY) {
            this.x = dragX;
            this.y = dragY;
          });
        },
      });
    }
  }
}
