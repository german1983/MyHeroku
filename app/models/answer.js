// app/models/answer.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AnswerSchema   = new Schema({
    _question : { type:  Schema.Types.ObjectId, ref: 'Question' },
    _evaluation : { type:  Schema.Types.ObjectId, ref: 'Evaluation' },
    _questionOption : { type:  Schema.Types.ObjectId, ref: 'QuestionOption' },
    consumedTime : Number
});

module.exports = mongoose.model('Answer', AnswerSchema);