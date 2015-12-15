(function(angular) {
    var AppController = function($scope, RR) {
        RR.query(function(response) {
            $scope.rrs = response ? response : [];
        });

        $scope.save = function(newRR) {
            new RR({
                systolic: newRR.systolic,
                diastolic: newRR.diastolic,
                hr: newRR.hr,
                date: new Date()
            }).save(function(rr) {
                    $scope.rrs.push(rr);
                    newRR = {
                        systolic: null,
                        diastolic: null,
                        hr: null
                    };
            });
        };
    };

    AppController.$inject = ['$scope', 'RR'];
    angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));