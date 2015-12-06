(function(angular) {
    angular.module("myApp.controllers", []);
    angular.module("myApp.services", []);
    var app = angular.module("myApp", ["ngResource", "ngMessages", "spring-data-rest", "myApp.controllers", "myApp.services"]);

    app.config(["$httpProvider", function ($httpProvider) {
        $httpProvider.defaults.transformResponse.push(function(responseData){
            convertDateStringsToDates(responseData);
            return responseData;
        });
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
}(angular));