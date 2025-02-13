 //Variáveis utilizadas

 let tiles;

 let player;

 let computador;

 let colisaoComputador;

 let teclado;

 let layerParede;

 let layerDecoracoes;

 let spacebar; 

  
 //Cria a cena da Hub

  class hub extends Phaser.Scene 
  {
      constructor ()
      {
          super('hub');
      }

      preload()
      {

          //Preload das imagens, incluindo o tilemap/set utilizado e os itens que serão interativos

          this.load.image('tiles', 'assets/tilesetInicial.png');

          this.load.image('player', 'assets/player.png');

          this.load.tilemapTiledJSON('hub','assets/hubInicialTeste.json');

          this.load.image('computador', 'assets/mesaComputador.png');

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
          
          const tileset = map.addTilesetImage('tilesetInicial', 'tiles')

          //Cria na tela a layer do chão do tilemap

          map.createLayer('ground', tileset)

          //Cria na tela a layer das paredes do tilemap, armazenando na variável layerParede

          layerParede = map.createLayer('walls', tileset)

          //Cria na tela a layer das decorações do tilemap, armazenando na variável layerDecoracoes

          layerDecoracoes = map.createLayer('decorations', tileset)
          
          //Resgata a propriedade de colisão presente nas informações do tilemap

          layerParede.setCollisionByProperty({ collides: true}) 

          //Traz colisões para a layer das decorações

          layerDecoracoes.setCollisionByExclusion([-1]); 

          /* No código adiante, para ser possível detectar a interação com o objeto, não era possível manter sua propriedade de colisão (Ou seja, era posssível andar dentro do objeto)
          Como solução, um objeto extra é utilizado, tendo uma área de colisão ligeiramente menor que a parte de interação, permitindo que a colisão com a parede aconteça */

          // Criação da objeto da colisão do computador (a parte física). 

          colisaoComputador = this.physics.add.sprite(200,200, 'computador').setScale(1.5).setImmovable(true);

          //Criação do objeto da deteção da interação com o computador. Ele fica invisível pois ele serve apenas para detectar a interação do player, sendo o colisaoComputador o objeto real que o player colide

          computador = this.physics.add.sprite(200,200, 'computador').setScale(1.6).setVisible(false).setImmovable(true);

          //Criação do objeto do player

          player = this.physics.add.sprite(100,100, 'player').setScale(0.1);

          // Impede que o player consiga sair pelas bordas da tela

          player.setCollideWorldBounds(true);

          //Adiciona a colisão entre o player e a parede

          this.physics.add.collider(player, layerParede);

          //Adiciona a colisão entre o player as decorações
          
          this.physics.add.collider(player, layerDecoracoes);
          
          //Adiciona a colisão entre o player e o computador

          this.physics.add.collider(player, colisaoComputador);  
     
          //Verifica se o player está na mesma área que o detector de colisão do computador

          this.physics.add.overlap(player, computador, function()
          {
              //Verifica se a tecla espaço está sendo pressionada, equanto o player está dentro da área determinada

              if (spacebar && Phaser.Input.Keyboard.JustDown(spacebar)) 
                  {
                      //Caso as condições sejam cumpridas, ocorre a troca de cena para o login do computador

                      game.scene.start('telaLogin'); 
                  }
          });
      }
      
      update()
      {

          /* Essa parte do código verifica se as setinhas foram pressionadas, tendo como consequência o movimento
          O código foi escrito de uma maneira para que o movimento na diagonal não ocorra, para evitar problemas de aceleração */ 

          if (teclado.left.isDown) 
          {
              player.setVelocityX (-150);
              
              player.setVelocityY (0);
          }

          else if (teclado.right.isDown) 
          {   
              player.setVelocityX (150);

              player.setVelocityY (0);
              
          }


          else if (teclado.up.isDown) 
          {
              player.setVelocityY (-150);
              
              player.setVelocityX (0);
              
          }

          else if (teclado.down.isDown) 
          {
              player.setVelocityY (150);

              player.setVelocityX (0);
              
          }

          //Caso nenhuma seta esteja sendo pressionada, a velocidade do player será 0

          else 
          {
              player.setVelocityX (0);

              player.setVelocityY (0);
          } 
      }
  }
