function getColumnSpan(numberOfReddits) {
    var columnSpan = recommendedSpan(numberOfReddits);
    return "col-lg-".concat(columnSpan);
}

function recommendedSpan(numberOfReddits) {
    switch (numberOfReddits) {
        case 4: return "3";
        case 3: return "4";
        case 2: return "6";
        case 1: return "12";
    }
}

module.exports = getColumnSpan;