var app = angular.module('app',['ngRoute']);
 
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/todos.html',
        controller: 'TodoController'
      });
  }]);

app.controller('TodoController', ['$scope', function($scope) {
     $scope.todos = [  { name: 'Master HTML/CSS/Javascript', completed: true },
			{ name: 'Learn AngularJS', completed: false },
			{ name: 'Build NodeJS backend', completed: false },
			{ name: 'Get started with ExpressJS', completed: false },
			{ name: 'Setup MongoDB database', completed: true },
			{ name: 'Be awesome!', completed: false }
		      ]; 
}]);

