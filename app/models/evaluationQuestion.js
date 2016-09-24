// app/models/evaluationQuestion.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EvaluationQuestionSchema   = new Schema({
    _question : { type:  Schema.Types.ObjectId, ref: 'Question' },
    _evaluation : { type:  Schema.Types.ObjectId, ref: 'Evaluation' }
});

module.exports = mongoose.model('EvaluationQuestion', EvaluationQuestionSchema);