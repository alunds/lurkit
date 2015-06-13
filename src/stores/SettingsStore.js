var storage = require('../utils/storage');
var unpack = require('../utils/unpack');

var STORAGE_KEY = 'settings';

var SettingsStore = {
    // default configuration
    interval: 60,
    redditConfig:[
        {url:"/", showThumbs:true},
        {url:"/r/worldnews/", showThumbs:false},
        {url:"/r/technology/", showThumbs:false}
    ],

    addReddit(item) {
        if (this.redditConfig.length < 4) {
            this.redditConfig.push(item);
            this.save();
        }
        else {
            alert('A maximum of four subreddits can be monitored for now.');
        }
    },

    removeReddit(index) {
        if (this.redditConfig.length > 1) {
            this.redditConfig.splice(index, 1);
            this.save();
        }
        else {
            alert('There should be at least one subreddit active.');
        }
    },

    updateThumbnails(index) {
        this.redditConfig[index].showThumbs = !this.redditConfig[index].showThumbs;
        this.save();
    },

    restoreDefault() {
        this.redditConfig = [
            {url:"/", showThumbs:true},
            {url:"/r/worldnews/", showThumbs:false},
            {url:"/r/technology/", showThumbs:false}
        ];
        this.save();
    },

    load() {
        var json = storage.get(STORAGE_KEY);
        if (json) {
            unpack(JSON.parse(json), this);
        }
    },

    save() {
        storage.set(STORAGE_KEY, JSON.stringify(
            {
                interval: this.interval,
                redditConfig: this.redditConfig
            }));
    }
};

module.exports = SettingsStore;