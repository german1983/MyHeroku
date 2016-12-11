var express     = require('express');
var router      = express.Router();
var EvaluationQuestion      = require('../app/models/evaluationQuestion');

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
  res.send('About evaluationQuestions');
});

// on routes that end in /evaluationQuestions
// ----------------------------------------------------
router.route('/')

	// create a evaluationQuestion (accessed at POST http://localhost:8080/evaluationQuestions)
	.post(function(req, res) {
		
		var evaluationQuestion = new EvaluationQuestion();		// create a new instance of the EvaluationQuestion model
		evaluationQuestion._question = req.body.question_id;  // set the _question (comes from the request)
		evaluationQuestion._evaluation = req.body.evaluation_id;  // set the _evaluation (comes from the request)
		evaluationQuestion.assignedTime = req.body.assignedTime;
		evaluationQuestion.questionOrder = req.body.questionOrder;
        
		evaluationQuestion.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'evaluationQuestion created!' });
		});

		
	})

	// get all the evaluationQuestions (accessed at GET http://localhost:8080/api/evaluationQuestions)
	.get(function(req, res) {
		EvaluationQuestion.find(function(err, evaluationQuestions) {
			if (err)
				res.send(err);

			res.json(evaluationQuestions);
		});
	});


router.route('/:evaluation_id/question/:questionNumber')

	// get all the Questions (accessed at GET http://localhost:8080/api/questions)
	.get(function(req, res) {
		
		EvaluationQuestion.find({_evaluation: req.params.evaluation_id, questionOrder: req.params.questionNumber})
			.populate('_question')
			.exec(function(err, evaluationQuestions) {
				if (err)
					res.send(err);
				res.json(evaluationQuestions);

			});
	});



// on routes that end in /evaluationQuestions/:evaluationQuestion_id
// ----------------------------------------------------
router.route('/:evaluationQuestion_id')

	// get the bear with that id
	.get(function(req, res) {
		EvaluationQuestion
			.findOne({ _id: req.params.evaluationQuestion_id })
			.populate('_question _evaluation')
            .exec(function(err, evaluationQuestion) {
                if (err)
                    res.send(err);
                console.log('The question is %s from evaluation %s', evaluationQuestion._question.question, evaluationQuestion._evaluation._id);
                res.json(evaluationQuestion);
            });
	})

	// update the evaluationQuestion with this id
	.put(function(req, res) {
		EvaluationQuestion.findById(req.params.evaluationQuestion_id, function(err, evaluationQuestion) {

			if (err)
				res.send(err);

			evaluationQuestion._question = req.body.question_id;  // set the _question (comes from the request)
			evaluationQuestion._evaluation = req.body.evaluation_id;  // set the _evaluation (comes from the request)
			evaluationQuestion.assignedTime = req.body.assignedTime;
			evaluationQuestion.questionOrder = req.body.questionOrder;

 			evaluationQuestion.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'EvaluationQuestion updated!' });
			});

		});
	})

	// delete the evaluationQuestion with this id
	.delete(function(req, res) {
		EvaluationQuestion.remove({
			_id: req.params.evaluationQuestion_id
		}, function(err, answer) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


module.exports = router;