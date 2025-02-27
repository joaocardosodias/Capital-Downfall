// Variáveis utilizadas

let tutorialLido;

let imailInicial;

let iniciarFase1;

let iniciarFase;

let fundoLaranja;

//Cena do primeiro dia

class dia1 extends Phaser.Scene 
{



    constructor ()
    {
        super('dia1');
    }

    preload()
    {
        //Preload dos assets, coloca a variável tutorialLido como false

        this.load.image('imailInicial', 'assets/imailInicial.png');

        this.load.image('fundoLaranja', 'assets/fundo_laranja.jpg');

        this.load.image('iniciarFase1', 'assets/iniciarFase1.png');

        tutorialLido = false;      
    }
    
    create() 
    {
        //Carrega os dois fundos, coloca o fundo laranja como invisível

        imailInicial = this.add.image(400,300, 'imailInicial')

        fundoLaranja = this.add.image(400,300, 'fundoLaranja').setVisible(false);

        //Carrega o botão para iniciar o jogo

        iniciarFase1 = this.add.image(615,560, 'iniciarFase1').setInteractive().setScale(0.50);

        //Essa parte adiciona um delay de 3 segundos para iniciar a função onEvent

        this.timedEvent = this.time.delayedCall(1000, this.onEvent, [], this);    

        
    }

    //Essa função permite que o tutorial seja clicado após o tempo ser passado, assim evitando um bug que um click registrava logo no início da cena

    onEvent()
    {
    tutorialLido = true;
    }
    
    update()
    {
        if(tutorialLido == true)
        {
            // Checa se o botão do mouse foi clicado em cima da parte verde

            iniciarFase1.on('pointerdown', function (pointer){

                //Deixa o fundo Laranja visível, e a tela do email invisível

                fundoLaranja.setVisible(true);
                iniciarFase1.setVisible(false);
                imailInicial.setVisible(false);
                tutorialLido = false;

                game.scene.stop('dia1');
                game.scene.start('miniGame1');
            });


            
        }
    }
}
