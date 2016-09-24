var express     = require('express');
var router      = express.Router();
var Level      = require('../app/models/level');

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
  res.send('About Level');
});

// on routes that end in /levels
// ----------------------------------------------------
router.route('/')

	// create a level (accessed at POST http://localhost:8080/levels)
	.post(function(req, res) {
		
		var level = new Level();		// create a new instance of the Level model
		level.level = req.body.level;  // set the level (comes from the request)
        
		level.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'level created!' });
		});

		
	})

	// get all the levels (accessed at GET http://localhost:8080/api/levels)
	.get(function(req, res) {
		Level.find(function(err, levels) {
			if (err)
				res.send(err);

			res.json(levels);
		});
	});

// on routes that end in /levels/:level_id
// ----------------------------------------------------
router.route('/:level_id')

	// get the bear with that id
	.get(function(req, res) {
		Level
			.findOne({ _id: req.params.level_id })
            .exec(function(err, level) {
                if (err)
                    res.send(err);
                console.log('The level is %s', level.level);
                res.json(level);
            });
	})

	// update the level with this id
	.put(function(req, res) {
		Level.findById(req.params.level_id, function(err, level) {

			if (err)
				res.send(err);

			level.level = req.body.level;
			level.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Level updated!' });
			});

		});
	})

	// delete the level with this id
	.delete(function(req, res) {
		Level.remove({
			_id: req.params.level_id
		}, function(err, level) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


module.exports = router;