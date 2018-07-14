app.controller('sessionCtrl', ['$scope', '$http','$state','$location','$rootScope', function($scope, $http,$state,$location,$rootScope) {
	$rootScope.admin=true;
    $scope.filterOptions = {
        filterText: "",
        filterParam:{
        	game:"",
        	roleId:"",
        	name:""
        },
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 20, 50],
        pageSize: 10,
        currentPage: 1
    };  
    $scope.gameMap={'3':'拳皇97 OL','4':'暗黑黎明','5':'魔力宝贝' };

    $scope.formartData = function (data){
//    	console.log(data.records);
    	if(data!=null){
    		for(var i in  data.records){
    			data.records[i].game=$scope.gameMap[data.records[i].game];
    			if(data.records[i].startTime!=null){
    				var date = new Date(	data.records[i].startTime);
    				data.records[i].startTime = date.toLocaleDateString('chinese')+" "+date.toLocaleTimeString('chinese',{hour12:false});
    			}
    			if(data.records[i].endTime!=null){
    				var   date = new Date(	data.records[i].endTime);
    				data.records[i].endTime = date.toLocaleDateString('chinese')+" "+date.toLocaleTimeString('chinese',{hour12:false});
    			}
    		}
    	}
    	return data;
    }
    
    
   $scope.dialogue = function (id){
	   $location.path("/app/table/dialogue/"+id)
   } 
    
    
    $scope.setPagingData = function(data, page, pageSize){  
        $scope.myData = data.records;
        $scope.totalServerItems = data.totalNum;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page,conditions) {
        setTimeout(function () {
            if (conditions) {
                var param={"pageSize": $scope.pagingOptions.pageSize,"pageNum":page,"orderBy":"start_time",conditions:conditions};
                $http.post('/chat/listSessions',param).success(function (largeLoad) {    
            /*        data = largeLoad.filter(function(item) {
                        return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                    });*/
                    $scope.setPagingData(largeLoad,page,pageSize);
                });            
            } else {
            	   var data={"pageSize": $scope.pagingOptions.pageSize,"pageNum":page,"orderBy":"start_time"};
                $http.post('/chat/listSessions',data).success(function (largeLoad) {
//                	console.log(largeLoad.records[1].game);
                	var formatData= $scope.formartData(largeLoad);
                    $scope.setPagingData(formatData,page,pageSize);
                });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterParam);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
//    	alert($scope.filterOptions.filterParam.game)
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterParam);
        }
    }, true);

    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        i18n:'zh-cn',
        columnDefs:[// {{row.entity[col.field]}}
            {field:'name',displayName:"微信昵称"},        
            {field:'roleId',displayName:"角色ID"},        
            {field:'game',displayName:"游戏"},        
            {field:'startTime',displayName:"开始时间"},       
            {field:'endTime',displayName:"结束时间"} ,      
            {field:'openid',displayName:"openid"},       
            {field:'uid',displayName:"客服ID"},       
            {field:'id',width:60,displayName:"查看",cellTemplate:'  <button class="btn btn-primary btn-addon btn-sm"  ng-click="dialogue( {{row.entity[col.field]}})">查看</button>'}     
            ]
    };
}]);



/*
            	var  q={};
            	if(conditions.game!=""){//conditions
            		console.log(conditions.game)
            		q.game=conditions.game;
            	}
            	if(conditions.roleId!=''){
            		q.roleId=conditions.roleId;
            	}
            	if(conditions.name!=''){
            		q.name=conditions.name;
            	}
            	console.log(q);


*/