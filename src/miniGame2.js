class miniGame2 extends Phaser.Scene {

   //Para evitar conflitos com o mesmo nome de variáveis, elas foram colocadas dentro do constructor da classe

    constructor(perfil1, botaoV, botaoF, perfisRestantes, perfilIndex, carimbo, textoPontuacao, textoMudancaPontuacao, fim, botaoVoltar, respostaEmAndamento) {
        super('miniGame2');

        this.perfil1 = perfil1;

        this.botaoV = botaoV;

        this.botaoF = botaoF;

        this.perfisRestantes = perfisRestantes;

        this.perfilIndex = perfilIndex;

        this.carimbo = carimbo;

        this.textoPontuacao = textoPontuacao;

        this.textoMudancaPontuacao = textoMudancaPontuacao;

        this.fim = fim;

        this.botaoVoltar = botaoVoltar;

        this.respostaEmAndamento = respostaEmAndamento;

    }

    preload() {
        // Carrega as imagens 

        miniGame2.perfisRestantes = [];

        miniGame2.perfilIndex = 0;

        miniGame2.respostaEmAndamento = false;

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
        miniGame2.perfil1 = this.add.image(400, 280, perfis[miniGame2.perfilIndex].nome).setScale(0.3).setDepth(10);

        // Armazena os perfis restantes no array perfisRestantes com um laço for
        for (let i = 1; i < perfis.length; i++) {

            let perfil = this.add.image(400 + (i * 80), 308, perfis[i].nome).setScale(0.3).setDepth(-i);

            miniGame2.perfisRestantes.push(perfil); // Adiciona os perfis restantes no array
        }
        
        //Adiciona no canto superior esquerdo um texto com a pontuação atual do jogador
        miniGame2.textoPontuacao = this.add.text(20, 40, 'Pontuação: ' + pontuacao, {

            font: '40px Arial',

            fill: '#ffffff'

        }).setDepth(15);   

        // Criação dos botões
        
        miniGame2.botaoV = this.add.image(334, 485, 'botaoV').setScale(0.3).setInteractive().setDepth(10);

        miniGame2.botaoF = this.add.image(466, 485, 'botaoF').setScale(0.3).setInteractive().setDepth(10);

        //Se você clicar em um dos botões...
        miniGame2.botaoV.on('pointerdown', () => {
            if (!miniGame2.respostaEmAndamento) {  // Verifica se uma resposta está em andamento
                this.responder(true, perfis); // Chama a função responder passando "true" como resposta do jogador
            }
        });
        miniGame2.botaoF.on('pointerdown', () => {
            if (!miniGame2.respostaEmAndamento) {  // Verifica se uma resposta está em andamento
                this.responder(false, perfis); // Chama a função responder passando "true" como resposta do jogador
            }
        });
    }

    // Função responsável por verificar a resposta do jogador
    responder(respostaJogador, perfis) {
        miniGame2.respostaEmAndamento = true; // Marca que uma resposta está em andamento
        // Desabilita os botões para evitar múltiplas respostas
        miniGame2.botaoV.setInteractive(false);
        miniGame2.botaoF.setInteractive(false);

        let respostaCerta = perfis[miniGame2.perfilIndex].resposta;

        // Verifica se a resposta do jogador está correta
        if (respostaJogador === respostaCerta) {
            pontuacao += 100; //Aumenta a pontuação
            //Adiciona uma imagem de certo na tela
            miniGame2.carimbo = this.add.image(400, 300, 'carimboV').setDepth(15);

            //Adiciona um texto ao lado que mostra que o jogador ganhou 100 pontos
            miniGame2.textoMudancaPontuacao = this.add.text(20, 400, '+100 pontos', {
                font: '50px Arial',
                fill: '#00FF00' // Cor do texto: verde
            }).setDepth(15);

        } else { //Se o jogador errou
            pontuacao -= 50; //Ele perde 50 pontos
            //Uma imagem de 'errado'(X) é adicionada a tela
            miniGame2.carimbo = this.add.image(400, 300, 'carimboF').setDepth(15);
            
            //Adiciona um texto ao lado que mostra que o jogador perdeu 50 pontos
            miniGame2.textoMudancaPontuacao = this.add.text(20, 400, '-50 pontos', {
                font: '50px Arial',
                fill:  '#FF0000' //Cor do texto: vermelha
            }).setDepth(15);
        }

        //faz o texto do lado subir 
        this.tweens.add({
            targets: miniGame2.textoMudancaPontuacao, // O objeto que será animado
            y: 50, // Posição até onde o texto vai subir
            alpha: 0, // Faz o texto desaparecer gradualmente
            duration: 2000, // A animação dura 2 segundos
            ease: 'Power2', // Usa a curva de suavização "Power2" (aceleração suave)
            onComplete: () => {
                miniGame2.textoMudancaPontuacao.destroy(); // Após a animação ser completada, remove o texto da tela
            }
        });

        //Atualiza o placar
        miniGame2.textoPontuacao.setText('Pontuação: ' + pontuacao);

        // Anima a exibição do carimbo
        this.tweens.add({
            targets: miniGame2.carimbo,
            alpha: 1, // Fica visível
            duration: 1000,
            ease: 'Power2',
            onComplete: () => { // Quando a animação terminar...
                this.time.delayedCall(500, () => miniGame2.carimbo.destroy()); // Remove a imagem do carimbo após 500ms
                this.animaPerfilSubindo(perfis); //chama a próxima função
            }
        });
    }

    // Função que anima o perfil, os botões e o carimbo subindo até desaparecer da tela
    animaPerfilSubindo(perfis) {
        // Move o perfil, os botões e o carimbo para cima
        this.tweens.add({
            targets: [miniGame2.perfil1, miniGame2.botaoV, miniGame2.botaoF, miniGame2.carimbo], //elementos que serão animados
            y: -200, // Posição até qual eles vão subir
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                miniGame2.perfilIndex++; // Adiciona uma unidade ao perfilIndex
                if (miniGame2.perfilIndex < 5) {
                    // Se ainda houver perfis, troca a imagem do perfil e reposiciona os outros
                    miniGame2.perfil1.setTexture(perfis[miniGame2.perfilIndex].nome);
                    miniGame2.perfil1.setY(280); // Restaura a posição Y do perfil para o valor inicial

                    // Chama a função que anima os perfis restantes para a esquerda
                    this.animaPerfisEsquerda(perfis);
                } else {
                    // Se não houver mais perfis, vai para a próxima cena
                    this.add.rectangle(400, 300, 800, 600, 0x000000).setDepth(20); // Fundo preto 
                    miniGame2.fim = this.add.image(400, 300, 'fim').setDepth(21); // Exibe a tela final

                    //Mostra a pontuação final do jogador na tela
                    let textoFinal = this.add.text(520, 275, pontuacao, {
                        font: '40px Lexend',
                        fill: '#ffffff' //Cor branca
                    }).setOrigin(0.5).setDepth(31);

                    // Criação do botão para voltar ao jogo
                    miniGame2.botaoVoltar = this.add.image(400, 400, 'botaoVoltar').setInteractive().setDepth(22).setScale(0.9);

                    miniGame2.botaoVoltar.on('pointerdown', () => {
                        minigame2Jogado = true;
                        this.scene.restart('hub'); //Se você clicar no botão Voltar, você volta pra hub do jogo
                        this.scene.stop('miniGame2');
                    });
                }
            }
        });
    }

    // Função que move os perfis restantes para a esquerda
    animaPerfisEsquerda(perfis) {
        let perfilRemovido = miniGame2.perfisRestantes.shift(); // Remove o primeiro perfil da lista
        perfilRemovido.destroy(); // Remove a imagem do perfil da tela

        // Atualiza a lista de perfis restantes após remoção
        for (let i = 0; i < miniGame2.perfisRestantes.length; i++) {
            let perfil = miniGame2.perfisRestantes[i]; 
            //Adiciona a animação que move os perfis restantes para a esquerda
            this.tweens.add({
                targets: perfil,
                x: perfil.x - 80, // Move o perfil para a esquerda
                duration: 500, // Duração da animação, 500ms
                ease: 'Power2',
                onComplete: () => { //Quando a animação terminar
                    perfil.setDepth(-i); // Ajusta a profundidade após a animação
                }
            });
        }

        // Traz os botões V e F de volta à tela
        this.tweens.add({
            targets: [miniGame2.botaoV, miniGame2.botaoF],
            y: 485, // Restaura a posição Y dos botões
            duration: 500, // Duração da animação
            ease: 'Power2',
            onComplete: () => { //Quando a animação terminar
                miniGame2.respostaEmAndamento = false; // Permite novas respostas após essa animação
                //Os botões voltam a ser interativos, ou seja, o jogo volta a aceitar novas respostas
                miniGame2.botaoV.setInteractive(true); 
                miniGame2.botaoF.setInteractive(true);
            }
        });
    }
}
