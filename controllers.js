// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.factory('psychService', function() {
    var sessionNo = '';
    var testType = '';

    return {};
});


//Set up mappings
function routeConfig($routeProvider) {
    $routeProvider.when('/', {
        controller: 'sessionFormController',
        templateUrl: 'session-request.html'
    }).when('/ins-1', {
        controller: 'pageController',
        templateUrl: 'ins-common.html'
    })
}

mod.config(routeConfig);

mod.controller('sessionFormController', ['psychService', '$location', function(psychService, $location){
        var vm = this;
        var svc = psychService;
        vm.sessionNoInput = '';
        svc.sessionNo = '';
        svc.testType = '';

        vm.testType1 = '';

        vm.parseSessionNoInput = function() {
            if(svc.sessionNo % 2 == 0) {
                svc.testType = 'colour';
                vm.testType1 = svc.testType;
            } else {
                svc.testType = 'order';
            }
            $location.path('/ins-1');
        }

    }]
);

mod.controller('pageController', ['psychService', '$location', function(psychService, $location) {

}]);