app.controller('userCtrl', ['$scope', '$rootScope', '$state', 'childService', 'userinfoService', 'dialog', 'StorageConfig', function($scope, $rootScope, $state, childService, userinfoService, dialog, StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig={
		enableBack: false,
		title: '个人中心',
	}

	$rootScope.$broadcast('setHeaderConfig',window.headerConfig);

	$scope.goRouter=function(_url){
		$state.go(_url);
	}

	$scope.layout = function(){
		dialog.confirm('确认退出', {
			closeCallback: function(value){
				if(value == 0){
				}else{
					StorageConfig.TOKEN_STORAGE.putItem('token', '');
					$state.go('login');
				}
			}
		});
	}

	var spinner = dialog.showSpinner();
	// 个人信息
    var urlOptions = {
        username: StorageConfig.TOKEN_STORAGE.getItem('username'),
        token: StorageConfig.TOKEN_STORAGE.getItem('token'),
    }
    userinfoService.searchuser(urlOptions).then(function(data){
		dialog.closeSpinner(spinner.id);
		if(data.results.users){
			$scope.user = data.results.users[0];
		}
    }, function(data){
		dialog.closeSpinner(spinner.id);
        dialog.alert(data.errorMsg);
    });

	childService.getChild(urlOptions).then(function(res){
		if(res.results.childs.length > 0){
			$scope.childs = res.results.childs
		}
    },function(res){
        dialog.closeSpinner(spinner.id);
        dialog.alert(res.errorMsg);
    });

	$scope.goOrderList = function(child){
		StorageConfig.CHILD_STORAGE.putItem('meb_child',child);
		$state.go('orderlist');
	}
}]);
