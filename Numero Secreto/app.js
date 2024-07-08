alert('Bem vindo ao jogo do número secreto!');
let numeroMaximo = 10;
let numeroSecreto = parseInt(Math.random() * numeroMaximo) + 1;
console.log('Este é o número secreto: ' + numeroSecreto);
let chute;
let tentativas = 0;

while(chute != numeroSecreto) {
    chute = prompt(`Digite um número entre 1 e ${numeroMaximo}: `)
    tentativas++;
    if (chute == numeroSecreto) {
        break;
        } 
    else if (chute > numeroSecreto) {
        alert(`O número secreto é menor! que ${chute}`);
    }
    else {
        alert(`O número secreto é maior! que ${chute}`);
    }
}
console.log(`Tentativas: ${tentativas}`);

let palavraTentativas = tentativas == 1 ? 'tentativa' : 'tentativas';
alert(`Parabéns! Você acertou o número secreto em ${tentativas} ${palavraTentativas}!`);


