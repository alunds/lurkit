var React = require("react");

var SettingsStore = require('./stores/SettingsStore');
var getColumnSpan = require('./utils/getColumnSpan');
var getThumbnail = require('./utils/getThumbnail');
var getTitle = require('./utils/getTitle');
var isFront = require('./utils/isFront');
var constants = require('./utils/constants');

var Subreddits = React.createClass({
    render: function() {
        var subreddits = this.props.data.map(function (subreddit) {
            return (
                <Subreddit key={subreddit.url} url={subreddit.url} interval={subreddit.interval} />
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
                <h6>{getTitle(this.props.url, this.state.data[0])}</h6>
                <SubredditItemList url={this.props.url} data={this.state.data} />
            </div>
        );
    }
});

var SubredditItemList = React.createClass({
    render: function() {
        var front = isFront(this.props.url);
        var items = this.props.data.map(function (item, i) {
            if (front)
                return (
                    <div key={i} className="row">
                        <div className="bg" style={{backgroundImage: 'url(' + item.data.thumbnail + ')'}} />
                        <div>
                            <div className="two columns">
	                            {getThumbnail(item.data.thumbnail)}
                            </div>
                            <div className="ten columns">
                                <Post data={item.data} />
                            </div>
                        </div>
                    </div>
                );
            else
                return (
                    <div key={i} className="row">
                        <Post data={item.data} />
                    </div>
                );
        });

        return (
            <div>{items}</div>
        );
    }
});

var Post = React.createClass({
    render: function() {
        return (
            <div>
                <strong><a href={this.props.data.url}>{this.props.data.title.replace("&amp;", "&")}</a></strong>
                <br />
                <div className="stats">
                    <i>{this.props.data.score}</i> points | <a href={constants.REDDIT_BASE_URL.concat(this.props.data.permalink)}>{this.props.data.num_comments} comments</a>
                </div>
            </div>
        )
    }
});

module.exports = Subreddits;