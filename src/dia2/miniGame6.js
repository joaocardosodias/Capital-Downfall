class miniGame6 extends Phaser.Scene {
  constructor() {
    super("miniGame6");
    this.pontuacaoM6 = 0;
    this.imagens = [];
    this.imagemAtual = null;
    this.botaoAprovado = null;
    this.botaoReprovado = null;
    this.placarTexto = null;
    this.cliqueSom = null; // Som de clique
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

    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet(
      "voltarAoMapa",
      "src/assets/telas_pontuacao/voltarAoMapa.png",
      { frameWidth: 400, frameHeight: 110 }
    );

    //  Cria as variáveis da tela de loading
    let barraProgresso = this.add.graphics();
    let caixaProgresso = this.add.graphics();
    caixaProgresso.fillStyle(0x222222, 0.8);
    caixaProgresso.fillRect(240, 270, 320, 50);

    //  Atualiza ao vivo a barra de progresso
    this.load.on("progress", function (value) {
      barraProgresso.clear();
      barraProgresso.fillStyle(0xffffff, 1);
      barraProgresso.fillRect(250, 280, 300 * value, 30);
    });

    //  Quando o jogo termina de carregar, a barra é destruída
    this.load.on("complete", function () {
      barraProgresso.destroy();
      caixaProgresso.destroy();
    });
  }

  create() {
    this.somFundo = this.sound.add("somFundo", { loop: true });
    this.somFundo.play();

    this.cameras.main.setBackgroundColor("#324891"); //Define a cor do plano de fundo

    //Coloca as imagens em um array, definindo uma key para cada um dos cards. Além disso, define a pontuação de cada resposta
    this.imagens = [
      {
        key: "bruna",
        pontosAprovado: 100,
        pontosReprovado: -50,
        texto:
          "Bruna é uma jovem empreendedora sempre em busca de soluções ágeis e oportunidades para expandir seus conhecimentos. Com uma liderança natural, ela toma decisões assertivas e inspira sua equipe, criando um ambiente motivador e colaborativo, no qual todos se sentem valorizados e impulsionados a alcançar os melhores resultados.",
      },
      {
        key: "amanda",
        pontosAprovado: 100,
        pontosReprovado: -50,
        texto:
          "Amanda é uma profissional altamente proativa, atuando com responsabilidade. Ela não se destaca pela sua liderança, mas se dispõe a aprender a ser líder. Além disso, Amanda busca constantemente superar as expectativas e entregar resultados de qualidade.",
      },
      {
        key: "vagner",
        pontosAprovado: 100,
        pontosReprovado: -50,
        texto:
          "Vagner é um empreendedor inovador, sempre buscando soluções otimizadas e novos aprendizados. Quanto a sua liderança, é capaz de motivar toda sua equipe, promovendo colaboração e respeito às diferenças. Além disso, constantemente supera desafios com excelência, sempre buscando a melhor solução para um problema.",
      },
      {
        key: "ana",
        pontosAprovado: -50,
        pontosReprovado: 100,
        texto:
          "Ana é uma profissional conservadora, optando utilizar as mesmas ferramentas que sempre usou. Também, não se dá bem como líder, pois não consegue motivar a equipe e evita tomar decisões próprias, preferindo seguir ordens dos outros. Além disso, não se comunica bem com seus colegas, guardando informações para si.",
      },
      {
        key: "pedro",
        pontosAprovado: -50,
        pontosReprovado: 100,
        texto:
          "Pedro é um jovem extrovertido, gostando de liderar e interagir com seus colégas. No entanto, sua liderança não é ideal, pois não consegue dar ordens de modo organizado e falha em motivar sua equipe, agindo mais como um 'mascote' do que um líder. Ele sempre compartilha conhecimento, mas apenas quando solicitado. Em outras palavras, não é proativo.",
      },
    ];

    this.imagens = Phaser.Utils.Array.Shuffle(this.imagens); //Utiliza um comando do Phaser para embaralhar a ordem dos itens do array

    //Cria o placar de pontuação
    this.placarTexto = this.add.text(20, 20, `Pontuação: ${this.pontuacaoM6}`, {
      fontFamily: "pixelArt",
      fill: "#FFFFFF",
    });

    // Carrega o som de clique
    this.cliqueSom = this.sound.add("click");

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
          -30 + this.sys.game.config.height / 2,
          proximaImagem.key
        )
        .setScale(0.5);

      this.texto = this.add
        .text(this.sys.game.config.width / 2, 200, proximaImagem.texto, {
          fontFamily: "pixelArtP",
          color: "#324891",
        })
        .setOrigin(0.5, 0)
        .setWordWrapWidth(320)
        .setScale(1);

      //Adiciona o botão de aprovado e reprovado, de acordo com os valores de pontuação definidos
      //Eles também são configurados para serem interativos, executando o método avaliarImagem() ao serem clicados

      this.botaoAprovado = this.add
        .image(250, this.sys.game.config.height - 30, "botaoaprovado")
        .setInteractive()
        .setScale(1.2)
        .setOrigin(0.5, 1)
        .on("pointerdown", () => {
          this.cliqueSom.play(); // Reproduz o som de clique
          this.avaliarImagem(proximaImagem.pontosAprovado);
        });

      this.botaoReprovado = this.add
        .image(550, this.sys.game.config.height - 30, "botaoreprovado")
        .setInteractive()
        .setScale(1.2)
        .setOrigin(0.5, 1)
        .on("pointerdown", () => {
          this.cliqueSom.play(); // Reproduz o som de clique
          this.avaliarImagem(proximaImagem.pontosReprovado);
        });
    } else {
      this.exibirResultadoFinal(); //Caso não hajam mais cards no array, inicia-se o método exibirResultadoFinal ()
    }
  }

  avaliarImagem(pontos) {
    //Adiciona a pontuação conforme o resultado passado para o método.
    pontuacao += pontos;
    this.pontuacaoM6 += pontos;

    if (pontos < 0) {
      this.sound.play("somErro");
    } else {
      this.sound.play("somAcerto");
    }

    this.placarTexto.setText(`Pontuação: ${this.pontuacaoM6}`); //Atualiza o placar

    //Inicia o método para exibir a próxima imagem
    this.exibirProximaImagem();
  }

  exibirResultadoFinal() {
    this.sound.play("conclusao");
    this.add.rectangle(400, 300, 800, 600, 0x324891).setDepth(30).setAlpha(1);
    miniGame6.fim = this.add.image(400, 300, "fim").setDepth(31);

    // Criação da tela de pontuação
    this.add
      .text(402, 311, this.pontuacaoM6, {
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
      key: "voltarAoMapaM6",
      frames: this.anims.generateFrameNumbers("voltarAoMapa", {
        start: 0,
        end: 11,
      }),
      frameRate: 6,
      repeat: -1,
    });

    this.voltarAoMapaM6 = this.add
      .sprite(695, 530, "voltarAoMapa")
      .setInteractive()
      .setDepth(32);

    this.voltarAoMapaM6.anims.play("voltarAoMapaM6", true);

    this.voltarAoMapaM6.on("pointerdown", () => {
      this.somFundo.stop();
      this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
      minigame6Jogado = true;
      this.scene.wake("hub2");
      musicaHub2.resume();
      this.scene.stop("miniGame6");
    });
  }
}
