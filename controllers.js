// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.service('psychService', function() {

    this.testConstants = {
        colourMap: {
            0: '#ffff00', // Yellow
            1: '#bfbfbf', // Brown
            2: '#ff0000', // Red
            3: '#604a7b', // Purple
            4: '#558ed5', // Blue
            5: '#00b050', // Green
            6: '#bfbfbf' // Grey
        },

        letterMap: {
            0: 'B',
            1: 'H',
            2: 'J',
            3: 'Q',
            4: 'V',
            5: 'X',
            6: 'Z'
        }
    };

    this.testState = {
        tested: false,
        iterationCount: 0,

        colourPool: {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        },

        letterPool: {
            0: false,
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false
        }
    };

    // User data begins here

    this.sessionParams = {
        sessionNo: 'NIL',
        testType: 'NIL'
    };

    this.practiceData = {
        trialCount: 0,
        displayCount: -1,
        colour: [],
        colourUser: [],
        letter: [],
        letterUser: []
    };

    this.test1Data = {

    };

    this.test2Data = {

    };

    this.test3Data = {

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
        controller: 'prePracticeController',
        controllerAs: 'prePracCon',
        templateUrl: 'ins-order.html'
    }).when('/ins-colour', {
        controller: 'prePracticeController',
        controllerAs: 'prePracCon',
        templateUrl: 'ins-colour.html'
    }).when('/start', {
        controller: 'practiceController',
        controllerAs: 'oCon',
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

mod.controller('prePracticeController', ['psychService', '$location', function(psychService, $location) {
    var vm = this;
    var svc = psychService;

    vm.beginPractice = function() {
        svc.practiceData.displayCount++;
        $location.path('/practice/start');
    }
}]);

mod.controller('practiceController', ['psychService', '$location', '$timeout', '$scope', function(psychService, $location, $timeout, $scope) {
    var svc = psychService;

    var startRedirect = function() {
        $location.path('/start');
    };

    var testRedirect = function() {
        var random = Math.floor(Math.random() * 7);
        $location.path('/' + random);
    };

    var betweenRedirect = function() {
        $location.path('/btw');
    };

    var timer;

    // timeout 0ms execute logic.
    if(svc.practiceData.displayCount == -1) {
        svc.practiceData.displayCount++;
        startRedirect();
    } else {
        if(!psychService.tested) {
            svc.testState.tested = true;
            svc.practiceData.displayCount++;
            timer = $timeout(testRedirect, 1000);
        } else {
            svc.testState.tested = false;
            timer = $timeout(betweenRedirect, 500);
        }

        $scope.$on('$destroy', function() {
            $timeout.cancel(timer);
        })
    }


}]);

