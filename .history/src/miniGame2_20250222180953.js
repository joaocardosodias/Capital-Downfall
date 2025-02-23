// Variáveis utilizadas
let perfil1; 
let botaoV;
let botaoF;

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

        perfil1 = this.add.image(200, 300, 'testePerfil').setScale(0.3);
        botaoV = this.add.image(10, 505, 'botaoV').setScale(0.3).setInteractive();
        botaoF = this.add.image(240, 505, 'botaoF').setScale(0.275, 0.3).setInteractive();

    }
}