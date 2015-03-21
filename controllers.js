// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.service('psychService', function() {

    this.testConstants = {
        colourMap: {
            0: '#ffff00', // Yellow
            1: '#e46c0a', // Brown
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
        trialCount: 4,
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
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        colourUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        letterAns: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        letterUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        }
    };

    this.test1Data = {

    };

    this.test2Data = {

    };

    this.test3Data = {

    };

});


//Set up route mappings
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
    }).when('/test', {
        controller: 'practiceController',
        controllerAs: 'pracCon',
        templateUrl: 'test.html'
    }).when('/btw', {
        controller: 'practiceController',
        controllerAs: 'pracCon',
        templateUrl: 'test.html'
    }).when('/scoresheet', {
        controller: 'practiceController',
        controllerAs: 'pracCon',
        templateUrl: 'scoresheet.html'
    }).when('/score', {
        controller: 'practiceController',
        controllerAs: 'pracCon',
        templateUrl: 'score.html'
    })
}

mod.config(routeConfig);

mod.controller('keyboardListener', ['$scope', function($scope) {
    $scope.keyCode = '';

    $scope.keyPress = function(event) {
        if(event.which === 32) {
            $scope.keyCode = event.which;
        }
    }
}]);

mod.controller('sessionInitController', ['psychService', '$location', function(psychService, $location){
        var vm = this;
        var sessionParams = psychService.sessionParams;
        vm.sessionNoInput = '';

        vm.parseSessionNoInput = function() {
            if(vm.sessionNoInput % 2 === 1) {
                sessionParams.testType = 'order';
            } else if(vm.sessionNoInput % 2 === 0){
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

mod.controller('practiceController', ['psychService', '$location', '$timeout', '$window', '$scope', function(psychService, $location, $timeout, $window, $scope) {
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

    var scoresheetRedirect = function() {
        $location.path('/scoresheet');
    };

    // Called by DOM element button
    this.scoreRedirect = function() {
        $location.path('/score');
    };

    // Watch keypresses
    //$scope.$watch($scope.keyCode, this.pauseRedirect);

    this.pauseRedirect = function() {
       // if($scope.keyCode == 32) {
            if(svc.testState.trialCount < 5) {
                svc.testState.trialCount++;

                // Reset test variables
                svc.testState.tested = false;
                svc.testState.displayCount = -1;
                for(var i = 0; i < Object.keys(svc.testState.colourPool).length; i++) {
                    svc.testState.colourPool[i] = false;
                    svc.testState.letterPool[i] = false;
                    }

                $location.path('/pause');
            } else {
                // Redirect to rest page
            }
       // }
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
        } else if(svc.testState.displayCount < 7){
            if(!svc.testState.tested) {
                svc.testState.tested = true;
                svc.testState.displayCount++;

                // Generate random numbers for colour and letter
                // While number has occurred in testState keep generating
                do {
                    randomLetter = Math.floor(Math.random() * 7);
                } while(svc.testState.letterPool[randomLetter]);
                do {
                    randomColour = Math.floor(Math.random() * 7);
                } while(svc.testState.colourPool[randomColour]);

                // Update view
                vm.currentLetter = svc.testConstants.letterMap[randomLetter];
                vm.currentColour = svc.testConstants.colourMap[randomColour];

                // Update test answers
                svc.practiceData.letterAns[svc.testState.trialCount].push(vm.currentLetter);
                svc.practiceData.colourAns[svc.testState.trialCount].push(vm.currentColour);

                // Update available sets
                svc.testState.colourPool[randomColour] = true;
                svc.testState.letterPool[randomLetter] = true;

                // Check if it is the last display
                if(svc.testState.displayCount != 7) {
                    timer = $timeout(betweenRedirect, 1000);
                }
                // Redirect to score sheet
                else {
                    timer = $timeout(scoresheetRedirect, 1000);
                }

            } else {
                vm.currentLetter = '+';
                svc.testState.tested = false;
                timer = $timeout(testRedirect, 500);
            }

            $scope.$on('$destroy', function() {
                $timeout.cancel(timer);
            });
        }
    };

    var logicTimer = $timeout(runLogic, 0);
}]);

