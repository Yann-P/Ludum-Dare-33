(function(_super) {

	gm.Game = function(width, height) {
	    _super.call(this, width, height, Phaser.AUTO, 'game');

	    this.wave = 1;
	    this.gold 		= 0;
	    this.unlocked   = {
	    	monster0: true,
	    	monster1: false,
	    	monster2: false,
	    	well0: false,
	    	well1: false,
	    	well2: false
	    };
	    this.upgrades = {
	    	well0: 1,
	    	well1: 1,
	    	well2: 1
	    };
	    this.checkpoint = 0;

	    this.state.add('boot', new gm.Boot(this), true);
	    this.state.add('menu', gm.Menu, false);
	    this.state.add('preparation', gm.Preparation, false);
	    this.state.add('fight', gm.Fight, false);
	    this.state.add('win', gm.Win, false);

	    
	};

	gm.Game.prototype = _.extend(Object.create(_super.prototype), {

		save: function() {
			localStorage.setItem('save', JSON.stringify({
				wave:this.wave,
				gold:this.gold,
				unlocked:this.unlocked,
				upgrades:this.upgrades,
				checkpoint:this.checkpoint
			}));
		},

		restore: function() {
			var data = JSON.parse(localStorage.getItem('save'));
			if(data != null && 'wave' in data && 'gold' in data && 'unlocked' in data && 'upgrades' in data && 'checkpoint' in data) {
				this.wave = data.wave;
				this.gold = data.gold;
				this.unlocked = data.unlocked;
				this.upgrades = data.upgrades;
				this.checkpoint = data.checkpoint;
			}
			
		},

	

		addGold: function(a) {
			this.gold += a;
		},

		getSecondsLeft: function() {
			return 10;
		}

	});

	gm.Game.eraseSave = function() {
		localStorage.setItem('save', '{}');
	};


})(Phaser.Game);