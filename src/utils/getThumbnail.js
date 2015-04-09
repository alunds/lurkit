function getThumbnail(url) {
    return (url == "" ||
            url == "self" ||
            url == "nsfw" ||
            url == "default") ?
        <span>&nbsp;</span> :
        <img src={url} className="u-max-full-width" />;
}

module.exports = getThumbnail;