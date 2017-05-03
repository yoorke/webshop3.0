(function () {
    'use strict';

    angular.module('webShopAdmin').directive('datePickerPopup', DatePickerPopup);

    function DatePickerPopup() {
        return {
            restrict: 'E',
            replace: false,
            scope:{
                popupPlacement: '@',
                selected: '=',
                controlId: "@",
                required: "@"
            },
            controller: function($scope){
                $scope.requiredAttribute = $scope.required === 'true' ? true : false;
            },
            transclude: true,            
            template: '<div class="input-group  input-append">' +
                        '<input type="text" id={{controlId}} name={{controlId}} class="form-control" uib-datepicker-popup="dd.MM.yyyy" is-open="isOpen" ng-model="selected" popup-placement="{{popupPlacement}}" datepicker-iso-date ng-required="{{requiredAttribute == true}}"/>' +
                        '<span class="input-group-btn"><button type="button" class="btn btn-default" ng-click="isOpen = !isOpen"><i class="glyphicon glyphicon-calendar"></i></button></span></div>'
        }
    }
})()