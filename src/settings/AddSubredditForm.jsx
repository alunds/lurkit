var React = require("react");

var AddSubredditForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        var url = React.findDOMNode(this.refs.url).value.trim();
        var showThumbs = React.findDOMNode(this.refs.showThumbs).checked;

        if (url.length == 0 ||
            (url != "/" && url.substring(0, 3) != "/r/")) {
            alert("Invalid reddit url, please use '/r/*/'");
            return;
        }

        this.props.onFormSubmit({url: url, showThumbs: showThumbs});

        React.findDOMNode(this.refs.url).value = '';
        React.findDOMNode(this.refs.showThumbs).checked = false;
    },
    render: function() {
        return (
            <form id="addSubredditForm" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-lg-7">
                        <input className="form-control" type="text" placeholder="Reddit sub-url only (eg '/r/food/') ..." ref="url" required />
                    </div>
                    <div className="col-lg-3">
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