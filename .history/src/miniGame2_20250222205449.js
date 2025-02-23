// Variáveis utilizadas
let perfil1; 
let botaoV;
let botaoF;
let pontuacao = 0;


class miniGame2 extends Phaser.Scene{
    constructor() {
        super('miniGame2');
    }

    preload() { //Função que carrega as imagens a serem utilizadas nesse minijogo

        this.load.image('botaoV', 'assets/miniGame2/botaoV.png');
        this.load.image('botaoF','assets/miniGame2/botaoF.png');
        this.load
        this.load.image('perfil2','assets/miniGame2/perfil2.png');
        this.load.image('perfil3','assets/miniGame2/perfil3.png');
        this.load.image('perfil4','assets/miniGame2/perfil4.png');
        this.load.image('perfil5','assets/miniGame2/perfil5.png');
        this.load.image('perfil6','assets/miniGame2/perfil6.png');
        this.load.image('perfil7','assets/miniGame2/perfil7.png');
        this.load.image('perfil8','assets/miniGame2/perfil8.png');
        this.load.image('perfil9','assets/miniGame2/perfil9.png');
        this.load.image('perfil10','assets/miniGame2/perfil10.png');
    }

    create() {
        //this.add.rectangle(400, 300, 800, 600, 0xFFFFFF);
        perfil1 = this.add.image(200, 280, 'perfil1').setScale(0.3);
        botaoV = this.add.image(134, 485, 'botaoV').setScale(0.3).setInteractive();
        botaoV.displayWidth = 132,6;
        botaoF = this.add.image(266, 485, 'botaoF').setScale(0.3).setInteractive();
        botaoF.displayWidth = 132,6;
    }
}