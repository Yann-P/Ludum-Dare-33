(function(_super) {

	gm.Monster0 = function(currentState, x, y) {

	    _super.call(this, currentState, x, y, 'monster0', 8, 100, 30, 2);

	};

	gm.Monster0.prototype = _.extend(Object.create(_super.prototype), {

		update: function() {
			_super.prototype.update.call(this);
		}

	});


})(gm.Soldier);