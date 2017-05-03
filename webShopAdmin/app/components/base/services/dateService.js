(function () {
    'use strict';

    angular.module('webShopAdmin').factory('DateService', DateService);

    DateService.$inject = [];

    function DateService() {
        var service = {};

        service.DayDifference = DayDifference;

        return service;

        function DayDifference(startDate, endDate, absolute) {
            var timeDifference = (new Date(endDate.toString())).getTime() - (new Date(startDate.toString())).getTime();
            if (absolute)
                timeDifference = Math.abs(timeDifference);
            return Math.ceil(timeDifference / (1000 * 3600 * 24));
        }
    }
})();