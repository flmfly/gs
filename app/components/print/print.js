/**
 * Created by Jeffrey on 12/25/14.
 */
'use strict';

angular.module('components.print', ['infinite-scroll', 'shared.services.data', 'shared.services.loading', 'shared.services.dialog', 'shared.session'])

    .controller('PrintController', ['$scope', '$http', 'DataService', 'LoadingService', 'DialogService', 'Session', function ($scope, $http, DataService, LoadingService, DialogService, Session) {
        $scope.busy = false;

        $scope.loadMore = function () {

        };

        var serverUrl = 'http://203.124.13.128:7388/';

        var rval;


        function loadMore() {
            $scope.busy = true;
            var query = {
                func: "searchresult",
                query: {
                    id: {rval: rval}
                },
                page: {size: 2, num: 1, sort: '-queryId.id,imgRange'}
            };

            var req = {
                method: 'POST',
                url: serverUrl + 'ws/api/read',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: query
            };

            console.log(2)
            $http(req).then(function (response) {
                if (response.status === 200) {
                    var rtnList = response.data.data;
                    for (var i = 0; i < rtnList.length; i++) {
                        var tmp = rtnList[i];
                        rval = tmp.id;
                        $('#table_body').append(createTr(tmp));
                    }
                }
                $scope.busy = false;
            }, function (response) {
                $scope.busy = false;
            });
        }

        loadMore();

        function getImgUrl(path) {
            return serverUrl + 'func/api/imagelib/file?path=' + path + '&fileName=&category=image_search';
        }


        function createTr(result) {
            return $('<tr id="' + result.id + '">'
                + '<td><img src="' + getImgUrl(result.queryId.path) + '" /></td>'
                + '<td>' + result.imgRange + '</td>'
                + '<td><img src="' + getImgUrl(result.imageId.path) + '" /></td>'
                + '<td><button><i class="material-icons">delete</i></button></td>'
                + '</tr>');
        }


    }])

;