class apoioMinigame2 extends Phaser.Scene {
    constructor() {
        super('apoioMinigame2');
        this.delayPassou = true;
        this.clickSound = null; // Som de clique
    }

    preload() {
        // Preload dos assets
        this.load.image('conceitosSiglas', 'src/assets/dia1/apoioMinigame2/conceitosSiglas.png');
        this.load.image('continuacaoMinigame2', 'src/assets/dia1/apoioMinigame2/continuacaoMinigame2.png');
        this.load.image('depreciacaoInvestimento', 'src/assets/dia1/apoioMinigame2/depreciacaoInvestimento.png');
        this.load.image('exemploDepreciacao', 'src/assets/dia1/apoioMinigame2/exemploDepreciacao.png');
        this.load.image('exemploJuros', 'src/assets/dia1/apoioMinigame2/exemploJuros.png');
        this.load.image('jurosSobreInvestimento', 'src/assets/dia1/apoioMinigame2/jurosSobreInvestimento.png');
        this.load.image('tutorialControlesMinigame2', 'src/assets/dia1/apoioMinigame2/tutorialControlesMinigame2.png');
        this.load.image('botaoSeguirAdiante', 'src/assets/botoes/botaoSeguirAdiante.png');
        this.load.image('botaoVoltarAtras', 'src/assets/botoes/botaoVoltarAtras.png');

        // Carrega o som de clique
        this.load.audio('click', ['src/assets/dia2/miniGame4/sons/clique.mp3']);
    }

    create() {
        // Essa tela de apoio se mostrou mais complexa que as outras, necessitando de sete páginas diferentes
        // Por esse motivo, foi adicionado um botão para voltar atrás, permitindo com que o jogador consiga navegar entre as páginas do tutorial. 
        // Caso haja tempo hábil, seria interessante adicionar esse botão nos outros materiais de apoio

        this.telaAtual = 1; // Indica que o jogo começa na primeira tela

        // Adição das telas, sendo a maioria delas definidas como invisíveis 
        this.tutorialCtrl = this.add.image(400, 300, 'tutorialControlesMinigame2');
        this.tutorialCtrlContinuacao = this.add.image(400, 300, 'continuacaoMinigame2').setVisible(false);
        this.siglas = this.add.image(400, 300, 'conceitosSiglas').setVisible(false);
        this.jurosInvestimentos = this.add.image(400, 300, 'jurosSobreInvestimento').setVisible(false);
        this.exemploJuros = this.add.image(400, 300, 'exemploJuros').setVisible(false);
        this.depreciacaoInvestimento = this.add.image(400, 300, 'depreciacaoInvestimento').setVisible(false);
        this.exemploDepreciacao = this.add.image(400, 300, 'exemploDepreciacao').setVisible(false);

        // Adição dos botões
        this.botaoSeguirAdiante = this.add.image(615, 560, 'botaoSeguirAdiante').setInteractive().setScale(0.40);
        this.botaoVoltarAtras = this.add.image(330, 560, 'botaoVoltarAtras').setScale(0.40).setVisible(false).setInteractive();

        // Carrega o som de clique
        this.clickSound = this.sound.add('click');

        // O sistema dos botões funciona da seguinte maneira: o código primeiro verifica em qual tela o jogador está, depois deixa invisível a tela atual e passa a mostrar a tela futura
        // Verifica se o botão de seguir adiante foi pressionado
        this.botaoSeguirAdiante.on('pointerdown', () => {
            if (this.delayPassou) { //Essa parte foi adicionada para evitar com que o jogador avance várias páginas de uma vez, evitando erros.
                this.clickSound.play(); // Reproduz o som de clique
                if (this.telaAtual === 7) {
                    this.transitionToScene('miniGame2'); // Troca de cena com animação
                }
                else if (this.telaAtual === 6) {
                    this.transitionToScreen(this.depreciacaoInvestimento, this.exemploDepreciacao);
                    this.telaAtual = 7;
                }
                else if (this.telaAtual === 5) {
                    this.transitionToScreen(this.exemploJuros, this.depreciacaoInvestimento);
                    this.telaAtual = 6;
                }
                else if (this.telaAtual === 4) {
                    this.transitionToScreen(this.jurosInvestimentos, this.exemploJuros);
                    this.telaAtual = 5;
                } 
                else if (this.telaAtual === 3) {
                    this.transitionToScreen(this.siglas, this.jurosInvestimentos);
                    this.telaAtual = 4;
                }
                else if (this.telaAtual === 2) {  
                    this.transitionToScreen(this.tutorialCtrlContinuacao, this.siglas);
                    this.telaAtual = 3;
                }
                else if (this.telaAtual === 1) {
                    this.transitionToScreen(this.tutorialCtrl, this.tutorialCtrlContinuacao);
                    this.botaoVoltarAtras.setVisible(true);
                    this.telaAtual = 2;
                }
                this.delayPassou = false; // Evita com que o código seja executado novamente
                this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this); // Inicia a função de contagem
            }
        });

        // A mesma lógica se aplica para o botão de voltar atrás
        // A única diferença é quanto ele volta para a tela 1, ficando invisível
        this.botaoVoltarAtras.on('pointerdown', () => {
            if (this.delayPassou) {
                this.clickSound.play(); // Reproduz o som de clique
                if (this.telaAtual === 7) {
                    this.transitionToScreen(this.exemploDepreciacao, this.depreciacaoInvestimento);
                    this.telaAtual = 6;
                } 
                else if (this.telaAtual === 6) {
                    this.transitionToScreen(this.depreciacaoInvestimento, this.exemploJuros);
                    this.telaAtual = 5;
                } 
                else if (this.telaAtual === 5) {
                    this.transitionToScreen(this.exemploJuros, this.jurosInvestimentos);
                    this.telaAtual = 4;
                } 
                else if (this.telaAtual === 4) {
                    this.transitionToScreen(this.jurosInvestimentos, this.siglas);
                    this.telaAtual = 3;
                } 
                else if (this.telaAtual === 3) {
                    this.transitionToScreen(this.siglas, this.tutorialCtrlContinuacao);
                    this.telaAtual = 2;
                }
                else if (this.telaAtual === 2) {  
                    this.transitionToScreen(this.tutorialCtrlContinuacao, this.tutorialCtrl);
                    this.botaoVoltarAtras.setVisible(false);
                    this.telaAtual = 1;
                }
                else if (this.telaAtual === 1) {
                    this.botaoVoltarAtras.setVisible(false);
                }

                this.delayPassou = false;
                this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
            }
        });
    }

    onEvent() {
        this.delayPassou = true;
    }

    // Função para transição entre telas (fade-out e fade-in)
    transitionToScreen(currentScreen, nextScreen) {
        // Fade-out da tela atual
        this.tweens.add({
            targets: currentScreen,
            alpha: 0, // Torna a tela atual transparente
            duration: 500, // Duração de 500ms
            ease: "Linear",
            onComplete: () => {
                currentScreen.setVisible(false); // Oculta a tela atual após o fade-out
            },
        });

        // Fade-in da próxima tela
        nextScreen.setVisible(true).setAlpha(0); // Torna a próxima tela visível, mas transparente
        this.tweens.add({
            targets: nextScreen,
            alpha: 1, // Torna a próxima tela opaca
            duration: 500, // Duração de 500ms
            ease: "Linear",
        });
    }

    // Função para transição entre cenas (fade-out e fade-in)
    transitionToScene(nextScene) {
        // Aplica o fade-out
        this.cameras.main.fadeOut(500, 0, 0, 0); // Fade-out de 500ms

        // Aguarda o fade-out ser concluído
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.scene.start(nextScene); // Inicia a próxima cena
            this.scene.stop(); // Encerra a cena atual
        });
    }
}