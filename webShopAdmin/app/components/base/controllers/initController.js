﻿(function () {
    'use strict';

    angular.module('webShopAdmin').controller('InitController', InitController);

    InitController.$inject = ['$route', 'vm'];

    function InitController($route, vm) {

        vm.modelName = $route.current.$$route.modelName;
        vm.getName = $route.current.$$route.getName;
        vm.getParameters = angular.fromJson($route.current.$$route.getParameters);
        vm.sortBy = $route.current.$$route.sortBy;
        vm.sortReverse = $route.current.$$route.sortReverse;
        vm.parentModelName = angular.fromJson($route.current.$$route.parentModelName);
        vm.parentArray = [];
        vm.itemModalView = $route.current.$$route.itemModalView;
        vm.itemModalChangeView = $route.current.$$route.itemModalChangeView;
        vm.itemModalController = $route.current.$$route.itemModalController;
        vm.itemModalSize = $route.current.$$route.itemModalSize;

        //$scope.$watch(function(){
            //if (GlobalService.GetCurrentUser() != null)
                //return GlobalService.GetCurrentUser().roleID;
        //}, function () {
            //vm.roleID = GlobalService.GetCurrentUser() != null ? GlobalService.GetCurrentUser().roleID : -1;
        //})
    }
})();