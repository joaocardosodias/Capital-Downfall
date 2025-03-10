class apoioMinigame2 extends Phaser.Scene 
{
    constructor ()
    {
        super('apoioMinigame2');
    }

    preload()
    {
        //Preload dos assets

        this.load.image('tutorialCtrlMinigame2', 'src/assets/dia1/tutorialControlesMinigame2.png');

        this.load.image('tutorialTransacoesSuspeitas', 'src/assets/dia1/tutorialTransacoesSuspeitas.png');  

        this.load.image('botaoSeguirAdiante', 'src/assets/botoes/botaoSeguirAdiante.png');
    }
    
    create() 
    {  
        //Carrega as telas e os botões utilizados

        let tutorialCtrlMinigame2 = this.add.image(400,300, 'tutorialCtrlMinigame2');

        let tutorialTransacoesSuspeitas = this.add.image(400,300, 'tutorialTransacoesSuspeitas').setVisible(false);

        let botaoTutorialMinigame1 = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        let botaoTutorialMinigame2 = this.add.image(615, 560, 'botaoSeguirAdiante').setScale(0.50).setVisible(false);

        //Verifica se o primeiro botão foi pressionado

        botaoTutorialMinigame1.on('pointerdown', function (pointer)
        {
            tutorialCtrlMinigame2.setVisible(false);
                
            tutorialTransacoesSuspeitas.setVisible(true);
        
            botaoTutorialMinigame2.setInteractive().setVisible(true)

            botaoTutorialMinigame1.setVisible(false);
        });

        //Verifica se o segundo botão foi pressionado

        botaoTutorialMinigame2.on('pointerdown', function (pointer)
        {
            game.scene.start('miniGame2');

            game.scene.stop('apoioMinigame2');

        });
    }
}

