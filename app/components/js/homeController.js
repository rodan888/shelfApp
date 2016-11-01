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

			// rect.on('selected', function(){
			// 	$window.location.href = "#/page-two";
			// });

			var data = [{
				"id":"_1",
				"x": "100",
				"y": "100",
				"width": "100",
				"height": "100"
			},{
				"id":"_2",
				"x": "200",
				"y": "100",
				"width": "100",
				"height": "100"
			},{
				"id":"_3",
				"x": "300",
				"y": "100",
				"width": "100",
				"height": "100"
			},{
				"id":"_4",
				"x": "400",
				"y": "100",
				"width": "100",
				"height": "100"
			}];

			$scope.drawCanvas = function(){				
				var area;
				for(var i = 0; i < data.length; i++){
					area = new fabric.Rect({
						width: parseInt(data[i].width),
						height: parseInt(data[i].height),
						top: parseInt(data[i].y),
						left: parseInt(data[i].x),
						fill: '#999'
					});					
					c.add(area);
				};
				console.log(c);
			};

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
					$scope.moveRect();					
				};

				$interval(pushRect, 100);
			};


		}]);
}());