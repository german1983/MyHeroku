// app/models/evaluationQuestion.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EvaluationQuestionSchema   = new Schema({
    _question : { type:  Schema.Types.ObjectId, ref: 'Question' },
    _evaluation : { type:  Schema.Types.ObjectId, ref: 'Evaluation' },
    assignedTime : Number,
    questionOrder : Number
});

module.exports = mongoose.model('EvaluationQuestion', EvaluationQuestionSchema);