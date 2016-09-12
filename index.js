var express = require('express');
var app = express();
var fs = require("fs");
var mongoose   = require('mongoose');
mongoose.connect('mongodb://sa:Pk1234!@ds029486.mlab.com:29486/techscreening'); // connect to our database
var Bear     = require('./app/models/bear');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/db/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/addUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/db/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      data["user4"] = user["user4"];
      console.log( data );
      fs.writeFile( __dirname + "/db/" + "users.json", JSON.stringify( data ),  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("Data written successfully!");
        res.end( JSON.stringify(data));
      });
   });
})

app.get('/:id', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/db/" + "users.json", 'utf8', function (err, data) {
      users = JSON.parse( data );
      var user = users["user" + req.params.id] 
      console.log( user );
      res.end( JSON.stringify(user));
   });
})

var id = 2;

app.get('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/db/" + "users.json", 'utf8', function (err, data) {
      data = JSON.parse( data );
      delete data["user" + 2];
       
      console.log( data );
      res.end( JSON.stringify(data));
   });
	
})



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


