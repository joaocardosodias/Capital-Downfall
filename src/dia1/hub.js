//Variáveis utilizadas

let pontuacao;

let tiles;

let player;

let playerDirecao = 'baixo';

let colisaoMinigame1;

let colisaoMinigame2;

let colisaoMinigame3;

let teclado;

let layerParede;

let layerDecoracoes;

let spacebar;

let avisoMinigame1;

let avisoMinigame2;

let avisoMinigame3;


//Cria a cena da Hub

class hub extends Phaser.Scene {
  constructor() {
    super('hub');
  }

  preload() {

    pontuacao = 0;
    //Preload das imagens, incluindo o tilemap/set utilizado e os itens que serão interativos

    this.load.image('tiles', 'src/assets/hub/tileset.png');

    this.load.image('player', 'src/assets/players/player.png');

    this.load.tilemapTiledJSON('hub', 'src/assets/hub/tilemap.json');

    this.load.image('colisao', 'src/assets/hub/colisao.png');

    this.load.spritesheet('avisoMinigame', 'src/assets/hub/aviso.png', { frameWidth: 32, frameHeight: 64 });

    this.load.spritesheet('playerSpritesheet', 'src/assets/players/markSpritesheet.png', { frameWidth: 32, frameHeight: 64 });

    //Armazena na variável teclado o input das setinhas

    teclado = this.input.keyboard.createCursorKeys();
  }

  create() {

    // Antes do código a seguir, importante esclarecer: tileset(são as imagens utilizadas na criação do mapa)  tilemap(posição que as imagens assumirão)

    //Armazena na variável spacebar a tecla espaço

    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //Armazena na variável map o tilemap utilizado

    const map = this.make.tilemap({ key: 'hub' })

    //Armazena na variável tileset  o tileset utilizado

    const tileset = map.addTilesetImage('tileset', 'tiles')

    //Cria as layers do tilemap

    map.createLayer('ground', tileset)

    map.createLayer('noCollision', tileset)

    layerParede = map.createLayer('walls', tileset)

    layerDecoracoes = map.createLayer('decorations', tileset)

    //Resgata a propriedade de colisão presente nas informações do tilemap

    layerParede.setCollisionByExclusion([-1]);

    //Traz colisões para a layer das decorações

    layerDecoracoes.setCollisionByExclusion([-1]);

    //Criação dos objetos de detecção da interação do jogador com os terminais

    colisaoMinigame1 = this.physics.add.sprite(230, 1100, 'colisao').setScale(2.5).setVisible(false).setImmovable(true);

    colisaoMinigame2 = this.physics.add.sprite(1215, 610, 'colisao').setScale(2.5).setVisible(false).setImmovable(true);

    colisaoMinigame3 = this.physics.add.sprite(225, 300, 'colisao').setScale(2.5).setVisible(false).setImmovable(true);

    //Adiciona a animação dos indicadores

    this.anims.create({
      key: 'movimentoAviso',

      frames: this.anims.generateFrameNumbers('avisoMinigame', { start: 0, end: 12 }),

      frameRate: 15,

      repeat: -1
    });

    //Adiciona as animações do player

    this.anims.create({
      key: 'movimentoParadoBaixo',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 0, end: 0 }),

      frameRate: 6,

      repeat: -1
    });

    this.anims.create({
      key: 'movimentoParadoCima',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 5, end: 5 }),

      frameRate: 6,

      repeat: -1
    });

    this.anims.create({
      key: 'movimentoParadoDireita',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 10, end: 10 }),

      frameRate: 6,

      repeat: -1
    });

    this.anims.create({
      key: 'movimentoParadoEsquerda',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 15, end: 15 }),

      frameRate: 6,

      repeat: -1
    });

    this.anims.create({
      key: 'movimentoCima',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 6, end: 9 }),

      frameRate: 6,

      repeat: -1
    });

    this.anims.create({
      key: 'movimentoBaixo',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 1, end: 4 }),

      frameRate: 6,

      repeat: -1
    });

    this.anims.create({
      key: 'movimentoDireita',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 11, end: 14 }),

      frameRate: 6,

      repeat: -1
    });

    this.anims.create({
      key: 'movimentoEsquerda',

      frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 16, end: 19 }),

      frameRate: 6,

      repeat: -1
    });



    //Adiciona os indicadores e inicia suas animações

    avisoMinigame1 = this.add.sprite(227, 1025, 'avisoMinigame');

    avisoMinigame2 = this.add.sprite(1215, 550, 'avisoMinigame');

    avisoMinigame3 = this.add.sprite(225, 230, 'avisoMinigame');

    avisoMinigame1.anims.play('movimentoAviso');

    avisoMinigame2.anims.play('movimentoAviso');

    avisoMinigame3.anims.play('movimentoAviso');

    //Criação do objeto do player

    player = this.physics.add.sprite(785, 820).setScale(1);

    player.anims.play('movimentoParadoBaixo');

    player.body.setSize(30, 30).setOffset(0, 40);

    player.refreshBody();

    //Adiciona a colisão entre os objetos

    this.physics.add.collider(player, layerParede);

    this.physics.add.collider(player, layerDecoracoes);

    //Verifica se o player está na mesma área que o detector de colisão do minigame 1

    this.physics.add.overlap(player, colisaoMinigame1, function () {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada

      if (spacebar && Phaser.Input.Keyboard.JustDown(spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez

        if (minigame1Jogado == false) {

          avisoMinigame1.setVisible(false);

          game.scene.start('apoioMinigame1');

          minigame1Jogado = true;





        }
      }
    });

    this.physics.add.overlap(player, colisaoMinigame2, function () {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada

      if (spacebar && Phaser.Input.Keyboard.JustDown(spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez

        if (minigame2Jogado == false) {

          avisoMinigame2.setVisible(false);

          game.scene.start('apoioMinigame2');

          minigame2Jogado = true;





        }
      }
    });

    this.physics.add.overlap(player, colisaoMinigame3, function () {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada

      if (spacebar && Phaser.Input.Keyboard.JustDown(spacebar)) {
        //O player não pode jogar o minigame mais de 1 vez

        if (minigame3Jogado == false) {

          avisoMinigame3.setVisible(false);

          game.scene.start('apoioMinigame3');

          minigame3Jogado = true;





        }
      }
    });


    //Configura a câmera para seguir o jogador

    this.cameras.main.startFollow(player, true);


  }

  update() {
    /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
    O movimento diagonal foi feito por meio da multiplicação das velocidades por (raiz de 2 / 2), que é aproximadamente igual a 0.707 */

    if (teclado.left.isDown && teclado.up.isDown) {
      player.setVelocityX(-200 * 0.707);

      player.setVelocityY(-200 * 0.707);

      player.anims.play('movimentoEsquerda', true);

      playerDirecao = 'esquerda';
    }

    else if (teclado.left.isDown && teclado.down.isDown) {
      player.setVelocityX(-200 * 0.707);

      player.setVelocityY(200 * 0.707);

      player.anims.play('movimentoEsquerda', true);

      playerDirecao = 'esquerda';
    }

    else if (teclado.right.isDown && teclado.up.isDown) {
      player.setVelocityX(200 * 0.707);

      player.setVelocityY(-200 * 0.707);

      player.anims.play('movimentoDireita', true);

      playerDirecao = 'direita';
    }

    else if (teclado.right.isDown && teclado.down.isDown) {
      player.setVelocityX(200 * 0.707);

      player.setVelocityY(200 * 0.707);

      player.anims.play('movimentoDireita', true);

      playerDirecao = 'direita';
    }


    else if (teclado.left.isDown) {
      player.setVelocityX(-200);

      player.setVelocityY(0);

      player.anims.play('movimentoEsquerda', true);

      playerDirecao = 'esquerda';
    }

    else if (teclado.right.isDown) {
      player.setVelocityX(200);

      player.setVelocityY(0);

      player.anims.play('movimentoDireita', true);

      playerDirecao = 'direita';
    }


    else if (teclado.up.isDown) {
      player.setVelocityX(0);

      player.setVelocityY(-200);

      player.anims.play('movimentoCima', true);

      playerDirecao = 'cima';
    }

    else if (teclado.down.isDown) {
      player.setVelocityX(0);

      player.setVelocityY(200);

      player.anims.play('movimentoBaixo', true);

      playerDirecao = 'baixo';
    }

    //Caso nenhuma seta esteja sendo pressionada, a velocidade do player será 0

    else {
      player.setVelocityX(0);

      player.setVelocityY(0);

      //vê a direção que o player estava virado e toca a animação parado correspondente
      if (playerDirecao === 'cima') {

        player.anims.play('movimentoParadoCima', true);

      } else if (playerDirecao === 'baixo') {

        player.anims.play('movimentoParadoBaixo', true);

      } else if (playerDirecao === 'direita') {

        player.anims.play('movimentoParadoDireita', true);

      } else if (playerDirecao === 'esquerda') {

        player.anims.play('movimentoParadoEsquerda', true);

      } else {
        // define a animação parado default como a para baixo
        player.anims.play('movimentoParadoBaixo', true);

      }
    }

  }
}