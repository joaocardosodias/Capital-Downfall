class miniBossDia1 extends Phaser.Scene {
  constructor() {
    super("miniBossDia1"); // Nome da cena
    this.pontuacaoB1 = 0;
    // Declaração de algumas das variáveis que serão usadas no código
    this.perguntaAtual = 0;
    // Lista que vai armazenar as perguntas selecionadas
    this.selectedQuestions = [];
    // Array que armazena as perguntas e as alternativas corretas para cada uma delas
    this.correctAnswers = {
      1: "C",
      2: "B",
      3: "D",
      4: "D",
      5: "A",
      6: "A",
      7: "C",
      8: "B",
      9: "B",
    };

    this.perguntas = [
      {
        pergunta: "Qual das seguintes afirmações sobre fundos fechados é verdadeira?",
        respostas: [
          "a) Fundos fechados permitem resgates diários",
          "b) Fundos fechados não podem emitir novas cotas após sua criação",
          "c) Fundos fechados geralmente possuem prazo determinado para encerramento",
          "d) Fundos fechados são mais líquidos do que fundos abertos",
        ],
        letraCorreta: "c",
        respostaCorreta: "Fundos fechados geralmente possuem prazo determinado para encerramento",
        feedback: "Os fundos fechados costumam ter um prazo de duração definido, ao contrário dos fundos abertos, que podem ser resgatados a qualquer momento. No caso dos fundos fechados, após o término do prazo, o fundo é liquidado e os recursos são distribuídos entre os investidores.",
      },
      {
        pergunta: "Qual é a principal diferença entre um fundo de investimento aberto e um fechado?",
        respostas: [
          "a) O fundo fechado permite resgates a qualquer momento",
          "b) O fundo aberto permite a compra de cotas a qualquer momento",
          "c) O fundo aberto exige um valor mínimo de investimento inicial",
          "d) O fundo fechado é mais rentável que o fundo aberto",
        ],
        letraCorreta: "b",
        respostaCorreta: "O fundo aberto permite a compra de cotas a qualquer momento",
        feedback: "Nos fundos abertos, os investidores podem comprar e vender cotas a qualquer momento, enquanto os fundos fechados têm um período determinado para a compra e venda de cotas, sendo que resgates geralmente só podem ser feitos no final do período de duração do fundo.",
      },
      {
        pergunta: "Qual fundo é mais indicado para quem busca acesso rápido ao dinheiro investido?",
        respostas: [
          "a) Fundo fechado",
          "b) Depende do gestor",
          "c) Nenhum, ambos têm baixa liquidez",
          "d) Fundo aberto",
        ],
        letraCorreta: "d",
        respostaCorreta: "Fundo aberto",
        feedback: "Os fundos abertos são mais indicados para quem busca ter acesso rápido ao dinheiro, pois permitem resgates a qualquer momento, de acordo com a política de liquidez do fundo. Já os fundos fechados possuem prazos definidos e, geralmente, exigem que o investidor venda suas cotas no mercado secundário para obter liquidez.",
      },
      {
        pergunta: "Em qual momento o investidor recebe o valor resgatado em sua conta?",
        respostas: [
          "a) Imediatamente após solicitar o resgate",
          "b) Após o investidor passar pela análise de risco",
          "c) Após a venda das cotas no mercado secundário",
          "d) Após o fundo liquidar os ativos e calcular o valor do resgate",
        ],
        letraCorreta: "d",
        respostaCorreta: "Após o fundo liquidar os ativos e calcular o valor do resgate",
        feedback: "Quando um investidor solicita o resgate de suas cotas, o fundo precisa vender os ativos. Após a liquidação dos ativos, o valor correspondente ao resgate é calculado com base no valor da cota no momento da solicitação. Portanto, o pagamento não é imediato, pois depende dessa liquidação e do cálculo do valor do resgate.",
      },
      {
        pergunta: "Em fundos abertos, a cotização no resgate define:",
        respostas: [
          "a) O valor das cotas resgatadas",
          "b) A data de pagamento do resgate",
          "c) O número máximo de resgates diários",
          "d) O tipo de ativo negociado",
        ],
        letraCorreta: "a",
        respostaCorreta: "O valor das cotas resgatadas",
        feedback: "Em fundos abertos, a cotização no resgate é o processo pelo qual o valor das cotas é calculado no momento do pedido de resgate. Esse valor é baseado no patrimônio líquido do fundo na data de solicitação. Ou seja, o valor que o investidor receberá depende do valor das cotas naquele momento, que é determinado pela cotização.",
      },
      {
        pergunta: "O que determina o prazo de liquidação de um fundo de investimento?",
        respostas: [
          "a) O período necessário para o fundo processar e pagar o resgate ao investidor",
          "b) O tempo que o gestor leva para analisar o resgate",
          "c) O prazo mínimo que o investidor deve manter o dinheiro aplicado",
          "d) O tempo que as cotas levam para serem negociadas no mercado secundário",
        ],
        letraCorreta: "a",
        respostaCorreta: "O período necessário para o fundo processar e pagar o resgate ao investidor",
        feedback: "O prazo de liquidação é o tempo que o fundo precisa para processar o resgate das cotas e transferir o dinheiro para o investidor. Esse prazo varia conforme o tipo de fundo e os ativos que ele possui. Fundos que investem em ativos mais líquidos, como títulos públicos, costumam ter liquidação mais rápida, enquanto os outros podem levar mais tempo.",
      },
      {
        pergunta: "Clara investiu R$ 3.000,00 em um fundo de ações, mas, após uma crise no mercado, seu investimento sofreu uma desvalorização de 15%. Quanto vale o investimento agora?",
        respostas: [
          "a) R$ 2.750,00",
          "b) R$ 2.850,00",
          "c) R$ 2.550,00",
          "d) R$ 2.900,00",
        ],
        letraCorreta: "c",
        respostaCorreta: "R$ 2.550,00",
        feedback: `DI = Valor × (1 - Taxa)¥

Substituindo os valores na fórmula:
 
DI = 3000 × (1 - 0,15)¡
DI = 3000 × 0,85 
DI = 2550`,
      },
      {
        pergunta: "Você investiu R$ 2.000,00 em uma aplicação que rende 5% ao mês. Após 2 meses, qual será o montante final do seu investimento?",
        respostas: [
          "a) R$ 2.050,00",
          "b) R$ 2.205,00",
          "c) R$ 2.100,00",
          "d) R$ 2.250,00",
        ],
        letraCorreta: "b",
        respostaCorreta: "R$ 2.205,00",
        feedback: `Montante = Capital aplicado × (1 + Taxa)¥
        
Substituindo os valores na fórmula:

M = 2000 × (1 + 0,05)²
M = 2000 × (1,05)²
M = 2000 × 1,1025
M = 2205`,
      },
      {
        pergunta: "Você investiu R$ 1.500,00 a uma taxa de 10% ao mês. Após 2 meses, qual será o montante final?",
        respostas: [
          "a) R$ 1.800,00",
          "b) R$ 1.815,00",
          "c) R$ 1.785,00",
          "d) R$ 1.850,00",
        ],
        letraCorreta: "b",
        respostaCorreta: "R$ 1.815,00",
        feedback: `Montante = Capital aplicado × (1 + Taxa)¥
        
Substituindo os valores na fórmula:

M = 1500 × (1 + 0,1)²
M = 1500 × (1,1)²
M = 1500 × 1,21
M = 1815`,
      },
    ]
    this.cliqueSom = null; // Variável para o som de clique
    this.somFundo;
  }

  create() {
    // Adiciona os elementos carregados anteriormente a tela
    // Variável que divide as perguntas em tópicos, assim toda vez que o jogador jogar essa fase ele terá obrigatoriamente que passar por uma pergunta de cada tópico
    const topicos = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    // Função que sorteia aleatoriamente um número de cada subarray de topicos
    this.selectedQuestions = topicos.map((t) => Phaser.Math.RND.pick(t));

    // Carrega os sons
    this.cliqueSom = this.sound.add("click");
    this.somFundo = this.sound.add("somFundo");
    this.somFundo.play(); // Reproduz o som de fundo

    this.add.image(400, 300, "fundoMiniboss")

    this.pergunta = this.add.text(400, 130, "", {
      fontFamily: 'pixelArt',
      fontSize: '24px',
      color: '#ffffff',
      align: 'center',
    }).setWordWrapWidth(600).setOrigin(0.5);

    // Cria os botões de resposta (A, B, C e D) com suas respectivas letras
    this.botaoA = this.criarBotao(220, 360, "A", 0);
    this.botaoB = this.criarBotao(580, 360, "B", 1);
    this.botaoC = this.criarBotao(220, 500, "C", 2);
    this.botaoD = this.criarBotao(580, 500, "D", 3);

    // Cria um array pra armazenar a imagem dos botões
    this.botoes = [this.botaoA, this.botaoB, this.botaoC, this.botaoD];

    // Cria a animação do botão de próxima pergunta
    this.anims.create({
      key: "proximaPergunta",
      frames: this.anims.generateFrameNumbers(
        "proximaPergunta",
        { start: 0, end: 13 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    // Chama o método que verifica se ainda há perguntas a serem respondidas ou se pode finalizar o jogo
    this.criarCenaQuiz();
  }

  // Cria os botões de resposta com a letra correspondente
  criarBotao(x, y, letra, numero) {
    let botao = this.add
      .image(x, y, "botaoResposta")
      .setInteractive() // Permite que o botão detecte clique
      .setOrigin(0.5)
      .on("pointerdown", () => {
        this.cliqueSom.play(); // Reproduz o som de clique
        this.desabilitarBotoes(); // Método que desabilita os botões para impedir múltiplos cliques
        this.verificarResposta(letra); // Passa a letra como parâmetro para verificação
      });
    let resposta = this.add.text(x, y, "", {
      fontFamily: 'pixelArt',
      fontSize: '16px',
      color: '#ffffff',
      align: 'center',
    }).setWordWrapWidth(320).setOrigin(0.5);
    // Retorna o objeto botão com a letra associada
    return { botao, resposta, letra, numero };
  }

  // Método que verifica se todas as perguntas já foram respondidas ou se o jogo pode continuar
  criarCenaQuiz() {
    this.limparCena(); // Chama uma função que deleta todos os elementos da cena do jogo

    if (this.perguntaAtual < 3) {
      // Se o jogador não estiver na terceira pergunta ainda...
      this.mostrarPergunta(); // Chama a função que exibe uma nova pergunta na tela
    } else {
      // Se estiver na terceira pergunta...
      this.finalizarQuiz(); // Chama a função que encerra a fase
    }
  }

  // Método que mostra uma pergunta na tela
  mostrarPergunta() {
    // Variável que pega a primeira pergunta da lista de perguntas selecionadas
    this.numPerguntaAtual = this.selectedQuestions[this.perguntaAtual];

    this.pergunta.setText(this.perguntas[this.numPerguntaAtual - 1].pergunta);

    // Tornar os botões visíveis e interativos
    this.botoes.forEach((b) => {
      b.botao.setInteractive();
      b.resposta.setText(this.perguntas[this.numPerguntaAtual - 1].respostas[b.numero])
    });
  }

  // Método que verifica se o jogador acertou a resposta ou não
  verificarResposta(letraResposta) {
    // Variável que armazena a resposta correta para a pergunta atual
    const correta = this.correctAnswers[this.numPerguntaAtual];
    const acertou = letraResposta === correta; // Verifica se a resposta está correta

    // Se o jogador tiver acertado, a pontuação dele aumenta em 100 pontos e se ele tiver errado a pontuação dele diminui em 50 pontos
    this.pontuacaoB1 += acertou ? 100 : -50;

    if (letraResposta === correta) {
      this.sound.play("somAcerto");
    } else {
      this.sound.play("somErro");
    }

    // Console que verifica se a seleção das opções e a verificação das respostas está funcionando corretamente
    console.log(
      `Pergunta: ${this.numPerguntaAtual}, Resposta Escolhida: ${letraResposta}, Resposta Correta: ${correta}`
    );

    // Mostra o feedback correspondente
    this.mostrarFeedback(acertou ? "correto" : "errado");
  }



  // Função que mostra o feedback pro jogador com base na resposta dele
  mostrarFeedback(tipo) {

    this.fundoTelaFeedback = this.add.rectangle(400, 300, 800, 600, 0x324891).setAlpha(0.5)

    // Exibe a imagem do feedback
    this.telaFeedback = this.add.image(400, 300, "telaFeedback");
    this.resultadoQuestao = this.add.image(250, 150, tipo).setOrigin(0.5).setRotation(Math.PI / 16);

    this.tweens.add({
      targets: this.resultadoQuestao,
      rotation: -Math.PI / 16, // 360° in radians
      duration: 1000, // 2 seconds per full rotation
      yoyo: true,
      repeat: -1 // Infinite loop
    });

    // Adiciona o texto que expõe a resposta correta da questão
    this.respostaCorreta = this.add.text(562, 180, `Resposta correta: ${this.perguntas[this.numPerguntaAtual - 1].letraCorreta})\n${this.perguntas[this.numPerguntaAtual - 1].respostaCorreta}`, {
      fontFamily: "pixelArt",
      fill: "#FFF", // Cor da fonte é branco
    }).setWordWrapWidth(230).setOrigin(0.5);

    this.feedback = this.add.text(150, 290, this.perguntas[this.numPerguntaAtual - 1].feedback, {
      fontFamily: "pixelArt",
      fill: "#FFF", // Cor da fonte é branco
    }).setWordWrapWidth(500).setOrigin(0);

    // Depois de dois segundos...
    this.time.delayedCall(2000, () => {
      // Adiciona o botão de pular na tela
      this.botaoProximaPergunta = this.add
        .sprite(800, 600, "proximaPergunta")
        .setOrigin(1)
        .setInteractive()
        .on("pointerdown", () => {
          this.cliqueSom.play(); // Reproduz o som de clique
          this.limparCena(); // Chama o método que elimina todos os elementos da cena
          this.proximaPergunta(); // Quando o jogador clicar no botão, a função que mostra a próxima pergunta será chamada
        });

      this.botaoProximaPergunta.anims.play("proximaPergunta", true)
    });
  }



  proximaPergunta() {
    // Aumenta em uma unidade o valor da variável this.perguntaAtual
    this.perguntaAtual++;
    // Chama o método que verifica se todas as perguntas já foram respondidas
    this.criarCenaQuiz();
  }

  // Função que elimina todos os elementos da tela
  limparCena() {
    // Torna todos os botões invisíveis e desativa a interação deles
    this.botoes.forEach((b) => {
      b.botao.disableInteractive();
    });

    // Destroi o toda a tela de feedback se ainda estiver na tela
    if (this.botaoProximaPergunta) {
      this.botaoProximaPergunta.destroy();
    }
    if (this.fundoTelaFeedback) {
      this.fundoTelaFeedback.destroy();
    }
    if (this.telaFeedback) {
      this.telaFeedback.destroy();
    }
    if (this.resultadoQuestao) {
      this.resultadoQuestao.destroy();
    }
    if (this.respostaCorreta) {
      this.respostaCorreta.destroy();
    }
    if (this.feedback) {
      this.feedback.destroy();
    }
  }

  // Função que desativa os botões de resposta do jogo
  desabilitarBotoes() {
    // Tira a interatividade dos botões
    this.botoes.forEach((b) => b.botao.disableInteractive());
  }

  // Método que encerra essa fase
  finalizarQuiz() {
    // Chama a função que elimina todos os elementos da tela
    this.limparCena();

    this.sound.play("conclusao");
    this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(30).setAlpha(1);
    miniBossDia1.fim = this.add.image(400, 300, "fim").setDepth(31);

    pontuacao += this.pontuacaoB1;

    // Criação da tela de pontuação
    this.add
      .text(402, 311, this.pontuacaoB1, {
        fontFamily: "pixelArtNumeros",
        fill: "#ffffff",
        fontSize: "32px",
      })
      .setOrigin(0.5)
      .setDepth(32);

    this.add
      .text(402, 409, pontuacao, {
        fontFamily: "pixelArtNumeros",
        fill: "#ffffff",
        fontSize: "48px",
      })
      .setOrigin(0.5)
      .setDepth(32);

    this.anims.create({
      key: "voltarAoMapaB1",
      frames: this.anims.generateFrameNumbers("voltarAoMapa", {
        start: 0,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.voltarAoMapaB1 = this.add
      .sprite(695, 530, "voltarAoMapa")
      .setInteractive()
      .setDepth(32);

    this.voltarAoMapaB1.anims.play("voltarAoMapaB1", true);

    this.voltarAoMapaB1.on("pointerdown", () => {
      this.somFundo.stop();
      this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
      this.scene.start("finalDia1");
      this.scene.stop("miniBossDia1");
    });
  }
}
