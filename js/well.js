(function(_super) {
	
	gm.Well = function(currentState, x, y, frame, price, saveLockKey, saveUpgradeKey) {
		_super.call(this, currentState, x, y, frame, -1, price, saveLockKey);
		
		this.autogenLevel = 1;
		this.saveUpgradeKey = saveUpgradeKey;
		this.spawnDelay = 5;
		this.onSpawn = new Phaser.Signal();

		this.timer = null;

		this.setAutogenLevel(this.game.upgrades[this.saveUpgradeKey]);
		this.startTimer();

		if(this.game.unlocked[this.saveLockKey]) {
			

			if(this.autogenLevel < 5)
				this.unlockLabel.setText("Upgrade " + (this.autogenLevel + 1) + " for " + this.getUpgradePrice());
			
		}
	};

	gm.Well.prototype = _.extend(Object.create(_super.prototype), {

		getUpgradePrice: function() {

			var p = (this.price * (this.autogenLevel + 1)) / 2;
			/*if(p > 1000000)
				p = Math.ceil(p/1000000) + 'M';
			else if(p > 1000)
				p = Math.ceil(p/1000) + 'K';*/
			return p;

		},

		startTimer: function() {
			this.timer = this.game.time.events.add(this.spawnDelay, this.spawn, this).autoRemove = true;
		},

		setAutogenLevel: function(level) {

			console.log('set to ' + level + 'by ' + this.saveUpgradeKey)
			this.autogenLevel = level;
			this.game.upgrades[this.saveUpgradeKey] = level;
			this.spawnDelay = 10000 / Math.pow(2, level - 1) - 50;
		},

		upgrade: function() {

			if(this.game.gold >= this.getUpgradePrice()) {
				this.game.gold -= this.getUpgradePrice();
				this.setAutogenLevel(this.autogenLevel + 1);
				console.log('new level' + this.autogenLevel)
			}
			
			
			
			
		},

		update: function() {

		},

		spawn: function() {
			if(!this.unlocked)
				return;
			this.onSpawn.dispatch(this.x + this.width / 2, this.y + this.height / 2);

			this.game.time.events.remove(this.timer);
			this.timer = this.game.time.events.add(this.spawnDelay, this.spawn, this).autoRemove = true;
		},


		clickHandler: function() {
			
			if(!this.unlocked) {

				if(this.game.gold >= this.price) {
					this.game.gold -= this.price;
					this.unlock();
					this.unlockLabel.setText("Upgrade " + (this.autogenLevel + 1) + " for " + this.getUpgradePrice());
				}
			} else if (this.autogenLevel < 5) {
				this.upgrade();
				this.game.time.events.remove(this.timer);
				if (this.autogenLevel < 5)
					this.unlockLabel.setText("Upgrade " + (this.autogenLevel + 1) + " for " + this.getUpgradePrice());
				else this.unlockLabel.setText("");
			}
		}
	});

})(gm.ClickerButton);

