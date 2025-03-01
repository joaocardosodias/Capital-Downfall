let seguirAdiante;

class apoioMinigame1 extends Phaser.Scene 
{
    constructor ()
    {
        super('apoioMinigame1');
    }

    preload()
    {
        //Preload dos assets

        this.load.image('tutorialCtrlMinigame1', 'assets/materialApoioDia1/tutorialControlesMinigame1.png');

        this.load.image('tutorialFundoAberto', 'assets/materialApoioDia1/tutorialFundoAberto.png');

        this.load.image('tutorialFundoFechado', 'assets/materialApoioDia1/tutorialFundoFechado.png');

        this.load.image('botaoSeguirAdiante', 'assets/botaoSeguirAdiante.png');
  
    }
    
    create() 
    {  
        //Carrega as telas e botões utilizados

        let tutorialCtrlMinigame1 = this.add.image(400,300, 'tutorialCtrlMinigame1');

        let tutorialFundoAberto = this.add.image(400,300, 'tutorialFundoAberto').setVisible(false);

        let tutorialFundoFechado = this.add.image(400,300, 'tutorialFundoFechado').setVisible(false);

        let botaoTutorialMinigame1 = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        let botaoTutorialMinigame2 = this.add.image(615, 560, 'botaoSeguirAdiante').setScale(0.50).setVisible(false);

        let botaoTutorialMinigame3 = this.add.image(615, 560, 'botaoSeguirAdiante').setScale(0.50).setVisible(false);


        //Verifica se o primeiro botão foi pressionado

        botaoTutorialMinigame1.on('pointerdown', function (pointer)
        {
            tutorialCtrlMinigame1.setVisible(false);
                
            tutorialFundoAberto.setVisible(true);
        
            botaoTutorialMinigame2.setInteractive().setVisible(true)

            botaoTutorialMinigame1.setVisible(false);
        })

        //Verifica se o segundo botão foi pressionado

        botaoTutorialMinigame2.on('pointerdown', function (pointer)
        {
            tutorialFundoAberto.setVisible(false);

            tutorialFundoFechado.setVisible(true);
            
            botaoTutorialMinigame3.setInteractive().setVisible(true)

            botaoTutorialMinigame2.setVisible(false);
        });

        //Verifica se o terceiro botão foi pressionado

        botaoTutorialMinigame3.on('pointerdown', function (pointer)
        {
            game.scene.start('miniGame1');

            game.scene.stop('apoioMinigame1');
        });
    }
}

