(function(_super) {

	gm.Turret = function(currentState, x, y, key, radius, range, frequency, damage, health, reward) {

	    _super.call(this, currentState.game, x, y, key, health, new Phaser.Point(-20, -55), 1.1);

	    this.range = range + radius;
	    this.frequency = frequency;
	    this.damage = damage;
	    this.reward = reward;

	    this.timer = null;
	    
	    this.game = currentState.game;
	    this.currentState = currentState;
	    this.game.physics.p2.enable(this, false);
	    this.scale.setTo(.8, .8)

	    this.body.setCircle(radius);
	    this.body.dynamic = false;
	    this.body.collideWorldBounds = true;
	    this.body.setCollisionGroup(currentState.turretCollisionGroup);
	    this.body.collides(currentState.soldierCollisionGroup, function(turretBody, soldierBody) {
	    	turretBody.sprite.harm(soldierBody.sprite.atk);
	    }, this);
	    this.body.collides(currentState.playerCollisionGroup);

	    this.onDeath.add(function() {
	    	this.game.time.events.remove(this.timer);
	    	this.game.addGold(this.reward);
	    }, this);

	    this.healthBar.alpha = .7;

	    this.shoot();
	    
	    

	};

	gm.Turret.prototype = _.extend(Object.create(_super.prototype), {

		update: function() {
			_super.prototype.update.call(this);

		},


		determineTarget: function() {
			var nearestTarget = null;
			var smallestDistance = Infinity;
			var enemies = this.currentState.soldiers;
			enemies.forEachAlive(function(enemy) {
				var dist = Phaser.Math.distance(enemy.x, enemy.y, this.x, this.y);
				if(dist <= this.range && dist < smallestDistance) {
					smallestDistance = dist;
					nearestTarget = enemy;				
				}
			}, this);
			return nearestTarget;
		},

		shoot: function() {

			var target = this.determineTarget();

			if(target != null) {
				var angle = Phaser.Math.angleBetweenPoints(this, target);
				var bullet = new gm.Bullet(this.currentState, this.x, this.y, angle, 3, 500, 10);
			}

			this.timer = this.game.time.events.add(this.frequency, this.shoot, this);

			/*setTimeout(function(self) {
				self.shoot();
			}, this.frequency, this)
*/
		},

		

	});

	gm.Turret.spawnKind = function(currentState, x, y, kind) {
		var data = DATA.turrets[kind];
		var turret = new gm.Turret(currentState, x, y, 'turret-' + kind, data.radius, data.range, data.frequency, data.damage, data.health, data.reward);
		return turret;
	}


})(gm.Harmable);