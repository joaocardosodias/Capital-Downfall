// Variáveis utilizadas
let perfil1;
let botaoV;
let botaoF;
let pontuacao = 0;
let retangulos = [];
let perfilIndex = 0;

class miniGame2 extends Phaser.Scene {
    constructor() {
        super('miniGame2');
    }

    preload() {
        // Função que carrega as imagens a serem utilizadas nesse minijogo
        this.load.image('botaoV', 'assets/miniGame2/botaoV.png');
        this.load.image('botaoF', 'assets/miniGame2/botaoF.png');
        this.load.image('carimboV', 'assets/miniGame2/carimboV.png');
        this.load.image('carimboF', 'assets/miniGame2/carimboF.png');
        for (let i = 1; i <= 10; i++) {
            this.load.image('perfil' + i, 'assets/miniGame2/perfil' + i + '.png');
        }
    }

    create() {
        let perfis = [
            { nome: 'perfil1', resposta: false },
            { nome: 'perfil2', resposta: false },
            { nome: 'perfil3', resposta: false },
            { nome: 'perfil4', resposta: false },
            { nome: 'perfil5', resposta: false },
            { nome: 'perfil6', resposta: true },
            { nome: 'perfil7', resposta: true },
            { nome: 'perfil8', resposta: true },
            { nome: 'perfil9', resposta: true },
            { nome: 'perfil10', resposta: true }
        ];

        // Embaralha os perfis e pega 5 aleatórios
        Phaser.Utils.Array.Shuffle(perfis);
        perfis = perfis.slice(0, 5);

        // Fundo
        this.add.rectangle(400, 300, 800, 600, 0x3B9AD6).setDepth(-20);

        // Cria o primeiro perfil
        perfil1 = this.add.image(400, 280, perfis[perfilIndex].nome).setScale(0.3).setDepth(10);

        // Criação dos botões
        botaoV = this.add.image(334, 485, 'botaoV').setScale(0.3).setInteractive().setDepth(10);
        botaoF = this.add.image(466, 485, 'botaoF').setScale(0.3).setInteractive().setDepth(10);

        // Amarrando as funções de click nos botões
        botaoV.on('pointerdown', () => this.responder(true, perfis));
        botaoF.on('pointerdown', () => this.responder(false, perfis));

        // Criação dos retângulos (apenas uma vez)
        for (let i = 0; i <= 4; i++) {
            let rect = this.add.rectangle(490 + (i * 60), 308, 60, 400, 0xC2C566).setDepth(i).setStrokeStyle(4, 0x000000);
            retangulos.push(rect);
        }
    }

    // Função responsável por verificar a resposta do jogador
    responder(respostaJogador, perfis) {
        let respostaCerta = perfis[perfilIndex].resposta;

        // Atualiza a pontuação
        if (respostaJogador === respostaCerta) {
            pontuacao += 100;
        } else {
            pontuacao -= 50;
        }

        // Exibe o carimbo com a resposta
        let carimbo;
        if (respostaJogador) {
            carimbo = this.add.image(350, 400, 'carimboV').setScale(0.3).setDepth(15);
        } else {
            carimbo = this.add.image(400, 400, 'carimboF').setScale(0.3).setDepth(15);
        }

        // Anima a exibição do carimbo
        this.tweens.add({
            targets: carimbo,
            alpha: 1,
            duration: 500,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(500, () => carimbo.destroy()); // Remove após 500ms
                this.proximoPerfil(perfis); // Vai para o próximo perfil após a animação
            }
        });
    }
}