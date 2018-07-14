var  app =angular.module('messageApp', ['ng-pagination','myDialogs']).controller('messageCtrl', function($scope,$http,myDialogs) {

$scope.onPageChange = function () {
    // ajax request to load data
	var pigeSize=10;
    var data={"pageSize":pigeSize,"pageNum":$scope.currentPage,"orderBy":"create_time"};
    console.log(data);
    $http.post("/chat/showMsg",data)
    .success(function (response) {$scope.messages = response.records;  $scope.pageCount = response.totalNum%pigeSize;}
    );
};
});