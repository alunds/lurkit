var React = require("react");

var SettingsStore = require('./stores/settingsStore');
var Settings = require('./Settings.jsx');
var getColumnSpan = require('./utils/getColumnSpan');
var constants = require('./utils/constants');

SettingsStore.load();

var App = React.createClass({
    handleSettingsChanged: function(data) {
        this.setProps({data: data});
    },
    render: function() {
        return (
            <div>
                <Subreddits data={this.props.data} />
                <Settings data={this.props.data} onSettingsChanged={this.handleSettingsChanged} />
            </div>
        );
    }
});

var Subreddits = React.createClass({
    render: function() {
        var subreddits = this.props.data.map(function (subreddit) {
            return (
                <Subreddit title={subreddit.title} url={subreddit.url} pollInterval={subreddit.interval}/>
            );
        });
        return (
            <div className="row">
                {subreddits}
            </div>
        );
    }
});

var Subreddit = React.createClass({
    loadItemsFromServer: function() {
        $.ajax({
            url: this.props.url.concat('.json'),
            dataType: 'json',
            success: function(data) {
                this.setState({data: data.data.children});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadItemsFromServer();
        setInterval(this.loadItemsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className={getColumnSpan(SettingsStore.redditConfig.length, 12)}>
                <h6>{this.props.title}</h6>
                <SubredditItemList data={this.state.data} />
            </div>
        );
    }
});

var SubredditItemList = React.createClass({
    render: function() {
        var getThumbnail = function(url)
        {
            return (url == "" ||
                    url == "self" ||
                    url == "nsfw" ||
                    url == "default") ?
                <span>&nbsp;</span> :
                <img src={url} className="u-max-full-width" />;
        };

        var items = this.props.data.map(function (item) {
            return (
                <div className="row">
                    <div className="one columns">
                        <i>{item.data.score}</i>
                    </div>
                    <div className="one columns">
                        {getThumbnail(item.data.thumbnail)}
                    </div>
                    <div className="eight columns">
                        <strong><a href={item.data.url}>{item.data.title}</a></strong>
                    </div>
                    <div className="two columns comments">
                        <a href={constants.REDDIT_BASE_URL.concat(item.data.permalink)}>{item.data.num_comments} comments</a>
                    </div>
                </div>
            );
        });

        return (
            <div>{items}</div>
        );
    }
});

React.render(
    <App data={SettingsStore.redditConfig} />,
    document.getElementById('app'));