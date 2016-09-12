// app/models/answer.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AnswerSchema   = new Schema({
    _question : { type:  Schema.Types.ObjectId, ref: 'Question' },
    answer    : String
});

module.exports = mongoose.model('Answer', AnswerSchema);