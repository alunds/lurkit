var storage = require('../utils/storage');

var STORAGE_KEY = 'settings';

var SettingsStore = {
    // default configuration
    redditConfig:[
        {url:"/", interval:60, showThumbs:true},
        {url:"/r/worldnews/", interval:60, showThumbs:false},
        {url:"/r/technology/", interval:60, showThumbs:false}
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