class miniGame6 extends Phaser.Scene {
  constructor() {
    super("miniGame6");
    this.imagens = [];
    this.imagemAtual = null;
    this.botaoAprovado = null;
    this.botaoReprovado = null;
    this.placarTexto = null;
    this.clickSound = null; // Som de clique
    this.somFundo;

  }

  preload() {
    //Preload das imagens
    this.load.image("imagem1", "src/assets/dia2/miniGame6/imagemgame6.png");
    this.load.image("imagem3", "src/assets/dia2/miniGame6/imagem3game6.png");
    this.load.image("botao", "src/assets/dia2/miniGame6/imagem2game6.png");
    this.load.image("pedro", "src/assets/dia2/miniGame6/imagem4game6.png");
    this.load.image("ana", "src/assets/dia2/miniGame6/imagem5game6.png");
    this.load.image(
      "botaoaprovado",
      "src/assets/dia2/miniGame6/imagem7game6.png"
    );
    this.load.image(
      "botaoreprovado",
      "src/assets/dia2/miniGame6/imagem6game6.png"
    );
    this.load.image("vagner", "src/assets/dia2/miniGame6/imagem8game6.png");
    this.load.image("amanda", "src/assets/dia2/miniGame6/imagem9game6.png");
    this.load.image("bruna", "src/assets/dia2/miniGame6/imagem10game6.png");

    // Carrega o som de clique
    this.load.audio("click", "src/assets/sounds/clique.mp3");
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3");
    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
  }

  create() {
    
    this.somFundo = this.sound.add("somFundo", { loop: true });
    this.somFundo.play();

    this.cameras.main.setBackgroundColor("#195A4B"); //Define a cor do plano de fundo

    //Coloca as imagens em um array, definindo uma key para cada um dos cards. Além disso, define a pontuação de cada resposta
    this.imagens = [
      { key: "bruna", pontosAprovado: 100, pontosReprovado: -50 },
      { key: "amanda", pontosAprovado: 100, pontosReprovado: -50 },
      { key: "vagner", pontosAprovado: 100, pontosReprovado: -50 },
      { key: "ana", pontosAprovado: -50, pontosReprovado: 100 },
      { key: "pedro", pontosAprovado: -50, pontosReprovado: 100 },
    ];

    this.imagens = Phaser.Utils.Array.Shuffle(this.imagens); //Utiliza um comando do Phaser para embaralhar a ordem dos itens do array

    //Cria o placar de pontuação
    this.placarTexto = this.add.text(20, 20, `Pontuação: ${pontuacao}`, {
      fontSize: "32px",
      fill: "#FFFFFF",
    });

    // Carrega o som de clique
    this.clickSound = this.sound.add("click");

    //Inicia o método para exibir a próxima imagem
    this.exibirProximaImagem();
  }

  exibirProximaImagem() {
    //Verifica se já existe um card na tela. Se sim, ele é removido
    if (this.imagemAtual) {
      this.imagemAtual.destroy();
    }

    if (this.botaoAprovado) {
      //Caso os botões estejam na tela, eles também são removidos
      this.botaoAprovado.destroy();
      this.botaoReprovado.destroy();
    }

    if (this.imagens.length > 0) {
      //Verifica se ainda há imagens para serem mostradas
      const proximaImagem = this.imagens.pop(); //O método .pop() remove o último item do array, retornando o mesmo

      //Adiciona um card para a variável imagemAtual
      this.imagemAtual = this.add
        .image(
          this.sys.game.config.width / 2,
          this.sys.game.config.height / 2,
          proximaImagem.key
        )
        .setScale(0.8);

      //Adiciona o botão de aprovado e reprovado, de acordo com os valores de pontuação definidos
      //Eles também são configurados para serem interativos, executando o método avaliarImagem() ao serem clicados

      this.botaoAprovado = this.add
        .image(75, this.sys.game.config.height, "botaoaprovado")
        .setInteractive()
        .setScale(1.5)
        .setOrigin(0, 1)
        .on("pointerdown", () => {
          this.clickSound.play(); // Reproduz o som de clique
          this.avaliarImagem(proximaImagem.pontosAprovado);
        });

      this.botaoReprovado = this.add
        .image(
          this.sys.game.config.width,
          this.sys.game.config.height,
          "botaoreprovado"
        )
        .setInteractive()
        .setScale(1.5)
        .setOrigin(1, 1)
        .on("pointerdown", () => {
          this.clickSound.play(); // Reproduz o som de clique
          this.avaliarImagem(proximaImagem.pontosReprovado);
        });
    } else {
      this.exibirResultadoFinal(); //Caso não hajam mais cards no array, inicia-se o método exibirResultadoFinal ()
    }
  }

  avaliarImagem(pontos) {
    //Adiciona a pontuação conforme o resultado passado para o método.
    pontuacao += pontos;

    if(pontos<0){
      this.sound.play("somErro");
    }
    else{
      this.sound.play("somAcerto");
    }

    this.placarTexto.setText(`Pontuação: ${pontuacao}`); //Atualiza o placar

    //Inicia o método para exibir a próxima imagem
    this.exibirProximaImagem();
  }

  exibirResultadoFinal() {
    //Remove as imagens da tela
    this.imagemAtual.destroy();
    this.botaoAprovado.destroy();
    this.botaoReprovado.destroy();

    this.somFundo.stop(); // Para a música de fundo
    this.sound.play("conclusao");

    //Adiciona o te xto de resultado
    this.add
      .text(400, 200, "Resultado", { fontSize: "40px", fill: "#fff" })
      .setOrigin(0.5);

    // Exibe a pontuação obtida
    this.add
      .text(400, 350, `Pontuação: ${pontuacao}`, {
        fontSize: "30px",
        fill: "#fff",
      })
      .setOrigin(0.5);

    // Botão para voltar à hub
    let botaoVoltar = this.add
      .text(400, 400, "Voltar", {
        fontSize: "30px",
        fill: "#fff",
        backgroundColor: "#333",
      })
      .setOrigin(0.5)
      .setPadding(10)
      .setInteractive();

    botaoVoltar.on("pointerdown", () => {
      this.clickSound.play(); // Reproduz o som de clique
      minigame6Jogado = true;
      musicaHub2.resume();
      this.scene.wake("hub2"); //Se você clicar no botão Voltar, você volta pra hub do jogo
      this.scene.stop("miniGame6");
    });
  }
}
