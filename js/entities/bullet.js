(function(_super) {

	gm.Bullet = function(currentState, x, y, angle, radius, power, damage) {

	    _super.call(this, currentState.game, x, y, 'health');

	    this.angle = angle;
	    this.power = power;
	    this.damage = damage;
	    this.game = currentState.game;
	    this.game.physics.p2.enable(this);
	    this.width = radius;
	    this.height = radius;
	    this.body.setCircle(radius);

	    this.body.collideWorldBounds = false;
		this.body.velocity.x = Math.cos(angle) * power;
		this.body.velocity.y = Math.sin(angle) * power;


		this.body.setCollisionGroup(currentState.bulletCollisionGroup);
		this.body.collides(currentState.soldierCollisionGroup, function(turretBody, soldierBody) {
			soldierBody.sprite.harm(this.damage)
			this.destroy();
		}, this);

		this.game.add.existing(this);

		//this.body.data.shapes[0].sensor = true;


	};

	gm.Bullet.prototype = _.extend(Object.create(_super.prototype), {

		update: function() {
			if(!this.inCamera) {
				this.destroy();
			}
		}

	});


})(Phaser.Sprite);

