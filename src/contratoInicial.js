class contratoInicial extends Phaser.Scene 
{
    constructor ()
    {
        super('contratoInicial');
    }

    preload()
    {
        //Preload dos assets, coloca a variável tutorialLido como false

        this.load.image('tutorialControles', 'assets/tutorialControles.png');

        this.load.image('botaoSeguirAdiante', 'assets/botaoSeguirAdiante.png');
  
    }
    
    create() 
    {  
        let tutorialControles = this.add.image(400,300, 'tutorialControles');

        let botaoSeguirAdiante = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        botaoSeguirAdiante.on('pointerdown', function (pointer)
        {
            game.scene.start('hub');

            game.scene.stop('contratoInicial');
        });
    }
}

