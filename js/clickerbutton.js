(function(_super) {
	
	gm.ClickerButton = function(currentState, x, y, frame, nbClicksNecessary, price, saveLockKey) {
		_super.call(this, currentState.game, x, y, 'spawners', this.clickHandler, this, frame, frame, frame, frame);
		this.game = currentState.game;
		this.currentState = currentState;
		this.price = price;
		this.frame = frame;
		this.saveLockKey = saveLockKey;
		this.unlocked = this.game.unlocked[saveLockKey];

		this.nbClicks = 0;
		this.nbClicksNecessary = nbClicksNecessary; // yeah whatever
		this.onComplete = new Phaser.Signal();

		this.unlockLabel = this.game.add.text(x, y + 60, '', { 
			font: 'MedievalSharp',
			fontSize: 17,
			fill: 'gold'
		});

		if(!this.unlocked) {
			this.unlockLabel.setText("Unlock for " + this.price);
		}

		this.game.add.existing(this);
	};

	gm.ClickerButton.prototype = _.extend(Object.create(_super.prototype), {


		update: function() {

		},

		unlock: function() {
			this.unlocked = true;
			this.game.unlocked[this.saveLockKey] = true;
		},

		clickHandler: function() {
			if(!this.unlocked) {
				if(this.game.gold >= this.price) {
					this.game.gold -= this.price;
					this.unlock();
					this.unlockLabel.setText('');
				}
			} else {
				this.blendMode = PIXI.blendModes.ADD;
				setTimeout(function(self) {
					self.blendMode = PIXI.blendModes.NORMAL;
				}, 50, this);

				this.nbClicks++;
				if(this.nbClicks >= this.nbClicksNecessary) {
					this.onComplete.dispatch(this.x + this.width / 2, this.y + this.height / 2);
					this.nbClicks = 0;
				}	
			}
		}
	});

})(Phaser.Button);

