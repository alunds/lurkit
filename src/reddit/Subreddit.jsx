var React = require("react");
var PostList = require('./PostList.jsx');

var SettingsStore = require('./../stores/SettingsStore');
var constants = require('./../utils/constants');
var getColumnSpan = require('./../utils/getColumnSpan');
var getTitle = require('./../utils/getTitle');

var Subreddit = React.createClass({
    loadItemsFromServer: function() {
        $.ajax({
            url: constants.REDDIT_BASE_URL.concat(this.props.url.concat('.json')),
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
        if (this.state.data.length == 0)
            return (
                <div className={getColumnSpan(SettingsStore.redditConfig.length)}>
                    <div className="reddit centered">
                        <div className="loading">
                            <span>Loading</span>
                            <div className="spinner"></div>
                        </div>
                    </div>
                </div>
            );
        return (
            <div className={getColumnSpan(SettingsStore.redditConfig.length)}>
                <div className="reddit centered">
                    <h3>{getTitle(this.props.url, this.state.data[0])}</h3>
                    <PostList url={this.props.url} showThumbs={this.props.showThumbs} data={this.state.data} />
                </div>
            </div>
        );
    }
});

module.exports = Subreddit;