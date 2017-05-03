(function () {
    'use strict';

    angular.module('webShopAdmin').controller('BaseGetByIDController', BaseGetByIDController);

    BaseGetByIDController.$inject = ['vm', 'BaseService'];

    function BaseGetByIDController(vm, BaseService) {
        vm.BaseGetItemByID = BaseGetItemByID;

        function BaseGetItemByID(modelName, id) {
            return BaseService.GetByID(modelName, id).then(function (response) {
                return response;
            })
        }
    }
})();