var React = require("react");

var GlobalSettings = React.createClass({
    render: function() {
        return (
            <div className="row">
                <div className="col-lg-3">
                    Refresh interval:
                </div>
                <div className="col-lg-3">
                    <input className="form-control" type="number" ref="interval" min="10" max="600" step="5" />
                </div>
                <div className="col-lg-6">
                </div>
            </div>
        );
    }
});

module.exports = GlobalSettings;