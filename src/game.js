const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  render: { pixelArt: true },

  scale: {
    mode: Phaser.Scale.FIT, // Ajusta o jogo à tela mantendo a proporção
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },

  scene: [
    preload,
    menuInicial,
    contratoInicial,
    selecaoPersonagens,
    hub,
    apoioGeral,
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
    apoioDia2,
    hubFinal,
    finalDia2,
    salaDeGuerra,
    movimento,
  ],
};
//Adicionando a fonte customizada que será utilizada ao redor do jogo
const fontePixelArt = new FontFace(
  "pixelArt",
  "url(src/assets/fontes/fontePixelArt.ttf)"
);
fontePixelArt.load();
document.fonts.add(fontePixelArt);

const fontePixelArtNegrito = new FontFace(
  "pixelArtNegrito",
  "url(src/assets/fontes/fontePixelArt.ttf)"
);
fontePixelArtNegrito.load();
document.fonts.add(fontePixelArtNegrito);

const fontePixelArtP = new FontFace(
  "pixelArtP",
  "url(src/assets/fontes/fontePixelArtP.ttf)"
);
fontePixelArtP.load();
document.fonts.add(fontePixelArtP);

const fontePixelArtNumeros = new FontFace(
  "pixelArtNumeros",
  "url(src/assets/fontes/fontePixelArtNumeros.ttf)"
);
fontePixelArtNumeros.load();
document.fonts.add(fontePixelArtNumeros);

const game = new Phaser.Game(config);
