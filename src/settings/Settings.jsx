var React = require("react");
var AddSubredditForm = require("./AddSubredditForm.jsx");
var RemoveSubreddit = require("./RemoveSubreddit.jsx");

var SettingsStore = require('./../stores/SettingsStore');

var Settings = React.createClass({
    handleAddSubreddit: function(subreddit) {
        SettingsStore.add({url: subreddit.url, interval: subreddit.interval, showThumbs: subreddit.showThumbs});
        this.props.onSettingsChanged(SettingsStore.redditConfig);
    },
    handleRemoveSubreddit: function(index) {
        SettingsStore.remove(index);
        this.props.onSettingsChanged(SettingsStore.redditConfig);
    },
    render: function() {
        var items = this.props.data.map(function (item, i) {
            return (
                <div key={i} className="row">
                    <div className="col-lg-6">
                        <a href={item.url}>{item.url}</a>
                    </div>
                    <div className="col-lg-3">
                        {item.interval} seconds
                    </div>
                    <div className="col-lg-1">
                        <input className="form-control" type="checkbox" checked={item.showThumbs} readonly />
                    </div>
                    <div className="col-lg-2 text-right">
                        <RemoveSubreddit index={i} onRemoveSubreddit={this.handleRemoveSubreddit} />
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div className="settings centered">
                {items}
                <hr />
                <AddSubredditForm onFormSubmit={this.handleAddSubreddit} />
            </div>
        );
    }
});

module.exports = Settings;