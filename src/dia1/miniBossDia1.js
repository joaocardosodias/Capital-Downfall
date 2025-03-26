class miniBossDia1 extends Phaser.Scene {
  constructor() {
    super("miniBossDia1"); // Nome da cena
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
    this.clickSound = null; // Variável para o som de clique
    this.somFundo;
  }

  preload() {
    // Carrega os elementos da cena
    // Estrutura de repetição para carregar as 9 perguntas, as 9 imagens de feedback correto e as 9 imagens de feedback negativo
    for (let i = 1; i <= 9; i++) {
      this.load.image(
        `pergunta${i}`,
        `src/assets/dia1/miniBossDia1/pergunta${i}.png`
      );
      this.load.image(
        `acertou${i}`,
        `src/assets/dia1/miniBossDia1/acertou${i}.png`
      );
      this.load.image(
        `errou${i}`,
        `src/assets/dia1/miniBossDia1/errou${i}.png`
      );
    }
    this.load.image("botao", "src/assets/dia1/miniBossDia1/botao.png");
    this.load.image("pular", "src/assets/dia1/miniBossDia1/pular.png");
    this.load.image(
      "botaoVoltar",
      "src/assets/dia1/miniBossDia1/botaoVoltar.png"
    );

    // Carrega os sons utilizados
    this.load.audio("click", ["src/assets/dia2/miniGame4/sons/clique.mp3"]);
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
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
    this.clickSound = this.sound.add("click");
    this.somFundo = this.sound.add("somFundo");
    this.somFundo.play(); // Reproduz o som de fundo

    // Cria os botões de resposta (A, B, C e D) com suas respectivas letras
    this.botaoA = this.criarBotao(395, 240, "A");
    this.botaoB = this.criarBotao(395, 340, "B");
    this.botaoC = this.criarBotao(395, 438, "C");
    this.botaoD = this.criarBotao(395, 535, "D");

    // Cria um array pra armazenar a imagem dos botões
    this.botoes = [this.botaoA, this.botaoB, this.botaoC, this.botaoD];

    // Chama o método que verifica se ainda há perguntas a serem respondidas ou se pode finalizar o jogo
    this.criarCenaQuiz();
  }

  // Cria os botões de resposta com a letra correspondente
  criarBotao(x, y, letra) {
    let botao = this.add
      .image(x, y, "botao")
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

    if (this.perguntaAtual < 3) {
      // Se o número de perguntas for menor que 3...
      this.mostrarPergunta(); // Chama a função que exibe uma nova pergunta na tela
    } else {
      // Se não for menor que 3...
      this.finalizarQuiz(); // Chama a função que encerra a fase
    }
  }

  // Método que mostra uma pergunta na tela
  mostrarPergunta() {
    // Variável que pega a primeira pergunta da lista de perguntas selecionadas
    const numPergunta = this.selectedQuestions[this.perguntaAtual];

    // Exibe a imagem da pergunta
    this.imagemPergunta = this.add.image(400, 300, `pergunta${numPergunta}`);

    // Tornar os botões visíveis e interativos
    this.botoes.forEach((b) => {
      b.botao.setVisible(true).setInteractive();
    });

    this.numPerguntaAtual = numPergunta; // Armazena o número da pergunta atual
  }

  // Método que verifica se o jogador acertou a resposta ou não
  verificarResposta(letraResposta) {
    // Variável que armazena a resposta correta para a pergunta atual
    const correta = this.correctAnswers[this.numPerguntaAtual];
    const acertou = letraResposta === correta; // Verifica se a resposta está correta

    // Se o jogador tiver acertado, a pontuação dele aumenta em 100 pontos e se ele tiver errado a pontuação dele diminui em 50 pontos
    pontuacao += acertou ? 100 : -50;

    if (acertou === correta) {
      this.sound.play("somAcerto");
    } else {
      this.sound.play("somErro");
    }

    // Console que verifica se a seleção das opções e a verificação das respostas está funcionando corretamente
    console.log(
      `Pergunta: ${this.numPerguntaAtual}, Resposta Escolhida: ${letraResposta}, Resposta Correta: ${correta}`
    );

    // Mostra o feedback correspondente
    this.mostrarFeedback(acertou ? "acertou" : "errou");
  }

  // Função que mostra o feedback pro jogador com base na resposta dele
  mostrarFeedback(tipo) {
    this.limparCena(); // Chama o método que elimina todos os elementos da cena

    // Exibe a imagem do feedback
    this.add.image(400, 300, `${tipo}${this.numPerguntaAtual}`);

    // Adiciona um texto que mostra a pontuação do jogador na tela
    this.add.text(60, 570, `Pontuação: ${pontuacao}`, {
      fontSize: "24px", // Tamanho da fonte
      fill: "#FFF", // Cor da fonte é branco
      backgroundColor: "#000000", // Cor do fundo é preto
    });

    // Depois de dois segundos...
    this.time.delayedCall(2000, () => {
      // Adiciona o botão de pular na tela
      this.pularBtn = this.add
        .image(670, 570, "pular")
        .setInteractive() // Torna o botão interativo
        .on("pointerdown", () => {
          this.clickSound.play(); // Reproduz o som de clique
          this.proximaPergunta(); // Quando o jogador clicar no botão, a função que mostra a próxima pergunta será chamada
        });
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
    // Tira da tela a imagem das perguntas se elas ainda estiverem na tela
    if (this.imagemPergunta) {
      this.imagemPergunta.destroy();
    }

    // Torna todos os botões invisíveis e desativa a interação deles
    this.botoes.forEach((b) => {
      b.botao.setVisible(false).disableInteractive();
    });

    // Destroi o botão de pular se ele ainda estiver na tela
    if (this.pularBtn) {
      this.pularBtn.destroy();
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
    this.sound.play("conclusao");
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

    // Botão para voltar ao hub
    this.add
      .image(400, 420, "botaoVoltar")
      .setInteractive()
      .setScale(0.8)
      .on("pointerdown", () => {
        this.clickSound.play(); // Reproduz o som de clique
        this.scene.stop("miniBossDia1");
        this.scene.start("finalDia1");
      });
  }
}
