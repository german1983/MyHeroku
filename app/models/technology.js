// app/models/technology.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TechnologySchema   = new Schema({
    name : String,
    description : String
});

module.exports = mongoose.model('Technology', TechnologySchema);