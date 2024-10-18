const cenario = document.getElementById("cenario");
const estudante = document.getElementById("estudante");

// dimensões do cenário e do estudante
const larguraCenario = cenario.offsetWidth;
const alturaCenario = cenario.offsetHeight;

const larguraEstudante = estudante.offsetWidth;
const alturaEstudante = estudante.offsetHeight;

// Inicializa as posições e direções do estudante *****PRECISA MUDAR, PRA QUANDO O BONECO INICAR O JOGO, FICA NO MEIO
let posicaoHorizontal = larguraCenario / 2 - larguraEstudante / 2; // Começa no meio horizontal
let posicaoVertical = alturaCenario / 2 - alturaEstudante / 2; 
let direcaoHorizontal = 0; 
let direcaoVertical = 0;  

const velocidade = 15; 
let estaAtirando = false;

// Ocultando o botão ao iniciar o jogo
const botaoInciar = document.getElementById("iniciar"); // Corrigido para "iniciar"

// Função chamada quando uma tecla é pressionada
const teclaPressionada = (tecla) => {
    if(tecla.key === "ArrowRight"){ // Se a tecla da seta para a direita é pressionada
        direcaoHorizontal = 1; 
    } else if(tecla.key === "ArrowLeft"){ // Se a tecla da seta para a esquerda
        direcaoHorizontal  = -1; 
    } else if (tecla.key === "ArrowDown"){ 
        direcaoVertical = 1; 
    } else if(tecla.key === "ArrowUp"){ 
        direcaoVertical = -1; 
    }
}

// Função chamada quando uma tecla é solta
const teclaNaoPressionada = (tecla) => {
    if(tecla.key === "ArrowRight" ){ 
        direcaoHorizontal = 0; 
    } else if(tecla.key === "ArrowLeft"){ 
        direcaoHorizontal  = 0; 
    } else if (tecla.key === "ArrowDown"){ 
        direcaoVertical = 0; 
    } else if(tecla.key === "ArrowUp"){ 
        direcaoVertical = 0; 
    }
}

// Função para mover o estudante e evitar que ele saia do cenário
const moverEstudante = () => {
    // Atualiza a posição com base na direção e velocidade
    posicaoHorizontal += direcaoHorizontal * velocidade;
    posicaoVertical += direcaoVertical * velocidade;
    
    // Checa se o estudante saiu dos limites à esquerda
    if(posicaoHorizontal < 0 ){
        posicaoHorizontal = 0; // Se sim, coloca na borda esquerda
    } else if (posicaoHorizontal + larguraEstudante > larguraCenario ){ 
        posicaoHorizontal = larguraCenario - larguraEstudante; // Borda direita
    }

    // Checa se o estudante saiu dos limites em cima
    if(posicaoVertical < 0 ){
        posicaoVertical = 0; // Se sim, coloca na borda superior
    } else if (posicaoVertical + alturaEstudante > alturaCenario ){
        posicaoVertical = alturaCenario - alturaEstudante; 
    }

    // Atualiza a posição do estudante na tela
    estudante.style.left = posicaoHorizontal + "px";
    estudante.style.top = posicaoVertical + "px"; 
}


//************************************************************************************************************ */
                                        //VERIFICAR SE REALMENTE ESTA EM FUNCIONAL *** MOSTRAR A KALIL

// MODIFICAR VELOCIDADE DO TIRO E CHECAR SE ESTA FUNCIONAL E NAO INTEREFERE NOS OUTROS COMANDOS E MUDAR NOMES SE NECESSÁRIO                                     

const tiroLivros = (posicaoLeftLivro, posicaoTopLivro) => {                 
    const livro = document.createElement("div");
    livro.className = "livro";
    livro.style.position = "absolute";
    livro.style.width = "10px";     
    livro.style.height = "10px";
    livro.style.background = "red";
    livro.style.left = posicaoLeftLivro + "px";
    livro.style.top = posicaoTopLivro + "px";
    cenario.appendChild(livro);
                                        
    // Movimento do livro
    const velocidadeY = -5;  // Velocidade vertical (vai subindo)
                                            
    // Função para mover o livro
    const moverLivro = (livro, posicaoAtual) => {
        const novaPosicao = { 
            left: posicaoAtual.left, 
            top: posicaoAtual.top + velocidadeY 
        }; // Cria um novo estado de posição
                                        
    livro.style.left = novaPosicao.left + "px";
    livro.style.top = novaPosicao.top + "px";
                                        
    // Continua o movimento enquanto o projétil está na tela
    if (novaPosicao.top > 0) {  // Condição para manter o movimento
        requestAnimationFrame(() => moverLivro(livro, novaPosicao));
    } else {
        // Remove o livro quando sai da tela
        livro.remove();
    }
    };
                                        
    // Iniciar o movimento
    moverLivro(livro, { left: posicaoLeftLivro, top: posicaoTopLivro });
    };
                                        
    // Função que chama tiroLivros
    const atirar = () => {
        if (estaAtirando) {
            tiroLivros(posicaoHorizontal + 45, posicaoVertical - 10);  // O 45 É PRO TIRO FICAR NA FRENTE DO BONECO
        }
    };
                                        
    document.addEventListener("keydown", (tecla) => {
        if (tecla.key === " ") {
            estaAtirando = true;
        }
    });
                                        
    document.addEventListener("keyup", (tecla) => {
        if (tecla.key === " ") {
            estaAtirando = false;
        }
});
// NECESSÁRIO MUDAR CODIGO DE MOVIMENTO. AO ATIRAR, NAO PERMITE SE MOVER EM DUAS DIREÇOES AO MESMO TEMPO                                        

// Função para iniciar o jogo
const iniciarJogo = () => {

    document.addEventListener("keydown", teclaPressionada); // Correção para "keydown"
    document.addEventListener("keyup", teclaNaoPressionada); // Correção para "keyup"

    const movendoEstudante = setInterval(moverEstudante, 50);

    // Verifica e lança livros a cada 100ms
    const checandoTiros =  setInterval(atirar, 10);
    // // Chama a função moverEstudante a cada 50ms
    // let checaMoveEstudante = setInterval(moverEstudante, 50);
    botaoInciar.style.display = "none"; // Oculta o botão de iniciar
    // let checalivros = setInterval(atirar, 10);
}
