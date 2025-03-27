class movimento extends Phaser.Scene {
    constructor() {
        super('movimento'); // Nome da cena
        // Declaração dos parâmetros usados para a animação
        this.tempoTotal = 1500; 
        this.posicaoInicialX = -32;
        this.posicaoInicialY = 100;
        this.posicaoFinalX = 500;
        this.posicaoFinalY = 515;
        // Cálculos para o movimento do jornal
        this.deslocamentoX = this.posicaoFinalX - this.posicaoInicialX;
        this.deslocamentoY = this.posicaoFinalY - this.posicaoInicialY;
        this.velocidadeX = this.deslocamentoX / this.tempoTotal;
        this.aceleracaoY = ((2 * this.deslocamentoY)) / (Math.pow(this.tempoTotal, 2));
    }

    preload() { // Carrega os arquivos necessários para a cena
        this.load.image('jornal', 'src/assets/dia2/animacao/jornal.png');
        this.load.image('mesa', 'src/assets/dia2/animacao/mesa.png');
        this.load.image('fundo', 'src/assets/dia2/animacao/fundo.png');
        this.load.audio('voando', 'src/assets/dia2/animacao/voando.wav');
        this.load.audio('caiu', 'src/assets/dia2/animacao/caiu.wav');
    }

    create() {
        // Adiciona o fundo na cena
        this.add.image(400, 300, 'fundo');
        
        // Adiciona a mesa na cena
        this.mesa = this.add.image(500, 540, 'mesa').setScale(2.5);
        
        // Adiciona o jornal na cena, inicialmente na posição X e Y definidas
        this.jornal = this.add.image(this.posicaoInicialX, this.posicaoInicialY, 'jornal').setScale(0.6);
    
        // Carrega os efeitos sonoros
        this.somVoando = this.sound.add('voando');
        this.somCaiu = this.sound.add('caiu');
    
        // Toca o som "voando"
        this.somVoando.play();
    
        // Criação da animação do movimento do jornal
        this.tweens.add({
            targets: this.jornal,
            x: this.posicaoFinalX, // Posição final em X
            y: this.posicaoFinalY, // Posição final em Y
            duration: this.tempoTotal, // Tempo total da animação
            ease: t => 0.5 * this.aceleracaoY * Math.pow(t, 2), // Função de easing para a aceleração
            onUpdate: (tween, target) => {
                let t = tween.progress; // Percentual de progresso da animação
    
                target.rotation += (17 * Math.PI) / this.tempoTotal; // Rotação do jornal
                target.x = this.posicaoInicialX + this.velocidadeX * t * this.tempoTotal; // Atualiza a posição X
                target.y = this.posicaoInicialY + 0.5 * this.aceleracaoY * Math.pow(t * this.tempoTotal, 2); // Atualiza a posição Y

                // Imprime no console as informações solicitadas no artefato 8
                console.log(`Tempo: ${((t * this.tempoTotal)/1000).toFixed(2)}s`);
                console.log(`X -> Posição: ${target.x.toFixed(2)} px, Velocidade: ${(this.velocidadeX*1000).toFixed(2)} px/s`);
                console.log(`Y -> Posição: ${target.y.toFixed(2)} px, Velocidade: ${((this.aceleracaoY * t * this.tempoTotal)*1000).toFixed(2)} px/s, Aceleração: ${(this.aceleracaoY*1000*1000).toFixed(2)} px/s²`);
                console.log('------------------------------------------------------------------------------------------------');
            },

            // Quando a animação terminar, executa o seguinte:
            onComplete: () => {
                // Para o som "voando" e toca o som "caiu"
                this.somVoando.stop();
                this.somCaiu.play();
    
                // A animação da câmera após o jornal cair
                this.cameras.main.zoomTo(4, 1000); // Aumenta o zoom
                this.cameras.main.pan(this.jornal.x, this.jornal.y, 1500, 'Sine.easeInOut'); // Movimenta a câmera até a posição do jornal
            }
        });
    }
}  
