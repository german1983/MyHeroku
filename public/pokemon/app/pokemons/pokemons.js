angular.module('pokemon.pokemons', [
  'ui.router'
])
  
.config(
  [          '$stateProvider', '$urlRouterProvider',
    function ($stateProvider,   $urlRouterProvider) {
      $stateProvider
        //////////////
        // Home //
        //////////////
        .state('pokemons', {

          // With abstract set to true, that means this state can not be explicitly activated.
          // It can only be implicitly activated by activating one of its children.
          abstract: true,

          // This abstract state will prepend '/home' onto the urls of all its children.
          url: '/pokemons',

          // Example of loading a template from a file. This is also a top level state,
          // so this template file will be loaded and then inserted into the ui-view
          // within index.html.
          templateUrl: 'views/pokemons/pokemons.html',

          // Use `resolve` to resolve any asynchronous controller dependencies
          // *before* the controller is instantiated. In this case, since contacts
          // returns a promise, the controller will wait until contacts.all() is
          // resolved before instantiation. Non-promise return values are considered
          // to be resolved immediately.
          resolve: {
            pokemonsBaseStats: ['baseStats',
              function( baseStats){
                return baseStats.all();
              }]
          },

          // You can pair a controller to your template. There *must* be a template to pair with.
          controller: ['$scope', '$state', 'pokemonsBaseStats', 'utils',
            function (  $scope,   $state,   pokemonsBaseStats,   utils) {

              // Add a 'contacts' field in this abstract parent's scope, so that all
              // child state views can access it in their scopes. Please note: scope
              // inheritance is not due to nesting of states, but rather choosing to
              // nest the templates of those states. It's normal scope inheritance.
              $scope.pokemonsBaseStats = pokemonsBaseStats;

              $scope.goToRandom = function () {
                var randId = utils.newRandomKey($scope.pokemonsBaseStats, "Id", $state.params.pokemonId);

                // $state.go() can be used as a high level convenience method
                // for activating a state programmatically.
                $state.go('pokemons.detail', { pokemonId: randId });
              };
            }]
        })

        /////////////////////
        // Pokemons > List //
        /////////////////////
        .state('pokemons.list', {
          url: '',
          templateUrl: 'views/pokemons/pokemons.list.html'
        })

        ///////////////////////
        // Pokemons > Detail //
        ///////////////////////
        .state('pokemons.detail', {

          url: '/{pokemonId:[0-9]{1,3}}',


          views: {
            '': {
              templateUrl: 'views/pokemons/pokemons.detail.html',
              controller: ['$scope', '$stateParams', 'utils',
                function (  $scope,   $stateParams,   utils) {
                  $scope.pokemon = utils.findById($scope.pokemonsBaseStats, $stateParams.pokemonId);
                }]
            },

            'selctedPokemon': {
              templateProvider: ['$stateParams',
                function (        $stateParams) {
                  return '<hr><small class="muted">Pokemon ID: ' + $stateParams.pokemonId + '</small>';
                }]
            }
          }
        })
        
        //////////////////////////////////
        // Pokemons > Detail > Evaluate //
        //////////////////////////////////
        .state('pokemons.detail.evaluate', {

          url: '/eval',

          resolve: {
            starDustProperties: ['starDust',
              function( starDust){
                return starDust.all();
              }],
            trainersAvailable: ['trainers',
              function( trainers){
                return trainers.all();
              }]
          },


          templateUrl: 'views/pokemons/pokemons.detail.evaluate.html',

          controller: ['$scope', '$state', '$stateParams', 'utils', 'starDustProperties', 'trainersAvailable', 'messagesStep1', 'messagesStep2',
                function (  $scope, $state,   $stateParams,   utils, starDustProperties, trainersAvailable, messagesStep1, messagesStep2) {
                    $scope.pokemon = utils.findById($scope.pokemonsBaseStats, $stateParams.pokemonId);
                    $scope.allStartDust = starDustProperties;
                    $scope.allTrainers = trainersAvailable;
                    $scope.allMessages = [];
                    $scope.allMessages2 = [];

                    $scope.trainerSelected = function(){
                            let trainerId = JSON.parse($scope.pokemon.selectedTrainer).Id;
                       console.log("Selected Trainer is:" + trainerId);
                        messagesStep1.getMessagesByTrainer(trainerId).then(function(filteredMessages){
                          $scope.allMessages = filteredMessages;
                        });
                        messagesStep2.getMessagesByTrainer(trainerId).then(function(filteredMessages){
                          $scope.allMessages2 = filteredMessages;
                        });
                    }

                    $scope.evaluate = function(pokemonToEvaluate) {
                        pokemonToEvaluate.selectedTrainerObject = JSON.parse($scope.pokemon.selectedTrainer);
                        pokemonToEvaluate.selectedMessage1Object = JSON.parse($scope.pokemon.selectedMessage1);
                        pokemonToEvaluate.selectedMessage2Object = JSON.parse($scope.pokemon.selectedMessage2);
                        
                        $state.go('pokemons.detail.evaluate.result',{pokemon: pokemonToEvaluate});
                    }
                }]
        }) // End state Pokemons > Detail > Evaluate


        ///////////////////////////////////////////
        // Pokemons > Detail > Evaluate > Result //
        ///////////////////////////////////////////


        .state('pokemons.detail.evaluate.result', {

          url: '/result',
          params: {
              pokemon: null
            },

          resolve: {
            cpMultipliers: ['cpMultiplier',
              function( cpMultiplier){
                return cpMultiplier.all();
              }]
          },

          templateUrl: 'views/pokemons/pokemons.detail.evaluate.result.html',

          controller: ['$scope', '$state', '$stateParams', '$evaluatePokemon','cpMultipliers', 'utils', 
                function (  $scope, $state,  $stateParams, $evaluatePokemon, cpMultipliers, utils) {
                  $scope.result = $state.params.pokemon;
                  $evaluatePokemon.eval($scope.result);
                }]
        }) // End state Pokemons > Detail > Evaluate > Result

        ;

    }
  ]
);
