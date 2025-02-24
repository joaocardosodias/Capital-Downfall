// Variáveis utilizadas
let perfil1; 
let botaoV;
let botaoF;
let largurabotao = 884/2;

class miniGame2 extends Phaser.Scene{
    constructor() {
        super('miniGame2');
    }

    preload() { //Função que carrega as imagens a serem utilizadas nesse minijogo

        this.load.image('perfil1','assets/miniGame2/perfil1.png');
        this.load.image('botaoV', 'assets/miniGame2/botaoV.png');
        this.load.image('botaoF','assets/miniGame2/botaoF.png');

    }

    create() {
        
        perfil1 = this.add.image(200, 280, 'perfil1').setScale(0.3);
        botaoV = this.add.image(134, 480, 'botaoV').setScale(0.3).setInteractive();
        botaoV
        botaoF = this.add.image(265, 480, 'botaoF').setScale(0.3).setInteractive();
    }
}