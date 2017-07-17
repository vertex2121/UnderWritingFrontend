(function() {
    'use strict';
    angular
        .module('app')
        .controller('primaryTabController', primaryTabController);

    primaryTabController.$inject = ['dataService', 'decisionService'];

    function primaryTabController(dataService, decisionService) {
        var ptc = this;
        ptc.decisionService = decisionService;
        ptc.decisionCodes;
        ptc.save = save;
        ptc.postpone = postpone;
        ptc.improve = improve;
        ptc.recall = recall;
        ptc.finalize = finalize;
        ptc.deb = deb;

        activate();

        function activate() {
            getDecisionCodes();
            decisionService.init();
        }

        function getDecisionCodes() {
            dataService.getDecisionCodes()
                .then(function(codes) {
                    ptc.decisionCodes = codes;
                });
        }

        function save() {
            decisionService.save();
        }

        function postpone() {
            decisionService.postpone();
        }

        function improve() {
            decisionService.improve();
        }

        function recall() {
            decisionService.recall();
        }

        function finalize() {
            decisionService.finalize();
        }

        function deb() {
            decisionService.deb();
        }
    }
})();
