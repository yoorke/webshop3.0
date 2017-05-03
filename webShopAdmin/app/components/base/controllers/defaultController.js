(function () {
    'use strict';

    angular.module('webShopAdmin').controller('DefaultController', DefaultController);

    DefaultController.$inject = ['$controller', 'GlobalService', '$location', '$scope'];

    function DefaultController($controller, GlobalService, $location, $scope) {

        var vm = this;
        vm.Reload = Reload;
        
            
        $controller('InitController', { vm: vm, $scope: $scope });
        $controller('BaseGetController', { vm: vm });
        $controller('CommonController', { vm: vm, $uibModalInstance: null });
        $controller('BaseDeleteController', { vm: vm });

        init();

        function init() {
            vm.BaseGetItems(vm.modelName, vm.getName, vm.getParameters, true);
            vm.apiUrl = GlobalService.GetApiUrl();
            vm.root = GlobalService.GetRoot();

            $scope.$watch(function () {
                if (GlobalService.GetCurrentUser() != null)
                    return GlobalService.GetCurrentUser().roleID;
            }, function () {
                vm.roleID = GlobalService.GetCurrentUser() != null ? GlobalService.GetCurrentUser().roleID : -1;
            })

        }

        function Reload() {
            init();
        }
    }
})();