var storage = require('../utils/storage');

var STORAGE_KEY = 'settings';

var SettingsStore = {
    redditConfig:[
        {title:"Front", url:"http://www.reddit.com/", interval:10000},
        {title:"World News", url:"http://www.reddit.com/r/worldnews/", interval:10000}
    ],

    addItem(item) {
        this.redditConfig.push(item);
        this.save();
    },

    remove(index) {
        this.redditConfig.splice(index, 1);
        this.save();
    },

    load() {
        var json = storage.get(STORAGE_KEY);
        if (json) {
            this.redditConfig = JSON.parse(json);
        }
    },

    save() {
        storage.set(STORAGE_KEY, JSON.stringify(this.redditConfig));
    }
};

module.exports = SettingsStore;