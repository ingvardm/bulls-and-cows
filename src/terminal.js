const readline = require('readline');

function carretRetern() {
    process.stdout.write('\n');
}

function clearln() {
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);
}

function print(string = '') {
    process.stdout.write(String(string));
}

function println(string = '') {
    print(string);
    carretRetern();
}

function beep() {
    process.stdout.write('\x07');
}

module.exports = {
    carretRetern,
    print,
    println,
    clearln,
    beep,
}
