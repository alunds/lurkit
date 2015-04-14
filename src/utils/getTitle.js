var isFront = require('./isFront');

function getTitle (redditUrl, data) {
    if (isFront(redditUrl))
        return "front";
    else if (data == "undefined" || data == null)
        return "";
    else
        return data.data.subreddit;
}

module.exports = getTitle;