var storage = require('../utils/storage');

var STORAGE_KEY = 'settings';

var SettingsStore = {
    redditConfig:[
        {title:"Front", url:"http://www.reddit.com/.json", interval:10000},
        {title:"World News", url:"http://www.reddit.com/r/worldnews/.json", interval:10000}
    ],

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