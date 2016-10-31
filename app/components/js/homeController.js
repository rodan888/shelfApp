(function(){
	angular.module('fabricApp')
		.controller('homeCtrl', ['$scope', '$window', '$interval', function($scope, $window, $interval){

			var canvas = document.getElementById('canvas');

			var c = new fabric.Canvas(canvas),
				rect = new fabric.Rect({
					width: 200,
					height: 200,
					left: 50,
					top: 50,
					fill: '#f00'
				});

			c.add(rect);

			rect.on('selected', function(){
				$window.location.href = "#/page-two";
			});

			$scope.left = rect.get('left');
			$scope.top = rect.get('top');
			$scope.width = rect.get('width');
			$scope.height = rect.get('height');

			$scope.maxTop = c.height - rect.get('height');
			$scope.maxLeft = c.width;	

			$scope.moveRect = function(){
				rect.set('left', $scope.left);
				rect.set('top', $scope.top);
				rect.set('width', $scope.width);
				rect.set('height', $scope.height);
				
				c.add(rect);
			};

			$scope.newElement = function(){				
				fabric.loadSVGFromURL('http://fabricjs.com/assets/1.svg', function(objects) { 
					var path = new fabric.PathGroup(objects, { 
						left: 165,
						top: 100, 
						width: 295, 
						height: 211 
					}); 
					c.add(path);
					c.renderAll();
				});				
			};

			$scope.newImage = function(){
				fabric.Image.fromURL('../../assets/img/fabric.png', function(img){					
					c.add(img)
				});
			};

			$scope.animRect = function(){				
				var pushRect = function(){
					if($scope.maxLeft < $scope.left){
						$scope.left -= 3;
					}else{
						$scope.left += 3;						
					}
					console.log($scope.maxLeft);
					console.log($scope.left);
					$scope.moveRect();					
				};

				$interval(pushRect, 100);
			};


		}]);
}());