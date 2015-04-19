var storage = {
    get(key) {
        var value = localStorage[key];
        return (typeof value != 'undefined' ? value : null)
    },
    set(key, value) {
        localStorage[key] = value;
    }
};

module.exports = storage;