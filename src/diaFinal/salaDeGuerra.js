class salaDeGuerra extends baseCena {
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
      8: "C",
      9: "D",
      10: "C",
      11: "A",
      12: "B",
    };

    this.questions = [
      {
        text: "Qual é a principal característica de um fundo aberto em relação à liquidez?",
        options: [
          "A) O investidor só pode resgatar o dinheiro ao final de um prazo fixo.",
          "B) O investidor pode comprar e vender cotas a qualquer momento.",
          "C) As aplicações são restritas e não permitem novos aportes.",
          "D) A liquidez é garantida apenas ao final do período de investimento.",
        ],
      },
      // Mini game 1 - Questão 2 (original)
      {
        text: "Qual tipo de fundo é mais adequado para quem busca flexibilidade e acesso rápido ao dinheiro?",
        options: [
          "A) Fundo Imobiliário",
          "B) Fundo Fechado",
          "C) Fundo Aberto",
          "D) Fundo de Private Equity",
        ],
      },
      // Mini game 2
      {
        text: "Se um valor de R$ 2.350,00 é investido com uma taxa de 12% ao ano, qual será o montante após 1 ano?",
        options: [
          "A) R$ 2.600,00",
          "B) R$ 2.632,00",
          "C) R$ 2.650,00",
          "D) R$ 2.700,00",
        ],
      },
      {
        text: "Um investidor aplicou R$ 30.000,00 em um fundo. No primeiro ano, houve uma depreciação de 6%, no segundo uma recuperação de 4% e no terceiro uma queda de 3%. Qual o valor final?",
        options: [
          "A) R$ 29.474,40",
          "B) R$ 28.972,00",
          "C) R$ 29.152,20",
          "D) R$ 29.640,00",
        ],
      },
      // Mini game 3
      {
        text: "O que é o prazo de cotização em um processo de resgate de fundos?",
        options: [
          "A) O tempo que o cliente leva para solicitar o resgate do fundo.",
          "B) O período necessário para que a ordem de venda de cota seja registrada.",
          "C) O prazo para que o valor do fundo seja reinvestido em outra aplicação.",
          "D) O tempo que o banco leva para liberar o dinheiro na conta do cliente.",
        ],
      },
      {
        text: "O que acontece após o prazo de cotização no processo de resgate de um fundo?",
        options: [
          "A) O cliente pode receber imediatamente o valor resgatado.",
          "B) O valor começa a ser investido novamente com novas cotas.",
          "C) Ocorre o prazo de liquidação, que corresponde ao tempo necessário para concluir a transação e liberar o dinheiro.",
          "D) O fundo passa a ser bloqueado por um período de carência.",
        ],
      },
      // Mini game 4
      {
        text: "Um fundo de renda fixa tem Come-Cotas de 15%. Se um investidor aplicou R$ 10.000,00, qual será o valor após 1 ano?",
        options: [
          "A) R$ 10.650,00",
          "B) R$ 10.500,00",
          "C) R$ 10.700,00",
          "D) R$ 11.000,00",
        ],
      },
      {
        text: "Qual é o imposto de renda aplicado sobre o lucro de um fundo de ações no momento do resgate?",
        options: ["A) 20%", "B) 5%", "C) 15%", "D) 10%"],
      },
      // Mini game 5
      {
        text: "Qual dos seguintes fundos de investimento é conhecido por investir em empresas privadas, com potencial de crescimento?",
        options: [
            "A) Renda Fixa",
            "B) Multimercado",
            "C) Imobiliário",
            "D) Private Equity",
        ],
      },
      {
        text: "Qual dos seguintes fundos de investimento é conhecido por sua segurança e estabilidade?",
        options: [
          "A) Ações",
          "B) Private Equity",
          "C) Renda Fixa",
          "D) Multimercado",
        ],
      },
      // Mini game 6
      {
        text: "Qual dos princípios abaixo está mais conectado com nossa empresa?",
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
    this.tempoInicial = 600;
    this.timer = this.tempoInicial; // Variável que irá conter o tempo restante atual
    this.timerText = null;
    this.questionText = null;
    this.optionTexts = [];
  }

  create() {
    this.cameras.main.setBounds(0, 0, 800, 600);

    this.add.rectangle(400, 300, 800, 600, 0x243572).setDepth(-10);

    this.add.image(0, 0, "fundoPerguntas").setOrigin(0).setDepth(-5);

    this.add.image(780, 20, "fundoTimer").setOrigin(1, 0).setDepth(10);

    this.alarme = this.add.rectangle(400, 300, 800, 600, 0xdd0000).setDepth(100).setVisible(false);


    // Carrega os sons
    this.clickSound = this.sound.add("click");
    this.somFundo = this.sound.add("musicaHubFinal");
    this.somFundo.setLoop(true); // Define a música para tocar em loop
    this.somFundo.play(); // Reproduz o som de fundo

    // Cria os botões de resposta (A, B, C e D) com suas respectivas letras
    this.botaoA = this.criarBotao(240, 355, "A");
    this.botaoB = this.criarBotao(240, 510, "B");
    this.botaoC = this.criarBotao(560, 355, "C");
    this.botaoD = this.criarBotao(560, 510, "D");

    // Exibe a pontuação no canto superior direito
    this.pontuacaoText = this.add.text(30, 30, `Pontuação: ${pontuacao}`, {
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
      .setDepth(21);

    this.time.addEvent({
      delay: 1000, // A cada 1 segundo
      callback: this.atualizarTimer,
      callbackScope: this,
      loop: true, // Continuar executando a cada 1 segundo
    });


    this.anims.create({
      key: "fogo1",
      frames: this.anims.generateFrameNumbers("fogo1", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "fogo2",
      frames: this.anims.generateFrameNumbers("fogo2", {
        start: 0,
        end: 7,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "fogo3",
      frames: this.anims.generateFrameNumbers("fogo3", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "fogo4",
      frames: this.anims.generateFrameNumbers("fogo4", {
        start: 0,
        end: 5,
      }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "fogo5",
      frames: this.anims.generateFrameNumbers("fogo5", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Cria todos os fogos que aparecerão na tela assim como sua posição, textura, profundidade, escala e tempo de aparição
    this.incendio = [
      { fogo: this.fogoA = this.add.sprite(50, 600, "fogo1").setDepth(-8).setScale(3).setOrigin(0.5, 0), tempoDeAparicao: 1 },
      { fogo: this.fogoB = this.add.sprite(450, 600, "fogo1").setDepth(-6).setScale(5).setOrigin(0.5, 0), tempoDeAparicao: 2 / 12 },
      { fogo: this.fogoC = this.add.sprite(150, 600, "fogo2").setDepth(-4).setScale(6).setOrigin(0.5, 0), tempoDeAparicao: 1 / 12 },
      { fogo: this.fogoD = this.add.sprite(300, 600, "fogo2").setDepth(-9).setScale(3).setOrigin(0.5, 0), tempoDeAparicao: 4 / 12 },
      { fogo: this.fogoE = this.add.sprite(750, 600, "fogo3").setDepth(-4).setScale(6).setOrigin(0.5, 0), tempoDeAparicao: 3 / 12 },
      { fogo: this.fogoF = this.add.sprite(600, 600, "fogo4").setDepth(-7).setScale(4).setOrigin(0.5, 0), tempoDeAparicao: 5 / 12 },
      { fogo: this.fogoG = this.add.sprite(720, 600, "fogo5").setDepth(0).setScale(6).setOrigin(0.5, 0), tempoDeAparicao: 10 / 12 },
    ];

    this.fogoA.anims.play("fogo1");
    this.fogoB.anims.play("fogo1");
    this.fogoC.anims.play("fogo2");
    this.fogoD.anims.play("fogo2");
    this.fogoE.anims.play("fogo3");
    this.fogoF.anims.play("fogo4");
    this.fogoG.anims.play("fogo5");

  }

  formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? "0" + segundosRestantes : segundosRestantes
      }`;
  }

  atualizarTimer() {
    if (this.timer > 0) {
      this.timer--; // Diminui o tempo restante
      this.timerText.setText(this.formatarTempo(this.timer)); // Atualiza o timer na tela

      // Cria a animação do alarme de incendio, com uma luz vermelha por cima da tela de vez em quando
      if (this.timer > this.tempoInicial / 4) {
        if (this.timer % 4 === 1) {
          this.alarme.setVisible(true).setAlpha(0.4 * (this.tempoInicial - this.timer) / this.tempoInicial);
        } else {
          this.alarme.setVisible(false);
        }
      } else { // Quando o tempo estiver quase acabando, o alarme fica mais rápido
        if (this.timer % 2 === 1) {
          this.alarme.setVisible(true).setAlpha(0.4 * (this.tempoInicial - this.timer) / this.tempoInicial);
        } else {
          this.alarme.setVisible(false);
        }
      }

      // Cria a animação de todos os fogos, que sobem em diferentes momentos ao longo do tempo
      this.incendio.forEach((f) => {
        if (f.fogo.y > 600 - f.fogo.height * f.fogo.scale) { // Se a base do fogo ainda não estiver no canto inferior da tela...
          f.fogo.y = 600 * this.timer / (this.tempoInicial * f.tempoDeAparicao) // Equação que define quando o fogo irá começar a aparecer com base no tempo inicial
          if (f.fogo.y < 600 - f.fogo.height * f.fogo.scale) { // Evita que o fogo passe do canto inferior da tela. Sem isso, ele passa e volta no próximo segundo
            f.fogo.y = 600 - f.fogo.height * f.fogo.scale
          }
        } else { f.fogo.y = 600 - f.fogo.height * f.fogo.scale } // Fogo fica exatamente no canto inferior quando sua animação termina
      });
    } else {
      this.finalizarQuiz(); // Finaliza o quiz quando o tempo acabar
    }
  }

  criarBotao(x, y, letra) {
    let botao = this.add
      .image(x, y, "botaoFinal")
      .setInteractive() // Permite que o botão detecte clique
      .setDepth(-1) // Define a profundidade do botão como -1 para garantir que o texto da pergunta apareça na tela
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
      400,
      150,
      this.questions[this.perguntaAtual].text,
      {
        font: "24px pixelArtNegrito",
        fill: "#fff",
        align: "center",
      }
    ).setDepth(11).setWordWrapWidth(650).setOrigin(0.5);

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
          align: "center",
        })
        .setOrigin(0.5).setWordWrapWidth(250); // Alinha o texto no centro do botão

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
      `Pergunta: ${this.perguntaAtual + 1
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
      this.scene.stop("salaDeGuerra");
      this.scene.start("finalSalaDeGuerra");
  }
}
