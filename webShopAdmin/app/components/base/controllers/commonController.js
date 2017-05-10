(function () {
    'use strict';

    angular.module('webShopAdmin').controller('CommonController', CommonController);

    CommonController.$inject = ['vm', '$uibModal', 'GlobalService', '$location', '$uibModalInstance'];

    function CommonController(vm, $uibModal, GlobalService, $location, $uibModalInstance) {

        vm.ShowModal = ShowModal;
        vm.Redirect = Redirect;
        vm.CloseModal = CloseModal;
        //if (GlobalService.GetCurrentUser()!==null)
            //vm.roleID = GlobalService.GetCurrentUser().roleID;
        //vm.AddItem = AddItem;        

        function ShowModal(modalView, modalController, modalSize, parameters, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: GlobalService.GetRoot() + modalView,
                controller: modalController,
                controllerAs: 'vm',
                size: modalSize,
                backdrop: 'static',
                resolve: {
                    parameters: parameters
                }
            });

            modalInstance.result.then(function (response) {
                if (callback != undefined)
                    callback(response);
            })
        }

        function Redirect(url) {
            $location.url(url);
        }

        function CloseModal() {
            $uibModalInstance.dismiss();
        }

        
            
        
    }
})();