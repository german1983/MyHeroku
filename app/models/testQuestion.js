// app/models/testQuestion.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TestQuestionSchema   = new Schema({
    _test : { type:  Schema.Types.ObjectId, ref: 'Test' },
    _question : { type:  Schema.Types.ObjectId, ref: 'Question' },
    assignedTime : Number
});

module.exports = mongoose.model('TestQuestion', TestQuestionSchema);