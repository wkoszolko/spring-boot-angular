(function(angular) {
    var AppController = function($scope, RR) {
        RR.query(function(response) {
            $scope.rrs = response ? response : [];
        });

        $scope.save = function(newRR) {
            var today = new Date();
            new RR({
                systolic: newRR.systolic,
                diastolic: newRR.diastolic,
                hr: newRR.hr,
                date: buildDateString(today)
            }).save(function(rr) {
                    $scope.rrs.push(rr);
                    newRR = {
                        systolic: null,
                        diastolic: null,
                        hr: null
                    };
            });
        };

        function buildDateString(date) {
            //create date string in yyyy-mm-dd format
            //months are 0-based
            var day = date.getDate()<10 ? '0' + date.getDate() : date.getDate();
            var month = date.getMonth()<9 ? '0' + (date.getMonth()+1) : (date.getMonth()+1);
            var year = date.getFullYear();
            return year + '-' + month + '-' + day;
        }
    };

    AppController.$inject = ['$scope', 'RR'];
    angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));