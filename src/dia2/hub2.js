let musicaHub2;
let musicaTocadaMinigame4 = false;

//Cria a cena da Hub

class hub2 extends Phaser.Scene {
  constructor() {
    super("hub2");
    this.diaAtual = 2;
    this.tiles;
    this.player;
    this.playerDirecao = "baixo";
    this.personagens = ["Mary", "Mark", "Margaret", "Steve"];
    this.personagemSelecionado = 3;
    this.colisaoApoioGeral;
    this.colisaoMinigame4;
    this.colisaoMinigame5;
    this.colisaoMinigame6;
    this.avisoMinigame4;
    this.avisoMinigame5;
    this.avisoMinigame6;
    this.minigameAtual;
    this.sobreposto = false;
    this.teclado;
    this.spacebar;
    this.E;
    this.W;
    this.A;
    this.S;
    this.D;
    this.layerParede;
    this.layerDecoracoes;
    this.passos;
    this.andando = false;
    this.interacaoMinigame;
  }

  create() {
    //Armazena na variável teclado o input das setinhas
    this.teclado = this.input.keyboard.createCursorKeys();

    // Antes do código a seguir, importante esclarecer: tileset(são as imagens utilizadas na criação do mapa)  tilemap(posição que as imagens assumirão)

    //Armazena na variável spacebar a tecla espaço
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //Cria as teclas E e WASD para movimento e interação
    this.E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //Armazena na variável map o tilemap utilizado
    const map = this.make.tilemap({ key: "hub" });

    //Armazena na variável tileset  o tileset utilizado
    const tileset = map.addTilesetImage("tileset", "tiles");

    // Aplica o filtro NEAREST para evitar o efeito de suavização no pixel art
    this.textures.get("tiles").setFilter(Phaser.Textures.FilterMode.NEAREST);

    //Cria as layers do tilemap
    map.createLayer("ground", tileset, 0, 0);
    map.createLayer("noCollisionLow", tileset, 0, 0);
    this.layerParede = map.createLayer("walls", tileset, 0, 0);
    this.layerObjetos = map.createLayer("objects", tileset, 0, 0);
    map.createLayer("noCollisionHigh", tileset, 0, 0).setDepth(1);

    //Resgata a propriedade de colisão presente nas informações do tilemap
    this.layerParede.setCollisionByExclusion([-1]);

    //Traz colisões para a layer das decorações
    this.layerObjetos.setCollisionByExclusion([-1]);

    musicaHub2 = this.sound.add("musicaHub2", { volume: 0.25 }); // Adiciona o som da música de fundo
    musicaHub2.setLoop(true); // Define que a música de fundo deve ser repetida
    musicaHub2.play(); // Inicia a música de fundo

    this.passos = this.sound.add("passos", { volume: 2 }); // Adiciona o som dos passos
    this.passos.setLoop(true); // Define que o som dos passos deve ser repetido

    this.interacaoMinigame = this.sound.add("interacaoMinigame", { volume: 1 }); // Adiciona o som de interação com o minigame

    //Criação do objeto de detecção da interação do jogador com o apoio geral
    this.colisaoApoioGeral = this.physics.add
      .sprite(1300, 850, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);

    //Criação dos objetos de detecção da interação do jogador com os terminais
    this.colisaoMinigame4 = this.physics.add
      .sprite(345, 1650, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame5 = this.physics.add
      .sprite(1822, 915, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame6 = this.physics.add
      .sprite(336, 450, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);

    //Adiciona os indicadores e inicia suas animações
    this.avisoMinigame4 = this.add
      .sprite(339, 1536, "avisoMinigame")
      .setScale(1.5);
    this.avisoMinigame5 = this.add
      .sprite(1822, 825, "avisoMinigame")
      .setScale(1.5);
    this.avisoMinigame6 = this.add
      .sprite(336, 345, "avisoMinigame")
      .setScale(1.5);
    this.avisoMinigame4.anims.play("movimentoAviso");
    this.avisoMinigame5.anims.play("movimentoAviso");
    this.avisoMinigame6.anims.play("movimentoAviso");

    //Criação do objeto do player
    this.player = this.physics.add.sprite(1176, 1230).setScale(1.5);
    this.player.anims.play("movimentoParadoBaixo");
    this.player.body.setSize(28, 28).setOffset(2, 40);
    this.player.refreshBody();

    //Adiciona a colisão entre os objetos
    this.physics.add.collider(this.player, this.layerParede);
    this.physics.add.collider(this.player, this.layerObjetos);

    this.physics.add.overlap(this.player, this.colisaoApoioGeral, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (
        (this.spacebar || this.E) &&
        (Phaser.Input.Keyboard.JustDown(this.spacebar) ||
          Phaser.Input.Keyboard.JustDown(this.E))
      ) {
        this.interacaoMinigame.play();
        this.passos.stop();
        game.scene.start("apoioGeral", { diaAtual: this.diaAtual });
        game.scene.sleep("hub2");
      }
    });

    // Criando o aviso "Aperte espaço para interagir"
    this.fundoInteracao = this.add
      .rectangle(0, 0, 170, 56, 0x90a2e0, 0.5)
      .setOrigin(0.5)
      .setVisible(false)
      .setDepth(10.5);
    this.textoInteracao = this.add
      .text(0, 0, "Aperte ESPAÇO\npara interagir", {
        fontSize: "16px",
        fontFamily: "pixelArtNegrito",
        fill: "#fff",
        align: "center",
      })
      .setOrigin(0.5)
      .setVisible(false)
      .setDepth(11);

    // Verifica se o player está na mesma área que o detector de colisão do minigame 1
    this.physics.add.overlap(this.player, this.colisaoMinigame4, () => {
      // O player não pode jogar o minigame mais de 1 vez
      if (!minigame4Jogado) {
        // Atualiza a posição do aviso para ficar em baixo do player
        this.fundoInteracao
          .setPosition(this.player.x, this.player.y + 80)
          .setVisible(true);
        this.textoInteracao
          .setPosition(this.player.x + 2, this.player.y + 80)
          .setVisible(true);
        // Verifica se o player pressionou espaço para iniciar o minigame
        if (
          (this.spacebar || this.E) &&
          (Phaser.Input.Keyboard.JustDown(this.spacebar) ||
            Phaser.Input.Keyboard.JustDown(this.E))
        ) {
          this.textoInteracao.setVisible(false);
          this.fundoInteracao.setVisible(false);
          this.avisoMinigame4.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 4;
          game.scene.start("apoioDia2", { minigameAtual: this.minigameAtual });
          game.scene.sleep("hub2");
        }
      }
    });

    // Verifica se o player está na mesma área que o detector de colisão do minigame 1
    this.physics.add.overlap(this.player, this.colisaoMinigame5, () => {
      // O player não pode jogar o minigame mais de 1 vez
      if (!minigame5Jogado) {
        // Atualiza a posição do aviso para ficar em baixo do player
        this.fundoInteracao
          .setPosition(this.player.x, this.player.y + 80)
          .setVisible(true);
        this.textoInteracao
          .setPosition(this.player.x + 2, this.player.y + 80)
          .setVisible(true);
        // Verifica se o player pressionou espaço para iniciar o minigame
        if (
          (this.spacebar || this.E) &&
          (Phaser.Input.Keyboard.JustDown(this.spacebar) ||
            Phaser.Input.Keyboard.JustDown(this.E))
        ) {
          this.textoInteracao.setVisible(false);
          this.fundoInteracao.setVisible(false);
          this.avisoMinigame5.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 5;
          game.scene.start("apoioDia2", { minigameAtual: this.minigameAtual });
          game.scene.sleep("hub2");
        }
      }
    });

    // Verifica se o player está na mesma área que o detector de colisão do minigame 1
    this.physics.add.overlap(this.player, this.colisaoMinigame6, () => {
      // O player não pode jogar o minigame mais de 1 vez
      if (!minigame6Jogado) {
        // Atualiza a posição do aviso para ficar em baixo do player
        this.fundoInteracao
          .setPosition(this.player.x, this.player.y + 80)
          .setVisible(true);
        this.textoInteracao
          .setPosition(this.player.x + 2, this.player.y + 80)
          .setVisible(true);
        // Verifica se o player pressionou espaço para iniciar o minigame
        if (
          (this.spacebar || this.E) &&
          (Phaser.Input.Keyboard.JustDown(this.spacebar) ||
            Phaser.Input.Keyboard.JustDown(this.E))
        ) {
          this.textoInteracao.setVisible(false);
          this.fundoInteracao.setVisible(false);
          this.avisoMinigame6.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 6;
          game.scene.start("apoioDia2", { minigameAtual: this.minigameAtual });
          game.scene.sleep("hub2");
        }
      }
    });

    //Configura a câmera para seguir o jogador, além do zoom
    this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
    this.cameras.main.setZoom(1).setRoundPixels(true);

    // Adiciona o texto da pontuação
    this.textoPontuacao = this.add
      .text(570, 10, `Pontuação: ${pontuacao}`, {
        fontFamily: "pixelArt", // Nome da fonte personalizada
        fontSize: "20px",
        color: "#ffffff",
      })
      .setScrollFactor(0)
      .setDepth(10); // Define a profundidade do texto para que ele fique visível

    // Adiciona um efeito de sombra ao redor do texto
    this.textoPontuacao.setShadow(2, 2, "#000000", 2);
  }

  update() {
    // Atualiza o texto com o valor atual da variável 'pontuacao' a cada frame
    this.textoPontuacao.setText(`Pontuação: ${pontuacao}`);

    if (
      !this.physics.overlap(this.player, this.colisaoMinigame4) &&
      !this.physics.overlap(this.player, this.colisaoMinigame5) &&
      !this.physics.overlap(this.player, this.colisaoMinigame6)
    ) {
      this.textoInteracao.setVisible(false); // Deixa o aviso invisível quando o player não estiver próximo a algum minigame
      this.fundoInteracao.setVisible(false);
    }

    if (
      minigame4Jogado === true &&
      minigame5Jogado === true &&
      minigame6Jogado === true
    ) {
      musicaMinigame4.stop();
      this.passos.stop();
      this.scene.stop("hub2");
      this.scene.start("finalDia2");
    }

    /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
    O movimento diagonal foi feito por meio da multiplicação das velocidades por (raiz de 2 / 2), que é aproximadamente igual a 0.7 */

    if (
      (this.teclado.left.isDown || this.A.isDown) &&
      (this.teclado.up.isDown || this.W.isDown)
    ) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(-210);
      this.player.setVelocityY(-210);
      this.player.anims.play("movimentoEsquerda", true);
      this.playerDirecao = "esquerda";
    } else if (
      (this.teclado.left.isDown || this.A.isDown) &&
      (this.teclado.down.isDown || this.S.isDown)
    ) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(-210);
      this.player.setVelocityY(210);
      this.player.anims.play("movimentoEsquerda", true);
      this.playerDirecao = "esquerda";
    } else if (
      (this.teclado.right.isDown || this.D.isDown) &&
      (this.teclado.up.isDown || this.W.isDown)
    ) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(210);
      this.player.setVelocityY(-210);
      this.player.anims.play("movimentoDireita", true);
      this.playerDirecao = "direita";
    } else if (
      (this.teclado.right.isDown || this.D.isDown) &&
      (this.teclado.down.isDown || this.S.isDown)
    ) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(210);
      this.player.setVelocityY(210);
      this.player.anims.play("movimentoDireita", true);
      this.playerDirecao = "direita";
    } else if (this.teclado.left.isDown || this.A.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(-300);
      this.player.setVelocityY(0);
      this.player.anims.play("movimentoEsquerda", true);
      this.playerDirecao = "esquerda";
    } else if (this.teclado.right.isDown || this.D.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(300);
      this.player.setVelocityY(0);
      this.player.anims.play("movimentoDireita", true);
      this.playerDirecao = "direita";
    } else if (this.teclado.up.isDown || this.W.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(0);
      this.player.setVelocityY(-300);
      this.player.anims.play("movimentoCima", true);
      this.playerDirecao = "cima";
    } else if (this.teclado.down.isDown || this.S.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(0);
      this.player.setVelocityY(300);
      this.player.anims.play("movimentoBaixo", true);
      this.playerDirecao = "baixo";
    }
    //Caso nenhuma seta esteja sendo pressionada, a velocidade do player será 0
    else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
      if (this.andando) {
        this.passos.stop();
      }
      this.andando = false;

      //vê a direção que o player estava virado e toca a animação parado correspondente
      if (this.playerDirecao === "cima") {
        this.player.anims.play("movimentoParadoCima", true);
      } else if (this.playerDirecao === "baixo") {
        this.player.anims.play("movimentoParadoBaixo", true);
      } else if (this.playerDirecao === "direita") {
        this.player.anims.play("movimentoParadoDireita", true);
      } else if (this.playerDirecao === "esquerda") {
        this.player.anims.play("movimentoParadoEsquerda", true);
      } else {
        // define a animação parado default como a para baixo
        this.player.anims.play("movimentoParadoBaixo", true);
      }
    }

    // Faz com que o aviso não suma caso o player entre e saia de um tutorial
    if (!minigame4Jogado) {
      this.avisoMinigame4.setVisible(true);
    } else {
      this.avisoMinigame4.setVisible(false);
    }
    if (!minigame5Jogado) {
      this.avisoMinigame5.setVisible(true);
    } else {
      this.avisoMinigame5.setVisible(false);
    }
    if (!minigame6Jogado) {
      this.avisoMinigame6.setVisible(true);
    } else {
      this.avisoMinigame6.setVisible(false);
    }
  }
}
