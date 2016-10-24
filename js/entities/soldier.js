(function(_super) {

	gm.Soldier = function(currentState, x, y, key, radius, speed, health, atk) {


	    _super.call(this, currentState.game, x, y, key, health, new Phaser.Point(-15, -15), .5);

	    this.selected = false;
	    this.goal = null;
	    this.speed = speed;
	    this.atk = atk;

	    this.game = currentState.game;
	    this.game.physics.p2.enable(this, false);

	    this.body.setCircle(radius);
	    this.body.fixedRotation = true;

	    this.animations.add('idle_right', [0], 2, true);
	    this.animations.add('idle_left', [2], 2, true);
	    this.animations.add('walk_right', [0, 1], 3, true);
	    this.animations.add('walk_left', [2, 3], 3, true);

	    this.onDeath.add(function() {
	    	this.game.addGold(this.atk);
	    }, this);

	    this.healthBar.alpha = 0;


	};

	gm.Soldier.prototype = _.extend(Object.create(_super.prototype), {

		clearGoal: function() {
			this.goal = null;
			this.body.setZeroVelocity();
		},

		update: function() {

			_super.prototype.update.call(this);

			if(Math.abs(this.body.velocity.x) + Math.abs(this.body.velocity.y) < 5)
				this.animations.play('idle_' + (this.body.velocity.x > 5 ? 'right' : 'left'))
			else
				this.animations.play('walk_' + (this.body.velocity.x > 5 ? 'right' : 'left'))

			if(this.goal != null) {
				var angle = Phaser.Math.radToDeg(Phaser.Math.angleBetweenPoints(this, this.goal));

				//console.log("a:", angle)
				this.body.velocity.x = Math.cos(Phaser.Math.degToRad(angle)) * this.speed;
				this.body.velocity.y = Math.sin(Phaser.Math.degToRad(angle)) * this.speed;

				if(Phaser.Math.distance(this.goal.x, this.goal.y, this.body.x, this.body.y) < 10) {
					this.clearGoal();
				}

				this.animations.play()
			}



			/*if(this.selected) {
				this.alpha = 1;
				//this.healthBar.alpha = 1;
				//this.blendMode = PIXI.blendModes.OVERLAY;
			} else {
				this.alpha = .8;
				
				//this.blendMode = PIXI.blendModes.NORMAL;
			}*/
		}

	});

	gm.Soldier.spawnKind = function(currentState, kind, x, y) {
		var soldier;
		switch(kind) {
			case 0: 
				soldier = new gm.Monster0(currentState, x, y);
				break;
			case 1: 
				soldier = new gm.Monster1(currentState, x, y);
				break;
			case 2: 
				soldier = new gm.Monster2(currentState, x, y);
				break;
			default:
				soldier = new gm.Player(currentState, x, y)
		}
		return soldier;
	}


})(gm.Harmable);