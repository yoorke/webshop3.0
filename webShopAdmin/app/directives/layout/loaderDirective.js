(function () {
    'use strict';

    angular.module('webShopAdmin').directive('loader', Loader);

    Loader.$inject = ['GlobalService'];

    function Loader(GlobalService) {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/layout/loader.view.html',
            scope:{

            },
            controller: function ($scope) {

                $scope.$watch(function () {
                    return GlobalService.GetLoaderStatus();                    
                }, function () {
                    $scope.showLoader = GlobalService.GetLoaderStatus();
                })
                
            }
        }
    }
})();