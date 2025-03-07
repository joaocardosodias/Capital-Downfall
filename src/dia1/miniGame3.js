        class miniGame3 extends Phaser.Scene {

             //Para evitar conflitos com o mesmo nome de variáveis, elas foram colocadas dentro do constructor da classe

            constructor(larguraJogo,alturaJogo,cardSelecionado,botaoVerificar,textoCentral,posicoesOcupadas,ordemCorreta,cardsSuperiores,cardsInferiores,imagensCards) {
                super({ key: 'miniGame3' });

                this.larguraJogo = larguraJogo;

                this.alturaJogo = alturaJogo;

                this.cardSelecionado = cardSelecionado;

                this.botaoVerificar = botaoVerificar;

                this.textoCentral = textoCentral;

                this.posicoesOcupadas = posicoesOcupadas;

                this.ordemCorreta = ordemCorreta;

                this.cardsSuperiores = cardsSuperiores;

                this.cardsInferiores = cardsInferiores;

                this.imagensCards = imagensCards;

            }

            preload() {
                
                //Preload dos assets

                this.load.image('timeline', 'src/assets/dia1/miniGame3/Timeline.png');

                this.load.image('3botao', 'src/assets/dia1/miniGame3/button.png');

                this.load.image('3card1', 'src/assets/dia1/miniGame3/card1.png');

                this.load.image('3card2', 'src/assets/dia1/miniGame3/card2.png');

                this.load.image('3card3', 'src/assets/dia1/miniGame3/card3.png');

                this.load.image('3card4', 'src/assets/dia1/miniGame3/card4.png');

                this.load.image('3card5', 'src/assets/dia1/miniGame3/card5.png');

                miniGame3.larguraJogo = 800;

                miniGame3.alturaJogo = 600;

                miniGame3.cardSelecionado = null;

                miniGame3.botaoVerificar = null;

                miniGame3.textoCentral = null;

                miniGame3.posicoesOcupadas = new Map();

                miniGame3.ordemCorreta = ['3card1', '3card2', '3card3', '3card4', '3card5'];

                miniGame3.cardsSuperiores = [];

                miniGame3.cardsInferiores = [];

                miniGame3.imagensCards = ['3card3', '3card5', '3card2', '3card1', '3card4'];
            }

            create() {

                this.cameras.main.setBackgroundColor('#195AB4');

                //Configura os parâmetros da imagem

                let espacamento = miniGame3.larguraJogo / 6;

                let tamanhoCard = 100;

                let yTopo = 100;

                let yBase = miniGame3.alturaJogo - 100;

                this.input.setTopOnly(false);

                miniGame3.cardsSuperiores = [];

                miniGame3.cardsInferiores = [];

                miniGame3.posicoesOcupadas.clear();

                // Texto inicial no centro da tela

                miniGame3.textoCentral = this.add.text(miniGame3.larguraJogo / 2, miniGame3.alturaJogo / 2, 'Organize os cards superiores na ordem correta!', {

                    fontSize: '24px',

                    fill: '#fff',

                    backgroundColor: '#000',

                    padding: { left: 10, right: 10, top: 5, bottom: 5 }

                }).setOrigin(0.5);

                // Criar os cards superiores

                for (let i = 0; i < 5; i++) {

                    let card = this.add.image((i + 1) * espacamento, yTopo, miniGame3.imagensCards[i])

                        .setOrigin(0.5)

                        .setInteractive()

                        .setDepth(2)

                        .setScale(0.4);
                        
                    miniGame3.cardsSuperiores.push(card);
                }

                // Criar os espaços inferiores

                for (let i = 1; i <= 5; i++) {

                    let espaco = this.add.rectangle(i * espacamento, yBase, tamanhoCard, tamanhoCard, 0xffffff)

                        .setOrigin(0.5)

                        .setDepth(1)

                        .setInteractive();

                    miniGame3.cardsInferiores.push(espaco);

                    miniGame3.posicoesOcupadas.set(espaco, null);
                }

                let timeline = this.add.image(miniGame3.larguraJogo / 2, miniGame3.alturaJogo * 0.7, 'timeline')

                    .setScale(1.2, 1);

                miniGame3.botaoVerificar = this.add.image(miniGame3.larguraJogo / 2, miniGame3.alturaJogo - 500, '3botao')

                    .setScale(0.5)

                    .setInteractive()

                    .setVisible(false);

                    //Esse botão só aparece após colocar todos os cards na timeline

                    miniGame3.botaoVerificar.on('pointerdown', () => {
                        
                        
                        this.scene.start('fimDoDia1', {

                            cardsSuperiores: miniGame3.cardsSuperiores,

                            ordemCorreta: miniGame3.ordemCorreta,
                            
                        });

                        this.scene.stop('miniGame3');
                        
                    });
                    
                let interacaoBloqueada = false; 

                this.input.on('gameobjectdown', (pointer, gameObject) => {

                    // Se estiver bloqueada a interação, não faz nada

                    if (interacaoBloqueada) {
                        return;
                    }
                
                    //Verifica se um card superior é clicado

                    if (miniGame3.cardsSuperiores.includes(gameObject) && miniGame3.cardSelecionado === null) {

                        // Verifica se o card ainda é interativo

                        if (!gameObject.getData('moved')) {

                            // Se um card não foi selecionado ainda, seleciona o card

                            if (miniGame3.cardSelecionado) {

                            //Restaura a transparência

                            miniGame3.cardSelecionado.setAlpha(1);
                            }

                            miniGame3.cardSelecionado = gameObject;

                            miniGame3.cardSelecionado.setAlpha(0.7); 
                        }
                    }
                
                    // Verifica se um card inferior é clicado

                    else if (miniGame3.cardsInferiores.includes(gameObject)) {

                        // Só permite a interação com os cards inferiores se um card superior foi selecionado

                        if (miniGame3.cardSelecionado !== null && !gameObject.getData('moved') && !miniGame3.posicoesOcupadas.get(gameObject)) {

                            interacaoBloqueada = true; // Bloqueia novas interações até que a animação termine
                
                            let cardAtual = miniGame3.posicoesOcupadas.get(gameObject);
                
                            // Se o espaço inferior já tem um card

                            if (cardAtual) {

                                let posicaoAntiga = { x: miniGame3.cardSelecionado.x, y: miniGame3.cardSelecionado.y };

                                let novoAlvo = { x: gameObject.x, y: gameObject.y };
                
                                // Move o card superior para o espaço inferior

                                this.tweens.add({

                                    targets: miniGame3.cardSelecionado,

                                    x: novoAlvo.x,

                                    y: novoAlvo.y,

                                    duration: 500,

                                    ease: 'Power2',

                                    onComplete: () => {
                                        miniGame3.posicoesOcupadas.set(gameObject, miniGame3.cardSelecionado);

                                        miniGame3.cardSelecionado.setAlpha(1);
                                        
                                        miniGame3.cardSelecionado.setData('moved', true); // Marca o card como movido

                                        miniGame3.cardSelecionado = null; // Reseta a seleção

                                        interacaoBloqueada = false; // Libera novas interações após a animação
                                    }
                                });
                
                                // Move o card que estava no espaço inferior de volta para o topo

                                this.tweens.add({

                                    targets: cardAtual,

                                    x: posicaoAntiga.x,

                                    y: posicaoAntiga.y,

                                    duration: 500,

                                    ease: 'Power2',

                                    onComplete: () => {

                                        miniGame3.posicoesOcupadas.set(miniGame3.cardsInferiores.find(e => e.x === miniGame3.posicaoAntiga.x), cardAtual);
                                    }
                                });
                
                            } 

                            else
                            {
                                // Se o espaço inferior ainda está vazio

                                this.tweens.add({

                                    targets: miniGame3.cardSelecionado,

                                    x: gameObject.x,

                                    y: gameObject.y,

                                    duration: 500,

                                    ease: 'Power2',

                                    onComplete: () => 
                                    {
                                        miniGame3.posicoesOcupadas.set(gameObject, miniGame3.cardSelecionado);

                                        miniGame3.cardSelecionado.setAlpha(1);
                                        
                                        miniGame3.cardSelecionado.setData('moved', true); //Marca o card como movido
                                        
                                        miniGame3.cardSelecionado = null; //Marca que nenhum card está selecionado no momento
                                        
                                        interacaoBloqueada = false; // A interação deixa de ser bloqueada

                                        verificaEncaixes();
                                    }
                                });
                            }                        
                        } 
                    }
                });
                
                //Função que verifica se todos os cards já foram encaixados

                function verificaEncaixes() {

                    let totalEncaixados = [...miniGame3.posicoesOcupadas.values()].filter(Boolean).length;

                    miniGame3.botaoVerificar.setVisible(totalEncaixados === 5);

                    if (totalEncaixados === 5) {

                        //Caso todos os cards já tenham sido encaixados, o texto com as instruções desapareçe

                        miniGame3.textoCentral.setVisible(false);
                    }
                }
            }
        }

        class fimDoMinigame3 extends Phaser.Scene {

            constructor() {

                super({ key: 'fimDoMinigame3' });
            }
        
            init(data) {

                //Chama as informações sobre os cards posicionados

                this.cardsSuperiores = data.cardsSuperiores;

                this.ordemCorreta = data.ordemCorreta; // Salva a ordem correta
            }
        
            create() {

                this.cameras.main.setBackgroundColor('#195A4B');
            
                this.add.text(400, 200, 'Resultado', { fontSize: '40px', fill: '#fff' })

                    .setOrigin(0.5);
                
                //Chama a função do cálculo de acertos e erros

                let { acertos, erros } = this.contaErros();
            
                //Aumenta a pontuação em 100 para cada acerto e diminui 50 para cada erro

                let pontuacaoRodada = (acertos * 100) - (erros * 50);
            
                //Atualiza a pontuação total

                pontuacao += pontuacaoRodada;
            
                //Exibe a pontuação no jogo

                this.add.text(400, 350, `Pontuação: ${Math.round(pontuacao)}`, { fontSize: '30px', fill: '#fff' })

                    .setOrigin(0.5);

                //Adiciona o botão para voltar à hub
            
                let botaoVoltar = this.add.text(400, 400, 'Voltar', { fontSize: '30px', fill: '#fff', backgroundColor: '#333' })

                    .setOrigin(0.5)

                    .setPadding(10)

                    .setInteractive();

                    //Muda de volta para a cena da hub
            
                    botaoVoltar.on('pointerdown', () => {

                        minigame3Jogado = true;

                        this.scene.restart('hub');  
                    
                        this.scene.stop('fimDoMinigame3');
                    });
                    
                    
            }
            

            //Compara as respostas do usuário com as respostas esperadas, devolve o número de acertos e erros
        
            contaErros() {
                let ordemAtual = miniGame3.cardsSuperiores.slice().sort((a, b) => a.x - b.x).map(card => card.texture.key);

                let acertos = 0;

                let erros = 0;
            
                // Compara a ordem atual com a ordem correta

                ordemAtual.forEach((card, index) => {

                    if (card === miniGame3.ordemCorreta[index]) 
                    {
                        acertos++;
                    } 

                    else 
                    {
                        erros++;
                    }
                });
            
                return { acertos, erros };
            }
            
        }
        
