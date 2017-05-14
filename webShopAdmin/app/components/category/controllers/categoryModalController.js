(function () {
    'use strict';

    angular.module('webShopAdmin').controller('CategoryModalController', CategoryModalController);

    CategoryModalController.$inject = ['$controller', '$uibModalInstance', 'parameters', 'GlobalService', '$scope'];

    function CategoryModalController($controller, $uibModalInstance, parameters, GlobalService, $scope) {
        var vm = this;

        $controller('BaseCategoryController', { vm: vm, $scope: $scope });
        $controller('BaseSaveModalController', { vm: vm, $uibModalInstance: $uibModalInstance });
        $controller('CommonController', { vm: vm, $uibModalInstance: $uibModalInstance });

        init();

        function init() {
            vm.ID = parameters.ID;
            if (parameters.ID > 0)
                vm.BaseGetItemByID(parameters.modelName, parameters.ID).then(function (response) {
                    vm.item = response.data;
                    //vm.LoadAttributes();
                    if (vm.item.Attributes == null)
                        vm.item.Attributes = [];
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