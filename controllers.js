// Create module for the experiment
var mod = angular.module('psych', ['ngRoute']);

mod.service('psychService', function() {

    this.testConstants = {
        practiceMaxTrials: 5,
        standardMaxTrials: 12,
        maxDisplays: 7,
        displayDuration: 1000, //1000 (ms)
        betweenDuration: 500, // 500 (ms)
        breakDuration: 5, // 60 (s)


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
        colourShown: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        colourPicked: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        letterShown: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        letterPicked: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        }
    };

    this.test1Data = {
        colourShown: {
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
        colourPicked: {
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
        letterShown: {
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
        letterPicked: {
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
        colourShown: {
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
        colourPicked: {
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
        letterShown: {
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
        letterPicked: {
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
        colourShown: {
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
        colourPicked: {
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
        letterShown: {
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
        letterPicked: {
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
        iterationType: 'practice', // practice
        trialCount: 0, // 0
        maxTrials: this.testConstants.practiceMaxTrials,
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

mod.service('audioService', ['psychService', '$timeout', '$document', '$window', function(psychService, $timeout, $document, $window) {
    var svc = psychService;
    var vm = this;
    vm.audioDuration = 500; // 500 (ms)
    vm.audioFileCount = 4;
    var audioElement = $document[0].createElement('audio');

    vm.quietPlaying = false;

    vm.heteroPlaying = false;
    vm.heteroAudioSequence = [];
    var currentHeteroSequenceIndex = 0;

    vm.homoPlaying = false;
    var prevHomoAudio = -1; // -1
    var currentHomoFile;

    vm.audioType = 0; // 0

    var homoTimer;
    var heteroTimer;

    var audioPathMap = {
        0: 'audio/G.wav',
        1: 'audio/L.wav',
        2: 'audio/M.wav',
        3: 'audio/R.wav'
    };

    vm.audioTypePool = {
        0: true, // No sound (Quiet sound)
        1: false, // 1 sound (Homo sound)
        2: false // 2 sounds (Hetero sound)
    };


    // Generate random audio type
    vm.getRandomAudioType = function() {
        var randomAudioType;
        do {
            randomAudioType = Math.floor(Math.random() * 3);
        } while (vm.audioTypePool[randomAudioType]);
        vm.audioTypePool = true;
        vm.audioType = randomAudioType;
    };

    // Stop all audio
    vm.stopAll = function() {
        if(vm.quietPlaying) {
            vm.stopQuiet();
        } else if(vm.homoPlaying) {
            vm.stopHomo();
        } else if(vm.heteroPlaying) {
            vm.stopHetero();
        }
    };

    vm.initQuiet = function() {
        audioElement.src = 'audio/Quiet.wav';
    };

    vm.playQuiet = function() {
        audioElement.play();
        vm.quietPlaying = true;
    };

    vm.stopQuiet = function() {
        audioElement.pause();
        vm.quietPlaying = false;
    };


    vm.initHomo = function() {
        var randomNumberHomo;
        // Generate random audio and remember past audio
        do {
            randomNumberHomo = Math.floor(Math.random() * vm.audioFileCount);
        }while(randomNumberHomo === prevHomoAudio);
        prevHomoAudio = randomNumberHomo;
        currentHomoFile = randomNumberHomo;
    };

    vm.playHomo = function() {
        audioElement.src = audioPathMap[currentHomoFile];
        audioElement.play();
        homoTimer = $timeout(vm.playHomo, vm.audioDuration);
        vm.homoPlaying = true;
    };

    vm.stopHomo = function() {
        audioElement.pause();
        $timeout.cancel(homoTimer);
        vm.homoPlaying = false;
    };

    vm.initHetero = function() {
        var displayCount = svc.testConstants.maxDisplays;
        var audioCountPerDisplay = svc.testConstants.displayDuration / vm.audioDuration;
        var betweenCount = displayCount - 1;
        var audioCountPerBetween = svc.testConstants.betweenDuration / vm.audioDuration;
        var audioCount = displayCount * audioCountPerDisplay + betweenCount + audioCountPerBetween;
        var setCount = audioCount / vm.audioFileCount;

        var lastAudio = -1;
        var randomNumberHetero;

        var audioPool = {
            0: false,
            1: false,
            2: false,
            3: false
        };

        // For each set
        for(var i = 0; i < setCount; i++) {
            // For each audio file
            for(var j = 0; j < 4; j++) {
                // Choose and remember random audio file
                do{
                    randomNumberHetero = Math.floor(Math.random() * vm.audioFileCount);
                }while(audioPool[randomNumberHetero]);
                audioPool[randomNumberHetero] = true;
                // Remember last random audio file
                lastAudio = randomNumberHetero;
                // Add to play sequence
                vm.heteroAudioSequence.push(randomNumberHetero);
            }
            // Refresh audioPool
            for(var k = 0; k < 4; k++) {
                audioPool[k] = false;
            }
        }
    };

    vm.playHetero = function() {
        audioElement.src = audioPathMap[vm.heteroAudioSequence[currentHeteroSequenceIndex]];
        currentHeteroSequenceIndex++;
        audioElement.play();
        heteroTimer = $timeout(vm.playHetero, vm.audioDuration);
        vm.heteroPlaying = true;
    };

    vm.stopHetero = function() {
        audioElement.pause();
        $timeout.cancel(heteroTimer);
        vm.heteroPlaying = false;
    };
}]);


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

mod.controller('practiceController', ['psychService', 'audioService', '$location', '$timeout', '$window', '$scope', '$document', function(psychService, audioService, $location, $timeout, $window, $scope, $document) {
    var vm = this;
    var svc = psychService;
    var asvc = audioService;

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
        asvc.stopAll();
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
            // End of iteration (First run: after practice)
            else {
                svc.testState.iterationCount++;
                svc.testState.trialCount = 0;

                // Generate random audio type
                asvc.getRandomAudioType();

                // Check if recent iteration is practice
                if(svc.testState.iterationType === 'practice') {

                    // Set variables to standard test
                    svc.testState.maxTrials = svc.testConstants.standardMaxTrials;
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
            // Play audio based on audio type
            if(svc.testState.iterationType === 'practice') {
                if(!asvc.quietPlaying) {
                    asvc.initQuiet();
                    asvc.playQuiet();
                }
                // Play quiet
            } else {
                switch (asvc.audioType) {
                    case 0:
                        if (!asvc.quietPlaying) {
                            asvc.initQuiet();
                            asvc.playQuiet();
                        }
                        break;
                    case 1:
                        if (!asvc.homoPlaying) {
                            asvc.initHomo();
                            asvc.playHomo();
                        }
                        break;
                    case 2:
                        if (!asvc.heteroPlaying) {
                            asvc.initHetero();
                            asvc.playHetero();
                            break;
                        }
                }
            }

            if(!svc.testState.tested) {
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
                storageDest.letterShown[svc.testState.trialCount].push(vm.currentLetter);
                storageDest.colourShown[svc.testState.trialCount].push(vm.currentColour);

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