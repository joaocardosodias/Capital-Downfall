 //Variáveis utilizadas

 let pontuacao;

 let tiles;

 let player;

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

  class hub extends Phaser.Scene 
  {
      constructor ()
      {
          super('hub');
      }

      preload()
      {

          pontuacao = 0;
          //Preload das imagens, incluindo o tilemap/set utilizado e os itens que serão interativos

          this.load.image('tiles', 'assets/spriteSheet.png');

          this.load.image('player', 'assets/player.png');

          this.load.tilemapTiledJSON('hub','assets/hubInicial.json');

          this.load.image('colisao', 'assets/colisao.png');

          this.load.spritesheet('avisoMinigame', 'assets/aviso.png', { frameWidth: 32, frameHeight: 64 });

          this.load.spritesheet('playerSpritesheet', 'assets/markSpritesheet.png', { frameWidth: 32, frameHeight: 64});

          //Armazena na variável teclado o input das setinhas

          teclado = this.input.keyboard.createCursorKeys();            
      }
      
      create() 
      {

          // Antes do código a seguir, importante esclarecer: tileset(são as imagens utilizadas na criação do mapa)  tilemap(posição que as imagens assumirão)

          //Armazena na variável spacebar a tecla espaço

          spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

          //Armazena na variável map o tilemap utilizado

          const map = this.make.tilemap({key: 'hub'}) 

          //Armazena na variável tileset  o tileset utilizado
          
          const tileset = map.addTilesetImage('tileset', 'tiles')

          //Cria as layers do tilemap

          map.createLayer('ground', tileset)

          map.createLayer('noCollision', tileset)

          layerParede = map.createLayer('walls', tileset)

          layerDecoracoes = map.createLayer('decorations', tileset)
          
          //Resgata a propriedade de colisão presente nas informações do tilemap

          layerParede.setCollisionByProperty({ collides: true}) 

          //Traz colisões para a layer das decorações

          layerDecoracoes.setCollisionByExclusion([-1]); 

          //Criação dos objetos de detecção da interação do jogador com os terminais

          colisaoMinigame1 = this.physics.add.sprite(100,130, 'colisao').setScale(2.5).setVisible(false).setImmovable(true);

          colisaoMinigame2 = this.physics.add.sprite(1440,130, 'colisao').setScale(2.5).setVisible(false).setImmovable(true);

          colisaoMinigame3 = this.physics.add.sprite(1375,950, 'colisao').setScale(2.5).setVisible(false).setImmovable(true);

          //Adiciona a animação dos indicadores



        
          this.anims.create({
            key: 'movimentoAviso',

            frames: this.anims.generateFrameNumbers('avisoMinigame', { start: 0, end: 12 }),

            frameRate: 15,  
            
            repeat: -1
        });

        this.anims.create({
          key: 'movimentoParado',

          frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 0, end: 0 }),

          frameRate: 6,  
          
          repeat: -1
        });

        this.anims.create({
          key: 'movimentoCima',

          frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 5, end: 9 }),

          frameRate: 6,  
          
          repeat: -1
        });
        this.anims.create({
          key: 'movimentoBaixo',

          frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 0, end: 4 }),

          frameRate: 6,  
          
          repeat: -1
        });
        this.anims.create({
          key: 'movimentoDireita',

          frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 10, end: 14 }),

          frameRate: 6,  
          
          repeat: -1
        });
        this.anims.create({
          key: 'movimentoEsquerda',

          frames: this.anims.generateFrameNumbers('playerSpritesheet', { start: 15, end: 19 }),

          frameRate: 6,  
          
          repeat: -1
        });

        

        //Adiciona os indicadores

        avisoMinigame1 = this.add.sprite(98, 72, 'avisoMinigame');

        avisoMinigame2 = this.add.sprite(1440, 75, 'avisoMinigame');

        avisoMinigame3 = this.add.sprite(1375, 870, 'avisoMinigame');

        avisoMinigame1.anims.play('movimentoAviso');

        avisoMinigame2.anims.play('movimentoAviso');

        avisoMinigame3.anims.play('movimentoAviso');

          //Criação do objeto do player

          player = this.physics.add.sprite(800,800).setScale(0.83);

          player.anims.play('movimentoParado');

          player.body.setSize(player.width, player.height);

          player.refreshBody();

          //Adiciona a colisão entre os objetos

          this.physics.add.collider(player, layerParede);   
          
          this.physics.add.collider(player, layerDecoracoes); 
     
          //Verifica se o player está na mesma área que o detector de colisão do minigame 1

          this.physics.add.overlap(player, colisaoMinigame1, function()
          {
              //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada

              if (spacebar && Phaser.Input.Keyboard.JustDown(spacebar)) 
                  {
                    //O player não pode jogar o minigame mais de 1 vez

                      if (minigame1Jogado == false){

                        avisoMinigame1.setVisible(false);

                        game.scene.start('apoioMinigame1');
                        
                        minigame1Jogado = true;

                        

                        

                      }
                  }
          });

          this.physics.add.overlap(player, colisaoMinigame2, function()
          {
              //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada

              if (spacebar && Phaser.Input.Keyboard.JustDown(spacebar)) 
                  {
                    //O player não pode jogar o minigame mais de 1 vez

                      if (minigame2Jogado == false){

                        avisoMinigame2.setVisible(false);

                        game.scene.start('apoioMinigame2');

                        minigame2Jogado = true;

                        

                        

                      }
                  }
          });

          this.physics.add.overlap(player, colisaoMinigame3, function()
          {
              //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada

              if (spacebar && Phaser.Input.Keyboard.JustDown(spacebar)) 
                  {
                    //O player não pode jogar o minigame mais de 1 vez

                      if (minigame3Jogado == false){

                        avisoMinigame3.setVisible(false);

                        game.scene.start('apoioMinigame3');

                        minigame3Jogado = true;

                        

                        

                      }
                  }
          });


          //Configura a câmera para seguir o jogador
          
          this.cameras.main.startFollow(player, true);

          
      }

      
















      update()
      {
        



          /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
          O movimento diagonal foi feito por meio da multiplicação das velocidades por (raiz de 2 / 2), que é aproximadamente igual a 0.707 */ 

        if (teclado.left.isDown && teclado.up.isDown) 
            {
                player.setVelocityX (-200*0.707);
                
                player.setVelocityY (-200*0.707);

                player.anims.play('movimentoCima', true);
            }
  
          else if (teclado.left.isDown && teclado.down.isDown) 
            {
                player.setVelocityX (-200*0.707);
                
                player.setVelocityY (200*0.707);

                player.anims.play('movimentoBaixo', true);
            }
  
          else if (teclado.right.isDown && teclado.up.isDown) 
            {
                player.setVelocityX (200*0.707);
                
                player.setVelocityY (-200*0.707);

                player.anims.play('movimentoCima', true);
            }
  
          else if (teclado.right.isDown && teclado.down.isDown) 
            {
                player.setVelocityX (200*0.707);
                
                player.setVelocityY (200*0.707);

                player.anims.play('movimentoBaixo', true);
            }

  
          else if (teclado.left.isDown) 
          {
              player.setVelocityX (-200);
              
              player.setVelocityY (0);

              player.anims.play('movimentoEsquerda', true);
          }

          else if (teclado.right.isDown) 
          {   
              player.setVelocityX (200);

              player.setVelocityY (0);

              player.anims.play('movimentoDireita', true);
          }


          else if (teclado.up.isDown) 
          {
              player.setVelocityX (0);
              
              player.setVelocityY (-200);

              player.anims.play('movimentoCima', true);
          }

          else if (teclado.down.isDown) 
          {
              player.setVelocityX (0);

              player.setVelocityY (200);

              player.anims.play('movimentoBaixo', true);
          }

          //Caso nenhuma seta esteja sendo pressionada, a velocidade do player será 0

          else 
          {
              player.setVelocityX (0);

              player.setVelocityY (0);

              player.anims.play('movimentoParado', true);
              
          } 
          
      }
  }