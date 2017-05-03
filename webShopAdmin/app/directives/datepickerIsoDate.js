(function () {
    'use strict';

    angular.module('webShopAdmin').directive('datepickerIsoDate', ['$parse', DatepickerIsoDate]);

    DatepickerIsoDate.$inject = ['$parse'];

    function DatepickerIsoDate($parse) {
        return {
            restrict: 'A',
            require: ['ngModel'],
            link: function (scope, element, attrs, ctrls) {
                var ngModelController = ctrls[0];

                ngModelController.$parsers.push(function (viewValue) {
                    return new Date(viewValue.toISOString());
                })
                ngModelController.$formatters.push(function (viewValue) {
                    if (viewValue != undefined)
                        return new Date(viewValue);
                    else return viewValue;
                })
            }
        }
    }
})();