let pontuacaoM4 = 0;
let cardsDisponiveis = [true, true, true, true]; // true = disponível, false = indisponível
let lousaDesligada = false;

// Classe principal da cena inicial do jogo
class miniGame4 extends Phaser.Scene {
  constructor() {
    super({ key: "miniGame4" });
    pontuacaoM4 = 0;
    // Variável para controlar se a animação dos cards já foi executada
    this.animacaoCardsExecutada = false;
    this.musicaFundo;
  }

  // Método para carregar recursos (imagens, sons, etc.)
  preload() {
    this.load.image(
      "backgroundMinigame4",
      "src/assets/dia2/miniGame4/background.png"
    ); // Carrega o fundo da cena
    this.load.image(
      "enunciadoMinigame4",
      "src/assets/dia2/miniGame4/enunciado.png"
    ); // Carrega a imagem do enunciado
    this.load.image("cartao1", "src/assets/dia2/miniGame4/botaoICMS.png"); // Carrega a imagem do card 1
    this.load.image("cartao2", "src/assets/dia2/miniGame4/botaoIPI.png"); // Carrega a imagem do card 2
    this.load.image("cartao3", "src/assets/dia2/miniGame4/botaoIOF.png"); // Carrega a imagem do card 3
    this.load.image("cartao4", "src/assets/dia2/miniGame4/botaoISS.png"); // Carrega a imagem do card 4
    this.load.image(
      "botaoFinalizar",
      "src/assets/dia2/miniGame4/botaoVerificar.png"
    ); // Carrega a imagem do botão de finalizar
    this.load.audio("clique", "src/assets/dia2/miniGame4/sons/clique.mp3"); // Carrega o som de clique
    this.load.audio("somMovimento", "src/assets/sounds/movePostIt.mp3");
    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
  }

  // Método para criar e configurar a cena
  create(data) {
    // Adiciona o fundo da cena
    const bg = this.add.image(0, 0, "backgroundMinigame4").setOrigin(0, 0);
    bg.displayWidth = 800;
    bg.displayHeight = 600;

    // Adiciona a imagem do enunciado na cena
    this.add.image(400, 100, "enunciadoMinigame4").setScale(2);

    // Exibe a pontuação no canto superior esquerdo
    this.pontuacaoText = this.add.text(20, 20, `Pontuação: ${pontuacaoM4}`, {
      fontSize: "24px",
      fill: "#000",
    });

    // Cria os cards interativos
    this.cartao1 = this.add.image(100, 300, "cartao1").setInteractive();
    this.cartao2 = this.add.image(300, 300, "cartao2").setInteractive();
    this.cartao3 = this.add.image(500, 300, "cartao3").setInteractive();
    this.cartao4 = this.add.image(700, 300, "cartao4").setInteractive();

    // Ajusta o tamanho dos cards
    this.cartao1.setScale(0.8);
    this.cartao2.setScale(0.8);
    this.cartao3.setScale(0.8);
    this.cartao4.setScale(0.8);

    // Adiciona animação de hover aos cards
    this.adicionarAnimacaoHoverCard(this.cartao1);
    this.adicionarAnimacaoHoverCard(this.cartao2);
    this.adicionarAnimacaoHoverCard(this.cartao3);
    this.adicionarAnimacaoHoverCard(this.cartao4);

    // Verifica se os cards estão disponíveis e aplica transparência aos já finalizados
    if (!cardsDisponiveis[0]) {
      this.cartao1.alpha = 0.5; // Apenas define a transparência, sem animação
      this.cartao1.disableInteractive();
    }
    if (!cardsDisponiveis[1]) {
      this.cartao2.alpha = 0.5;
      this.cartao2.disableInteractive();
    }
    if (!cardsDisponiveis[2]) {
      this.cartao3.alpha = 0.5;
      this.cartao3.disableInteractive();
    }
    if (!cardsDisponiveis[3]) {
      this.cartao4.alpha = 0.5;
      this.cartao4.disableInteractive();
    }

    // Executa a animação de entrada dos cards apenas uma vez
    if (!this.animacaoCardsExecutada) {
      this.cartao1.y = -100;
      this.cartao2.y = -100;
      this.cartao3.y = -100;
      this.cartao4.y = -100;

      // Animação de entrada suave dos cards
      this.tweens.add({
        targets: this.cartao1,
        y: 300,
        duration: 1000,
        ease: "Sine.easeInOut",
      });
      this.tweens.add({
        targets: this.cartao2,
        y: 300,
        duration: 1000,
        ease: "Sine.easeInOut",
        delay: 200,
      });
      this.tweens.add({
        targets: this.cartao3,
        y: 300,
        duration: 1000,
        ease: "Sine.easeInOut",
        delay: 400,
      });
      this.tweens.add({
        targets: this.cartao4,
        y: 300,
        duration: 1000,
        ease: "Sine.easeInOut",
        delay: 600,
      });

      this.animacaoCardsExecutada = true; // Marca a animação como executada
    }

    // Adiciona interação aos cards com som de clique
    this.cartao1.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.transicaoParaCena("tributacaoScene1");
    });
    this.cartao2.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.transicaoParaCena("tributacaoScene2");
    });
    this.cartao3.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.transicaoParaCena("tributacaoScene3");
    });
    this.cartao4.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.transicaoParaCena("tributacaoScene4");
    });

    // Verifica se todos os cards foram concluídos
    if (!cardsDisponiveis.includes(true)) {
      const botaoFinalizar = this.add
        .image(400, 550, "botaoFinalizar")
        .setInteractive()
        .setScale(0.5);
      // Adiciona animação de hover ao botão de finalizar
      this.adicionarAnimacaoHoverFinalizar(botaoFinalizar);
      // Animação de leve pulsação no botão de finalizar
      this.tweens.add({
        targets: botaoFinalizar,
        scale: 0.52,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
      });
      botaoFinalizar.on("pointerdown", () => {
        this.sound.play("clique"); // Toca o som de clique

        this.transicaoParaCena('fimMinigame4', {
          pontuacaoM4: pontuacaoM4,
          pontuacao: pontuacao
        });
      });
    }

    // Verifica se há um card finalizado para animar
    if (data && data.cardFinalizado !== undefined) {
      const cardFinalizado = this[`cartao${data.cardFinalizado + 1}`]; // Ajuste no índice
      this.animarFinalizacaoCard(cardFinalizado);
    }
  }



  // Método para adicionar animação de hover aos cards
  adicionarAnimacaoHoverCard(objeto) {
    objeto.on("pointerover", () => {
      this.tweens.add({
        targets: objeto,
        scale: 0.88, // Aumenta 10% do tamanho original
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });

    objeto.on("pointerout", () => {
      this.tweens.add({
        targets: objeto,
        scale: 0.8, // Volta ao tamanho original
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });
  }

  // Método para adicionar animação de hover ao botao finalizar
  adicionarAnimacaoHoverFinalizar(objeto) {
    objeto.on("pointerover", () => {
      this.tweens.add({
        targets: objeto,
        scale: 0.55, // Aumenta 10% do tamanho original
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });

    objeto.on("pointerout", () => {
      this.tweens.add({
        targets: objeto,
        scale: 0.5, // Volta ao tamanho original
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });
  }

  // Método para animar a finalização de um card
  animarFinalizacaoCard(cartao) {
    // Salva o tamanho original do card
    const originalScale = cartao.scale;

    // Animação de aumento e redução do tamanho, seguida de transparência parcial
    this.tweens.add({
      targets: cartao,
      scale: originalScale * 1.2, // Aumenta 20% do tamanho original
      duration: 300,
      ease: "Sine.easeInOut",
      yoyo: true, // Volta ao tamanho original
      onComplete: () => {
        // Animação de redução e transparência parcial
        this.tweens.add({
          targets: cartao,
          scale: originalScale, // Mantém o tamanho original
          alpha: 0.5, // Define a transparência para 50%
          duration: 300,
          ease: "Sine.easeInOut",
          onComplete: () => {
            // Desativa a interação do card
            cartao.disableInteractive();
          },
        });
      },
    });
  }

  // Método para transicionar para outra cena com efeito de fade-out
  transicaoParaCena(cena) {
    // Animação de transição (fade-out)
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
      if (progress === 1) {
        this.scene.start(cena);
      }
    });
  }
}

// Classe base para as cenas de tributação
class BaseTributacaoScene extends Phaser.Scene {
  constructor(key) {
    super({ key });
    this.canetaEscrevendo;
  }

  // Método para carregar recursos específicos de cada cena
  preload() {
    this.load.image(
      "backgroundMinigame4",
      "src/assets/dia2/miniGame4/background.jpg"
    ); // Carrega o fundo da cena
    this.load.image(
      "pergunta1Minigame4",
      "src/assets/dia2/miniGame4/pergunta1.png"
    ); // Carrega a imagem da pergunta do card 1
    this.load.image(
      "pergunta2Minigame4",
      "src/assets/dia2/miniGame4/pergunta2.png"
    ); // Carrega a imagem da pergunta do card 2
    this.load.image(
      "pergunta3Minigame4",
      "src/assets/dia2/miniGame4/pergunta3.png"
    ); // Carrega a imagem da pergunta do card 3
    this.load.image(
      "pergunta4Minigame4",
      "src/assets/dia2/miniGame4/pergunta4.png"
    ); // Carrega a imagem da pergunta do card 4
    this.load.image(
      "botaoVermelho",
      "src/assets/dia2/miniGame4/botaoVermelho.png"
    ); // Carrega o botão vermelho
    this.load.image("botaoAzul", "src/assets/dia2/miniGame4/botaoAzul.png"); // Carrega o botão azul
    this.load.image("botaoVerde", "src/assets/dia2/miniGame4/botaoVerde.png"); // Carrega o botão verde
    this.load.image("botaoPreto", "src/assets/dia2/miniGame4/botaoPreto.png"); // Carrega o botão preto
    this.load.image("borracha", "src/assets/dia2/miniGame4/borracha.png"); // Carrega a borracha
    this.load.image(
      "botaoVoltarMinigame4",
      "src/assets/dia2/miniGame4/botaoVoltar.png"
    ); // Carrega o botão de voltar
    this.load.image("botaoLimpar", "src/assets/dia2/miniGame4/botaoLimpar.png"); // Carrega o botão de limpar
    this.load.image(
      "botaoAumentar",
      "src/assets/dia2/miniGame4/botaoAumentar.png"
    ); // Carrega o botão de aumentar espessura
    this.load.image(
      "botaoDiminuir",
      "src/assets/dia2/miniGame4/botaoDIminuir.png"
    ); // Carrega o botão de diminuir espessura
    this.load.audio("clique", "src/assets/dia2/miniGame4/sons/clique.mp3"); // Carrega o som de clique

    // Carrega as imagens dos bloquinhos para cada card
    if (this.scene.key === "tributacaoScene1") {
      this.load.image(
        "bloquinho1Card1",
        "src/assets/dia2/miniGame4/bloquinho1Card1.png"
      );
      this.load.image(
        "bloquinho2Card1",
        "src/assets/dia2/miniGame4/bloquinho2Card1.png"
      );
      this.load.image(
        "bloquinho3Card1",
        "src/assets/dia2/miniGame4/bloquinho3Card1.png"
      );
      this.load.image(
        "bloquinho4Card1",
        "src/assets/dia2/miniGame4/bloquinho4Card1.png"
      );
    } else if (this.scene.key === "tributacaoScene2") {
      this.load.image(
        "bloquinho1Card2",
        "src/assets/dia2/miniGame4/bloquinho1Card2.png"
      );
      this.load.image(
        "bloquinho2Card2",
        "src/assets/dia2/miniGame4/bloquinho2Card2.png"
      );
      this.load.image(
        "bloquinho3Card2",
        "src/assets/dia2/miniGame4/bloquinho3Card2.png"
      );
      this.load.image(
        "bloquinho4Card2",
        "src/assets/dia2/miniGame4/bloquinho4Card2.png"
      );
    } else if (this.scene.key === "tributacaoScene3") {
      this.load.image(
        "bloquinho1Card3",
        "src/assets/dia2/miniGame4/bloquinho1Card3.png"
      );
      this.load.image(
        "bloquinho2Card3",
        "src/assets/dia2/miniGame4/bloquinho2Card3.png"
      );
      this.load.image(
        "bloquinho3Card3",
        "src/assets/dia2/miniGame4/bloquinho3Card3.png"
      );
      this.load.image(
        "bloquinho4Card3",
        "src/assets/dia2/miniGame4/bloquinho4Card3.png"
      );
    } else if (this.scene.key === "tributacaoScene4") {
      this.load.image(
        "bloquinho1Card4",
        "src/assets/dia2/miniGame4/bloquinho1Card4.png"
      );
      this.load.image(
        "bloquinho2Card4",
        "src/assets/dia2/miniGame4/bloquinho2Card4.png"
      );
      this.load.image(
        "bloquinho3Card4",
        "src/assets/dia2/miniGame4/bloquinho3Card4.png"
      );
      this.load.image(
        "bloquinho4Card4",
        "src/assets/dia2/miniGame4/bloquinho4Card4.png"
      );
    }
    this.load.audio("somMovimento", "src/assets/sounds/movePostIt.mp3");
    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
    this.load.audio("canetaEscrevendo", "src/assets/sounds/scratchPencil.mp3");
  }

  // Método para criar e configurar a cena
  create() {
    lousaDesligada = false;

    this.canetaEscrevendo = this.sound.add("canetaEscrevendo");
    this.canetaEscrevendo.setLoop(true);

    // Adiciona o fundo da cena
    const bg = this.add.image(0, 0, "backgroundMinigame4").setOrigin(0, 0);
    bg.displayWidth = this.sys.game.config.width;
    bg.displayHeight = this.sys.game.config.height;

    // Adiciona a imagem da pergunta correspondente ao card
    if (this.scene.key === "tributacaoScene1") {
      this.add.image(400, 100, "pergunta1Minigame4").setScale(1);
    } else if (this.scene.key === "tributacaoScene2") {
      this.add.image(400, 100, "pergunta2Minigame4").setScale(1);
    } else if (this.scene.key === "tributacaoScene3") {
      this.add.image(400, 100, "pergunta3Minigame4").setScale(1);
    } else if (this.scene.key === "tributacaoScene4") {
      this.add.image(400, 100, "pergunta4Minigame4").setScale(1);
    }

    // Animação de entrada da cena (fade-in)
    this.cameras.main.fadeIn(500, 0, 0, 0);

    // Configuração da lousa (área de desenho)
    const lousaConfig = {
      x: 400,
      y: 327,
      width: 600,
      height: 300,
      fillColor: 0xffffff,
      strokeColor: 0x000000,
      strokeWidth: 2,
    };

    const lousa = this.add
      .rectangle(
        lousaConfig.x,
        lousaConfig.y,
        lousaConfig.width,
        lousaConfig.height,
        lousaConfig.fillColor
      )
      .setOrigin(0.5);

    lousa.setStrokeStyle(lousaConfig.strokeWidth, lousaConfig.strokeColor);

    // Variáveis para controle do desenho
    this.linhasDesenhadas = [];
    this.desenhoAtivo = false;
    this.corDesenho = 0x000000;
    this.espessuraDesenho = 4;

    // Configuração da interação de desenho na lousa
    this.input.on("pointerdown", (pointer) => {
      if (lousa.getBounds().contains(pointer.x, pointer.y)) {
        this.desenhoAtivo = true;
        const novaLinha = this.add.graphics();
        novaLinha.lineStyle(this.espessuraDesenho, this.corDesenho);
        novaLinha.moveTo(pointer.x, pointer.y);
        this.linhasDesenhadas.push(novaLinha);
        if (!lousaDesligada) {
          this.canetaEscrevendo.play();
        }
      }
    });

    this.input.on("pointerup", () => {
      this.desenhoAtivo = false;
      this.canetaEscrevendo.stop();
    });

    this.input.on("pointermove", (pointer) => {
      if (
        this.desenhoAtivo &&
        pointer.isDown &&
        lousa.getBounds().contains(pointer.x, pointer.y)
      ) {
        const linhaAtual =
          this.linhasDesenhadas[this.linhasDesenhadas.length - 1];
        linhaAtual.lineTo(pointer.x, pointer.y);
        linhaAtual.strokePath();
      }
    });

    // Botão de voltar com animação de clique e hover
    const backButton = this.add
      .image(40, 40, "botaoVoltarMinigame4")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(backButton);
    backButton.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.tweens.add({
        targets: backButton,
        scale: 0.9,
        duration: 100,
        yoyo: true,
        onComplete: () => this.transicaoParaCena("miniGame4"),
      });
    });

    // Botão de limpar com animação de clique e hover
    const clearButton = this.add
      .image(40, 550, "botaoLimpar")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(clearButton);
    clearButton.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.tweens.add({
        targets: clearButton,
        scale: 0.9,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          this.linhasDesenhadas.forEach((linha) => linha.clear());
          this.linhasDesenhadas = [];
        },
      });
    });

    // Botões de cor e borracha com animação de hover
    const botaoVermelho = this.add
      .image(80, 195, "botaoVermelho")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(botaoVermelho);
    botaoVermelho.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.corDesenho = 0xff0000;
    });

    const botaoAzul = this.add
      .image(80, 232, "botaoAzul")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(botaoAzul);
    botaoAzul.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.corDesenho = 0x0000ff;
    });

    const botaoVerde = this.add
      .image(80, 269, "botaoVerde")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(botaoVerde);
    botaoVerde.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.corDesenho = 0x00ff00;
    });

    const botaoPreto = this.add
      .image(80, 306, "botaoPreto")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(botaoPreto);
    botaoPreto.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.corDesenho = 0x000000;
    });

    const borracha = this.add
      .image(80, 341, "borracha")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(borracha);
    borracha.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.corDesenho = 0xffffff;
    });

    // Botão de aumentar espessura com animação de clique e hover
    const aumentarEspessura = this.add
      .image(720, 190, "botaoAumentar")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(aumentarEspessura);
    aumentarEspessura.on("pointerdown", () => {
      this.espessuraDesenho += 2;
      if (this.espessuraDesenho > 20) this.espessuraDesenho = 20;
      this.sound.play("clique"); // Toca o som de clique
      this.tweens.add({
        targets: aumentarEspessura,
        scale: 0.9,
        duration: 100,
        yoyo: true,
      });
    });

    // Botão de diminuir espessura com animação de clique e hover
    const diminuirEspessura = this.add
      .image(770, 190, "botaoDiminuir")
      .setInteractive()
      .setScale(1);
    this.adicionarAnimacaoHoverBotao(diminuirEspessura);
    diminuirEspessura.on("pointerdown", () => {
      this.sound.play("clique"); // Toca o som de clique
      this.tweens.add({
        targets: diminuirEspessura,
        scale: 0.9,
        duration: 100,
        yoyo: true,
        onComplete: () => {
          this.espessuraDesenho -= 2;
          if (this.espessuraDesenho < 2) this.espessuraDesenho = 2;
        },
      });
    });

    // Adiciona as imagens dos bloquinhos com animação suave e hover
    if (this.scene.key === "tributacaoScene1") {
      this.adicionarBloquinhos(
        [
          "bloquinho1Card1",
          "bloquinho2Card1",
          "bloquinho3Card1",
          "bloquinho4Card1",
        ],
        3,
        0
      );
    } else if (this.scene.key === "tributacaoScene2") {
      this.adicionarBloquinhos(
        [
          "bloquinho1Card2",
          "bloquinho2Card2",
          "bloquinho3Card2",
          "bloquinho4Card2",
        ],
        1,
        1
      );
    } else if (this.scene.key === "tributacaoScene3") {
      this.adicionarBloquinhos(
        [
          "bloquinho1Card3",
          "bloquinho2Card3",
          "bloquinho3Card3",
          "bloquinho4Card3",
        ],
        4,
        2
      );
    } else if (this.scene.key === "tributacaoScene4") {
      this.adicionarBloquinhos(
        [
          "bloquinho1Card4",
          "bloquinho2Card4",
          "bloquinho3Card4",
          "bloquinho4Card4",
        ],
        2,
        3
      );
    }
  }

  // Método para adicionar animação de hover a um objeto
  adicionarAnimacaoHoverBloco(objeto) {
    objeto.on("pointerover", () => {
      this.tweens.add({
        targets: objeto,
        scale: 1.1, // Aumenta 10% do tamanho original
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });

    objeto.on("pointerout", () => {
      this.tweens.add({
        targets: objeto,
        scale: 1, // Volta ao tamanho original
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });
  }

  // Método para adicionar animação de hover a um objeto
  adicionarAnimacaoHoverBotao(objeto) {
    objeto.on("pointerover", () => {
      this.tweens.add({
        targets: objeto,
        scale: 1.1, // Aumenta 10% do tamanho original
        depth: 2,
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });

    objeto.on("pointerout", () => {
      this.tweens.add({
        targets: objeto,
        scale: 1, // Volta ao tamanho original
        depth: 1,
        duration: 200,
        ease: "Sine.easeInOut",
      });
    });
  }

  // Método para adicionar os bloquinhos com animação e interação
  adicionarBloquinhos(bloquinhos, respostaCorreta, cardIndex) {
    const posicoes = [165, 325, 485, 645]; // Posições X dos bloquinhos
    const posicaoY = 530; // Posição Y dos bloquinhos
    const escala = 1; // Escala dos bloquinhos

    bloquinhos.forEach((bloquinho, index) => {
      const img = this.add
        .image(posicoes[index], posicaoY, bloquinho)
        .setInteractive()
        .setScale(escala);
      // Adiciona animação de hover aos bloquinhos
      this.adicionarAnimacaoHoverBloco(img);

      // Animação de entrada suave dos bloquinhos
      this.tweens.add({
        targets: img,
        y: posicaoY,
        duration: 1000,
        ease: "Sine.easeInOut",
        delay: index * 200,
      });

      img.on("pointerdown", () => {
        this.sound.play("clique"); // Toca o som de clique
        if (index + 1 === respostaCorreta) {
          pontuacaoM4 += 100;
          this.sound.play("somAcerto", { volume: 2 });
        } else {
          pontuacaoM4 -= 50;
          this.sound.play("somErro", { volume: 2 });
        }
        // Indisponibiliza o card correspondente
        cardsDisponiveis[cardIndex] = false;

        // Volta para a cena principal e passa o índice do card finalizado
        this.transicaoParaCena("miniGame4", {
          cardFinalizado: cardIndex,
          pontuacaoM4: pontuacaoM4
        });
      });
    });
  }

  // Método para transicionar para outra cena com efeito de fade-out
  transicaoParaCena(cena, data) {
    // Animação de transição (fade-out)
    this.cameras.main.fadeOut(500, 0, 0, 0, (camera, progress) => {
      if (progress === 1) {
        lousaDesligada = true;
        this.canetaEscrevendo.stop();
        this.scene.start(cena, data);
      }
    });
  }
}

// Classes específicas para cada cena de tributação
class tributacaoScene1 extends BaseTributacaoScene {
  constructor() {
    super("tributacaoScene1");
  }
}

class tributacaoScene2 extends BaseTributacaoScene {
  constructor() {
    super("tributacaoScene2");
  }
}

class tributacaoScene3 extends BaseTributacaoScene {
  constructor() {
    super("tributacaoScene3");
  }
}

class tributacaoScene4 extends BaseTributacaoScene {
  constructor() {
    super("tributacaoScene4");
  }
}

// Classe para a cena de finalização do jogo
class fimMinigame4 extends Phaser.Scene {
  constructor() {
    super({ key: "fimMinigame4" });
  }

  preload() {
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet("voltarAoMapa", "src/assets/telas_pontuacao/voltarAoMapa.png", { frameWidth: 400, frameHeight: 110 });

    this.load.audio("clique", "src/assets/sounds/clique.mp3");
    this.load.audio("somConclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.audio("musicaFundo", "src/assets/sounds/escritorioFlow.mp3");
  }

  // Método para criar a cena de finalização
  create() {
    this.sound.play("conclusao");
    musicaMinigame4.stop();
    this.cliqueSom = this.sound.add("clique");
    this.musicaFundo = this.sound.add("musicaFundo"); // Adiciona o som da música de fundo
    this.musicaFundo.setLoop(true); // Define que a música de fundo deve ser repetida
    this.musicaFundo.play(); // Inicia a música de fundo

    this.sound.play("conclusao");
    this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(30).setAlpha(1);
    miniGame4.fim = this.add.image(400, 300, "fim").setDepth(31);

    pontuacao += pontuacaoM4

    // Criação da tela de pontuação
    this.add
      .text(402, 311, pontuacaoM4, {
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
      key: "voltarAoMapaM4",
      frames: this.anims.generateFrameNumbers(
        "voltarAoMapa",
        { start: 0, end: 11 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.voltarAoMapaM4 = this.add
      .sprite(695, 530, "voltarAoMapa")
      .setInteractive()
      .setDepth(32);

    this.voltarAoMapaM4.anims.play("voltarAoMapaM4", true)

    this.voltarAoMapaM4.on("pointerdown", () => {
      this.musicaFundo.stop();
      this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
      this.scene.stop("fimMinigame4")
      minigame4Jogado = true;
      this.scene.wake("hub2");
      musicaHub2.resume();
      ;
    });
  }
}
