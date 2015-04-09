var React = require("react");

var SettingsStore = require('./stores/SettingsStore');

var Settings = React.createClass({
    handleAddSubreddit: function(subreddit) {
        SettingsStore.addItem({title: subreddit.title, url: subreddit.url, interval: subreddit.interval});
        this.props.onSettingsChanged(SettingsStore.redditConfig);
    },
    handleRemoveSubreddit: function() {
        this.props.onSettingsChanged(SettingsStore.redditConfig);
    },
    render: function() {
        var items = this.props.data.map(function (item, i) {
            return (
                <div key={i} className="row">
                    <div className="four columns">
                        {item.title}
                    </div>
                    <div className="four columns">
                        <a href={item.url}>{item.url}</a>
                    </div>
                    <div className="two columns">
                        {item.interval} seconds
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
        var interval = React.findDOMNode(this.refs.interval).value.trim();

        if (!title || !url) {
            return;
        }
        else if (url.length < 22 || url.substring(0, 22) != "http://www.reddit.com/") {
            alert("Invalid reddit url (use 'http://www.reddit.com/*')");
            return;
        }
        if (isNaN(interval) || interval < 10 || interval > 600) {
            alert("Interval should be more than 10 seconds and less than 600 seconds.");
            return;
        }

        this.props.onFormSubmit({title: title, url: url, interval: interval});

        React.findDOMNode(this.refs.title).value = '';
        React.findDOMNode(this.refs.url).value = '';
        React.findDOMNode(this.refs.interval).value = '';
    },
    render: function() {
        return (
            <form id="addSubredditForm" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="four columns">
                        <input type="text" placeholder="Subreddit title..." ref="title" className="u-full-width" />
                    </div>
                    <div className="four columns">
                        <input type="text" placeholder="Subreddit url..." ref="url" className="u-full-width" />
                    </div>
                    <div className="two columns">
                        <input type="text" placeholder="Interval..." ref="interval" className="u-full-width" />
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