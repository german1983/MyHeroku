// app/models/question.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionSchema   = new Schema({
    question    : String,
    _type : [{ type: Schema.Types.ObjectId, ref: 'Type' }]
});

module.exports = mongoose.model('Question', QuestionSchema);