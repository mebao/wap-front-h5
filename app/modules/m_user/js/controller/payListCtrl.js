app.controller('payListCtrl', ['$scope', '$rootScope', '$state', 'userinfoService', 'dialog', 'StorageConfig', function($scope, $rootScope, $state, userinfoService, dialog, StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig = {
		title: '收费信息',
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

    // 个人信息
    var urlOptions = {
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token'),
    }
    userinfoService.searchuser(urlOptions).then(function(data){
		if(data.results.users){
			$scope.user = data.results.users[0];
		}
    }, function(data){
        dialog.alert(data.errorMsg);
    });

    var spinner = dialog.showSpinner();
    // 收费信息
    userinfoService.searchtran(urlOptions).then(function(data){
        dialog.closeSpinner(spinner.id);
		$scope.payList = data.results.list;
		var recharge = 0;
		var consume = 0;
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				// 判断是否为充值
				if(data.results.list[0].type == '2'){
					recharge += parseFloat(data.results.list[0].amount);
				}
				// 判断是否为消费
				if(data.results.list[0].type == '1'){
					consume += parseFloat(data.results.list[0].amount);
				}
			}
		}
    }, function(data){
        dialog.closeSpinner(spinner.id);
        dialog.alert(data.errorMsg);
    });

	$scope.goRouter = function(_url){
		$state.go(_url);
	}
}]);
