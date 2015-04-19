var React = require("react");

var AddSubredditForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        var url = React.findDOMNode(this.refs.url).value.trim();
        var interval = React.findDOMNode(this.refs.interval).value.trim();

        if (url.length < 22 || url.substring(0, 22) != "http://www.reddit.com/") {
            alert("Invalid reddit url, please use 'http://www.reddit.com/*'");
            return;
        }

        this.props.onFormSubmit({url: url, interval: interval});

        React.findDOMNode(this.refs.url).value = '';
        React.findDOMNode(this.refs.interval).value = '';
    },
    render: function() {
        return (
            <form id="addSubredditForm" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="eight columns">
                        <input type="url" placeholder="Subreddit url..." ref="url" className="u-full-width"
                            required />
                    </div>
                    <div className="two columns">
                        <input type="number" placeholder="Interval..." ref="interval" className="u-full-width"
                            min="10" max="600" step="5" required />
                    </div>
                    <div className="two columns right">
                        <input type="submit" value="Add" />
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = AddSubredditForm;