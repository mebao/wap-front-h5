app.service('tokenService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function getTokenDto(res){
		return res;
	}

	var service={
		getToken: function(){
			var requestObj={
				url: window.envs.api_url+'/mebapi/childtoken'
			}
			return BaseHttpRequest.get(requestObj,getTokenDto);
		}
	}
	return service;
}]);
