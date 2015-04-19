var React = require("react");
var Subreddit = require('./Subreddit.jsx');

var SubredditList = React.createClass({
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

module.exports = SubredditList;