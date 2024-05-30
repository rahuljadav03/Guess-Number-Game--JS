let randomNumber = parseInt(Math.random() * 100 + 1);

const userInput = document.querySelector('#guessField');
const submit = document.querySelector('#submit');
const guessLot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.result');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please Give Valid Number !');
    }
    else if (guess < 1) {
        alert('Please Give Valid Number !');
    }
    else if (guess > 100) {
        alert('Please Give Valid Number !');
    }
    else {
        prevGuess.push(guess);
        if (numGuess >= 10) {
            CleanGuess(guess);
            displayMessage(`GameOver !`);
            endGame();
        }
        else {
            CleanGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage('You Guessed It Right !');
        endGame();
    }
    else if (guess < randomNumber) {
        displayMessage('Number Is Too Low !');
    }
    else if (guess > randomNumber) {
        displayMessage('Number Is Too High !');
    }
}

function CleanGuess(guess) {
    userInput.value = '';
    guessLot.innerHTML += `${guess},`;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h3>${message}</h3>`
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<button style="padding:10px; border-radius:5px ; border:none; margin-top:10px; font-size:16px;cursor:pointer;" id="newGame">Start New Game</button>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessLot.innerHTML = '';
        lowOrHi.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}