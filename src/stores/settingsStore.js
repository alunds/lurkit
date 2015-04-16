var storage = require('../utils/storage');

var STORAGE_KEY = 'settings';

var SettingsStore = {
    // default configuration
    redditConfig:[
        {url:"http://www.reddit.com/", interval:60},
        {url:"http://www.reddit.com/r/worldnews/", interval:60},
        {url:"http://www.reddit.com/r/technology/", interval:60}
    ],

    add(item) {
        if (this.redditConfig.length < 4) {
            this.redditConfig.push(item);
            this.save();
        }
        else {
            alert('A maximum of four subreddits can be monitored for now.');
        }
    },

    remove(index) {
        if (this.redditConfig.length > 1) {
            this.redditConfig.splice(index, 1);
            this.save();
        }
        else {
            alert('There should be at least one subreddit active.');
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