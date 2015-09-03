/**
* formatter Module
*
* Description
*/
angular.module('formatter', []).directive('formatter', ['$timeout', function($timeout){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, elm, attrs, ngModel) {
			// var formatted;
			window.formatted;
			var _pattern    = elm.attr('formatter-pattern') || '';
			var _persistent = attrs.formatterPersistent ? true : false;
			
			$timeout(function() {
				formatted = new Formatter(elm[0], {
					'pattern': _pattern,
					'persistent': _persistent
				});
			});

			if (window.formatted && window.formatted.val) {
				ngModel.$setViewValue(window.formatted.val, 'input');
			}

			ngModel.$formatters.push(function(modelValue) {
				var value = modelValue || '';
				return value;
			});

			ngModel.$parsers.push(function(viewValue) {
				var value = viewValue || '';
				return value;
			});

		}
	};
}]);