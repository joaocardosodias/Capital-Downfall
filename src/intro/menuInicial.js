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

    // Será usada para transição
    this.telaPreta = this.add
      .rectangle(400, 300, 800, 600, 0x000000)
      .setAlpha(0)
      .setDepth(10);

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

    // Adiciona a animação de pulsação do botão de iniciar

    this.tweens.add({
      targets: botaoIniciar,
      scale: 1.2,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });

    // Verifica se o botão de iniciar foi clicado

    botaoIniciar.on("pointerdown", () => {
      if (!transicionando) {
        transicionando = true;
        this.clique.play();

        // Caso ele seja, o jogo para a cena atual e passa para a próxima
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


    this.botaoCreditos = this.add
      .image(675, 470, "botaoCreditos")
      .setScale(1)
      .setInteractive();

    this.botaoCreditos.on("pointerdown", () => {
      if (!transicionando) {
        transicionando = true;
        this.clique.play();

        this.tweens.add({
          targets: this.telaPreta,
          alpha: 1,
          duration: 1000,
          onComplete: () => {

            this.fundoEspaco = this.add.image(0, 0, "fundoEspaco").setOrigin(0).setScale(2);

            this.retangulo = this.add.rectangle(0, 300, 450, 350, 0x324891).setOrigin(0, 0.5);
            this.inteli = this.add.image(660, 500, "logoInteli");

            this.botaoVoltar = this.add.image(30, 30, "botaoDesistir").setOrigin(0).setInteractive();
            this.botaoVoltar.on("pointerdown", () => {
              if (!transicionando) {
                transicionando = true;
                this.tweens.add({
                  targets: this.telaPreta,
                  alpha: 1,
                  duration: 1000,
                  onComplete: () => {
                    this.fundoEspaco.destroy();
                    this.retangulo.destroy();
                    this.inteli.destroy();
                    this.botaoVoltar.destroy();
                    this.equipe.destroy();
                    this.descricao.destroy();
                    this.assetsExternos.destroy();
                    this.tweens.add({
                      targets: this.telaPreta,
                      alpha: 0,
                      duration: 1000,
                      onComplete: () => {
                        transicionando = false;
                      },
                    });
                  }
                });
              }
            });

            this.equipe = this.add.text(70, 150, `Equipe de Desenvolvimento:

 ×  Ana Jardim;
 ×  Henrique da Rós;
 ×  João Dias;
 ×  Lucas Michel;
 ×  Lucas Lopez;
 ×  Nicole Zanin;
 ×  Teodoro Neira.
 `, {
              fontFamily: "pixelArtNegrito",
              fontSize: 20
            });

            this.descricao = this.add.text(500, 50, `O jogo "Capital Downfall" foi ideado, planejado e desenvolvido por alunos do Instituto de Tecnologia e Liderança (INTELI). O principal objetivo do projeto foi ajudar o famoso banco BTG pactual em seu processo de onboarding de novos analistas de fundos de investimentos - e aprender o máximo possível durante o processo!`, {
              fontFamily: "pixelArtP",
              fontSize: 16
            }).setWordWrapWidth(270);

            this.assetsExternos = this.add.text(40, 500, `Alguns assets não são autorais. Todos os autores e autoras destes estão presentes na seção "Referências" do GDD (Game Design Document).`, {
              fontFamily: "pixelArtP",
              fontSize: 16
            }).setWordWrapWidth(460);

            this.tweens.add({
              targets: this.telaPreta,
              alpha: 0,
              duration: 1000,
              onComplete: () => {
                transicionando = false;
              },
            });

          },
        });
        
      }
    });
  }
}