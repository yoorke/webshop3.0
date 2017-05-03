(function () {
    'use strict';

    angular.module('webShopAdmin').controller('MainContentController', MainContentController);

    MainContentController.$inject = ['GlobalService', '$scope', '$controller'];

    function MainContentController(GlobalService, $scope, $controller) {
        var vm = this;

        $controller('CommonController', { vm: vm, $uibModalInstance: null });

        if (GlobalService.GetCurrentUser() != null) {
            vm.roleID = GlobalService.GetCurrentUser().roleID;
            vm.lastName = GlobalService.GetCurrentUser().lastName;
            vm.firstName = GlobalService.GetCurrentUser().firstName;
        }

        $scope.$watch(function () {
            return GlobalService.GetMenuStatus();
        }, function () {
            vm.menuCollapsed = GlobalService.GetMenuStatus();
        })

        vm.ToggleMenuCollapsed = function () {
            vm.menuCollapsed = !vm.menuCollapsed;
            GlobalService.SetMenuStatus(vm.menuCollapsed);
            
        }

        $scope.$watch(function () {
            return GlobalService.GetCurrentUser();
        }, function () {
            vm.userAuthenticated = GlobalService.IsUserAuthenticated();
            //if (!vm.userAuthenticated)
            vm.menuCollapsed = vm.userAuthenticated;
            //vm.roleID = vm.userAuthenticated ? GlobalService.GetCurrentUser().roleID : -1;
        })

        $scope.$watch(function () {
            if (GlobalService.GetCurrentUser() != null)
                return GlobalService.GetCurrentUser().roleID;
        }, function () {
            vm.roleID = GlobalService.GetCurrentUser() != null ? GlobalService.GetCurrentUser().roleID : -1;
        })
    }
})();