'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','$stomp','ChatService','$rootScope','$cookieStore','$localStorage','$location',
                                        function($scope, $http, $state,$stomp,ChatService,$rootScope,$cookieStore,$localStorage,$location) {
     $scope.user = {};
     $scope.authError = null;
      $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('/user/login', {uname: $scope.user.uname, password: $scope.user.password})
      .then(function(response) {
//    	  console.log(response.data);
        if (response.data.uname!=$scope.user.uname ) {
          $scope.authError = '用户名或密码错误';
        }else{
            $scope.user =response.data;
            $cookieStore.put("user", $scope.user);
            $rootScope.user=response.data;
          if($scope.user.role=="1"){
//        	  $state.go('app.dashboard-v1');
        	  $location.path("/app/dashboard-v1/"+1)
          }else{
//        	  $cookieStore.put("admin", false);
        	  $state.go('app.main');
          }
        }
      }, function(x) {
        $scope.authError = '网络异常';
      });
    };
  }])
;

/*
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('/user/login', {user.uname: $scope.user.uname, password: $scope.user.password})
      .then(function(response) {
        if ( !response.data.user ) {
          $scope.authError = '用户名或密码错误!';
        }else{
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = '网络异常!';
      });
    };
*/

