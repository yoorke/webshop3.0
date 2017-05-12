(function () {
    'use strict';

    angular.module('webShopAdmin').controller('CommonFunctionsController', CommonFunctionsController);

    CommonFunctionsController.$inject = ['vm'];

    function CommonFunctionsController(vm) {
        vm.CreateFriendlyUrl = CreateFriendlyUrl;
        vm.Redirect = Redirect;

        function CreateFriendlyUrl(url) {
            var friendlyUrl = url.toLowerCase();
            var input = ['š', 'ć', 'č', 'ž', 'đ'];
            var replace = ['s', 'c', 'c', 'z', 'dj'];

            angular.forEach(input, function (value, key) {
                friendlyUrl = friendlyUrl.replace(new RegExp(value, 'g'), replace[key]);
            })

            friendlyUrl = friendlyUrl.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '-').replace(/^-+|-+$/g, '');
            return friendlyUrl;
        }

        function Redirect(url) {
            $location.url(url);
        }
    }
})();