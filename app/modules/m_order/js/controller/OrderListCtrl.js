app.controller('OrderCtrl',['$scope','$rootScope','OrderService','dialog','StorageConfig','$state', 'HomeService', function($scope,$rootScope,OrderService,dialog,StorageConfig,$state, HomeService){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

    // 获取宝宝信息
    var spinner=dialog.showSpinner();
    var urlOptions={
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token')
    };
    HomeService.getChilds(urlOptions).then(function(res){
		if(res.results.childs.length > 0){
			setHeader(res.results.childs);
		}else{
			window.headerConfig={
				title: '暂无就诊记录',
				enableBack: false,
				enableRefresh: false,
				otherRightOperate: {
					enable: true,
					html: '退出',
					clickCall: function() {
						dialog.confirm('确认退出', {
							closeCallback: function(value){
								if(value == 0){
								}else{
									StorageConfig.TOKEN_STORAGE.putItem('token', '');
									$state.go('login');
								}
							}
						});
					},
				},
			};

			$rootScope.$broadcast('setHeaderConfig',window.headerConfig);
	        dialog.closeSpinner(spinner.id);
		}
    },function(res){
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

	function setHeader(childList) {
		window.headerConfig={
			enableTitle: false,
			enableBack: false,
			enableRefresh: false,
			otherRightOperate: {
				enable: true,
				html: '退出',
				clickCall: function() {
					dialog.confirm('确认退出', {
						closeCallback: function(value){
							if(value == 0){
							}else{
								StorageConfig.TOKEN_STORAGE.putItem('token', '');
								$state.go('login');
							}
						}
					});
				},
			},
			areaOperate: {
				enable: true,
				areas: childList,
				trackKey: 'childName',
				selectedCall: function(item){
					getOrderData(spinner.id, item.childId);
				}
			},
		};

		$rootScope.$broadcast('setHeaderConfig',window.headerConfig);
	}

	function getOrderData(spinnerId, childId){
		urlOptions.childId = childId;
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
		},function(res){
			dialog.closeSpinner(spinnerId);
			dialog.alert(res.errorMsg);
		});
	}

	$scope.goRouter=function(_url){
		$state.go(_url);
	}

	//查看详情
	$scope.detail=function(order){
		StorageConfig.ORDER_STORAGE.putItem('detail', order);
		StorageConfig.ORDER_STORAGE.putItem('selectedTab', 0);
		$state.go('order-detail');
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
