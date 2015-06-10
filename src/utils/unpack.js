function unpack(source, destination) {
    var props = Object.keys(source);
    for (var i = 0; i < props.length; i++) {
        destination[props[i]] = source[props[i]];
    }
    return destination;
}

module.exports = unpack;