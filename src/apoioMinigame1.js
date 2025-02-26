let seguirAdiante;

class apoioMinigame1 extends Phaser.Scene 
{
    constructor ()
    {
        super('apoioMinigame1');
    }

    preload()
    {
        //Preload dos assets, coloca a variável tutorialLido como false

        this.load.image('tutorialCtrlMinigame1', 'assets/materialApoioDia1/tutorialControlesMinigame1.png');

        this.load.image('tutorialFundoAberto', 'assets/materialApoioDia1/tutorialFundoAberto.png');

        this.load.image('tutorialFundoFechado', 'assets/materialApoioDia1/tutorialFundoFechado.png');

        this.load.image('botaoSeguirAdiante', 'assets/botaoSeguirAdiante.png');
  
    }
    
    create() 
    {
       
        
        //Carrega os dois fundos, coloca o fundo laranja como invisível

        let listaImagens= 0;

        let tutorialCtrlMinigame1 = this.add.image(400,300, 'tutorialCtrlMinigame1');

        let tutorialFundoAberto = this.add.image(400,300, 'tutorialFundoAberto').setVisible(false);

        let tutorialFundoFechado = this.add.image(400,300, 'tutorialFundoFechado').setVisible(false);

        let botaoTutorialMinigame1 = this.add.image(615,560, 'botaoSeguirAdiante').setInteractive().setScale(0.50);

        botaoTutorialMinigame1.on('pointerdown', function (pointer)
        {
            if(listaImagens == 0 && seguirAdiante == true)
            {
                tutorialCtrlMinigame1.setVisible(false);
                
                tutorialFundoAberto.setVisible(true);
                
                listaImagens = 1;

                seguirAdiante = false;

            }
            if(listaImagens == 1 && seguirAdiante == true)
                {
                    tutorialFundoAberto.setVisible(false);

                    tutorialFundoFechado.setVisible(true);
                    
                    listaImagens = 2;
    
                    seguirAdiante = false;
    
                }
            if(listaImagens == 2 && seguirAdiante == true)
                {
                        this.scene.start('miniGame1')

                        this.scene.stop('apoioMinigame1');
        
                }
            if(seguirAdiante == false)
                {
            
                        this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);  
            
                }
        });
        

        
    }

    //Essa função permite que o tutorial seja clicado após o tempo ser passado, assim evitando um bug que um click registrava logo no início da cena

    onEvent()
    {
        seguirAdiante = true;
        return
    }
    
    update()
    {
        

 
    }
    
};

