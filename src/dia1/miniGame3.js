class miniGame3 extends Phaser.Scene {
  constructor() {
    super({ key: "miniGame3" });

    this.pontuacaoM3 = 0;
    this.larguraJogo = 800;
    this.alturaJogo = 600;
    this.cardSelecionado = null;
    this.botaoVerificar = null;
    this.textoCentral = null;
    this.posicoesOcupadas = new Map();
    this.ordemCorreta = ["3card1", "3card2", "3card3", "3card4", "3card5"];
    this.cardsSuperiores = [];
    this.cardsInferiores = [];
    this.imagensCards = ["3card1", "3card2", "3card3", "3card4", "3card5"]; // Ordem original dos cards
    this.somFundo;

    // Configurações manuais das posições iniciais dos cards superiores
    this.posicoesIniciaisCards = [
      { x: 100, y: 300 }, // Posição inicial do card 1
      { x: 250, y: 300 }, // Posição inicial do card 2
      { x: 400, y: 300 }, // Posição inicial do card 3
      { x: 550, y: 300 }, // Posição inicial do card 4
      { x: 700, y: 300 }, // Posição inicial do card 5
    ];
  }

  preload() {
    this.load.image("timeline", "src/assets/dia1/miniGame3/Timeline.png");
    this.load.image(
      "botaoVerificar",
      "src/assets/dia1/miniGame3/botaoVerificar.png"
    ); // Imagem do botão de verificação
    this.load.image("3card1", "src/assets/dia1/miniGame3/card1.png");
    this.load.image("3card2", "src/assets/dia1/miniGame3/card2.png");
    this.load.image("3card3", "src/assets/dia1/miniGame3/card3.png");
    this.load.image("3card4", "src/assets/dia1/miniGame3/card4.png");
    this.load.image("3card5", "src/assets/dia1/miniGame3/card5.png");

    // Carrega os sons utilizados
    this.load.audio("clique", "src/assets//dia2/miniGame4/sons/clique.mp3");
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
    this.load.audio("somMovimento", "src/assets/sounds/movePostIt.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");

    //  Cria as variáveis da tela de loading
    let barraProgresso = this.add.graphics();
    let caixaProgresso = this.add.graphics();
    caixaProgresso.fillStyle(0x222222, 0.8);
    caixaProgresso.fillRect(240, 270, 320, 50);

    //  Atualiza ao vivo a barra de progresso
    this.load.on("progress", function (value) {
      barraProgresso.clear();
      barraProgresso.fillStyle(0xffffff, 1);
      barraProgresso.fillRect(250, 280, 300 * value, 30);
    });

    //  Quando o jogo termina de carregar, a barra é destruída
    this.load.on("complete", function () {
      barraProgresso.destroy();
      caixaProgresso.destroy();
    });
  }

  create() {
    this.cameras.main.setBackgroundColor("#195AB4");

    this.somFundo = this.sound.add("somFundo", { loop: true });
    this.somFundo.play();

    // Embaralha a ordem dos cards
    this.embaralharArray(this.imagensCards);

    // Configurações manuais dos espaços inferiores
    const espacosInferiores = [
      { nome: "espacoInferior1", x: 100, y: 460 }, // Posição do espaço 1
      { nome: "espacoInferior2", x: 250, y: 460 }, // Posição do espaço 2
      { nome: "espacoInferior3", x: 400, y: 460 }, // Posição do espaço 3
      { nome: "espacoInferior4", x: 550, y: 460 }, // Posição do espaço 4
      { nome: "espacoInferior5", x: 700, y: 460 }, // Posição do espaço 5
    ];

    let tamanhoCard = 140; // Tamanho dos espaços

    this.input.setTopOnly(false);

    this.cardsSuperiores = [];
    this.cardsInferiores = [];
    this.posicoesOcupadas.clear();

    // Texto central com instruções
    this.textoCentral = this.add
      .text(
        this.larguraJogo / 2,
        this.alturaJogo / 2,
        "Organize os cards superiores na ordem correta!",
        {
          fontSize: "24px",
          fill: "#fff",
          backgroundColor: "#000",
          padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }
      )
      .setOrigin(0.5);

    // Criar os cards superiores com posições iniciais personalizadas
    for (let i = 0; i < 5; i++) {
      let posicaoInicial = this.posicoesIniciaisCards[i];
      let card = this.add
        .image(posicaoInicial.x, posicaoInicial.y, this.imagensCards[i])
        .setOrigin(0.5)
        .setInteractive()
        .setDepth(2) // Cards superiores com depth maior (ficam por cima)
        .setScale(1);

      // Salva a posição original do card
      card.setData("posicaoOriginal", { x: card.x, y: card.y });
      card.setData("moved", false); // Indica se o card já foi movido para um espaço

      // Habilitar o arrasto do card
      this.input.setDraggable(card);
      this.cardsSuperiores.push(card);
    }

    // Criar os espaços inferiores manualmente
    espacosInferiores.forEach((espaco, index) => {
      let area = this.add
        .rectangle(espaco.x, espaco.y, tamanhoCard, tamanhoCard, 0xffffff)
        .setOrigin(0.5)
        .setDepth(0) // Espaços inferiores com depth menor (ficam por trás)
        .setInteractive();

      this.cardsInferiores.push(area);
      this.posicoesOcupadas.set(area, null);
    });

    // Adicionar o background (timeline)
    let timeline = this.add
      .image(this.larguraJogo / 2, this.alturaJogo / 2, "timeline")
      .setScale(1)
      .setDepth(1); // Timeline com depth intermediário

    // Botão de verificação (inicialmente invisível)
    this.botaoVerificar = this.add
      .image(this.larguraJogo / 2, this.alturaJogo - 350, "botaoVerificar") // Posição ajustada
      .setScale(0.5) // Ajuste a escala conforme necessário
      .setInteractive() // Torna a imagem interativa
      .setDepth(3) // Garante que o botão fique na frente de outros objetos
      .setVisible(false); // Inicialmente invisível

    // Evento de clique no botão de verificação
    this.botaoVerificar.on("pointerdown", () => {
      this.sound.play("clique"); // Reproduz o som de clique
      // Calcula a pontuação
      let { acertos, erros } = this.contaErros();
      this.pontuacaoM3 += acertos * 100 - erros * 50;

      pontuacao += this.pontuacaoM3;

      this.somFundo.stop();

      // Avança para a cena de resultado com a pontuação
      this.scene.start("fimDoMinigame3", {
        pontuacaoM3: this.pontuacaoM3,
        pontuacao: pontuacao,
      });
      this.scene.stop("miniGame3");
    });

    // Evento de arrastar
    this.input.on("dragstart", (pointer, gameObject) => {
      if (this.cardsSuperiores.includes(gameObject)) {
        this.sound.play("somMovimento"); // Reproduz o som de movimento ao começar a arrastar
      }
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      if (this.cardsSuperiores.includes(gameObject)) {
        // Atualiza a posição do card enquanto ele é arrastado
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    });

    // Evento de soltar
    this.input.on("dragend", (pointer, gameObject) => {
      if (this.cardsSuperiores.includes(gameObject)) {
        let espacoEncontrado = this.cardsInferiores.find((espaco) => {
          return Phaser.Geom.Rectangle.Contains(
            espaco.getBounds(),
            pointer.x,
            pointer.y
          );
        });

        if (espacoEncontrado) {
          // Verifica se o espaço já está ocupado
          let cardNoEspaco = this.posicoesOcupadas.get(espacoEncontrado);

          if (!cardNoEspaco) {
            // Se o espaço não está ocupado, move o card para o espaço (aumenta a escala)
            this.tweens.add({
              targets: gameObject,
              x: espacoEncontrado.x,
              y: espacoEncontrado.y,
              duration: 200,
              ease: "Power2",
              onComplete: () => {
                // Libera o espaço anterior, se houver
                for (let [espaco, card] of this.posicoesOcupadas.entries()) {
                  if (card === gameObject) {
                    this.posicoesOcupadas.set(espaco, null);
                    break;
                  }
                }

                // Ocupa o novo espaço
                this.posicoesOcupadas.set(espacoEncontrado, gameObject);
                gameObject.setData("moved", true);
                this.verificaEncaixes();
              },
            });
          } else {
            // Se o espaço já está ocupado, retorna o card para a posição original
            this.tweens.add({
              targets: gameObject,
              x: gameObject.getData("posicaoOriginal").x,
              y: gameObject.getData("posicaoOriginal").y,
              duration: 200,
              ease: "Power2",
              onComplete: () => {
                // Remove o card do espaço ocupado, se estiver em algum
                for (let [espaco, card] of this.posicoesOcupadas.entries()) {
                  if (card === gameObject) {
                    this.posicoesOcupadas.set(espaco, null);
                    break;
                  }
                }
                gameObject.setData("moved", false);
                this.verificaEncaixes();
              },
            });
          }
        } else {
          // Se o card não foi solto em um espaço válido, retorna para a posição original (diminui a escala)
          this.tweens.add({
            targets: gameObject,
            x: gameObject.getData("posicaoOriginal").x,
            y: gameObject.getData("posicaoOriginal").y,
            duration: 200,
            ease: "Power2",
            onComplete: () => {
              // Remove o card do espaço ocupado, se estiver em algum
              for (let [espaco, card] of this.posicoesOcupadas.entries()) {
                if (card === gameObject) {
                  this.posicoesOcupadas.set(espaco, null);
                  break;
                }
              }
              gameObject.setData("moved", false);
              this.verificaEncaixes();
            },
          });
        }
      }
    });
  }

  // Função para embaralhar um array
  embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
  }

  // Função para verificar se todos os cards foram encaixados
  verificaEncaixes() {
    let totalEncaixados = [...this.posicoesOcupadas.values()].filter(
      Boolean
    ).length;
    this.botaoVerificar.setVisible(totalEncaixados === 5);

    if (totalEncaixados === 5) {
      this.textoCentral.setVisible(false);
    }
  }

  // Função para calcular acertos e erros
  contaErros() {
    let ordemAtual = [];
    this.cardsInferiores.forEach((espaco) => {
      let card = this.posicoesOcupadas.get(espaco);
      if (card) {
        ordemAtual.push(card.texture.key); // Adiciona a chave do card à ordem atual
      } else {
        ordemAtual.push(null); // Se o espaço estiver vazio, adiciona null
      }
    });

    let acertos = 0;
    let erros = 0;

    ordemAtual.forEach((card, index) => {
      if (card === this.ordemCorreta[index]) {
        acertos++;
      } else if (card !== null) {
        erros++;
      }
    });

    return { acertos, erros };
  }
}

class fimDoMinigame3 extends Phaser.Scene {
  constructor() {
    super({ key: "fimDoMinigame3" });
  }

  init(data) {
    this.pontuacaoM3 = data.pontuacaoM3; // Recebe a pontuação da cena anterior
  }

  preload() {
    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet(
      "voltarAoMapa",
      "src/assets/telas_pontuacao/voltarAoMapa.png",
      { frameWidth: 400, frameHeight: 110 }
    );

    this.load.audio("clique", "src/assets/sounds/clique.mp3");
    this.load.audio("somConclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.audio("musicaFundo", "src/assets/sounds/escritorioFlow.mp3");
  }

  create() {
    this.cliqueSom = this.sound.add("clique");
    this.musicaFundo = this.sound.add("musicaFundo"); // Adiciona o som da música de fundo
    this.musicaFundo.setLoop(true); // Define que a música de fundo deve ser repetida
    this.musicaFundo.play(); // Inicia a música de fundo

    this.sound.play("conclusao");
    this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(30).setAlpha(1);
    miniGame3.fim = this.add.image(400, 300, "fim").setDepth(31);

    // Criação da tela de pontuação
    this.add
      .text(402, 311, this.pontuacaoM3, {
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
      key: "voltarAoMapaM3",
      frames: this.anims.generateFrameNumbers("voltarAoMapa", {
        start: 0,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.voltarAoMapaM3 = this.add
      .sprite(695, 530, "voltarAoMapa")
      .setInteractive()
      .setDepth(32);

    this.voltarAoMapaM3.anims.play("voltarAoMapaM3", true);

    this.voltarAoMapaM3.on("pointerdown", () => {
      this.musicaFundo.stop();
      this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
      minigame3Jogado = true;
      this.scene.wake("hub");
      musicaHub.resume();
      this.scene.stop("fimDoMinigame3");
    });
  }
}
