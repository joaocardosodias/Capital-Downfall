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
preload() {
  this.load.image(
    "creditos",
    "src/assets/dia2/salaDeGuerra/creditos.png"
  );
  this.load.image(
    "botaoAnterior",
    "src/assets/materiais_apoio/botaoAnterior.png"
  );
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
  
    this.botaoCreditos = this.add
  .image(675, 470, "botaoCreditos")
  .setScale(0.4)
  .setInteractive();

this.botaoCreditos.on("pointerdown", () => {
  this.clique.play();
  this.time.delayedCall(25000, () => {
    window.location.reload();
  });
  // Adiciona a imagem dos créditos
  this.creditosImagem = this.add.image(400, 300, "creditos").setScale(0.93);

  // Adiciona o botão "Anterior" após 25 segundos
  
    this.botaoAnterior = this.add
      .image(100, 110, "botaoAnterior")
      .setScale(0.5)
      .setInteractive();

    this.botaoAnterior.on("pointerdown", () => {
      this.clique.play();
      this.creditosImagem.destroy();
      this.botaoAnterior.destroy();
    });
  });
};

update() {}
}
