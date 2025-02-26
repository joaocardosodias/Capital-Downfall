class apoioMinigame3 extends Phaser.Scene 
{
    constructor ()
    {
        super('apoioMinigame3');
    }

    preload()
    {
        //Preload dos assets, coloca a variável tutorialLido como false

        this.load.image('tutorialCtrlMinigame3', 'assets/materialApoioDia1/tutorialControlesMinigame3.png');

        this.load.image('tutorialProcessoDeResgate', 'assets/materialApoioDia1/tutorialProcessoDeResgate.png');  

        this.load.image('botaoSeguirAdiante', 'assets/botaoSeguirAdiante.png'); 
    }
    
    create() 
    {  
        //Carrega os dois fundos, coloca o fundo laranja como invisível

        let tutorialCtrlMinigame2 = this.add.image(400,300, 'tutorialCtrlMinigame3');

        let tutorialProcessoDeResgate = this.add.image(400,300, 'tutorialProcessoDeResgate').setVisible(false);

        let botaoTutorialMinigame1 = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        let botaoTutorialMinigame2 = this.add.image(615, 560, 'botaoSeguirAdiante').setScale(0.50).setVisible(false);

        botaoTutorialMinigame1.on('pointerdown', function (pointer)
        {
            tutorialCtrlMinigame2.setVisible(false);
                
            tutorialProcessoDeResgate.setVisible(true);
        
            botaoTutorialMinigame2.setInteractive().setVisible(true)

            botaoTutorialMinigame1.setVisible(false);
        });

        botaoTutorialMinigame2.on('pointerdown', function (pointer)
        {
            game.scene.start('miniGame3');

            game.scene.stop('apoioMinigame3');

        });
    }
}

