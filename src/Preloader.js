Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 640;
	Candy.GAME_HEIGHT = 960;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2, (Candy.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img_mars/mars background.png');
		this.load.image('floor', 'img_mars/mars stage.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img_mars/mars title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img_mars/mars coins.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// load spritesheets
		this.load.spritesheet('candy', 'img_mars/mars.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};