class miniGame3 extends Phaser.Scene {

    constructor() {
        super({ key: 'miniGame3' });

        this.larguraJogo = 800;
        this.alturaJogo = 600;
        this.cardSelecionado = null;
        this.botaoVerificar = null;
        this.textoCentral = null;
        this.posicoesOcupadas = new Map();
        this.ordemCorreta = ['3card1', '3card2', '3card3', '3card4', '3card5'];
        this.cardsSuperiores = [];
        this.cardsInferiores = [];
        this.imagensCards = ['3card1', '3card2', '3card3', '3card4', '3card5']; // Ordem original dos cards
    }

    preload() {
        this.load.image('timeline', 'src/assets/dia1/miniGame3/Timeline.png');
        this.load.image('botaoVerificar', 'src/assets/dia1/miniGame3/botaoVerificar.png'); // Imagem do botão de verificação
        this.load.image('3card1', 'src/assets/dia1/miniGame3/card1.png');
        this.load.image('3card2', 'src/assets/dia1/miniGame3/card2.png');
        this.load.image('3card3', 'src/assets/dia1/miniGame3/card3.png');
        this.load.image('3card4', 'src/assets/dia1/miniGame3/card4.png');
        this.load.image('3card5', 'src/assets/dia1/miniGame3/card5.png');
    }

    create() {

        this.cameras.main.setBackgroundColor('#195AB4');

        // Embaralha a ordem dos cards
        this.embaralharArray(this.imagensCards);

        // Configurações manuais dos espaços inferiores
        const espacosInferiores = [
            { nome: 'espacoInferior1', x: 78, y: 420 }, // Posição do espaço 1
            { nome: 'espacoInferior2', x: 239, y: 420 }, // Posição do espaço 2
            { nome: 'espacoInferior3', x: 400, y: 420 }, // Posição do espaço 3
            { nome: 'espacoInferior4', x: 561, y: 420 }, // Posição do espaço 4
            { nome: 'espacoInferior5', x: 720, y: 420 }  // Posição do espaço 5
        ];

        let tamanhoCard = 100; // Tamanho dos espaços
        let yTopo = 250; // Posição vertical dos cards superiores

        this.input.setTopOnly(false);

        this.cardsSuperiores = [];
        this.cardsInferiores = [];
        this.posicoesOcupadas.clear();

        // Texto central com instruções
        this.textoCentral = this.add.text(this.larguraJogo / 2, this.alturaJogo / 2, 'Organize os cards superiores na ordem correta!', {
            fontSize: '24px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setOrigin(0.5);

        // Criar os cards superiores
        for (let i = 0; i < 5; i++) {
            let card = this.add.image((i + 1) * (this.larguraJogo / 6), yTopo, this.imagensCards[i])
                .setOrigin(0.5)
                .setInteractive()
                .setDepth(2) // Cards superiores com depth maior (ficam por cima)
                .setScale(0.6);

            // Salva a posição original do card
            card.setData('posicaoOriginal', { x: card.x, y: card.y });
            card.setData('moved', false); // Indica se o card já foi movido para um espaço

            // Habilitar o arrasto do card
            this.input.setDraggable(card);
            this.cardsSuperiores.push(card);
        }

        // Criar os espaços inferiores manualmente
        espacosInferiores.forEach((espaco, index) => {
            let area = this.add.rectangle(espaco.x, espaco.y, tamanhoCard, tamanhoCard, 0xffffff)
                .setOrigin(0.5)
                .setDepth(0) // Espaços inferiores com depth menor (ficam por trás)
                .setInteractive();

            this.cardsInferiores.push(area);
            this.posicoesOcupadas.set(area, null);
        });

        // Adicionar o background (timeline)
        let timeline = this.add.image(this.larguraJogo / 2, this.alturaJogo * 0.7, 'timeline')
            .setScale(1.06, 1.4)
            .setDepth(1); // Timeline com depth intermediário

        // Botão de verificação (inicialmente invisível)
        this.botaoVerificar = this.add.image(this.larguraJogo / 2, this.alturaJogo - 350, 'botaoVerificar') // Posição ajustada
            .setScale(0.5) // Ajuste a escala conforme necessário
            .setInteractive() // Torna a imagem interativa
            .setDepth(3) // Garante que o botão fique na frente de outros objetos
            .setVisible(false); // Inicialmente invisível

        // Evento de clique no botão de verificação
        this.botaoVerificar.on('pointerdown', () => {
            // Calcula a pontuação
            let { acertos, erros } = this.contaErros();
            let pontuacaoRodada = (acertos * 100) - (erros * 50);

            //console.log(`Acertos: ${acertos}, Erros: ${erros}, Pontuação: ${pontuacaoRodada}`); // Debug: Exibe a pontuação no console

            // Avança para a cena de resultado com a pontuação
            this.scene.start('fimDoMinigame3', {
                pontuacao: pontuacaoRodada
            });
            this.scene.stop('miniGame3');
        });

        // Evento de arrastar
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (this.cardsSuperiores.includes(gameObject)) {
                // Atualiza a posição do card enquanto ele é arrastado
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });

        // Evento de soltar
        this.input.on('dragend', (pointer, gameObject) => {
            if (this.cardsSuperiores.includes(gameObject)) {
                let espacoEncontrado = this.cardsInferiores.find(espaco => {
                    return Phaser.Geom.Rectangle.Contains(espaco.getBounds(), pointer.x, pointer.y);
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
                            scaleX: 1.1, // Aumenta a escala horizontal
                            scaleY: 1.4, // Aumenta a escala vertical
                            duration: 200,
                            ease: 'Power2',
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
                                gameObject.setData('moved', true);
                                this.verificaEncaixes();
                            }
                        });
                    } else {
                        // Se o espaço já está ocupado, retorna o card para a posição original
                        this.tweens.add({
                            targets: gameObject,
                            x: gameObject.getData('posicaoOriginal').x,
                            y: gameObject.getData('posicaoOriginal').y,
                            scaleX: 0.6, // Restaura a escala original
                            scaleY: 0.6,
                            duration: 200,
                            ease: 'Power2',
                            onComplete: () => {
                                // Remove o card do espaço ocupado, se estiver em algum
                                for (let [espaco, card] of this.posicoesOcupadas.entries()) {
                                    if (card === gameObject) {
                                        this.posicoesOcupadas.set(espaco, null);
                                        break;
                                    }
                                }
                                gameObject.setData('moved', false);
                                this.verificaEncaixes();
                            }
                        });
                    }
                } else {
                    // Se o card não foi solto em um espaço válido, retorna para a posição original (diminui a escala)
                    this.tweens.add({
                        targets: gameObject,
                        x: gameObject.getData('posicaoOriginal').x,
                        y: gameObject.getData('posicaoOriginal').y,
                        scaleX: 0.6, // Restaura a escala original
                        scaleY: 0.6,
                        duration: 200,
                        ease: 'Power2',
                        onComplete: () => {
                            // Remove o card do espaço ocupado, se estiver em algum
                            for (let [espaco, card] of this.posicoesOcupadas.entries()) {
                                if (card === gameObject) {
                                    this.posicoesOcupadas.set(espaco, null);
                                    break;
                                }
                            }
                            gameObject.setData('moved', false);
                            this.verificaEncaixes();
                        }
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
        let totalEncaixados = [...this.posicoesOcupadas.values()].filter(Boolean).length;
        //console.log(`Total encaixados: ${totalEncaixados}`); // Debug: Verifica quantos cards foram encaixados
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
        super({ key: 'fimDoMinigame3' });
    }

    init(data) {
        pontuacao = data.pontuacao; // Recebe a pontuação da cena anterior
    }

    create() {
        this.cameras.main.setBackgroundColor('#195A4B');

        // Exibe o texto de resultado
        this.add.text(400, 200, 'Resultado', { fontSize: '40px', fill: '#fff' }).setOrigin(0.5);

        // Exibe a pontuação obtida
        this.add.text(400, 350, `Pontuação: ${pontuacao}`, { fontSize: '30px', fill: '#fff' }).setOrigin(0.5);

        // Botão para voltar à hub
        let botaoVoltar = this.add.text(400, 400, 'Voltar', { fontSize: '30px', fill: '#fff', backgroundColor: '#333' })
            .setOrigin(0.5)
            .setPadding(10)
            .setInteractive();


        botaoVoltar.on('pointerdown', () => {

            minigame3Jogado = true;
            this.scene.wake('hub');
            this.scene.stop('fimDoMinigame3');
        });
    }
}