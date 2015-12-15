(function(angular) {
    angular.module("myApp.controllers", []);
    angular.module("myApp.services", []);
    var app = angular.module("myApp", ["ngResource", "ngMessages", "spring-data-rest", "myApp.controllers", "myApp.services"]);

    app.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.transformResponse.push(function(responseData){
            convertDateStringsToDates(responseData);
            return responseData;
        });
        $httpProvider.defaults.transformRequest = [function(requestData){
            convertDatesToDateStrings(requestData);
            return requestData;
        }].concat($httpProvider.defaults.transformRequest);
    }]);

    var regexDate = /^(\d{4}-\d{2}-\d{2})$/;

    function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object") return input;

        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            var value = input[key];
            var match;
            if (typeof value === "string" && (match = value.match(regexDate))) {
                // parse a date in yyyy-mm-dd format
                var parts = match[0].split('-');
                // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
                input[key] = new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
            } else if (typeof value === "object") {
                // Recurse into object
                convertDateStringsToDates(value);
            }
        }
    }

    function convertDatesToDateStrings(input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object") return input;

        for (var key in input) {
            if (!input.hasOwnProperty(key)) continue;

            var value = input[key];
            if (Object.prototype.toString.call(value) === "[object Date]") {
                input[key] = buildDateString(value);
            } else if (typeof value === "object") {
                convertDatesToDateStrings(value);
            }
        }
    }

    function buildDateString(date) {
        //create date string in yyyy-mm-dd format
        //months are 0-based
        var day = date.getDate()<10 ? '0' + date.getDate() : date.getDate();
        var month = date.getMonth()<9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
        var year = date.getFullYear();
        return year + '-' + month + '-' + day;
    }
}(angular));