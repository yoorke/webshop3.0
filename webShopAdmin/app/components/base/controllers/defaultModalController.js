(function () {
    'use strict';

    angular.module('webShopAdmin').controller('DefaultModalController', DefaultModalController);

    DefaultModalController.$inject = ['$controller', '$uibModalInstance', 'parameters', 'GlobalService'];

    function DefaultModalController($controller, $uibModalInstance, parameters, GlobalService) {
        var vm = this;
        //vm.UploadButtonOnSuccess = UploadButtonOnSuccess;
        vm.SaveItem = SaveItem;

        $controller('InitController', { vm: vm });
        $controller('BaseGetByIDController', { vm: vm });
        $controller('BaseSaveModalController', { vm: vm, $uibModalInstance: $uibModalInstance });
        $controller('CommonController', { vm: vm, $uibModalInstance: $uibModalInstance });

        init();

        function init() {
            if(parameters.modalType == 1){
                if (parameters.ID > 0)
                    vm.BaseGetItemByID(parameters.modelName, parameters.ID).then(function (response) {
                        vm.item = response.data;
                    })
                else
                    vm.item = {};
            }
            else if (parameters.modalType == 2) {
                vm.item = parameters.item == null ? {} : angular.copy(parameters.item);
            }

            vm.parameters = parameters;
            vm.apiUrl = GlobalService.GetApiUrl();
            vm.root = GlobalService.GetRoot();
            
            
        }

        function SaveItem() {
            if (parameters.modalType == null || parameters.modalType == 1) {
                vm.BaseSaveModalItem('Attribute');
            }
            else if (parameters.modalType == 2) {
                vm.item.itemIndex = parameters.itemIndex;
                vm.BaseReturnItem();
            }
        }

        //function UploadButtonOnSuccess(response) {
            //vm.item.ImageUrl = response.data;
                
        //}

        //vm.ckeditorOptions = {
            //language: 'en',
            //allowedContent: true,
            //entities: false,
            //skin: 'office2013',
            //height: 100
        //}
    }
})();