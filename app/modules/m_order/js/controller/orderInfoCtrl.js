app.controller('orderInfoCtrl', ['$scope', '$rootScope', 'dialog', 'OrderService', '$stateParams', function($scope, $rootScope, dialog, OrderService, $stateParams){
    $scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

	window.headerConfig={
		title: '详情',
        enableBack: true,
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	window.footerConfig={
		enableFooter: false
	}

	$rootScope.$broadcast('setFooterConfig', window.footerConfig);
    console.log($stateParams);

    var spinner = dialog.showSpinner();
    OrderService.bookinginfo({id: $stateParams.id}).then(function(data){
        dialog.closeSpinner(spinner.id);
        $scope.info = data.results.bookinginfo;
    },function(data){
        dialog.closeSpinner(spinner.id);
        dialog.alert(data.errorMsg);
    });
}]);
