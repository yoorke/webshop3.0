(function () {
    'use strict';

    angular.module('webShopAdmin').controller('PageContentController', PageContentController);

    PageContentController.$inject = ['GlobalService', '$scope'];

    function PageContentController(GlobalService, $scope) {
        $scope.$watch(function () {
            return GlobalService.GetMenuStatus();
        }, function () {

        })
    }
})();