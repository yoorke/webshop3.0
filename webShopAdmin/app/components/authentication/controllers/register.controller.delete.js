(function () {
    'use strict';

    angular
        .module('webShopAdmin')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'Flash', 'CommonService', '$scope', '$uibModalInstance', 'parameters'];
    function RegisterController(UserService, $location, $rootScope, Flash, CommonService, $scope, $uibModalInstance, parameters) {
        //var vm = this;
        $scope.submitted = false;
        $scope.register = register;
        $scope.register_change = register_change;

        CommonService.GetAll('UserRole').then(function (response) {
            $scope.roles = response.data;
        })

        CommonService.GetCustom('Firma', 'GetByUserID', '').then(function (response) {
            $scope.firme = response.data;
        })

        CommonService.GetAll('Odeljenje').then(function (response) {
            $scope.odeljenja = response.data;
        })

        function register() {
            if ($scope.user.Odeljenje == null) {
                $scope.user.Odeljenje = {};
                $scope.user.Odeljenje.ID = 0;
            }
            $scope.dataLoading = true;
            $scope.submitted = true;
            if (!$scope.form.$invalid) {
                UserService.Create($scope.user)
                    .then(function (response) {
                        if (response == 'Success') {
                            Flash.create('success', 'Registration successful');
                            $uibModalInstance.close(response);
                            //$location.path('/login');
                        } else {
                            Flash.create('danger', response.message);
                            $scope.dataLoading = false;
                        }
                    });
            }
        }

        function register_change() {
            $scope.dataLoading = true;
            $scope.submitted = true;
            if (!$scope.form.$invalid) {
                UserService.Update($scope.user)
                    .then(function (response) {
                        if (response.status == 200) {
                            Flash.create('success', 'Korisnik uspešno izmenjen');
                            $uibModalInstance.close(response);
                            //$location.path('/login');
                        } else {
                            Flash.create('danger', response.message);
                            $scope.dataLoading = false;
                        }
                    });
            }
        }

        $scope.Close = function () {
            $uibModalInstance.dismiss();
        }

        $scope.id = parameters.id;
        if (parameters.id > -1) {
            $scope.loading = true;
            CommonService.GetByID(parameters.modelName.indexOf('.') > -1 ? parameters.modelName.substring(parameters.modelName.lastIndexOf('.') + 1) : parameters.modelName, parameters.id).then(function (response) {
                $scope.user = response.data;
                $scope.loading = false;
            })
        }

        $scope.getLogovaniKorisnik = function () {

        }

        $scope.selectedParents = parameters.selectedParents;
        $scope.root = $rootScope.root;

    }

})();
