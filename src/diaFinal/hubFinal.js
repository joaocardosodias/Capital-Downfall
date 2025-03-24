//Cria a cena da Hub
class hubFinal extends Phaser.Scene {
  constructor() {
    super("hubFinal");
    this.map;
    this.tileset;
    this.tiles;
    this.player;
    this.playerDirecao = "baixo";
    this.personagens = ["Mary", "Mark", "Margaret", "Steve"];
    this.personagemSelecionado = 3;
    this.colisaoApoioGeral;
    this.colisaoBossFinal;
    this.avisoBossFinal;
    this.teclado;
    this.spacebar;
    this.layerParede;
    this.layerObjetos;
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
    this.load.tilemapTiledJSON("hubFinal", "src/assets/hub/tilemap2.json");
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
    this.map = this.make.tilemap({ key: "hubFinal" });

    //Armazena na variável tileset  o tileset utilizado
    this.tileset = this.map.addTilesetImage("tileset", "tiles");

    // Aplica o filtro NEAREST para evitar o efeito de suavização no pixel art
    this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);

    //Cria as layers do tilemap
    this.map.createLayer("ground", this.tileset, 0, 0);
    this.map.createLayer("noCollisionLow", this.tileset, 0, 0);
    this.layerParede = this.map.createLayer("walls", this.tileset, 0, 0);
    this.layerObjetos = this.map.createLayer("objects", this.tileset, 0, 0);
    this.map.createLayer("noCollisionHigh", this.tileset, 0, 0).setDepth(2);

    //Resgata a propriedade de colisão presente nas informações do tilemap
    this.layerParede.setCollisionByExclusion([-1]);

    //Traz colisões para a layer das decorações
    this.layerObjetos.setCollisionByExclusion([-1]);

    //Criação do objeto de detecção da interação do jogador com o apoio geral
    this.colisaoApoioGeral = this.physics.add.sprite(496, 550, 'colisao').setScale(2.5).setVisible(true).setImmovable(true);

    //Criação dos objetos de detecção da interação do jogador com os terminais
    this.colisaoBossFinal = this.physics.add
      .sprite(400, 200, "colisao")
      .setScale(2.5)
      .setVisible(false)
      .setImmovable(true);

    //Adiciona os indicadores e inicia suas animações
    this.avisoBossFinal = this.add.sprite(400, 60, "avisoMinigame");
    this.avisoBossFinal.anims.play("movimentoAviso");

    //Criação do objeto do player
    this.player = this.physics.add.sprite(408, 1200).setScale(1.5);
    this.player.anims.play('movimentoParadoBaixo');
    this.player.body.setSize(28, 22).setOffset(2, 40);
    this.player.refreshBody();

    //Adiciona a colisão entre os objetos
    this.physics.add.collider(this.player, this.layerParede);
    this.physics.add.collider(this.player, this.layerObjetos);

    this.physics.add.overlap(this.player, this.colisaoApoioGeral, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        game.scene.start('apoioGeral', { diaAtual: this.diaAtual });
        game.scene.sleep('hubFinal');
      }
    });

    //Verifica se o player está na mesma área que o detector de colisão do boss final
    this.physics.add.overlap(this.player, this.colisaoBossFinal, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        this.avisoBossFinal.setVisible(false);
        game.scene.start("miniGame4");// MUDAR DEPOIS
        game.scene.sleep("hubFinal");
      }
    });

    //Configura a câmera para seguir o jogador, além do zoom
    this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
    this.cameras.main.setZoom(1).setRoundPixels(true);
  }

  update() {
    /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
    O movimento diagonal foi feito por meio da multiplicação das velocidades por (raiz de 2 / 2), que é aproximadamente igual a 0.7 */

    if (this.teclado.left.isDown && this.teclado.up.isDown) {
      this.player.setVelocityX(-210);

      this.player.setVelocityY(-210);

      this.player.anims.play('movimentoEsquerda', true);

      this.playerDirecao = 'esquerda';
    }

    else if (this.teclado.left.isDown && this.teclado.down.isDown) {
      this.player.setVelocityX(-210);

      this.player.setVelocityY(210);

      this.player.anims.play('movimentoEsquerda', true);

      this.playerDirecao = 'esquerda';
    }

    else if (this.teclado.right.isDown && this.teclado.up.isDown) {
      this.player.setVelocityX(210);

      this.player.setVelocityY(-210);

      this.player.anims.play('movimentoDireita', true);

      this.playerDirecao = 'direita';
    }

    else if (this.teclado.right.isDown && this.teclado.down.isDown) {
      this.player.setVelocityX(210);

      this.player.setVelocityY(210);

      this.player.anims.play('movimentoDireita', true);

      this.playerDirecao = 'direita';
    }


    else if (this.teclado.left.isDown) {
      this.player.setVelocityX(-300);

      this.player.setVelocityY(0);

      this.player.anims.play('movimentoEsquerda', true);

      this.playerDirecao = 'esquerda';
    }

    else if (this.teclado.right.isDown) {
      this.player.setVelocityX(300);

      this.player.setVelocityY(0);

      this.player.anims.play('movimentoDireita', true);

      this.playerDirecao = 'direita';
    }


    else if (this.teclado.up.isDown) {
      this.player.setVelocityX(0);

      this.player.setVelocityY(-300);

      this.player.anims.play('movimentoCima', true);

      this.playerDirecao = 'cima';
    }

    else if (this.teclado.down.isDown) {
      this.player.setVelocityX(0);

      this.player.setVelocityY(300);

      this.player.anims.play('movimentoBaixo', true);

      this.playerDirecao = 'baixo';
    }

    //Caso nenhuma seta esteja sendo pressionada, a velocidade do player será 0

    else {
      this.player.setVelocityX(0);

      this.player.setVelocityY(0);

      //vê a direção que o player estava virado e toca a animação parado correspondente
      if (this.playerDirecao === 'cima') {

        this.player.anims.play('movimentoParadoCima', true);

      } else if (this.playerDirecao === 'baixo') {

        this.player.anims.play('movimentoParadoBaixo', true);

      } else if (this.playerDirecao === 'direita') {

        this.player.anims.play('movimentoParadoDireita', true);

      } else if (this.playerDirecao === 'esquerda') {

        this.player.anims.play('movimentoParadoEsquerda', true);

      } else {
        // define a animação parado default como a para baixo
        this.player.anims.play('movimentoParadoBaixo', true);

      }
    }
  }
}
