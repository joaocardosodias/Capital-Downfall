//Variáveis utilizadas

let email;

let fundoAzul;

let fundoVermelho;

let emailAndou;

let emailChegou;

//Cria a cena da tela inicial do computador

class telaLogin extends Phaser.Scene 
{  
    constructor ()
    {
        super('telaLogin');
    }

    preload () 
    {
        //Preload das imagens guardadas em assets
        
        this.load.image('botao', 'assets/botaoLogin.png');

        this.load.image('fundoVermelho', 'assets/fundo_vermelho.jpg');

        this.load.image('fundoAzul', 'assets/fundo_azul.jpg');

        this.load.image('email', 'assets/email.png');

        //Coloca tanto a variável emailAndou quanto emailChegou como false, já que esses atos só ocorrem depois de determinadas ações

        emailAndou = false;

        emailChegou = false;
    }

    create () 
    {
        //Cria as diferentes imagens utilizadas, algumas sendo colocadas como invisível 

        game.scene.stop('hub');

        fundoAzul = this.add.image(400, 300, 'fundoAzul').setVisible(true);

        const botao = this.add.image(400,300, 'botao').setScale(0.5).setInteractive().setDepth(1);
    
        email = this.add.image(800,550, 'email').setDepth(1).setVisible(false).setScale(0.5);

        fundoVermelho = this.add.image(400,300, 'fundoVermelho').setDepth(0.5).setVisible(false);

        //Verifica se o botão foi pressionado

        botao.on('pointerdown', function (pointer)
        {
            // Torna o fundo azul invisível, faz o email e o fundo vermelho aparecer na tela, além de começar o movimento no update

            fundoAzul.setVisible(false);

            botao.setVisible(false);

            email.setVisible(true);

            fundoVermelho.setVisible(true);

            emailAndou = true;           
        });
    }

    update ()
    {
        // Checa se já pode começar o movimento

        if(emailAndou ==true)
            {
                //Caso o email não tenha chegado ao destino desejado, movimente ele por 3 pixels

                if(email.x > 600)
                {

                email.x = email.x - 3;

                }
            }

            // Caso ele já tenha passado o flag de movimento, inicie a checagem de se ele for pressionado

            if(email.x >590 && email.x <610 )
            {

                emailChegou = true;

            }
            
        // Checa se o email já chegou

        if(emailChegou == true)
        {
            // Checa se o email já foi pressionado

            email.setInteractive().on('pointerdown', function (pointer)
            {
                // Para a cena atual e inicia a próxima cena

                game.scene.stop('telaLogin');

                game.scene.start('dia1');

            });
        } 
    }
}