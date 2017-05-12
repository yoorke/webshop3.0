(function () {
    'use strict';

    angular.module('webShopAdmin').controller('BaseCategoryController', BaseCategoryController);

    BaseCategoryController.$inject = ['$controller', 'GlobalService', 'vm', 'BaseService', '$scope'];

    function BaseCategoryController($controller, GlobalService, vm, BaseService, $scope) {

        $controller('InitController', { vm: vm });
        $controller('BaseGetByIDController', { vm: vm });
        $controller('CommonFunctionsController', { vm: vm });

        vm.UploadButtonOnSuccess = UploadButtonOnSuccess;
        vm.LoadAttributes = LoadAttributes;
        vm.AddAttribute = AddAttribute;
        vm.SetCategoryUrl = SetCategoryUrl;

        vm.ckeditorOptions = {
            language: 'en',
            allowedContent: true,
            entities: false,
            skin: 'office2013',
            height: 100
        };

        function UploadButtonOnSuccess(response) {
            vm.item.ImageUrl = response.data;
        }

        function LoadAttributes() {
            BaseService.GetByParameters('attribute', 'getByCategoryID', { CategoryID: vm.item.ID }).then(function (response) {
                vm.item.Attributes = response.data;
            })
        }

        function AddAttribute(attribute) {
            if (vm.item.Attributes == null)
                vm.item.Attributes = [];
            vm.item.Attributes.push(attribute);
        }

        //$scope.$watch(function () {
            //if (vm.item != null && vm.item.Name != null)
                //return vm.item.Name;
        //}, function () {
            //if(vm.item != null && vm.item.Name != null)
                //vm.item.Url = vm.CreateFriendlyUrl(vm.item.Name);
        //})

        function SetCategoryUrl() {
            if (vm.item.Name != null)
                vm.item.Url = vm.CreateFriendlyUrl(vm.item.Name);
        }
    }
})();