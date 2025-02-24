
let botaoContinuar;
let botaoVoltar;
let fim;
let gavetas;
let pontuacao = 0;
let card1;
let cardIndex = 0;
let feedback1;
let textoPontuacao;
let textoMudancaPontuacao;
let cardsRestantes = [];
let feedbacks = [];
let cardAtual;




class miniGame1 extends Phaser.Scene {

    constructor() {
        super('miniGame1');
    }

    preload() {
        //Preload das imagens guardadas em assets

        this.load.image('botaoIniciar', 'assets/botaoIniciar.png');
        this.load.image('botaoContinuar', 'assets/botaoLogin.png');
        this.load.image('gavetas', 'assets/miniGame1/gavetas.png');

        for (let i = 1; i <= 10; i++) {
            this.load.image('card' + i, 'assets/miniGame1/card' + i + '.png');
        }

        for (let i = 1; i <= 10; i++) {
            this.load.image('feedback' + i, 'assets/miniGame1/feedback' + i + '.png');
        }

        this.load.image('fim', 'assets/miniGame1/fim.png');
        this.load.image('botaoVoltar', 'assets/miniGame1/botaoVoltar.png');
    }




    create() {

        let cards = [
            { nome: 'card1', resposta: true, feedback: 'feedback1' },
            { nome: 'card2', resposta: true, feedback: 'feedback2' },
            { nome: 'card3', resposta: true, feedback: 'feedback3' },
            { nome: 'card4', resposta: true, feedback: 'feedback4' },
            { nome: 'card5', resposta: true, feedback: 'feedback5' },
            { nome: 'card6', resposta: false, feedback: 'feedback6' },
            { nome: 'card7', resposta: false, feedback: 'feedback7' },
            { nome: 'card8', resposta: false, feedback: 'feedback8' },
            { nome: 'card9', resposta: false, feedback: 'feedback9' },
            { nome: 'card10', resposta: false, feedback: 'feedback10' },
        ];

        // Embaralha os cards e pega 5 aleatórios
        Phaser.Utils.Array.Shuffle(cards);
        cards = cards.slice(0, 5);

        this.cards = cards;

        let feedbacks = []; // Adiciona um array para armazenar os feedbacks

        // Fundo
        this.add.rectangle(400, 300, 800, 600, 0x9999ff).setDepth(-10);

        // Criação do primeiro card e feedback
        card1 = this.add.image(400, -500, cards[cardIndex].nome).setScale(1).setDepth(0);
        feedback1 = this.add.image(400, -500, cards[cardIndex].feedback).setScale(1).setDepth(10);

        // Armazena os cards restantes no array cardsRestantes com um laço for
        for (let i = 1; i < cards.length; i++) {
            let card = this.add.image(400, -500, cards[i].nome).setScale(1).setDepth(0);
            cardsRestantes.push(card); // Adiciona os cards restantes no array
            let feedback = this.add.image(400, -500, cards[i].feedback).setScale(1).setDepth(i + 10);
            feedbacks.push(feedback); // Adiciona os feedbacks no array
        }

        //Adiciona no canto superior esquerdo um texto com a pontuação atual do jogador
        textoPontuacao = this.add.text(20, 40, 'Pontuação: ' + pontuacao, {
            font: '30px Arial',
            fill: '#ffffff'
        }).setDepth(15);

        botaoIniciar = this.add.image(400, 300, 'botaoIniciar').setInteractive().setDepth(0).setVisible(true).setScale(1);

        botaoContinuar = this.add.image(400, 450, 'botaoContinuar').setInteractive(false).setDepth(cards.length + 11).setVisible(false).setScale(1);

        gavetas = this.add.image(400, 300, 'gavetas').setDepth(-1).setVisible(false).setScale(1);

        let zonaRespostaAberto = this.add.zone(100, 300, 200, 800).setRectangleDropZone(200, 800);
        zonaRespostaAberto.name = "zonaAberto";

        let zonaRespostaFechado = this.add.zone(700, 300, 200, 800).setRectangleDropZone(200, 800);
        zonaRespostaFechado.name = "zonaFechado";

        this.input.addPointer(10);

        //Verifica se o botão foi pressionado

        botaoIniciar.setInteractive().on('pointerdown', (pointer) => {

            botaoIniciar.setVisible(false);

            gavetas.setVisible(true);

            this.animaCardDescendo();

        });

        this.input.on("drop", (pointer, gameObject, dropZone) => {
            if (dropZone.name === "zonaAberto") {
                this.responder(true, cards);
            } else if (dropZone.name === "zonaFechado") {
                this.responder(false, cards);
            }
            card1.setInteractive({ draggable: false });
        });
    }




    responder(respostaJogador, cards) {

        let respostaCerta = cards[cardIndex].resposta;

        if (respostaJogador === respostaCerta) {
            pontuacao += 100; //Aumenta a pontuação
            //Adiciona um texto ao lado que mostra que o jogador ganhou 100 pontos
            textoMudancaPontuacao = this.add.text(20, 40, '+100 pontos', {
                font: '20px Arial',
                fill: '#00cc00', // Cor do texto: verde
            }).setDepth(10);
            this.animaCardSumindo(cards);
        } else { //Se o jogador errou
            pontuacao -= 50; //Ele perde 50 pontos
            //Adiciona um texto ao lado que mostra que o jogador perdeu 50 pontos
            textoMudancaPontuacao = this.add.text(20, 40, '-50 pontos', {
                font: '20px Arial',
                fill: '#cc0000', //Cor do texto: vermelha
            }).setDepth(10);
            this.feedback();
        }

        //faz o texto do lado subir 
        this.tweens.add({
            targets: textoMudancaPontuacao, // O objeto que será animado
            y: 20, // Posição até onde o texto vai subir
            alpha: 0, // Faz o texto desaparecer gradualmente
            duration: 2000, // A animação dura 2 segundos
            ease: 'Power2', // Usa a curva de suavização "Power2" (aceleração suave)
            onComplete: () => {
                textoMudancaPontuacao.destroy(); // Após a animação ser completada, remove o texto da tela
            }
        });

        //Atualiza o placar
        textoPontuacao.setText('Pontuação: ' + pontuacao);

    }



// Esta funcionalidade ainda não está funcionando, pois não consegui encontrar uma solução em tempo razoável. Então, o jogo só funciona se você acertar todas as questões :P
    feedback() {
        this.tweens.add({
            targets: [feedbacks[cardIndex], botaoContinuar],
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                botaoContinuar.on('pointerdown', () => {
                    this.tweens.add({
                        targets: [feedbacks[cardIndex], botaoContinuar],
                        alpha: 0,
                        duration: 1000,
                        ease: 'Power2',
                        onComplete: () => {
                            this.proximoCard();
                            botaoContinuar.setInteractive(false).setVisible(false);
                        }
                    });
                }).setInteractive(true).setVisible(true);
            }
        })
    }




    animaCardSumindo() {
        let cardAtual = cardIndex === 0 ? card1 : cardsRestantes[cardIndex - 1];

        this.tweens.add({
            targets: cardAtual, //elementos que serão animados
            y: 300, // Posição até qual eles vão subir
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                cardIndex++; // Adiciona uma unidade ao cardIndex
                if (cardIndex < 5) {
                    // Se ainda houver cardss, troca a imagem do card e reposiciona
                    card1.setTexture(this.cards[cardIndex].nome);
                    card1.setY(-500).setX(400); // Restaura a posição X e Y do card para o valor inicial

                    // Chama a funçaõ que anima o card seguinte entrando na tela
                    this.animaCardDescendo();
                } else {
                    // Se não houver mais cards, vai para a próxima cena
                    this.add.rectangle(400, 300, 800, 600, 0x000000).setDepth(30); // Fundo preto 
                    fim = this.add.image(400, 300, 'fim').setDepth(31); // Exibe a tela final

                    //Mostra a pontuação final do jogador na tela
                    let textoFinal = this.add.text(565, 295, pontuacao, {
                        font: '40px Arial',
                        fill: '#00000' //Cor preta
                    }).setOrigin(0.5).setDepth(31);

                    // Criação do botão para voltar ao jogo
                    botaoVoltar = this.add.image(400, 400, 'botaoVoltar').setInteractive().setDepth(32).setScale(0.9);

                    botaoVoltar.on('pointerdown', () => {
                        this.scene.start('hub'); //Se você clicar no botão Voltar, você volta pra hub do jogo
                    });
                }
            }
        });
    }




    animaCardDescendo() {
        let cardAtual = cardIndex === 0 ? card1 : cardsRestantes[cardIndex - 1];

        if (cardAtual) { // Garante que há um card válido para animar
            this.tweens.add({
                targets: cardAtual,
                y: 300,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    cardAtual.setInteractive({ useHandCursor: true, draggable: true });

                    cardAtual.on('drag', function (pointer, dragX, dragY) {
                        this.x = dragX;
                        this.y = dragY;
                    });
                }
            });
        }
    }
}
