//Cria a cena da Hub

class hub2 extends Phaser.Scene 
{
  constructor() {
    super('hub2');
    this.diaAtual = 2;
    this.tiles;
    this.player;
    this.playerDirecao = 'baixo';
    this.personagens = ['Mary', 'Mark', 'Margaret', 'Steve'];
    this.personagemSelecionado = 3;
    this.colisaoApoioGeral;
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
    this.load.image('tiles', 'src/assets/hub/tileset.png');
    this.load.image('player', 'src/assets/players/player.png');
    this.load.tilemapTiledJSON('hub2', 'src/assets/hub/tilemap.json');
    this.load.image('colisao', 'src/assets/hub/colisao.png');
    this.load.spritesheet('avisoMinigame', 'src/assets/hub/aviso.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('playerSpritesheetMary', 'src/assets/players/marySpritesheet.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('playerSpritesheetMark', 'src/assets/players/markSpritesheet.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('playerSpritesheetMargaret', 'src/assets/players/margaretSpritesheet.png', { frameWidth: 32, frameHeight: 64 });
    this.load.spritesheet('playerSpritesheetSteve', 'src/assets/players/steveSpritesheet.png', { frameWidth: 32, frameHeight: 64 });

    //Armazena na variável teclado o input das setinhas
    this.teclado = this.input.keyboard.createCursorKeys();
  }

  create() {

    // Antes do código a seguir, importante esclarecer: tileset(são as imagens utilizadas na criação do mapa)  tilemap(posição que as imagens assumirão)

    //Armazena na variável spacebar a tecla espaço
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Armazena na variável map o tilemap utilizado
    const map = this.make.tilemap({ key: 'hub' })

    //Armazena na variável tileset  o tileset utilizado
    const tileset = map.addTilesetImage('tileset', 'tiles')

    // Aplica o filtro NEAREST para evitar o efeito de suavização no pixel art
    this.textures.get('tiles').setFilter(Phaser.Textures.FilterMode.NEAREST);

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

    //Criação do objeto de detecção da interação do jogador com o apoio geral
    this.colisaoApoioGeral = this.physics.add.sprite(1300, 850, 'colisao').setScale(3.5).setVisible(false).setImmovable(true);

    //Criação dos objetos de detecção da interação do jogador com os terminais
    this.colisaoMinigame4 = this.physics.add.sprite(345, 1650, 'colisao').setScale(3.5).setVisible(false).setImmovable(true);
    this.colisaoMinigame5 = this.physics.add.sprite(1822, 915, 'colisao').setScale(3.5).setVisible(false).setImmovable(true);
    this.colisaoMinigame6 = this.physics.add.sprite(336, 450, 'colisao').setScale(3.5).setVisible(false).setImmovable(true);

    //Adiciona os indicadores e inicia suas animações
    this.avisoMinigame4 = this.add.sprite(339, 1536, 'avisoMinigame').setScale(1.5);
    this.avisoMinigame5 = this.add.sprite(1822, 825, 'avisoMinigame').setScale(1.5);
    this.avisoMinigame6 = this.add.sprite(336, 345, 'avisoMinigame').setScale(1.5);
    this.avisoMinigame4.anims.play('movimentoAviso');
    this.avisoMinigame5.anims.play('movimentoAviso');
    this.avisoMinigame6.anims.play('movimentoAviso');

    //Criação do objeto do player
    this.player = this.physics.add.sprite(1176, 1230).setScale(1.5);
    this.player.anims.play('movimentoParadoBaixo');
    this.player.body.setSize(28, 28).setOffset(2, 40);
    this.player.refreshBody();

    //Adiciona a colisão entre os objetos
    this.physics.add.collider(this.player, this.layerParede);
    this.physics.add.collider(this.player, this.layerObjetos);

    this.physics.add.overlap(this.player, this.colisaoApoioGeral, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        game.scene.start('apoioGeral', { diaAtual: this.diaAtual });
        game.scene.sleep('hub2');
      }
    });

    //Verifica se o player está na mesma área que o detector de colisão do minigame 4
    this.physics.add.overlap(this.player, this.colisaoMinigame4, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame4Jogado == false) {
          this.avisoMinigame4.setVisible(false);
          this.minigameAtual = 4;
          game.scene.start('apoioDia2', { minigameAtual: this.minigameAtual });
          game.scene.sleep('hub2');
        }
      }
    });

    this.physics.add.overlap(this.player, this.colisaoMinigame5, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame5Jogado == false) {
          this.avisoMinigame5.setVisible(false);
          this.minigameAtual = 5;
          game.scene.start('apoioDia2', { minigameAtual: this.minigameAtual });
          game.scene.sleep('hub2');
        }
      }
    });

    this.physics.add.overlap(this.player, this.colisaoMinigame6, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (this.spacebar && Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez
        if (minigame6Jogado == false) {
          this.avisoMinigame6.setVisible(false);
          this.minigameAtual = 6;
          game.scene.start('apoioDia2', { minigameAtual: this.minigameAtual });
          this.scene.sleep('hub2');
        }
      }
    });

    //Configura a câmera para seguir o jogador, além do zoom
    this.cameras.main.startFollow(this.player, true, 0.2, 0.2);
    this.cameras.main.setZoom(1).setRoundPixels(true);
  }

  update() {

   if (minigame4Jogado === true && minigame5Jogado === true && minigame6Jogado === true) {
      this.scene.stop('hub2');
      this.scene.start('finalDia2'); 
    }

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