var express     = require('express');
var router      = express.Router();
var QuestionType    = require('../app/models/questionType');

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
  res.send('About questionTypes');
});

// on routes that end in /questionTypes
// ----------------------------------------------------
router.route('/')

	// create a bear (accessed at POST http://localhost:8080/questionTypes)
	.post(function(req, res) {
		
		var questionType = new QuestionType();		// create a new instance of the QuestionType model
		questionType.type = req.body.type;  // set the type (comes from the request)
        
		questionType.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'QuestionType created!' });
		});

		
	})

	// get all the questionTypes (accessed at GET http://localhost:8080/api/questionTypes)
	.get(function(req, res) {
		QuestionType.find(function(err, questionTypes) {
			if (err)
				res.send(err);

			res.json(questionTypes);
		});
	});

// on routes that end in /questionTypes/:questionType_id
// ----------------------------------------------------
router.route('/:questionType_id')

	// get the bear with that id
	.get(function(req, res) {
		QuestionType.findById(req.params.questionType_id, function(err, questionType) {
			if (err)
				res.send(err);
			res.json(questionType);
		});
	})

	// update the questionType with this id
	.put(function(req, res) {
		QuestionType.findById(req.params.questionType_id, function(err, questionType) {

			if (err)
				res.send(err);

				questionType.type = req.body.type;  // set the type (comes from the request)
				questionType.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'QuestionType updated!' });
			});

		});
	})

	// delete the questionType with this id
	.delete(function(req, res) {
		QuestionType.remove({
			_id: req.params.questionType_id
		}, function(err, questionType) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;