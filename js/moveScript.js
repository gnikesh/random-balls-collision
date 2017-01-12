(function() {
	
	function getRandom(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
	}

	function Box() {
		this.x = 0;
		this.y = 0;
		this.xFlag = 1;
		this.yFlag = 1;
		this.element;
		
		this.init = function() {
			this.element = document.createElement('div');
			this.element.setAttribute('class', 'box');
			var color = '#' + getRandom(800, 900) + getRandom(100, 900);
			this.element.style.background=color;
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
			document.getElementById('container').appendChild(this.element);

		}

		this.redraw = function() {
			this.element.style.top = this.y + 'px';
			this.element.style.left = this.x + 'px';
			}

		this.move =function(){

			
			if (this.xFlag == 1){
				this.x++;
			}
			if (this.xFlag == -1){
				this.x--;
			}
			if (this.yFlag == 1){
				this.y++;
			}
			if (this.yFlag == -1){
				this.y--;
			}

			if (this.x < 0){
				this.xFlag = 1;
			}

			if (this.x > 780){
				this.xFlag = -1;
			}

			if (this.y > 480){
				this.yFlag = -1;
			}

			if (this.y < 0){
				this.yFlag = 1;
			}

			
			

			
			// if (this.xFlag == 1 && this.x < 780){
			// 		this.x++;
			// } else if (this.xFlag == 1 && this.x > 780){
			// 	this.xFlag = 0;
			// }

			// if (this.xFlag == 0 && this.x > 0){
			// 	this.x--;
			// } else if (this.xFlag == 0 && this.x < 0){
			// 	this.xFlag = 1;
			// }

			// if (this.yFlag == 1 && this.y < 480){
			// 	this.y++;
			// } else if (this.yFlag == 1 && this.y > 480){
			// 	yFlag = 0;
			// }
			// if (this.yFlag == 0 && this.y > 0){
			// 	this.y--;
			// } else if (this.yFlag == 0 && this.y < 0){
			// 	this.yFlag = 1;
			// }
				
			this.redraw();
			}

		}
		

	function BoxAnimation() {
		var that = this;

		this.boxes = [];

		this.init = function() {
			for (var i=0; i<15; i++) {
				var box = new Box();
				box.x = getRandom(0, 750);
				box.y = getRandom(0, 450);
				box.xFlag = Math.pow(-1, getRandom(1, 3));
				box.yFlag = Math.pow(-1, getRandom(1, 3));
				box.init();

				this.boxes.push(box);
			}
			setInterval(this.moveBoxes, 10);
		}

		this.checkCollison = function(box, i) {
			var moveOrNot = 1;
			for (var j=i + 1; j<15; j++){
				var cb = that.boxes[j];				
				if (box.x < cb.x + 20 && box.x + 20 > cb.x && box.y < cb.y + 20 && 20 + box.y > cb.y){
					moveOrNot = 0;
					console.log("Collision Detected");
					cb.xFlag *= -1;
					cb.yFlag *= -1;
					break;
				}
			}
				
			return moveOrNot;
		}	

		this.moveBoxes = function() {
			var moveOrNot = 1;
			var exitLoop = 0;
			var isCollison = 1;


			for (var i=0; i<15; i++) {
				var box = that.boxes[i];

				isCollison = that.checkCollison(box, i);
				if (isCollison == 0){
					box.xFlag *= -1;
					box.yFlag *= -1;
				} 
				// if (box.x > 780){
				// 	box.xFlag = -1;
				// }

				// if (box.x < 0){
				// 	box.xFlag = 1;
				// }

				// if (box.y > 480){
				// 	box.yFlag = -1;
				// }

				// if (box.y < 0){
				// 	box.yFlag = 1;
				// }
				box.move();
			}
			
			

		}		
	}

	new BoxAnimation().init();
})();
