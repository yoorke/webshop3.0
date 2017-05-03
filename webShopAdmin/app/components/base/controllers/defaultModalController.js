(function () {
    'use strict';

    angular.module('webShopAdmin').controller('DefaultModalController', DefaultModalController);

    DefaultModalController.$inject = ['$controller', '$uibModalInstance', 'parameters', 'GlobalService'];

    function DefaultModalController($controller, $uibModalInstance, parameters, GlobalService) {
        var vm = this;
        vm.UploadButtonOnSuccess = UploadButtonOnSuccess;

        $controller('InitController', { vm: vm });
        $controller('BaseGetByIDController', { vm: vm });
        $controller('BaseSaveModalController', { vm: vm, $uibModalInstance: $uibModalInstance });
        $controller('CommonController', { vm: vm, $uibModalInstance: $uibModalInstance });

        init();

        function init() {
            if (parameters.ID > 0)
                vm.BaseGetItemByID(parameters.modelName, parameters.ID).then(function (response) {
                    vm.item = response.data;
                })
            else
                vm.item = {};
            vm.apiUrl = GlobalService.GetApiUrl();
            vm.root = GlobalService.GetRoot();
            
        }

        function UploadButtonOnSuccess(response) {
            vm.item.Url = response.data;
                
        }
    }
})();