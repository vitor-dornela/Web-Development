//Store players
let players = [];
//Store drawn numbers
let drawnNumbers = [];

let gameRunning = false;
let gameInterval;
let winner;

function createCards(player) {

    // Select where to create the cards
    const div_card_parent = document.getElementById('cards_body');
    // Create the div for the cards
    const div_card = document.createElement('div');
    // Atribute the class name
    div_card.className = 'cards';
    // Insert the cards into the parent div
    div_card_parent.appendChild(div_card);
    // Create the h4 player name
    const h4_playername = document.createElement('h4');
    // Insert the text into the h4_playername
    h4_playername.innerText = player.name; // .textContent
    // Insert the player name into the div
    div_card.appendChild(h4_playername);

    // Create table
    const table = document.createElement('table');
    // Insert table into the div
    div_card.appendChild(table);

    // Create table head
    const thead = document.createElement('thead');
    // Insert thead into the table
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    // Insert tbody into the table
    table.appendChild(tbody);

    // Create table head rows [B, I, N, G, O]
    const letters = ['B', 'I', 'N', 'G', 'O'];
    for (let letter of letters) {
        const tr_head = document.createElement('th');
        tr_head.innerText = letter;
        thead.appendChild(tr_head);
    }

    // Create table body rows and columns
    for (let i=0; i<5; i++) {
        // Create table row
        const tr = document.createElement('tr');
        // Insert tr into the tbody
        tbody.appendChild(tr);

        for (let j=0; j<5; j++) {
            // Create table column (data)
            const td = document.createElement('td');
            td.innerText = player.card[j][i];
            // Insert td into the tr
            tr.appendChild(td);

        }
    }

}

// Generates card columns acording to Bingo rules (0-15, 16-30, 31-45, 46-60, 61-75)
function generateColumn (length, min, max) {
    let column = [];
    while (column.length < length) {
        let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!column.includes(randomNumber)) {
            column.push(randomNumber);
        }
    }
    return column;
}


/**
 * Generate an array of cards.
 *
 * @return {Array} The array of generated cards.
 */
function generateCards() {
    let cards = [generateColumn(5, 1, 15), generateColumn(5, 16, 30), generateColumn(5, 31, 45), generateColumn(5, 46, 60), generateColumn(5, 61, 75)];
    return cards;
}

function subscribePlayer() {

    // Prevent to add players when game is running 
    if(gameRunning) {
        alert("Não é possível adicionar jogadores com o jogo em andamento!");
    } 
    else {
        
    // Get player name
    const name = prompt('Digite o nome do player: ');
    if (name.length < 4) {
        alert('Nome muito curto');
        return;
    }
    const card = generateCards();

    // Create player object 
    const player = {
        name: name,
        card: card
    };

    players.push(player);
    createCards(player);
    };
}

function play(){
    

    // Minimum number of players
    if (players.length < 2) {
        alert('Insira pelo menos 2 jogadores');
    };
    // Prevent game to start if it is already running
    if (gameRunning) {
        alert("O jogo já está em andamento!");
    };

    // Start the game
    if  (!gameRunning && players.length > 1) {

    // Set game status to running
    gameRunning = true;
  
    let randomDrawnNumber;

    // Set the pace and draw the numbers
    gameInterval = setInterval(function() {
        while(true) {
            randomDrawnNumber = Math.floor(Math.random()*75 +1);
            if (!drawnNumbers.includes(randomDrawnNumber)){
                drawnNumbers.push(randomDrawnNumber);
                break;
            }
        }
        //Create the numbers in draw_body div
        const div_draw_body = document.getElementById('draw_body');
        const span_draw = document.createElement('span');
        span_draw.innerText = randomDrawnNumber;
        console.log(randomDrawnNumber)

        div_draw_body.appendChild(span_draw);

        // Color drawn numbers in the cards
        colorDrawnNumber(randomDrawnNumber);

        // Set the winner
        checkWinner();

        // Stop the game, if for any reason all numbers are drawn
        if (drawnNumbers.length >= 75) {
            alert("Sorteio Finalizado!");
            clearInterval(gameInterval);
        }
        

    // time in miliseconds to draw each number
    }, 100);
    }; // end if
    
    
}

function colorDrawnNumber(drawnNumber) {
    let cardNumbers = document.getElementsByTagName('td');

    for (let cardNumber of cardNumbers) {
        if (cardNumber.innerText == drawnNumber) {
            // Color the drawn number in the card
            cardNumber.classList.add('colorDrawnNumber');
        }
    }
}

// Function to check if a player has won
function checkPlayerCard(card, drawnNumbers, numbersToWin) {
    if (drawnNumbers.length < numbersToWin) {
        return false;
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (drawnNumbers.includes(card[i][j])) {
                continue;
            } else {
                return false;
            }
        }
    }

    return true;
}

function jogarBingo() {
    if (vetorJogadores.length < 2) {
        alert("Você precisa ter pelo menos dois jogadores para jogar!!!");
        return;
    }

    jogoRolando = true;
    let botaoGerarCartela = document.getElementById("botaoGerarCartela");
    botaoGerarCartela.classList.add("disabled");

    let vetorTds = document.getElementsByTagName("td");
    let numerosSorteados = [];
    let divSorteados = document.getElementById("sorteados");

    let intervalo = setInterval(function () {
        let numeroExiste = true;
        while (numeroExiste) {
            let numeroAleatorio = gerarNumeroAleatorio(1, 75);
            if (numerosSorteados.includes(numeroAleatorio)) {
                numeroExiste = true;
            } else {
                numeroExiste = false;
                numerosSorteados.push(numeroAleatorio);

                for (const element of vetorTds) {
                    if (element.innerText == numeroAleatorio) {
                        element.style.backgroundColor = "green";
                    }
                }

                let divNumero = document.createElement("div");
                divNumero.classList.add("col-2");
                divNumero.classList.add("sorteado");
                divNumero.innerText = numeroAleatorio;
                divSorteados.appendChild(divNumero);

                vetorJogadores.forEach(function (jogador) {
                    if (verificaCartela(jogador.cartela, numerosSorteados, 25)) {
                        console.log(`${jogador.nome} venceu!`);
                        let h2Vencedor = document.getElementById("vencedor");
                        h2Vencedor.innerText += `${jogador.nome} venceu!\n`;
                        clearInterval(intervalo);
                        jogoRolando = false;
                    }
                });
            }
        }

        if (numerosSorteados.length >= 75) {
            console.log("Sorteio Finalizado!");
            clearInterval(intervalo);
        }
    }, 200);
}

function reiniciarJogo(){
    let bingo = document.querySelector("#bingo");
    let areaSorteio = document.querySelector("#sorteados");

    let cards = document.querySelectorAll("#cards_body > div");
    let span = document.querySelectorAll("#draw_body > span");

    if (winner != null) {
        gameRunning = false;
    }    
    if(cards.length > 0 && !gameRunning) {
        cards.forEach(function(card){
            cards_area.removeChild(card);
        });
        span.forEach(function(drawnNumbers){
            draw_area.removeChild(drawnNumbers);
        })
        winner = document.getElementById("winner-name");
        winner.innerText = "";
        players = [];
        drawnNumbers = [];
        gameRunning = false

    // Show header title
    document.getElementById('header-title').style.display = 'flex';
    // Hide winner section
    document.getElementById('winner-section').style.display = 'none';
    }
    if (gameRunning){
        alert("Você não pode reiniciar o jogo enquanto ele está rolando!")
    }
}