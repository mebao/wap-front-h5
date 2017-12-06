app.controller('payListCtrl', ['$scope', '$rootScope', '$state', 'userinfoService', 'dialog', 'StorageConfig', function($scope, $rootScope, $state, userinfoService, dialog, StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

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
		var recharge = 0;
		var consume = 0;
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				data.results.list[i].payAmount = userinfoService.toDecimal2((parseFloat(data.results.list[i].amount) + parseFloat(data.results.list[i].secondAmount)).toString());
				data.results.list[i].totalAmount = userinfoService.toDecimal2(parseFloat(data.results.list[i].amount) + parseFloat(data.results.list[i].giveAmount) + parseFloat(data.results.list[i].secondAmount));
				// 判断是否为充值
				if(data.results.list[i].type == '2'){
					recharge += parseFloat(data.results.list[i].totalAmount);
				}
				// 判断是否为消费
				if(data.results.list[i].type == '1' || data.results.list[i].type == '3'){
					consume += parseFloat(data.results.list[i].totalAmount);
				}
			}
		}
		$scope.payList = data.results.list;
		$scope.recharge = userinfoService.toDecimal2(recharge);
		$scope.consume = userinfoService.toDecimal2(consume);
    }, function(data){
        dialog.closeSpinner(spinner.id);
        dialog.alert(data.errorMsg);
    });

	$scope.detail = function(pay){
		StorageConfig.ORDER_STORAGE.putItem('payDetail', pay);
		$state.go('layout.user-payDetail', {
			type: pay.type,
			id: pay.bookingId,
		})
	}
}]);
