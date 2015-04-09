var React = require("react");

var SettingsStore = require('./stores/SettingsStore');
var getColumnSpan = require('./utils/getColumnSpan');
var getThumbnail = require('./utils/getThumbnail');
var constants = require('./utils/constants');

var Subreddits = React.createClass({
    render: function() {
        var subreddits = this.props.data.map(function (subreddit) {
            return (
                <Subreddit key={subreddit.title} title={subreddit.title} url={subreddit.url} interval={subreddit.interval} />
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
        setInterval(this.loadItemsFromServer, this.props.interval * 1000);
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
        var items = this.props.data.map(function (item, i) {
            return (
                <div key={i} className="row">
                    <div className="one columns score">
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

module.exports = Subreddits;