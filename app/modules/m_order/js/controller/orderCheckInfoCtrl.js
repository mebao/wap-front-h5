app.controller('orderCheckInfoCtrl', ['$scope', '$rootScope', 'StorageConfig', 'dialog', 'OrderService', function($scope, $rootScope, StorageConfig, dialog, OrderService){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = false;

	window.headerConfig={
		title: '检查详情'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	var spinner = dialog.showSpinner();
    // 获取检查信息
    var otherOptions={
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token'),
		id: StorageConfig.ORDER_STORAGE.getItem('checkId')
    };
    OrderService.usercheckprojectinfo(otherOptions).then(function(data){
        dialog.closeSpinner(spinner.id);
        $scope.checkList = data.results.list;
    }, function(data){
        dialog.closeSpinner(spinner.id);
        dialog.alert(data.errorMsg);
    });

    $scope.showImg = function(_url){
		dialog.show('<img id="showImgView" src="' + _url + '" style="width: 100%;">', {
			showBtn: true,
			id: 'showImgView'
		});
	}
}]);
