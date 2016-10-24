(function(_super) {

	gm.Player = function(currentState, x, y) {

	    _super.call(this, currentState, x, y, 'player', 20, 500, 10, 0);
	    this.healthBar.alpha = 0;

	};

	gm.Player.prototype = _.extend(Object.create(_super.prototype), {

		update: function() {
			_super.prototype.update.call(this);
		}

	});


})(gm.Soldier);