// Variáveis utilizadas
let perfil1;
let botaoV;
let botaoF;
let pontuacao = 0;
let perfisRestantes = [];
let perfilIndex = 0;
let carimbo;
let textoPontuacao; 
let textoMudancaPontuacao; // Variável para o texto de "+100 pontos" ou "-50 pontos"

class miniGame2 extends Phaser.Scene {
    constructor() {
        super('miniGame2');
    }

    preload() {
        // Carrega as imagens
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

        // Criação do primeiro perfil
        perfil1 = this.add.image(400, 280, perfis[perfilIndex].nome).setScale(0.3).setDepth(10);

        // Armazenar os perfis restantes no array `perfisRestantes`
        for (let i = 1; i < perfis.length; i++) {
            let perfil = this.add.image(400 + (i * 80), 308, perfis[i].nome).setScale(0.3).setDepth(-i);
            perfisRestantes.push(perfil); // Adiciona os perfis restantes no array
        }
        
        textoPontuacao = this.add.text(20, 40, 'Pontuação: ' + pontuacao, {
            font: '40px Arial',
            fill: '#ffffff'
        }).setDepth(15);        
        let fundoPontuacao = this.add.rectangle(150, 40, 350, 110, 0x000000).setDepth(10);

        // Criação dos botões
        botaoV = this.add.image(334, 485, 'botaoV').setScale(0.3).setInteractive().setDepth(10);
        botaoF = this.add.image(466, 485, 'botaoF').setScale(0.3).setInteractive().setDepth(10);

        // Amarra as funções de click nos botões
        botaoV.on('pointerdown', () => this.responder(true, perfis));
        botaoF.on('pointerdown', () => this.responder(false, perfis));
    }

    // Função responsável por verificar a resposta do jogador
    responder(respostaJogador, perfis) {
        let respostaCerta = perfis[perfilIndex].resposta;

        // Atualiza a pontuação
        if (respostaJogador === respostaCerta) {
            pontuacao += 100;
            carimbo = this.add.image(400, 300, 'carimboV').setDepth(15);

            textoMudancaPontuacao = this.add.text(20, 400, '+100 pontos', {
                font: '50px Arial',
                fill: '#00FF00'  // Cor verde
            }).setDepth(15);

        } else {
            pontuacao -= 50;
            carimbo = this.add.image(400, 300, 'carimboF').setDepth(15);

            textoMudancaPontuacao = this.add.text(20, 400, '-50 pontos', {
                font: '50px Arial',
                fill:  '#FF0000' //Cor vermelha
            }).setDepth(15);
        }

        this.tweens.add({
            targets: textoMudancaPontuacao,
            y: 50, // Faz o texto subir
            alpha: 0, // Fica invisível
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                textoMudancaPontuacao.destroy(); // Remove o texto após a animação
            }
        });

        textoPontuacao.setText('Pontuação: ' + pontuacao);

        // Anima a exibição do carimbo
        this.tweens.add({
            targets: carimbo,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(500, () => carimbo.destroy()); // Remove após 500ms
                this.animaPerfilSubindo(perfis);
            }
        });
    }

    // Função que anima o perfil, os botões e o carimbo subindo até desaparecer da tela
    animaPerfilSubindo(perfis) {
        // Mover o perfil, os botões e o carimbo para cima
        this.tweens.add({
            targets: [perfil1, botaoV, botaoF, carimbo],
            y: -200, // Move todos os elementos para cima até sair da tela
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                perfilIndex++; // Avança para o próximo perfil
                if (perfilIndex < 5) {
                    // Se ainda houver perfis, troca a imagem do perfil e reposiciona os outros
                    perfil1.setTexture(perfis[perfilIndex].nome);
                    perfil1.setY(280); // Restaura a posição Y do perfil para o valor inicial

                    // Anima os perfis restantes para a esquerda
                    this.animaPerfisEsquerda(perfis);
                } else {
                    // Se não houver mais perfis, vai para a próxima cena
                    let textoFinal = this.add.text(400, 250, 'Sua pontuação final: ' + pontuacao, {
                        font: '40px Arial',
                        fill: '#ffffff'
                    }).setOrigin(0.5).setDepth(21);
            
                    // Criação do botão para voltar ao jogo
                    let botaoVoltar = this.add.text(400, 350, 'Voltar ao Jogo', {
                        font: '32px Arial',
                        fill: '#ffffff',
                        backgroundColor: '#000000'
                    }).setOrigin(0.5).setDepth(21).setInteractive();
            
                    botaoVoltar.on('pointerdown', () => {
                        this.scene.start('loopGame'); // Substitua 'loopGame' pela cena de reinício do jogo
                    });
                }
                }
            }
        });
    }

    // Função que move os perfis restantes para a esquerda
    animaPerfisEsquerda(perfis) {
        let perfilRemovido = perfisRestantes.shift(); // Remove o primeiro perfil da lista
        perfilRemovido.destroy(); // Remove a imagem do perfil da tela

        // Atualiza a lista de perfis restantes após remoção
        for (let i = 0; i < perfisRestantes.length; i++) {
            let perfil = perfisRestantes[i]; // Mantém o espaçamento correto entre os perfis restantes
            this.tweens.add({
                targets: perfil,
                x: perfil.x - 80, // Move o perfil para a esquerda
                duration: 500, // Duração da animação
                ease: 'Power2',
                onComplete: () => {
                    perfil.setDepth(-i); // Ajusta a profundidade após a animação
                }
            });
        }

        // Traz os botões de volta à tela
        this.tweens.add({
            targets: [botaoV, botaoF],
            y: 485, // Restaura a posição Y dos botões
            duration: 500, // Duração da animação
            ease: 'Power2',
        });
    }
}