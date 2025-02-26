  
        class miniGame3 extends Phaser.Scene {
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
                


                this.load.image('timeline', 'assets/miniGame3/Timeline.png');
                this.load.image('3botao', 'assets/miniGame3/button.png');
                this.load.image('3card1', 'assets/miniGame3/card1.png');
                this.load.image('3card2', 'assets/miniGame3/card2.png');
                this.load.image('3card3', 'assets/miniGame3/card3.png');
                this.load.image('3card4', 'assets/miniGame3/card4.png');
                this.load.image('3card5', 'assets/miniGame3/card5.png');

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

                this.cameras.main.setBackgroundColor('#195A4B');

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
                    .setScale(1.5, 1);

                miniGame3.botaoVerificar = this.add.image(miniGame3.larguraJogo / 2, miniGame3.alturaJogo - 500, '3botao')
                    .setScale(0.5)
                    .setInteractive()
                    .setVisible(false);

                    miniGame3.botaoVerificar.on('pointerdown', () => {
                        // Passando os dados para a próxima cena corretamente

                        
                        
                        this.scene.start('fimDoDia1', {
                            cardsSuperiores: miniGame3.cardsSuperiores,
                            ordemCorreta: miniGame3.ordemCorreta, // Se você precisar da ordem correta também
                            // Adicione outros dados se necessário
                        });

                        this.scene.stop('miniGame3');
                        
                    });
                    

                // Evento de clique nos cards
                let interacaoBloqueada = false; // Variável de controle para bloquear interações temporariamente

                this.input.on('gameobjectdown', (pointer, gameObject) => {
                    // Se estiver bloqueada a interação, não faz nada
                    if (interacaoBloqueada) {
                        return;
                    }
                
                    // Quando um card superior é clicado
                    if (miniGame3.cardsSuperiores.includes(gameObject) && miniGame3.cardSelecionado === null) {
                        // Verifica se o card ainda é interativo
                        if (!gameObject.getData('moved')) {
                            // Se um card não foi selecionado ainda, seleciona o card
                            if (miniGame3.cardSelecionado) {
                                miniGame3.cardSelecionado.setAlpha(1); // Restaura a transparência do card anterior
                            }
                            miniGame3.cardSelecionado = gameObject;
                            miniGame3.cardSelecionado.setAlpha(0.7); // Dá transparência ao card selecionado
                        }
                    }
                
                    // Quando um card inferior é clicado
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
                                        
                                        miniGame3.cardSelecionado.setData('moved', true); 
                                        
                                        miniGame3.cardSelecionado = null; 
                                        
                                        interacaoBloqueada = false; 

                                        verificaEncaixes();
                                    }
                                });
                            }                        
                        } 
                    }
                });
                
                

                function verificaEncaixes() {
                    let totalEncaixados = [...miniGame3.posicoesOcupadas.values()].filter(Boolean).length;
                    miniGame3.botaoVerificar.setVisible(totalEncaixados === 5);

                    if (totalEncaixados === 5) {
                        miniGame3.textoCentral.setVisible(false);
                    }
                }
            }
        }

        class fimDoDia1 extends Phaser.Scene {
            constructor() {
                super({ key: 'fimDoDia1' });
            }
        
            init(data) {
                // Agora estamos recebendo os dados corretos
                this.cardsSuperiores = data.cardsSuperiores;
                this.ordemCorreta = data.ordemCorreta; // Salva a ordem correta
            }
        
            create() {
                this.cameras.main.setBackgroundColor('#195A4B');
            
                this.add.text(400, 200, 'Resultado', { fontSize: '40px', fill: '#fff' })
                    .setOrigin(0.5);
                
                // Obter os acertos e erros
                let { acertos, erros } = this.contaErros();
            
                // Aumenta a pontuação em 100 para cada acerto e diminui 50 para cada erro
                let pontuacaoRodada = (acertos * 100) - (erros * 50);
            
                // Atualiza a pontuação total
                pontuacao += pontuacaoRodada;
            
                // Exibe a pontuação no jogo
                this.add.text(400, 350, `Pontuação: ${Math.round(pontuacao)}`, { fontSize: '30px', fill: '#fff' })
                    .setOrigin(0.5);
            
                let botaoVoltar = this.add.text(400, 400, 'Voltar', { fontSize: '30px', fill: '#fff', backgroundColor: '#333' })
                    .setOrigin(0.5)
                    .setPadding(10)
                    .setInteractive();
            
                    botaoVoltar.on('pointerdown', () => {


                        minigame3Jogado = true;

                        this.scene.restart('hub');  
                    
                        this.scene.stop('fimDoDia1');
                    });
                    
                    
            }
            
        
            contaErros() {
                let ordemAtual = miniGame3.cardsSuperiores.slice().sort((a, b) => a.x - b.x).map(card => card.texture.key);
                let acertos = 0;
                let erros = 0;
            
                // Compara a ordem atual com a ordem correta
                ordemAtual.forEach((card, index) => {
                    if (card === miniGame3.ordemCorreta[index]) {
                        acertos++;
                    } else {
                        erros++;
                    }
                });
            
                return { acertos, erros };
            }
            
        }
        