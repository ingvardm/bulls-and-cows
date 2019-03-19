const { generateArrayOfNumbers } = require('./utils');

module.exports = {
    standart: {
        numbers: generateArrayOfNumbers(1, 9),
        allowAdjasent: false,
        secretCombinationLength: 4,
    }
}
