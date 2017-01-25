var express     = require('express');
var router      = express.Router();
var fs          = require('fs');
var path = require('path');

var BASESTATS_FILE = path.join(__dirname, '../../public/pokemon/assets/pokemons.json');

// middleware specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the about route
router.get('/about', function(req, res) {
  res.send('About pokemons');
});

// on routes that end in /pokemon
// ----------------------------------------------------
router.route('/')

	// get all the pokemon (accessed at GET http://localhost:8080/api/pokemon/pokemon)
	.get(function(req, res) {
        debugger;
        
		 fs.readFile(BASESTATS_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(JSON.parse(data));
        });
	})
    // {
    //    "Id": 1,
    //    "Name": "Bulbasaur",
    //    "Attack": 118,
    //    "Defense": 118,
    //    "Stamina": 90,
    //    "Evolution": "Venusaur"
    //  }
    .post(function(req, res) {
        debugger;
        fs.readFile(BASESTATS_FILE, function(err, data) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            var pokemons = JSON.parse(data);
            // NOTE: In a real implementation, we would likely rely on a database or
            // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
            // treat Date.now() as unique-enough for our purposes.
            var newPokemon = {
                Id: Date.now(),
                PokemonId: req.body.pokemonId || 7,
                AttackIV: req.body.attackIV,
                DefenseIV: req.body.defenseIV,
                StaminaIV: req.body.staminaIV,
                Level: req.body.level,
            };
            pokemons.pokemon.push(newPokemon);
            fs.writeFile(BASESTATS_FILE, JSON.stringify(pokemons, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(pokemons);
            });
        });
    });
    
module.exports = router;