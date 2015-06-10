var React = require("react");

var AddSubredditForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        var url = React.findDOMNode(this.refs.url).value.trim();
        var interval = React.findDOMNode(this.refs.interval).value.trim();
        var showThumbs = React.findDOMNode(this.refs.showThumbs).checked;

        if (url.length == 0 ||
            (url != "/" && url.substring(0, 3) != "/r/")) {
            alert("Invalid reddit url, please use '/r/*/'");
            return;
        }

        this.props.onFormSubmit({url: url, interval: interval, showThumbs: showThumbs});

        React.findDOMNode(this.refs.url).value = '';
        React.findDOMNode(this.refs.interval).value = '';
        React.findDOMNode(this.refs.showThumbs).reset();
    },
    render: function() {
        return (
            <form id="addSubredditForm" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-lg-5">
                        <input className="form-control" type="text" placeholder="Reddit url (eg '/r/food/') ..." ref="url" required />
                    </div>
                    <div className="col-lg-3">
                        <input className="form-control" type="number" placeholder="Interval ..." ref="interval" min="10" max="600" step="5" required />
                    </div>
                    <div className="col-lg-2">
                        <input className="form-control" type="checkbox" ref="showThumbs" />
                    </div>
                    <div className="col-lg-2 pull-right">
                        <input className="form-control pull-right" type="submit" value="Add" />
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = AddSubredditForm;