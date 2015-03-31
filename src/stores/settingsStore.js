var storage = require('../utils/storage');

var STORAGE_KEY = 'settings';

var SettingsStore = {
    redditConfig:[
        {title:"Front", url:"http://www.reddit.com/", interval:60000},
        {title:"World News", url:"http://www.reddit.com/r/worldnews/", interval:60000}
    ],

    addItem(item) {
        if (this.redditConfig.length < 4) {
            this.redditConfig.push(item);
            this.save();
        }
        else {
            alert('Whoa! Slow down there, partner.');
        }
    },

    remove(index) {
        if (this.redditConfig.length > 1) {
            this.redditConfig.splice(index, 1);
            this.save();
        }
        else {
            alert('I don\'t think that\'s a good idea.');
        }
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