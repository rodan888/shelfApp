(function(){
	angular
		.module('fabricApp')
		.service('createShelf', ['$http', function ($http) {
			this.Shelf = function(rect,shelf){
				var top = rect.get('top'),
						left = rect.get('left'),
						width = rect.get('width');
				this.x = shelf.x + left || left;
				this.y = top;
				this.height = shelf.height || 30;
				this.width = width;
				this.fill = '#e6e6e6';
			},			
			this.shelfGroup = function(shelf){
				var top = parseInt(shelf.y),
						left = parseInt(shelf.x),
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
					text = new fabric.Text((1).toString(), {					
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
			},
			this.getShelf = function(rect,shelf){		
				var newShelf = new this.Shelf(rect,shelf);				
				return this.shelfGroup(newShelf);
			},
			this.test = function(){
				console.log('jkjk');
			}
		}])
}());