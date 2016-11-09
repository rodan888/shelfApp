(function(){
	angular.module('fabricApp')
		.controller('homeCtrl', ['$scope', '$window', '$interval', 'createShelf', function($scope, $window, $interval, createShelf){
			// Constant-----------------
			var editShelf = '',
					selectedShelf = 0;

			$scope.shelf = {};
			$scope.chelfCount = 0; //changed to http data shelf langth
			$scope.editShelf = false;
			$scope.position = 0;
			$scope.heightShelf = 0;

			$scope.editBlock = false;
			// Constant-----------------

			//New rack------------------
			var canvas = document.getElementById('canvas'),
					c = new fabric.Canvas(canvas,{selection: false}),
					dataRack = {
						"id": "_1a",
						"x": "30",
						"y": "50",
						"z": "80",
						"width": "800",
						"height": "350",
						"shelf": []
					},
					rack = new fabric.Rect({
						width: parseInt(dataRack.width),
						height: parseInt(dataRack.height),
						top: parseInt(dataRack.x),
						left: parseInt(dataRack.y),
						hasControls: false,
						lockMovementX: true,
						lockMovementY: true,
						selectable: false,
						fill: "#cccccc"
					});
			c.add(rack);
			//New rack----------------------------



			// New shelf--------------------------
			var Shelf = function(data){
				var top = rack.get('top'),
						left = rack.get('left'),
						width = rack.get('width');
				this.x = data.x + top || top;
				this.y = top;
				this.height = data.height || 30;
				this.width = width;
				this.fill = '#e6e6e6';				
			},
			drowShelf = function(shelf){
				var top = parseInt(shelf.x),
						left = parseInt(shelf.y),
					cshelf = new fabric.Rect({
						width: parseInt(shelf.width),
						height: parseInt(shelf.height),
						top: top,
						left: left,
						originX: 'left',
	  				originY: 'center',  
						lockMovementX: true, 	
						fill: shelf.fill
					}),
					circle = new fabric.Circle({
						top: top,
						left: left,
						radius: 15,
						originX: 'left',
	  				originY: 'center',
						fill: '#f00'
					}),
					text = new fabric.Text(($scope.chelfCount + 1).toString(), {					
						top: top + circle.get('radius'),
						left: left + circle.get('radius'),
						fontSize: 22,
						originX: 'center',
	  				originY: 'bottom',
						fill: "#fff"
					}),
					group = new fabric.Group([cshelf, circle, text], {
					  top: top,
					  left: left,
					  originX: 'left',
	  				originY: 'center',  				
					  hasControls: false
					});
				return group;
			};

			$scope.addShelf = function(shelf){
				// var newShelf = new Shelf(shelf),				
				// 		shelfGroup = drowShelf(newShelf);
				// dataRack.shelf.push(newShelf);

				// var jj = createShelf.getShelf(rack,shelf);
				$scope.chelfCount++;
				editShelf	= createShelf.getShelf(rack,shelf);
				c.add(createShelf.getShelf(rack,shelf));
			};
			// New shelf--------------------------


			//Remove shelf-------------------------
			$scope.removeShelf = function(){
				// $scope.chelfCount--;
				console.log(c._objects);
				// console.log(selectedShelf);

				// c._objects.splice(selectedShelf,1);
				// console.log(c._objects);
				// c.renderAll();
			};
			//Remove shelf-------------------------



			// Edit shelf--------------------------
			$scope.maxHeight = function(){
				var parentH = rack.get('height'),
						objL = c._objects.length || 0,
						allObjH = 0;


				for(var i = 1; i < objL; i++){
					var itemH = c._objects[i].height;
					allObjH+=itemH;
				};
				return parentH - allObjH;
			};
			// $scope.maxHeight = maxHeight();
			var	selectedObject = function(e){
					if(c.getActiveObject()){
			  		editShelf = c.getActiveObject();			  		
						$scope.$apply();				
			  	};
 					selectedShelf = c.getObjects().indexOf(e.target);
				  var	top = editShelf.get('top'),
				  		heightShelf = editShelf._objects[0].get('height'),
				  		maxY = rack.getHeight(),
				  		minY = rack.getTop();


				 // var h = editShelf.get('height'),
				 // 		 k = rack.get('top');
				 // 	c.forEachObject(function(obj) {
			  //     console.log(obj);
			  //   });

 					$scope.editBlock = true;
				 // console.log(h);
				 // console.log(k);

			  if(top > maxY){
			  	$scope.position = maxY;
				  $scope.heightShelf = heightShelf;
				  editShelf.set('top', maxY); 
			  }else if(top < minY){
				  editShelf.set('top', minY);  
				}else{
				  $scope.position = top;
				  $scope.heightShelf = heightShelf;			  	
			  }
			};

			c.on({
			    'object:selected': selectedObject
			});
			c.on({
			  'object:moving': selectedObject
			});
			c.on({
				"object:added": selectedObject
			})
			$scope.changePosition = function(custom){
				// $scope.position = (custom.position) ? custom.position :  $scope.position;
				// $scope.heightShelf = (custom.heightShelf) ? custom.heightShelf :  $scope.heightShelf;

				 editShelf.set('top', $scope.position);
				 editShelf.set('height', $scope.heightShelf);
				 editShelf._objects[0].set('height', $scope.heightShelf);
				 c.renderAll();
			};
			// Edit shelf--------------------------

			


		}]);
}());