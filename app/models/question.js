// app/models/question.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    question    : String,
    answers : [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

module.exports = mongoose.model('Question', QuestionSchema);