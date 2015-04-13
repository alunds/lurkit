function getTitle (subredditUrl, data) {
    if (subredditUrl.indexOf("/r/") == -1)
        return "front";
    else if (data == "undefined" || data == null)
        return "";
    else
        return data.data.subreddit;
}

module.exports = getTitle;