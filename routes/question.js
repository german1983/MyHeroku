var express     = require('express');
var router      = express.Router();
var Question    = require('../app/models/question');
var QuestionOption    = require('../app/models/questionOption');
var Option    	= require('../app/models/option');
var async = require('async');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
// router.get('/', function(req, res) {
//   res.send('Question home page');
// });

// define the about route
router.get('/about', function(req, res) {
  res.send('About questions');
});

// on routes that end in /questions
// ----------------------------------------------------
router.route('/')

	// create a question (accessed at POST http://localhost:8080/questions)
	.post(function(req, res) {
		
		var question = new Question();		// create a new instance of the Question model
		question.question = req.body.question;  // set the question (comes from the request)
		question._type = req.body.type_id;  // set the _type (comes from the request)
        
		question.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Question created!' });
		});

		
	})

	// get all the Questions (accessed at GET http://localhost:8080/api/questions)
	.get(function(req, res) {
		Question.find(function(err, questions) {
			if (err)
				res.send(err);

			res.json(questions);
		});
	});

	
router.route('/:question_id/options')

	// get all the Questions (accessed at GET http://localhost:8080/api/questions)
	.get(function(req, res) {
		
		QuestionOption.find({_question: req.params.question_id}, function(err, questionOptions) {
			if (err)
				res.send(err);
			//console.log("All QuestionOptions are: {0}", questionOptions);

			var allOptionIds = [];
			questionOptions.forEach(function (item) {
				allOptionIds.push(item._option);
			})

			Option.find({_id: { $in: allOptionIds }}, function(err, options) {
				if (err)
					res.send(err);
			//	console.log("My Options after Find are: {0}", options);
				res.json(options);
			});
		});
	});
	
// on routes that end in /questions/:question_id
// ----------------------------------------------------
router.route('/:question_id')

	// get the question with that id
	.get(function(req, res) {
		Question.findById(req.params.question_id, function(err, question) {
			if (err)
				res.send(err);
			res.json(question);
		});
	})

	// update the question with this id
	.put(function(req, res) {
		Question.findById(req.params.question_id, function(err, question) {

			if (err)
				res.send(err);

			question.question = req.body.question;  // set the question (comes from the request)
			question._type = req.body.type_id;  // set the _type (comes from the request)
			question.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Question updated!' });
			});

		});
	})

	// delete the question with this id
	.delete(function(req, res) {
		Question.remove({
			_id: req.params.question_id
		}, function(err, question) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;