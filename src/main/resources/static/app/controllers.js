(function(angular) {
    var AppController = function($scope, RR) {
        RR.query(function(response) {
            $scope.rrs = response ? response : [];
        });

    };

    AppController.$inject = ['$scope', 'RR'];
    angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));