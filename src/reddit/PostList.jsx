var React = require("react");
var Post = require('./Post.jsx');

var isFront = require('./../utils/isFront');
var getThumbnail = require('./../utils/getThumbnail');

var PostList = React.createClass({
    render: function() {
        var front = isFront(this.props.url);
        var items = this.props.data.map(function (item, i) {
            if (front)
                return (
                    <div key={i} className="row">
                        <div className="bg" style={{backgroundImage: 'url(' + item.data.thumbnail + ')'}} />
                        <div>
                            <div className="two columns">
	                            {getThumbnail(item.data.thumbnail)}
                            </div>
                            <div className="ten columns">
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