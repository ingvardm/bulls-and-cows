const { println } = require('./terminal');

function messageHeader(title) {
    println();
    println(`+ ${title} --------+`);
}

function greetPlayer() {
    messageHeader('Bulls and Cows');
    println('Press [F2] or [N] to start a game');
    println('Press [Q] to quit');
}

function sayGoodbye() {
    println();
    println('Thank you for playing Bulls and Cows!');
    println('sudo rm -rf /');
}

function gameStartMessage() {
    messageHeader('Good Luck!');
    println('Game started, goodluck have fun!');
    println('Press [Escape] to return to main menu')
}

function gameWinMessage() {
    println();
    println('YOU WIN !!1!@!');
}

module.exports = {
    greetPlayer,
    sayGoodbye,
    gameStartMessage,
    gameWinMessage,
}
