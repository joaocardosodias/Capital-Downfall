//Cria a cena da Hub
class hub2 extends Phaser.Scene {
  constructor() {
    super("hub2");
    this.tiles;
    this.player;
    this.payerDirecao = "baixo";
    this.personagens = ["Mary", "Mark", "Margaret", "Steve"];
    this.personagemSelecionado = 3;
    this.colisaoMinigame4;
    this.colisaoMinigame5;
    this.colisaoMinigame6;
    this.avisoMinigame4;
    this.avisoMinigame5;
    this.avisoMinigame6;
    this.teclado;
    this.spacebar;
    this.layerParede;
    this.layerDecoracoes;
  }

  preload() {
    //Preload das imagens, incluindo o tilemap/set utilizado e os itens que serão interativos
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

    //Armazena na variável teclado o input das setinhas
    this.teclado = this.input.keyboard.createCursorKeys();
  }

  create() {
    // Antes do código a seguir, importante esclarecer: tileset(são as imagens utilizadas na criação do mapa)  tilemap(posição que as imagens assumirão)

    //Armazena na variável spacebar a tecla espaço
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    //Armazena na variável map o tilemap utilizado
    const map = this.make.tilemap({ key: "hub" });

    //Armazena na variável tileset  o tileset utilizado
    const tileset = map.addTilesetImage("tileset", "tiles");

    //Cria as layers do tilemap
    map.createLayer("ground", tileset);
    map.createLayer("noCollision", tileset);
    this.layerParede = map.createLayer("walls", tileset);
    this.layerDecoracoes = map.createLayer("decorations", tileset);

    //Resgata a propriedade de colisão presente nas informações do tilemap
    this.layerParede.setCollisionByExclusion([-1]);

    //Traz colisões para a layer das decorações
    this.layerDecoracoes.setCollisionByExclusion([-1]);

    //Criação dos objetos de detecção da interação do jogador com os terminais
    this.colisaoMinigame4 = this.physics.add
      .sprite(230, 1100, "colisao")
      .setScale(2.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame5 = this.physics.add
      .sprite(1215, 610, "colisao")
      .setScale(2.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame6 = this.physics.add
      .sprite(225, 300, "colisao")
      .setScale(2.5)
      .setVisible(false)
      .setImmovable(true);

    //Adiciona a animação dos indicadores
    this.anims.create({
      key: "movimentoAviso",
      frames: this.anims.generateFrameNumbers("avisoMinigame", {
        start: 0,
        end: 12,
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
    this.avisoMinigame4 = this.add.sprite(227, 1025, "avisoMinigame");
    this.avisoMinigame5 = this.add.sprite(1215, 550, "avisoMinigame");
    this.avisoMinigame6 = this.add.sprite(225, 230, "avisoMinigame");
    this.avisoMinigame4.anims.play("movimentoAviso");
    this.avisoMinigame5.anims.play("movimentoAviso");
    this.avisoMinigame6.anims.play("movimentoAviso");

    //Criação do objeto do player
    this.player = this.physics.add.sprite(785, 820).setScale(1);
    this.player.anims.play("movimentoParadoBaixo");
    this.player.body.setSize(30, 30).setOffset(0, 40);
    this.player.refreshBody();

    //Adiciona a colisão entre os objetos
    this.physics.add.collider(this.player, this.layerParede);
    this.physics.add.collider(this.player, this.layerDecoracoes);

    //Verifica se o player está na mesma área que o detector de colisão do minigame 1
    this.physics.add.overlap(this.player, this.colisaoMinigame4, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame4Jogado == false) {
          this.avisoMinigame4.setVisible(false);
          game.scene.start("apoioMinigame4");
          game.scene.sleep("hub2");
        }
      }
    });

    this.physics.add.overlap(this.player, this.colisaoMinigame5, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame5Jogado == false) {
          this.avisoMinigame5.setVisible(false);
          game.scene.start("apoioMinigame5");
          game.scene.sleep("hub2");
        }
      }
    });

    this.physics.add.overlap(this.player, this.colisaoMinigame6, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame6Jogado == false) {
          this.avisoMinigame6.setVisible(false);
          game.scene.start("apoioMinigame6");
          this.scene.sleep("hub2");
        }
      }
    });

    //Configura a câmera para seguir o jogador, além do zoom
    this.cameras.main.startFollow(this.player, true);
    this.cameras.main.setZoom(1.5);
  }

  update() {
    /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
    O movimento diagonal foi feito por meio da multiplicação das velocidades por (raiz de 2 / 2), que é aproximadamente igual a 0.707 */

    /*
    O código a seguir só será utilizado quando o miniboss do dia 2 estiver pronto
    
    if (minigame1Jogado === true && minigame2Jogado === true && minigame3Jogado === true) {
      this.scene.stop('hub2');
      this.scene.start('apoioMiniboss1');
    }
    */

    if (this.teclado.left.isDown && this.teclado.up.isDown) {
      this.player.setVelocityX(-200 * 0.707);

      this.player.setVelocityY(-200 * 0.707);

      this.player.anims.play("movimentoEsquerda", true);

      this.playerDirecao = "esquerda";
    } else if (this.teclado.left.isDown && this.teclado.down.isDown) {
      this.player.setVelocityX(-200 * 0.707);

      this.player.setVelocityY(200 * 0.707);

      this.player.anims.play("movimentoEsquerda", true);

      this.playerDirecao = "esquerda";
    } else if (this.teclado.right.isDown && this.teclado.up.isDown) {
      this.player.setVelocityX(200 * 0.707);

      this.player.setVelocityY(-200 * 0.707);

      this.player.anims.play("movimentoDireita", true);

      this.playerDirecao = "direita";
    } else if (this.teclado.right.isDown && this.teclado.down.isDown) {
      this.player.setVelocityX(200 * 0.707);

      this.player.setVelocityY(200 * 0.707);

      this.player.anims.play("movimentoDireita", true);

      this.playerDirecao = "direita";
    } else if (this.teclado.left.isDown) {
      this.player.setVelocityX(-200);

      this.player.setVelocityY(0);

      this.player.anims.play("movimentoEsquerda", true);

      this.playerDirecao = "esquerda";
    } else if (this.teclado.right.isDown) {
      this.player.setVelocityX(200);

      this.player.setVelocityY(0);

      this.player.anims.play("movimentoDireita", true);

      this.playerDirecao = "direita";
    } else if (this.teclado.up.isDown) {
      this.player.setVelocityX(0);

      this.player.setVelocityY(-200);

      this.player.anims.play("movimentoCima", true);

      this.playerDirecao = "cima";
    } else if (this.teclado.down.isDown) {
      this.player.setVelocityX(0);

      this.player.setVelocityY(200);

      this.player.anims.play("movimentoBaixo", true);

      this.playerDirecao = "baixo";
    }

    //Caso nenhuma seta esteja sendo pressionada, a velocidade do player será 0
    else {
      this.player.setVelocityX(0);

      this.player.setVelocityY(0);

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
  }
}
