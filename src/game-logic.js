function _shuffle(_ = []) {
    const array = [..._];
    const lastIndex = array.length - 1;

    for (const idx in array) {
        const randomIndex = Math.floor(Math.random() * lastIndex + 1);
        const temp = array[randomIndex];

        array[randomIndex] = array[idx];
        array[idx] = temp;
    }

    return array;
}

function generateSecretCombination({ secretCombinationLength, numbers, allowAdjasent }) {
    const shuffledArray = _shuffle(numbers);

    if (allowAdjasent) return shuffledArray.splice(0, secretCombinationLength);

    let secretCombination = [shuffledArray.shift()];

    let index = 0;

    while (secretCombination.length < secretCombinationLength) {
        const value = shuffledArray[index];
        const originalIndex = numbers.indexOf(value);
        const lastValue = secretCombination[secretCombination.length - 1];
        const equalsLeftAdjasentValue = originalIndex > 0 && lastValue == numbers[originalIndex - 1];
        const equalsRightAdjasentValue = originalIndex < numbers.length && lastValue == numbers[originalIndex + 1];

        if (equalsLeftAdjasentValue || equalsRightAdjasentValue) {
            if (index >= shuffledArray.length - 1)
                index = 0;
            else index++;

            continue;
        }

        secretCombination.push(shuffledArray.splice(index, 1)[0]);
    }

    return secretCombination;
}

function validateUserCombination(userInput, secretCombination) {
    const userCombination = userInput.split('');

    let b = 0;
    let c = 0;

    userCombination.forEach((value, index) => {
        const indexInSecretCombination = secretCombination.indexOf(value);
        if (indexInSecretCombination > -1) {
            if (index == indexInSecretCombination) b++;
            else c++;
        }
    });

    return {
        b,
        c,
        win: b == secretCombination.length,
        //TODO: add validation against adjasentValues rule
        valid: true,
    }
}

module.exports = {
    generateSecretCombination,
    validateUserCombination,
}
