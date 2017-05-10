(function () {
    'use strict';

    angular.module('webShopAdmin').controller('BaseDeleteController', BaseDeleteController);

    BaseDeleteController.$inject = ['BaseService', 'GlobalService', 'Flash', '$translate', '$confirm', 'vm']

    function BaseDeleteController(BaseService, GlobalService, Flash, $translate, $confirm, vm) {

        vm.BaseDelete = BaseDelete;
        vm.BaseDeleteAll = BaseDeleteAll;
        //Delete
        function BaseDelete(id, modelName, callback) {
            $translate(['ACTION.DELETE.QUESTION', 'ACTION.DELETE.DELETE', 'ACTION.CANCEL', 'ACTION.DELETE.ACTION', 'MODEL.' + modelName.toUpperCase(), 'ACTION.DELETE.MESSAGE.SUCCESS', 'ACTION.DELETE.MESSAGE.FAIL']).then(function (translate) {
                $confirm({
                    text: translate['ACTION.DELETE.QUESTION'] + (translate['MODEL.' + modelName.toUpperCase()]).toLowerCase() + ' ' + id + '?',
                    title: translate['ACTION.DELETE.ACTION'],
                    ok: translate['ACTION.DELETE.DELETE'],
                    cancel: translate['ACTION.CANCEL']
                }).then(function () {
                    GlobalService.SetLoaderStatus(true);
                    BaseService.Delete(modelName, id).then(function (response) {
                        GlobalService.SetLoaderStatus(false);
                        if (response.status == 200) {
                            Flash.create('success', translate['ACTION.DELETE.MESSAGE.SUCCESS']);
                            if (callback != undefined)
                                callback();                            
                        }
                        else {
                            $translate('ERRORS.' + response.data).then(function(translate){
                                Flash.create('danger', translate);
                            })
                        }
                    })
                })
            })
        }

        function BaseDeleteAll(modelName, items, callback) {
            if (items.length > 0) {
                $translate(['ACTION.DELETE.MULTIPLE', 'ACTION.DELETE.DELETE', 'ACTION.CANCEL', 'ACTION.DELETE.ACTION', 'MODEL.' + modelName.toUpperCase(), 'ACTION.DELETE.MESSAGE.SUCCESS', 'ACTION.DELETE.MESSAGE.FAIL']).then(function (translate) {
                    $confirm({
                        text: translate['ACTION.DELETE.MULTIPLE' + '?'],
                        title: translate['ACTION.DELETE.ACTION'],
                        ok: translate['ACTION.DELETE.DELETE'],
                        cancel: translate['ACTION.CANCEL']
                    }).then(function () {
                        GlobalService.SetLoaderStatus(true);
                        BaseService.DeleteAll(modelName, items).then(function (response) {
                            GlobalService.SetLoaderStatus(false);
                            if (response.status == 200) {
                                Flash.create('success', translate['ACTION.DELETE.MESSAGE.SUCCESS'])
                                if (callback != undefined)
                                    callback();
                                
                            }
                            else
                                Flash.create('danger', translate['ACTION.DELETE.MESSAGE.FAIL']);
                        })
                    })
                })
            }
            else
                Flash.create('danger', 'Odaberite stavke');
        }
    }
})();