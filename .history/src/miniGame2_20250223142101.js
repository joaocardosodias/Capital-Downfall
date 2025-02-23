// Variáveis utilizadas
let perfil1;
let botaoV;
let botaoF;
let pontuacao = 0;
let perfisRestantes = []; //Lista que armazena os perfis restantes
let perfilIndex = 0;
let carimbo;
let textoPontuacao; 
let textoMudancaPontuacao; // Variável para o texto de "+100 pontos" ou "-50 pontos"
let fim; //Imagem de fim de jogo
let botaoVoltar;
let respostaEmAndamento = false; // Variável para controlar se já foi feita uma resposta

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
        // Carrega as imagens dos perfis usando um laço for
        for (let i = 1; i <= 10; i++) {
            this.load.image('perfil' + i, 'assets/miniGame2/perfil' + i + '.png');
        }
        this.load.image('fim', 'assets/miniGame2/fim.png');
        this.load.image('botaoVoltar', 'assets/miniGame2/botaoVoltar.png');
    }

    create() {
        // Cria uma array de objetos chamados perfis, cada perfil tem um nome e uma resposta
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

        // Armazena os perfis restantes no array perfisRestantes com um laço for
        for (let i = 1; i < perfis.length; i++) {
            let perfil = this.add.image(400 + (i * 80), 308, perfis[i].nome).setScale(0.3).setDepth(-i);
            perfisRestantes.push(perfil); // Adiciona os perfis restantes no array
        }
        
        //Adiciona no canto superior esquerdo um texto com a pontuação atual do jogador
        textoPontuacao = this.add.text(20, 40, 'Pontuação: ' + pontuacao, {
            font: '40px Arial',
            fill: '#ffffff'
        }).setDepth(15);   

        // Criação dos botões
        botaoV = this.add.image(334, 485, 'botaoV').setScale(0.3).setInteractive().setDepth(10);
        botaoF = this.add.image(466, 485, 'botaoF').setScale(0.3).setInteractive().setDepth(10);

        // Amarra as funções de click nos botões
        botaoV.on('pointerdown', () => {
            if (!respostaEmAndamento) {  // Verifica se uma resposta está em andamento
                this.responder(true, perfis); // Chama a função responder passando "true" como resposta do jogador
            }
        });
        botaoF.on('pointerdown', () => {
            if (!respostaEmAndamento) {  // Verifica se uma resposta está em andamento
                this.responder(false, perfis); // Chama a função responder passando "true" como resposta do jogador
            }
        });
    }

    // Função responsável por verificar a resposta do jogador
    responder(respostaJogador, perfis) {
        respostaEmAndamento = true; // Marca que uma resposta está em andamento
        // Desabilita os botões para evitar múltiplas respostas
        botaoV.setInteractive(false);
        botaoF.setInteractive(false);

        let respostaCerta = perfis[perfilIndex].resposta;

        // Verifica se a resposta do jogador está correta
        if (respostaJogador === respostaCerta) {
            pontuacao += 100; //Aumenta a pontuação
            //Adiciona uma imagem de certo na tela
            carimbo = this.add.image(400, 300, 'carimboV').setDepth(15);

            //Adiciona um texto ao lado que mostra que o jogador ganhou 100 pontos
            textoMudancaPontuacao = this.add.text(20, 400, '+100 pontos', {
                font: '50px Arial',
                fill: '#00FF00' // Cor do texto: verde
            }).setDepth(15);

        } else { //Se o jogador errou
            pontuacao -= 50; //Ele perde 50 pontos
            //Uma imagem de 'errado'(X) é adicionada a tela
            carimbo = this.add.image(400, 300, 'carimboF').setDepth(15);
            
            //Adiciona um texto ao lado que mostra que o jogador perdeu 50 pontos
            textoMudancaPontuacao = this.add.text(20, 400, '-50 pontos', {
                font: '50px Arial',
                fill:  '#FF0000' //Cor do texto: vermelha
            }).setDepth(15);
        }

        //faz o texto do lado subir 
        this.tweens.add({
            targets: textoMudancaPontuacao, // O objeto que será animado
            y: 50, // Posição até onde o texto vai subir
            alpha: 0, // Faz o texto desaparecer gradualmente
            duration: 2000, // A animação dura 2 segundos
            ease: 'Power2', // Usa a curva de suavização "Power2" (aceleração suave)
            onComplete: () => {
                textoMudancaPontuacao.destroy(); // Após a animação ser completada, remove o texto da tela
            }
        });

        //Atualiza o placar
        textoPontuacao.setText('Pontuação: ' + pontuacao);

        // Anima a exibição do carimbo
        this.tweens.add({
            targets: carimbo,
            alpha: 1, // Fica visível
            duration: 1000,
            ease: 'Power2',
            onComplete: () => { // Quando a animação terminar...
                this.time.delayedCall(500, () => carimbo.destroy()); // Remove a imagem do carimbo após 500ms
                this.animaPerfilSubindo(perfis); //chama a próxima função
            }
        });
    }

    // Função que anima o perfil, os botões e o carimbo subindo até desaparecer da tela
    animaPerfilSubindo(perfis) {
        // Move o perfil, os botões e o carimbo para cima
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
                    this.add.rectangle(400, 300, 800, 600, 0x000000).setDepth(20); // Fundo preto com profundidade alta
                    fim = this.add.image(400, 300, 'fim').setDepth(21); // Exibe a tela final

                    let textoFinal = this.add.text(565, 300, pontuacao, {
                        font: '40px Arial',
                        fill: '#00000'
                    }).setOrigin(0.5).setDepth(21);

                    // Criação do botão para voltar ao jogo
                    botaoVoltar = this.add.image(400, 400, 'botaoVoltar').setInteractive().setDepth(22).setScale(0.9);

                    botaoVoltar.on('pointerdown', () => {
                        this.scene.start('hub');
                    });
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
            let perfil = perfisRestantes[i]; // Mantém o espaçamento correto entre os perfis
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
            onComplete: () => {
                respostaEmAndamento = false; // Permite novas respostas após a animação
                botaoV.setInteractive(true);
                botaoF.setInteractive(true);
            }
        });
    }
}
