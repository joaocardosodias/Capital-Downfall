class salaDeGuerra extends Phaser.Scene {
    constructor () {
        super('salaDeGuerra');
        // Declaração de algumas das variáveis que serão usadas no código
        this.perguntaAtual = 0;
        // Lista que vai armazenar as perguntas selecionadas
        this.selectedQuestions = [];
        // Array que armazena as perguntas e as alternativas corretas para cada uma delas 
        this.correctAnswers = {
            1: 'C', 2: 'B', 3: 'D', 4: 'D',
            5: 'A', 6: 'A', 7: 'C', 8: 'B', 9: 'B'
        };
        this.clickSound = null; // Variável para o som de clique
    }

    preload () {
        this.load.image('fundoPerguntas', 'src/assets/dia2/salaDeGuerra/fundoSalaDeGuerra');
    }

    create() {
        this.add.image(400, 300, 'fundoPerguntas');
    }

    upload () {

    }
}
