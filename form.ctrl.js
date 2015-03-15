angular.module('PL3281B').controller('FormController', function() {
    var vm = this;
    vm.sessionNo = '';
    vm.newSession = '';
    vm.parseSessionNo = function() {
        if(vm.sessionNo % 2 == 0) {
            // Redirect to even session
            vm.newSession = 'even';
        } else {
            // Redirect to odd session
            vm.newSession = 'odd';
        }
    }
});