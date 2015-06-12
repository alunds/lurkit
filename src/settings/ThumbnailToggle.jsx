var React = require("react");

var ThumbnailToggle = React.createClass({
    handleChange:function() {
        this.props.onThumbnailToggle(this.props.index);
    },
    render: function() {
        return <input className="form-control" type="checkbox" checked={this.props.data} onChange={this.handleChange} />;
    }
});

module.exports = ThumbnailToggle;