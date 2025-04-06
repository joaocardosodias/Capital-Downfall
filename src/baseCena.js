class baseCena extends Phaser.Scene {

    constructor(config) {
        super(config);

        // Transition properties
        this._transitionSnapshot = null;
        this._transitioning = false;
    }

    transicao(keyCena, paraTablet, playerExiste = false, dormirOuAcordarCena = false, tempoParaTablet = 1200, x = 400, y = 300) {

        if (paraTablet === true) {
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
                        start: 1,
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

        // Decide qual (ou se) animação de transição de cena deve tocar e quando ela tocará
        this.time.delayedCall(tempoParaTablet, () => {
            if (paraTablet === true) {
                this.transicionarParaTablet(keyCena, dormirOuAcordarCena)
            } else if (paraTablet === false) {
                this.transicionarDeTablet(keyCena, dormirOuAcordarCena)
            }
        });
    }



    transicionarParaTablet(keyCena, dormirOuAcordarCena) {

        if (this.transicionando) return;
        this.transicionando = true;
        this.input.enabled = false;

        this.scene.stop(keyCena);
            this.scene.launch(keyCena, { diaAtual: this.diaAtual, minigameAtual: this.minigameAtual, transicionando: true  });

        this.proximaCena = this.scene.get(keyCena);

        if (!this.proximaCena.cameras || !this.proximaCena.cameras.main) {
            // Cria um novo sistema de câmeras se não existir
            this.proximaCena.cameras.destroy()
            this.proximaCena.cameras = new Phaser.Cameras.Scene2D.CameraManager(this.proximaCena);
            this.proximaCena.cameras.main = this.proximaCena.cameras.addExisting(new Phaser.Cameras.Scene2D.Camera(0, 0, this.game.config.width, this.game.config.height));
            this.proximaCena.cameras.main.setName('main');
        }
        
        this.proximaCena.cameras.main.setZoom(0.75);
        this.proximaCena.cameras.main.x = 1500;
        this.proximaCena.cameras.main.y = dormirOuAcordarCena ? 0 : 75;

        this.tablet = this.add.image(dormirOuAcordarCena ? this.cameras.main.scrollX + 1500 : 1500, dormirOuAcordarCena ? this.cameras.main.scrollY + 75 : 75, "tablet").setOrigin(74 / 950, 34 / 668).setScale(0.75).setDepth(999);

        this.tweens.add({
            targets: this.tablet,
            x: dormirOuAcordarCena ? this.cameras.main.scrollX + 100 : 100,
            y: dormirOuAcordarCena ? this.cameras.main.scrollY + 75 : 75,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {

                this.tweens.add({
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
        this.tweens.add({
            targets: this.proximaCena.cameras.main,
            x: dormirOuAcordarCena ? 0 : 100,
            y: dormirOuAcordarCena ? 0 : 75,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {

                this.notificacao.destroy()

                this.tweens.add({
                    targets: this.proximaCena.cameras.main,
                    x: 0,
                    y: 0,
                    zoom: 1,
                    duration: 700,
                    ease: 'Power2',
                    onComplete: () => {
                        this.tablet.destroy();
                        this.transicionando = false;

                        if (dormirOuAcordarCena) {
                            this.scene.sleep();
                        } else {
                            this.scene.stop();
                        }

                        this.input.enabled = true;
                    }
                });
            }
        });

    }

    ///////////////////////////////////////////////// ARRUMAR /////////// WORK IN PROGRESS /////////////////////////////////////////////////////////////////////

    transicionarDeTablet(keyCena, dormirOuAcordarCena) {

        if (this.transicionando) return;
        this.transicionando = true;
        this.input.enabled = false;

        this.cenaAnterior = this.add.renderTexture(0, 0, this.scale.width, this.scale.height)
            .setOrigin(0)
            .setDepth(999);

        // Capturar elementos atuais
        this.children.each(child => {
            if (child.visible && child !== this.cenaAnterior) {
                this.cenaAnterior.draw(child);
                child.setVisible(false);
            }
        });

        this.tablet = this.add.image(0, 0, "tablet").setOrigin(74 / 950, 34 / 668).setScale(1).setDepth(1000);
        if (dormirOuAcordarCena) {
            this.scene.wake(keyCena, { personagemSelecionado: this.personagemSelecionado, transicionando: true }).sendToBack(keyCena);
        } else {
            this.scene.launch(keyCena, { personagemSelecionado: this.personagemSelecionado, transicionando: true }).sendToBack(keyCena);
        }
        this.tweens.add({
            targets: [this.cenaAnterior, this.tablet],
            x: 100,
            y: 75,
            scale: 0.75,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.tweens.add({
                    targets: [this.cenaAnterior, this.tablet],
                    x: 1500,
                    duration: 700,
                    ease: 'Power2',
                    onComplete: () => {
                        this.limparTransicao();
                        this.scene.stop();
                        this.input.enabled = true;
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
        this.transicionando = false;
    }
}