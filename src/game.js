const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,

  scale: {
    mode: Phaser.Scale.FIT, // Faz o jogo se ajustar à tela mantendo a proporção
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centraliza o jogo
    parent: 'game-container', // Se estiver dentro de um container específico
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

// Adicionando fontes personalizadas
const fontePixelArt = new FontFace('pixelArt', 'url(src/assets/fontes/fontePixelArt.ttf)');
fontePixelArt.load().then(() => document.fonts.add(fontePixelArt));

const fontePixelArtNegrito = new FontFace('pixelArtNegrito', 'url(src/assets/fontes/fontePixelArt.ttf)');
fontePixelArtNegrito.load().then(() => document.fonts.add(fontePixelArtNegrito));

const game = new Phaser.Game(config);

// Função para redimensionar o jogo caso a janela seja ajustada
window.addEventListener('resize', resizeGame);

function resizeGame() {
  const canvas = game.canvas;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const wratio = width / height;
  const gameRatio = game.config.width / game.config.height;

  if (wratio < gameRatio) {
    canvas.style.width = width + "px";
    canvas.style.height = (width / gameRatio) + "px";
  } else {
    canvas.style.width = (height * gameRatio) + "px";
    canvas.style.height = height + "px";
  }
}
