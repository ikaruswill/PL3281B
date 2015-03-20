// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.factory('psychService', function() {
    var sessionParams = {
        sessionNo: '0',
        testType: 'NULL'
    }

    return {
        getSessionParams: function() {
            return sessionParams;
        }
    }
});


//Set up mappings
function routeConfig($routeProvider) {
    $routeProvider.when('/', {
        controller: 'sessionFormController',
        controllerAs: 'formCon',
        templateUrl: 'session-request.html'
    }).when('/ins-common', {
        controller: 'sessionFormController',
        controllerAs: 'formCon',
        templateUrl: 'ins-common.html'
    }).when('/ins-colour', {
        templateUrl: 'ins-colour.html'
    }).when('/ins-order', {
        templateUrl: 'ins-order.html'
    })
}

mod.config(routeConfig);

mod.controller('sessionFormController', ['psychService', '$location', function(psychService, $location){
        var vm = this;
        var sessionParams = psychService.getSessionParams();
        vm.sessionNoInput = '';

        vm.parseSessionNoInput = function() {
            if(vm.sessionNoInput % 2 == 0) {
                sessionParams.testType = 'colour';
            } else if(vm.sessionNoInput % 2 != 0){
                sessionParams.testType = 'order';
            }
            sessionParams.sessionNo = vm.sessionNoInput;
            $location.path('/ins-common');
        };

        vm.divergeInsRedirect = function() {
            if(sessionParams.testType == 'colour') {
                $location.path('/ins-colour');
            } else if(sessionParams.testType == 'order'){
                $location.path('/ins-order');
            }
        }
    }]
);

mod.controller('commonDivergeController', ['psychService', '$location', function(psychService, $location) {
    var vm = this;

}]);