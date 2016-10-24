(function(_super) {

	gm.Base = function(currentState, x, y, id, health) {
		this.finalBoss=false;


	    _super.call(this, currentState.game, x, y, 'base-' + id, health, new Phaser.Point(-15, 0), 2);

	   	
	    this.id = id;
	    this.currentState = currentState;
	    this.game = currentState.game;
	    this.game.physics.p2.enable(this, false);

	    this.body.setRectangleFromSprite();
	    this.body.dynamic = false;


		this.body.setCollisionGroup(currentState.baseCollisionGroup);
		this.body.collides(currentState.playerCollisionGroup);
		this.body.collides(currentState.soldierCollisionGroup, function(baseBody, soldierBody) {
			baseBody.sprite.harm(soldierBody.sprite.atk);
		}, this);

		if(id == 5) {
			this.finalBoss = true;
			this.scale.setTo(.9, .9);
		}

		this.barOffset = new Phaser.Point(-this.width/2 + 42/2, -this.height/2 - 10)

		this.game.add.existing(this);

		this.onDeath.add(function() {
			if(this.finalBoss)
				this.currentState.win();
			this.game.checkpoint = this.id + 1;
			this.game.addGold(this.initialHealth * 10);
		}, this);


	};

	gm.Base.prototype = _.extend(Object.create(_super.prototype), {

		update: function() {
			_super.prototype.update.call(this)

		}

	});


})(gm.Harmable);

