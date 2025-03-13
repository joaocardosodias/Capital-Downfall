class apoioMinigame2 extends Phaser.Scene {
    constructor() {
        super('apoioMinigame2');
        this.delayPassou = true;
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
    }

    create() {

        // Essa tela de apoio se mostrou mais complexa que as outras, necessitando de sete páginas diferentes
        // Por esse motivo, foi adicionado um botão para voltar atrás, permitindo com que o jogador consiga navegar entre as páginas do tutorial. 
        // Caso haja tempo hábil, seria interessante adicionar esse botão nos outros materiais de apoio

        let telaAtual = 1; // Indica que o jogo começa na primeira tela

        // Adição das telas, sendo a maioria delas definidas como invisíveis 
        let tutorialCtrl = this.add.image(400, 300, 'tutorialControlesMinigame2');
        let tutorialCtrlContinuacao = this.add.image(400, 300, 'continuacaoMinigame2').setVisible(false);
        let siglas = this.add.image(400, 300, 'conceitosSiglas').setVisible(false);
        let jurosInvestimentos = this.add.image(400, 300, 'jurosSobreInvestimento').setVisible(false);
        let exemploJuros = this.add.image(400, 300, 'exemploJuros').setVisible(false);
        let depreciacaoInvestimento = this.add.image(400, 300, 'depreciacaoInvestimento').setVisible(false);
        let exemploDepreciacao = this.add.image(400, 300, 'exemploDepreciacao').setVisible(false);

        // Adição dos botões
        let botaoSeguirAdiante = this.add.image(615, 560, 'botaoSeguirAdiante').setInteractive().setScale(0.40);
        let botaoVoltarAtras = this.add.image(330, 560, 'botaoVoltarAtras').setScale(0.40).setVisible(false).setInteractive();


        // O sistema dos botões funciona da seguinte maneira: o código primeiro verifica em qual tela o jogador está, depois deixa invisível a tela atual e passa a mostrar a tela futura
        // Verifica se o botão de seguir adiante foi pressionado
        botaoSeguirAdiante.on('pointerdown', () => {
            if (this.delayPassou) { //Essa parte foi adicionada para evitar com que o jogador avance várias páginas de uma vez, evitando erros.
                if (telaAtual === 7) {
                    this.scene.stop('apoioMinigame2');
                    this.scene.start('miniGame2');
                }
                else if (telaAtual === 6) {
                    depreciacaoInvestimento.setVisible(false);
                    exemploDepreciacao.setVisible(true);
                    telaAtual = 7;
                }
                else if (telaAtual === 5) {
                    exemploJuros.setVisible(false);
                    depreciacaoInvestimento.setVisible(true);
                    telaAtual = 6;
                }
                else if (telaAtual === 4) {
                    jurosInvestimentos.setVisible(false);
                    exemploJuros.setVisible(true);
                    telaAtual = 5;
                } 
                else if (telaAtual === 3) {
                    siglas.setVisible(false);
                    jurosInvestimentos.setVisible(true);
                    telaAtual = 4;
                }
                else if (telaAtual === 2) {  
                    tutorialCtrlContinuacao.setVisible(false);
                    siglas.setVisible(true);
                    telaAtual = 3;
                }
                else if (telaAtual === 1) {
                    tutorialCtrl.setVisible(false);
                    tutorialCtrlContinuacao.setVisible(true);
                    botaoVoltarAtras.setVisible(true);
                    telaAtual = 2;
                }
                this.delayPassou = false; // Evita com que o código seja executado novamente
                this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this); // Inicia a função de contagem
            }
        });

        // A mesma lógica se aplica para o botão de voltar atrás
        // A única diferença é quanto ele volta para a tela 1, ficando invisível
        botaoVoltarAtras.on('pointerdown', () => {
            if (this.delayPassou) {
                if (telaAtual === 7) {
                    exemploDepreciacao.setVisible(false);
                    depreciacaoInvestimento.setVisible(true);
                    telaAtual = 6;
                } 
                else if (telaAtual === 6) {
                    depreciacaoInvestimento.setVisible(false);
                    exemploJuros.setVisible(true);
                    telaAtual = 5;
                } 
                else if (telaAtual === 5) {
                    exemploJuros.setVisible(false);
                    jurosInvestimentos.setVisible(true);
                    telaAtual = 4;
                } 
                else if (telaAtual === 4) {
                    jurosInvestimentos.setVisible(false);
                    siglas.setVisible(true);
                    telaAtual = 3;
                } 
                else if (telaAtual === 3) {
                    siglas.setVisible(false);
                    tutorialCtrlContinuacao.setVisible(true);
                    telaAtual = 2;
                }
                else if (telaAtual === 2) {  
                    tutorialCtrlContinuacao.setVisible(false);
                    tutorialCtrl.setVisible(true);
                    botaoVoltarAtras.setVisible(false);
                    telaAtual = 1;
                }
                else if (telaAtual === 1) {
                    botaoVoltarAtras.setVisible(false);
                }

                this.delayPassou = false;
                this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);
            }
        });
    
    }

    onEvent() 
    {
        this.delayPassou = true;
    }
}