var express     = require('express');
var router      = express.Router();
var QuestionOption    = require('../app/models/questionOption');

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
  res.send('About questionsOptions');
});

// on routes that end in /questionOptions
// ----------------------------------------------------
router.route('/')

	// create a bear (accessed at POST http://localhost:8080/questionOptions)
	.post(function(req, res) {
		
		var questionOption = new QuestionOption();		// create a new instance of the QuestionOption model
		questionOption._question = req.body.question_id;  // set the _question (comes from the request)
		questionOption._option = req.body.option_id;  // set the _option (comes from the request)
		questionOption.isCorrect = req.body.isCorrect;  // set the isCorrect(comes from the request)
		questionOption.points = req.body.points;  // set the points (comes from the request)
        
		questionOption.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'QuestionOption created!' });
		});

		
	})

	// get all the questionOption (accessed at GET http://localhost:8080/api/questionOptions)
	.get(function(req, res) {
		QuestionOption.find(function(err, questionOptions) {
			if (err)
				res.send(err);

			res.json(questionOptions);
		});
	});

// on routes that end in /questionOptions/:questionOption_id
// ----------------------------------------------------
router.route('/:questionOption_id')

	// get the bear with that id
	.get(function(req, res) {
		QuestionOption.findById(req.params.questionOption_id, function(err, questionOption) {
			if (err)
				res.send(err);
			res.json(questionOption);
		});
	})

	// update the bear with this id
	.put(function(req, res) {
		QuestionOption.findById(req.params.questionOption_id, function(err, questionOption) {

			if (err)
				res.send(err);

			questionOption._question = req.body.question_id;  // set the _question (comes from the request)
			questionOption._option = req.body.option_id;  // set the _option (comes from the request)
			questionOption.isCorrect = req.body.isCorrect;  // set the isCorrect(comes from the request)
			questionOption.points = req.body.points;  // set the points (comes from the request)
    
			questionOption.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'QuestionOption updated!' });
			});

		});
	})

	// delete the questionOption with this id
	.delete(function(req, res) {
		QuestionOption.remove({
			_id: req.params.questionOption_id
		}, function(err, questionOption) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;