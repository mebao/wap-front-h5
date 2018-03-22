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

    // 根据诊所id，重置请求域名
    resetEnvs();

    var spinner = dialog.showSpinner();
    OrderService.bookinginfo({id: $stateParams.id}).then(function(data){
        dialog.closeSpinner(spinner.id);
        $scope.info = data.results.bookinginfo;
    },function(data){
        dialog.closeSpinner(spinner.id);
        dialog.alert(data.errorMsg);
    });

    function resetEnvs() {
		var allEnvs = {
	        product: {
	            env:'product',
	            api_url: 'http://wapapi.meb168.com',
	        },
	        product_zunyi: {
	            env:'product_zunyi',
	            api_url: 'http://wapapi.meb168.com',
	        },
	        product_kunming: {
	            env:'product_kunming',
	            api_url: 'http://km01.yunapi.meb168.com',
	        },
            product_test: {
	            env:'product_test',
	            api_url: 'http://mebtestapi.meb168.com',
            },
	        localhost: {
	            env:'localhost',
	            api_url: 'http://172.16.252.60/jiabaokangle',
	        }
	    };
		switch ($stateParams.clinic_id) {
			case '1':
			{
				window.envs = allEnvs.product_zunyi;
				break;
			}
			case '4':
			{
				window.envs = allEnvs.product_zunyi;
				break;
			}
			case '2':
			{
				window.envs = allEnvs.product_kunming;
				break;
			}
	        case '99':
	        {
	            window.envs = allEnvs.product_kunming;
	            break;
	        }
	        case '10':
	        {
	            window.envs = allEnvs.product_test;
	            break;
	        }
			default:
	            window.envs = allEnvs.product_zunyi;
				// window.envs = allEnvs.localhost;
				break;
		}
	}
}]);
