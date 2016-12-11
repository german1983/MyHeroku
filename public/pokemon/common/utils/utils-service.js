angular.module('pokemon.utils.service', [

])

.factory('utils', function () {
  return {
    // Util for finding an object by its 'id' property among an array
    findById: function findById(a, id) {
      for (var i = 0; i < a.length; i++) {
        if (a[i].Id == id) return a[i];
      }
      return null;
    },

    findByKey: function findByKey(a, value, key) {
      for (var i = 0; i < a.length; i++) {
        if (a[i][key] == value) return a[i];
      }
      return null;
    },

    findAllByKey: function findAllByKey(a, value, key) {
      var validOptions = [];
      for (var i = 0; i < a.length; i++) {
        if (a[i][key] == value) validOptions.push(a[i]);
      }
      return validOptions;
    },

    // Util for returning a random key from a collection that also isn't the current key
    newRandomKey: function newRandomKey(coll, key, currentKey){
      var randKey;
      do {
        randKey = coll[Math.floor(coll.length * Math.random())][key];
      } while (randKey == currentKey);
      return randKey;
    }
  };
});
