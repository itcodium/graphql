var app = angular.module('app', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/todos.html',
			controller: 'NotificacionesController'
		});
}]);

app.factory('Notificaciones', ['$resource', function ($resource) {
	return $resource('/api/notifications/:idNotifications', null, {
		'update': { method: 'PUT' }
	});
}]);


//
// Notificaciones
app.controller('NotificacionesController',
	['$scope', '$routeParams', '$location', '$timeout', 'Notificaciones',
		function ($scope, $routeParams, $location, $timeout, Notificaciones) {


			$scope.editing = [];
			$scope.notificacion = {};
			$scope.notificaciones = Notificaciones.query();

			$scope.types = [
				{ id: 0, value: "Mensaje" },
				{ id: 1, value: "Link" },
				{ id: 2, value: "Intra app" }]

			$scope.categories = [
				{ id: 0, value: "Informacion sobre el app", codigo: "/InfoApp" },
				{ id: 1, value: "Promociones", codigo: "/Promos" },
				{ id: 2, value: "Noticias", codigo: "/Noticias" }]

			$scope.inner_ids = [
				{ id: 0, value: "Inbox" },
				{ id: 1, value: "Centros de Atencion" },
				{ id: 2, value: "Perfil de Usuario" },
				{ id: 3, value: "Acerca de" }]


			//$scope.notificacion = Notificaciones.get({idNotificacion: $routeParams.id });

			console.log("$routeParams.id", $scope.notificaciones);
			$scope.success = {}

			$scope.save = function () {
				console.log("Save $scope.type", $scope.type);
				/*
				$scope.notificacion.type=JSON.parse($scope.type).id;
				$scope.notificacion.category=JSON.parse($scope.category).codigo;
				$scope.notificacion.inner_id=$scope.inner_id.id;
				*/
				$scope.message_show = false;
				$scope.message_show_error = false;
				$scope.notificacion.type = JSON.parse($scope.type).id;
				$scope.notificacion.category = JSON.parse($scope.category).codigo;
				$scope.notificacion.category_id = JSON.parse($scope.category).id;
				$scope.notificacion.innerid = JSON.parse($scope.innerid).id;

				console.log("Save notif", $scope.notificacion);
				var n = new Notificaciones($scope.notificacion);
				n.$save(function (a, b) {
					console.log("a", a);
					if (a.error) {
						//alert(a.error);
						$scope.error = a;
						$scope.message_show_error = true;
						$timeout(function () {
							$scope.message_show_error = false;
						}, 5000);
						return;
					}
					$scope.error = {};
					$scope.notificaciones.push(a);
					$scope.notificacion = {}; // clear textbox
					$scope.message_show = true;
					$scope.success.message = "Se cargo una notificacion."
					$timeout(function () {
						$scope.message_show = false;
					}, 5000);



				});

			}
		}]);
