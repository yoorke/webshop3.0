(function () {
    'use strict';

    angular.module('webShopAdmin').directive('filterMenu', FilterMenu);

    FilterMenu.$inject = [];

    function FilterMenu() {
        
        return {
            restrict: 'E',
            templateUrl: 'app/directives/layout/filterMenu.view.html',
            


            link: function (scope, element, attrs) {
                $(document).bind('click', function (event) {
                    if (element.find(event.target).length > 0  || event.target.className.indexOf('fa fa-2x fa-filter') >= 0)
                        return;
                    else {
                        scope.$apply(function (scope) {
                            scope.vm.ShowFilter = false;
                        })
                    }
                })

   
            }
        }
    }
})();