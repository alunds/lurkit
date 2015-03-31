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
                    <div className="five columns">
                        {item.title}
                    </div>
                    <div className="five columns">
                        <a href={item.url}>{item.url}</a>
                    </div>
                    <div className="two columns right">
                        <RemoveSubreddit index={i} onRemoveSubreddit={this.handleRemoveSubreddit} />
                    </div>
                </div>
            );
        }.bind(this));

        return (
            <div className="container settings">
                {items}
                <hr />
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
        return <a href onClick={this.handleClick}>Remove</a>;
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
        else if (url.length < 22 || url.substring(0, 22) != "http://www.reddit.com/")
        {
            alert("Invalid reddit url (use 'http://www.reddit.com/*')");
            return;
        }

        this.props.onFormSubmit({title: title, url: url});

        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.url).value = '';
    },
    render: function() {
        return (
            <form id="addSubredditForm" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="five columns">
                        <input type="text" placeholder="Subreddit title..." ref="title" className="u-full-width" />
                    </div>
                    <div className="five columns">
                        <input type="text" placeholder="Subreddit url..." ref="url" className="u-full-width" />
                    </div>
                    <div className="two columns right">
                        <input type="submit" value="Add" />
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = Settings;