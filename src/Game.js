const RULES = require('./rules');
const inputHandler = require('./input-handler');
const { gameStartMessage, gameWinMessage } = require('./dialogs');
const terminal = require('./terminal');
const { generateSecretCombination, validateUserCombination } = require('./game-logic');

class Game {
    constructor(ruleSet = RULES.standart) {
        this.ruleSet = ruleSet;
        this.secretCombination = [];
        this.state = {
            input: '',
        }

        this.start = this.start.bind(this);
        this._startGame = this._startGame.bind(this);
        this.setState = this.setState.bind(this);
        this._redraw = this._redraw.bind(this);
        this.quit = this.quit.bind(this);
        this._getUserInput = this._getUserInput.bind(this);
        this._onBackspace = this._onBackspace.bind(this);
        this._validateUserInput = this._validateUserInput.bind(this);
        this._unbindKeys = inputHandler.bindKeys({
            'backspace': this._onBackspace,
            'escape': this.quit,
            'return': this._getUserInput,
            'any': this._validateUserInput
        });
        this._unbindKeys = this._unbindKeys.bind(this);
    }

    _validateUserInput(key) {
        const keyAsNumber = parseInt(key);
        const { numbers } = this.ruleSet;
        const smallestNumber = numbers[0];
        const largestNumber = numbers[numbers.length - 1];
        const { input } = this.state;
        const { secretCombinationLength } = this.ruleSet;

        if ((keyAsNumber >= smallestNumber || keyAsNumber <= largestNumber) && input.length < secretCombinationLength) {
            process.stdout.write(key);
            this.setState({ input: `${input}${key}` });
        } else {
            terminal.beep();
        }
    }

    _onBackspace() {
        const { input } = this.state;
        const inputLength = input.length;

        if (!inputLength) {
            terminal.beep();
            return;
        }

        const poppedString = input.substring(0, inputLength - 1);
        this.setState({ input: poppedString });
    }

    setState(newState = {}) {
        this.state = {
            ...this.state,
            ...newState
        }

        this._redraw();
    }

    _redraw() {
        const { input } = this.state;
        terminal.clearln();
        terminal.print(input);
    }

    _getUserInput() {
        const { input } = this.state;

        if (input.length < this.ruleSet.secretCombinationLength) {
            terminal.beep();
            return;
        }

        const { b, c, win, valid } = validateUserCombination(input, this.secretCombination);

        if (!valid) return terminal.println('Invalid!');

        if (win) {
            gameWinMessage();
            this.quit();
            return;
        }

        let result = ' | ';

        for (let i = 0; i < b; i++)
            result += 'B';

        for (let i = 0; i < c; i++)
            result += 'C';

        terminal.println(result);

        this.setState({ input: '' });
    }

    async _startGame() {
        gameStartMessage();
        this.secretCombination = generateSecretCombination(this.ruleSet);
    }

    quit() {
        this._unbindKeys();
        this._onGameEnd();
    }

    _onGameEnd() { }

    start() {
        this._startGame();
        return new Promise(resolve => this._onGameEnd = resolve);
    }
}

module.exports = Game;
