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
            }
        },
        scene: [menuInicial,hub,telaLogin,dia1, miniGame2]
    };

    const game = new Phaser.Game(config);  
