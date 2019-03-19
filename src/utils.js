function generateArrayOfNumbers(start, end) {
    const length = end - start + 1;
    return Array.apply(null, { length }).map((_, idx) => `${idx + start}`);
}

function removeElementFromArray(element, array) {
    let elementIndex = array.indexOf(element)
    if (elementIndex > -1) array.splice(elementIndex, 1)
}

module.exports = {
    generateArrayOfNumbers,
    removeElementFromArray,
}
