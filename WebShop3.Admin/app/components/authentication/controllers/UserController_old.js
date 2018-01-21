(function () {
    'user strict';

    angular.module('webShopAdmin').controller('UserController', UserController);

    UserController.$inject = ['UserService', '$rootScope', '$scope', '$translate'];
    function UserController(UserService, $rootScope, $scope, $translate) {
        var vm = this;
        //$scope.user = "3233534";
        vm.username = GetCurrentUser();
        
        $scope.$watch(function ($rootScope) {
            return $rootScope.globals.currentUser;
        }, function () {
            if ($rootScope.globals.currentUser != undefined)
                vm.username = $rootScope.globals.currentUser.username;
            else vm.username = '';
        });
        //GetCurrentUser();

        function GetCurrentUser() {
            if ($rootScope.globals.currentUser != undefined) {
                return $rootScope.globals.currentUser.username;
            }
            
        }

        vm.changeLanguage = function (language) {
            $translate.use(language);
        }
    }
})();