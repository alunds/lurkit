var React = require("react");
var PostList = require('./PostList.jsx');

var SettingsStore = require('./../stores/SettingsStore');
var getColumnSpan = require('./../utils/getColumnSpan');
var getTitle = require('./../utils/getTitle');

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
                <PostList url={this.props.url} data={this.state.data} />
            </div>
        );
    }
});

module.exports = Subreddit;