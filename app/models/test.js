// app/models/test.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TestSchema   = new Schema({
    _technology : { type:  Schema.Types.ObjectId, ref: 'Technology' },
    _level : { type:  Schema.Types.ObjectId, ref: 'Level' },
    questionQuantity : Number
});

module.exports = mongoose.model('Test', TestSchema);