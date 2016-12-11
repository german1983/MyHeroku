angular.module('pokemon.shared.service', [

])

// A RESTful factory for retrieving contacts from 'contacts.json'
.factory('baseStats', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/baseStats.json';
  var pokemonBaseStats = $http.get(path).then(function (resp) {
    return resp.data.pokemon;
  });

  var factory = {};
  factory.all = function () {
    return pokemonBaseStats;
  };
  factory.get = function (id) {
    return pokemonBaseStats.then(function(){
      return utils.findById(pokemonBaseStats, id);
    })
  };
  return factory;
}])

.factory('cpMultiplier', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/cpMultiplier.json';
  var pokemonCpMultipliers;
  var pokemonCpMultiplier = $http.get(path).then(function (resp) {
    factory.pokemonCpMultipliers = resp.data.multipliers;
    return resp.data.multipliers;
  });

  var factory = {};
  factory.all = function () {
    return pokemonCpMultiplier;
  };
  factory.getByLevel = function (level) {
    return pokemonCpMultiplier.then(function(){
      return utils.findByKey(pokemonCpMultipliers, level,"Level");
    })
  };
  return factory;
}])

.factory('starDust', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/stardust.json';
  var pokemonStardustLevel = $http.get(path).then(function (resp) {
    return resp.data.startdust;
  });

  var factory = {};
  factory.all = function () {
    return pokemonStardustLevel;
  };
  factory.getLevelByStardust = function (stardust) {
    return pokemonStardustLevel.then(function(){
      return utils.findByKey(pokemonStardustLevel, stardust, "Startdust");
    })
  };
  return factory;
}])

.factory('trainers', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/trainers.json';
  var pokemonTrainers = $http.get(path).then(function (resp) {
    return resp.data.trainers;
  });

  var factory = {};
  factory.all = function () {
    return pokemonTrainers;
  };
  return factory;
}])

.factory('messagesStep1', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/messages.json';
  var pokemonMessagesStep1 = $http.get(path).then(function (resp) {
    return resp.data.messages;
  });

  var factory = {};
  factory.all = function () {
    return pokemonMessagesStep1;
  };
  factory.getMessagesByTrainer = function (trainerId) {
    return pokemonMessagesStep1.then(function(data){
      return utils.findAllByKey(data, trainerId, "Trainer");
    })
  };
  return factory;
}])

.factory('messagesStep2', ['$http', 'utils', function ($http, utils) {
  var path = 'assets/messages2.json';
  var pokemonMessagesStep2 = $http.get(path).then(function (resp) {
    return resp.data.messages;
  });

  var factory = {};
  factory.all = function () {
    return pokemonMessagesStep2;
  };
  factory.getMessagesByTrainer = function (trainerId) {
    return pokemonMessagesStep2.then(function(data){
      return utils.findAllByKey(data, trainerId, "Trainer");
    })
  };
  return factory;
}])
;
