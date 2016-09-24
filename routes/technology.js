var express     = require('express');
var router      = express.Router();
var Technology    = require('../app/models/technology');

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
  res.send('About Technologies');
});

// on routes that end in /technologies
// ----------------------------------------------------
router.route('/')

	// create a bear (accessed at POST http://localhost:8080/technologies)
	.post(function(req, res) {
		
		var technology = new Technology();		// create a new instance of the Technology model
		technology.name = req.body.name;  // set the name (comes from the request)
		technology.description = req.body.description;  // set the description (comes from the request)
        
		technology.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Technology created!' });
		});

		
	})

	// get all the technologies (accessed at GET http://localhost:8080/api/technologies)
	.get(function(req, res) {
		Technology.find(function(err, technologies) {
			if (err)
				res.send(err);

			res.json(technologies);
		});
	});

// on routes that end in /technologies/:technologie_id
// ----------------------------------------------------
router.route('/:technology_id')

	// get the technologie with that id
	.get(function(req, res) {
		Technology.findById(req.params.technology_id, function(err, technology) {
			if (err)
				res.send(err);
			res.json(technology);
		});
	})

	// update the technologie with this id
	.put(function(req, res) {
		Technology.findById(req.params.technology_id, function(err, technology) {

			if (err)
				res.send(err);

			technology.name = req.body.name;  // set the name (comes from the request)
			technology.description = req.body.description;  // set the description (comes from the request)
    		technology.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'technology updated!' });
			});

		});
	})

	// delete the technology with this id
	.delete(function(req, res) {
		Technology.remove({
			_id: req.params.technology_id
		}, function(err, technology) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

module.exports = router;