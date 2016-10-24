(function(_super) {

	gm.Monster2 = function(currentState, x, y) {

	    _super.call(this, currentState, x, y, 'monster2', 12, 100, 250, 50);

	};

	gm.Monster2.prototype = _.extend(Object.create(_super.prototype), {

		update: function() {
			_super.prototype.update.call(this);
		}

	});


})(gm.Soldier);