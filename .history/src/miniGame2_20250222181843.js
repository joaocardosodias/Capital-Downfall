// Variáveis utilizadas
let perfil1; 
let botaoV;
let botaoF;
let largurabotao = 

class miniGame2 extends Phaser.Scene{
    constructor() {
        super('miniGame2');
    }

    preload() { //Função que carrega as imagens a serem utilizadas nesse minijogo

        this.load.image('testePerfil','assets/testePerfil.png');
        this.load.image('botaoV', 'assets/botaoV.png');
        this.load.image('botaoF','assets/botaoF.png');

    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0xffffff); // Retângulo branco (x, y, largura, altura, cor)
        perfil1 = this.add.image(200, 275, 'testePerfil').setScale(0.3);
        botaoV = this.add.image(134, 480, 'botaoV').setScale(0.3).setInteractive();
        botaoF = this.add.image(265, 480, 'botaoF').setScale(0.275, 0.3).setInteractive();

    }
}