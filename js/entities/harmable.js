(function(_super) {

	gm.Harmable = function(game, x, y, key, health, barOffset, barScale) {


	    _super.call(this, game, x, y, key);
	    this.initialHealth = health;
	    this.health = health;
	    this.barOffset = barOffset;
	    this.game = game;
	    this.onDeath = new Phaser.Signal();

	    this.healthBar = this.game.add.sprite(this.x + barOffset.x, this.y + barOffset.y, 'health');
	    //this.healthBar.scale.setTo(barScale || 1);
	    this.game.world.bringToTop(this.healthBar);

	};

	gm.Harmable.prototype = _.extend(Object.create(_super.prototype), {

		
		harm: function(pv) {
			this.blink();
			this.health -= pv;
			if(this.health <= 0) {
				this.die();
			}

			this.healthBar.width = 42 * (this.health / this.initialHealth);
		},

		update: function() {
			this.healthBar.x = this.x + this.barOffset.x;
			this.healthBar.y = this.y + this.barOffset.y;
			this.game.world.bringToTop(this.healthBar);
		},

		die: function() {
			this.onDeath.dispatch();
			var t = this.game.add.tween(this).to({angle: 90, alpha: 0}, 300, "Linear", true);
			this.healthBar.destroy();
			t.onComplete.add(function() {
				
				this.destroy();
			}, this);
			
			
		},

		blink: function() {
			this.blendMode = PIXI.blendModes.ADD;
			setTimeout(function(self) {
				self.blendMode = PIXI.blendModes.NORMAL;
			}, 50, this);
		}

	});


})(Phaser.Sprite);