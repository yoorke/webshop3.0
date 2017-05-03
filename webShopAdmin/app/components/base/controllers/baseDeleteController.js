(function () {
    'use strict';

    angular.module('webShopAdmin').controller('BaseDeleteController', BaseDeleteController);

    BaseDeleteController.$inject = ['BaseService', 'GlobalService', 'Flash', '$translate', '$confirm', 'vm']

    function BaseDeleteController(BaseService, GlobalService, Flash, $translate, $confirm, vm) {

        vm.BaseDelete = BaseDelete;
        vm.BaseDeleteAll = BaseDeleteAll;
        //Delete
        function BaseDelete(id, modelName, callback) {
            $translate(['DELETE.QUESTION', 'DELETE.DELETE', 'CANCEL', 'DELETE.ACTION', 'MODEL-' + modelName.toUpperCase(), 'DELETE.MESSAGE.SUCCESS', 'DELETE.MESSAGE.FAIL']).then(function (translate) {
                $confirm({
                    text: translate['DELETE.QUESTION'] + (translate['MODEL-' + modelName.toUpperCase()]).toLowerCase() + ' ' + id + '?',
                    title: translate['DELETE.ACTION'],
                    ok: translate['DELETE.DELETE'],
                    cancel: translate['CANCEL']
                }).then(function () {
                    GlobalService.SetLoaderStatus(true);
                    BaseService.Delete(modelName, id).then(function (response) {
                        if (response.status == 200) {
                            Flash.create('success', translate['DELETE.MESSAGE.SUCCESS']);
                            if (callback != undefined)
                                callback();
                            GlobalService.SetLoaderStatus(false);
                        }
                        else
                            Flash.create('danger', translate['DELETE.MESSAGE.FAIL']);
                    })
                })
            })
        }

        function BaseDeleteAll(modelName, items, callback) {
            if (items.length > 0) {
                $translate(['DELETE.MULTIPLE', 'DELETE.DELETE', 'CANCEL', 'DELETE.ACTION', 'MODEL-' + modelName.toUpperCase(), 'DELETE.MESSAGE.SUCCESS', 'DELETE.MESSAGE.FAIL']).then(function (translate) {
                    $confirm({
                        text: translate['DELETE.MULTIPLE' + '?'],
                        title: translate['DELETE.ACTION'],
                        ok: translate['DELETE.DELETE'],
                        cancel: translate['CANCEL']
                    }).then(function () {
                        GlobalService.SetLoaderStatus(true);
                        BaseService.DeleteAll(modelName, items).then(function (response) {
                            if (response.status == 200) {
                                Flash.create('success', translate['DELETE.MESSAGE.SUCCESS'])
                                if (callback != undefined)
                                    callback();
                                GlobalService.SetLoaderStatus(false);
                            }
                            else
                                Flash.create('danger', translate['DELETE.MESSAGE.FAIL']);
                        })
                    })
                })
            }
            else
                Flash.create('danger', 'Odaberite stavke');
        }
    }
})();