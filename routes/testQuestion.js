var express     = require('express');
var router      = express.Router();
var TestQuestion    = require('../app/models/testQuestion');

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
  res.send('About TestQuestions');
});

// on routes that end in /testQuestions
// ----------------------------------------------------
router.route('/')

	// create a testQuestion (accessed at POST http://localhost:8080/testQuestions)
	.post(function(req, res) {
		
		var testQuestion = new TestQuestion();		// create a new instance of the Bear model
		testQuestion._test = req.body.test_id;  // set the bears name (comes from the request)
		testQuestion._question = req.body.question_id;  // set the bears name (comes from the request)
		testQuestion.assignedTime = req.body.assignedTime;  // set the bears name (comes from the request)
        
		testQuestion.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'testQuestion created!' });
		});

		
	})

	// get all the testQuestions (accessed at GET http://localhost:8080/api/testQuestions)
	.get(function(req, res) {
		TestQuestion.find(function(err, testQuestions) {
			if (err)
				res.send(err);

			res.json(testQuestions);
		});
	});

// on routes that end in /testQuestions/:testQuestion_id
// ----------------------------------------------------
router.route('/:testQuestion_id')

	// get the testQuestion with that id
	.get(function(req, res) {
		TestQuestion.findById(req.params.testQuestion_id, function(err, testQuestion) {
			if (err)
				res.send(err);
			res.json(testQuestion);
		});
	})

	// update the testQuestion with this id
	.put(function(req, res) {
		TestQuestion.findById(req.params.testQuestion_id, function(err, testQuestion) {

			if (err)
				res.send(err);

			testQuestion._test = req.body.test_id;  // set the bears name (comes from the request)
			testQuestion._question = req.body.question_id;  // set the bears name (comes from the request)
			testQuestion.assignedTime = req.body.assignedTime;  // set the bears name (comes from the request)
 			testQuestion.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'TestQuestion updated!' });
			});

		});
	})

	// delete the testQuestion with this id
	.delete(function(req, res) {
		TestQuestion.remove({
			_id: req.params.testQuestion_id
		}, function(err, testQuestion) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;