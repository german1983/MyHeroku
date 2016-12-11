// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/home', function(request, response) {
  response.render('pages/home', { title: 'ngTodo' });
});
app.get('/pokemon', function(request, response) {
  response.render('pokemon/home', { title: 'Pokemon Go IV calculator!' });
});


// DATABASE CONNECTION
// =============================================================================
var mongoose   = require('mongoose');
//mongoose.Promise = require('q').Promise;
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://sa:sa123@ds029486.mlab.com:29486/techscreening')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

// ROUTES FOR OUR API
// =============================================================================
var questions = require('./routes/question');
var answers = require('./routes/answer');
var evaluations = require('./routes/evaluation');
var questionOptions = require('./routes/questionOption');
var options = require('./routes/option');
var tests = require('./routes/test');
var evaluationQuestions = require('./routes/evaluationQuestion');
var levels = require('./routes/level');
var questionTypes = require('./routes/questionType');
var technologies = require('./routes/technology');
var testQuestions = require('./routes/testQuestion');

// REGISTER OUR ROUTES -------------------------------
app.use('/api/questions', questions);
app.use('/api/answers', answers);
app.use('/api/evaluations', evaluations);
app.use('/api/questionOptions', questionOptions);
app.use('/api/options', options);
app.use('/api/tests', tests);
app.use('/api/evaluationQuestions', evaluationQuestions);
app.use('/api/levels', levels);
app.use('/api/questionTypes', questionTypes);
app.use('/api/technologies', technologies);
app.use('/api/testQuestions', testQuestions);

// START THE SERVER
// =============================================================================
app.listen(app.get('port'), function() {
  console.log('Magic happens on port', app.get('port'));
});