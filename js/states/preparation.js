(function(_super) {
	
	gm.Preparation = function() {
		_super.call(this);

		this.secondsLeft = 0;
	};

	gm.Preparation.prototype = _.extend(Object.create(_super.prototype), {

		init: function(data) {
			this.game = data.game;
			this.secondsLeft = data.secondsLeft;
			this.nbSoldiers = [1, 0, 0];
			this.game.save();
		},

		create: function() {

			this.background = this.game.add.image(0, 0, 'prep');
			//this.player = new gm.Player(this, 100, 300);
			//this.game.add.existing(this.player);

			this.world.setBounds(0, 0, 900, 500);
			this.game.physics.p2.updateBoundsCollisionGroup();

			this.soldierCollisionGroup = this.game.physics.p2.createCollisionGroup();

			this.soldiers = this.add.group();

			this.timer = this.game.time.create();
        	this.timerEvent = this.timer.add(Phaser.Timer.SECOND * this.secondsLeft, this.endTimer, this);

        	this.prepareText = this.game.add.text(10, 10, 'Prepare for wave ' + this.game.wave, { fill: '#ffffff', font: 'MedievalSharp', fontSize: 20 });
			this.goldText = this.game.add.text(700, 10, '', { fill: 'gold', font: 'MedievalSharp', fontSize: 20, fontWeight:"bold"  });
			this.timeText = this.game.add.text(10, 40, 'Time left :', { fill: '#ffffff', font: 'MedievalSharp', fontSize: 30 });
			this.instuctionsText = this.game.add.text(10, 180, '', { fill: 'white', font: 'MedievalSharp', fontSize: 20 });
			this.titleText = this.game.add.text(430, 200, '       The\n- spawning  -\n      room', { fill: 'transparent',  stroke: "white", strokeThickness: 1, font: 'MedievalSharp', fontSize: 25, fontWeight:"bold"  });
			this.initSpawners();
			this.timer.start();


			/*var cheat = this.game.add.text(800, 400, 'SKIP', { fill: '#ffffff' });
			cheat.inputEnabled = true;
			cheat.events.onInputDown.add(function() {
				this.endTimer();
			}, this);*/

			if(this.game.wave == 1) {
				this.instuctionsText.fontSize = 25;
				this.instuctionsText.setText('Click on the spawner! -> \n Click-click-click!');
			}
			if(this.game.wave == 2)
				this.instuctionsText.setText('Well done !\nNow we need a bigger army.\n\n(keep clickin\')');
			if(this.game.wave == 3)
				this.instuctionsText.setText('Autospawners are for the lazy!\nDo not unlock them.\n\n       and click, too.');
			if(this.game.wave == 4)
				this.instuctionsText.setText('The autospawners can be \nunlocked and upgraded.');
			if(this.game.wave == 5)
				this.instuctionsText.setText('There are 3 kinds of\nmonsters that you can spawn.');
			if(this.game.wave == 6)
				this.instuctionsText.setText('You need more gold!');
			if(this.game.wave == 8)
				this.instuctionsText.setText('So many spawners to unlock!\n...what do they do?');
		},

		initSpawners: function() {
			this.clickerMonster0 = new gm.ClickerButton(this, 290, 170, 0, 6, 100, 'monster0');
			this.clickerMonster1 = new gm.ClickerButton(this, 440, 70, 1, 9, 1000, 'monster1');
			this.clickerMonster2 = new gm.ClickerButton(this, 620, 170, 2, 10, 10000, 'monster2');
			this.clickerMonsterWell0 = new gm.Well(this, 300, 170 + 120, 3, 150, 'well0', 'well0');
			this.clickerMonsterWell1 = new gm.Well(this, 440, 70 + 300, 4, 5000, 'well1', 'well1');
			this.clickerMonsterWell2 = new gm.Well(this, 600, 170 + 120, 5, 50000, 'well2', 'well2');

			this.clickerMonster0.onComplete.add(function(x, y) {
				this.spawnSoldier(x, y, 0)
			}, this);
			this.clickerMonster1.onComplete.add(function(x, y) {
				this.spawnSoldier(x, y, 1)
			}, this);
			this.clickerMonster2.onComplete.add(function(x, y) {
				this.spawnSoldier(x, y, 2)
			}, this);
			this.clickerMonsterWell0.onSpawn.add(function(x, y) {
				this.spawnSoldier(x, y, 0)
			}, this);
			this.clickerMonsterWell1.onSpawn.add(function(x, y) {
				this.spawnSoldier(x, y, 1)
			}, this);
			this.clickerMonsterWell2.onSpawn.add(function(x, y) {
				this.spawnSoldier(x, y, 2)
			}, this);
		},

		spawnSoldier: function(x, y, kind) {
			x += (Math.random() * 10 - 5);
			y += (Math.random() * 10 - 5);
			var soldier = gm.Soldier.spawnKind(this, kind, x, y);
			soldier.body.damping = .9;
		    soldier.body.setCollisionGroup(this.soldierCollisionGroup);
		    soldier.body.collides(this.soldierCollisionGroup);
		    this.world.bringToTop(this.soldiers);
		    this.world.bringToTop(soldier);
			this.soldiers.add(soldier);
			this.nbSoldiers[kind]++;
		},

		endTimer: function() {
			console.log('over')
			this.game.state.start('fight', true, false, { game: this.game, nbSoldiers: this.nbSoldiers })
		},

		update: function() {

			if(this.timerEvent.delay - this.timer.ms < 5000)
				this.timeText.fill = 'red';

			this.timeText.setText(Util.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)));
			this.goldText.setText("Gold : " + this.game.gold);

		}

	});

})(Phaser.State);

