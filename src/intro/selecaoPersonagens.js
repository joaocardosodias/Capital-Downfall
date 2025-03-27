class selecaoPersonagens extends Phaser.Scene {

    constructor() {
        super('selecaoPersonagens');
        this.personagemSelecionado = { numero: -1 };
        this.personagens = ['Mary', 'Mark', 'Margaret', 'Steve'];
        this.estadosBotoes = ['', 'Selecao', 'Selecionado', 'SelecionadoSelecao'];
    }

    preload() {
        for (let i = 0; i < this.personagens.length; i++) {
            for (let u = 0; u < 4; u++) {
                this.load.image('botao' + this.personagens[i] + this.estadosBotoes[u], 'src/assets/intro/selecaoPersonagens/botao' + this.personagens[i] + this.estadosBotoes[u] + '.png')
            }
        }
        this.load.image('botaoSelecionarAtivado', 'src/assets/intro/selecaoPersonagens/botaoSelecionarAtivado.png');
        this.load.image('botaoSelecionarDesativado', 'src/assets/intro/selecaoPersonagens/botaoSelecionarDesativado.png');

        this.load.image('fundo', 'src/assets/intro/selecaoPersonagens/background.png');
    }

    create() {

        this.add.image(400, 300, 'fundo').setDepth(-1);

        this.texto = this.add.text(100, 90, 'confiamos em você, ...uhh', {
            fontFamily: "pixelArt",
            color: '#ffffff',
            fontSize: '24px',
        });

        for (let i=1; i<5; i++){
        this.add.rectangle(160*i, 300, 140, 300, 0xffffff).setAlpha(0.25)
        }

        this.botao0 = this.add.image(160, 300, 'botaoMary').setInteractive().setDepth(10).setOrigin(0.5, 0.5);
        this.botao1 = this.add.image(320, 300, 'botaoMark').setInteractive().setDepth(10).setOrigin(0.5, 0.5);
        this.botao2 = this.add.image(480, 300, 'botaoMargaret').setInteractive().setDepth(10).setOrigin(0.5, 0.5);
        this.botao3 = this.add.image(640, 300, 'botaoSteve').setInteractive().setDepth(10).setOrigin(0.5, 0.5);

        this.botaoSelecionar = this.add.image(400, 520, 'botaoSelecionarDesativado').setInteractive().setDepth(11).setOrigin(0.5, 0.5).setAlpha(0.5);



        for (let i = 0; i < 4; i++) {
            let botao = this[`botao${i}`];

            botao.on('pointerover', () => {
                if (this.personagemSelecionado.numero === i) {
                    botao.setTexture('botao' + this.personagens[i] + 'SelecionadoSelecao');
                } else {
                    botao.setTexture('botao' + this.personagens[i] + 'Selecao');
                }
            });
            botao.on('pointerout', () => {
                if (this.personagemSelecionado.numero === i) {
                    botao.setTexture('botao' + this.personagens[i] + 'Selecionado');
                } else {
                    botao.setTexture('botao' + this.personagens[i]);
                }
            });

            botao.on('pointerdown', () => {
                this.personagemSelecionado.numero = i;

                this.botao0.setTexture('botao' + this.personagens[0]);
                this.botao1.setTexture('botao' + this.personagens[1]);
                this.botao2.setTexture('botao' + this.personagens[2]);
                this.botao3.setTexture('botao' + this.personagens[3]);

                botao.setTexture('botao' + this.personagens[i] + 'SelecionadoSelecao');

                this.botaoSelecionar.setTexture('botaoSelecionarAtivado').setAlpha(1);

                this.texto.setText('confiamos em você, ' + this.personagens[this.personagemSelecionado.numero] + '!')
            });
        }


        this.botaoSelecionar.on('pointerdown', () => {
            if (this.personagemSelecionado.numero > -1) {
                this.scene.stop('selecaoPersonagens');
                this.scene.start('hub', { personagemSelecionado: this.personagemSelecionado });
            }
        });
    }
}