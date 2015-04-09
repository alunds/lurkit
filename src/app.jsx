var React = require("react");

var SettingsStore = require('./stores/SettingsStore');
var Settings = require('./Settings.jsx');
var Subreddits = require('./Subreddits.jsx');

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

React.render(
    <App data={SettingsStore.redditConfig} />,
    document.getElementById('app'));