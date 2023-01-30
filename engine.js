// New Script //

var engine = (function(global){

	var doc = global.document;
	var win = global.window;
	var canvas = doc.getElementById('game-board');
	var ctx = canvas.getContext('2d');
	var lastTime;
	global.ctx = ctx;

  let paused = false;

  $('#play-pause-btn').click((e) => {
    paused = !paused;
    $('#play-pause-btn').text(paused ? 'Play' : 'Pause');
  });

	function main() {

		// console.log('Main Called');

		var now = Date.now();
		// Delta Ticks
		var dt = (now - lastTime) / 1000.0;

		render(dt);

		win.requestAnimationFrame(main);

	}

	function render(dt) {

    if (paused) {
      return;
    }

		ctx.drawImage(gameBoard, 0, 0);

		player.render();
		player.update();

		enemy.render();
		enemy.update(dt);

		jewel.render();
		jewel.collected();
    
    updateCollectedJewels();
	}

	function init() {
		console.log('Init Called');
		lastTime = Date.now();
		main();
	}

  let seconds_left = 3;
  $('#seconds-left').text(seconds_left);
  
	let interval = setInterval(function() {
    seconds_left = seconds_left - 1;
    $('#seconds-left').text(seconds_left);
    if (seconds_left === 0) {
      $('#msg').text('');
      clearInterval(interval);
      init();
    }
	}, 1000);

})(this);
