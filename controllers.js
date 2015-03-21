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
        trialCount: 0,
        displayCount: -1,

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
        colourAns: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        },
        colourUser: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        },
        letterAns: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        },
        letterUser: {
            1: [],
            2: [],
            3: [],
            4: [],
            5: []
        }
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
    }).when('/pause', {
        controller: 'practiceController',
        controllerAs: 'pracCon',
        templateUrl: 'pause.html'
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
        $location.path('/pause');
    }
}]);

mod.controller('practiceController', ['psychService', '$location', '$timeout', '$scope', function(psychService, $location, $timeout, $scope) {
    var vm = this;
    var svc = psychService;
    var randomColour;
    var randomLetter;


    // View variables
    vm.currentColour = '';
    vm.currentLetter = '';

    // Redirects
    var testRedirect = function() {
        $location.path('/test');
    };

    var betweenRedirect = function() {
        $location.path('/btw');
    };

    var timer;

    var runLogic = function() {
        // Decommission logic timer
        $scope.$on('$destroy', function() {
            $timeout.cancel(logicTimer);
        });

        if(svc.testState.displayCount == -1) {
            svc.testState.displayCount++;
            timer = $timeout(testRedirect, 1000);
        } else if(svc.testState.displayCount < 5){
            if(!psychService.tested) {
                svc.testState.tested = true;
                svc.testState.displayCount++;

                // Generate random numbers for colour and letter
                // While number has occurred in testState keep generating
                do {
                    randomLetter = Math.floor(Math.random() * 7);
                } while(svc.letterPool[randomLetter]);
                do {
                    randomColour = Math.floor(Math.random() * 7);
                } while(svc.colourPool[randomColour]);

                // Update view
                vm.currentLetter = svc.testConstants.letterMap[randomLetter];
                vm.currentColour = svc.testConstants.colourMap[randomColour];

                // Update test answers
                svc.practiceData.letterAns[svc.testState.trialCount].push(vm.currentLetter);
                svc.practiceData.colourAns[svc.testState.trialCount].push(vm.currentColour);

                // Update available sets
                svc.colourPool[randomColour] = true;
                svc.letterPool[randomLetter] = true;

                // Reset test state every trial

                timer = $timeout(betweenRedirect, 1000);
            } else {
                vm.currentLetter = '+';
                svc.testState.tested = false;
                timer = $timeout(testRedirect, 500);
            }

            $scope.$on('$destroy', function() {
                $timeout.cancel(timer);
            })
        }
        // Trial is over
        else {
            if(svc.testState.trialCount < 5) {
                svc.testState.trialCount++;

                // Reset test variables
                svc.testState.tested = false;
                svc.testState.displayCount = -1;
                for(var i = 0; i < svc.testState.colourPool.length; i++) {
                    svc.testState.colourPool[i] = false;
                    svc.testState.letterPool[i] = false;
                }


            }

            // Redirect to score sheet // // Compute score
            else {

            }




        }
    };

    var logicTimer = $timeout(runLogic, 0);
}]);

