//Configurações do Phaser, necessário incluir o nome das cenas no array em scene: []

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  render: { pixelArt: true },

  //Define o modelo de física utilizado durante o jogo, importante durante a cena 'hub'
  
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },

  scene: [
    menuInicial,
    contratoInicial,
    selecaoPersonagens,
    hub,
    apoioGeral,
    miniGame1,
    miniGame2,
    miniGame3,
    fimDoMinigame3,
    apoioMinigame1,
    apoioMinigame2,
    apoioMinigame3,
    apoioMiniboss1,
    miniBossDia1,
    finalDia1,
    introDia2,
    hub2,
    miniGame4,
    tributacaoScene1,
    tributacaoScene2,
    tributacaoScene3,
    tributacaoScene4,
    fimMinigame4,
    miniGame5,
    fimMinigame5,
    miniGame6,
    apoioMinigame4,
    apoioMinigame5,
    apoioMinigame6,
    hubFinal,
  ],
};

const game = new Phaser.Game(config);
