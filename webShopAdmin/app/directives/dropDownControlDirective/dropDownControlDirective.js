(function () {
    'use strict';

    angular.module('webShopAdmin').directive('dropDownControl', DropDownControl);

    DropDownControl.$inject = ['$rootScope', 'BaseService', '$compile', 'GlobalService', '$uibModal', '$route'];

    function DropDownControl($rootScope, BaseService, $compile, GlobalService, $uibModal, $route) {
        //var templateUrl = GlobalService.GetRoot() + 'app/directives/dropDownControlDirective/dropDownControlTemplate.view.html';
        var modelParameters = GlobalService.GetModelsParameters();
        return {
            resctrict: 'E',
            replace: true,
            templateUrl: function (element, attrs) {
                var type = attrs.type == undefined ? '' : attrs.type;
                return 'app/directives/dropDownControlDirective/dropDownControlTemplate' + type + '.view.html';
            },
            scope:{
                selected: '=',
                modelName: '@',
                getName: '@',
                modelProperty: '@',
                required: '@',
                controlId: '@',
                allowAddNew: '@',
                type: '@',
                getParameters: '@',           
                //routeName: '@'
            },
            controller: function($scope){
                $scope.items = [];
                $scope.selectOptions = "item.modelProperty for item in items";
                $scope.requiredAttribute = $scope.required === 'true' ? 'true' : 'false';
                $scope.allowAddNew = $scope.allowAddNew === 'true' ? true : false;
                $scope.modelParameters = GlobalService.GetModelsParameters()[$scope.modelName];
                //$scope.modelParameters = $route.routes['/' + $scope.routeName];
                
                //cope.allowAddNew = false;
            },
            link: function (scope, element, attrs) {
                var buttonClear = element[0].children[1].children[0];
                buttonClear.onclick = function (e) {
                    scope.selected = undefined;
                    e.preventDefault();
                    scope.$apply();
                }

                var buttonAdd = element[0].children[1].children[1];
                buttonAdd.onclick = function () {
                    scope.showModal(scope.modelParameters.itemModalView, scope.modelParameters.itemModalController, scope.modelParameters.itemModalSize, { ID: -1 }, scope.loadItems);
                }

                if (scope.required != undefined) {
                    //element.attr('required', true);
                    //var content = $compile(element.html())(scope);
                    //element.replaceWith(content);
                }

                

                scope.loadItems = function(newItem){
                    if (scope.modelName != undefined && scope.getName != undefined) {
                        BaseService.GetByParameters(scope.modelName, scope.getName, angular.fromJson(scope.getParameters != undefined ? scope.getParameters : '[]')).then(function (response) {
                            scope.items = response.data;
                            if (newItem != undefined)
                                //$("[name='cmbDrzava'] option[value=" + (newID - 1) + "]").attr('selected', 'selected');
                                scope.selected = newItem;
                        })
                    }
                }

                scope.loadItems();

                //function addNew() {
                    //vm.ShowModal($scope.modelParameters.itemModalView, $scope.modelParameters.itemModalController, $scope.modelParameters.itemModalSize, { ID: -1 }, null);
                    //showModal();
                //}

                scope.showModal = function (modalView, modalController, modalSize, parameters, callback) {
                    //alert('modal');
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
                    })

                    modalInstance.result.then(function (response) {
                        if (callback != undefined)
                            callback(response.data);
                        //scope.selected = response.data.ID;
                        //$("[name='cmbDrzava'] option[value=" + response.data.ID + "]").attr('selected', 'selected');
                    })
                }


                
            }
        }
    }
})();