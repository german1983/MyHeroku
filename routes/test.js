var express     = require('express');
var router      = express.Router();
var Test    = require('../app/models/test');

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
  res.send('About Tests');
});

// on routes that end in /tests
// ----------------------------------------------------
router.route('/')

	// create a test (accessed at POST http://localhost:8080/tests)
	.post(function(req, res) {
		
		var test = new Test();		// create a new instance of the Bear model
		test._technology = req.body.technology_id;  // set the bears name (comes from the request)
		test._level = req.body.level_id;  // set the bears name (comes from the request)
		test.questionQuantity = req.body.questionQuantity;  // set the bears name (comes from the request)
        
		test.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'test created!' });
		});

		
	})

	// get all the tests (accessed at GET http://localhost:8080/api/tests)
	.get(function(req, res) {
		Test.find(function(err, tests) {
			if (err)
				res.send(err);

			res.json(tests);
		});
	});

// on routes that end in /tests/:test_id
// ----------------------------------------------------
router.route('/:test_id')

	// get the test with that id
	.get(function(req, res) {
		Test.findById(req.params.test_id, function(err, test) {
			if (err)
				res.send(err);
			res.json(test);
		});
	})

	// update the test with this id
	.put(function(req, res) {
		Test.findById(req.params.test_id, function(err, test) {

			if (err)
				res.send(err);

				test._technology = req.body.technology_id;  // set the technology (comes from the request)
				test._level = req.body.level_id;  // set the level (comes from the request)
				test.questionQuantity = req.body.questionQuantity;  // set the questionQuantity (comes from the request)
        		test.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Test updated!' });
			});

		});
	})

	// delete the test with this id
	.delete(function(req, res) {
		Test.remove({
			_id: req.params.test_id
		}, function(err, test) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;