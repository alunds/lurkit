var React = require("react");

var constants = require('./../utils/constants');
var htmlDecode = require('./../utils/htmlDecode');

var Post = React.createClass({
    render: function() {
        return (
            <div>
                <strong><a href={this.props.data.url}>{htmlDecode(this.props.data.title)}</a></strong>
                <br />
                <div className="stats">
                    <i>{this.props.data.score}</i> points
                    &nbsp;|&nbsp;
                    <a href={constants.REDDIT_BASE_URL.concat(this.props.data.permalink)}>
                        {this.props.data.num_comments} comments
                    </a>
                </div>
            </div>
        )
    }
});

module.exports = Post;