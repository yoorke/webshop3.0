(function () {
    'use strict';

    angular.module('webShopAdmin').controller('BaseGetController', BaseGetController);

    BaseGetController.$inject = ['vm', 'GlobalService', 'BaseService', 'Flash', '$translate', '$confirm'];

    function BaseGetController(vm, GlobalService, BaseService, Flash, $translate, $confirm) {

        vm.BaseGetItems = BaseGetItems;
        vm.SortByID = SortByID;
        vm.sort = sort;
        //vm.GetItemByID = GetItemByID;
        //vm.SaveItem = SaveItem;
        //vm.DeleteItem = DeleteItem;

        vm.loading = false;


        //GetItems
        function BaseGetItems(modelName, getName, parameters, onInit) {
            vm.loading = true;
            GlobalService.SetLoaderStatus(true);
            baseGet(modelName, getName, parameters).then(function (response) {
                if (response.status == 200) {
                    vm.items = response.data;
                    getParentItems(onInit);
                    GlobalService.SetLoaderStatus(false);
                    vm.loading = false;
                    sort(vm.sortBy, '', false);
                    vm.reverse = vm.sortByReverse;
                }
                else {
                    Flash.create('danger', response.statusText != '' ? response.statusText : 'Error');
                }
            });
        }

        function baseGet(modelName, getName, parameters) {
            if (parameters.length > 0) {
                return BaseService.GetByParameters(modelName, getName, parameters);
            }
            else {
                return BaseService.GetAll(modelName, getName);
            }

        }

        function getParentItems(onInit) {
            var i = 0;
            if (vm.parentModelName.length > 0) {
                angular.forEach(vm.parentModelName, function (parentModelValue, parentModelKey) {
                    vm.parentItems = [];
                    angular.forEach(vm.items, function (value, key) {
                        if (parentModelValue.ModelName.indexOf('.') == -1) {
                            if (this.indexOf(value[parentModelValue.ModelName]) == -1)
                                this.pushIfNotExists(value[parentModelValue.ModelName], function (e) {
                                    return e[vm.parentModelCompare] === value[parentModelValue.ModelName][vm.parentModelCompare];
                                });
                        }
                        else {
                            var object = getObject(value, parentModelValue.ModelName);
                            if (object != null && this.indexOf(object) == -1)
                                this.pushIfNotExists(object, function (e) {
                                    return e[vm.parentModelCompare] === object[vm.parentModelCompare];
                                });
                        }
                    }, vm.parentItems);
                    if (onInit)
                        vm.parentArray.push(vm.parentItems);
                    else
                        vm.parentArray[i++] = vm.parentItems;
                });
            }
        }

        Array.prototype.inArray = function (comparer) {
            for (var i = 0; i < this.length; i++)
                if (comparer(this[i])) return true;
            return false;
        }

        Array.prototype.pushIfNotExists = function (element, comparer) {
            if (!this.inArray(comparer))
                this.push(element);
        }

        function getObject(value, modelName) {
            var modelArray = modelName.split('.');
            var object = value;
            var createObject = true;
            angular.forEach(modelArray, function (item, key) {
                if (createObject) {
                    if (item.indexOf('[') > -1) {
                        if (object[item.substring(0, item.indexOf('['))] != null) {
                            object = object[item.substring(0, item.indexOf('['))][item.substring(item.indexOf('[') + 1, item.indexOf(']'))];
                        }
                        else {
                            createObject = false;
                            object = null;
                        }
                    }
                    else
                        object = object[item];
                }
            });
            return object;
        }        

        function sort(keyname, name, revert) {
            vm.sortKey = keyname;
            if (revert) vm.reverse = !vm.reverse;
            vm.sortName = name;
        }

        function SortByID() {
            sort('ID', '', false);
            vm.reverse = true;
        }
    }
})();