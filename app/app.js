angular.module('fabricApp', ['ngRoute'])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
			$routeProvider
			.when('/', {
				templateUrl: 'components/templates/home.html',
				controller: 'homeCtrl'				
			}).when('/page-two', {
				templateUrl: 'components/templates/page2.html',
				controller: 'homeCtrl'				
			})
			.otherwise({
				redirectTo: '/'
			});
		}]);