(function(){
    'use strict';

    angular.module('webShopAdmin').directive('setScrollableContainerHeight', function($timeout){
        return{
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var height = 150;
                $timeout(function () {
                    if (document.getElementsByClassName('modal') != null && document.getElementsByClassName('modal').length > 0) {
                        elem.css('height', 400);
                        //alert('modal' + (document.getElementsByClassName('modal')[0].offsetHeight - height) + (document.getElementsByClassName('modal')[0].offsetHeight) + height);
                    }
                    else{
                        if (document.getElementById('taskView') != null)
                            height = document.getElementsByClassName('mainData')[0].offsetHeight + document.getElementsByClassName('taskData')[0].offsetHeight + 50;
                        elem.css('height', document.getElementsByClassName('page-wrapper')[0].offsetHeight - height);
                        //alert('pageWrapper');
                        }
                }, 100);
            }
            
        }
    })
})();