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

mod.controller('sessionFormController', ['psychService', function(psychService){
        var vm = this;
        var svc = psychService;
        svc.sessionNo = '';
        svc.testType = '';

        var testType1 = '';

        vm.parseSessionNoInput = function() {
            if(svc.sessionNo % 2 == 0) {
                svc.testType = 'colour';
            } else {
                svc.testType = 'order';
            }
        }

    }]
);

mod.controller('pageController', function() {

});