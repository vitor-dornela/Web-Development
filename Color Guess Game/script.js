const allColors = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];


// Selecionar subvetor com 10 cores aleatórias
const selectedColors = getRandomSubarray(allColors, 10);

// Mostrar as 10 cores selecionadas para o usuário
const colorListElement = document.getElementById('color-list');
selectedColors.forEach(color => {
    const li = document.createElement('li');
    li.textContent = color;
    li.style.backgroundColor = color;
    li.onclick = () => attempt(color);
    colorListElement.appendChild(li);
});

// Selecionar cor aleatória para o usuário adivinhar
let randomColor = selectedColors[Math.floor(Math.random() * selectedColors.length)];

let attempts = 0;

let gameOver = false;

function attempt(color) {
    if (gameOver) {
        alert("O jogo terminou. Clique em 'Reiniciar Jogo' para jogar novamente.");
        return;
    }

    attempts++;
    if (color === randomColor) {
        alert('Parabéns! Você acertou a cor!');
        const colorDisplay = document.getElementById('color-display');
        colorDisplay.style.backgroundColor = randomColor;
        colorDisplay.textContent = ''; // Remover o '?'
        gameOver = true;
    } else if (attempts < 3) {
        alert(`Tente novamente. Você ainda tem ${3 - attempts} tentativa(s).`);
    } else {
        alert(`Você perdeu! A cor correta era ${randomColor}.`);
        const colorDisplay = document.getElementById('color-display');
        colorDisplay.style.backgroundColor = randomColor;
        colorDisplay.textContent = ''; // Remover o '?'
        gameOver = true;
    }
}

// Função para obter 10 cores aleatórias do vetor de cores
function getRandomSubarray(arr, size) {
    const shuffled = arr.slice(0);
    let i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
// Evento de clique do botão de reiniciar
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', () => {
    location.reload();
});

