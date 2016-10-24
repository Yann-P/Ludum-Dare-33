(function(_super) {
	
	gm.Win = function() {
		_super.call(this);
	};

	gm.Win.prototype = _.extend(Object.create(_super.prototype), {

		init: function(data) {
			this.game = data.game;
		},

		create: function() {

			this.backgroud = this.game.add.image(0, 0, 'win');

			this.cg = this.game.add.text(270, 120, 'Congratulations ! You won the game in ' + this.game.wave + ' waves.', { fill: 'white', font: 'MedievalSharp', fontSize: 17, fontWeight:"bold" });

			this.text = this.game.add.text(270, 450, 'Back', { fill: 'white', font: 'MedievalSharp', fontSize: 30, fontWeight:"bold" });

			this.text.inputEnabled = true;
			this.text.events.onInputDown.add(function() {
				this.game.restore();
				this.game.state.start('menu', true, false, { game: this.game })
			}, this);


		}

	});

})(Phaser.State);

