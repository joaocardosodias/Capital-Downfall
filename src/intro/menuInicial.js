//Variáveis utilizadas

let botaoIniciar;

let minigame1Jogado; 

let minigame2Jogado;

let minigame3Jogado;

//Cria a cena do menu inicial do jogo

class menuInicial extends Phaser.Scene 
{
    constructor()
    {
        super('menuInicial');
    }

    // Preload dos assets
    preload()
    {
        this.load.spritesheet('menu', 'src/assets/intro/menuInicial.png', { frameWidth: 800, frameHeight: 600 });

        this.load.image('botaoIniciar', 'src/assets/intro/botaoIniciar.png');
    }

    create() 
    {

        // Cria o sprite da tela inicial

        const iniciar = this.add.sprite(400, 300, 'menu');

        //Variáveis do controle sobre os minigames

        minigame1Jogado = false;

        minigame2Jogado = false;

        minigame3Jogado = false;

        // Cria a animação da tela inicial

        this.anims.create({
            key: 'iniciar',

            frames: this.anims.generateFrameNumbers('menu', { start: 0, end: 102 }),

            frameRate: 10,  
            
            repeat: -1
        });

        // Inicia a animação

        iniciar.play('iniciar');

        // Cria as imagens na tela

        botaoIniciar = this.add.image(670, 400, 'botaoIniciar').setInteractive().setScale(1);

        // Verifica se o botão de iniciar foi clicado

        botaoIniciar.on('pointerdown', function (pointer)
        {
            // Caso ele seja, o jogo para a cena atual e passa para a próxima

            game.scene.stop('menuInicial');
            game.scene.start('contratoInicial');
        });
    }
}
