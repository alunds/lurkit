function getColumnSpan(numberOfReddits, totalNumberOfColumns) {
    var roundedNumber = Math.round(totalNumberOfColumns / numberOfReddits);
    var numberWord = numberToWord(roundedNumber);
    return numberWord.concat(" columns reddit");
}

function numberToWord(number) {
    switch (number) {
        case 12: return "twelve";
        case 6: return "six";
        case 4: return "four";
        case 3: return "three";
        case 2: return "two";
        case 1: return "one";
    }
}

module.exports = getColumnSpan;