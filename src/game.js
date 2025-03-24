const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  scale: {
    mode: Phaser.Scale.FIT, // Ajusta o jogo à tela mantendo a proporção
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
      pixelArt: true,
    },
  },

  scene: [
    menuInicial,
    contratoInicial,
    selecaoPersonagens,
    hub,
    miniGame1,
    miniGame2,
    miniGame3,
    fimDoMinigame3,
    apoioDia1,
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
    finalDia2,
    salaDeGuerra
  ],
};

const game = new Phaser.Game(config);