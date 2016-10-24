(function(_super) {
	
	gm.Boot = function(game) {
		_super.call(this);
		this.game = game;
	};

	gm.Boot.prototype = _.extend(Object.create(_super.prototype), {

		preload: function() {
			this.game.load.image('loading', 'assets/loading.png');
		},

		create: function() {

			this.backgroud = this.game.add.image(0, 0, 'loading');

			this.text = this.game.add.text(430, 200, 'Loading', { fill: '#ffffff', fontWeight:'normal', font:'20px arial' });
			this.credit = this.game.add.text(20, 480, 'by Yann P (yann-p.fr) - Using the Phaser framework', { fill: '#ccc', fontWeight:'normal', font:'10px arial' });

		    this.game.load.onFileComplete.add(this.fileComplete, this);
		    this.game.load.onLoadComplete.add(this.loadComplete, this);

		    //this.game.time.advancedTiming = true;
		    this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);

		    this.game.physics.startSystem(Phaser.Physics.P2JS);
			this.game.physics.p2.setImpactEvents(true);
			
			WebFontConfig = {

			    google: {
			      families: ['MedievalSharp']
			    }

			};

			this.loadAssets();
		    
		},

		loadAssets: function() {

			this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
			this.game.load.spritesheet('clicker-button', 'assets/clicker-button.png', 193, 71);
			this.game.load.spritesheet('spawners', 'assets/spawners.png', 120, 60, 6);
			this.game.load.spritesheet('monster0', 'assets/monster0.png', 24, 15, 4);
			this.game.load.spritesheet('monster1', 'assets/monster1.png', 30, 30, 4);
			this.game.load.spritesheet('monster2', 'assets/monster2.png', 39, 28, 4);
			this.game.load.image('world', 'assets/world.png', 39, 28);
			this.game.load.image('pine', 'assets/pine.png', 78, 84);
			this.game.load.image('pine-red', 'assets/pine-red.png', 78, 84);
			for(var i = 0; i <= 5; i++)
				this.game.load.image('base-' + i, 'assets/base-' + i + '.png');
			for(var i = 0; i <= 8; i++)
				this.game.load.image('turret-' + i, 'assets/turret-' + i + '.png');
			this.game.load.image('selection', 'assets/selection.png');
			this.game.load.image('win', 'assets/win.png');
			this.game.load.image('mushroom', 'assets/mushroom.png');
			this.game.load.image('stump', 'assets/stump.png');
			this.game.load.image('fence-v', 'assets/fence-v.png');
			this.game.load.image('fence-h', 'assets/fence-h.png');
			this.game.load.image('fence-h-triple', 'assets/fence-h-triple.png');
			this.game.load.image('fence-v-triple', 'assets/fence-v-triple.png');
			this.game.load.image('flower', 'assets/flower.png');
			this.game.load.image('flower-red', 'assets/flower-red.png');
			this.game.load.spritesheet('player', 'assets/player.png', 51, 54, 4);
			this.game.load.spritesheet('target', 'assets/target.png', 360, 252, 2);
			this.game.load.image('prep', 'assets/prep.png');
			this.game.load.image('health', 'assets/health.png');
			//this.game.load.image('spark', 'assets/spark.png');
			//this.game.load.spritesheet('wagon', 'assets/slowwagon.php', 96, 46, 4);
			this.game.load.start();
		},

		fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
			this.text.setText(totalLoaded + " / " + totalFiles);
		},

		loadComplete: function() {
			this.game.state.start('menu', true, false, { game: this.game });
		}

	});

})(Phaser.State);

