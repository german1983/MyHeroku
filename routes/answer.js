var express     = require('express');
var router      = express.Router();
var Answer      = require('../app/models/answer');
var QuestionOption    = require('../app/models/questionOption');

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

// on routes that end in /answers
// ----------------------------------------------------
router.route('/')

	// create an answer (accessed at POST http://localhost:8080/answers)
	.post(function(req, res) {
		
		var answer = new Answer();		// create a new instance of the Answer model
		answer._question = req.body.question_id;  // set the question_id (comes from the request)
		answer._evaluation = req.body.evaluation_id;  // set the evaluation_id  (comes from the request)
		answer.consumedTime = req.body.consumedTime;  // set the consumedTime  (comes from the request)

		QuestionOption.findOne({ _question: req.body.question_id, _option: req.body.option_id })
            .exec(function(err, questionOption) {
                if (err)
                    res.send(err);
                console.log('The question is %s', questionOption._id);
				answer._questionOption = questionOption._id;
				answer.save(function(err) {
					if (err)
						res.send(err);

					res.json({ message: 'Answer created!' });
				});
            });
	})

	// get all the answer (accessed at GET http://localhost:8080/api/answers)
	.get(function(req, res) {
		Answer.find(function(err, answers) {
			if (err)
				res.send(err);

			res.json(answers);
		});
	});

// on routes that end in /answer/:answer_id
// ----------------------------------------------------
router.route('/:answer_id')

	// get the bear with that id
	.get(function(req, res) {
		Answer
			.findOne({ _id: req.params.answer_id })
			.populate('_question _questionOption _evaluation')
            .exec(function(err, answer) {
                if (err)
                    res.send(err);
                console.log('The question is %s and the answer is %s and gives %s points', answer._question.question, answer._questionOption.isCorrect, answer._questionOption.points);
                res.json(answer);
            });
	})

	// update the answer with this id
	.put(function(req, res) {
		Answer.findById(req.params.answer_id, function(err, answer) {

			if (err)
				res.send(err);

			answer._question = req.body.question_id;  // set the question_id (comes from the request)
			answer._evaluation = req.body.evaluation_id;  // set the evaluation_id  (comes from the request)
			answer.consumedTime = req.body.consumedTime;  // set the consumedTime  (comes from the request)

			QuestionOption.findOne({ _question: req.params.question_id, _option: req.body.option_id })
				.exec(function(err, questionOption) {
					if (err)
						res.send(err);
					console.log('The question is %s', questionOption._id);
					answer._questionOption = questionOption._id;

					answer.save(function(err) {
						if (err)
							res.send(err);

						res.json({ message: 'Answer updated!' });
					});
				});
		});
	})

	// delete the answer with this id
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