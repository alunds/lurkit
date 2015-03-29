var React = require("react");

var getColumnSpan = require('./utils/getColumnSpan');
var {REDDIT_BASE_URL} = require('./utils/constants');
var {REDDIT_CONFIG} = require('./utils/constants');

var App = React.createClass({
    render: function() {
        var reddits = REDDIT_CONFIG.map(function (reddit) {
            return (
                <Reddit title={reddit.title} url={reddit.url} pollInterval={reddit.interval}/>
            );
        });
        return (
            <div className="row">
                {reddits}
            </div>
        );
    }
});

var Reddit = React.createClass({
    loadItemsFromServer: function() {
        $.ajax({
            url: this.props.url,
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
            <div className={getColumnSpan(REDDIT_CONFIG.length, 12)}>
                <h6>{this.props.title}</h6>
                <RedditItemList data={this.state.data} />
            </div>
        );
    }
});

var RedditItemList = React.createClass({
    render: function() {
        var getThumbnail = function(url)
        {
            return (url != "" &&
                    url != "self" &&
                    url != "nsfw") ?
                <img src={url} className="u-max-full-width" /> :
                <span>&nbsp;</span>;
        };

        var items = this.props.data.map(function (item) {
            return (
                <div className="row">
                    <div className="one columns">
                        {item.data.score}
                    </div>
                    <div className="one columns">
                        {getThumbnail(item.data.thumbnail)}
                    </div>
                    <div className="eight columns">
                        <strong><a href={item.data.url}>{item.data.title}</a></strong>
                    </div>
                    <div className="two columns comments">
                        <a href={REDDIT_BASE_URL.concat(item.data.permalink)}>{item.data.num_comments} comments</a>
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
    <App />,
    document.getElementById('app'));