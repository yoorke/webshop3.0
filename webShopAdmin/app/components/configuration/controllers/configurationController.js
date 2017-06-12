(function () {
    'user strict';

    angular.module('webShopAdmin').controller('ConfigurationController', ConfigurationController);

    ConfigurationController.$inject = ['$controller', 'GlobalService'];

    function ConfigurationController($controller, GlobalService) {
        var vm = this;
        vm.UploadButtonSuccess = UploadButtonSuccess;

        $controller('InitController', { vm: vm });
        $controller('BaseGetByIDController', { vm: vm });
        $controller('BaseSaveController', { vm: vm });
        $controller('CommonController', { vm: vm, $uibModalInstance: null });

        init();

        function init() {
            vm.BaseGetItemByID(vm.modelName, vm.defaultID).then(function (response) {
                vm.item = response.data;
            })

            vm.apiUrl = GlobalService.GetApiUrl();
        }

        function UploadButtonSuccess(response) {
            vm.item.WebShopLogoUrl = response.data;
        }
    }
})()