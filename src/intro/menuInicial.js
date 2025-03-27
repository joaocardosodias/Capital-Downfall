//Variáveis utilizadas

let botaoIniciar;

let minigame1Jogado;

let minigame2Jogado;

let minigame3Jogado;

let minigame4Jogado;

let minigame5Jogado;

let minigame6Jogado;

let musicaIntro;

//Cria a cena do menu inicial do jogo

class menuInicial extends Phaser.Scene {
  constructor() {
    super("menuInicial");
    this.clique;
  }

  // Preload dos assets
  preload() {
    this.load.spritesheet("menu", "src/assets/intro/menuInicial.png", {
      frameWidth: 800,
      frameHeight: 600,
    });

    this.load.image("botaoIniciar", "src/assets/intro/botaoIniciar.png");
    this.load.audio("musicaIntro", "src/assets/sounds/rockMusicaHub.mp3");
    this.load.audio("clique", "src/assets/sounds/clique.mp3");
  }

  create() {
    game.scene.start('movimento');
    // Cria o sprite da tela inicial

    musicaIntro = this.sound.add("musicaIntro", { volume: 0.5 });
    musicaIntro.setLoop(true);
    musicaIntro.play();

    this.clique = this.sound.add("clique");

    const iniciar = this.add.sprite(400, 300, "menu");

    //Variáveis do controle sobre os minigames

    minigame1Jogado = false;

    minigame2Jogado = false;

    minigame3Jogado = false;

    minigame4Jogado = false;

    minigame5Jogado = false;

    minigame6Jogado = false;

    // Cria a animação da tela inicial

    this.anims.create({
      key: "iniciar",

      frames: this.anims.generateFrameNumbers("menu", { start: 0, end: 102 }),

      frameRate: 10,

      repeat: -1,
    });

    // Inicia a animação

    iniciar.play("iniciar");

    // Cria as imagens na tela

    botaoIniciar = this.add
      .image(670, 400, "botaoIniciar")
      .setInteractive()
      .setScale(1);

    // Verifica se o botão de iniciar foi clicado

    botaoIniciar.on("pointerdown", () => {
      // Caso ele seja, o jogo para a cena atual e passa para a próxima

      this.clique.play();
      game.scene.stop("menuInicial");
      game.scene.start("contratoInicial");
    });
  }
  update() {}
}
