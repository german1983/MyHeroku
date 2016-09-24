// app/models/level.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LevelSchema   = new Schema({
    level : String
});

module.exports = mongoose.model('Level', LevelSchema);