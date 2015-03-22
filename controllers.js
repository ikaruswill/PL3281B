// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.service('psychService', function() {

    this.testConstants = {
        practiceMaxIterations: 5,
        standardMaxIterations: 12,
        breakDuration: 5, // 60

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
        colourAns: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        colourUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        letterAns: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        letterUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        }
    };

    this.test2Data = {
        colourAns: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        colourUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        letterAns: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        letterUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        }
    };

    this.test3Data = {
        colourAns: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        colourUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        letterAns: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        },
        letterUser: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
            10:[],
            11:[]
        }
    };

    // User data ends here

    this.testState = {
        iterationCount: -1, // -1 to include practice
        iterationType: 'standard', // practice
        trialCount: 0, // 0
        maxTrials: this.testConstants.practiceMaxIterations,
        displayCount: -1, // -1 to include exclamation
        tested: false,

        storeDest: {
            0: this.practiceData,
            1: this.test1Data,
            2: this.test2Data,
            3: this.test3Data
        },

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
        templateUrl: 'test.html'
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
    }).when('/endpractice', {
        controller: 'endPracticeController',
        controllerAs: 'endPracCon',
        templateUrl: 'endpractice.html'
    }).when('/break', {
        controller: 'breakController',
        controllerAs: 'breakCon',
        templateUrl: 'break.html'
    }).when('/thankyou', {
        controller: 'exportController',
        controllerAs: 'expCon',
        templateUrl: 'thankyou.html'
    })
}

mod.config(routeConfig);
/*
mod.controller('keyboardListener', ['$scope', function($scope) {
    $scope.keyCode = '';

    $scope.keyPress = function(event) {
        if(event.which === 32) {
            $scope.keyCode = event.which;
        }
    }
}]);
*/
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

mod.controller('practiceController', ['psychService', '$location', '$timeout', '$window', '$scope', '$document', function(psychService, $location, $timeout, $window, $scope, $document) {
    var vm = this;
    var svc = psychService;

    // View variables
    vm.currentColour = '';
    vm.currentLetter = '';

    // Redirects
    var testRedirect = function() {
        $location.path('/test');
    };

    var betweenRedirect = function() {
        stopSoundTimer();
        reinitAudioOccur();
        $location.path('/btw');
    };

    var scoresheetRedirect = function() {
        stopSoundTimer();
        reinitAudioOccur();
        $location.path('/scoresheet');
    };

    // Called by DOM element button
    this.scoreRedirect = function() {
        $location.path('/score');
    };

    // Reset test state
    this.resetTestState = function() {

        svc.testState.tested = false;
        svc.testState.displayCount = -1;
        for(var i = 0; i < Object.keys(svc.testState.colourPool).length; i++) {
            svc.testState.colourPool[i] = false;
            svc.testState.letterPool[i] = false;
        }
    };

    this.pauseRedirect = function() {
        this.resetTestState();

       // if($scope.keyCode == 32) {
            // End of trial
            if(svc.testState.trialCount < svc.testState.maxTrials) {
                $location.path('/pause');
            }
            // End of iteration
            else {
                svc.testState.iterationCount++;
                svc.testState.trialCount = 0;

                // Check if recent iteration is practice
                if(svc.testState.iterationType === 'practice') {

                    // Set variables to standard test
                    svc.testState.maxTrials = svc.testConstants.standardMaxIterations;
                    svc.testState.iterationType = 'standard';

                    // Redirect to end practice pseudo-break;
                    $location.path('/endpractice');
                } else {
                    if(svc.testState.iterationCount < 3) {
                        // Redirect to rest page
                        $location.path('/break');
                    } else {
                        $location.path('thankyou');
                    }
                }
            }
       // }
    };


    // Audio logic
    var audioElement;
    var audioTimer;
    var audioPath;
    var audioMap = {
        0: 'G.wav',
        1: 'L.wav',
        2: 'M.wav',
        3: 'R.wav'
    };
    var audioOccurrence = {
        0: false,
        1: false,
        2: false,
        3: false
    };

    var audioControl = function() {
        var audioNumber;

        do {
            audioNumber = Math.floor(Math.random() * 4);
        } while(audioOccurrence[audioNumber]);
        audioOccurrence[audioNumber] = true;

        audioPath = "audio/" + audioMap[audioNumber];
        audioElement.src = audioPath;
        audioElement.play();
        audioTimer = $timeout(audioControl, 450);
    };

    var stopSoundTimer = function() {
        $scope.$on('$destroy', function() {
            $timeout.cancel(audioTimer);
        });
    };

    var reinitAudioOccur = function() {
        for(var i = 0; i < 4; i++) {
            audioOccurrence[i] = false;
        }
    };

    var randomColour;
    var randomLetter;
    var timer;
    var storageDest = svc.testState.storeDest[svc.testState.iterationCount + 1];

    var runLogic = function() {
        // Decommission logic timer
        $scope.$on('$destroy', function() {
            $timeout.cancel(logicTimer);
        });

        // Display exclamation mark
        if(svc.testState.displayCount === -1) {
            vm.currentLetter = '!';
            svc.testState.displayCount++;
            timer = $timeout(testRedirect, 1000);
        }
        // Prevent scoresheet from entering logic block
        else if(svc.testState.displayCount < 7) {
            if(!svc.testState.tested) {
                // Start audio
                audioElement = $document[0].createElement('audio');
                audioTimer = $timeout(audioControl, 500);

                // Set variables for next view
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
                storageDest.letterAns[svc.testState.trialCount].push(vm.currentLetter);
                storageDest.colourAns[svc.testState.trialCount].push(vm.currentColour);

                // Update available sets
                svc.testState.colourPool[randomColour] = true;
                svc.testState.letterPool[randomLetter] = true;

                // Check if it is the last display
                if(svc.testState.displayCount != 7) {
                    timer = $timeout(betweenRedirect, 1000);
                }
                // Redirect to score sheet
                else {
                    svc.testState.trialCount++;
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

mod.controller('endPracticeController',['$location', function($location) {

    this.standardPauseRedirect = function() {
        $location.path('/pause');
    }
}]);

mod.controller('breakController', ['psychService', '$location', '$timeout', function(psychService, $location, $timeout) {
    var vm = this;
    var svc = psychService;
    vm.counter = svc.testConstants.breakDuration;

    vm.pauseRedirect = function() {
        vm.stop();
        $location.path('/pause');
    };

    var decrementCounter = function() {
        vm.counter--;
        if(vm.counter !== 0) {
            timer = $timeout(decrementCounter, 1000)
        } else {
            vm.pauseRedirect();
        }
    };

    var timer = $timeout(decrementCounter, 1000);

    vm.stop = function() {
      $timeout.cancel(timer);
    };

}]);

mod.controller('exportController', ['psychService', function(psychService) {

}]);