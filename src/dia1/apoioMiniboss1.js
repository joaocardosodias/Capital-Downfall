class apoioMiniboss1 extends Phaser.Scene 
{
    constructor ()
    {
        super('apoioMiniboss1');
    }

    preload()
    {
        //Preload dos assets
        this.load.image('tutorialMiniboss1', 'src/assets/dia1/tutorialControlesMiniboss1.png');
        this.load.image('botaoSeguirAdiante', 'src/assets/botoes/botaoSeguirAdiante.png');
    }
    
    create() 
    {  
        //Carrega as telas e botões utilizados
        let tutorialMiniboss1 = this.add.image(400,300, 'tutorialMiniboss1')
        let botaoSeguirAdiante = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        //Verifica se o botão foi pressionado

        botaoSeguirAdiante.on('pointerdown',() =>
        {
            this.scene.stop('apoioMiniboss1');
            this.scene.start('miniBossDia1');
        })
    }
}