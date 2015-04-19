var React = require("react");

var RemoveSubreddit = React.createClass({
    handleClick:function(e){
        e.preventDefault();
        this.props.onRemoveSubreddit(this.props.index);
    },
    render:function(){
        return <a href onClick={this.handleClick}>Remove</a>;
    }
});

module.exports = RemoveSubreddit;