angular.module('PL3281B').controller('FormController', ['$window', 'PL3281BService',

    function($window, PL3281BService) {
    var vm = this;
    vm.PL3281BService = PL3281BService;
    vm.sessionNo = '';
    vm.testType = '';
    vm.parseSessionNo = function() {
        if(vm.sessionNo % 2 == 0) {
            vm.testType = 'colour';
            vm.PL3281BService.testType = 'colour';
        } else {
            vm.testType = 'order';
            vm.PL3281BService.testType = 'order';
        }

        $window.location.href='PL3281B/instructions.html';
    }
}]);