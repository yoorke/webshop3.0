(function () {
    'use strict';

    angular.module('webShopAdmin').controller('CategoryModalController', CategoryModalController);

    CategoryModalController.$inject = ['$controller', '$uibModalInstance', 'parameters', 'GlobalService'];

    function CategoryModalController($controller, $uibModalInstance, parameters, GlobalService) {
        var vm = this;

        $controller('BaseCategoryController', { vm: vm });
        $controller('BaseSaveModalController', { vm: vm, $uibModalInstance: $uibModalInstance });
        $controller('CommonController', { vm: vm, $uibModalInstance: $uibModalInstance });

        init();

        function init() {
            if (parameters.ID > 0)
                vm.BaseGetItemByID(parameters.modelName, parameters.ID).then(function (response) {
                    vm.item = response.data;
                    vm.LoadAttributes();
                });
            else {
                vm.item = {};
                vm.item.Attributes = [];
            }
            vm.apiUrl = GlobalService.GetApiUrl();
            vm.root = GlobalService.GetRoot();
        }
    }
})();