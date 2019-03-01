var app = angular.module('app',['ngRoute','ngResource']);
 app.factory('Version', ['$resource', function($resource){
          return $resource('/api/appversion/:idNotificacion', null, {
            'update': { method:'PUT' }
          });
}]);

// VersionController
 app.controller('VersionController', 
 	['$scope', '$routeParams','$location', 'Version',
 		function ($scope,$routeParams, $location,Version) {

	$scope.version={};
	$scope.version = Version.query({app:"EPOC"});
	$scope.success={}

	$scope.update = function(){
		console.log("Save $scope.type",$scope.version);
		Version.update({id: $scope.version._id}, $scope.version, function(){
     	if(a.error){
						$scope.error=a;
						return;
				}
				$scope.error={};
				$scope.success.message="Se cargo una notificacion."
	        });	
   }
 

 
    }]);



