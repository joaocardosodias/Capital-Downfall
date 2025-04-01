//Cria a cena da Hub
let musicaHubFinal;

class hubFinal extends Phaser.Scene {
  constructor() {
    super("hubFinal");
    this.map;
    this.tileset;
    this.tiles;
    this.player;
    this.diaAtual = 3;
    this.playerDirecao = "baixo";
    this.personagens = ["Mary", "Mark", "Margaret", "Steve"];
    this.personagemSelecionado = 3;
    this.colisaoApoioGeral;
    this.colisaoBossFinal;
    this.avisoBossFinal;
    this.sobreposto = false;
    this.teclado;
    this.spacebar;
    this.E;
    this.W;
    this.A;
    this.S;
    this.D;
    this.layerParede;
    this.layerObjetos;
    this.passos;
    this.interacaoMinigame;
    this.andando = false;
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

    this.E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    this.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    //Armazena na variável map o tilemap utilizado
    this.map = this.make.tilemap({ key: "hubFinal" });

    //Armazena na variável tileset  o tileset utilizado
    this.tileset = this.map.addTilesetImage("tileset", "tiles");

    // Aplica o filtro NEAREST para evitar o efeito de suavização no pixel art
    this.textures.get("tiles").setFilter(Phaser.Textures.FilterMode.NEAREST);

    musicaHubFinal = this.sound.add("musicaHubFinal", { volume: 0.25 }); // Adiciona o som da música de fundo
    musicaHubFinal.setLoop(true); // Define que a música de fundo deve ser repetida
    musicaHubFinal.play(); // Inicia a música de fundo

    this.passos = this.sound.add("passos", { volume: 2 }); // Adiciona o som dos passos
    this.passos.setLoop(true); // Define que o som dos passos deve ser repetido

    this.interacaoMinigame = this.sound.add("interacaoMinigame", { volume: 1 }); // Adiciona o som de interação com o minigame

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
    this.colisaoApoioGeral = this.physics.add
      .sprite(496, 550, "colisao")
      .setScale(2.5)
      .setVisible(true)
      .setImmovable(true);

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
        game.scene.start("apoioGeral", { diaAtual: this.diaAtual });
        game.scene.sleep("hubFinal");
      }
    });

    //Verifica se o player está na mesma área que o detector de colisão do boss final
    this.physics.add.overlap(this.player, this.colisaoBossFinal, () => {
      //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada
      if (
        (this.spacebar || this.E) &&
        (Phaser.Input.Keyboard.JustDown(this.spacebar) ||
          Phaser.Input.Keyboard.JustDown(this.E))
      ) {
        this.avisoBossFinal.setVisible(false);
        this.passos.stop();
        this.interacaoMinigame.play();
        game.scene.start("salaDeGuerra");
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
  }
}
