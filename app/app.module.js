/**
 * Created by Jeffrey on 12/7/14.
 */

angular.module('app', [
        'shared.application',
        'shared.session',

        'shared.services.data',
        'shared.services.dialog',
        'shared.services.loading',

        'components.login',
        'components.print',

        'pasvaz.bindonce',
        'infinite-scroll'
    ])
    //.constant('APP_CONFIG', {
    //    DEBUG:true
    //})
    .controller('LogoutController', ['$scope', 'DataService', function ($scope, DataService, DialogService) {
        $scope.logout = function () {
            DataService.logout();
            window.location.href = 'login.html';
        };

    }])

    .controller('NIYCtrl', ['$scope', 'DialogService', function ($scope, DialogService) {
        $scope.NIY = function () {
            DialogService.alert(['敬请期待！']);
        };
    }])

    .run(function ($rootScope) {
        //$rootScope.debug = true;
        
    })

;