app.run(['$rootScope','StorageConfig','$state',function($rootScope,StorageConfig,$state){
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		if(document.getElementById('layoutContent')){
			document.getElementById('layoutContent').scrollTop=0;
		}
		if((toState.name=='layout.register') || (toState.name=='layout.forgetpwd') || (toState.name=='order-paySuccess') || (toState.name == 'order-info')) return;
		var username=StorageConfig.TOKEN_STORAGE.getItem('username');
		var token=StorageConfig.TOKEN_STORAGE.getItem('token');
		if(toState.name == 'login'){
			// 若已登录，直接进入个人中心
			if(username && token){
				event.preventDefault();
				$state.go('user')
			}
		}else{
			if(!(username&&token)){
				event.preventDefault();
				StorageConfig.INTERCEPT_STORAGE.putItem('param',JSON.stringify(toParams));
				$state.go('login',{
					from: toState.name
				})
			}
		}
	});
}]);
