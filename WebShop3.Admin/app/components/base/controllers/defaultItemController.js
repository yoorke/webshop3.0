(function () {
    'user strict';

    angular.module('webShopAdmin').controller('DefaultItemController', DefaultItemController);

    DefaultItemController.$inject = ['$controller', 'GlobalService'];

    function DefaultItemController($controller, GlobalService) {
        var vm = this;
        

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

        
            
        
    }
})()