(function () {
    'use strict';
    angular.module('webShopAdmin').directive('passwordStrength', PasswordStrength);

    PasswordStrength.$inject = ['$translate'];

    function PasswordStrength($translate) {
        return {
            require: 'ngModel',
            restrict: 'E',
            scope: {
                password: '=ngModel'
            },
            link: function (scope, elem, attrs, ctrl) {
                scope.$watch('password', function (newVal) {

                    scope.strength = isSatisfied(newVal && newVal.length >= 8) +
                      isSatisfied(newVal && /[A-z]/.test(newVal)) +
                      isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
                      isSatisfied(newVal && /\d/.test(newVal));

                    $translate(['USER.PASSWORDSTRENGTH']).then(function (translate) {          
                        scope.translatetooltip = translate['USER.PASSWORDSTRENGTH'];
                    });

                    
                    function isSatisfied(criteria) {
                        return criteria ? 1 : 0;
                    }
                }, true);
            },
           
            
            template: '<div class="progress"  uib-tooltip="{{translatetooltip}}">' +
            '<div class="progress-bar progress-bar-danger" style="width: {{strength >= 1 ? 25 : 0}}%"></div>' +
            '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 2 ? 25 : 0}}%"></div>' +
            '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 3 ? 25 : 0}}%"></div>' +
            '<div class="progress-bar progress-bar-success" style="width: {{strength >= 4 ? 25 : 0}}%"></div>' +
            '</div>'

         

        }
       }
})();