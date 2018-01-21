(function () {
    'use strict';

    angular.module('webShopAdmin').controller('LoaderController', LoaderController);

    LoaderController.$inject = ['$scope', 'GlobalService'];

    function LoaderController($scope, GlobalService) {
        var vm = this;

        $scope.$watch(function () {
            return GlobalService.GetLoaderStatus();
        }, function () {
            vm.ShowLoader = GlobalService.GetLoaderStatus;
        })
    }
})();