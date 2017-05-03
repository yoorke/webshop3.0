(function () {
    'use strict';

    angular
        .module('webShopAdmin')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope', 'GlobalService'];
    function UserService($http, $rootScope, GlobalService) {
        var service = {};

        var apiUrl = GlobalService.GetApiUrl() + 'api/';

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetCurrentUser = GetCurrentUser;
        service.ChangePassword = ChangePassword;
        service.ForgotPassword = ForgotPassword;
        service.ResetPassword = ResetPassword;

        return service;

        function GetAll() {
            return $http.get(apiUrl + 'User/').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            return $http.get(apiUrl + 'User/' + user.ID).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get(apiUrl + 'User/GetByUsername?username=' + username).then(function (response) {
                return response;
            }, function (response) {
                return response;
            });
        }

        function GetCurrentUser() {
            return $http.get(apiUrl + 'Account/UserInfo').then(handleSuccess, handleError('Error getting current user'));
        }

        function Create(user) {
            //user.Firma_id = 1;
            user.Firma_id = user.Firma.ID;
            user.ConfirmPassword = user.Password;
            user.Email = user.Username
            return $http.post(apiUrl + 'Account/Register', user).then(function (response) {
                return response;
            }, function (response) {
                return response;
            });
        }

        function Update(user) {
            return $http.put(apiUrl + 'User/PUT/' + user.ID, user).then(function(response){
                return response;
            }, function (response) {
                return response;
            });
        }

        function Delete(id) {
            return $http.delete(apiUrl + 'User/DELETE/' + user.ID).then(handleSuccess, handleError('Error deleting user'));
        }

        function ChangePassword(user) {
            return $http.post(apiUrl + 'Account/ChangePassword', user).then(function (response) {
                return response;
            }, function (reponse) {
                return response;
            });
        }

        function ForgotPassword(forgotPasswordData, callback) {
            $http.post(apiUrl + 'Account/ForgotPassword', forgotPasswordData)
               .success(function (response) {
                   callback(response);
               }).error(function (response) {
                   callback(response);
               });
            //return $http.post(apiUrl + 'Account/ForgotPassword', forgotPasswordData).then(function(response) {
            //    return response;
            //}, function (reponse) {
            //    return response;
            //});
        }
        
        function ResetPassword(resetPasswordData, callback) {
            $http.post(apiUrl + 'Account/ResetPassword', resetPasswordData)
            .success(function (response) {
                callback(response);
            }).error(function (response) {
                callback(response);
            });
        }
        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
