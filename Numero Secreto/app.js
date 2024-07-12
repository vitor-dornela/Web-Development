let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 0;
let listaNumerosSorteados = []; 
exibirMenssagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMenssagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
}

function verificarChute() {
    tentativas++;
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';
        let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoNaTela('p', 'Errou! Continue chutando!');
        if (numeroSecreto > chute) {
            exibirTextoNaTela('h1', 'O número secreto é maior!');
        } else {
            exibirTextoNaTela('h1', 'O número secreto é menor!');
        }
        limparCampo();
    }

}

function gerarNumeroAleatorio() {
    // return Math.floor(Math.random() * 10) + 1;
    let numeroAleatorio = parseInt(Math.random() * 10) + 1;
    if (listaNumerosSorteados.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    }
    else {
        listaNumerosSorteados.push(numeroAleatorio);
        console.log(listaNumerosSorteados);
        return numeroAleatorio;
    }
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 0;
    exibirMenssagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}