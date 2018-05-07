app.controller('orderCheckListCtrl', ['$scope', '$rootScope', 'StorageConfig', 'OrderService', '$stateParams', '$state', 'dialog', function($scope, $rootScope, StorageConfig, OrderService, $stateParams, $state, dialog){
    $scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

	window.headerConfig={
		title: '报告列表'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    var spinner = dialog.showSpinner();
    // 获取检查信息
    var otherOptions={
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token'),
        child_id: $stateParams.childId,
    };
    OrderService.usercheckprojects(otherOptions).then(function(data){
        dialog.closeSpinner(spinner.id);
        $scope.checkList = data.results.list;
    }, function(data){
        dialog.closeSpinner(spinner.id);
        dialog.alert(data.errorMsg);
    });

    $scope.detail = function(id){
		StorageConfig.ORDER_STORAGE.putItem('checkId', id);
		$state.go('order-checkInfo');
    }
}])
