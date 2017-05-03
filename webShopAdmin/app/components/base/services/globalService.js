(function () {
    'use strict';

    angular.module('webShopAdmin').factory('GlobalService', GlobalService);

    GlobalService.$inject = ['$rootScope', '$http'];

    function GlobalService($rootScope, $http) {
        var _showLoader = false;
        var _savedItem = false;
        var _currentUser = null;
        var _root = '/';
        var _apiUrl = 'http://localhost:45969/';
        var _showMenu = true;
        var _modelsParameters;        
        var _userAuthenticated = false;

        return {
            GetLoaderStatus: function () {
                return _showLoader;
            },
            SetLoaderStatus: function(status){
                _showLoader = status;
            },
            GetSavedItemStatus: function () {
                return _savedItem;
            },
            SetSavedItemStatus: function(status){
                _savedItem = status;
            },
            GetMenuStatus: function(){
                return _showMenu;
            },
            SetMenuStatus: function(status){
                _showMenu = status;
            },
            GetCurrentUser: function () {
                return _currentUser;
            },
            SetCurrentUser: function (currentUser) {
                if (currentUser != null) {
                    _currentUser = {};
                    _currentUser.username = currentUser.username;
                    _currentUser.authdata = currentUser.authdata;
                    _currentUser.access_token = currentUser.access_token;
                    _currentUser.userID = currentUser.userID;
                    _userAuthenticated = true;
                    _currentUser.roleID = currentUser.roleID;
                    _currentUser.firstName = currentUser.firstName;
                    _currentUser.lastName = currentUser.lastName;
                }
                else
                    _currentUser = null;
            },
            SetCurrentUserID: function (currentUserID) {
                if (_currentUser == null)
                    _currentUser = {};
                _currentUser.userID = currentUserID;
            },
            SetCurrentRoleID: function (currentRoleID) {
                if (_currentUser == null)
                    _currentUser = {};
                _currentUser.roleID = currentRoleID;
            },
            
            SetCurrentUserLastFirstName: function (firstName, lastName) {
                    if (_currentUser == null)
                        _currentUser = {};
                    _currentUser.firstName = firstName;
                    _currentUser.lastName = lastName;
                },

            GetRoot: function () {
                return _root;
            },
            GetApiUrl: function () {
                return _apiUrl;
            },
            LoadModelsParameters: function (modelsParametersFile) {
                $http.get(modelsParametersFile).then(function (response) {
                    _modelsParameters = response.data;
                });
            },

            GetModelsParameters: function() {
                return _modelsParameters;
            },
            IsUserAuthenticated: function () {
                return _userAuthenticated;
            },
            SetIsUserAuthenticated: function (isAuthenticated) {
                _userAuthenticated = isAuthenticated;
            }            
        }

        
       
    }
})();