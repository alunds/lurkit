var storage = require('../utils/storage');

var STORAGE_KEY = 'settings';

var SettingsStore = {
    // default configuration
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
            alert('We should limit ourselves to a maximum of four subreddits for now.');
        }
    },

    remove(index) {
        if (this.redditConfig.length > 1) {
            this.redditConfig.splice(index, 1);
            this.save();
        }
        else {
            alert('We should keep at least one subreddit active.');
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