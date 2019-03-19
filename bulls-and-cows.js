const Game = require('./src/Game');
const RULES = require('./src/rules');
const inputHandler = require('./src/input-handler');
const { greetPlayer, sayGoodbye } = require('./src/dialogs');

let _gameRunning = false;

let _quitOngoingGame = () => { }

async function startGame() {
    if (_gameRunning) return;

    const game = new Game(RULES.standart);

    _gameRunning = true;
    _quitOngoingGame = game.quit;

    await game.start();

    _gameRunning = false;
    _quitOngoingGame = () => { }

    greetPlayer();
}

function quit() {
    if (_gameRunning) _quitOngoingGame();
    inputHandler.destroy();
    sayGoodbye();
    process.exit();
}

function initialize() {
    inputHandler.init();
    inputHandler.bindKeys({
        'c': (key, { ctrl }) => ctrl && quit(),
        'q': quit,
        'f2': startGame,
        'n': startGame,
    })
    greetPlayer();
}

initialize();
