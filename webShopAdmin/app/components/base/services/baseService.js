(function () {
    'use strict';

    angular.module('webShopAdmin').factory('BaseService', BaseService);

    BaseService.$inject = ['$http', '$rootScope', 'GlobalService'];

    function BaseService($http, $rootScope, GlobalService) {
        var service = {};

        service.GetAll = GetAll;
        service.GetByParameters = GetByParameters;
        service.Save = Save;
        service.GetByID = GetByID;
        service.Delete = Delete;
        service.DeleteAll = DeleteAll;

        return service;

        function GetAll(modelName, getName) {
            return $http.get(GlobalService.GetApiUrl() + 'api/' + modelName + '/' + getName + '/').then(function (response) {
                return response;
            }, function (response) {
                return response;
            });
        }

        function GetByParameters(modelName, action, parameters) {
            var parametersString = '';
            angular.forEach(parameters, function (value, key) {
                parametersString += value.name + '=' + value.value + '&';
            })
            parametersString = parametersString.substring(0, parametersString.length - 1);
            return $http.get(GlobalService.GetApiUrl() + 'api/' + modelName + '/' + action + (parametersString != '' ? ('?' + parametersString) : '')).then(function (response) {
                return response;
            }, function (response) {
                return response;
            });
        }

        function Save(modelName, item) {
            if(item.ID == -1){
                return $http.post(GlobalService.GetApiUrl() + 'api/' + modelName + '/POST/', item).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                })
            }
            else {
                return $http.put(GlobalService.GetApiUrl() + 'api/' + modelName + '/PUT/' + item.ID, item).then(function (response) {
                    return response;
                }, function (response) {
                    return response;
                })
            }
        }

        function GetByID(modelName, ID) {
            return $http.get(GlobalService.GetApiUrl() + 'api/' + modelName + '/GET/' + ID).then(function (response) {
                return response;
            }, function (response) {
                return response;
            })
        }

        function Delete(modelName, ID) {
            return $http.delete(GlobalService.GetApiUrl() + 'api/' + modelName + '/DELETE/' + ID).then(function (response) {
                return response;
            }, function (response) {
                return response;
            })
        }

        function DeleteAll(modelName, IDs) {
            return $http.post(GlobalService.GetApiUrl() + 'api/' + modelName + '/DELETEALL/', IDs).then(function (response) {
                return response;
            }, function (response) {
                return response;
            })
        }
    }
})();