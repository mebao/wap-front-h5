app.controller('payDetailCtrl', ['$scope', '$rootScope', '$state', 'userinfoService', 'dialog', 'StorageConfig', function($scope, $rootScope, $state, userinfoService, dialog, StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

	window.headerConfig = {
		title: '收费信息',
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

    var type = $state.params.type;
	var detail = StorageConfig.ORDER_STORAGE.getItem('payDetail');
	if(type == '2'){
		// 会员充值
		$scope.payType = '0';
	}else if(type == '1'){
		if(detail.drug){
			// 药品零售
			$scope.payType = '2';
			detail.drug.discountAmount = userinfoService.toDecimal2(parseFloat(detail.drug.needAmount) - parseFloat(detail.drug.giveAmount) - parseFloat(detail.drug.amount));
			if(detail.drug.info.length > 0){
				for(var i = 0; i < detail.drug.info.length; i++){
					detail.drug.info[i].allFee = userinfoService.toDecimal2(parseFloat(detail.drug.info[i].num) * parseFloat(detail.drug.info[i].price));
				}
			}
		}else{
			// 支付费用
			$scope.payType = '1';
			var spinner = dialog.showSpinner();
			var urlOptions = {
				username: StorageConfig.TOKEN_STORAGE.getItem('username'),
				token: StorageConfig.TOKEN_STORAGE.getItem('token'),
				bookingId: $state.params.id,
			}
			userinfoService.bookingfee(urlOptions).then(function(data){
				dialog.closeSpinner(spinner.id);
				detail.needAmount = 0;
				if(data.results.feeinfo['医生服务费用'].length > 0){
					for(var i = 0; i < data.results.feeinfo['医生服务费用'].length; i++){
						detail.needAmount += parseFloat(data.results.feeinfo['医生服务费用'][i].fee);
					}
				}
				if(data.results.feeinfo['检查项目费用'].length > 0){
					for(var i = 0; i < data.results.feeinfo['检查项目费用'].length; i++){
						detail.needAmount += parseFloat(data.results.feeinfo['检查项目费用'][i].fee);
					}
				}
				if(data.results.feeinfo['辅助项目费用'].length > 0){
					for(var i = 0; i < data.results.feeinfo['辅助项目费用'].length; i++){
						detail.needAmount += parseFloat(data.results.feeinfo['辅助项目费用'][i].fee);
					}
				}
				if(data.results.feeinfo['药方药品费用'].length > 0){
					for(var i = 0; i < data.results.feeinfo['药方药品费用'].length; i++){
						detail.needAmount += parseFloat(data.results.feeinfo['药方药品费用'][i].fee);
						if(data.results.feeinfo['药方药品费用'][i].info.length > 0){
							for(var j = 0; j < data.results.feeinfo['药方药品费用'][i].info.length; j++){
								data.results.feeinfo['药方药品费用'][i].info[j].allFee = userinfoService.toDecimal2(parseFloat(data.results.feeinfo['药方药品费用'][i].info[j].num) * parseFloat(data.results.feeinfo['药方药品费用'][i].info[j].price));
							}
						}
					}
				}
				if(data.results.feeinfo['其他费用'].length > 0){
					for(var i = 0; i < data.results.feeinfo['其他费用'].length; i++){
						detail.needAmount += parseFloat(data.results.feeinfo['其他费用'][i].fee);
					}
				}
				detail.discountAmount = userinfoService.toDecimal2(detail.needAmount - parseFloat(detail.giveAmount) - parseFloat(detail.amount) - parseFloat(detail.secondAmount == null ? '0' : detail.secondAmount) - (data.results.feeinfo['预约金'] ? parseFloat(data.results.feeinfo['预约金'].fee) : 0));
				detail.needAmount = userinfoService.toDecimal2(detail.needAmount);
				$scope.bookingfee = data.results;
			}, function(data){
				dialog.closeSpinner(spinner.id);
				dialog.alert(data.errorMsg);
			});
		}
	}else if(type == '3'){
		// 支付预约金
		$scope.payType = '3';
	}
	$scope.detail = detail;
}]);
