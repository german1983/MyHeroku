// app/models/option.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OptionSchema   = new Schema({
    answerOption : String
});

module.exports = mongoose.model('Option', OptionSchema);