app.controller('OrderCtrl',['$scope','$rootScope','OrderService','dialog','StorageConfig','$state',function($scope,$rootScope,OrderService,dialog,StorageConfig,$state){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig={
		title: '订单列表',
		enableRefresh: false
	};

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	var spinner=dialog.showSpinner();
	var urlOptions={
		username: StorageConfig.TOKEN_STORAGE.getItem('username'),
		token: StorageConfig.TOKEN_STORAGE.getItem('token')
	}

	getOrderData(spinner.id);

	function getOrderData(spinnerId){
		OrderService.getOrderList(urlOptions).then(function(res){
			dialog.closeSpinner(spinnerId);
			if(res.results.allBookings.length > 0){
				for(var i = 0; i  < res.results.allBookings.length; i++){
					res.results.allBookings[i].bookingDateText = res.results.allBookings[i].bookingDate.replace('-', '年');
					res.results.allBookings[i].bookingDateText = res.results.allBookings[i].bookingDateText.replace('-', '月');
					res.results.allBookings[i].bookingDateText = res.results.allBookings[i].bookingDateText.replace(' ', '日 ');
				}
			}
			$scope.allBookings=res.results.allBookings;
			console.log($scope.allBookings);
		},function(res){
			dialog.closeSpinner(spinnerId);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.selectTab=0;
	$scope.checkTab=function(_index){
		$scope.selectTab=_index;
	}

	//查看详情
	$scope.detail=function(order){
		StorageConfig.ORDER_STORAGE.putItem('detail', order);
		$state.go('layout.order-detail');
	}

	$scope.cancelOrder=function(id){
		dialog.confirm('<textarea id="cancelRemark" placeholder="请输入取消原因" style="padding: 10px; width: 100%; border-radius: 4px; border-color: #d6d6d6;"></textarea>', {
			closeCallback: function(value){
				var cancelRemark =  document.getElementById('cancelRemark').value;
				if(value == 0){
				}else{
					var spinner2=dialog.showSpinner();
					var options={
						username: StorageConfig.TOKEN_STORAGE.getItem('username'),
						token: StorageConfig.TOKEN_STORAGE.getItem('token'),
						id: id,
						remark: cancelRemark,
					}
					OrderService.cancelOrderById(options).then(function(res){
						if(res.status=='ok'){
							getOrderData(spinner2.id);
						}
					},function(res){
						dialog.closeSpinner(spinner2.id);
						dialog.alert(res);
					});
				}
			}
		});
	}
}]);
