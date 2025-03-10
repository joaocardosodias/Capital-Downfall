class contratoInicial extends Phaser.Scene 
{
    constructor ()
    {
        super('contratoInicial');
    }

    preload()
    {
        //Preload dos assets
        this.load.image('tutorialControles', 'src/assets/intro/tutorialControles.png');

        this.load.image('botaoSeguirAdiante', 'src/assets/botoes/botaoSeguirAdiante.png');
  
    }
    
    create() 
    {  

        //Carrega as imagens

        let tutorialControles = this.add.image(400,300, 'tutorialControles');

        let botaoSeguirAdiante = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        //Verifica se o botão foi pressionado

        botaoSeguirAdiante.on('pointerdown', function (pointer)
        {
            game.scene.start('hub');

            game.scene.stop('contratoInicial');
        });
    }
}

