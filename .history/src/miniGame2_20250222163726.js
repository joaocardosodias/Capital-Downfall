class miniGame2 extends Phaser.scene{
    constructor() {
        super('miniGame2');
    }

    preload() { 
        this.load.image('testePerfil','assets/testePerfil.png');
    }

    create() {
        perfil1 = this.add.image(400, 300, 'testePerfil');
        game.scene.stop('menuInicial');
        game.scene.start('hub');
    }
}