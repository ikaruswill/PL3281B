// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.service('psychService', function() {

    this.sessionParams = {
        sessionNo: 'NIL',
        testType: 'NIL'
    };



});


//Set up mappings
function routeConfig($routeProvider) {
    $routeProvider.when('/', {
        controller: 'sessionInitController',
        controllerAs: 'initCon',
        templateUrl: 'session-request.html'
    }).when('/ins-common', {
        controller: 'sessionInitController',
        controllerAs: 'initCon',
        templateUrl: 'ins-common.html'
    }).when('/ins-order', {
        controller: 'orderController',
        controllerAs: 'oCon',
        templateUrl: 'ins-order.html'
    }).when('/ins-colour', {
        controller: 'colourController',
        controllerAs: 'cCon',
        templateUrl: 'ins-colour.html'
    }).when('/order/practice/start', {
        controller: 'startController',
        controllerAs: 'oCon',
        templateUrl: 'start.html'
    }).when('/colour/practice/start', {
        controller: 'startController',
        controllerAs: 'cCon',
        templateUrl: 'start.html'
    })
}

mod.config(routeConfig);

mod.controller('sessionInitController', ['psychService', '$location', function(psychService, $location){
        var vm = this;
        var sessionParams = psychService.sessionParams;
        vm.sessionNoInput = '';

        vm.parseSessionNoInput = function() {
            if(vm.sessionNoInput % 2 == 1) {
                sessionParams.testType = 'order';
            } else if(vm.sessionNoInput % 2 == 0){
                sessionParams.testType = 'colour';
            }
            sessionParams.sessionNo = vm.sessionNoInput;
            $location.path('/ins-common');
        };

        vm.divergeInsRedirect = function() {
            if(sessionParams.testType == 'order'){
                $location.path('/ins-order');
            }else if(sessionParams.testType == 'colour') {
                $location.path('/ins-colour');
            }
        }
    }]
);

mod.controller('startController', ['psychService','$location', '$timeout', '$scope', function(psychService, $location, $timeout, $scope) {
    var testType = psychService.sessionParams.testType;
    var redirect = function() {
        if(testType == 'colour') {
            $location.path('/colour/practice/1');
        } else if(testType == 'order') {
            $location.path('/order/practice/1');
        }
    };
    var timer = $timeout(redirect, 1000);

    $scope.$on('$destroy', function() {
        $timeout.cancel(timer);
    })
}]);

mod.controller('orderController', ['psychService', '$location', function(psychService, $location) {
    var vm = this;

    vm.beginPractice = function() {
        $location.path('/order/practice/start');
    }

}]);

mod.controller('colourController', ['psychService', '$location', function(psychService, $location) {
    var vm = this;

    vm.beginPractice = function() {
        $location.path('/colour/practice/start');
    }
}]);