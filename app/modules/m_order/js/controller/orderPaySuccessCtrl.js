app.controller('orderPaySuccessCtrl', ['$scope', '$rootScope', '$stateParams', 'OrderService', 'dialog', function($scope, $rootScope, $stateParams, OrderService, dialog){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

	window.headerConfig={
		title: '支付成功',
        enableBack: false,
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	window.footerConfig={
		enableFooter: false
	}

	$rootScope.$broadcast('setFooterConfig', window.footerConfig);

	// var spinner = dialog.showSpinner();
    // var urlOptions = {
    //     username: $stateParams.username,
    //     token: $stateParams.token,
    //     booking_id: $stateParams.id,
    // }

    // OrderService.finishpay(urlOptions).then(function(data){
	// 	dialog.closeSpinner(spinner.id);
		$scope.tab = 'success';
    // }, function(data){
	// 	dialog.closeSpinner(spinner.id);
	// 	$scope.tab = 'error';
    // });
}]);
