'use strict';
/* Controllers */
  // signin controller
angular.module('app').controller('MessageController', ['$scope', '$translate', '$localStorage', '$window','$rootScope','$state','$http','$cookieStore','ChatService',
                                                       function(   $scope,   $translate,   $localStorage,   $window ,$rootScope,$state,$http,$cookieStore,ChatService) {
	
//	console.log($cookieStore.get("user"));
	$rootScope.admin=false;
	$scope.showChat =true;
	 $cookieStore.remove("admin");
	$scope.user=$cookieStore.get("user");
	$rootScope.count=0;
	$scope.labels = []; $scope.messages={};$scope.currentMsg=[]; //$scope.fold="";
	if($scope.user!=null){
  	   $http.get("/chat/chatSession/"+$scope.user.id)
  	     .success(function (response) {
  	    	 if(response){
//  	    		 console.log(response);
  	    		 $scope.labels=response.session;
  	    		 $scope.messages= response.msg;
  	    		 if($scope.labels.length>0){
//  	    			 $scope.fold=$scope.labels[0].openid;
  	    			 $scope.fold=$scope.labels[0].openid;
  	    			 $scope.uid=$scope.labels[0].uid;
  	    			 $scope.sid= $scope.labels[0].id;
  	    			  $scope.loadMsg(  $scope.fold, $scope.uid,$scope.sid);//select first label
  	    			 $scope.nickname=$scope.labels[0].name;
  	    			// $scope.uname=response.msg[$scope.fold].uname;
  	    		 }else{
  	    			$scope.showChat = false;
  	    		 }
  	    	 }
  	     });
  	   
		$scope.connect=function(){
		  var channel = '/user/'+$scope.user.id+'/chat/message';
		  ChatService.initialize(channel);
		}
		
	     ChatService.receive().then(null, null, function(message) {
	    	 console.log(message);
	    	 $scope.showChat =  true;
	    	 var  haslabe = true;
	    	 var  temp = $scope.labels;
	    	 var idx = 0;
	    	 for(var i in temp ){
	    			if(temp[i].openid == message.openid){
	    				haslabe  = false;
	    				idx = i;
	    				break;
	    			}
	    	 }
	    	 
	    	if(haslabe){
	    		//第一次接入消息 创建labels
	    		 $rootScope.count++;
	            $scope.labels.push(
	                    {
	                      id:message.sessionId,	
	                      uid:message.userId,	
	                      name: message.nickname,
	                      openid: message.openid,
	                      color: '#27c24c'
	                    }
	                  );
	            // 放入消息列表
	            var m=[]; m.push(message);
	            $scope.messages[message.openid]=m;
		   
	    	}else{
	    		 	// 直接放入存在的消息列表
	    		console.log($scope.messages);
	    		$scope.messages[message.openid].push(message);
	    	}
	    	
	     	$scope.fold=$scope.labels[idx].openid;
			 $scope.uid=$scope.labels[idx].uid;
			 $scope.sid= $scope.labels[idx].id;
			 $scope.loadMsg(  $scope.fold, $scope.uid,$scope.sid);
	    	
	   });
	}else{
		//lost the userId  , to relogin 
		 $state.go('access.signin');
	}

     //switch label
     $scope.loadMsg=function(openid,uid,sid){
//    	 $rootScope.fold=openid;
    	 $scope.fold=openid;
    	 $scope.uid=uid;
    	 $scope.sid=sid;
         $http.get("/chat/showChats/"+ sid)
         .success(function (response) {
        	 for(var s in $scope.messages){
//        		 console.log(s);
         		 var arr=[];$scope.messages[s]=arr;
        		 for(var i in response.records){
        			 if(response.records[i].openid==s){
        				 $scope.nickname=response.records[i].nickname;
        				 $scope.uname=response.records[i].uname;
        				 $scope.messages[s].push(response.records[i]);
//        				 console.log( $scope.messages);
        			 }
        		 }
        	 }
         }
         );
     } 
   
     //send message
     $scope.send=function(){
    	 var d = new Date();
    	 if($scope.content==null) {
    		 alert("请输入内容 ...");return;
    	 }
    	 //push message to current array;
    	 var msg = {"openid":$scope.fold,"content":$scope.content,"uname":$scope.uname,"nickname":$scope.nickname,"createTime":d,type:1,"userId":$scope.uid,"sessionId":$scope.sid};
    	 $scope.messages[msg.openid].push(msg);
    	 //submit to server;
    	   $http.post("/chat/sendMsg",msg)
    	    .success(function (response) {
	    	    	if(response==0){
	    	    		$scope.content="";
	    	    		 var div=document.querySelector('#chatWindow');
	    	    		 div.scrollTop=div.scrollHeight;
	    	    	}
    	    	} );
     }
     
     $scope.close=function(){
         $http.get("/chat/colseChatSession/"+ $scope.uid+"/"+ $scope.sid)
         .success(function (response) {
        	 if(response.ret>0){
        		 var temp =[];
        		 for(var i in $scope.labels){
        			 if($scope.labels[i].id!=$scope.sid)
        				 temp.push($scope.labels[i]);
        		 }
        		 $scope.labels =temp;
        		 var arr=[];
        		 for(var s in $scope.messages){
            			 if($scope.fold!=s){
            				 arr.push($scope.messages[s]);
            			 }
        		 }
        		 $scope.messages =arr;
        		 if($scope.labels .length==0){
        			 $scope.showChat =  false;
        		 }
        	 }
         }
         );
     };
     
     $scope.$watch ('messages',function(o,n){
    	 if(o!==n){
    		 var div=document.querySelector('#chatWindow');
    		 div.scrollTop=div.scrollHeight;
    	 }
     },true);
     
  }])
;

app.controller('ListCtrl', ['$scope', 'mails', '$stateParams','$http','$document','$window', function($scope, mails, $stateParams,$http,$document,$window) {
//	  $scope.fold = $stateParams.fold;
//		$scope.$on("ngRepeatFinished",function(data){});
/*	   $scope.scrollPostion = function ($event){
	    	 $event.target.scrollTop= $event.target.scrollHeight;
	    	 console.log($event.target.scrollTop);
	     };*/
	}]);

