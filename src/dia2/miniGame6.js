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
    this.load.image("pedro", "src/assets/dia2/miniGame6/perfil1M6.png");
    this.load.image("ana", "src/assets/dia2/miniGame6/perfil2M6.png");
    this.load.image(
      "botaoaprovado",
      "src/assets/dia2/miniGame6/botaoAprovar.png"
    );
    this.load.image(
      "botaoreprovado",
      "src/assets/dia2/miniGame6/botaoReprovar.png"
    );
    this.load.image("vagner", "src/assets/dia2/miniGame6/perfil3M6.png");
    this.load.image("amanda", "src/assets/dia2/miniGame6/perfil4M6.png");
    this.load.image("bruna", "src/assets/dia2/miniGame6/perfil5M6.png");

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
      { key: "bruna", pontosAprovado: 100, pontosReprovado: -50,
        texto: "Bruna é uma jovem empreendedora sempre em busca de soluções ágeis e oportunidades para expandir seus conhecimentos. Com uma liderança natural, ela toma decisões assertivas e inspira sua equipe, criando um ambiente motivador e colaborativo, no qual todos se sentem valorizados e impulsionados a alcançar os melhores resultados."
      },
      { key: "amanda", pontosAprovado: 100, pontosReprovado: -50,
        texto: "Amanda é uma profissional altamente proativa, atuando com responsabilidade. Ela não se destaca pela sua liderança, mas se dispõe a aprender a ser líder. Além disso, Amanda busca constantemente superar as expectativas e entregar resultados de qualidade."
      },
      { key: "vagner", pontosAprovado: 100, pontosReprovado: -50, 
        texto: "Vagner é um empreendedor inovador, sempre buscando soluções otimizadas e novos aprendizados. Quanto a sua liderança, é capaz de motivar toda sua equipe, promovendo colaboração e respeito às diferenças. Além disso, constantemente supera desafios com excelência, sempre buscando a melhor solução para um problema."
      },
      { key: "ana", pontosAprovado: -50, pontosReprovado: 100, 
        texto: "Ana é uma profissional conservadora, optando utilizar as mesmas ferramentas que sempre usou. Também, não se dá bem como líder, pois não consegue motivar a equipe e evita tomar decisões próprias, preferindo seguir ordens dos outros. Além disso, não se comunica bem com seus colegas, guardando informações para si."
      },
      { key: "pedro", pontosAprovado: -50, pontosReprovado: 100, 
        texto: "Pedro é um jovem extrovertido, gostando de liderar e interagir com seus colégas. No entanto, sua liderança não é ideal, pois não consegue dar ordens de modo organizado e falha em motivar sua equipe, agindo mais como um 'mascote' do que um líder. Ele sempre compartilha conhecimento, mas apenas quando solicitado. Em outras palavras, não é proativo."
      },
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

    if (this.texto) {
      this.texto.destroy();
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
          -30 + (this.sys.game.config.height / 2),
          proximaImagem.key
        )
        .setScale(0.5);

      this.texto = this.add.text(this.sys.game.config.width / 2, 200, proximaImagem.texto, {
        fontFamily: "pixelArtP",
        color: '#324891'
    }).setOrigin(0.5, 0).setWordWrapWidth(320).setScale(1);

      //Adiciona o botão de aprovado e reprovado, de acordo com os valores de pontuação definidos
      //Eles também são configurados para serem interativos, executando o método avaliarImagem() ao serem clicados

      this.botaoAprovado = this.add
        .image(250, (this.sys.game.config.height) - 30, "botaoaprovado")
        .setInteractive()
        .setScale(1.2)
        .setOrigin(0.5, 1)
        .on("pointerdown", () => {
          this.clickSound.play(); // Reproduz o som de clique
          this.avaliarImagem(proximaImagem.pontosAprovado);
        });

      this.botaoReprovado = this.add
        .image(
          550,
          (this.sys.game.config.height) - 30,
          "botaoreprovado"
        )
        .setInteractive()
        .setScale(1.2)
        .setOrigin(0.5, 1)
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
        backgroundColor: "#657eca",
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
