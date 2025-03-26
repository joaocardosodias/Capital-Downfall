class movimento extends Phaser.Scene {
    constructor() {
        super('movimento'); //nome da cena
        //Declaração dos parâmetros usados para a animação
        this.tempoTotal = 1500; 
        this.posicaoInicialX = -32;
        this.posicaoInicialY = 100;
        this.posicaoFinalX = 500;
        this.posicaoFinalY = 515;
        //Declaração das fórmulas usadas para calcular o movimento do jornal ao longo do tempo
        this.deslocamentoX = this.posicaoFinalX - this.posicaoInicialX;
        this.deslocamentoY = this.posicaoFinalY - this.posicaoInicialY;
        this.velocidadeX = this.deslocamentoX / this.tempoTotal;
        this.aceleracaoY = ((2 * this.deslocamentoY)) / (Math.pow(this.tempoTotal, 2));
    }

    preload() { //Carrega os arquivos que serão usados na cena
        this.load.image('jornal', 'src/assets/dia2/animacao/jornal.png');
        this.load.image('mesa', 'src/assets/dia2/animacao/mesa.png');
        this.load.image('fundo', 'src/assets/dia2/animacao/fundo.png');
        this.load.audio('voando', 'src/assets/dia2/animacao/voando.wav');
        this.load.audio('caiu', 'src/assets/dia2/animacao/caiu.wav');
    }

    create() {
        //Adiciona a imagem de fundo na tela
        this.add.image(400, 300, 'fundo');
        
        //Adiciona a mesa na cena
        this.mesa = this.add.image(500, 540, 'mesa').setScale(2.5);
        
        //Adiciona o jornal na tela
        this.jornal = this.add.image(this.posicaoInicialX, this.posicaoInicialY, 'jornal').setScale(0.6);
    
        // Carrega os áudios
        this.somVoando = this.sound.add('voando');
        this.somCaiu = this.sound.add('caiu');
    
        // Toca o som "voando"
        this.somVoando.play();
    
        // Animação do movimento do jornal
        this.tweens.add({
            targets: this.jornal,
            x: this.posicaoFinalX,
            y: this.posicaoFinalY,
            duration: this.tempoTotal,
            ease: t => 0.5 * this.aceleracaoY * Math.pow(t, 2),
            onUpdate: (tween, target) => {
                let t = tween.progress;
    
                target.rotation += (17 * Math.PI) / this.tempoTotal;
                target.x = this.posicaoInicialX + this.velocidadeX * t * this.tempoTotal;
                target.y = this.posicaoInicialY + 0.5 * this.aceleracaoY * Math.pow(t * this.tempoTotal, 2);

                // Impressão das variáveis no console
                console.log(`Tempo: ${((t * this.tempoTotal)/1000).toFixed(2)}s`);
                console.log(`X -> Posição: ${target.x.toFixed(2)} px, Velocidade: ${(this.velocidadeX*1000).toFixed(2)} px/s`);
                console.log(`Y -> Posição: ${target.y.toFixed(2)} px, Velocidade: ${((this.aceleracaoY * t * this.tempoTotal)*1000).toFixed(2)} px/s, Aceleração: ${(this.aceleracaoY*1000*1000).toFixed(2)} px/s²`);
                console.log('------------------------------------------------------------------------------------------------');
            },

            onComplete: () => {
                // Parar o som "voando" e tocar o som "caiu"
                this.somVoando.stop();
                this.somCaiu.play();
    
                // Após o jornal cair, inicia a animação da câmera
                this.cameras.main.zoomTo(4, 1000);
                this.cameras.main.pan(this.jornal.x, this.jornal.y, 1500, 'Sine.easeInOut');
            }
        });
    }
}    