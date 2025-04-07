class miniGame2 extends baseCena {
  constructor(
    perfil1,
    botao1,
    botao2,
    botao3,
    botao4,
    perfisRestantes,
    perfilIndex,
    carimbo,
    textoPontuacao,
    textoMudancaPontuacao,
    fim,
    botaoVoltar,
    respostaEmAndamento
  ) {
    super("miniGame2");

    this.pontuacaoM2 = 0;
    this.perfil1 = perfil1;
    this.botao1 = botao1;
    this.botao2 = botao2;
    this.botao3 = botao3;
    this.botao4 = botao4;
    this.perfisRestantes = perfisRestantes;
    this.perfilIndex = perfilIndex;
    this.carimbo = carimbo;
    this.textoPontuacao = textoPontuacao;
    this.textoMudancaPontuacao = textoMudancaPontuacao;
    this.fim = fim;
    this.botaoVoltar = botaoVoltar;
    this.respostaEmAndamento = respostaEmAndamento;
    this.musicaFundo;
  }

  create() {
    miniGame2.perfisRestantes = [];
    miniGame2.perfilIndex = 0;
    miniGame2.respostaEmAndamento = false;

    // Cria uma array de objetos chamados perfis, cada perfil tem um nome e uma resposta
    let perfis = [
      { nome: "perfil1", resposta: 1, pergunta: 1 },
      { nome: "perfil2", resposta: 2, pergunta: 2 },
      { nome: "perfil3", resposta: 3, pergunta: 3 },
      { nome: "perfil4", resposta: 4, pergunta: 4 },
      { nome: "perfil5", resposta: 1, pergunta: 5 },
      { nome: "perfil6", resposta: 2, pergunta: 6 },
      { nome: "perfil7", resposta: 3, pergunta: 7 },
      { nome: "perfil8", resposta: 4, pergunta: 8 },
    ];

    // Embaralha os perfis e pega 5 aleatórios
    Phaser.Utils.Array.Shuffle(perfis);
    perfis = perfis.slice(0, 4);

    this.cliqueSom = this.sound.add("clique");
    this.musicaFundo = this.sound.add("musicaFundo"); // Adiciona o som da música de fundo
    this.musicaFundo.setLoop(true); // Define que a música de fundo deve ser repetida
    this.musicaFundo.play(); // Inicia a música de fundo

    // Fundo
    this.add.image(0, 0, "fundoMinigame2").setDepth(-10).setOrigin(0, 0);

    // Criação do primeiro perfil
    miniGame2.perfil1 = this.add
      .image(400, 230, perfis[miniGame2.perfilIndex].nome)
      .setScale(1)
      .setDepth(10);

    // Armazena os perfis restantes no array perfisRestantes
    for (let i = 1; i < perfis.length; i++) {
      let perfil = this.add
        .image(
          400 + i * 20 + Phaser.Math.Between(0, 10),
          Phaser.Math.Between(220, 245),
          perfis[i].nome
        )
        .setScale(1)
        .setDepth(-i);

      miniGame2.perfisRestantes.push(perfil); // Adiciona os perfis restantes no array
    }

    // Adiciona no canto superior esquerdo um texto com a pontuação atual do jogador
    miniGame2.textoPontuacao = this.add
      .text(20, 40, "Pontuação: " + this.pontuacaoM2, {
        fontFamily: "pixelArt",
        fill: "#ffffff",
      })
      .setDepth(15);

    this.selecaoM2 = this.add
      .image(0, 0, "selecaoM2")
      .setDepth(10)
      .setVisible(false);

    // Criação dos botões
    miniGame2.botao1 = this.add
      .image(400, 500, "botao1-" + perfis[miniGame2.perfilIndex].pergunta)
      .setScale(1)
      .setInteractive()
      .setDepth(10)
      .setOrigin(1, 1);

    miniGame2.botao2 = this.add
      .image(400, 500, "botao2-" + perfis[miniGame2.perfilIndex].pergunta)
      .setScale(1)
      .setInteractive()
      .setDepth(10)
      .setOrigin(0, 1);

    miniGame2.botao3 = this.add
      .image(400, 500, "botao3-" + perfis[miniGame2.perfilIndex].pergunta)
      .setScale(1)
      .setInteractive()
      .setDepth(10)
      .setOrigin(1, 0);

    miniGame2.botao4 = this.add
      .image(400, 500, "botao4-" + perfis[miniGame2.perfilIndex].pergunta)
      .setScale(1)
      .setInteractive()
      .setDepth(10)
      .setOrigin(0, 0);

    // Animação de aumento ao passar o mouse sobre os botões

    if (!miniGame2.respostaEmAndamento) {
      miniGame2.botao1.on("pointerover", () => {
        this.selecaoM2.setPosition(332, 453).setVisible(true).setDepth(100);
      });
      miniGame2.botao1.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });

      miniGame2.botao2.on("pointerover", () => {
        this.selecaoM2.setPosition(468, 453).setVisible(true).setDepth(100);
      });
      miniGame2.botao2.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });

      miniGame2.botao3.on("pointerover", () => {
        this.selecaoM2.setPosition(332, 539).setVisible(true).setDepth(100);
      });
      miniGame2.botao3.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });

      miniGame2.botao4.on("pointerover", () => {
        this.selecaoM2.setPosition(468, 539).setVisible(true).setDepth(100);
      });
      miniGame2.botao4.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });
    } else {
      this.selecaoM2.setVisible(false);
    }

    // Eventos de clique nos botões
    miniGame2.botao1.on("pointerdown", () => {
      if (!miniGame2.respostaEmAndamento) {
        this.sound.play("carimbo"); // Reproduz o som de clique
        this.responder(1, perfis);
        miniGame2.botao1.setTexture(
          "botao1Pressionado-" + perfis[miniGame2.perfilIndex].pergunta
        );
      }
    });

    miniGame2.botao2.on("pointerdown", () => {
      if (!miniGame2.respostaEmAndamento) {
        this.sound.play("carimbo"); // Reproduz o som de clique
        this.responder(2, perfis);
        miniGame2.botao2.setTexture(
          "botao2Pressionado-" + perfis[miniGame2.perfilIndex].pergunta
        );
      }
    });

    miniGame2.botao3.on("pointerdown", () => {
      if (!miniGame2.respostaEmAndamento) {
        this.sound.play("carimbo"); // Reproduz o som de clique
        this.responder(3, perfis);
        miniGame2.botao3.setTexture(
          "botao3Pressionado-" + perfis[miniGame2.perfilIndex].pergunta
        );
      }
    });

    miniGame2.botao4.on("pointerdown", () => {
      if (!miniGame2.respostaEmAndamento) {
        this.sound.play("carimbo"); // Reproduz o som de clique
        this.responder(4, perfis);
        miniGame2.botao4.setTexture(
          "botao4Pressionado-" + perfis[miniGame2.perfilIndex].pergunta
        );
      }
    });
  }

  responder(respostaJogador, perfis) {
    miniGame2.respostaEmAndamento = true; // Marca que uma resposta está em andamento
    // Desabilita os botões para evitar múltiplas respostas
    miniGame2.botao1.setInteractive(false);
    miniGame2.botao2.setInteractive(false);
    miniGame2.botao3.setInteractive(false);
    miniGame2.botao4.setInteractive(false);

    let respostaCerta = perfis[miniGame2.perfilIndex].resposta;

    // Verifica se a resposta do jogador está correta
    if (respostaJogador === respostaCerta) {
      this.pontuacaoM2 += 100; // Aumenta a pontuação
      this.sound.play("somAcerto", { volume: 2 }); // Reproduz o som de acerto
      // Adiciona uma imagem de certo na tela
      miniGame2.carimbo = this.add
        .image(400, Phaser.Math.Between(150, 330), "carimboV")
        .setRotation(Phaser.Math.DegToRad(Phaser.Math.Between(-30, 30)))
        .setDepth(15);

      // Adiciona um texto ao lado que mostra que o jogador ganhou 100 pontos
      miniGame2.textoMudancaPontuacao = this.add
        .text(20, 400, "+100 pontos", {
          fontFamily: "pixelArt",
          fill: "#00cc00", // Cor do texto: verde
        })
        .setDepth(15);
    } else {
      // Se o jogador errou
      this.pontuacaoM2 -= 50; // Ele perde 50 pontos]
      this.sound.play("somErro", { volume: 2 }); // Reproduz o som de erro
      // Uma imagem de 'errado'(X) é adicionada a tela
      miniGame2.carimbo = this.add
        .image(400, Phaser.Math.Between(150, 330), "carimboF")
        .setRotation(Phaser.Math.DegToRad(Phaser.Math.Between(-30, 30)))
        .setDepth(15);

      // Adiciona um texto ao lado que mostra que o jogador perdeu 50 pontos
      miniGame2.textoMudancaPontuacao = this.add
        .text(20, 400, "-50 pontos", {
          fontFamily: "pixelArt",
          fill: "#cc0000", // Cor do texto: vermelha
        })
        .setDepth(15);
    }

    // Faz o texto do lado subir
    this.tweens.add({
      targets: miniGame2.textoMudancaPontuacao, // O objeto que será animado
      y: 50, // Posição até onde o texto vai subir
      alpha: 0, // Faz o texto desaparecer gradualmente
      duration: 2000, // A animação dura 2 segundos
      ease: "Power2", // Usa a curva de suavização "Power2" (aceleração suave)
      onComplete: () => {
        this.sound.play("somMovimento", { volume: 2 }); // Reproduz o som de movimento
        miniGame2.textoMudancaPontuacao.destroy(); // Após a animação ser completada, remove o texto da tela
      },
    });

    // Atualiza o placar
    miniGame2.textoPontuacao.setText("Pontuação: " + this.pontuacaoM2);

    // Anima a exibição do carimbo
    this.tweens.add({
      targets: miniGame2.carimbo,
      alpha: 1, // Fica visível
      duration: 1000,
      ease: "Power2",
      onComplete: () => {
        // Quando a animação terminar...
        this.time.delayedCall(500, () => miniGame2.carimbo.destroy()); // Remove a imagem do carimbo após 500ms
        this.animaPerfilSubindo(perfis); // Chama a próxima função
      },
    });
  }

  animaPerfilSubindo(perfis) {
    // Move o perfil, os botões e o carimbo para cima
    this.tweens.add({
      targets: [miniGame2.perfil1, miniGame2.carimbo], // Elementos que serão animados
      y: -200, // Posição até qual eles vão subir
      duration: 1000,
      ease: "Power2",
      onComplete: () => {
        miniGame2.perfilIndex++; // Adiciona uma unidade ao perfilIndex
        if (miniGame2.perfilIndex < 4) {
          // Se ainda houver perfis, troca a imagem do perfil e reposiciona os outros
          miniGame2.perfil1.setTexture(perfis[miniGame2.perfilIndex].nome);
          miniGame2.perfil1.setY(230); // Restaura a posição Y do perfil para o valor inicial

          miniGame2.respostaEmAndamento = false; // Permite novas respostas após essa animação
          // Os botões voltam a ser interativos, ou seja, o jogo volta a aceitar novas respostas
          miniGame2.botao1.setTexture(
            "botao1-" + perfis[miniGame2.perfilIndex].pergunta
          );
          miniGame2.botao2.setTexture(
            "botao2-" + perfis[miniGame2.perfilIndex].pergunta
          );
          miniGame2.botao3.setTexture(
            "botao3-" + perfis[miniGame2.perfilIndex].pergunta
          );
          miniGame2.botao4.setTexture(
            "botao4-" + perfis[miniGame2.perfilIndex].pergunta
          );

          miniGame2.botao1.setInteractive(true);
          miniGame2.botao2.setInteractive(true);
          miniGame2.botao3.setInteractive(true);
          miniGame2.botao4.setInteractive(true);

          // Chama a função que anima os perfis restantes para a esquerda
          this.animaPerfisEsquerda(perfis);
        } else {
          // Se não houver mais perfis, vai para a próxima cena
          this.sound.play("conclusao");
          this.add
            .rectangle(400, 300, 800, 600, 0x324891)
            .setDepth(30)
            .setAlpha(1);
          miniGame2.fim = this.add.image(400, 300, "fim").setDepth(31);

          pontuacao += this.pontuacaoM2;

          // Criação da tela de pontuação
          this.add
            .text(402, 311, this.pontuacaoM2, {
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
            key: "voltarAoMapaM2",
            frames: this.anims.generateFrameNumbers("voltarAoMapa", {
              start: 0,
              end: 11,
            }),
            frameRate: 6,
            repeat: -1,
          });

          this.voltarAoMapaM2 = this.add
            .sprite(695, 530, "voltarAoMapa")
            .setInteractive()
            .setDepth(32);

          this.voltarAoMapaM2.anims.play("voltarAoMapaM2", true);

          this.voltarAoMapaM2.on("pointerdown", () => {
            if (!transicionando) {
              this.musicaFundo.stop();
              this.cliqueSom.play(); // Reproduz o som de clique ao clicar no botão Voltar
              minigame2Jogado = true;
              this.transicao('hub', false, false, true, 200,);
              musicaHub.resume();
            }
          });
        }
      },
    });
  }

  animaPerfisEsquerda(perfis) {
    let perfilRemovido = miniGame2.perfisRestantes.shift(); // Remove o primeiro perfil da lista
    perfilRemovido.destroy(); // Remove a imagem do perfil da tela

    // Atualiza a lista de perfis restantes após remoção
    for (let i = 0; i < miniGame2.perfisRestantes.length; i++) {
      let perfil = miniGame2.perfisRestantes[i];
      // Adiciona a animação que move os perfis restantes para a esquerda
      this.tweens.add({
        targets: perfil,
        x: perfil.x - 20, // Move o perfil para a esquerda
        duration: 500, // Duração da animação, 500ms
        ease: "Power2",
        onComplete: () => {
          // Quando a animação terminar
          perfil.setDepth(-i); // Ajusta a profundidade após a animação
        },
      });
    }
  }
  update() {
    // Animação ao passar o mouse sobre os botões
    if (!miniGame2.respostaEmAndamento) {
      miniGame2.botao1.on("pointerover", () => {
        this.selecaoM2.setPosition(332, 453).setVisible(true).setDepth(100);
      });
      miniGame2.botao1.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });

      miniGame2.botao2.on("pointerover", () => {
        this.selecaoM2.setPosition(468, 453).setVisible(true).setDepth(100);
      });
      miniGame2.botao2.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });

      miniGame2.botao3.on("pointerover", () => {
        this.selecaoM2.setPosition(332, 539).setVisible(true).setDepth(100);
      });
      miniGame2.botao3.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });

      miniGame2.botao4.on("pointerover", () => {
        this.selecaoM2.setPosition(468, 539).setVisible(true).setDepth(100);
      });
      miniGame2.botao4.on("pointerout", () => {
        this.selecaoM2.setPosition(0, 0).setVisible(false);
      });
    } else {
      this.selecaoM2.setVisible(false);
    }
  }
}
