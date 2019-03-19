const readline = require('readline');
const terminal = require('./terminal');

readline.emitKeypressEvents(process.stdin);

let _bindings = {};
let _initialized = false;

function bindKeys(bindings) {
    _bindings = {
        ..._bindings,
        ...bindings
    }

    return () => unbindKeys(bindings);
}

function unbindKeys(keys) {
    for (let key in keys) delete keys[key];
}

function _onKeyPress(_, key) {
    const keyName = key.name;

    if (_bindings[keyName]) _bindings[keyName](keyName, key);
    else if (_bindings.any) _bindings.any(keyName, key);
    else terminal.beep();

    process.stdin.setRawMode(true);
}

function init() {
    if (_initialized) return;
    _initialized = true;
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', _onKeyPress);
}

function destroy() {
    process.stdin.removeListener('keypress', _onKeyPress);
    process.stdin.setRawMode(false);
    _bindings = {};
    _initialized = false;
}

module.exports = {
    init,
    destroy,
    bindKeys,
    unbindKeys,
}
