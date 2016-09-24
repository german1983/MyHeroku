var express     = require('express');
var router      = express.Router();
var Option      = require('../app/models/option');

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
  res.send('About level');
});

// on routes that end in /options
// ----------------------------------------------------
router.route('/')

	// create a option (accessed at POST http://localhost:8080/options)
	.post(function(req, res) {
		
		var option = new Option();		// create a new instance of the Option model
		option.answerOption = req.body.answerOption;  // set the answerOption (comes from the request)
        
		option.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'option created!' });
		});

		
	})

	// get all the options (accessed at GET http://localhost:8080/api/options)
	.get(function(req, res) {
		Option.find(function(err, options) {
			if (err)
				res.send(err);

			res.json(options);
		});
	});

// on routes that end in /options/:option_id
// ----------------------------------------------------
router.route('/:option_id')

	// get the bear with that id
	.get(function(req, res) {
		Option
			.findOne({ _id: req.params.option_id })
            .exec(function(err, option) {
                if (err)
                    res.send(err);
                console.log('The option is %s', option.answerOption);
                res.json(option);
            });
	})

	// update the option with this id
	.put(function(req, res) {
		Option.findById(req.params.option_id, function(err, option) {

			if (err)
				res.send(err);

			option.answerOption = req.body.answerOption;  // set the answerOption (comes from the request)
			option.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Option updated!' });
			});

		});
	})

	// delete the option with this id
	.delete(function(req, res) {
		Option.remove({
			_id: req.params.option_id
		}, function(err, option) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


module.exports = router;