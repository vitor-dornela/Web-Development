alert('Bem vindo ao jogo do número secreto!');
let numeroSecreto = 29;
let chute;
console.log('Este foi o chute: ' + chute);

while(chute != numeroSecreto) {
    chute = prompt('Digite um número até 100: ')
    if (chute == numeroSecreto) {
        alert(`Parabéns! Você acertou! ${numeroSecreto}`); // Template String
        } 
    else if (chute > numeroSecreto) {
        alert(`O número secreto é menor! que ${chute}`);
    }
    else {
        alert(`O número secreto é maior! que ${chute}`);
    }
}

