'use strict';

/* Controllers */
app.controller('FormDemoCtrl', ['$scope','$http','ChatService','$stateParams','$state', '$rootScope',function($scope,$http,ChatService,$stateParams,$state,$rootScope) {
/*    $scope.notBlackListed = function(value) {
      var blacklist = ['bad@domain.com','verybad@domain.com'];
      return blacklist.indexOf(value) === -1;
    }*/
    
	$scope.edit=false;
	$rootScope.admin=true;
    $scope.initUser = function(){
    	if(null!=$stateParams.id&&""!=$stateParams.id){
    		   $http.get("/user/get/"+$stateParams.id)
    		   .success(function (response) {
    			   if(response.id==$stateParams.id){
    				   $scope.nuser= response; 
    				   $scope.edit=true;
    			   }
    			   }
    		   );
    	}
    }
    
    $scope.initUser(); //
    
    
    
    $scope.game=[];
    $scope.check_game=function($event){
    	var check = $event.target;
    	if(check.checked){
    		 $scope.game.push(check.value);
    	}else{
    		var temp=[];
    		for(var i in $scope.game){
    			if($scope.game[i]!=check.value)
    				temp.push($scope.game[i]);
    		}
    		$scope.game=temp;
    	}
    }
    
    $scope.checkUname=function($event){
	   if($event.target.value!=null){
		   $http.get("/user/"+$event.target.value)
		   .success(function (response) {
				   if(!response){
					   $event.target.value="";
					   alert("重复的用户名!");
				   }
			   }
		   );
	   } 	
    }

    $scope.saveUser = function(user) {
        if (!confirm('Your changes will be saved. Are you sure?')) {
            return;
        }
        delete user.errors;
       if( user.id==null)
    	   user.id =-1;
        
       if(  $scope.game.length>0){ 
    	   user.game= $scope.game.join(",");
       }
       
        var action = (user.id < 0) ? $http.post : $http.put;
        var uri = (user.id < 0) ? '/user/' : '/user/' + user.id;
        action(uri, user).then(function(response) {
        	if(response.data>0){
        		$state.go("app.table.users");
        	}
        }, function(response) {
         	if(response.data>0){ 
         		//$scope.onPageChange();
         	}
            if (response.status == 400) {
            	user.errors = response.data;
            }
        });
    };
    
    
    $scope.val = 15;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.val = val;
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
    });

    $scope.select2Number = [
      {text:'First',  value:'One'},
      {text:'Second', value:'Two'},
      {text:'Third',  value:'Three'}
    ];

    $scope.list_of_string = ['tag1', 'tag2']
    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };

    angular.element("#LinkInput").bind('click', function (event) {
      event.stopPropagation();
    });

  }])
 ;