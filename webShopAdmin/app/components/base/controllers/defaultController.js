(function () {
    'use strict';

    angular.module('webShopAdmin').controller('DefaultController', DefaultController);

    DefaultController.$inject = ['$controller', 'GlobalService', '$location', '$scope'];

    function DefaultController($controller, GlobalService, $location, $scope) {

        var vm = this;
        vm.Reload = Reload;
        vm.OnItemDeleted = OnItemDeleted;
        vm.OnItemAdded = OnItemAdded;
        vm.DeleteAll = DeleteAll;
        
            
        $controller('InitController', { vm: vm, $scope: $scope });
        $controller('BaseGetController', { vm: vm });
        $controller('CommonController', { vm: vm, $uibModalInstance: null });
        $controller('BaseDeleteController', { vm: vm });
        $controller('BaseSaveController', { vm: vm });

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

        function Reload(response) {
            init();
        }

        function OnItemAdded(response) {
            if(vm.itemAddedMethod == 'noReload'){
                if (vm.items == null) {
                    vm.items = [];
                }
                vm.items.push(response.data);
            }
            else {
                Reload();
            }

        }

        function OnItemDeleted(response) {
            vm.items.splice(returnItemIndex(response.data.ID), 1);
        }

        function returnItemIndex(id) {
            var itemIndex = -1;
            angular.forEach(vm.items, function (item, index) {
                if (item.ID == id) {
                    itemIndex = index;
                }
            })
            return itemIndex;
        }

        function DeleteAll() {
            var itemsToDelete = [];
            angular.forEach(vm.items, function (item, index) {
                if (item.Checked)
                    itemsToDelete.push(item.ID);
            });

            vm.BaseDeleteAll(vm.modelName, itemsToDelete, vm.Reload);
        }
    }
})();