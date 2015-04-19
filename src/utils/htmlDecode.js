function htmlDecode(value){
    return $('<div/>').html(value).text();
}

module.exports = htmlDecode;