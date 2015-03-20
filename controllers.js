// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.service('psychService', function() {
    this.sessionNo = '';
    this.testType = '';
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
            if(vm.sessionNoInput % 2 == 0) {
                svc.testType = 'colour';
                vm.testType1 = svc.testType;
            } else {
                svc.testType = 'order';
                vm.testType1 = svc.testType;
            }
            $location.path('/ins-1');
        }

    }]
);

mod.controller('pageController', ['psychService', '$location', function(psychService, $location) {

}]);