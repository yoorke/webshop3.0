(function () {
    'use strict';

    angular.module('webShopAdmin').directive('topMenu', TopMenu);

    function TopMenu() {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/layout/topMenu.view.html'
        }
    }
})();