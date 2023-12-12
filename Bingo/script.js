// Hide header title
document.getElementById('header-title').style.display = 'none';

// Show winner section
document.getElementById('winner-section').style.display = 'block';

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


function generateCards() {
    let cards = [generateColumn(5, 1, 15), generateColumn(5, 16, 30), generateColumn(5, 31, 45), generateColumn(5, 46, 60), generateColumn(5, 61, 75)];

    console.log(cards);
    return cards;
}

function subscribePlayer() {

    // Get player name
    const name = prompt('Digite o nome do player: ');
    if (name.length < 4) {
        alert('Nome muito curto');
        return;
    }
    const card = generateCards();

    // Create object player
    const player = {
        name: name,
        card: card
    };

    createCards(player);
}