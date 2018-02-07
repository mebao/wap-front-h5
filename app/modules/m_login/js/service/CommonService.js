app.service('CommonService',['BaseHttpRequest',function(BaseHttpRequest){
	var apiUrl=window.envs.api_url;

	function sendSMSCodeDto(res){
		return res;
	}

	function userloginDto(res){
		return res;
	}

	function userregistDto(res){
		return res;
	}

	function pawloginDto(res){
		return res;
	}

	function forgetpwdDto(res){
		return res;
	}

	function topuserDto(res){
		return res;
	}

	var service={
		sendSMSCode: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/smsverifycode',
				data: params
			};
			return BaseHttpRequest.post(requestObj, sendSMSCodeDto);
		},
		userlogin: function(params){
			var requestObj={
				url: window.envs.api_url+'/mebapi/userlogin',
				data: params
			};
			return BaseHttpRequest.post(requestObj,userloginDto);
		},
		userregist: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/userregist',
				data: params
			};
			return BaseHttpRequest.post(requestObj, userregistDto);
		},
		pawlogin: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/pawlogin',
				data: params
			}
			return BaseHttpRequest.post(requestObj, pawloginDto);
		},
		forgetpwd: function(params){
			var requestObj={
				url: apiUrl+'/mebapi/forgetpwd',
				data: params
			}
			return BaseHttpRequest.post(requestObj, forgetpwdDto);
		},
		topuser: function(urlOptions){
			var requestObj = {
				// url: 'http://localhost/yrbk/mebapi/topuser' + urlOptions,
				url: 'http://localhost/yrbk/mebapi/topuser' + urlOptions,
			}
			return BaseHttpRequest.get(requestObj, topuserDto);
		},
	}
    return service;
}]);
