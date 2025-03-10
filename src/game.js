    //Declaração das variáveis utilizadas no código

   


   
    //Configurações do Phaser, necessário incluir o nome das cenas no array em scene: []

    const config = 
    {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        
        //Define o modelo de física utilizado durante o jogo, importante durante a cena 'hub'

        physics: 
        {
            default: 'arcade',
            arcade: 
            {
                gravity:  { y: 0 },
                debug: false,
            }
        },

  
        scene: [menuInicial,contratoInicial,hub,miniGame1,miniGame2,miniGame3,fimDoMinigame3,apoioMinigame1,apoioMinigame2,apoioMinigame3, miniBossDia1]

    };

    const game = new Phaser.Game(config);  
