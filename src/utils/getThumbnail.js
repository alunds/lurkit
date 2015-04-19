var thumbnailFilters = ["", "self", "nsfw", "default"];

function getThumbnail(thumbnailUrl) {
    return (thumbnailFilters.indexOf(thumbnailUrl) > -1) ?
        <span>&nbsp;</span> :
        <img src={thumbnailUrl} />;
}

module.exports = getThumbnail;