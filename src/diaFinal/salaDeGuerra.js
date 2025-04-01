class salaDeGuerra extends Phaser.Scene {
  constructor() {
    super("salaDeGuerra");
    // Declaração de algumas das variáveis que serão usadas no código
    this.perguntaAtual = 0;
    // Lista que vai armazenar as perguntas selecionadas
    this.selectedQuestions = [];
    // Array que armazena as perguntas e as alternativas corretas para cada uma delas
    this.correctAnswers = {
      1: "B",
      2: "C",
      3: "B",
      4: "B",
      5: "B",
      6: "C",
      7: "A",
      8: "A",
      9: "C",
      10: "A",
      11: "A",
      12: "B",
    };

    this.questions = [
      {
        text: "Qual é a principal característica \nde um fundo aberto em relação à liquidez?",
        options: [
          "A) O investidor só pode resgatar \no dinheiro ao final de um prazo fixo.",
          "B) O investidor pode comprar e \nvender cotas a qualquer momento.",
          "C) As aplicações são restritas e \nnão permitem novos aportes.",
          "D) A liquidez é garantida apenas ao \nfinal do período de investimento.",
        ],
      },
      {
        text: "Qual tipo de fundo é mais adequado \npara quem busca flexibilidade?",
        options: [
          "A) Fundo Imobiliário",
          "B) Fundo Fechado",
          "C) Fundo Aberto",
          "D) Fundo de Private Equity",
        ],
      },
      // Mini game 1 - Questão 2 (original)
      {
        text: "Qual tipo de fundo é mais adequado para \nquem busca flexibilidade e acesso rápido \nao dinheiro?",
        options: [
          "A) Fundo Imobiliário",
          "B) Fundo Fechado",
          "C) Fundo Aberto",
          "D) Fundo de Private Equity",
        ],
      },
      // Mini game 2
      {
        text: "Se um valor de R$ 2.350,00 é investido \ncom uma taxa de 12% ao ano, qual \nserá o montante após 1 ano?",
        options: [
          "A) R$ 2.600,00",
          "B) R$ 2.632,00",
          "C) R$ 2.650,00",
          "D) R$ 2.700,00",
        ],
      },
      {
        text: "Um investidor aplicou R$ 30.000,00 em um fundo. \nNo primeiro ano, houve uma depreciação de \n6%, no segundo uma recuperação de 4% e no \nterceiro uma queda de 3%. Qual o valor final?",
        options: [
          "A) R$ 29.474,40",
          "B) R$ 28.972,00",
          "C) R$ 29.152,20",
          "D) R$ 29.640,00",
        ],
      },
      // Mini game 3
      {
        text: "O que é o prazo de cotização em \num processo de resgate de fundos?",
        options: [
          "A) O tempo que o cliente leva \npara solicitar o resgate do fundo.",
          "B) O período necessário para \nque a ordem de venda de \ncota seja registrada \ne comece a render.",
          "C) O prazo para que o valor \ndo fundo seja reinvestido \nem outra aplicação.",
          "D) O tempo que o banco \nleva para liberar o dinheiro \nna conta do cliente.",
        ],
      },
      {
        text: "O que acontece após o prazo de cotização \nno processo de resgate de um fundo?",
        options: [
          "A) O cliente pode receber \nimediatamente o valor resgatado.",
          "B) O valor começa a ser investido \nnovamente com novas cotas.",
          "C) Ocorre o prazo de liquidação, \nque corresponde ao tempo \nnecessário para concluir a \ntransação e liberar o dinheiro.",
          "D) O fundo passa a ser bloqueado \npor um período de carência.",
        ],
      },
      // Mini game 4
      {
        text: "Um fundo de renda fixa tem Come-Cotas \nde 15%. Se um investidor aplicou R$ 10.000,00, \nqual será o valor após 1 ano?",
        options: [
          "A) R$ 10.650,00",
          "B) R$ 10.500,00",
          "C) R$ 10.700,00",
          "D) R$ 11.000,00",
        ],
      },
      {
        text: "Qual é o imposto de renda aplicado sobre o \nlucro de um fundo de ações no momento \ndo resgate?",
        options: ["A) 20%", "B) 5%", "C) 15%", "D) 10%"],
      },
      // Mini game 5
      {
        text: "O que é a Taxa Interna de Retorno (TIR) \nem um contexto financeiro?",
        options: [
          "A) Indicador que mede a \nvariação do índice Bovespa \nao longo do tempo.",
          "B) Estratégia de proteção \ncontra riscos financeiros \nusando derivativos.",
          "C) Taxa que iguala as entradas\ne saídas de caixa de um investimento,\nindicando sua rentabilidade.",
          "D) Prazo de liquidação financeira\n de um ativo após a venda.",
        ],
      },
      {
        text: "O que é um Swap no mercado financeiro?",
        options: [
          "A) Um contrato derivativo em \nque duas partes trocam fluxos \nfinanceiros baseados em \ndiferentes índices.",
          "B) Um fundo que investe \nexclusivamente em \nações da B3.",
          "C) Uma estratégia de hedge \npara garantir rentabilidade \nfixa em ativos.",
          "D) Um fundo de private equity \nque adquire participação \nacionária em empresas privadas.",
        ],
      },
      // Mini game 6
      {
        text: "Qual dos princípios abaixo está \nmais conectado com nossa empresa?",
        options: [
          "A) Empreendedorismo e Inovação",
          "B) Responsabilidade Social",
          "C) Eficiência Operacional",
          "D) Foco no Cliente",
        ],
      },
      {
        text: "Qual das características abaixo melhor representa a cultura organizacional que valoriza o trabalho em equipe?",
        options: [
          "A) Buscar constantemente soluções ágeis e novos aprendizados.",
          "B) Compartilhar conhecimento e respeitar as diferenças entre os colaboradores.",
          "C) Tomar decisões assertivas que motivem a equipe e inspirem confiança.",
          "D) Agir com responsabilidade e intensidade, antecipando problemas e propondo soluções.",
        ],
      },
    ];
    this.timer = 1800;
    this.timerText = null;
    this.questionText = null;
    this.optionTexts = [];
  }

  create() {
    this.add.image(400, 300, "fundoPerguntas");

    // Carrega os sons
    this.clickSound = this.sound.add("click");
    this.somFundo = this.sound.add("musicaHubFinal");
    this.somFundo.play(); // Reproduz o som de fundo

    // Cria os botões de resposta (A, B, C e D) com suas respectivas letras
    this.botaoA = this.criarBotao(210, 355, "A");
    this.botaoB = this.criarBotao(210, 510, "B");
    this.botaoC = this.criarBotao(600, 355, "C");
    this.botaoD = this.criarBotao(600, 510, "D");

    // Exibe a pontuação no canto superior direito
    this.pontuacaoText = this.add.text(380, 37, `Pontuação: ${pontuacao}`, {
      fontSize: "18px",
      fill: "#fff",
      fontFamily: "pixelArt",
    });

    // Cria um array pra armazenar a imagem dos botões
    this.botoes = [this.botaoA, this.botaoB, this.botaoC, this.botaoD];

    // Chama o método que verifica se ainda há perguntas a serem respondidas ou se pode finalizar o jogo
    this.criarCenaQuiz();

    // Criar e exibir o timer
    this.timerText = this.add
      .text(650, 18, this.formatarTempo(this.timer), {
        fontSize: "40px",
        fill: "#fff",
        fontFamily: "pixelArt",
      })
      .setDepth(10);

    this.time.addEvent({
      delay: 1000, // A cada 1 segundo
      callback: this.atualizarTimer,
      callbackScope: this,
      loop: true, // Continuar executando a cada 1 segundo
    });
  }

  formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${
      segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes
    }`;
  }

  atualizarTimer() {
    if (this.timer > 0) {
      this.timer--; // Diminui o tempo restante
      this.timerText.setText(this.formatarTempo(this.timer)); // Atualiza o timer na tela
    } else {
      this.finalizarQuiz(); // Finaliza o quiz quando o tempo acabar
    }
  }

  criarBotao(x, y, letra) {
    let botao = this.add
      .image(x, y, "botao")
      .setInteractive() // Permite que o botão detecte clique
      .setDepth(-10) // Define a profundidade do botão como -1 para garantir que o texto da pergunta apareça na tela
      .on("pointerdown", () => {
        this.clickSound.play(); // Reproduz o som de clique
        this.desabilitarBotoes(); // Método que desabilita os botões para impedir múltiplos cliques
        this.verificarResposta(letra); // Passa a letra como parâmetro para verificação
      });
    // Retorna o objeto botão com a letra associada
    return { botao, letra };
  }

  // Método que verifica se todas as perguntas já foram respondidas ou se o jogo pode continuar
  criarCenaQuiz() {
    this.limparCena(); // Chama uma função que deleta todos os elementos da cena do jogo

    if (this.perguntaAtual < 12) {
      // Se o número de perguntas for menor que 12...
      this.mostrarPergunta(); // Chama a função que exibe uma nova pergunta na tela
    } else {
      // Se não for menor que 12...
      this.finalizarQuiz(); // Chama a função que encerra a fase
    }
  }

  // Método que mostra uma pergunta na tela
  mostrarPergunta() {
    const numPergunta = this.selectedQuestions[this.perguntaAtual];

    // Exibe a pergunta
    this.questionText = this.add.text(
      80,
      100,
      this.questions[this.perguntaAtual].text,
      {
        font: "24px pixelArtNegrito",
        fill: "#fff",
      }
    );

    // Exibe as opções de resposta
    const options = this.questions[this.perguntaAtual].options;

    // Adicionando os botões com as opções
    // Laço para adicionar o texto sobre os botões
    for (let i = 0; i < this.botoes.length; i++) {
      // Adiciona o texto sobre o botão
      const text = this.add
        .text(this.botoes[i].botao.x, this.botoes[i].botao.y, options[i], {
          font: "13px pixelArtNegrito",
          fill: "#fff",
        })
        .setOrigin(0.5); // Alinha o texto no centro do botão

      // Adiciona o texto ao array para poder destruir depois
      this.optionTexts.push(text);
    }

    this.botoes.forEach((b) => {
      b.botao.setVisible(true).setInteractive();
    });

    this.numPerguntaAtual = numPergunta; // Armazena o número da pergunta atual
  }

  verificarResposta(letraResposta) {
    // Confirma se a pergunta atual é válida
    const correta = this.correctAnswers[this.perguntaAtual + 1]; // Verifica a resposta correta
    const acertou = letraResposta === correta; // Verifica se a resposta está correta

    this.botoes.forEach((b) => b.botao.disableInteractive());

    // Se o jogador acertou, a pontuação aumenta em 100, se errou diminui 50
    pontuacao += acertou ? 100 : -50;

    // Adiciona o texto de feedback (verde para acerto, vermelho para erro)
    const feedbackText = this.add
      .text(500, 90, acertou ? "+ 100" : "- 50", {
        fontSize: "32px",
        fill: acertou ? "#00FF00" : "#FF0000", // Verde para acerto e Vermelho para erro
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Anima o texto para subir na tela
    this.tweens.add({
      targets: feedbackText,
      y: 60, // Muda a posição Y para que o texto suba
      alpha: 0, // Fará o texto desaparecer lentamente
      duration: 1000, // Tempo da animação
      ease: "Power1", // Tipo de animação
      onComplete: () => {
        feedbackText.destroy(); // Destrói o texto depois da animação
      },
    });

    if (acertou) {
      this.sound.play("somAcerto");
    } else {
      this.sound.play("somErro");
    }

    // Atualiza o texto da pontuação
    this.pontuacaoText.setText(`Pontuação: ${pontuacao}`);

    // Log para verificar a pergunta e resposta
    console.log(
      `Pergunta: ${
        this.perguntaAtual + 1
      }, Resposta Escolhida: ${letraResposta}, Resposta Correta: ${correta}`
    );

    this.proximaPergunta();
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
      b.botao.setVisible(false).disableInteractive();
    });

    // Remove os textos das alternativas anteriores
    this.optionTexts.forEach((text) => text.destroy());
    this.optionTexts = []; // Limpa o array que armazena os textos das opções

    // Remove o texto da pergunta anterior
    if (this.questionText) {
      this.questionText.destroy();
      this.questionText = null; // Reseta a variável
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

    // Adiciona um fundo azul escuro a tela
    this.add.rectangle(400, 300, 800, 600, 0x00014b).setOrigin(0.5);

    this.somFundo.stop(); // Para a música de fundo
    // Adiciona um texto escrito "Desafio Concluído!"
    this.add
      .text(400, 220, "Desafio Concluído!", {
        fontSize: "48px",
        fill: "#FFFFFF",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);

    // Adiciona um texto que mostra a pontuação final
    this.add
      .text(400, 300, `Pontuação Final: ${pontuacao}`, {
        fontSize: "32px",
        fill: "#FFFFFF",
        fontFamily: "Arial",
      })
      .setOrigin(0.5);
  }
}
