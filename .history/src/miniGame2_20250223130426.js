// Variáveis utilizadas
let perfil1;
let botaoV;
let botaoF;
let pontuacao = 0;
let perfisRestantes = [];
let perfilIndex = 0;
let carimbo;
let textoPontuacao; 
let textoMudancaPontuacao; // Variável para o texto de "+100 pontos" ou "-50 pontos"
let fim; // Remova esta declaração de dentro da função create()
let botaoVoltar;
let respostaEmAndamento = false; // Variável para controlar se já foi feita uma resposta

class miniGame2 extends Phaser.Scene {
    constructor() {
        super('miniGame2');
    }

    preload() {
        // Carrega as imagens
        this.load.image('botaoV', 'assets/miniGame2/botaoV.png');
        this.load.image('botaoF', 'assets/miniGame2/botaoF.png');
        this.load.image('carimboV', 'assets/miniGame2/carimboV.png');
        this.load.image('carimboF', 'assets/miniGame2/carimboF.png');
        for (let i = 1; i <= 10; i++) {
            this.load.i
