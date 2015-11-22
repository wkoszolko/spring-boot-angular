(function(angular) {
    var HATEOAS_URL = './rr';
    var RRFactory = function($http, SpringDataRestAdapter) {
        function RR(rr) {

            if (rr._resources) {
                rr.resources = rr._resources("self", {}, {
                    update: {
                        method: 'PUT'
                    }
                });
                rr.save = function(callback) {
                    rr.resources.update(rr, function() {
                        callback && callback(rr);
                    });
                };

                rr.remove = function(callback) {
                    rr.resources.remove(function() {
                        callback && callback(rr);
                    });
                };
            } else {
                rr.save = function(callback) {
                    RR.resources.save(rr, function(item, headers) {
                        var deferred = $http.get(headers().location);
                        return SpringDataRestAdapter.process(deferred).then(function(newRR) {
                            callback && callback(new RR(newRR));
                        });
                    });
                };
            }

            return rr;
        }

        RR.query = function(callback) {
            var deferred = $http.get(HATEOAS_URL);
            return SpringDataRestAdapter.process(deferred).then(function(data) {
                RR.resources = data._resources("self");
                callback && callback(_.map(data._embeddedItems, function(rr) {
                    return new RR(rr);
                }));
            });
        };

        RR.resources = null;

        return RR;
    };

    RRFactory.$inject = ['$http', 'SpringDataRestAdapter'];
    angular.module("myApp.services").factory("RR", RRFactory);
}(angular));