// app/models/questionType.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var QuestionTypeSchema   = new Schema({
    type : String
});

module.exports = mongoose.model('QuestionType', QuestionTypeSchema);