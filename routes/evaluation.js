var express     = require('express');
var router      = express.Router();
var Evaluation      = require('../app/models/evaluation');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
// router.get('/', function(req, res) {
//   res.send('Answer home page');
// });

// define the about route
router.get('/about', function(req, res) {
  res.send('About evaluations');
});

// on routes that end in /evaluations
// ----------------------------------------------------
router.route('/')

	// create a bear (accessed at POST http://localhost:8080/evaluations)
	.post(function(req, res) {
		
		var evaluation = new Evaluation();		// create a new instance of the Evaluation model
		evaluation.expireDate = req.body.expireDate;  // set the expireDate (comes from the request)
		evaluation._test = req.body.test_id;  // set the _test  (comes from the request)
        
		evaluation.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'evaluation created!' });
		});

		
	})

	// get all the evaluations (accessed at GET http://localhost:8080/api/evaluations)
	.get(function(req, res) {
		Evaluation.find(function(err, evaluations) {
			if (err)
				res.send(err);

			res.json(evaluations);
		});
	});

// on routes that end in /evaluations/:evaluation_id
// ----------------------------------------------------
router.route('/:evaluation_id')

	// get the bear with that id
	.get(function(req, res) {
		Evaluation
			.findOne({ _id: req.params.evaluation_id })
			.populate('_test')
            .exec(function(err, evaluation) {
                if (err)
                    res.send(err);
                console.log('The evaluation is from test %s', evaluation._test._id);
                res.json(answer);
            });
	})

	// update the evaluation with this id
	.put(function(req, res) {
		Evaluation.findById(req.params.evaluation_id, function(err, evaluation) {

			if (err)
				res.send(err);

			evaluation._test = req.body.test_id;
			evaluation.expireDate = req.body.expireDate; // this shouldn't be done like this... the expireDate should be able to be modified on a specific method
			evaluation.result = req.body.result; // this shouldn't be done like this... the result should be calculated when the last question is saved
			evaluation.consumedTime = req.body.consumedTime; // this shouldn't be done like this... the consumedTime should be calculated when the last question is saved
			answer.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Evaluation updated!' });
			});

		});
	})

	// delete the evaluation with this id
	.delete(function(req, res) {
		Evaluation.remove({
			_id: req.params.evaluation_id
		}, function(err, evaluation) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


module.exports = router;