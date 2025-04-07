//Variáveis globais utilizadas no código

let pontuacao = 0;
let personagemSelecionado;
let musicaHub;
//Cria a cena da Hub

class hub extends baseCena {
  constructor() {
    super("hub");
    this.diaAtual = 1;
    this.tiles;
    this.player;
    this.playerDirecao = "baixo";
    this.personagens = ["Mary", "Mark", "Margaret", "Steve"];
    this.personagemSelecionado = 3;
    this.colisaoApoioGeral;
    this.colisaoMinigame1;
    this.colisaoMinigame2;
    this.colisaoMinigame3;
    this.avisoMinigame1;
    this.avisoMinigame2;
    this.avisoMinigame3;
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

  init(data) {
    // Se tivermos uma posição salva, usamos ela
    if (data.personagemSelecionado) {
      this.personagemSelecionado = data.personagemSelecionado.numero;
    }
  }

  create() {
    //Armazena na variável teclado o input das setinhas
    this.teclado = this.input.keyboard.createCursorKeys();

    // Antes do código a seguir, importante esclarecer: tileset(são as imagens utilizadas na criação do mapa)  tilemap(posição que as imagens assumirão)

    //Armazena na variável spacebar a tecla espaço
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //Cria as teclas E e WASD para serem utilizáveis
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

    musicaHub = this.sound.add("musicaHub", { volume: 0.2 }); // Adiciona o som da música de fundo
    musicaHub.setLoop(true); // Define que a música de fundo deve ser repetida
    musicaHub.play(); // Inicia a música de fundo

    this.passos = this.sound.add("passos", { volume: 3 }); // Adiciona o som dos passos
    this.passos.setLoop(true); // Define que o som dos passos deve ser repetido

    this.interacaoMinigame = this.sound.add("interacaoMinigame", { volume: 1 }); // Adiciona o som de interação com o minigame

    //Criação do objeto de detecção da interação do jogador com o apoio geral
    this.colisaoApoioGeral = this.physics.add
      .sprite(1300, 850, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);

    //Criação dos objetos de detecção da interação do jogador com os terminais
    this.colisaoMinigame1 = this.physics.add
      .sprite(345, 1650, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame2 = this.physics.add
      .sprite(1822, 930, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame3 = this.physics.add
      .sprite(336, 470, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);

    //Adiciona a animação dos indicadores
    this.anims.create({
      key: "movimentoAviso",
      frames: this.anims.generateFrameNumbers("avisoMinigame", {
        start: 0,
        end: 8,
      }),
      frameRate: 15,
      repeat: -1,
    });

    //Adiciona as animações do player
    this.anims.create({
      key: "movimentoParadoBaixo",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 0, end: 0 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "movimentoParadoCima",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 5, end: 5 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "movimentoParadoDireita",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 10, end: 10 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "movimentoParadoEsquerda",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 15, end: 15 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "movimentoCima",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 6, end: 9 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "movimentoBaixo",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 1, end: 4 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "movimentoDireita",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 11, end: 14 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: "movimentoEsquerda",
      frames: this.anims.generateFrameNumbers(
        "playerSpritesheet" + this.personagens[this.personagemSelecionado],
        { start: 16, end: 19 }
      ),
      frameRate: 6,
      repeat: -1,
    });

    //Adiciona os indicadores e inicia suas animações
    this.avisoMinigame1 = this.add
      .sprite(339, 1536, "avisoMinigame")
      .setScale(1.5);
    this.avisoMinigame2 = this.add
      .sprite(1822, 825, "avisoMinigame")
      .setScale(1.5);
    this.avisoMinigame3 = this.add
      .sprite(336, 345, "avisoMinigame")
      .setScale(1.5);

    this.avisoMinigame1.anims.play("movimentoAviso");
    this.avisoMinigame2.anims.play("movimentoAviso");
    this.avisoMinigame3.anims.play("movimentoAviso");

    //Criação do objeto do player
    this.player = this.physics.add.sprite(1176, 1230).setScale(1.5);
    this.player.anims.play("movimentoParadoBaixo");
    this.player.body.setSize(28, 22).setOffset(2, 40);
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
        this.transicao("apoioGeral", true, true, true)
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
    this.physics.add.overlap(this.player, this.colisaoMinigame1, () => {
      // O player não pode jogar o minigame mais de 1 vez
      if (!minigame1Jogado) {
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
          this.avisoMinigame1.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 1;
          this.transicao("apoioDia1", true, true, true)
        }
      }
    });

    // Verifica se o player está na mesma área que o detector de colisão do minigame 1
    this.physics.add.overlap(this.player, this.colisaoMinigame2, () => {
      // O player não pode jogar o minigame mais de 1 vez
      if (!minigame2Jogado) {
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
          this.avisoMinigame2.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 2;
          this.transicao("apoioDia1", true, true, true)
        }
      }
    });

    // Verifica se o player está na mesma área que o detector de colisão do minigame 1
    this.physics.add.overlap(this.player, this.colisaoMinigame3, () => {
      // O player não pode jogar o minigame mais de 1 vez
      if (!minigame3Jogado) {
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
          this.avisoMinigame3.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 3;
          this.transicao("apoioDia1", true, true, true,)
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
      .setDepth(10)
      .setShadow(2, 2, "#000000", 2);
  }

  update() {
    // Atualiza o texto com o valor atual da variável 'pontuacao' a cada frame
    this.textoPontuacao.setText(`Pontuação: ${pontuacao}`);

    if (
      !this.physics.overlap(this.player, this.colisaoMinigame1) &&
      !this.physics.overlap(this.player, this.colisaoMinigame2) &&
      !this.physics.overlap(this.player, this.colisaoMinigame3)
    ) {
      this.textoInteracao.setVisible(false); // Deixa o aviso invisível quando o player não estiver próximo a algum minigame
      this.fundoInteracao.setVisible(false);
    }

    if (
      minigame1Jogado === true &&
      minigame2Jogado === true &&
      minigame3Jogado === true
    ) {
      this.passos.stop();
      this.minigameAtual = 10;
      this.interacaoMinigame.play();
      this.transicao("apoioDia1", true, true, false)
    }

    /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
    O movimento diagonal foi feito por meio da multiplicação das velocidades por (raiz de 2 / 2), que é aproximadamente igual a 0.7 */
    if (!transicionando) {
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
    } else { // código repetido por que ocorre em situações diferentes mas fazem a mesma coisa
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
      if (!minigame1Jogado) {
        this.avisoMinigame1.setVisible(true);
      } else {
        this.avisoMinigame1.setVisible(false);
      }
      if (!minigame2Jogado) {
        this.avisoMinigame2.setVisible(true);
      } else {
        this.avisoMinigame2.setVisible(false);
      }
      if (!minigame3Jogado) {
        this.avisoMinigame3.setVisible(true);
      } else {
        this.avisoMinigame3.setVisible(false);
      }
    }
  }
