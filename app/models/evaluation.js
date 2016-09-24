// app/models/evaluation.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EvaluationSchema   = new Schema({
//    _candidate : { type:  Schema.Types.ObjectId, ref: 'Candidate' },
    _test : { type:  Schema.Types.ObjectId, ref: 'Test' },
    assignedDate : { type: Date, default: Date.now },
    expireDate : Date,
    result : Number,
    consumedTime : Number
});

module.exports = mongoose.model('Evaluation', EvaluationSchema);