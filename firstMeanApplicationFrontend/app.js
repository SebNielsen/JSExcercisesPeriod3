var app = angular.module("demoApp", ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home/home.html',
    controller: 'Controller',
    controllerAs : 'ctrl'
  });
  $routeProvider.when('/alljokes', {
    templateUrl: 'views/alljokes/alljokes.html',
    controller: 'Controller',
    controllerAs : 'ctrl'
  });
  $routeProvider.when('/createjoke', {
    templateUrl: 'views/createjoke/createjoke.html',
    controller: 'Controller',
    controllerAs : 'ctrl'
  });
}]);

app.controller('Controller', ['JokeFactory',function (JokeFactory) {
        var self = this;
        self.error = false;
        self.success = false;
        
        self.newJoke = {};
        
        self.fetchJokes = function(){
            JokeFactory.fetchJokesFromDB().then(
                function(result) {
                    self.jokes = result.data.data;
                });
        };
        self.fetchRandomJoke = function(){
            JokeFactory.fetchRandomJokeFromDB().then(
                function(result) {
                    self.randomJoke = result.data.data;
                });
        };
        
        self.updateJoke = function(id,updatedJoke) {
            JokeFactory.updateJokeInDB(id, updatedJoke).then(
                function(result) {
                    self.successMsg = result.data.message;
                });
        };
        
        self.removeJoke = function(id) {
            if(confirm("Are you sure you wanna delete this joke")){
                JokeFactory.removeJokeFromDB(id).then(
                    function(result) {
                        self.succes = true;
                        self.successMsg = result.data.message;
                    });
            }
        };
    }]);
  
app.factory('JokeFactory', ['$http', function ($http) {
    var baseURL = 'http://firstMeanOpenshift-sn130.rhcloud.com/api';
    
    var fetchJokesFromDB = function () {
        return $http.get(baseURL+'/jokes');
    };
    
    var fetchRandomJokeFromDB = function () {
        return $http.get(baseURL+'/jokes/random');
    };
    
    var updateJokeInDB =  function (id,joke) {
        return $http.put(baseURL+'/joke/'+id, joke);
    };
    
    var removeJokeFromDB = function (id) {
        return $http.delete(baseURL+'/joke/'+id);
    };
    
    return {
        fetchJokesFromDB: fetchJokesFromDB,
        fetchRandomJokeFromDB: fetchRandomJokeFromDB,
        updateJokeInDB: updateJokeInDB,
        removeJokeFromDB: removeJokeFromDB
    };
}]);

