(function () {
    'use strict';

    angular.module('webShopAdmin').directive('sideMenu', SideMenu);    

    SideMenu.$inject = ['GlobalService', 'BaseService', '$parse', '$uibModal', '$timeout'];

    function SideMenu(GlobalService, BaseService, $parse, $uibModal, $timeout) {
        var jqWindow = $(window);
        return {
            restrict: 'E',
            templateUrl: 'app/directives/layout/sideMenu.view.html',
            scope: {
                userAuthenticated: '=',
                showModal: '&'
            },
            controller: function ($scope) {
                //$scope.items = [{ "Naziv": "Menu1", "Url": "Url1", "Icon": "fa fa-home", "SubMenu": null },
                //{ "Naziv": "Menu2", "Url": "Url2", "Icon": "fa fa-home", "SubMenu": [{ "Naziv":"Submenu1", "Url":"Url1", "Icon":"", "SubMenu": null}] },
                //{ "Naziv": "Menu3", "Url": "Url3", "Icon": "fa fa-home", "SubMenu": [{ "Naziv": "Submenu2", "Url": "Url1", "Icon": "", "SubMenu": null }] }
                //];
                $scope.$watch(function () {
                    return GlobalService.IsUserAuthenticated();
                }, function () {
                    if(GlobalService.IsUserAuthenticated())
                    BaseService.GetAll("menuItem", "get").then(function (response) {
                        $scope.items = response.data;
                    })
                });
                

                $scope.hoverItem = function ($event) {
                    $scope.showHoverElement = true;
                    $scope.hoverElementHeight = $event.currentTarget.clientHeight;
                    var menuTopValue = 50;
                    $scope.hoverElementTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
                }

                $timeout(function(){
                    $scope.modelsParameters = GlobalService.GetModelsParameters();
                }, 500)
                $scope.setModal = function (model) {
                    var model = $scope.modelsParameters[model];
                    $scope.showModal({
                        "modalView": model.templateUrl, "modalController": model.controller, "modalSize": model.modalSize,
                        "parameters": {
                            modelName: model.modelName,
                            getName: model.getName,
                            getParameters: model.getParameters,
                            itemModalView: model.itemModalView,
                            itemModalController: model.itemModalController,
                            itemModalSize: model.itemModalSize,
                            parentModelName: model.parentModelName,
                            parentModelCompare: model.parentModelCompare
                        }, "callback": null
                    });
                }

                //$scope.$watch(function () {
                    //return GlobalService.IsUserAuthenticated();
                //}, function () {
                    //$scope.userAuthenticated = GlobalService.IsUserAuthenticated();
                //})

                $scope.$watch(function () {
                    return GlobalService.GetMenuStatus();
                }, function () {
                    if(GlobalService.GetMenuStatus() == true)
                        angular.forEach($scope.items, function (value, key) {
                            value.collapseSubMenu = true;
                        })
                })
                
            },
            link: function (scope, element, attrs) {
                jqWindow.on('resize', _onWindowResize);
                jqWindow.on('click', _onWindowClick);

                function _onWindowResize() {
                    //var shouldMenuBeCollapsed = window.innerWidth <= 1200;
                    var menuHeight = _calculateMenuHeight();
                    if (shouldMenuBeCollapsed() != GlobalService.GetMenuStatus() || scope.menuHeight != menuHeight) {
                        scope.$apply(function () {
                            scope.menuHeight = menuHeight;
                            GlobalService.SetMenuStatus(shouldMenuBeCollapsed());
                        })
                    }
                }

                function _onWindowClick($evt) {
                    console.log($evt.target.parentElement.attributes["ng-href"]);
                    if (isDescendant(element[0], $evt.target) && $evt.target.parentElement.attributes["ng-href"] == null && GlobalService.GetMenuStatus() && ($evt.target.className.indexOf('fa fa-') > -1) || $evt.target.className.indexOf('side-menu-list') > -1) {
                        GlobalService.SetMenuStatus(false);
                    }
                    else {
                        if (!GlobalService.GetMenuStatus() && shouldMenuBeCollapsed()) {
                            //GlobalService.SetMenuStatus(true);
                            //scope.$apply();
                        }
                    }
                }

                function _calculateMenuHeight() {
                    return element[0].childNodes[0].clientHeight - 84;
                }

                function isDescendant(parent, child){
                    var node = child.parentNode;
                    while(node != null){
                        if(node == parent){
                            return true;
                        }
                        node = node.parentNode;
                    }
                    return false;
                }

                function shouldMenuBeCollapsed() {
                    return window.innerWidth <= 1200;
                }

                //$scope.setModal = function(model) {
                //alert(model);
                //}

                //scope.ShowModal = function (modalView, modalController, modalSize, parameters, callback) {
                    //var modalInstance = $uibModal.open({
                        //animation: true,
                        //templateUrl: GlobalService.GetRoot() + modalView,
                        //controller: modalController,
                        //controllerAs: 'vm',
                        //size: modalSize,
                        //backdrop: 'static',
                        //resolve: {
                            //parameters: parameters
                        //}
                    //});

                    //modalInstance.result.then(function () {
                        //if (callback != undefined)
                            //callback();
                    //})
                //}
            }
        }
    }
})();