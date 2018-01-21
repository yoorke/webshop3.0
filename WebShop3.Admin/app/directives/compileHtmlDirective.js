(function () {
    'use strict';

    angular.module('webShopAdmin').directive('compileHtml', CompileHtml);

    CompileHtml.$inject = ['$parse', '$sce', '$compile'];

    function CompileHtml($parse, $sce, $compile) {
        return {
            restrict: 'A',
            scope:{
                compileHtml: '='
            },
            link: function (scope, element, attributes) {
                if (!scope.compileHtml.startsWith('<'))
                    scope.compileHtml = '<p>' + scope.compileHtml;
                if (!scope.compileHtml.endsWith('>'))
                    scope.compileHtml += '</p>';
                var expression = $sce.parseAsHtml("'" + scope.compileHtml + "'");

                var getResult = function () {
                    return expression(scope);
                }

                scope.$watch(getResult, function (newValue) {
                    var linker = $compile(newValue);
                    element.append(linker(scope));
                })
            }
        }
    }
})();