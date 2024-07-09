let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    lastButton: '',
    turnInProgress: false,
    turnNumber: 0,
    choices: ['button1', 'button2', 'button3', 'button4'],
}

function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];

    for(let circle of document.getElementsByClassName('circle')) {
        if (circle.getAttribute('data-listener') !== 'true') {
            circle.addEventListener('click', (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) { // checks if a game and turn is in progress
                    let move = e.target.getAttribute('id');
                    game.lastButton = move; // saves last button pressed
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                };
            });
            circle.setAttribute('data-listener', 'true');
        }
    }
    showScore();
    addTurn();
};

function showScore() {
    document.getElementById('score').innerText = game.score;
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add('light');
    // sets a delay before the action is carried out, here is 400ms
    setTimeout(() => {
        document.getElementById(circ).classList.remove('light');
    }, 400);
}

function showTurns() {
    game.turnInProgress = true; // sets to true at start of new turn
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) { // checks if turn over and resets if yes
            clearInterval(turns);
            game.tunrInProgress = false;
        }
    }, 800);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) { // checks if player turn matches sequence
        if (game.currentGame.length == game.playerMoves.length) { // checks if at end of sequence
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert('Wrong move!');
        newGame();
    }
}

module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn }; // use {} if expecting to export more than one object and function from file

