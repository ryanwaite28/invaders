// New Script //

var engine = (function(global){

	var doc = global.document;
	var win = global.window;
	var canvas = doc.getElementById('game-board');
	var ctx = canvas.getContext('2d');
	var lastTime;
	global.ctx = ctx;

	function main() {

		//console.log('Main Called');

		var now = Date.now();
		// Delta Ticks
		var dt = (now - lastTime) / 1000.0;

		render(dt);

		win.requestAnimationFrame(main);

	}

	function render(dt) {

		ctx.drawImage(gameBoard, 0, 0);

		Player.render();
		Enemy.render();
		Enemy.update(dt);
		Jewel.render();
		Jewel.collected();

	}

	function init() {
		console.log('Init Called');
		lastTime = Date.now();
		main();
	}

	setTimeout(function(){
		init();
		$('#msg').text('');
	},3000);

})(this);
