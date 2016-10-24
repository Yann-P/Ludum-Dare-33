(function(_super) {

	gm.Monster1 = function(currentState, x, y) {

	    _super.call(this, currentState, x, y, 'monster1', 10, 75, 65, 30);

	};

	gm.Monster1.prototype = _.extend(Object.create(_super.prototype), {

		update: function() {
			_super.prototype.update.call(this);
		}

	});


})(gm.Soldier);