var React = require("react");
var Post = require('./Post.jsx');

var getThumbnail = require('./../utils/getThumbnail');

var PostList = React.createClass({
    render: function() {
        var showThumbs = this.props.showThumbs;
        var items = this.props.data.map(function (item, i) {
            if (showThumbs)
                return (
                    <div key={i} className="row">
                        <div className="bg" style={{backgroundImage: 'url(' + item.data.thumbnail + ')'}} />
                        <div>
                            <div className="col-lg-2">
	                            {getThumbnail(item.data.thumbnail)}
                            </div>
                            <div className="col-lg-10">
                                <Post data={item.data} />
                            </div>
                        </div>
                    </div>
                );
            else
                return (
                    <div key={i} className="row">
                        <Post data={item.data} />
                    </div>
                );
        });

        return (
            <div>{items}</div>
        );
    }
});

module.exports = PostList;