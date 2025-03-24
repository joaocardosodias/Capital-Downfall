//Configurações do Phaser, necessário incluir o nome das cenas no array em scene: []

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  //Define o modelo de física utilizado durante o jogo, importante durante a cena 'hub'

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
      pixelArt: true,
    },
  },

  scene: [
    miniGame5,
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
    
    fimMinigame5,
    miniGame6,
    apoioMinigame4,
    apoioMinigame5,
    apoioMinigame6,
  ],
};
//Adicionando a fonte customizada que será utilizada ao redor do jogo
const fontePixelArt = new FontFace('pixelArt', 'url(src/assets/fontes/fontePixelArt.ttf)');
fontePixelArt.load()
document.fonts.add(fontePixelArt);

const fontePixelArtNegrito = new FontFace('pixelArtNegrito', 'url(src/assets/fontes/fontePixelArt.ttf)');
fontePixelArtNegrito.load()
document.fonts.add(fontePixelArtNegrito);

const game = new Phaser.Game(config);
