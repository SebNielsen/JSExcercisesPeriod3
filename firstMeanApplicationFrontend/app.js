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

app.controller('Controller', ['JokeFactory', '$route','$rootScope',function (JokeFactory, $route, $rootScope) {
        var self = this;

        self.createJoke = function(){
            JokeFactory.createJokeInDB(self.newJoke).then(
                function(result) {
                    $rootScope.msg = result.data.message;
                    $rootScope.success = true;
                    $route.reload();
                });
        };

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
        
        self.updateJoke = function() {
            JokeFactory.updateJokeInDB(self.updatedJoke).then(
                function(result) {
                    $rootScope.msg = result.data.message;
                    $rootScope.success = true;
                    $route.reload();
                });
        };
        
        self.removeJoke = function(id) {
            if(confirm("Are you sure you wanna delete this joke")){
                JokeFactory.removeJokeFromDB(id).then(
                    function(result) {
                        $rootScope.msg = result.data.message;
                        $rootScope.success = true;
                        $route.reload();
                    });
            }
        };
    }]);
  
app.factory('JokeFactory', ['$http', function ($http) {
    var baseURI = 'http://firstmean-sn130.rhcloud.com/api';

    var createJokeInDB = function(joke) {
        return $http.post(baseURI+'/jokes', joke);
    };

    var fetchJokesFromDB = function () {
        return $http.get(baseURI+'/jokes');
    };
    
    var fetchRandomJokeFromDB = function () {
        return $http.get(baseURI+'/jokes/random');
    };
    
    var updateJokeInDB =  function (joke) {
        return $http.put(baseURI+'/joke/'+joke._id, joke);
    };
    
    var removeJokeFromDB = function (id) {
        return $http.delete(baseURI+'/joke/'+id);
    };
    
    return {
        createJokeInDB: createJokeInDB,
        fetchJokesFromDB: fetchJokesFromDB,
        fetchRandomJokeFromDB: fetchRandomJokeFromDB,
        updateJokeInDB: updateJokeInDB,
        removeJokeFromDB: removeJokeFromDB
    };
}]);

