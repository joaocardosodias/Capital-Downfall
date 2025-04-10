//Cria a cena de preload dos assets do jogo

class preload extends Phaser.Scene {
  constructor() {
    super("preload");
    this.personagens = ["Mary", "Mark", "Margaret", "Steve"];
    this.estadosBotoes = ["", "Selecao", "Selecionado", "SelecionadoSelecao"];
  }

  // Preload dos assets
  preload() {
    //  Cria as variáveis da tela de loading
    let barraProgresso = this.add.graphics();
    let caixaProgresso = this.add.graphics();
    caixaProgresso.fillStyle(0x222222, 0.8);
    caixaProgresso.fillRect(240, 270, 320, 50);

    let textoLoading = this.make.text({
      x: 400,
      y: 230,
      text: "Carregando...",
      style: {
        font: "28px pixelArt",
        fill: "#ffffff",
      },
    });
    textoLoading.setOrigin(0.5, 0.5);

    //  Atualiza ao vivo a barra de progresso
    this.load.on("progress", function (value) {
      barraProgresso.clear();
      barraProgresso.fillStyle(0xffffff, 1);
      barraProgresso.fillRect(250, 280, 300 * value, 30);
    });

    //  Quando o jogo termina de carregar, a barra é destruída
    this.load.on("complete", () => {
      textoLoading.setText("Carregado!")
      let iniciar = this.add.image(400, 380, "botaoComecar").setInteractive();
      iniciar.on("pointerdown", () => {
        barraProgresso.destroy();
        caixaProgresso.destroy();
        textoLoading.destroy();
        this.scene.stop("preload");
        this.scene.start("menuInicial");
      });

      this.selecao = this.add.image(400, 380, "selecao").setVisible(false).setDepth(100);
      iniciar.on("pointerover", () => {
        this.selecao.setVisible(true);
      });
      iniciar.on("pointerout", () => {
        this.selecao.setVisible(false);
      });
    });

    //Preload dos áudios utilizados:

    //Músicas de fundo
    this.load.audio("musicaIntro", "src/assets/sounds/rockMusicaHub.mp3"); // Carrega a música da Tela Inicial
    this.load.audio("musicaHub", "src/assets/sounds/jazzyMusicaHub1.mp3"); // Carrega a música da Hub 1
    this.load.audio("musicaHub2", "src/assets/sounds/jazzyMusicaHub2.mp3"); // Carrega a música da Hub 2
    this.load.audio("musicaHubFinal", "src/assets/sounds/musicaSalaGuerra.mp3"); // Carrega a música da Sala de Guerra
    this.load.audio("somFundo", "src/assets/sounds/escritorioFlow.mp3"); // Carrega os sons de fundo dos minigames

    //Sons da hub/ material de apoio
    this.load.audio("passos", "src/assets/sounds/passos.mp3"); // Carrega o som dos passos
    this.load.audio("interacaoMinigame", "src/assets/sounds/openMinigame.mp3"); // Carrega o som de interação com o minigame
    this.load.audio("abrirMinigame", "src/assets/sounds/openMinigame.mp3"); // Carrega o som de transição para os minigames
    this.load.audio("sairApoio", "src/assets/sounds/closeMinigame.mp3"); // Carrega o som de sair do apoio

    //Sons de clique
    this.load.audio("somAdiante", "src/assets/sounds/clique.mp3");
    this.load.audio("clique", "src/assets/sounds/clique.mp3");
    this.load.audio("click", "src/assets/sounds/clique.mp3");

    //Sons de interação
    this.load.audio("musicaFundo", "src/assets/sounds/escritorioFlow.mp3");
    this.load.audio("somAcerto", "src/assets/sounds/beepAcerto.mp3");
    this.load.audio("somErro", "src/assets/sounds/beepErro.mp3");
    this.load.audio("somFinalizar", "src/assets/sounds/taskSucess.mp3");
    this.load.audio("somMovimento", "src/assets/sounds/movePostIt.mp3");
    this.load.audio("conclusao", "src/assets/sounds/taskSucess.mp3");
    this.load.audio("carimbo", "src/assets/sounds/carimbo.mp3");
    this.load.audio("canetaEscrevendo", "src/assets/sounds/scratchPencil.mp3");

    //Sons da animação do jornal caindo na mesa
    this.load.audio("voando", "src/assets/dia2/animacao/voando.wav");
    this.load.audio("caiu", "src/assets/dia2/animacao/caiu.wav");

    //Preload das imagens utilizadas:

    //Assets da cena base

    this.load.spritesheet(
      "notificacao",
      "src/assets/materiais_apoio/notificacao.png",
      { frameWidth: 32, frameHeight: 64 }
    );
    this.load.image("tablet", "src/assets/materiais_apoio/tablet.png");

    //Assets da Tela Inicial e Tela de Créditos

    this.load.spritesheet("menu", "src/assets/intro/menuInicial.png", {
      frameWidth: 800,
      frameHeight: 600,
    });

    this.load.image("botaoIniciar", "src/assets/intro/botaoIniciar.png");
    this.load.image("botaoCreditos", "src/assets/intro/botaoCreditos.png");

    this.load.image("fundoEspaco", "src/assets/creditos_favicon/fundoEspaco.png")
    this.load.image("logoInteli", "src/assets/creditos_favicon/inteli.png")

    //Assets do Contrato Inicial

    this.load.image("imailFundo", "src/assets/materiais_apoio/Slick.png");
    this.load.image(
      "botaoProximo",
      "src/assets/materiais_apoio/botaoProximo.png"
    );
    this.load.image(
      "botaoAnterior",
      "src/assets/materiais_apoio/botaoAnterior.png"
    );
    this.load.image(
      "botaoComecar",
      "src/assets/materiais_apoio/botaoComecar.png"
    );
    this.load.image("selecao", "src/assets/materiais_apoio/selecao.png");
    this.load.image(
      "selecaoDesistir",
      "src/assets/materiais_apoio/selecaoDesistir.png"
    );

    //Assets da Seleção dos Personagens

    for (let i = 0; i < this.personagens.length; i++) {
      for (let u = 0; u < 4; u++) {
        this.load.image(
          "botao" + this.personagens[i] + this.estadosBotoes[u],
          "src/assets/intro/selecaoPersonagens/botao" +
          this.personagens[i] +
          this.estadosBotoes[u] +
          ".png"
        );
      }
    }
    this.load.image(
      "botaoSelecionarAtivado",
      "src/assets/intro/selecaoPersonagens/botaoSelecionarAtivado.png"
    );
    this.load.image(
      "botaoSelecionarDesativado",
      "src/assets/intro/selecaoPersonagens/botaoSelecionarDesativado.png"
    );

    this.load.image(
      "fundo",
      "src/assets/intro/selecaoPersonagens/background.png"
    );

    //Assets da Hub 1

    this.load.image("chefe", "src/assets/hub/chefe.png");
    this.load.spritesheet("balaoFala", "src/assets/hub/balaoFala.png", {
      frameWidth: 149,
      frameHeight: 60,
    });
    this.load.image("tiles", "src/assets/hub/tileset.png");
    this.load.image("player", "src/assets/players/player.png");
    this.load.tilemapTiledJSON("hub", "src/assets/hub/tilemap.json");
    this.load.image("colisao", "src/assets/hub/colisao.png");
    this.load.spritesheet("avisoMinigame", "src/assets/hub/aviso.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet(
      "playerSpritesheetMary",
      "src/assets/players/marySpritesheet.png",
      { frameWidth: 32, frameHeight: 64 }
    );
    this.load.spritesheet(
      "playerSpritesheetMark",
      "src/assets/players/markSpritesheet.png",
      { frameWidth: 32, frameHeight: 64 }
    );
    this.load.spritesheet(
      "playerSpritesheetMargaret",
      "src/assets/players/margaretSpritesheet.png",
      { frameWidth: 32, frameHeight: 64 }
    );
    this.load.spritesheet(
      "playerSpritesheetSteve",
      "src/assets/players/steveSpritesheet.png",
      { frameWidth: 32, frameHeight: 64 }
    );

    //Assets do Apoio Geral

    this.load.image(
      "imailFundoGeral",
      "src/assets/materiais_apoio/SlickGeral.png"
    );

    for (let i = 1; i <= 6; i++) {
      this.load.image(
        "botaoMinigame" + i,
        "src/assets/materiais_apoio/botaoMinigame" + i + ".png"
      );
      this.load.image(
        "botaoMinigame" + i + "Selecionado",
        "src/assets/materiais_apoio/botaoMinigame" + i + "Selecionado.png"
      );
    }

    this.load.image(
      "botaoListaTermos",
      "src/assets/materiais_apoio/botaoListaTermos.png"
    );

    this.load.image(
      "botaoProximo",
      "src/assets/materiais_apoio/botaoProximo.png"
    );

    this.load.image(
      "botaoAnterior",
      "src/assets/materiais_apoio/botaoAnterior.png"
    );

    this.load.image(
      "botaoDesistir",
      "src/assets/materiais_apoio/botaoDesistir.png"
    );

    //Assets do Apoio do Dia 1

    this.load.image("imailFundo", "src/assets/materiais_apoio/Slick.png");
    this.load.image(
      "imailFundoCelebracao",
      "src/assets/materiais_apoio/SlickCelebracao.png"
    );
    this.load.image(
      "imailFundoGeral",
      "src/assets/materiais_apoio/SlickGeral.png"
    );
    this.load.image(
      "botaoProximo",
      "src/assets/materiais_apoio/botaoProximo.png"
    );
    this.load.image(
      "botaoAnterior",
      "src/assets/materiais_apoio/botaoAnterior.png"
    );
    this.load.image(
      "botaoDesistir",
      "src/assets/materiais_apoio/botaoDesistir.png"
    );
    this.load.image(
      "botaoDesistirApoioGeral",
      "src/assets/materiais_apoio/botaoDesistirApoioGeral.png"
    );
    this.load.image(
      "botaoComecar",
      "src/assets/materiais_apoio/botaoComecar.png"
    );
    this.load.image(
      "botaoMinigame1",
      "src/assets/materiais_apoio/botaoMinigame1.png"
    );
    this.load.image(
      "botaoMinigame1Selecionado",
      "src/assets/materiais_apoio/botaoMinigame1Selecionado.png"
    );
    this.load.image(
      "botaoMinigame2",
      "src/assets/materiais_apoio/botaoMinigame2.png"
    );
    this.load.image(
      "botaoMinigame2Selecionado",
      "src/assets/materiais_apoio/botaoMinigame2Selecionado.png"
    );
    this.load.image(
      "botaoMinigame3",
      "src/assets/materiais_apoio/botaoMinigame3.png"
    );
    this.load.image(
      "botaoMinigame3Selecionado",
      "src/assets/materiais_apoio/botaoMinigame3Selecionado.png"
    );
    this.load.image(
      "botaoMinigame4",
      "src/assets/materiais_apoio/botaoMinigame4.png"
    );
    this.load.image(
      "botaoMinigame4Selecionado",
      "src/assets/materiais_apoio/botaoMinigame4Selecionado.png"
    );
    this.load.image(
      "botaoMinigame5",
      "src/assets/materiais_apoio/botaoMinigame5.png"
    );
    this.load.image(
      "botaoMinigame5Selecionado",
      "src/assets/materiais_apoio/botaoMinigame5Selecionado.png"
    );
    this.load.image(
      "botaoMinigame6",
      "src/assets/materiais_apoio/botaoMinigame6.png"
    );
    this.load.image(
      "botaoMinigame6Selecionado",
      "src/assets/materiais_apoio/botaoMinigame6Selecionado.png"
    );

    this.load.image(
      "botaoListaTermos",
      "src/assets/materiais_apoio/botaoListaTermos.png"
    );

    this.load.image("selecao", "src/assets/materiais_apoio/selecao.png");
    this.load.image(
      "selecaoDesistir",
      "src/assets/materiais_apoio/selecaoDesistir.png"
    );

    //Assets do Minigame 1

    this.load.image("botaoIniciar", "src/assets/botao/botaoIniciar.png");
    this.load.image("gavetas", "src/assets/dia1/miniGame1/gavetas.png");

    for (let i = 1; i <= 10; i++) {
      this.load.image(
        "card" + i,
        "src/assets/dia1/miniGame1/card" + i + ".png"
      );
    }

    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet(
      "voltarAoMapa",
      "src/assets/telas_pontuacao/voltarAoMapa.png",
      { frameWidth: 400, frameHeight: 110 }
    );

    //Assets do Minigame 2

    this.load.image("fundoMinigame2", "src/assets/dia1/miniGame2/fundo.png");

    for (let i = 1; i <= 4; i++) {
      for (let u = 1; u <= 8; u++) {
        this.load.image(
          "botao" + i + "-" + u,
          "src/assets/dia1/miniGame2/botao" + i + "-" + u + ".png"
        );
      }
    }

    for (let i = 1; i <= 4; i++) {
      for (let u = 1; u <= 8; u++) {
        this.load.image(
          "botao" + i + "Pressionado-" + u,
          "src/assets/dia1/miniGame2/botao" + i + "Apertado-" + u + ".png"
        );
      }
    }

    this.load.image("selecaoM2", "src/assets/dia1/miniGame2/selecao.png");

    this.load.image("carimboV", "src/assets/dia1/miniGame2/carimboV.png");
    this.load.image("carimboF", "src/assets/dia1/miniGame2/carimboF.png");

    //Carrega as imagens dos perfis
    for (let i = 1; i <= 8; i++) {
      this.load.image(
        "perfil" + i,
        "src/assets/dia1/miniGame2/perfil" + i + ".png"
      );
    }

    //Assets do Minigame 3

    this.load.image("timeline", "src/assets/dia1/miniGame3/Timeline.png");
    this.load.image(
      "botaoVerificar",
      "src/assets/dia1/miniGame3/botaoVerificar.png"
    ); // Imagem do botão de verificação
    this.load.image("3card1", "src/assets/dia1/miniGame3/card1.png");
    this.load.image("3card2", "src/assets/dia1/miniGame3/card2.png");
    this.load.image("3card3", "src/assets/dia1/miniGame3/card3.png");
    this.load.image("3card4", "src/assets/dia1/miniGame3/card4.png");
    this.load.image("3card5", "src/assets/dia1/miniGame3/card5.png");

    //Assets do Miniboss 1

    // Carrega os elementos da cena
    // Estrutura de repetição para carregar as 9 perguntas, as 9 imagens de feedback correto e as 9 imagens de feedback negativo
    for (let i = 1; i <= 9; i++) {
      this.load.image(
        `pergunta${i}`,
        `src/assets/dia1/miniBossDia1/pergunta${i}.png`
      );
    }
    this.load.image("botao", "src/assets/dia1/miniBossDia1/botao.png");
    this.load.image(
      "botaoVoltar",
      "src/assets/dia1/miniBossDia1/botaoVoltar.png"
    );

    this.load.image(
      "fundoMiniboss",
      "src/assets/dia1/miniBossDia1/fundoMiniboss.png"
    );
    this.load.image(
      "botaoResposta",
      "src/assets/dia1/miniBossDia1/botaoResposta.png"
    );
    this.load.image(
      "telaFeedback",
      "src/assets/dia1/miniBossDia1/telaFeedbackMiniboss.png"
    );
    this.load.spritesheet(
      "proximaPergunta",
      "src/assets/dia1/miniBossDia1/proximaPergunta.png",
      { frameWidth: 394, frameHeight: 120 }
    );
    this.load.image("correto", "src/assets/dia1/miniBossDia1/correto.png");
    this.load.image("errado", "src/assets/dia1/miniBossDia1/errado.png");

    this.load.image("fim", "src/assets/telas_pontuacao/telaPontuacao.png");
    this.load.spritesheet(
      "voltarAoMapa",
      "src/assets/telas_pontuacao/voltarAoMapa.png",
      { frameWidth: 400, frameHeight: 110 }
    );

    //Assets do Final do Dia 1

    this.load.image(
      "jornalCrescimento",
      "src/assets/telas_pontuacao/jornalCrescimento.png"
    );
    this.load.image(
      "jornalFalido",
      "src/assets/telas_pontuacao/jornalFalido.png"
    );
    this.load.image(
      "jornalSemCrescimento",
      "src/assets/telas_pontuacao/jornalSemCrescimento.png"
    );
    this.load.spritesheet("continuar", "src/assets/telas_pontuacao/continuarSheet.png",
      { frameWidth: 172, frameHeight: 60 }
    );
    this.load.spritesheet("gameOver", "src/assets/telas_pontuacao/gameOverSheet.png",
      { frameWidth: 172, frameHeight: 60 }
    );

    //Assets do Minigame 4

    this.load.image(
      "backgroundMinigame4",
      "src/assets/dia2/miniGame4/background.png"
    ); // Carrega o fundo da cena
    this.load.image(
      "enunciadoMinigame4",
      "src/assets/dia2/miniGame4/enunciado.png"
    ); // Carrega a imagem do enunciado
    this.load.image("cartao1", "src/assets/dia2/miniGame4/botaoICMS.png"); // Carrega a imagem do card 1
    this.load.image("cartao2", "src/assets/dia2/miniGame4/botaoIPI.png"); // Carrega a imagem do card 2
    this.load.image("cartao3", "src/assets/dia2/miniGame4/botaoIOF.png"); // Carrega a imagem do card 3
    this.load.image("cartao4", "src/assets/dia2/miniGame4/botaoISS.png"); // Carrega a imagem do card 4
    this.load.image(
      "botaoFinalizar",
      "src/assets/dia2/miniGame4/botaoVerificar.png"
    ); // Carrega a imagem do botão de finalizar

    this.load.image(
      "backgroundMinigame4",
      "src/assets/dia2/miniGame4/background.jpg"
    ); // Carrega o fundo da cena
    this.load.image(
      "pergunta1Minigame4",
      "src/assets/dia2/miniGame4/pergunta1.png"
    ); // Carrega a imagem da pergunta do card 1
    this.load.image(
      "pergunta2Minigame4",
      "src/assets/dia2/miniGame4/pergunta2.png"
    ); // Carrega a imagem da pergunta do card 2
    this.load.image(
      "pergunta3Minigame4",
      "src/assets/dia2/miniGame4/pergunta3.png"
    ); // Carrega a imagem da pergunta do card 3
    this.load.image(
      "pergunta4Minigame4",
      "src/assets/dia2/miniGame4/pergunta4.png"
    ); // Carrega a imagem da pergunta do card 4
    this.load.image(
      "botaoVermelho",
      "src/assets/dia2/miniGame4/botaoVermelho.png"
    ); // Carrega o botão vermelho
    this.load.image("botaoAzul", "src/assets/dia2/miniGame4/botaoAzul.png"); // Carrega o botão azul
    this.load.image("botaoVerde", "src/assets/dia2/miniGame4/botaoVerde.png"); // Carrega o botão verde
    this.load.image("botaoPreto", "src/assets/dia2/miniGame4/botaoPreto.png"); // Carrega o botão preto
    this.load.image("borracha", "src/assets/dia2/miniGame4/borracha.png"); // Carrega a borracha
    this.load.image(
      "botaoVoltarMinigame4",
      "src/assets/dia2/miniGame4/botaoVoltar.png"
    ); // Carrega o botão de voltar
    this.load.image("botaoLimpar", "src/assets/dia2/miniGame4/botaoLimpar.png"); // Carrega o botão de limpar
    this.load.image(
      "botaoAumentar",
      "src/assets/dia2/miniGame4/botaoAumentar.png"
    ); // Carrega o botão de aumentar espessura
    this.load.image(
      "botaoDiminuir",
      "src/assets/dia2/miniGame4/botaoDIminuir.png"
    ); // Carrega o botão de diminuir espessura

    //Assets do Minigame 5

    this.load.image(
      "imobiliarioCard",
      "src/assets/dia2/miniGame5/imobiliariosCard.png"
    );
    this.load.image(
      "multimercadoCard",
      "src/assets/dia2/miniGame5/multimercadoCard.png"
    );
    this.load.image(
      "privatyequityCard",
      "src/assets/dia2/miniGame5/privatyequityCard.png"
    );
    this.load.image(
      "rendafixaCard",
      "src/assets/dia2/miniGame5/rendafixaCard.png"
    );
    this.load.image("acoesCard", "src/assets/dia2/miniGame5/acoesCard.png");

    //Carrega imagens das definições (lado direito)

    this.load.image(
      "imobiliarioDefinition",
      "src/assets/dia2/miniGame5/imobiliario_def.png"
    );
    this.load.image(
      "multimercadoDefinition",
      "src/assets/dia2/miniGame5/multimercado_def.png"
    );
    this.load.image(
      "privatyequityDefinition",
      "src/assets/dia2/miniGame5/privatyequity_def.png"
    );
    this.load.image(
      "rendafixaDefinition",
      "src/assets/dia2/miniGame5/rendafixa_def.png"
    );
    this.load.image(
      "acoesDefinition",
      "src/assets/dia2/miniGame5/acoes_def.png"
    );

    //Carrega os assets gerais do Minigame 5

    this.load.image("background", "src/assets/dia2/miniGame5/background.png");
    this.load.image("arrow", "src/assets/dia2/miniGame5/arrow.png");
    this.load.image("enunciado", "src/assets/dia2/miniGame5/enunciado.png");

    //Assets do Minigame 6

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

    //Assets da animação do jornal

    this.load.image("jornal", "src/assets/dia2/animacao/jornal.png");
    this.load.image("mesa", "src/assets/dia2/animacao/mesa.png");
    this.load.image("fundoAnimacao", "src/assets/dia2/animacao/fundo.png");
    this.load.image("posicaoFinal", "src/assets/dia2/animacao/posicaoFinal.png");
    this.load.image("proximaTela", "src/assets/dia2/animacao/proximaTela.png");

    //Assets da Hub Final

    this.load.image("tiles", "src/assets/hub/tileset.png");
    this.load.image("player", "src/assets/players/player.png");
    this.load.tilemapTiledJSON("hubFinal", "src/assets/hub/tilemap2.json");

    //Assets da Sala de Guerra

    this.load.image(
      "fundoPerguntas",
      "src/assets/dia2/salaDeGuerra/fundoPergunta.png"
    );
    this.load.image(
      "fundoTimer",
      "src/assets/dia2/salaDeGuerra/fundoTimer.png"
    );
    this.load.image(
      "botaoFinal",
      "src/assets/dia2/salaDeGuerra/botaoFinal.png"
    );
    // Assets criados por brullov, disponível em: https://brullov.itch.io/fire-animation
    this.load.spritesheet(
      "fogo1",
      "src/assets/dia2/salaDeGuerra/burning_loop_1.png",
      { frameWidth: 64, frameHeight: 92 }
    );
    this.load.spritesheet(
      "fogo2",
      "src/assets/dia2/salaDeGuerra/burning_loop_2.png",
      { frameWidth: 48, frameHeight: 72 }
    );
    this.load.spritesheet(
      "fogo3",
      "src/assets/dia2/salaDeGuerra/burning_loop_3.png",
      { frameWidth: 32, frameHeight: 96 }
    );
    this.load.spritesheet(
      "fogo4",
      "src/assets/dia2/salaDeGuerra/burning_loop_4.png",
      { frameWidth: 20, frameHeight: 80 }
    );
    this.load.spritesheet(
      "fogo5",
      "src/assets/dia2/salaDeGuerra/burning_loop_5.png",
      { frameWidth: 16, frameHeight: 32 }
    );
  }
}
