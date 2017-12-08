app.run(['$rootScope','StorageConfig','$state',function($rootScope,StorageConfig,$state){
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		if(document.getElementById('layoutContent')){
			document.getElementById('layoutContent').scrollTop=0;
		}
		if((toState.name=='login') || (toState.name=='layout.register') || (toState.name=='layout.forgetpwd') || (toState.name=='order-paySuccess')) return;
		var username=StorageConfig.TOKEN_STORAGE.getItem('username');
		var token=StorageConfig.TOKEN_STORAGE.getItem('token');
		if(!(username&&token)){
			event.preventDefault();
			StorageConfig.INTERCEPT_STORAGE.putItem('param',JSON.stringify(toParams));
			$state.go('login',{
				from: toState.name
			})
		}
	});
}]);
