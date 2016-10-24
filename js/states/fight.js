(function(_super) {
	
	gm.Fight = function() {
		_super.call(this);

		this.nbSoldiers = 0;
		this.mouseActive = false;
		this.selectionRectangle = new Phaser.Rectangle(10, 20, 30, 40);
	};

	gm.Fight.prototype = _.extend(Object.create(_super.prototype), {

		init: function(data) {
			this.game = data.game;
			this.nbSoldiers = data.nbSoldiers;

		},

		create: function() {
			this.world.setBounds(0, 0, 2000, 1000);
			this.game.camera.bounds = new Phaser.Rectangle(0, 0, 2000, 1000)
			this.game.physics.p2.updateBoundsCollisionGroup();
			this.game.physics.p2.setImpactEvents(true);

			this.image = this.game.add.image(0, 0, 'world');

			this.baseCollisionGroup = this.game.physics.p2.createCollisionGroup();
			this.objectCollisionGroup = this.game.physics.p2.createCollisionGroup();
			this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
			this.turretCollisionGroup = this.game.physics.p2.createCollisionGroup();
			this.soldierCollisionGroup = this.game.physics.p2.createCollisionGroup();
			this.bulletCollisionGroup = this.game.physics.p2.createCollisionGroup();

			this.player = gm.Soldier.spawnKind(this, 'player', 1820, 260);
			this.player.body.setCollisionGroup(this.playerCollisionGroup);
			this.player.body.collideWorldBounds = true;
			this.player.body.collides([this.turretCollisionGroup, this.objectCollisionGroup, this.baseCollisionGroup]); // TODO UNCOMMENT
			this.player.body.fixedRotation = true;
			this.game.add.existing(this.player);

			this.selectionRender = this.game.add.sprite(0, 0, 'selection');
			this.selectionRender.alpha = 0;

			this.instuctionsText = this.game.add.text(0, 0, '', { fill: 'black', stroke: "white", strokeThickness: 2, font: 'MedievalSharp', fontSize: 18, fontWeight:"bold"  });
			this.troopsText = this.game.add.text(10, 10, '', { fill: '#ffffff', font: 'MedievalSharp', fontSize: 20, stroke: "white", strokeThickness: 1});
			this.troopsText.fixedToCamera = true;
			this.goldText = this.game.add.text(700, 10, '', { fill: 'gold', font: 'MedievalSharp',  stroke: "black", strokeThickness: 1, fontSize: 20, fontWeight:"bold"  });
			this.goldText.fixedToCamera = true;

			this.turrets = this.add.group();
			this.soldiers = this.add.group();

			var j = 0;


			for(var kind = 0; kind < 3; kind++) {
				for(var i = 0; i < this.nbSoldiers[kind]; i++) {
					var soldier = gm.Soldier.spawnKind(this, kind, 1820 + (j % 6) * 30, 150 + ~~(j / 6) * 30 + 30);
				    soldier.body.setCollisionGroup(this.soldierCollisionGroup);
				    soldier.body.collides(this.soldierCollisionGroup);
				    soldier.body.collides(this.bulletCollisionGroup);
				    soldier.body.collides(this.objectCollisionGroup);
				    soldier.body.collides(this.baseCollisionGroup);
				    //soldier.body.collides(this.player);
				    soldier.body.collides(this.turretCollisionGroup);
				    soldier.body.damping = .8;
					this.soldiers.add(soldier);
					j++;
				}
			}

			this.initInstructions();
			this.initMap();

		},

		initMap: function() {
			// OBJECTS
			var o, s;
			for(var i = 0; i < DATA.map.objects.length; i++) {
				o = DATA.map.objects[i];
				s = this.game.add.sprite(o[0], o[1], o[2]);

				if(this.game.checkpoint >= 3 && o[0] == 1780 && o[1] == 950)
					continue; // passage secret ;)
				
				this.game.physics.p2.enable(s, false);
				s.body.dynamic = false;
				s.body.setRectangleFromSprite();
				s.body.setCollisionGroup(this.objectCollisionGroup);
				s.body.collides([this.playerCollisionGroup, this.soldierCollisionGroup])
				//s.alpha = .5; // TODORMmmm
			}
			// TURRETS
			var o, t;
			for(var i = 0; i < DATA.map.turrets.length; i++) {
				
				o = DATA.map.turrets[i];
				/*if(this.game.checkpoint > o[2])
					continue;*/
				t = gm.Turret.spawnKind(this, o[0], o[1], o[2])
				
				this.game.add.existing(t);
			}
			// BASES
			var o, b;
			for(var i = 0; i < DATA.map.bases.length; i++) {
				if(this.game.checkpoint > i)
					continue;
				o = DATA.map.bases[i];
				b = new gm.Base(this, o[0], o[1], i, o[2])
				
				this.game.add.existing(t);
			}
		},

		initInstructions: function() {
			if(this.soldiers.countLiving() < 3) {
				this.playerSay("Do ou call this an ARMY?\nYou didn't click that spawner\nDid you?");
				this.game.wave--;
			}
			else if(this.game.wave == 1)
				this.playerSay("Follow me !\nTarget the towers");
			else if(this.game.wave == 2)
				this.playerSay(this.soldiers.countLiving() + ' this time !\nGood, but how can we\nget more?');
			else if(this.game.wave == 3)
				this.playerSay("Good job !\nNext time unlock the auto-spawner, if you can");
			else if(this.game.wave == 4)
				this.playerSay("Loot, spawn more monsters\n...");
			else if(this.game.wave == 5)
				this.playerSay("There is a nice city\n down there to destroy.\nWhere is my army?!");
		},

		selectSoldiers: function() {
			this.soldiers.forEachAlive(function(soldier) {

				if(soldier.overlap(this.selectionRender)) {
					soldier.selected = true;
				}

			}, this);
		},

		unselectSoldiers: function() {
			this.soldiers.forEachAlive(function(soldier) {
				soldier.selected = false;
			}, this);
		},

		countSelectedSoldiers: function() {
			var c = 0;
			this.soldiers.forEachAlive(function(soldier) {
				if(soldier.selected) c++;
			}, this);
			return c;
		},

		moveSelectedSoldiers: function(x, y) {
			this.soldiers.forEachAlive(function(soldier) {
				if(soldier.selected) {

					soldier.goal = new Phaser.Point(x, y);

					

					// var tween = this.game.add.tween(soldier.body).to({
					// 	x: x,
					// 	y: y
					// }, 1000, "Linear", true);
				}
			}, this);
		},

		mousePressed: function(x, y) {

			this.soldiers.forEachAlive(function(soldier) {
				soldier.selected = true;
			}, this);

			this.player.goal = new Phaser.Point(x, y);
			this.world.bringToTop(this.player);

			this.moveSelectedSoldiers(x, y);
			/*this.unselectSoldiers();
			
			this.mouseActive = true;
			this.selectionRectangle.x = x;
			this.selectionRectangle.y = y;*/

		},

		win: function() {
			this.game.state.start('win', true, false, { game: this.game });
		},

		mouseReleased: function(x, y) {
			// if(this.selectionRender.width + this.selectionRender.height < 10/* && this.countSelectedSoldiers() == 0*/){

			// 	this.player.goal = new Phaser.Point(x, y);
			// 	this.world.bringToTop(this.player);


			// } else {
			// 	this.unselectSoldiers();
			// 	this.selectSoldiers();
			// }


			// this.mouseActive = false;
			// this.selectionRender.alpha = 0;
			// this.selectionRender.width = 0;
			// this.selectionRender.height = 0;*/
			
		},

		mouseDragged: function(x, y) {
			// //this.unselectSoldiers();
			// //this.player.clearGoal();
			// this.world.bringToTop(this.selectionRender);
			// this.selectionRender.alpha = 1;
			// this.selectionRender.x = this.selectionRectangle.x;
			// this.selectionRender.y = this.selectionRectangle.y;
			// this.selectionRender.width =  x - this.selectionRectangle.x;
			// this.selectionRender.height =  y - this.selectionRectangle.y;

			// if(this.selectionRender.width < 0) {
			// 	this.selectionRender.width *= -1;
			// 	this.selectionRender.x -= this.selectionRender.width;
			// }
			// if(this.selectionRender.height < 0) {
			// 	this.selectionRender.height *= -1;
			// 	this.selectionRender.y -= this.selectionRender.height;
			// }
			
		},

		playerSay: function(t) {
			this.instuctionsText.setText(t);
			setTimeout(function(self) {
				self.instuctionsText.setText("");
			}, 10000, this);
		},

		update: function() {

			this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON);

			this.instuctionsText.x = this.player.x - 100;
			this.instuctionsText.y = this.player.y - 100;

			var mouse = this.game.input.activePointer;
			if(this.mouseActive && mouse.isDown) {  // dragging
				this.mouseDragged(mouse.worldX, mouse.worldY);
			} else if(mouse.isDown) {  // just pressed
				this.mousePressed(mouse.worldX, mouse.worldY);
			} else if(this.mouseActive) { // just released
				this.mouseReleased(mouse.worldX, mouse.worldY);
				
			}

			this.goldText.setText("Gold : " + this.game.gold);
			var count = this.soldiers.countLiving();
			this.troopsText.setText("Wave " + this.game.wave + ", allies left : " + count);
			this.world.bringToTop(this.goldText);
			this.world.bringToTop(this.troopsText);
			this.world.bringToTop(this.instuctionsText);

			if(count == 0) {
				this.game.wave++;
				this.game.state.start('preparation', true, false, { secondsLeft: this.game.getSecondsLeft() , game: this.game })
			}



		}/*,

		render: function() {
			this.game.debug.pointer(this.game.input.activePointer)
		}*/

	});

})(Phaser.State);

