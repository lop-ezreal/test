var  app =angular.module('userApp', ['ng-pagination','myDialogs']).controller('userCtrl', function($scope,$http,myDialogs) {
$scope.fName = '';
$scope.lName = '';
$scope.passw1 = '';
$scope.passw2 = '';
/*$scope.users = [
{id:1, fName:'Hege', lName:"Pege" },
{id:2, fName:'Kim',  lName:"Pim" },
{id:3, fName:'Sal',  lName:"Smith" },
{id:4, fName:'Jack', lName:"Jones" },
{id:5, fName:'John', lName:"Doe" },
{id:6, fName:'Peter',lName:"Pan" }
];*/

$scope.roles = [{key : "1", value: "管理员"},  {key : "2", value : "客服"} ];

$scope.add = true;
$scope.edit = true;
$scope.add_ed = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editUser = function(id) {
  if (id == 'new') {
    $scope.add = false;
    $scope.add_ed = false;
    $scope.edit = true;
    $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    } else {
   $scope.add_ed = false;
    $scope.edit = false;
    $scope.add = true;
 /*   $scope.fName = $scope.users[id-1].fName;
    $scope.lName = $scope.users[id-1].lName; */
  }
};

$scope.$watch('passw1',function() {$scope.test();});
$scope.$watch('passw2',function() {$scope.test();});
$scope.$watch('fName', function() {$scope.test();});
$scope.$watch('lName', function() {$scope.test();});

$scope.test = function() {
  if ($scope.passw1 !== $scope.passw2) {
    $scope.error = true;
    } else {
    $scope.error = false;
  }
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.passw1.length || !$scope.passw2.length)) {
     $scope.incomplete = true;
  }
};


    $scope.saveUser = function(user) {
//    	user.id=111;
    	alert(user.id);
        if (!confirm('Your changes will be saved. Are you sure?')) {
            return;
        }
        delete user.errors;
        
        var action = (user.id < 0) ? $http.post : $http.put;
        var uri = (user.id < 0) ? '/user/' : '/user/' + user.id;
        action(uri, user).then(function(response) {
        	if(response.data>0){
        		$scope.onPageChange();
        		 $scope.add_ed = false;
        	}
        }, function(response) {
         	if(response.data>0){
         		$scope.onPageChange();
         		 $scope.add_ed = false;
         	}
            if (response.status == 400) {
            	user.errors = response.data;
            }
        });
    };



$scope.onPageChange = function () {
    // ajax request to load data
    var data={"pageSize":10,"pageNum":$scope.currentPage,"orderBy":"id"};
    console.log(data);
    $http.post("/user/show",data)
    .success(function (response) {$scope.users = response.records;  $scope.pageCount = response.totalNum/10;}
    );

};
// set pagecount in $scope


/*$scope.myFream = function(){
    myDialogs.myFream({
      "template": "<div class='popFream'><div><input ng-model='text' /></div><span>{{text}}</span><p ng-click='aaa();'>点我关闭</p></div>",
      "controller": "PopController",
      "backMask": true,
      "data":{
        "args": "传过来的参数"
      }
    });
  }

app.controller("PopController",function($scope,$DialogsPromise,$DialogsData){
    $scope.aaa = function(){
      $DialogsPromise.close().then(function(){
        //document.querySelector("body").style.backgroundColor = "#2d3e50";
        alert($DialogsData.args);
      });
    };
    //console.log($modalInstance);
    $scope.text = "我会跟着文本框改变";
});*/

});