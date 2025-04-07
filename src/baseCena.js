let transicionando = false;

class baseCena extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    transicao(keyCena, paraTablet, playerExiste = false, dormirOuAcordarCena = false, tempoParaTablet = 1200, x = 400, y = 300) {

        transicionando = true; // Variável que servirá para impossibilitar a interação do jogador enquanto a transição ocorre

        if (paraTablet === true) { // paraTablet ser true indica que a animação transicionarParaTablet() tocará> Caso contrário, a outra tocará
            // Caso o player exista, a notificação aparecerá logo em cima dele
            if (playerExiste) {
                x = this.player.x;
                y = this.player.y - 100;
            }

            // Caso a animação da notificação ainda não exista, cria ela
            if (!this.anims.exists("notificacaoComeca")) {
                this.anims.create({
                    key: "notificacaoComeca",
                    frames: this.anims.generateFrameNumbers("notificacao", {
                        start: 1, // frame 0 foi descartado por motivos estéticos
                        end: 3,
                    }),
                    frameRate: 16,
                    repeat: 0,
                });
            }

            // Caso a animação da notificação ainda não exista, cria ela
            if (!this.anims.exists("notificacaoContinua")) {
                this.anims.create({
                    key: "notificacaoContinua",
                    frames: this.anims.generateFrameNumbers("notificacao", {
                        start: 4,
                        end: 15,
                    }),
                    frameRate: 16,
                    repeat: -1,
                });
            }

            // Cria o objeto notificação e começa sua animação
            this.notificacao = this.add.sprite(x, y, "notificacao").setDepth(9999);
            this.notificacao.anims.play("notificacaoComeca");

            // No final da primeira animação, começa a segunda, que é contínua
            this.notificacao.on('animationcomplete', (animation) => {
                if (animation.key === 'notificacaoComeca') {
                    this.notificacao.play('notificacaoContinua');
                }
            });
        }

        // Decide qual animação de transição de cena deve tocar e quando ela tocará (os se ela tocará)
        this.time.delayedCall(tempoParaTablet, () => {
            if (paraTablet === true) {
                this.transicionarParaTablet(keyCena, dormirOuAcordarCena)
            } else if (paraTablet === false) {
                this.transicionarDeTablet(keyCena, dormirOuAcordarCena)
            }
        });
    }



    transicionarParaTablet(keyCena, dormirOuAcordarCena) {

        this.scene.stop(keyCena); // Apenas precaução
        this.scene.launch(keyCena, { diaAtual: this.diaAtual, minigameAtual: this.minigameAtual }); // Não há casos em que essa animação precise acordar a cena

        this.proximaCena = this.scene.get(keyCena);

        this.proximaCena.events.once('create', () => { // Essa linha evita que o acesso da câmera da proxima cena aconteca antes dela ter sido criada

            this.proximaCena.cameras.main.setZoom(0.75);
            this.proximaCena.cameras.main.x = 1500; 
            this.proximaCena.cameras.main.y = 75;

            // Obs: dormirOuAcordarCena aqui é usado como sinônimo de uma transição do hub para alguma outra ou para ele, já que isso só ocorre nesses casos
            this.tablet = this.add.image(dormirOuAcordarCena ? this.cameras.main.scrollX + 1500 : 1500, dormirOuAcordarCena ? this.cameras.main.scrollY + 75 : 75, "tablet").setOrigin(74 / 950, 34 / 668).setScale(0.75).setDepth(999); // Tem uma origem fracionária para ficar mais fácil alinhar com a cena perfeitamente

            this.tweens.add({ // Tablet vai para o centro da tela
                targets: this.tablet,
                x: dormirOuAcordarCena ? this.cameras.main.scrollX + 100 : 100,
                y: dormirOuAcordarCena ? this.cameras.main.scrollY + 75 : 75,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {

                    this.tweens.add({ // Tablet engloba toda a margem do jogo
                        targets: this.tablet,
                        x: dormirOuAcordarCena ? this.cameras.main.scrollX : 0,
                        y: dormirOuAcordarCena ? this.cameras.main.scrollY : 0,
                        scale: 1,
                        duration: 700,
                        ease: 'Power2',
                    });
                }
            });
            //Animações separadas por motivos diversos: 1) Usam medidas diferentes para sua posição. 2) Usam nomes diferentes para escala (scale e zoom)
            this.tweens.add({ // Câmera da proxima cena vai para o centro da tela
                targets: this.proximaCena.cameras.main,
                x: 100,
                y: 75,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {

                    this.notificacao.destroy()

                    this.tweens.add({ // Câmera da proxima cena engloba toda a tela do jogo
                        targets: this.proximaCena.cameras.main,
                        x: 0,
                        y: 0,
                        zoom: 1,
                        duration: 700,
                        ease: 'Power2',
                        onComplete: () => {
                            this.tablet.destroy();
                            transicionando = false;

                            if (dormirOuAcordarCena) {
                                this.scene.sleep();
                            } else {
                                this.scene.stop();
                            }
                        }
                    });
                }
            });
        });
    }



    transicionarDeTablet(keyCena, dormirOuAcordarCena) {

        // Cria uma snapshot da cena anterior, para que esta possa ser animada
        this.cenaAnterior = this.add.renderTexture(0, 0, this.scale.width, this.scale.height).setOrigin(0).setDepth(999);

        // Captura os elementos atuais e deixa eles invisíveis, para não atrapalhar a transição
        this.children.each(child => {
            if (child.visible && child !== this.cenaAnterior) {
                this.cenaAnterior.draw(child);
                child.setVisible(false);
            }
        });

        this.tablet = this.add.image(0, 0, "tablet").setOrigin(74 / 950, 34 / 668).setScale(1).setDepth(1000); // Tem uma origem fracionária para ficar mais fácil alinhar com a cena perfeitamente
        if (dormirOuAcordarCena) {
            this.scene.wake(keyCena, { personagemSelecionado: this.personagemSelecionado }).sendToBack(keyCena);
        } else {
            this.scene.launch(keyCena, { personagemSelecionado: this.personagemSelecionado }).sendToBack(keyCena);
        } // sendToBack() evita que a cena fique na frente da animação

        this.tweens.add({ // Cena e tablet diminuem e ficam no centro da tela
            targets: [this.cenaAnterior, this.tablet],
            x: 100,
            y: 75,
            scale: 0.75,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.tweens.add({ // Cena e tablet vão para a direita
                    targets: [this.cenaAnterior, this.tablet],
                    x: 1500,
                    duration: 700,
                    ease: 'Power2',
                    onComplete: () => {
                        this.limparTransicao();
                        transicionando = false;
                        this.scene.stop(); // Não há casos em que essa animação precise por a ceda para dormir
                    }
                });
            }
        });

    }

    // Função para destruir tudo criado na transição

    limparTransicao() {
        if (this.cenaAnterior) {
            this.cenaAnterior.destroy();
            this.cenaAnterior = null;
        }
        this.tablet.destroy();
    }
}