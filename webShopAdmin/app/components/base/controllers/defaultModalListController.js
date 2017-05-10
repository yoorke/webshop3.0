(function () {
    'use strict';

    angular.module('webShopAdmin').controller('DefaultModalListController', DefaultModalListController);

    DefaultModalListController.$inject = ['$controller', '$uibModalInstance', 'parameters', 'GlobalService'];

    function DefaultModalListController($controller, $uibModalInstance, parameters, GlobalService) {
        var vm = this;

        vm.Reload = Reload;
        vm.DeleteAll = DeleteAll;

        //$controller('InitController', { vm: vm });
        $controller('BaseGetController', { vm: vm });
        $controller('CommonController', { vm: vm, $uibModalInstance: $uibModalInstance });
        $controller('BaseDeleteController', { vm: vm });

        init();

        function init() {
            vm.BaseGetItems(parameters.modelName, parameters.getName, angular.fromJson(parameters.getParameters), true);
            vm.itemModalView = parameters.itemModalView;
            vm.itemModalEditView = parameters.itemModalEditView;
            vm.itemModalController = parameters.itemModalController;
            vm.itemModalSize = parameters.itemModalSize;
            vm.modelName = parameters.modelName;
            vm.parentModelName = angular.fromJson(parameters.parentModelName);
            vm.parentModelCompare = parameters.parentModelCompare;
            vm.parentArray = [];

            vm.apiUrl = GlobalService.GetApiUrl();
        }

        function Reload() {
            init();
        }

        function DeleteAll() {
            var itemsForDelete = [];
            angular.forEach(vm.items, function (value, key) {
                if (value.checked == true)
                    itemsForDelete.push(value.ID);
            })

            vm.BaseDeleteAll(vm.modelName, itemsForDelete, vm.Reload);
        }
    }
})();