<script>
        let larguraJogo = 1100;
        let alturaJogo = 700;
        let cardSelecionado = null;
        let botaoVerificar = null;
        let textoCentral = null;
        let posicoesOcupadas = new Map();
        let ordemCorreta = ['card1', 'card2', 'card3', 'card4', 'card5'];
        let cardsSuperiores = [];
        let cardsInferiores = [];
        let imagensCards = ['card3', 'card5', 'card2', 'card1', 'card4'];
        let pontuacao = 0; // Armazena a pontuação do jogador

        class Scene1 extends Phaser.Scene {
            constructor() {
                super({ key: 'Scene1' });
            }

            preload() {
                this.load.image('timeline', 'assets/Timeline.png');
                this.load.image('botao', 'assets/button.png');
                this.load.image('card1', 'assets/card1.png');
                this.load.image('card2', 'assets/card2.png');
                this.load.image('card3', 'assets/card3.png');
                this.load.image('card4', 'assets/card4.png');
                this.load.image('card5', 'assets/card5.png');
            }

            create() {
                let espacamento = larguraJogo / 6;
                let tamanhoCard = 150;
                let yTopo = 100;
                let yBase = alturaJogo - 100;

                this.input.setTopOnly(false);

                cardsSuperiores = [];
                cardsInferiores = [];
                posicoesOcupadas.clear();

                // Texto inicial no centro da tela
                textoCentral = this.add.text(larguraJogo / 2, alturaJogo / 2, 'Organize os cards superiores na ordem correta!', {
                    fontSize: '24px',
                    fill: '#fff',
                    backgroundColor: '#000',
                    padding: { left: 10, right: 10, top: 5, bottom: 5 }
                }).setOrigin(0.5);

                // Criar os cards superiores
                for (let i = 0; i < 5; i++) {
                    let card = this.add.image((i + 1) * espacamento, yTopo, imagensCards[i])
                        .setOrigin(0.5)
                        .setInteractive()
                        .setDepth(2)
                        .setScale(0.6);

                    cardsSuperiores.push(card);
                }

                // Criar os espaços inferiores
                for (let i = 1; i <= 5; i++) {
                    let espaco = this.add.rectangle(i * espacamento, yBase, tamanhoCard, tamanhoCard, 0xffffff)
                        .setOrigin(0.5)
                        .setDepth(1)
                        .setInteractive();

                    cardsInferiores.push(espaco);
                    posicoesOcupadas.set(espaco, null);
                }

                let timeline = this.add.image(larguraJogo / 2, alturaJogo * 0.7, 'timeline')
                    .setScale(1.5, 1);

                botaoVerificar = this.add.image(larguraJogo / 2, alturaJogo - 500, 'botao')
                    .setScale(0.5)
                    .setInteractive()
                    .setVisible(false);

                botaoVerificar.on('pointerdown', () => {
                    this.scene.start('Scene2', { cardsSuperiores });
                });

                // Evento de clique nos cards
                this.input.on('gameobjectdown', (pointer, gameObject) => {
                    if (cardsSuperiores.includes(gameObject)) {
                        if (cardSelecionado) {
                            cardSelecionado.setAlpha(1);
                        }
                        cardSelecionado = gameObject;
                        cardSelecionado.setAlpha(0.7);
                    } else if (cardsInferiores.includes(gameObject) && cardSelecionado) {
                        let cardAtual = posicoesOcupadas.get(gameObject);

                        if (cardAtual) {
                            let posicaoAntiga = { x: cardSelecionado.x, y: cardSelecionado.y };
                            let novoAlvo = { x: gameObject.x, y: gameObject.y };

                            this.tweens.add({
                                targets: cardSelecionado,
                                x: novoAlvo.x,
                                y: novoAlvo.y,
                                duration: 500,
                                ease: 'Power2',
                                onComplete: () => {
                                    posicoesOcupadas.set(gameObject, cardSelecionado);
                                    cardSelecionado.setAlpha(1);
                                    cardSelecionado = null;
                                }
                            });

                            this.tweens.add({
                                targets: cardAtual,
                                x: posicaoAntiga.x,
                                y: posicaoAntiga.y,
                                duration: 500,
                                ease: 'Power2',
                                onComplete: () => {
                                    posicoesOcupadas.set(cardsInferiores.find(e => e.x === posicaoAntiga.x), cardAtual);
                                }
                            });

                        } else {
                            this.tweens.add({
                                targets: cardSelecionado,
                                x: gameObject.x,
                                y: gameObject.y,
                                duration: 500,
                                ease: 'Power2',
                                onComplete: () => {
                                    posicoesOcupadas.set(gameObject, cardSelecionado);
                                    cardSelecionado.setAlpha(1);
                                    cardSelecionado = null;
                                    verificaEncaixes();
                                }
                            });
                        }
                    }
                });

                function verificaEncaixes() {
                    let totalEncaixados = [...posicoesOcupadas.values()].filter(Boolean).length;
                    botaoVerificar.setVisible(totalEncaixados === 5);

                    if (totalEncaixados === 5) {
                        textoCentral.setVisible(false);
                    }
                }
            }
        }

        class Scene2 extends Phaser.Scene {
            constructor() {
                super({ key: 'Scene2' });
            }

            init(data) {
                this.cardsSuperiores = data.cardsSuperiores;
            }

            create() {
                this.add.text(larguraJogo / 2, 200, 'Resultado', { fontSize: '40px', fill: '#fff' })
                    .setOrigin(0.5);

                let erros = this.contaErros();
                let percentualCorreto = 1 - (erros * 0.2);
                let pontuacaoRodada = Math.max(100 * percentualCorreto, 0); // Garante que a pontuação não seja negativa

                pontuacao += pontuacaoRodada; // Atualiza a pontuação total

                let mensagem = erros === 0 ? 'Parabéns! Você acertou a ordem!' : `Você teve ${erros} erro(s).`;
                let corTexto = erros === 0 ? '#0f0' : '#f00';

                this.add.text(larguraJogo / 2, 300, mensagem, { fontSize: '30px', fill: corTexto })
                    .setOrigin(0.5);

                this.add.text(larguraJogo / 2, 350, `Pontuação: ${Math.round(pontuacao)}`, { fontSize: '30px', fill: '#fff' })
                    .setOrigin(0.5);

                let botaoVoltar = this.add.text(larguraJogo / 2, 400, 'Voltar', { fontSize: '30px', fill: '#fff', backgroundColor: '#333' })
                    .setOrigin(0.5)
                    .setPadding(10)
                    .setInteractive();

                botaoVoltar.on('pointerdown', () => {
                    this.scene.start('Scene1');
                });
            }

            contaErros() {
                let ordemAtual = this.cardsSuperiores.slice().sort((a, b) => a.x - b.x).map(card => card.texture.key);
                return ordemAtual.reduce((erros, card, index) => erros + (card !== ordemCorreta[index] ? 1 : 0), 0);
            }
        }

        const config = {
            type: Phaser.AUTO,
            width: larguraJogo,
            height: alturaJogo,
            backgroundColor: "#195AB4",
            scene: [Scene1, Scene2]
        };

        const game = new Phaser.Game(config);
    </script>