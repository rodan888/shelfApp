angular.module('fabricApp')
	.directive('navigation', navigation);
		function navigation () {
			return {
				restrict: 'EA',
				templateUrl: 'components/directives/navigation.template.html'      
			};
		}