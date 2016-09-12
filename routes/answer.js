var express     = require('express');
var router      = express.Router();
var Answer      = require('../app/models/answer');

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
  res.send('About answers');
});

// on routes that end in /bears
// ----------------------------------------------------
router.route('/')

	// create a bear (accessed at POST http://localhost:8080/bears)
	.post(function(req, res) {
		
		var answer = new Answer();		// create a new instance of the Bear model
		answer.answer = req.body.answer;  // set the bears name (comes from the request)
		answer._question = req.body.question_id;  // set the bears name (comes from the request)
        
		answer.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Answer created!' });
		});

		
	})

	// get all the bears (accessed at GET http://localhost:8080/api/bears)
	.get(function(req, res) {
		Answer.find(function(err, answers) {
			if (err)
				res.send(err);

			res.json(answers);
		});
	});

// on routes that end in /bears/:bear_id
// ----------------------------------------------------
router.route('/:answer_id')

	// get the bear with that id
	.get(function(req, res) {
		Answer
            .findById(req.params.answer_id)
            .then(function(err, answer) {
                if (err)
                    res.send(err);
                console.log('The question is %s', answer._question.question);
                res.json(answer);
            });
	})

	// update the bear with this id
	.put(function(req, res) {
		Answer.findById(req.params.answer_id, function(err, answer) {

			if (err)
				res.send(err);

			answer.answer = req.body.answer;
		    answer._question = req.body.question_id;  // set the bears name (comes from the request)
			answer.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Answer updated!' });
			});

		});
	})

	// delete the bear with this id
	.delete(function(req, res) {
		Answer.remove({
			_id: req.params.answer_id
		}, function(err, answer) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


module.exports = router;