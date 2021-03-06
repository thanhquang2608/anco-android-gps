var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function ($rootScope, $scope, $state, $ionicPopup, $ionicLoading, AuthService, AUTH_EVENTS, NETWORK_EVENTS, DealerService) {
    $rootScope.TIME_OUT = 60000;
    var isShowingNoInternet = false;

    $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
        var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized!',
            template: 'You are not allowed to access this resource.'
        });
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
        AuthService.logout();
        $state.go('login');
        var alertPopup = $ionicPopup.alert({
            title: 'Session Lost!',
            template: 'Sorry, You have to login again.'
        });
    });

    $scope.$on(NETWORK_EVENTS.nointernet, function (event) {
        $ionicLoading.hide();
        if (!isShowingNoInternet) {
            isShowingNoInternet = true;

            var alertPopup = $ionicPopup.alert({
                template: 'Không kết nối được với server'
            });

            alertPopup.then(function(res) {
                isShowingNoInternet = false;
            });
        }
    });

    $scope.$on(NETWORK_EVENTS.timeout, function (event) {
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
            template: 'Kết nối timeout'
        });
    });

    $scope.setCurrentUsername = function (name) {
        $scope.username = name;
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        console.log('enter');
        var stateName = $state.current.name;
        if (stateName === 'tabs.survey' || stateName === 'tabs.dealers' || stateName === 'tabs.account') {
            $rootScope.hideTabs = false;
        } else {
            $rootScope.hideTabs = true;
        }
    });

    $rootScope.processRequestError =  function(response) {
        if (response.status != 0 && response.status != 408) {
            var alertPopup = $ionicPopup.alert({
                 title: 'Thất bại!',
                 template: err.data.message
            });
        }
    }

    $rootScope.$on('uploadImagesFinishDealer', function (event) {
        console.log('uploadImagesFinishDealer');
        $scope.$apply(function () {
            $scope.uploadImageFinish = true;
            DealerService.setUploadImageFinish(true);
        })
    });
})

.controller('HomeCtrl', function ($scope) {

});