function isFront(redditUrl) {
    return redditUrl.indexOf("/r/") == -1;
}

module.exports = isFront;