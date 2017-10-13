app.controller('userinfoCtrl',['$scope','$rootScope','StorageConfig','userinfoService','dialog','$state',function($scope,$rootScope,StorageConfig,userinfoService,dialog,$state){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig={
		title: '用户信息'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	// 用于存储用户信息
	var user=new Object();
	user.name=StorageConfig.TOKEN_STORAGE.getItem('name');
	user.nickname=StorageConfig.TOKEN_STORAGE.getItem('nickname');
	user.gender=StorageConfig.TOKEN_STORAGE.getItem('gender');
	$scope.user=user;
	// 用于存储当前页面的用户信息
	var info = new Object();
	info.name=StorageConfig.TOKEN_STORAGE.getItem('name');
	info.nickname=StorageConfig.TOKEN_STORAGE.getItem('nickname');
	info.gender=StorageConfig.TOKEN_STORAGE.getItem('gender') == '男' ? 'F' : StorageConfig.TOKEN_STORAGE.getItem('gender') == '女' ? 'M' : StorageConfig.TOKEN_STORAGE.getItem('gender');
	$scope.info=info;

	$scope.submit=function(){
		if(!$scope.info.name.match(/^\w+$/)){
			dialog.alert('用户名只能由字母、数字和下划线组成');
			return;
		}
		var spinner=dialog.showSpinner();
		var params={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			name: $scope.info.name,
			nickname: $scope.info.nickname,
			gender: $scope.info.gender
		}
		userinfoService.userinfo(params).then(function(res){
			StorageConfig.TOKEN_STORAGE.putItem('name', $scope.info.name);
			StorageConfig.TOKEN_STORAGE.putItem('nickname', $scope.info.nickname);
			StorageConfig.TOKEN_STORAGE.putItem('gender', $scope.info.gender == 'F' ? '男' : '女');
			dialog.closeSpinner(spinner.id);
			$state.go('layout.user');
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
		});
	}
}]);
