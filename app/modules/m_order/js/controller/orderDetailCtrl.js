app.controller('orderDetailCtrl',['$scope','$rootScope','StorageConfig',function($scope,$rootScope,StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig={
		title: '订单详情'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.order=StorageConfig.ORDER_STORAGE.getItem('detail');
	$scope.use = new Date().getTime() < new Date($scope.order.bookingDate);
	var refNo=$scope.order.refNo.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
	$scope.order.refNo=refNo;
}]);
