class miniGame1 extends Phaser.Scene {

    //Para evitar conflitos com o mesmo nome de variáveis, elas foram colocadas dentro do constructor da classe.

    constructor(botaoVoltar,fim,gavetas,card1,cardIndex,textoPontuacao,textoMudancaPontuacao,cardsRestantes,cardAtual) {
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
        //Preload das imagens guardadas em assets
       
        miniGame1.cardIndex = 0;
        
        miniGame1.cardsRestantes = [];

        this.load.image('botaoIniciar', 'assets/botaoIniciar.png');
        // this.load.image('botaoContinuar', 'assets/botaoLogin.png');
        this.load.image('gavetas', 'assets/miniGame1/gavetas.png');

        for (let i = 1; i <= 10; i++) {
            this.load.image('card' + i, 'assets/miniGame1/card' + i + '.png');
        }

        // for (let i = 1; i <= 10; i++) {
        //     this.load.image('feedback' + i, 'assets/miniGame1/feedback' + i + '.png');
        // }

        this.load.image('fim', 'assets/miniGame1/fim.png');
        this.load.image('botaoVoltar', 'assets/miniGame1/botaoVoltar.png');
    }




    create() {

        

        let cards = [
            { nome: 'card1', resposta: true},
            { nome: 'card2', resposta: true},
            { nome: 'card3', resposta: true},
            { nome: 'card4', resposta: true},
            { nome: 'card5', resposta: true},
            { nome: 'card6', resposta: false},
            { nome: 'card7', resposta: false},
            { nome: 'card8', resposta: false},
            { nome: 'card9', resposta: false},
            { nome: 'card10', resposta: false},
        ];

        // Embaralha os cards e pega 5 aleatórios
        Phaser.Utils.Array.Shuffle(cards);
        cards = cards.slice(0, 5);

        this.cards = cards;

        // let feedbacks = []; // Adiciona um array para armazenar os feedbacks

        // Fundo
        this.add.rectangle(400, 300, 800, 600, 0x9999ff).setDepth(-10);

        // Criação do primeiro card e feedback
       miniGame1.card1 = this.add.image(400, -500, cards[miniGame1.cardIndex].nome).setScale(1).setDepth(0);
        // feedback1 = this.add.image(400, -500, cards[cardIndex].feedback).setScale(1).setDepth(10);

        // Armazena os cards restantes no array cardsRestantes com um laço for
        for (let i = 1; i < cards.length; i++) {
            let card = this.add.image(400, -500, cards[i].nome).setScale(1).setDepth(0);
            miniGame1.cardsRestantes.push(card); // Adiciona os cards restantes no array
            // let feedback = this.add.image(400, -500, cards[i].feedback).setScale(1).setDepth(i + 10);
            // feedbacks.push(feedback); // Adiciona os feedbacks no array
        }

        //Adiciona no canto superior esquerdo um texto com a pontuação atual do jogador
        miniGame1.textoPontuacao = this.add.text(20, 40, 'Pontuação: ' + pontuacao, {
            font: '30px Arial',
            fill: '#ffffff'
        }).setDepth(15);

        miniGame1.botaoIniciar = this.add.image(400, 300, 'botaoIniciar').setInteractive().setDepth(0).setVisible(true).setScale(1);

        // botaoContinuar = this.add.image(400, 450, 'botaoContinuar').setInteractive(false).setDepth(cards.length + 11).setVisible(false).setScale(1);

        miniGame1.gavetas = this.add.image(400, 300, 'gavetas').setDepth(-1).setVisible(false).setScale(1);

        let zonaRespostaAberto = this.add.zone(100, 300, 200, 800).setRectangleDropZone(200, 800);
        zonaRespostaAberto.name = "zonaAberto";

        let zonaRespostaFechado = this.add.zone(700, 300, 200, 800).setRectangleDropZone(200, 800);
        zonaRespostaFechado.name = "zonaFechado";

        this.input.addPointer(10);

        //Verifica se o botão foi pressionado

        miniGame1.botaoIniciar.setInteractive().on('pointerdown', (pointer) => {

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
            pontuacao += 100; //Aumenta a pontuação
            //Adiciona um texto ao lado que mostra que o jogador ganhou 100 pontos
            miniGame1.textoMudancaPontuacao = this.add.text(20, 40, '+100 pontos', {
                font: '20px Arial',
                fill: '#00cc00', // Cor do texto: verde
            }).setDepth(10);
        } else { //Se o jogador errou
            pontuacao -= 50; //Ele perde 50 pontos
            //Adiciona um texto ao lado que mostra que o jogador perdeu 50 pontos
            miniGame1.textoMudancaPontuacao = this.add.text(20, 40, '-50 pontos', {
                font: '20px Arial',
                fill: '#cc0000', //Cor do texto: vermelha
            }).setDepth(10);
        }

        //faz o texto do lado subir 
        this.tweens.add({
            targets: miniGame1.textoMudancaPontuacao, // O objeto que será animado
            y: 20, // Posição até onde o texto vai subir
            alpha: 0, // Faz o texto desaparecer gradualmente
            duration: 2000, // A animação dura 2 segundos
            ease: 'Power2', // Usa a curva de suavização "Power2" (aceleração suave)
            onComplete: () => {
                miniGame1.textoMudancaPontuacao.destroy(); // Após a animação ser completada, remove o texto da tela
            }
        });

        //Atualiza o placar
        miniGame1.textoPontuacao.setText('Pontuação: ' + pontuacao);

        this.animaCardSumindo(cards);

    }



// Esta funcionalidade ainda não está funcionando, pois não consegui encontrar uma solução em tempo razoável. Então, o jogo só funciona se você acertar todas as questões :P
    // feedback() {
    //     this.tweens.add({
    //         targets: [feedbacks[cardIndex], botaoContinuar],
    //         alpha: 1,
    //         duration: 1000,
    //         ease: 'Power2',
    //         onComplete: () => {
    //             botaoContinuar.on('pointerdown', () => {
    //                 this.tweens.add({
    //                     targets: [feedbacks[cardIndex], botaoContinuar],
    //                     alpha: 0,
    //                     duration: 1000,
    //                     ease: 'Power2',
    //                     onComplete: () => {
    //                         this.proximoCard();
    //                         botaoContinuar.setInteractive(false).setVisible(false);
    //                     }
    //                 });
    //             }).setInteractive(true).setVisible(true);
    //         }
    //     })
    // }




    animaCardSumindo() {
        let cardAtual = miniGame1.cardIndex === 0 ? miniGame1.card1 : miniGame1.cardsRestantes[miniGame1.cardIndex - 1];

        this.tweens.add({
            targets: cardAtual, //elementos que serão animados
            y: 300, // Posição até qual eles vão subir
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                miniGame1.cardIndex++; // Adiciona uma unidade ao cardIndex
                if (miniGame1.cardIndex < 5) {
                    // Se ainda houver cardss, troca a imagem do card e reposiciona
                    miniGame1.card1.setTexture(this.cards[miniGame1.cardIndex].nome);
                    miniGame1.card1.setY(-500).setX(400); // Restaura a posição X e Y do card para o valor inicial

                    // Chama a funçaõ que anima o card seguinte entrando na tela
                    this.animaCardDescendo();
                } else {
                    // Se não houver mais cards, vai para a próxima cena
                    this.add.rectangle(400, 300, 800, 600, 0x000000).setDepth(30); // Fundo preto 
                    miniGame1.fim = this.add.image(400, 300, 'fim').setDepth(31); // Exibe a tela final

                    //Mostra a pontuação final do jogador na tela
                    let textoFinal = this.add.text(520, 275, pontuacao, {
                        font: '40px Lexend',
                        fill: '#ffffff' //Cor branca
                    }).setOrigin(0.5).setDepth(31);

                    // Criação do botão para voltar ao jogo
                    miniGame1.botaoVoltar = this.add.image(400, 400, 'botaoVoltar').setInteractive().setDepth(32).setScale(0.9);

                    miniGame1.botaoVoltar.on('pointerdown', () => {
                        minigame1Jogado = true;
                        this.scene.restart('hub'); //Se você clicar no botão Voltar, você volta pra hub do jogo
                        this.scene.stop('miniGame1');
                    });
                }
            }
        });
    }




    animaCardDescendo() {
        let cardAtual = miniGame1.cardIndex === 0 ? miniGame1.card1 : miniGame1.cardsRestantes[miniGame1.cardIndex - 1];

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
