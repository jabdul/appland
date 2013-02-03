(function() {
	module( "maxmin" );
	
	test("testMaxMin - Empty constructor parameter", function() {
		expect(1);
		throws(
				function() {
					new App.Model.MaxMin();
				},
				'An empty constructor argument is invalid'
		);
	});
	
	test("testMaxMin - Constructor argument types", function() {
		expect(1);	
		ok( new App.Model.MaxMin([2,7,4,34]), 'Array list is valid.' );
	});
	
	test("testIsValidEntry - Validate input", function() {
		expect(3);
		var maxMin = new App.Model.MaxMin([2,7,90,34]);
		ok( ! maxMin.isValidEntry(-1), 'Numerical input values are not allowed' );
		ok( ! maxMin.isValidEntry('hello'), 'String input values are not allowed' );
		ok( maxMin.isValidEntry([278,7235,43,34], 'Array list is valid.') );
	});
})();
