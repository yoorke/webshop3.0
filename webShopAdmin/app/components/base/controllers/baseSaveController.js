(function () {
    'use strict';

    angular.module('webShopAdmin').controller('BaseSaveController', BaseSaveController);

    BaseSaveController.$inject = ['vm', 'BaseService', 'GlobalService', '$translate', 'Flash'];

    function BaseSaveController(vm, BaseService, GlobalService, $translate, Flash) {

        vm.BaseSaveItem = BaseSaveItem;

        function BaseSaveItem(modelName) {
            vm.submitted = true;
            if (!vm.form.$invalid) {
                GlobalService.SetLoaderStatus(true);
                vm.item.ID = vm.item.ID != undefined ? vm.item.ID : -1;
                BaseService.Save(modelName, vm.item).then(function (response) {
                    GlobalService.SetLoaderStatus(false);
                    if (response.status == 200) {
                        $translate("ACTION.SAVE.SUCCESS").then(function (translate) {
                            Flash.create('success', translate);
                        });
                        GlobalService.SetSavedItemStatus(true);
                    }
                    else if (response.status == 401) {
                        $translate('ERRORS.UNAUTHORIZED').then(function (translate) {
                            Flash.create('danger', translate);
                        });
                    }
                    else {
                        $translate('ERRORS.' + response.data).then(function (translate) {
                            Flash.create('danger', translate);
                        });
                    }
                })
            }
        }
    }
})();