angular.module('fabricApp', ['ngRoute'])
	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
			$routeProvider
			.when('/', {
				templateUrl: 'components/templates/home.html',
				controller: 'homeCtrl'				
			}).when('/new-area', {
				templateUrl: 'components/templates/new-area.html',
				controller: 'newareaCtrl'				
			})
			.otherwise({
				redirectTo: '/'
			})      
		}]);