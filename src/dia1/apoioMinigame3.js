class apoioMinigame3 extends Phaser.Scene 
{
    constructor ()
    {
        super('apoioMinigame3');
    }

    preload()
    {
        //Preload dos assets

        this.load.image('tutorialCtrlMinigame3', 'src/assets/dia1/tutorialControlesMinigame3.png');

        this.load.image('tutorialProcessoDeResgate', 'src/assets/dia1/tutorialProcessoDeResgate.png');  

        this.load.image('botaoSeguirAdiante', 'src/assets/botoes/botaoSeguirAdiante.png'); 
    }
    
    create() 
    {  
        //Carrega as telas e os botões utilizados

        let tutorialCtrlMinigame2 = this.add.image(400,300, 'tutorialCtrlMinigame3');

        let tutorialProcessoDeResgate = this.add.image(400,300, 'tutorialProcessoDeResgate').setVisible(false);

        let botaoTutorialMinigame1 = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        let botaoTutorialMinigame2 = this.add.image(615, 560, 'botaoSeguirAdiante').setScale(0.50).setVisible(false);

        //Verifica se o primeiro botão foi pressionado

        botaoTutorialMinigame1.on('pointerdown', function (pointer)
        {
            tutorialCtrlMinigame2.setVisible(false);
                
            tutorialProcessoDeResgate.setVisible(true);
        
            botaoTutorialMinigame2.setInteractive().setVisible(true)

            botaoTutorialMinigame1.setVisible(false);
        });

        //Verifica se o segundo botão foi pressionado

        botaoTutorialMinigame2.on('pointerdown', function (pointer)
        {
            game.scene.start('miniGame3');

            game.scene.stop('apoioMinigame3');

        });
    }
}

