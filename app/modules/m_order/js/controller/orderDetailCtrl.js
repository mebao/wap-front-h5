app.controller('orderDetailCtrl',['$scope','$rootScope','StorageConfig', 'OrderService', 'dialog', '$state', function($scope,$rootScope,StorageConfig, OrderService, dialog, $state){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

	window.headerConfig={
		title: '预约'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var selectedTab = StorageConfig.ORDER_STORAGE.getItem('selectedTab');
	if(selectedTab){
		$scope.selectedTab = selectedTab;
	}else{
		$scope.selectedTab = 0;
	}

	$scope.checkTab = function(_value){
		$scope.selectedTab = _value;
	}

	// 详情
	$scope.order = StorageConfig.ORDER_STORAGE.getItem('detail');
	$scope.use = new Date().getTime() < new Date($scope.order.bookingDate);
	// var refNo = $scope.order.refNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
	// $scope.order.refNo=refNo;

	// 病例
	var spinner = dialog.showSpinner();
	var urlOptions = {
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		booking_id: $scope.order.id,
	}
	OrderService.searchcasehistory(urlOptions).then(function(data){
		dialog.closeSpinner(spinner.id);
		if(data.results.list.length > 0){
			$scope.hasCasehistory = true;
			$scope.casehistory = data.results.list[0];
		}else{
			$scope.hasCasehistory = false;
		}
	}, function(data){
		dialog.closeSpinner(spinner.id);
		dialog.alert(data.errorMsg);
	});

	// 药方
	OrderService.searchprescript(urlOptions).then(function(data){
		$scope.prescript = [];
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				data.results.list[i].infoLength = data.results.list[i].info.length;
			}
			var prescript = data.results.list[0];
			if(prescript.info.length > 0){
				for(var i = 0; i < prescript.info.length; i++){
					prescript.info[i].oneNum = parseFloat(prescript.info[i].oneNum);
				}
				$scope.prescript = prescript.info;
			}
		}
	}, function(data){
		dialog.alert(data.errorMsg);
	});

	// 实验室检查
	OrderService.usercheckprojects(urlOptions).then(function(data){
		var check = '';
		var checkList = [];
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				// 判断该检查是否填写检查结果
				if(data.results.list[i].checkDoctorId){
					checkList.push(data.results.list[i]);
					check += data.results.list[i].checkName + '、';
				}
			}
		}
		if(check.length > 0){
			check = check.slice(0, check.length - 1);
		}
		$scope.check = check;
		$scope.checkList = checkList;
	}, function(data){
		dialog.alert(data.errorMsg);
	});

	// 治疗
	OrderService.bookingassist(urlOptions).then(function(data){
		var assist = '';
		if(data.results.list.length > 0){
			for(var i = 0; i < data.results.list.length; i++){
				assist += data.results.list[i].name + '、';
			}
		}
		if(assist.length > 0){
			assist = assist.slice(0, assist.length - 1);
		}
		$scope.assist = assist;
	}, function(data){
		dialog.alert(data.errorMsg);
	});

	$scope.showCheckInfo = function(){
		StorageConfig.ORDER_STORAGE.putItem('selectedTab', 2);
		StorageConfig.ORDER_STORAGE.putItem('checkList', $scope.checkList);
		$state.go('order-checkInfo');
	}
}]);
