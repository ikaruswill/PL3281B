// Create module for the experiment
var mod = angular.module('psych', ['ngRoute', 'ngDraggable', 'ngCsv', 'ngSanitize']);

mod.service('psychService', function() {

    this.testConstants = {
        maxIterations: 4, // 4
        practiceMaxTrials: 5, // 5
        standardMaxTrials: 12, // 12
        maxDisplays: 7, // 7
        displayDuration: 1000, //1000 (ms)
        betweenDuration: 500, // 500 (ms)

        colourValueMap: {
            'Yellow': '#ffff00', // Yellow
            'Orange': '#e46c0a', // Orange
            'Red'   : '#ff0000', // Red
            'Purple': '#604a7b', // Purple
            'Blue'  : '#558ed5', // Blue
            'Green' : '#00b050', // Green
            'Grey'  : '#bfbfbf' // Grey
        },

        colourArray: ['Yellow', 'Orange', 'Red', 'Purple', 'Blue', 'Green', 'Grey'],

        letterArray: ['B', 'H', 'J', 'Q', 'V', 'X', 'Z']
    };

    // User data begins here

    this.sessionParams = {
        sessionNo: 'NIL',
        testType: 'NIL'
    };

    this.practiceData = {
        distractor: 0, // Always quiet audio
        colourShown: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {}
        },
        colourPicked: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {}
        },
        orderShown: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        orderPicked: {
            0: [],
            1: [],
            2: [],
            3: [],
            4: []
        },
        score: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0
        }
    };

    this.test1Data = {
        distractor: -1,
        colourShown: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
            10: {},
            11: {}
        },
        colourPicked: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
            10: {},
            11: {}
        },
        orderShown: {
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
        orderPicked: {
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
        score: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    };

    this.test2Data = {
        distractor: -1,
        colourShown: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
            10: {},
            11: {}
        },
        colourPicked: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
            10: {},
            11: {}
        },
        orderShown: {
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
        orderPicked: {
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
        score: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
        }
    };

    this.test3Data = {
        distractor: -1,
        colourShown: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
            10: {},
            11: {}
        },
        colourPicked: {
            0: {},
            1: {},
            2: {},
            3: {},
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
            10: {},
            11: {}
        },
        orderShown: {
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
        orderPicked: {
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
        score: {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0
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

        letterColourIndex: {
            'B': -1,
            'H': -1,
            'J': -1,
            'Q': -1,
            'V': -1,
            'X': -1,
            'Z': -1
        }
    };

    this.storeDest = {
        0: this.practiceData,
        1: this.test1Data,
        2: this.test2Data,
        3: this.test3Data
    };
});

mod.service('utilityService', [function() {
    this.shuffleArray = function(array) {
        var m = array.length, t, i;
        while(m) {
            i = Math.floor(Math.random() * m--);
        }
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    };

    this.pushArray = function (recipient, sender) {
        for (var i = 0; i < sender.length; i++) {
            recipient.push(sender[i]);
        }
    };

    this.pushMap = function(recipient, sender) {
        var keyArray = Object.keys(sender);
        for (var i = 0; i < keyArray.length; i++) {
            recipient.push(sender[keyArray[i]]);
        }
    };
}]);

mod.service('audioService', ['psychService', 'utilityService', '$timeout', '$document', function(psychService, utilityService, $timeout, $document) {
    var svc = psychService;
    var util = utilityService;
    var vm = this;
    vm.audioDuration = 500; // 500 (ms)
    vm.audioFileCount = 4;
    vm.audioTypeCount = 3;
    var audioElement = $document[0].createElement('audio');

    // Practice always plays quiet sound
    var audioTypeSequence = [0];

    var quietPlaying = false;

    var heteroPlaying = false;
    var heteroAudioSequence = [];
    var currentHeteroSequenceIndex = 0;

    var homoPlaying = false;
    var prevHomoAudio = -1; // -1
    var currentHomoFile;

    var homoTimer;
    var heteroTimer;

    var audioPaths = [
        'audio/G.wav',
        'audio/L.wav',
        'audio/M.wav',
        'audio/R.wav'
    ];

    var initAudioSequence = function() {
        var audioTypeUsed = [0, 1, 2];

        util.shuffleArray(audioTypeUsed);
        util.pushArray(audioTypeSequence, audioTypeUsed);

        for(var j = 0; j < audioTypeSequence.length; j++) {
            svc.storeDest[j].distractor = audioTypeSequence[j];
        }

        console.log("audioTypeSequence init");
    };

    initAudioSequence();

    var initQuiet = function() {
        audioElement.src = 'audio/Quiet.wav';
    };

    var playQuiet = function() {
        audioElement.play();
        quietPlaying = true;
    };

    var stopQuiet = function() {
        audioElement.pause();
        quietPlaying = false;
    };


    var initHomo = function() {
        var randomNumberHomo;
        // Generate random audio and remember past audio
        do {
            randomNumberHomo = Math.floor(Math.random() * vm.audioFileCount);
        }while(randomNumberHomo === prevHomoAudio);
        prevHomoAudio = randomNumberHomo;
        currentHomoFile = randomNumberHomo;
    };

    var playHomo = function() {
        audioElement.src = audioPaths[currentHomoFile];
        audioElement.play();
        homoTimer = $timeout(playHomo, vm.audioDuration);
        homoPlaying = true;
    };

    var stopHomo = function() {
        audioElement.pause();
        $timeout.cancel(homoTimer);
        homoPlaying = false;
    };

    var initHetero = function() {
        var displayCount = svc.testConstants.maxDisplays;
        var audioCountPerDisplay = svc.testConstants.displayDuration / vm.audioDuration;
        var betweenCount = displayCount - 1;
        var audioCountPerBetween = svc.testConstants.betweenDuration / vm.audioDuration;
        var audioCount = displayCount * audioCountPerDisplay + betweenCount + audioCountPerBetween;
        var setCount = audioCount / vm.audioFileCount;

        var lastAudio = -1;
        var heteroSet = audioPaths.slice(0);

        // For each set
        for (var i = 0; i < setCount; i++) {
            // Choose and remember random set
            do {
                util.shuffleArray(heteroSet);
            } while (heteroSet[heteroSet.length - 1] === lastAudio);
            // Remember last random audio file
            lastAudio = heteroSet[heteroSet.length - 1];

            // Add to play sequence
            util.pushArray(heteroAudioSequence, heteroSet);
        }
    };

    var playHetero = function() {
        audioElement.src = heteroAudioSequence[currentHeteroSequenceIndex];
        currentHeteroSequenceIndex++;
        audioElement.play();
        heteroTimer = $timeout(playHetero, vm.audioDuration);
        heteroPlaying = true;
    };

    var stopHetero = function() {
        audioElement.pause();
        $timeout.cancel(heteroTimer);
        heteroPlaying = false;
    };

    // Play audio according to predetermined type sequence
    vm.playAudio = function() {
        var type = audioTypeSequence[svc.testState.iterationCount + 1];

        switch (type) {
            case 0:
                if (!quietPlaying) {
                    initQuiet();
                    playQuiet();
                }
                break;
            case 1:
                if (!homoPlaying) {
                    initHomo();
                    playHomo();
                }
                break;
            case 2:
                if (!heteroPlaying) {
                    initHetero();
                    playHetero();
                }
                break;
        }
    };

    // Stop all audio
    vm.stopAll = function() {
        if(quietPlaying) {
            stopQuiet();
        } else if(homoPlaying) {
            stopHomo();
        } else if(heteroPlaying) {
            stopHetero();
        }
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
        controller: 'scoresheetController',
        controllerAs: 'scoresheetCon',
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
}]);

mod.controller('prePracticeController', ['psychService', '$location', function(psychService, $location) {
    var vm = this;
    var svc = psychService;

    vm.beginPractice = function() {
        svc.practiceData.displayCount++;
        $location.path('/pause');
    }
}]);

mod.controller('practiceController', ['psychService', 'audioService', 'utilityService', '$location', '$timeout','$scope', function(psychService, audioService, utilityService, $location, $timeout, $scope) {
    var vm = this;
    var svc = psychService;
    var asvc = audioService;
    var util = utilityService;

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
        console.log('TrialCount @ pauseRedirect: ' + svc.testState.trialCount);
        svc.testState.trialCount++;
        // if($scope.keyCode == 32) {
        // End of trial
        if(svc.testState.trialCount < svc.testState.maxTrials) {
            $location.path('/pause');
        }
        // End of iteration (First run: after practice)
        else if(svc.testState.trialCount === svc.testState.maxTrials) {
            svc.testState.iterationCount++;
            svc.testState.trialCount = 0;

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
                    $location.path('/thankyou');
                }
            }
        }
        // }
    };

    var timer;
    vm.score = 0;
    vm.maxScore = svc.testConstants.maxDisplays;
    var storageDest = svc.storeDest[svc.testState.iterationCount + 1];

    var runLogic = function() {
        // Decommission logic timer on unload
        $scope.$on('$destroy', function() {
            $timeout.cancel(logicTimer);
        });

        // Display exclamation mark for /pause
        if(svc.testState.displayCount === -1) {
            vm.currentLetter = '!';
            svc.testState.displayCount++;

            // Shuffle letter order
            storageDest.orderShown[svc.testState.trialCount] = svc.testConstants.letterArray.slice(0);
            util.shuffleArray(storageDest.orderShown[svc.testState.trialCount]);

            // Shuffle colour association
            storageDest.colourShown[svc.testState.trialCount] = svc.testConstants.colourArray.slice(0);
            util.shuffleArray(storageDest.colourShown[svc.testState.trialCount]);

            timer = $timeout(testRedirect, 1000);
        }

        // Prevent score from entering logic block
        else if(svc.testState.displayCount < svc.testConstants.maxDisplays) {
            // Play audio based on iteration count
            asvc.playAudio();

            if(!svc.testState.tested) {
                // Update view
                vm.currentLetter = storageDest.orderShown[svc.testState.trialCount][svc.testState.displayCount];
                vm.currentColour = storageDest.colourShown[svc.testState.trialCount][svc.testState.displayCount];
                vm.currentColourValue = svc.testConstants.colourValueMap[vm.currentColour];

                // Update test answers
                console.log('Letter shown stored: ' + storageDest.orderShown[svc.testState.trialCount][svc.testState.displayCount]);
                console.log('Colour Shown stored: ' + storageDest.colourShown[svc.testState.trialCount][svc.testState.displayCount]);

                // Set variables for next view
                svc.testState.tested = true;
                svc.testState.displayCount++;

                // Check if it is the last display
                if(svc.testState.displayCount != svc.testConstants.maxDisplays) {
                    timer = $timeout(betweenRedirect, 1000);
                }
                // Redirect to score sheet
                else {
                    timer = $timeout(scoresheetRedirect, 1000);
                }
            } else if(svc.testState.tested) {
                vm.currentLetter = '+';
                svc.testState.tested = false;
                timer = $timeout(testRedirect, 500);
            }

            $scope.$on('$destroy', function() {
                $timeout.cancel(timer);
            });
        }
        // Score computation for /score
        else {
            console.log('iterationCount: ' + svc.testState.iterationCount);

            console.log('trialCount: ' + svc.testState.trialCount);
            for(var i = 0; i < svc.testConstants.maxDisplays; i++) {
                if(svc.sessionParams.testType === 'order') {
                    console.log('orderPicked: ' + storageDest.orderPicked[svc.testState.trialCount][i]);
                    console.log('orderShown: ' + storageDest.orderShown[svc.testState.trialCount][i]);
                    if(storageDest.orderPicked[svc.testState.trialCount][i] === storageDest.orderShown[svc.testState.trialCount][i]) {
                        vm.score++;
                    }
                } else if(svc.sessionParams.testType === 'colour') {
                    var currentLetter = storageDest.orderPicked[svc.testState.trialCount][i];
                    console.log('colourPicked: ' + storageDest.colourPicked[svc.testState.trialCount][currentLetter]);
                    console.log('colourShown: ' + storageDest.colourShown[svc.testState.trialCount][currentLetter]);

                    if(storageDest.colourPicked[svc.testState.trialCount][currentLetter] === storageDest.colourShown[svc.testState.trialCount][currentLetter]) {
                        vm.score++;
                    }
                }
            }
            storageDest.score[svc.testState.trialCount] = vm.score;
            vm.percentageScore = vm.score * 100 / vm.maxScore;
        }
    };

    var logicTimer = $timeout(runLogic, 0);
}]);

mod.controller('endPracticeController',['$location', function($location) {

    this.standardPauseRedirect = function() {
        $location.path('/pause');
    }
}]);

mod.controller('breakController', ['psychService', '$location', function(psychService, $location) {
    var vm = this;

    vm.pauseRedirect = function() {
        $location.path('/pause');
    };

}]);

mod.controller('scoresheetController', ['psychService', '$location', function(psychService, $location){
    var svc = psychService;
    var vm = this;
    var storageDest = svc.storeDest[svc.testState.iterationCount + 1];

    vm.draggable = [];
    vm.droppableBoxes = [];
    vm.droppableColours = [];
    vm.dropped = [];
    vm.buttons = [];

    // Initialize draggable, droppable, dropped and button objects
    for(var i = 0; i < svc.testConstants.maxDisplays; i++) {
        var letterObj = {
            letter: svc.testConstants.letterArray[i],
            value: i // Letter map index
        };
        vm.draggable.push(letterObj);
        var boxObj = {
            colour: 'transparent',
            value: i // Order
        };
        vm.droppableBoxes.push(boxObj);
        var colourObj = {
            colour: svc.testConstants.colourValueMap[i],
            value: i // Colour map index
        };
        vm.droppableColours.push(colourObj);
        vm.dropped.push(null);
        vm.buttons.push(i);
    }

    if(svc.sessionParams.testType === 'order') {
        vm.isOrder = true;
        vm.droppable = vm.droppableBoxes;
    } else if(svc.sessionParams.testType === 'colour') {
        vm.isOrder = false;
        vm.droppable = vm.droppableColours;
    }


    // Called by DOM element button
    vm.submitScore = function() {
        for(var j = 0; j < svc.testConstants.maxDisplays; j++) {
            storageDest.orderPicked[svc.testState.trialCount][j] = vm.dropped[j].letter;
            storageDest.colourPicked[svc.testState.trialCount][vm.dropped[j].letter] = svc.testConstants.colourMap[j];
        }
        vm.scoreRedirect();
    };

    vm.scoreRedirect = function() {
        $location.path('/score');
    };

    vm.onDropComplete = function(box, data, event) {
        if (vm.dropped.indexOf(data) == -1) {
            vm.dropped[box.value] = data;
            console.log('Picked: ' + vm.dropped[box.value].letter + ":" + box.colour);
        }
    };

    vm.onDragSuccess1 = function(data, event){
        var index = vm.dropped.indexOf(data);
        if (index > -1) {
            vm.dropped.splice(index, 1);
        }
    };

    vm.onClear = function(index) {
        vm.dropped[index] = null;
    }
}]);

mod.controller('exportController', ['psychService', 'utilityService', function(psychService, utilityService) {
    var svc = psychService;
    var util = utilityService;
    var vm = this;
    vm.csvData = [];
    vm.csvHeader = [svc.sessionParams.testType, "Block", "Distractor", "Trial"];
    vm.filename = "PL3281B Session " + svc.sessionParams.sessionNo + ".csv";
    vm.fieldSeparator = ",";
    vm.decimalSeparator = ".";

    console.log("CSVheader init");
    for(var l = 0; l < svc.testConstants.maxDisplays; l++) {
        vm.csvHeader.push("letter" + " " +  l);
        console.log("CSVheader init trials");
    }
    for(var c = 0; c < svc.testConstants.maxDisplays; c++) {
        vm.csvHeader.push(svc.testConstants.letterMap[c] + " colour");
        console.log("CSVheader init colour");
    }
    vm.csvHeader.push("Score");

    for (var i = 0; i < svc.testConstants.maxIterations; i++) {
        var storageDest = svc.storeDest[i];
        console.log("csvData init");

        var maxTrials;
        if(i === 0) {
            maxTrials = svc.testConstants.practiceMaxTrials;
        } else {
            maxTrials = svc.testConstants.standardMaxTrials;
        }

        for (var t = 0; t < maxTrials; t++) {
            var shown = ["Shown"];
            var picked = ["Picked"];

            shown.push(i - 1);
            shown.push(storageDest.distractor);
            shown.push(t);
            util.pushArray(shown, storageDest.orderShown[t]);
            util.pushMap(shown, storageDest.colourShown[t]);
            shown.push("-");

            picked.push(i - 1);
            picked.push(storageDest.distractor);
            picked.push(t);
            util.pushArray(picked, storageDest.orderPicked[t]);
            util.pushMap(picked, storageDest.colourPicked[t]);
            picked.push(storageDest.score[t]);

            vm.csvData.push(shown);
            vm.csvData.push(picked);
        }
    }
}]);