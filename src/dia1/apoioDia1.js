let minigameAtual;

class apoioDia1 extends Phaser.Scene {

    constructor() {
        super("apoioDia1");
        // Esse valor servirá para armazenar qual página do tutorial o player está lendo
        this.paginaAtiva = 0;
        // Arrays para o armazenamento dos tutoriais
        this.tutoriaisMinigame1 = [
            `Nessa tarefa, você precisará aprender um pouco de fundos abertos e fechados.

Seu objetivo é simples:  ---> definir se a descrição apresentada é de um fundo aberto ou de um fundo fechado. <---

Para isso, você deve arrastar o card que aparecerá na sua tela para o lado correto. Na esquerda estará a gaveta dos cards abertos e na direita a dos fechados.

Segue em anexo os materiais necessários para a tarefa.

Boa sorte!
`,
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
        this.tutoriaisMinigame2 = [
            `Nessa tarefa, você precisará aprender um pouco de matemática financeira.

Seu objetivo é simples:  ---> descobrir o saldo final das contas bancárias apresentadas. <---

Para isso, basta usar a legenda no lado esquerdo da tela para analisar as atividades da conta, fazer os cálculos necessários e escolher a alternativa que corresponde ao saldo final da conta clicando nela com o mouse. 

Segue em anexo os materiais necessários para a tarefa.

Boa sorte!
            `,

            `A seguir estão os conceitos que serão utilizados nesta tarefa, juntamente com suas respectivas siglas.

Mas não se preocupe! Você não precisará decorar as siglas, apenas entender os efeitos de cada uma.

Durante todo o minigame, haverá uma legenda para te auxiliar. Além disso, fique à vontade para usar uma calculadora, caso considere necessário.
            `,

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
        this.tutoriaisMinigame3 = [
            `Nessa tarefa você precisará aprender sobre o processo de resgate de fundos.

Seu objetivo é:  ---> organizar a linha do tempo de acontecimentos sobre o processo. <---
Para isso, clique e arraste um card para sua posição na linha do tempo. Atenção! Após ser solto em qualquer posição, o card não poderá ser movido novamente.

Segue em anexo os materiais necessários para a tarefa.

Boa sorte!
`,
            `O processo de resgate se inicia com uma solicitação do cliente.

Esse pedido chega para o gestor como forma do prazo de cotização, um período necessário para que a ordem de venda de cota seja registrada e começe a render.

Após isso, ocorre o prazo de liquidação, que se trata do tempo que leva para a conclusão da transação, disponibilizando o dinheiro para o cliente.

Por fim, ele pode receber o valor resultante.`
        ];
        // Obs: minigame 10 é o miniboss do dia 1. Apenas utilizamos essa nomenclatura por simplicidade do código
        this.tutoriaisMinigame10 = [
            `Belo trabalho resolvendo as tarefas! No entanto, ainda tenho uma última coisa para você resolver hoje.

Como parte da política da empresa, preciso avaliar seu conhecimento sobre os principais assuntos vistos neste dia.

Para isso, preparei um quiz com algumas perguntas.

Basta utilizar o botão esquerdo do mouse para selecionar a resposta que julgar correta.

Boa sorte!`
        ];
    }

    init(data) {
        // Se tivermos um minigame atual salvo, usamos esse valor
        if (data.minigameAtual) {

            this.minigameAtual = data.minigameAtual;
        }
    }

    preload() {
        //Preload dos assets

        this.load.image("imailFundo", "src/assets/materiais_apoio/imailFundo.png");

        this.load.image("imailFundoCelebracao", "src/assets/materiais_apoio/imailFundoCelebracao.png");

        this.load.image("botaoProximo", "src/assets/materiais_apoio/botaoProximo.png");

        this.load.image("botaoAnterior", "src/assets/materiais_apoio/botaoAnterior.png");

        this.load.image("botaoDesistir", "src/assets/materiais_apoio/botaoDesistir.png");

        this.load.image("botaoComecar", "src/assets/materiais_apoio/botaoComecar.png");
    }

    create() {
        //Carrega o fundo e os botões utilizados

        if (this.minigameAtual < 10) {
            this.imailFundo = this.add.image(400, 300, "imailFundo");
        } else {
            this.imailFundo = this.add.image(400, 300, "imailFundoCelebracao");
        }


        this.textoTutorial = this.add.text(185, 95, this['tutoriaisMinigame' + this.minigameAtual][this.paginaAtiva], {
            fontFamily: "pixelArt",
            color: 0x324891
        }).setWordWrapWidth(600);

        // Caso haja apenas um tutorial, começar com botaoComecar
        if (this.paginaAtiva === this['tutoriaisMinigame' + this.minigameAtual].length - 1) {
            this.botaoProximo = this.add.image(660, 555, "botaoComecar")
                .setInteractive();
        } else {
            this.botaoProximo = this.add.image(660, 555, "botaoProximo")
                .setInteractive();
        }

        this.botaoAnterior = this.add.image(300, 555, "botaoAnterior")
            .setVisible(false)
            .setInteractive();

        this.botaoDesistir = this.add.image(750, 40, "botaoDesistir")
            .setInteractive();

        this.atrasoClick = false;

        //Verifica se botão próximo foi pressionado

        this.botaoProximo.on("pointerdown", (pointer) => {
            if (!this.atrasoClick) {
                this.paginaAtiva++; // 'j' serve como uma forma de armazenar qual tutorial o player está lendo
                this.textoTutorial.setText(this['tutoriaisMinigame' + this.minigameAtual][this.paginaAtiva]);

                this.atrasoClick = true; // Impede cliques repetidos

                setTimeout(() => {
                    this.atrasoClick = false; // Libera cliques após 0,5 segundos
                }, 500);

                // Caso não haja tutoriais anteriores, botão anterior é oculto, caso haja, é exposto
                if (this.paginaAtiva > 0) {
                    this.botaoAnterior.setVisible(true).setInteractive(true);
                } else {
                    this.botaoAnterior.setVisible(false).setInteractive(false);
                }

                // Caso não haja mais tutoriais após o atual, apresentar botão começar
                if (this.paginaAtiva === this['tutoriaisMinigame' + this.minigameAtual].length - 1) {
                    this.botaoProximo.setTexture('botaoComecar');
                }

                // Caso o player clique no botão começar, o minigame começa
                if (this.paginaAtiva === this['tutoriaisMinigame' + this.minigameAtual].length) {
                    this.paginaAtiva = 0;
                    this.textoTutorial.setText(this['tutoriaisMinigame' + this.minigameAtual][0]);
                    if (this.minigameAtual < 10) {
                        game.scene.start("miniGame" + this.minigameAtual);
                    } else {
                        game.scene.start("miniBossDia" + (this.minigameAtual) / 10);
                    }
                    game.scene.stop("apoioDia1");
                }
            }
        });

        this.botaoAnterior.on("pointerdown", (pointer) => {
            if (!this.atrasoClick && this.paginaAtiva > 0) {
                this.paginaAtiva--; // 'j' serve como uma forma de armazenar qual tutorial o player está lendo
                this.textoTutorial.setText(this['tutoriaisMinigame' + this.minigameAtual][this.paginaAtiva]);
                this.atrasoClick = true; // Impede cliques repetidos

                setTimeout(() => {
                    this.atrasoClick = false; // Libera cliques após 0,5 segundos
                }, 500);

                // Caso não haja tutoriais anteriores, botão anterior é oculto
                if (this.paginaAtiva === 0) {
                    this.botaoAnterior.setVisible(false).setInteractive(false);
                }

                // Reabilita o botão próximo caso o player vá até o final e volte
                if (this.paginaAtiva < this['tutoriaisMinigame' + this.minigameAtual].length - 1) {
                    this.botaoProximo.setTexture('botaoProximo').setVisible(true).setInteractive(true);
                }
            }
        });

        this.botaoDesistir.on("pointerdown", (pointer) => {
            this.paginaAtiva = 0;
            this.textoTutorial.setText(this['tutoriaisMinigame' + this.minigameAtual][0]);
            game.scene.wake("hub");
            game.scene.stop("apoioDia1");
        });
    }
}
