//Variáveis utilizadas

let fundoPreto;

let botaoIniciar;

//Cria a cena do menu inicial do jogo

class menuInicial extends Phaser.Scene 
{



    constructor()
    {
        super('menuInicial');
    }

    //Preload dos assets do fundo e do botão iniciar

    preload()
    {
        this.load.image('fundoPreto', 'assets/fundo_preto.jpg');
        
        this.load.image('botaoIniciar', 'assets/botaoIniciar.png');
    }
    
    create() 
    {
        //Cria as imagens na tela

        fundoPreto = this.add.image(400,300,'fundoPreto');

        botaoIniciar = this.add.image(400,300, 'botaoIniciar').setInteractive();

        //Verifica se o botão de iniciar foi clickado

        botaoIniciar.on('pointerdown', function (pointer)
        {

            //Caso ele seja, o jogo para a cena atual e passa pra próxima

            game.scene.stop('menuInicial');

            game.scene.start('hub');
        }   
    )}
}