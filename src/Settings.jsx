var React = require("react");

var SettingsStore = require('./stores/settingsStore');

var Settings = React.createClass({
    handleAddSubreddit: function(subreddit) {
        SettingsStore.addItem({title: subreddit.title, url: subreddit.url, interval: 10000});
        this.props.onSettingsChanged(SettingsStore.redditConfig);
    },
    handleRemoveSubreddit: function() {
        this.props.onSettingsChanged(SettingsStore.redditConfig);
    },
    render: function() {
        var items = this.props.data.map(function (item, i) {
            return (
                <div key={i} className="row">
                    <div className="two columns">
                        {item.title}
                    </div>
                    <div className="two columns">
                        {item.url}
                    </div>
                    <div className="one column">
                        <RemoveSubreddit index={i} onRemoveSubreddit={this.handleRemoveSubreddit} />
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div>
                {items}
                <AddSubredditForm onFormSubmit={this.handleAddSubreddit} />
            </div>
        );
    }
});

var RemoveSubreddit = React.createClass({
    handleClick:function(e){
        e.preventDefault();
        SettingsStore.remove(this.props.index);
        this.props.onRemoveSubreddit();
    },
    render:function(){
        return <a href onClick={this.handleClick}>X</a>;
    }
});

var AddSubredditForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var title = React.findDOMNode(this.refs.title).value.trim();
        var url = React.findDOMNode(this.refs.url).value.trim();
        if (!title || !url) {
            return;
        }
        this.props.onFormSubmit({title: title, url: url});
        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.url).value = '';
    },
    render: function() {
        return (
            <div className="row">
                <form onSubmit={this.handleSubmit}>
                    <div className="two columns">
                        <input type="text" placeholder="Subreddit title..." ref="title" />
                    </div>
                    <div className="two columns">
                        <input type="text" placeholder="Subreddit url..." ref="url" />
                    </div>
                    <div className="one column">
                        <input type="submit" value="Add" />
                    </div>
                </form>
            </div>
        );
    }
});

module.exports = Settings;