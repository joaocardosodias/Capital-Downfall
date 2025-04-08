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

class menuInicial extends baseCena {
  constructor() {
    super("menuInicial");
    this.clique;
  }

  create() {
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
      .image(900, 400, "botaoIniciar")
      .setInteractive()
      .setScale(1);

    // Verifica se o botão de iniciar foi clicado

    botaoIniciar.on("pointerdown", () => {
      if (!transicionando) {
        transicionando = true;
        this.clique.play();

        // Caso ele seja, o jogo para a cena atual e passa para a próxima
        this.telaPreta = this.add
          .rectangle(400, 300, 800, 600, 0x000000)
          .setAlpha(0);

        this.tweens.add({
          targets: this.telaPreta,
          alpha: 1,
          duration: 2000,
          onComplete: () => {
            this.time.delayedCall(500, () => {
              this.transicao("contratoInicial", true, false);
            });
          },
        });
      }
    });
  }
  update() {
    if (botaoIniciar.x >= 670) {
      botaoIniciar.x = botaoIniciar.x - 2;
    }
  }
}
