// Variáveis utilizadas
let perfil1;

class miniGame2 extends Phaser.Scene{
    constructor() {
        super('miniGame2');
    }

    preload() { 
        this.load.image('testePerfil','assets/testePerfil.png');
    }

    create() {
        perfil1 = this.add.image(400, 300, 'testePerfil');
    }
}