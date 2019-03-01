var app = angular.module('app',['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/todos.html',
        controller: 'TodoController'
      });
  }]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/notificaciones.html',
        controller: 'NotificacionesController'
      });
  }]);


app.factory('Todos', function(){
      return [{ name: 'Master HTML/CSS/Javascript', completed: true },
	      { name: 'Learn AngularJS', completed: false },
	      { name: 'Build NodeJS backend', completed: false },
	      { name: 'Get started with ExpressJS', completed: false },
	      { name: 'Setup MongoDB database', completed: true },
	      { name: 'Be awesome!', completed: false }
	     ];
});
app.factory('Notificaciones', function(){
      return [{ name: 'Master HTML/CSS/Javascript', completed: true },
        { name: 'Learn AngularJS', completed: false },
        { name: 'Build NodeJS backend', completed: false },
        { name: 'Get started with ExpressJS', completed: false },
        { name: 'Setup MongoDB database', completed: true },
        { name: 'Be awesome!', completed: false }
       ];
});

app.controller('TodoController', ['$scope','Todos', function($scope, Todos) {
     $scope.todos = Todos; 
}]);

 
 app.controller('NotificacionesController', ['$scope','Notificaciones', function($scope, Notificaciones) {
     $scope.notificaciones = Notificaciones; 
}]);


