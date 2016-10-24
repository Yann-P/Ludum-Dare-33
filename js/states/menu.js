(function(_super) {
	
	gm.Menu = function() {
		_super.call(this);
	};

	gm.Menu.prototype = _.extend(Object.create(_super.prototype), {

		init: function(data) {
			this.game = data.game;
		},

		create: function() {

			this.backgroud = this.game.add.image(0, 0, 'loading');

			this.text = this.game.add.text(326, 350, 'Play or Resume', { fill: 'white', font: 'MedievalSharp', fontSize: 30, fontWeight:"bold" });
			this.text2 = this.game.add.text(326, 400, 'Erase save', { fill: 'white', font: 'MedievalSharp', fontSize: 30 });

			this.text.inputEnabled = true;
			this.text.events.onInputDown.add(function() {
				this.game.restore();
				this.game.state.start('preparation', true, false, { secondsLeft: this.game.getSecondsLeft(), game: this.game })
			}, this);

			this.text2.inputEnabled = true;
			this.text2.events.onInputDown.add(function() {
				gm.Game.eraseSave();
				alert("Reset !");
			}, this);

		}

	});

})(Phaser.State);

