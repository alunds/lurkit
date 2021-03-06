var React = require("react");
var SubredditList = require('./reddit/SubredditList.jsx');
var Settings = require('./settings/Settings.jsx');

var SettingsStore = require('./stores/SettingsStore');
SettingsStore.load();

var App = React.createClass({
    handleSettingsChanged: function(data) {
        this.setProps({data: data});
    },
    render: function() {
        return (
            <div className="container-fluid">
                <SubredditList data={this.props.data.redditConfig} />
                <Settings data={this.props.data} onSettingsChanged={this.handleSettingsChanged} />
            </div>
        );
    }
});

React.render(
    <App data={SettingsStore} />,
    document.getElementById('app'));