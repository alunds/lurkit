var React = require("react");

var SettingsStore = require('./stores/settingsStore');

var Settings = React.createClass({
    handleSettingSubmit: function(setting) {
        SettingsStore.addItem({title: setting.title, url: setting.url, interval: 10000});
        this.props.onSettingsChanged(SettingsStore.redditConfig);
    },
    render: function() {
        var items = this.props.data.map(function (item) {
            return (
                <div className="row">
                    <div className="five columns">
                        {item.title}
                    </div>
                    <div className="five columns">
                        {item.url}
                    </div>
                </div>
            );
        });

        return (
            <div>
                {items}
                <SettingsForm onSettingSubmit={this.handleSettingSubmit} />
            </div>
        );
    }
});

var SettingsForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var title = React.findDOMNode(this.refs.title).value.trim();
        var url = React.findDOMNode(this.refs.url).value.trim();
        if (!title || !url) {
            return;
        }
        this.props.onSettingSubmit({title: title, url: url});
        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.url).value = '';
    },
    render: function() {
        return (
            <div className="row">
                <form onSubmit={this.handleSubmit}>
                    <div className="five columns">
                        <input type="text" placeholder="Subreddit title..." ref="title" />
                    </div>
                    <div className="five columns">
                        <input type="text" placeholder="Subreddit url..." ref="url" />
                    </div>
                    <div className="one column">
                        <input type="submit" value="Post" />
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = Settings;