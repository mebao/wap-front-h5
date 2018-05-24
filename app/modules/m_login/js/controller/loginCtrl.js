app.controller('loginCtrl',['$scope','$rootScope','CommonService','dialog','$stateParams','$state','StorageConfig',function($scope,$rootScope,CommonService,dialog,$stateParams,$state,StorageConfig){
	$scope.header = true;
    // $scope.footer = StorageConfig.FOOTER_STORAGE.getItem('showFooter') ? true : false;
    $scope.footer = true;

	window.headerConfig={
		enableBack: false,
		title: '登录',
        // otherRightOperate: {
        //     enable: true,
        //     html: '注册',
        //     clickCall: function(){
        //     	$state.go('layout.register');
        //     }
        // },
	};

	$rootScope.$broadcast('setHeaderConfig', window.headerConfig);

	$scope.selectedTab=1;
	$scope.checkTab=function(_index){
		$scope.selectedTab=_index;
	}

	$scope.from=$stateParams.from?$stateParams.from:'layout.user';
	$scope.intercept=StorageConfig.INTERCEPT_STORAGE.getItem('param');

	$scope.loginPwd=function(){
		var spinner=dialog.showSpinner();
		var params={
			mobile: $scope.mobilePwd,
			password: $scope.passwordPwd
		}
		CommonService.pawlogin(params).then(function(res){
			dialog.closeSpinner(spinner.id);
			StorageConfig.TOKEN_STORAGE.putItem('username',$scope.mobilePwd);
			StorageConfig.TOKEN_STORAGE.putItem('token',res.results.userinfo.token);
			StorageConfig.TOKEN_STORAGE.putItem('uid',res.results.userinfo.uid);
			StorageConfig.TOKEN_STORAGE.putItem('name', res.results.userinfo.name);
			StorageConfig.TOKEN_STORAGE.putItem('nickname', res.results.userinfo.username);
			StorageConfig.TOKEN_STORAGE.putItem('gender', res.results.userinfo.gender);
			// $state.go($scope.from,eval('(' + $scope.intercept + ')'));
			$state.go('layout.orderlist');
		},function(res){
			dialog.closeSpinner(spinner.id);
			if(res.errorMsg == '密码错误!'){
				dialog.alert('密码错误，可通过忘记密码设置新密码');
			}else{
				dialog.alert(res.errorMsg);
			}
		});
	}

	$scope.imgUrl = 'http://mebapi.meb168.com';
	// $scope.imgUrl = 'http://localhost/yrbk';
	// $scope.imgUrl = 'http://172.16.252.28/yrbk';

	// 获取图形验证码
	var num = 1;
	$scope.imgCode = $scope.imgUrl + '/mebapi/getcode?id=1';
	$scope.changeImgCode = function(){
		num++;
		$scope.imgCode = $scope.imgUrl + '/mebapi/getcode?id=' + num;
	}

	$scope.sendSMSText='验证码';
	//发送验证码
	$scope.smsverifycode=function(){
		$scope.lockEnabled=true;
		var smsParams={
			mobile: $scope.mobile,
			action_type: 102,
			vali_code: $scope.vali_code,
		};
		CommonService.sendSMSCode(smsParams).then(function(res){
			dialog.alert('验证码已发送');
			var count=60;
			var verifyCodeInterval=setInterval(function(){
				$scope.sendSMSText=count-- + '秒后重发';
				$scope.$apply();
				if(count==0){
					clearInterval(verifyCodeInterval);
					$scope.sendSMSText='重新发送';
					$scope.lockEnabled=false;
					$scope.$apply();
				}
			},1000);

		},function(res){
			dialog.alert(res.errorMsg);
			$scope.lockEnabled=false;
		});
	}

	$scope.login=function(){
		var spinner=dialog.showSpinner();
		// 通过手机号，获取用户所在诊所
		// 先获取用户所在诊所
		var loginParams={
			mobile: $scope.mobile,
			verify_code: $scope.verify_code
		}
		CommonService.topuserlogin(loginParams).then(function(res_topUser){
			localStorage.setItem('wap_clinic', res_topUser.results.user.clinicId);
			resetEnvs();
			// var loginParams={
			// 	mobile: $scope.mobile,
			// 	verify_code: $scope.verify_code
			// }
			CommonService.topuser(res_topUser.results.user.userId).then(function(res){
				dialog.closeSpinner(spinner.id);
				StorageConfig.TOKEN_STORAGE.putItem('username',$scope.mobile);
				StorageConfig.TOKEN_STORAGE.putItem('token',res.results.userinfo.token);
				StorageConfig.TOKEN_STORAGE.putItem('uid',res.results.userinfo.uid);
				StorageConfig.TOKEN_STORAGE.putItem('name', res.results.userinfo.name);
				StorageConfig.TOKEN_STORAGE.putItem('nickname', res.results.userinfo.username);
				StorageConfig.TOKEN_STORAGE.putItem('gender', res.results.userinfo.gender);
				// $state.go($scope.from,eval('(' + $scope.intercept + ')'));
				// 清空默认选中宝宝
				StorageConfig.ORDER_STORAGE.removeItem('selectedChild');
				if($stateParams.from){
					$state.go($stateParams.from)
				}else{
					$state.go('user');
				}
			},function(res){
				dialog.closeSpinner(spinner.id);
				dialog.alert(res.errorMsg);
				// 更新图形验证码
				$scope.vali_code = '';
				num++;
				$scope.imgCode = $scope.imgUrl + '/mebapi/getcode?id=' + num;
			});
		},function(res){
			dialog.closeSpinner(spinner.id);
			dialog.alert(res.errorMsg);
			// 更新图形验证码
			$scope.vali_code = '';
			num++;
			$scope.imgCode = $scope.imgUrl + '/mebapi/getcode?id=' + num;
		});
	}

	$scope.forgetPwd=function(){
		$state.go('layout.forgetpwd');
	}

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
	            api_url: 'http://172.16.252.28/jiabaokangle',
	        }
	    };
		switch (localStorage.getItem('wap_clinic')) {
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
