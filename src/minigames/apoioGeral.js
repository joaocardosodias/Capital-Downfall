class apoioGeral extends Phaser.Scene {

    constructor() {
        super("apoioGeral");
        this.diaAtual;
        // Esse valor servirá para armazenar qual página do apoio o player está lendo
        this.paginaAtiva = 0;
        // Esse valor servirá para armazenar qual apoio o player está lendo
        this.apoioEscolhido = 1; //minigame 1 como default
        // Arrays para o armazenamento dos apoios
        this.apoioMinigame1 = [
            `Fundo Aberto:

- Liquidez:     Você pode comprar e vender suas cotas a qualquer momento.
- Resgates:     O investidor pode retirar o dinheiro sempre que precisar, geralmente em poucos dias.
- Novas Aplicações:     É possível adicionar mais dinheiro ao fundo quando quiser.
- Objetivo:     Ideal para quem busca flexibilidade e acesso rápido ao investimento.
- Exemplo:     Fundos de renda fixa ou ações, onde você pode entrar e sair quando quiser.
`,
            `Fundo Fechado:

- Liquidez:     Você não pode vender as cotas a qualquer momento. Só pode resgatar no final do período determinado ou em datas específicas.
- Resgates:     O resgate do dinheiro só é permitido após um prazo fixo, como 3, 5 ou 10 anos.
- Novas Aplicações:     Não é possível fazer novas aplicações durante o período de fechamento do fundo.
- Objetivo:     Focado em quem está disposto a manter o investimento por um longo período sem acesso imediato ao dinheiro.
- Exemplo:     Fundos imobiliários ou de private equity, onde o investidor deve aguardar até o final do período de investimento.
`,
            `Diferença Principal:

Fundo Aberto:     Acessibilidade e flexibilidade (pode entrar e sair do fundo quando quiser).

Fundo Fechado:     Compromisso a longo prazo (não pode acessar o dinheiro até o final do prazo estipulado).
`
        ];
        this.apoioMinigame2 = [
            `- Depósito (D):     Adiciona dinheiro à conta.

- Saque (S):     Retira dinheiro da conta.

- Transferência recebida (TR):     Dinheiro entra na conta vindo de outra pessoa.

- Transferência enviada (TE):     Dinheiro é enviado para outra conta.

- Investimento (I):     Parte do dinheiro é investida, saindo da conta principal.

- Resgate de Investimento (RI):     Retorno de um investimento, adicionando dinheiro à conta.
            `,

            `- Juros sobre Investimentos (JI):     Quando um valor é investido, ele pode crescer ao longo do tempo devido à incidência de juros compostos. A fórmula para calcular o rendimento de um investimento a uma certa taxa de juros em função do tempo é: 

M = C × (1 + i)¥

Em que:
M = Montante, ou seja, valor total que o investidor recebe
C = Capital aplicado
i = taxa de juros
t = tempo de aplicação do investimento
            `,

            `Exemplo prático:     Imagine que você investe R$ 1.000,00 em uma aplicação financeira que rende 5% ao mês. Isso significa que, ao final de um mês, seu investimento terá aumentado em 5%.

Cálculo: 
M = C × (1 + i)¥
M = 1.000 × (1+0,05)² = 
1.000 × 1,05 × 1,05 =
1.050 × 1,05 = 
1.102,50

Esse crescimento ocorre devido aos juros compostos, onde os rendimentos de um mês são aplicados sobre o saldo do mês anterior.
            `,

            `- Depreciação de Investimento (DI):     Nem todo investimento gera lucro. Em alguns casos, ele pode perder valor devido a fatores como crise econômica, mudanças no mercado ou desvalorização do ativo. Esse fenômeno é chamado de depreciação. A fórmula é a mesma do juros, mas a taxa é negativa:

DI = valor × (1 - taxa)¥
            `,

            `Se você investiu R$ 1.000,00 em um fundo de ações e ele sofreu uma queda de 10%, isso significa que o valor do investimento diminuiu.

Cálculo:

DI = Valor × (1 - taxa)
1000 × (1 - 0,10) = 
1000 × 0,90 = 
900

Agora, seu investimento vale apenas R$ 900,00, ou seja, perdeu R$ 100,00 de valor.
            `
        ];
        this.apoioMinigame3 = [
            `O processo de resgate se inicia com uma solicitação do cliente.

Esse pedido chega para o gestor como forma do prazo de cotização, um período necessário para que a ordem de venda de cota seja registrada e começe a render.

Após isso, ocorre o prazo de liquidação, que se trata do tempo que leva para a conclusão da transação, disponibilizando o dinheiro para o cliente.

Por fim, ele pode receber o valor resultante.
`
        ];
        this.apoioMinigame4 = [
            `Os impostos em fundos de investimento são tributos cobrados sobre os rendimentos obtidos pelos investidores, variando conforme o tipo de fundo. Os principais são:

- Imposto de Renda (IR)     aplicado sobre o lucro no momento do resgate ou venda de cotas

- Come-Cotas     uma antecipação semestral do IR em fundos de renda fixa e multimercado

- IOF     aplicado apenas em resgates realizados em menos de 30 dias, com uma alíquota regressiva, começando em 96% no primeiro dia e reduzindo gradualmente até 0% no 30º dia. 
            `,
            `É interessante saber que:

- IR em fundos de ações têm alíquota fixa de 15% sobre o lucro,

- IR em fundos imobiliários (FIIs) cobram 20% sobre o ganho de capital na venda de cotas.

- O Come-Cotas é cobrado com alíquota de 20% para fundos de curto prazo e 15% para fundos de longo prazo, convertendo o imposto em cotas do próprio fundo. 

- IOF e Come-Cotas não estão presentes em fundos de ação e em fundos imobiliários, apenas em fundos de rendas fixas e de multimercado. 
            `,
            `Fórmulas para utilizar:

Imposto = Rendimento × Alíquota de IR

Rendimento = Valor Final - Valor Investido

Valor Final =Valor Investido × (1 + r × t) => para juros simples.

Valor Final =Valor Investido × (1 + r)¥ => para juros compostos.
            `
        ];
        this.apoioMinigame5 = [
            `Aqui está o que cada um desses termos representa no contexto financeiro:

- Hedge:     Estratégia de proteção contra riscos financeiros, reduzindo perdas com derivativos como contratos futuros e opções.

- TIR (Taxa Interna de Retorno):     Indicador que mede a rentabilidade de um investimento, calculando a taxa que iguala entradas e saídas de caixa.

- IBOV (Índice Bovespa):     Principal índice da B3, composto pelas ações mais negociadas, servindo como referência para o mercado acionário brasileiro.
            `,
            `- FIP (Fundo de Investimento em Participações):     Fundo de private equity que investe em empresas privadas, adquirindo participação acionária e influência na gestão.

- D+H:     Prazo de liquidação financeira de um ativo, indicando em quantos dias úteis o dinheiro ou ativo estará disponível.

- Swap:     Contrato derivativo onde duas partes trocam fluxos financeiros baseados em diferentes índices, como juros, câmbio ou inflação.
`
        ];
        this.apoioMinigame6 = [
            `O alinhamento dos funcionários com os valores da empresa fortalece a cultura organizacional, aumenta o engajamento e melhora a colaboração, impactando diretamente o sucesso do negócio. Por isso, é essencial que cada colaborador esteja alinhado à nossa cultura, que valoriza:

- Empreendedorismo e inovação: busca por soluções ágeis e novos aprendizados;
- Liderança: possui uma boa tomada de decisões e motiva a equipe;
- Trabalho em equipe: compartilha conhecimento e respeita as diferenças;
- Proatividade: trabalha com responsabilidade e intensidade.
            `
        ];
    }

    init(data) {

        // Se tivermos um dia solvo, usamos ele
        if (data.diaAtual) {

            this.diaAtual = data.diaAtual;
        }
    }

    preload() {
        //Preload dos assets

        this.load.image("imailFundoGeral", "src/assets/materiais_apoio/SlickGeral.png");

        for (let i = 1; i <= 6; i++) {
            this.load.image("botaoMinigame" + i, "src/assets/materiais_apoio/botaoMinigame" + i + ".png");
            this.load.image("botaoMinigame" + i + "Selecionado", "src/assets/materiais_apoio/botaoMinigame" + i + "Selecionado.png");
        }

        this.load.image("botaoListaTermos", "src/assets/materiais_apoio/botaoListaTermos.png");

        this.load.image("botaoProximo", "src/assets/materiais_apoio/botaoProximo.png");

        this.load.image("botaoAnterior", "src/assets/materiais_apoio/botaoAnterior.png");

        this.load.image("botaoDesistir", "src/assets/materiais_apoio/botaoDesistir.png");

        this.load.image("selecao", "src/assets/materiais_apoio/selecao.png");
        this.load.image("selecaoDesistir", "src/assets/materiais_apoio/selecaoDesistir.png");
    }

    create() {
        //Carrega o fundo e os botões utilizados

        this.imailFundoGeral = this.add.image(400, 300, "imailFundoGeral");


        this.textoApoio = this.add.text(185, 95, this['apoioMinigame' + this.apoioEscolhido][this.paginaAtiva], {
            fontFamily: "pixelArt",
            color: '#324891'
        }).setWordWrapWidth(600);

        // Caso haja apenas um tutorial, começar com botaoComecar
        if (this.paginaAtiva === this['apoioMinigame' + this.apoioEscolhido].length - 1) {
            this.botaoProximo = this.add.image(660, 555, "botaoProximo")
                .setInteractive().setVisible(false);
        } else {
            this.botaoProximo = this.add.image(660, 555, "botaoProximo")
                .setInteractive();
        }

        this.botaoAnterior = this.add.image(300, 555, "botaoAnterior")
            .setVisible(false)
            .setInteractive();

        this.botaoDesistir = this.add.image(750, 40, "botaoDesistir")
            .setInteractive();

        // Ainda não funciona, pois não temos uma lista pronta.
        this.botaoListaTermos = this.add.image(82, 492, "botaoListaTermos")
            .setInteractive();

        // Para economizar código
        this.minigames = [
            { botao: this.botaoMinigame1, posicaoX: 69, apoio: this.apoioMinigame1 },
            { botao: this.botaoMinigame2, posicaoX: 174, apoio: this.apoioMinigame2 },
            { botao: this.botaoMinigame3, posicaoX: 290, apoio: this.apoioMinigame3 },
            { botao: this.botaoMinigame4, posicaoX: 413, apoio: this.apoioMinigame4 },
            { botao: this.botaoMinigame5, posicaoX: 522, apoio: this.apoioMinigame5 },
            { botao: this.botaoMinigame6, posicaoX: 630, apoio: this.apoioMinigame6 },
        ];

        //Laço for que cria os botoes superiores e suas funcionalidades
        for (let i = 0; i < 6; i++) {
            this.minigames[i].botao = this.add.image(this.minigames[i].posicaoX, 46, "botaoMinigame" + (i + 1))
                .setInteractive();

            this.minigames[i].botao.on("pointerdown", (pointer) => {
                this.apoioEscolhido = (i + 1);
                this.paginaAtiva = 0;
                this.textoApoio.setText(this['apoioMinigame' + (i + 1)][0]);

                // Reset das texturas de todos os botões superiores
                for (let j = 0; j < 6; j++) {
                    this.minigames[j].botao.setTexture('botaoMinigame' + (j + 1))
                };
                // Apenas o botão selecionado fica com sua textura diferente
                this.minigames[i].botao.setTexture('botaoMinigame' + (i + 1) + 'Selecionado');

                // Retornando ao estado normal
                this.botaoAnterior.setVisible(false);
                this.botaoProximo.setVisible(true);

                if (this.minigames[i].apoio.length === 1) {
                    this.botaoProximo.setVisible(false);
                }
            });
        }

        this.minigames[0].botao.setTexture('botaoMinigame1Selecionado') //Minigame 1 inicia selecionado


        this.atrasoClick = false;
        //Verifica se botão próximo foi pressionado

        this.botaoProximo.on("pointerdown", (pointer) => {
            if (!this.atrasoClick) {
                this.paginaAtiva++;
                this.textoApoio.setText(this['apoioMinigame' + this.apoioEscolhido][this.paginaAtiva]);

                this.atrasoClick = true; // Impede cliques repetidos

                setTimeout(() => {
                    this.atrasoClick = false; // Libera cliques após 0,1 segundo
                }, 100); // Atraso é menor aqui no geral, pois nenhuma página é necessária para a progressão

                this.botaoAnterior.setVisible(true).setInteractive(true);

                // Caso não haja mais apoios após o atual, ocultar botão próximo
                if (this.paginaAtiva === this['apoioMinigame' + this.apoioEscolhido].length - 1) {
                    this.botaoProximo.setVisible(false)
                }
            }
        });

        this.botaoAnterior.on("pointerdown", (pointer) => {
            if (!this.atrasoClick && this.paginaAtiva > 0) {
                this.paginaAtiva--;
                this.textoApoio.setText(this['apoioMinigame' + this.apoioEscolhido][this.paginaAtiva]);
                this.atrasoClick = true; // Impede cliques repetidos

                setTimeout(() => {
                    this.atrasoClick = false; // Libera cliques após 0,1 segundo
                }, 100);

                // Caso não haja apoios anteriores, botão anterior é oculto
                if (this.paginaAtiva === 0) {
                    this.botaoAnterior.setVisible(false).setInteractive(false);
                }

                // Reabilita o botão próximo caso o player vá até o final e volte
                if (this.paginaAtiva < this['apoioMinigame' + this.apoioEscolhido].length - 1) {
                    this.botaoProximo.setVisible(true).setInteractive(true);
                }
            }
        });

        this.botaoDesistir.on("pointerdown", (pointer) => {
            this.paginaAtiva = 0;
            this.apoioEscolhido = 1; //minigame 1 como default
            this.textoApoio.setText(this['apoioMinigame' + this.apoioEscolhido][0]);
            if (this.diaAtual === 1) {
                game.scene.wake("hub");
            } else if (this.diaAtual === 2) {
                game.scene.wake("hub2");
            } else if (this.diaAtual === 3) {
                game.scene.wake("hubFinal");
            }
            game.scene.stop("apoioGeral");
        });

        // Adição do efeito de pointer over nos botões
        this.selecao = this.add.image(0, 0, 'selecao').setVisible(false).setDepth(100);
        this.selecaoDesistir = this.add.image(0, 0, 'selecaoDesistir').setVisible(false).setDepth(100);

        this.botaoProximo.on('pointerover', () => {
            this.selecao.setPosition(660, 555).setVisible(true);
        });
        this.botaoProximo.on('pointerout', () => {
            this.selecao.setPosition(0, 0).setVisible(false);
        });

        this.botaoAnterior.on('pointerover', () => {
            this.selecao.setPosition(300, 555).setVisible(true);
        });
        this.botaoAnterior.on('pointerout', () => {
            this.selecao.setPosition(0, 0).setVisible(false);
        });

        this.botaoDesistir.on('pointerover', () => {
            this.selecaoDesistir.setPosition(750, 40).setVisible(true);
        });
        this.botaoDesistir.on('pointerout', () => {
            this.selecaoDesistir.setPosition(0, 0).setVisible(false);
        });

        console.log(this.diaAtual)
    }
}
