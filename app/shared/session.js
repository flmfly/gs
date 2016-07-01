/**
 * Created by Jeffrey on 12/7/14.
 */

angular.module('shared.session', ['infinite-scroll'])

    .provider('Session', function () {
        this.rScope;

        var _this = this;

        this.$get = function($injector) {
            _this.rScope = $injector.get('$rootScope');
            return _this;
        };

        this.setUser = function (user) {
            this.rScope.loginUser = user;
        };

        this.removeUser = function () {
            delete  this.rScope.loginUser;
        };
    })
    .run(function ($rootScope, DataService) {
        DataService.getLoginUser().then(function (response) {

            var rtnData = response.plain();
            if (rtnData.status.code === 200) {
                $rootScope.loginUser = rtnData.data;
                $rootScope.loginUser.userId = $rootScope.loginUser.id;
                // $('#operation').show();
            }
        });
        // $rootScope.user = {};
    })
;