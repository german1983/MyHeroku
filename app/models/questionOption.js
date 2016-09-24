// app/models/questionOption.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionOptionSchema   = new Schema({
    _question : { type:  Schema.Types.ObjectId, ref: 'Question' },
    _option : { type:  Schema.Types.ObjectId, ref: 'Option' },
    isCorrect : Boolean,
    points : Number
});

module.exports = mongoose.model('QuestionOption', QuestionOptionSchema);