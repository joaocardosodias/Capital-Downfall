class miniGame1 extends Phaser.Scene {

    constructor(botaoVoltar, fim, gavetas, card1, cardIndex, textoPontuacao, textoMudancaPontuacao, cardsRestantes, cardAtual) {
        super('miniGame1');

        this.botaoVoltar = botaoVoltar;
        this.fim = fim;
        this.gavetas = gavetas;
        this.card1 = card1;
        this.cardIndex = cardIndex;
        this.textoPontuacao = textoPontuacao;
        this.textoMudancaPontuacao = textoMudancaPontuacao;
        this.cardsRestantes = cardsRestantes;
        this.cardAtual = cardAtual;
    }

    preload() {
        // Preload das imagens guardadas em assets
        miniGame1.cardIndex = 0;
        miniGame1.cardsRestantes = [];

        this.load.image('botaoIniciar', 'src/assets/botao/botaoIniciar.png');
        this.load.image('gavetas', 'src/assets/dia1/miniGame1/gavetas.png');

        for (let i = 1; i <= 10; i++) {
            this.load.image('card' + i, 'src/assets/dia1/miniGame1/card' + i + '.png');
        }

        this.load.image('fim', 'src/assets/dia1/miniGame1/fim.png');
        this.load.image('botaoVoltar', 'src/assets/dia1/miniGame1/botaoVoltar.png');

        // Carrega o som de clique
        this.load.audio('clique', 'src/assets/dia2/miniGame4/sons/clique.mp3');
    }

    create() {
        let cards = [
            { nome: 'card1', resposta: true },
            { nome: 'card2', resposta: true },
            { nome: 'card3', resposta: true },
            { nome: 'card4', resposta: true },
            { nome: 'card5', resposta: true },
            { nome: 'card6', resposta: false },
            { nome: 'card7', resposta: false },
            { nome: 'card8', resposta: false },
            { nome: 'card9', resposta: false },
            { nome: 'card10', resposta: false },
        ];

        // Embaralha os cards e pega 5 aleatórios
        Phaser.Utils.Array.Shuffle(cards);
        cards = cards.slice(0, 5);

        this.cards = cards;

        // Fundo
        this.add.rectangle(400, 300, 800, 600, 0x9999ff).setDepth(-10);

        // Criação do primeiro card e feedback
        miniGame1.card1 = this.add.image(400, -500, cards[miniGame1.cardIndex].nome).setScale(1).setDepth(0);

        // Armazena os cards restantes no array cardsRestantes com um laço for
        for (let i = 1; i < cards.length; i++) {
            let card = this.add.image(400, -500, cards[i].nome).setScale(1).setDepth(0);
            miniGame1.cardsRestantes.push(card);
        }

        // Adiciona no canto superior esquerdo um texto com a pontuação atual do jogador
        miniGame1.textoPontuacao = this.add.text(20, 40, 'Pontuação: ' + pontuacao, {
            font: '30px Arial',
            fill: '#ffffff'
        }).setDepth(15);

        miniGame1.botaoIniciar = this.add.image(400, 300, 'botaoIniciar').setInteractive().setDepth(0).setVisible(true).setScale(1);

        miniGame1.gavetas = this.add.image(400, 300, 'gavetas').setDepth(-1).setVisible(false).setScale(1);

        let zonaRespostaAberto = this.add.zone(100, 300, 200, 800).setRectangleDropZone(200, 800);
        zonaRespostaAberto.name = "zonaAberto";

        let zonaRespostaFechado = this.add.zone(700, 300, 200, 800).setRectangleDropZone(200, 800);
        zonaRespostaFechado.name = "zonaFechado";

        this.input.addPointer(10);

        // Cria o som de clique
        this.cliqueSom = this.sound.add('clique');

        // Verifica se o botão foi pressionado
        miniGame1.botaoIniciar.setInteractive().on('pointerdown', (pointer) => {
            this.cliqueSom.play(); // Reproduz o som de clique
            miniGame1.botaoIniciar.setVisible(false);
            miniGame1.gavetas.setVisible(true);
            this.animaCardDescendo();
        });

        this.input.on("drop", (pointer, gameObject, dropZone) => {
            if (dropZone.name === "zonaAberto") {
                this.responder(true, cards);
            } else if (dropZone.name === "zonaFechado") {
                this.responder(false, cards);
            }
            miniGame1.card1.setInteractive({ draggable: false });
        });
    }

    responder(respostaJogador, cards) {
        let respostaCerta = cards[miniGame1.cardIndex].resposta;

        if (respostaJogador === respostaCerta) {
            pontuacao += 100;
            miniGame1.textoMudancaPontuacao = this.add.text(20, 40, '+100 pontos', {
                font: '20px Arial',
                fill: '#00cc00',
            }).setDepth(10);
        } else {
            pontuacao -= 50;
            miniGame1.textoMudancaPontuacao = this.add.text(20, 40, '-50 pontos', {
                font: '20px Arial',
                fill: '#cc0000',
            }).setDepth(10);
        }

        this.tweens.add({
            targets: miniGame1.textoMudancaPontuacao,
            y: 20,
            alpha: 0,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                miniGame1.textoMudancaPontuacao.destroy();
            }
        });

        miniGame1.textoPontuacao.setText('Pontuação: ' + pontuacao);

        this.animaCardSumindo(cards);
    }

    animaCardSumindo() {
        let cardAtual = miniGame1.cardIndex === 0 ? miniGame1.card1 : miniGame1.cardsRestantes[miniGame1.cardIndex - 1];

        this.tweens.add({
            targets: cardAtual,
            y: 300,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                miniGame1.cardIndex++;
                if (miniGame1.cardIndex < 5) {
                    miniGame1.card1.setTexture(this.cards[miniGame1.cardIndex].nome);
                    miniGame1.card1.setY(-500).setX(400);
                    this.animaCardDescendo();
                } else {
                    this.add.rectangle(400, 300, 800, 600, 0x000000).setDepth(30);
                    miniGame1.fim = this.add.image(400, 300, 'fim').setDepth(31);

                    let textoFinal = this.add.text(520, 275, pontuacao, {
                        font: '40px Lexend',
                        fill: '#ffffff'
                    }).setOrigin(0.5).setDepth(31);

                    miniGame1.botaoVoltar = this.add.image(400, 400, 'botaoVoltar').setInteractive().setDepth(32).setScale(0.9);

                    miniGame1.botaoVoltar.on('pointerdown', () => {
                        this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
                        minigame1Jogado = true;
                        this.scene.wake('hub');
                        this.scene.stop('miniGame1');
                    });
                }
            }
        });
    }

    animaCardDescendo() {
        let cardAtual = miniGame1.cardIndex === 0 ? miniGame1.card1 : miniGame1.cardsRestantes[miniGame1.cardIndex - 1];

        if (cardAtual) {
            this.tweens.add({
                targets: cardAtual,
                y: 300,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    cardAtual.setInteractive({ useHandCursor: true, draggable: true });

                    // Adiciona o evento de clique para reproduzir o som ao arrastar
                    cardAtual.on('pointerdown', () => {
                        this.cliqueSom.play(); // Reproduz o som de clique ao clicar no card
                    });

                    cardAtual.on('drag', function (pointer, dragX, dragY) {
                        this.x = dragX;
                        this.y = dragY;
                    });
                }
            });
        }
    }
}