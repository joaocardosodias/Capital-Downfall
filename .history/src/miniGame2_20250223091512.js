// Variáveis utilizadas
let perfil1; 
let botaoV;
let botaoF;
let pontuacao = 0;
let retangulos = [];

class miniGame2 extends Phaser.Scene{
    constructor() {
        super('miniGame2');
    }

    preload() { //Função que carrega as imagens a serem utilizadas nesse minijogo

        this.load.image('botaoV', 'assets/miniGame2/botaoV.png');
        this.load.image('botaoF','assets/miniGame2/botaoF.png');
        for (let i = 1; i <= 10; i++){
            this.load.image('perfil'+i, 'assets/miniGame2/perfil'+i+'.png');
        }
    }

    create() {
        this.add.rectangle(400, 300, 800, 600, 0x3B9AD6).setDepth(-20);
        //this.add.rectangle(400, 300, 800, 600, 0xFFFFFF);
        perfil1 = this.add.image(400, 280, 'perfil1').setScale(0.3).setDepth(10);
        botaoV = this.add.image(334, 485, 'botaoV').setScale(0.3).setInteractive().setDepth(10);
        botaoV.displayWidth = 132,6;
        botaoF = this.add.image(466, 485, 'botaoF').setScale(0.3).setInteractive().setDepth(10);
        botaoF.displayWidth = 132,6;

        let perfis = [
            {nome: 'perfil1', resposta: false},
            {nome: 'perfil2', resposta: false},
            {nome: 'perfil3', resposta: false},
            {nome: 'perfil4', resposta: false},
            {nome: 'perfil5', resposta: false},
            {nome: 'perfil6', resposta: true},
            {nome: 'perfil7', resposta: true},
            {nome: 'perfil8', resposta: true},
            {nome: 'perfil9', resposta: true},
            {nome: 'perfil10', resposta: true}
        ];

        // Embaralha os perfis e pega 5 aleatórios
        Phaser.Utils.Array.Shuffle(perfis);
        perfis = perfis.slice(0, 5);

        for (let i = 0; i <= 4; i++) {
            let rect = this.add.rectangle(460+(50*i), 308, 80, 400, 0xC2C566).setDepth(i).setStrokeStyle(4, 0x000000);
            retangulos.push(rect);
        };
    }
}