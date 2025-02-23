// Variáveis utilizadas
let perfil1; 
let botaoV;
let botaoF;
let pontuacao = 0;
let retangulos = [];
let perfilIndex = 0;

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


        this.add.rectangle(400, 300, 800, 600, 0x3B9AD6).setDepth(-20);
        perfil1 = this.add.image(400, 280, perfis[perfilIndex].nome).setScale(0.3).setDepth(10);
        botaoV = this.add.image(334, 485, 'botaoV').setScale(0.3).setInteractive().setDepth(10);
        botaoV.displayWidth = 132,6;
        botaoF = this.add.image(466, 485, 'botaoF').setScale(0.3).setInteractive().setDepth(10);
        botaoF.displayWidth = 132,6;

        botaoV.on('pointerdown', function() {
           responder(true);
        });
          
        botaoF.on('pointerdown', function() {
            responder(false);
        }); 

        function responder(respostaJogador) {
            let respostaCerta = perfis[perfilIndex].resposta;

            if (respostaJogador == respostaCerta) {
                pontuacao += 100;
            } else {
                pontuacao -= 50;
            }


        for (let i = 0; i <= 4; i++) {
            let rect = this.add.rectangle(490+(i*60), 308, 60, 400, 0xC2C566).setDepth(i).setStrokeStyle(4, 0x000000);
            retangulos.push(rect);
        }
        perfilIndex++;
        if (perfilIndex < perfis.length) {
            perfil1.setTexture(perfis[perfilIndex].nome);
        } else {
            this.scene.start('nextScene'); // Replace 'nextScene' with the actual next scene
        }
    }

    for (let i = 0; i <= 4; i++) {
        let rect = this.add.rectangle(490+(i*60), 308, 60, 400, 0xC2C566).setDepth(i).setStrokeStyle(4, 0x000000);
        retangulos.push(rect);
    }
}
}