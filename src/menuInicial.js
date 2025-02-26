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
        this.load.spritesheet('menu', 'assets/menuInicial.png', { frameWidth: 800, frameHeight: 600 });

        this.load.image('botaoIniciar', 'assets/botaoIniciar.png');
    }

    create() 
    {

        // Cria o sprite da tela inicial

        const iniciar = this.add.sprite(400, 300, 'menu');

        // Cria a animação da tela inicial

        minigame1Jogado = false;

        minigame2Jogado = false;

        minigame3Jogado = false;

        this.anims.create({
            key: 'iniciar',

            frames: this.anims.generateFrameNumbers('menu', { start: 0, end: 29 }),

            // O Phaser não consegue lidar com uma framerate menor que 1, então é preciso controlar manualmente a velocidade

            frameRate: 10,  
            
            repeat: -1
        });

        // Inicia a animação

        iniciar.play('iniciar');

        // Variáveis para controle de tempo da animação

        this.lastFrameTime = 0;

        this.frameInterval = 1000;  

        // Cria as imagens na tela

        botaoIniciar = this.add.image(180, 535, 'botaoIniciar').setInteractive();

        // Verifica se o botão de iniciar foi clicado

        botaoIniciar.on('pointerdown', function (pointer)
        {
            // Caso ele seja, o jogo para a cena atual e passa para a próxima

            game.scene.stop('menuInicial');

            game.scene.start('hub');
        });
    }

    //Controla o tempo de cada sprite da spritesheet

    update(time, delta)
    {
        // Verifica se o tempo desde o último quadro passou o intervalo desejado, antes de iniciar o próximo

        if (time - this.lastFrameTime >= this.frameInterval) {

            this.lastFrameTime = time;
            
            
            const iniciar = this.children.getByName('iniciar');

            if (iniciar) {

                
                iniciar.anims.nextFrame();
            }
        }
    }
}
