app.controller('userCtrl', ['$scope', '$http','$state','$location','$rootScope', function($scope, $http,$state,$location,$rootScope) {
	$rootScope.admin=true;
	$scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 20, 50],
        pageSize: 10,
        currentPage: 1
    };  
    $scope.gameMap={'3':'拳皇97 OL','4':'暗黑黎明','5':'魔力宝贝' };

    $scope.transferGame=function (g){
    	var arr = [];
    	if(g!=null&&g.length>0){
    		var  gs = g.split(",");
	    		for(var i in gs ){
	    			arr.push( $scope.gameMap[gs[i]]);
	    		}
    	}
    	return   arr.join("；");
    }
    
    $scope.transferRole = function(r){
    	var ret = '';
    	switch (r) {
		case 1:
			ret = '管理员';
			break;
		default:
			ret = '客服';
			break;
		}
    	return ret;
    }
    
   $scope.update = function (id){
	   $location.path("/app/table/add_user/"+id)
   } 
    
    
    $scope.setPagingData = function(data, page, pageSize){  
    	console.log(data);
    	for(var i in  data.records){
    		var u = 	data.records[i];
		    	u.role= $scope.transferRole (u.role);
		    	u.game = $scope.transferGame(u.game);    	
    	}
    	
//        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = data.records;
        $scope.totalServerItems = data.totalNum;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('/user/show').success(function (largeLoad) {    
                    data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });
                    $scope.setPagingData(data,page,pageSize);
                });            
            } else {
            	   var data={"pageSize": $scope.pagingOptions.pageSize,"pageNum":page,"orderBy":"id"};
                $http.post('/user/show',data).success(function (largeLoad) {
                	console.log(largeLoad);
                    $scope.setPagingData(largeLoad,page,pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        i18n:'zh-cn',  //
        columnDefs:[// {{row.entity[col.field]}}
            {field:'id',width:60,displayName:"编辑",cellTemplate:'  <button class="btn btn-primary btn-addon btn-sm"  ng-click="update( {{row.entity[col.field]}})">修 改</button>'},        
            {field:'uname',displayName:"用户名"},        
            {field:'role',displayName:"角色"},        
            {field:'email',displayName:"邮箱"},        
            {field:'phoneNo',displayName:"电话"},       
            {field:'game',displayName:"负责游戏"} ,      
            {field:'inchatNum',displayName:"可接待人数"}       
            ]
    };
}]);