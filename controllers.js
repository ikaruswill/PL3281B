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
        displayCount: 0,
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
    }).when('/practice/start', {
        controller: 'startController',
        controllerAs: 'oCon',
        templateUrl: 'start.html'
    }).when('/1', {
        controller: 'testController,',
        controllerAs: 'tCon',
        templateUrl: ''
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

    vm.beginPractice = function() {
        $location.path('/practice/start');
    }
}]);

mod.controller('timerController', ['psychService', '$location', '$timeout', '$scope', function(psychService, $location, $timeout, $scope) {
    var testRedirect = function() {
        psychService.tested = true;
        var random = Math.floor(Math.random() * 7);
        $location.path('/' + random);
    };

    var betweenRedirect = function() {
        psychService.tested = false;
        $location.path('/btw');
    }

    if(!psychService.tested) {
        var timer = $timeout(testRedirect, 1000);
    } else {
        var timer = $timeout(betweenRedirect, 500);
    }


    $scope.$on('$destroy', function() {
        $timeout.cancel(timer);
    })
}]);

