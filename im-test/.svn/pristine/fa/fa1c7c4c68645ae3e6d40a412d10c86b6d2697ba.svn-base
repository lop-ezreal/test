'use strict';

/* Controllers */
app.controller('dialogueCtr', ['$scope','$http','ChatService','$stateParams','$state','$rootScope', function($scope,$http,ChatService,$stateParams,$state,$rootScope) {
	$rootScope.admin=true;
    $scope.messages=[];
    $scope.initMessages = function(){
        $http.get("/chat/dialogueMsgs/"+$stateParams.id )
        .success(function (response) {
        	$scope.messages=response.records;
        	for(var i in $scope.messages){
        		if($scope.messages[i].createTime!=null){
    				var date = new Date(	$scope.messages[i].createTime);
    				$scope.messages[i].createTime = date.toLocaleDateString('chinese')+" "+date.toLocaleTimeString('chinese',{hour12:false});
    			}
        	}
        }
        );
    }
  $scope.initMessages();
  

  }])
 ;