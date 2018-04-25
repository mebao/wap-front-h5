app.controller('OrderCtrl',['$scope','$rootScope','OrderService','dialog','StorageConfig','$state', 'HomeService', 'userinfoService', function($scope,$rootScope,OrderService,dialog,StorageConfig,$state, HomeService, userinfoService){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

    // 获取宝宝信息
    var spinner=dialog.showSpinner();
    var urlOptions={
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token')
    };
	$scope.username = StorageConfig.TOKEN_STORAGE.getItem('username');
    HomeService.getChilds(urlOptions).then(function(res){
		if(res.results.childs.length > 0){
			setHeader(res.results.childs);
		}else{
			window.headerConfig={
				title: '',
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
			$scope.allBookings = [];
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
				currentArea: StorageConfig.ORDER_STORAGE.getItem('selectedChild') ? StorageConfig.ORDER_STORAGE.getItem('selectedChild') : undefined,
				selectedCall: function(item){
					$scope.selectedChild = item;
					StorageConfig.ORDER_STORAGE.putItem('selectedChild', item);
					getOrderData(spinner.id);
					getOtherInfo(item);
				}
			},
		};

		$rootScope.$broadcast('setHeaderConfig',window.headerConfig);
	}

	function getOrderData(spinnerId){
		// 记录就诊次数
		var bookingInNum = 0;

		urlOptions.childId = $scope.selectedChild.childId;
		OrderService.getOrderList(urlOptions).then(function(res){
			dialog.closeSpinner(spinnerId);
			if(res.results.allBookings.length > 0){
				for(var i = 0; i  < res.results.allBookings.length; i++){
					res.results.allBookings[i].bookingDateText = res.results.allBookings[i].bookingDate.replace('-', '年');
					res.results.allBookings[i].bookingDateText = res.results.allBookings[i].bookingDateText.replace('-', '月');
					res.results.allBookings[i].bookingDateText = res.results.allBookings[i].bookingDateText.replace(' ', '日 ');
					if(res.results.allBookings[i].begin){
						res.results.allBookings[i].beginText = res.results.allBookings[i].begin.replace('-', '年');
						res.results.allBookings[i].beginText = res.results.allBookings[i].beginText.replace('-', '月');
						res.results.allBookings[i].beginText = res.results.allBookings[i].beginText.replace(' ', '日 ');
					}
					if(res.results.allBookings[i].status == '4' || res.results.allBookings[i].status == '5' || res.results.allBookings[i].status == '11'){
						bookingInNum++;
					}
				}
			}
			$scope.bookingInNum = bookingInNum;
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

	function getOtherInfo(child) {
		var otherOptions={
			username: StorageConfig.TOKEN_STORAGE.getItem('username'),
			token: StorageConfig.TOKEN_STORAGE.getItem('token'),
			child_id: child.childId
		};
		// 获取病例信息
		OrderService.searchcasehistory(otherOptions).then(function(data){
			$scope.casehistory = data.results.list;
		}, function(data){
			dialog.alert(data.errorMsg);
		});
		// 获取检查信息
		OrderService.usercheckprojects(otherOptions).then(function(data){
			$scope.checkprojects = data.results.list;
		}, function(data){
			dialog.alert(data.errorMsg);
		});
	}

	$scope.checkList = function(){
		$state.go('order-check-list', {
			childId: $scope.selectedChild.childId
		})
	}

	// 获取用户余额
	// userinfoService.searchuser(urlOptions).then(function(data){
	// 	if(data.results.users.length > 0){
	// 		$scope.user = data.results.users[0];
	// 	}
	// }, function(data){
	// 	dialog.alert(urlOptions);
	// });
}]);
