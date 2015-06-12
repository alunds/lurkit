var React = require("react");
var AddSubredditForm = require("./AddSubredditForm.jsx");
var RemoveSubreddit = require("./RemoveSubreddit.jsx");
var ThumbnailToggle = require("./ThumbnailToggle.jsx");
//var GlobalSettings = require("./GlobalSettings.jsx");

var SettingsStore = require('./../stores/SettingsStore');
var constants = require('./../utils/constants');

var Settings = React.createClass({
    handleAddSubreddit: function(subreddit) {
        SettingsStore.addReddit({url: subreddit.url, showThumbs: subreddit.showThumbs});
        this.props.onSettingsChanged(SettingsStore);
    },
    handleRemoveSubreddit: function(index) {
        SettingsStore.removeReddit(index);
        this.props.onSettingsChanged(SettingsStore);
    },
    handleThumbnailToggle: function(index) {
        SettingsStore.updateThumbnails(index);
        this.props.onSettingsChanged(SettingsStore);
    },
    render: function() {
        var items = this.props.data.redditConfig.map(function (item, i) {
            return (
                <div key={i} className="row">
                    <div className="col-lg-7">
                        reddit.com<a href={constants.REDDIT_BASE_URL.concat(item.url)}>{item.url}</a>
                    </div>
                    <div className="col-lg-3">
                        <ThumbnailToggle index={i} onThumbnailToggle={this.handleThumbnailToggle} data={item.showThumbs} />
                    </div>
                    <div className="col-lg-2 text-right">
                        <RemoveSubreddit index={i} onRemoveSubreddit={this.handleRemoveSubreddit} />
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div className="settings centered">
                <div className="row">
                    <div className="col-lg-7">
                        <strong>My Reddits</strong>
                    </div>
                    <div className="col-lg-3">
                        <strong>Thumbnails</strong>
                    </div>
                </div>
                <hr />
                {items}
                <hr />
                <AddSubredditForm onFormSubmit={this.handleAddSubreddit} />
            </div>
        );
    }
});

module.exports = Settings;