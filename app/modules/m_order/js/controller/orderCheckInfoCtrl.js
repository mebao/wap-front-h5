app.controller('orderCheckInfoCtrl', ['$scope', '$rootScope', 'StorageConfig', 'dialog', function($scope, $rootScope, StorageConfig, dialog){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig={
		title: '检查详情'
	}

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

    $scope.checkList = StorageConfig.ORDER_STORAGE.getItem('checkList');

    $scope.showImg = function(_url){
		dialog.show('<img src="' + _url + '" class="w100">');
	}
}]);
