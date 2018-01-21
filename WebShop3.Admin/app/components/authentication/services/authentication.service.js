(function () {
    'use strict';

    angular
        .module('webShopAdmin')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService', 'GlobalService'];
    function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService, GlobalService) {
        var service = {};

        var apiUrl = GlobalService.GetApiUrl();

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

            /* Dummy authentication for testing, uses $timeout to simulate api call
             ----------------------------------------------*/
            //$timeout(function () {
                //var response;
                //UserService.GetByUsername(username)
                    //.then(function (user) {
                        //if (user !== null && user.password === password) {
                            //response = { success: true };
                        //} else {
                            //response = { success: false, message: 'Username or password is incorrect' };
                        //}
                        //callback(response);
                    //});
            //}, 1000);

            /* Use this for real authentication
             ----------------------------------------------*/
            var data = "grant_type=password&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
            $http.post(apiUrl + 'Token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
                .success(function (response) {
                    callback(response);
                }).error(function (response) {
                    callback(response);
                });

        }

        

        function SetCredentials(username, password, access_token) {
            var authdata = Base64.encode(username + ':' + password);

            //var user = {};
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + access_token; // jshint ignore:line
            UserService.GetByUsername(username).then(function (response) {
                var user = response.data;
                //$rootScope.globals.currentUser.role = user.UserRole.Name;
                //$rootScope.globals.currentUser.roleID = user.UserRole.ID;
                //$rootScope.globals.currentUser.odeljenjeID = user.Odeljenje.ID;
                GlobalService.SetCurrentUserID(user.ID);
                GlobalService.SetCurrentUserLastFirstName(user.FirstName, user.LastName);
                //GlobalService.SetCurrentUserAndRoleID(user);
                GlobalService.SetCurrentRoleID(user.UserRole.ID);
                //$cookieStore.put('globals', $rootScope.globals);
                $cookieStore.put('currentUser', GlobalService.GetCurrentUser());
            });
                
            GlobalService.SetCurrentUser({ username: username, authdata: authdata, access_token: access_token });
            //$cookieStore.put('currentUser', GlobalService.GetCurrentUser());
            
            //GlobalService = {
                //CurrentUser: {
                    //username: username,
                    //authdata: authdata,
                    //access_token: access_token,
                    //userID: user.ID
                //},
                //ShowMenu: GlobalService.ShowMenu,
                //ShowLoader: GlobalService.ShowLoader
            //};
            

            //$http.defaults.headers.common['Authorization'] = 'Bearer ' + access_token; // jshint ignore:line
            //$cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials(callback) {
            if(GlobalService.GetCurrentUser() != null){
            $http.post(apiUrl + '/api/Account/Logout').success(function (response) {
                callback(response);
            GlobalService.SetCurrentUser(null);
            $cookieStore.remove('currentUser');
            $http.defaults.headers.common.Authorization = 'Basic';
            GlobalService.SetIsUserAuthenticated(false);
            })
            }
        }
    }

    // Base64 encoding service used by AuthenticationService
    var Base64 = {

        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

})();