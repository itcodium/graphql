var app = angular.module('app',['ngRoute','ngResource']);
 
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/todos.html',
        controller: 'TodoController'
      });
  }]);

 app.factory('Todos', ['$resource', function($resource){
          return $resource('/todos/:id', null, {
            'update': { method:'PUT' }
          });
        }]);

 

 app.controller('TodoController', ['$scope', '$routeParams','Todos','$location', function ($scope,$routeParams, Todos,$location) {
	$scope.editing = [];	 
	$scope.todos = Todos.query();
	$scope.todo = Todos.get({id: $routeParams.id });

	$scope.save = function(){
		if(!$scope.newTodo || $scope.newTodo.length < 1) return;
		var todo = new Todos({ name: $scope.newTodo, completed: false });
		todo.$save(function(){
		  $scope.todos.push(todo);
		  $scope.newTodo = ''; // clear textbox
		});
        }
	$scope.update = function(index){
		var todo = $scope.todos[index];
		Todos.update({id: todo._id}, todo, function(){
        	  	$scope.editing[index] = false;
	        });	
	}

	$scope.edit = function(index){
		$scope.editing[index] = angular.copy($scope.todos[index]);
	}

	$scope.cancel = function(index){
		$scope.todos[index] = angular.copy($scope.editing[index]);
		$scope.editing[index] = false;
	}

    	$scope.remove = function(index){
		var todo = $scope.todos[index];
            	Todos.remove({id: todo._id}, function(){
               	     $scope.todos.splice(index, 1);
           	 });
          }


 
    }]);



