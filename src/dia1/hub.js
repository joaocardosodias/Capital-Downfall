//Variáveis globais utilizadas no código

let pontuacao = 0;
let personagemSelecionado;
let musicaHub;
//Cria a cena da Hub

class hub extends Phaser.Scene {
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
    this.teclado;
    this.spacebar;
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

    this.load.audio("musicaHub", "src/assets/sounds/jazzyMusicaHub1.mp3"); // Carrega a música de fundo
    this.load.audio("passos", "src/assets/sounds/passos.mp3"); // Carrega o som dos passos
    this.load.audio("interacaoMinigame", "src/assets/sounds/openMinigame.mp3"); // Carrega o som de interação com o minigame

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

    musicaHub = this.sound.add("musicaHub", { volume: 0.25 }); // Adiciona o som da música de fundo
    musicaHub.setLoop(true); // Define que a música de fundo deve ser repetida
    musicaHub.play(); // Inicia a música de fundo

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
    this.colisaoMinigame1 = this.physics.add
      .sprite(345, 1650, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame2 = this.physics.add
      .sprite(1822, 915, "colisao")
      .setScale(3.5)
      .setVisible(false)
      .setImmovable(true);
    this.colisaoMinigame3 = this.physics.add
      .sprite(336, 450, "colisao")
      .setScale(3.5)
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
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.interacaoMinigame.play();
        game.scene.start("apoioGeral", { diaAtual: this.diaAtual });
        game.scene.sleep("hub");
      }
    });

    //Verifica se o player está na mesma área que o detector de colisão do minigame 1
    this.physics.add.overlap(this.player, this.colisaoMinigame1, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {

        //O player não pode jogar o minigame mais de 1 vez
        if (minigame1Jogado == false) {
          this.avisoMinigame1.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 1;
          game.scene.start("apoioDia1", { minigameAtual: this.minigameAtual });
          game.scene.sleep("hub");
        }
      }
    });

    this.physics.add.overlap(this.player, this.colisaoMinigame2, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame2Jogado == false) {
          this.avisoMinigame2.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 2;
          game.scene.start("apoioDia1", { minigameAtual: this.minigameAtual });
          game.scene.sleep("hub");
        }
      }
    });

    this.physics.add.overlap(this.player, this.colisaoMinigame3, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame3Jogado == false) {
          this.avisoMinigame3.setVisible(false);
          this.interacaoMinigame.play();
          this.passos.stop();
          this.minigameAtual = 3;
          game.scene.start("apoioDia1", { minigameAtual: this.minigameAtual });
          this.scene.sleep("hub");
        }
      }
    });

    //Configura a câmera para seguir o jogador, além do zoom
    this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
    this.cameras.main.setZoom(1).setRoundPixels(true);
  }

  update() {
    if (
      minigame1Jogado === true &&
      minigame2Jogado === true &&
      minigame3Jogado === true
    ) {
      this.passos.stop();
      this.scene.stop("hub");
      this.minigameAtual = 10;
      game.scene.start("apoioDia1", { minigameAtual: this.minigameAtual });
    }

    /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
    O movimento diagonal foi feito por meio da multiplicação das velocidades por (raiz de 2 / 2), que é aproximadamente igual a 0.7 */

    if (this.teclado.left.isDown && this.teclado.up.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(-210);
      this.player.setVelocityY(-210);
      this.player.anims.play("movimentoEsquerda", true);
      this.playerDirecao = "esquerda";
    } else if (this.teclado.left.isDown && this.teclado.down.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(-210);
      this.player.setVelocityY(210);
      this.player.anims.play("movimentoEsquerda", true);
      this.playerDirecao = "esquerda";
    } else if (this.teclado.right.isDown && this.teclado.up.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(210);
      this.player.setVelocityY(-210);
      this.player.anims.play("movimentoDireita", true);
      this.playerDirecao = "direita";
    } else if (this.teclado.right.isDown && this.teclado.down.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(210);
      this.player.setVelocityY(210);
      this.player.anims.play("movimentoDireita", true);
      this.playerDirecao = "direita";
    } else if (this.teclado.left.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(-300);
      this.player.setVelocityY(0);
      this.player.anims.play("movimentoEsquerda", true);
      this.playerDirecao = "esquerda";
    } else if (this.teclado.right.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(300);
      this.player.setVelocityY(0);
      this.player.anims.play("movimentoDireita", true);
      this.playerDirecao = "direita";
    } else if (this.teclado.up.isDown) {
      if (!this.andando) {
        this.passos.play();
      }
      this.andando = true;
      this.player.setVelocityX(0);
      this.player.setVelocityY(-300);
      this.player.anims.play("movimentoCima", true);
      this.playerDirecao = "cima";
    } else if (this.teclado.down.isDown) {
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
